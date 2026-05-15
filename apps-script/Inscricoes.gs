// Inscricoes tab is a raw paste of the Microsoft Forms Excel export.
// rebuildTurmas() parses each registration row and upserts into Turmas.

function readInscricoes() {
  return readAllRows(SHEET_NAMES.INSCRICOES);
}

// Parses "Class X, ETEC 107; Class Y, ETEC 107; Class H, ETEC 110"
// into [{ etec_numero, turma_nome }, ...]
function parseClassesRaw(raw) {
  if (!raw) return [];
  const out = [];
  const text = String(raw).replace(/\n/g, ';');
  const re = /([^,;]+?),\s*ETEC\s*(\d+)/gi;
  let match;
  while ((match = re.exec(text)) !== null) {
    out.push({
      turma_nome: match[1].trim(),
      etec_numero: match[2].trim()
    });
  }
  return out;
}

// PII strip — never expose CPF, mobile, ethnicity, gender, disability via API.
function safeProfessorView(inscricaoRow) {
  if (!inscricaoRow) return null;
  const email = String(inscricaoRow['Best email'] || inscricaoRow['Email'] || '').trim().toLowerCase();
  const etec_numeros = String(inscricaoRow['ETEC numbers'] || '')
    .split(/[,;\s]+/)
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return s.length > 0; });
  return {
    email: email,
    nome: String(inscricaoRow['Full name'] || inscricaoRow['Name'] || '').trim(),
    etec_numeros: etec_numeros
  };
}

// Upsert Turmas from Inscricoes. Preserves manual edits on `status` and `turma_nome`.
function rebuildTurmas() {
  const inscricoes = readInscricoes();
  const turmasSheet = sheet(SHEET_NAMES.TURMAS);
  const headers = turmasSheet.getRange(1, 1, 1, turmasSheet.getLastColumn()).getValues()[0];

  // Build existing turma_id map to preserve manual fields
  const existing = {};
  const existingData = turmasSheet.getDataRange().getValues();
  for (let r = 1; r < existingData.length; r++) {
    const obj = {};
    headers.forEach(function (h, i) { obj[h] = existingData[r][i]; });
    if (obj.turma_id) existing[obj.turma_id] = obj;
  }

  let added = 0;
  let kept = 0;
  const seen = {};

  inscricoes.forEach(function (row) {
    const inscricaoId = row['Id'];
    const profEmail = String(row['Best email'] || row['Email'] || '').trim().toLowerCase();
    const profNome = String(row['Full name'] || row['Name'] || '').trim();
    const studentsTotal = parseInt(row['Students total'], 10) || 0;
    const classesCount = parseInt(row['Classes count'], 10) || 1;
    const studentsPerClass = Math.round(studentsTotal / Math.max(classesCount, 1));

    const parsed = parseClassesRaw(row['Classes raw']);
    parsed.forEach(function (p) {
      const turmaId = 'etec' + p.etec_numero + '-' + slug(p.turma_nome);
      seen[turmaId] = true;
      const previous = existing[turmaId];
      const fields = {
        turma_id: turmaId,
        etec_numero: p.etec_numero,
        etec_nome: etecNome(p.etec_numero),
        turma_nome: previous && previous.turma_nome ? previous.turma_nome : p.turma_nome,
        professor_lead_email: profEmail,
        professor_lead_nome: profNome,
        students_count_estimate: studentsPerClass,
        status: previous && previous.status ? previous.status : 'active',
        _inscricao_id: inscricaoId
      };
      upsertByKey(SHEET_NAMES.TURMAS, 'turma_id', turmaId, fields);
      if (previous) kept++; else added++;
    });

    // Mark inscricao as imported
    if (inscricaoId !== undefined && inscricaoId !== '') {
      markInscricaoImported(inscricaoId);
    }
  });

  return { added: added, kept: kept, total: Object.keys(seen).length };
}

function markInscricaoImported(id) {
  const sh = sheet(SHEET_NAMES.INSCRICOES);
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const idIdx = headers.indexOf('Id');
  const importedIdx = headers.indexOf('_imported_at');
  if (idIdx === -1 || importedIdx === -1) return;
  for (let r = 1; r < data.length; r++) {
    if (String(data[r][idIdx]) === String(id)) {
      sh.getRange(r + 1, importedIdx + 1).setValue(nowIso());
      return;
    }
  }
}

function findInscricaoByEmail(email) {
  const target = String(email || '').trim().toLowerCase();
  if (!target) return null;
  const rows = readInscricoes();
  // Prefer latest completed; iterate from end.
  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    const best = String(row['Best email'] || '').trim().toLowerCase();
    const email2 = String(row['Email'] || '').trim().toLowerCase();
    if (best === target || email2 === target) return row;
  }
  return null;
}
