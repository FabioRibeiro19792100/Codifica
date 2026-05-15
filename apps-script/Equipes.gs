// Equipes (work teams) — manually entered after the 1st delivery.
// Provides list/mutation handlers and an installable onEdit trigger to autofill defaults.

function readEquipes(filter) {
  const rows = readAllRows(SHEET_NAMES.EQUIPES);
  return rows
    .filter(function (r) { return r.equipe_id; })
    .map(function (r) {
      return {
        equipe_id: String(r.equipe_id),
        turma_id: String(r.turma_id || ''),
        equipe_nome: String(r.equipe_nome || ''),
        membros: String(r.membros || '')
          .split(',')
          .map(function (s) { return s.trim(); })
          .filter(function (s) { return s.length > 0; }),
        professor_responsavel_email: String(r.professor_responsavel_email || '').toLowerCase(),
        english_track: r.english_track === true || String(r.english_track).toLowerCase() === 'true',
        english_teacher_email: String(r.english_teacher_email || '').toLowerCase(),
        created_at: r.created_at || ''
      };
    })
    .filter(function (e) {
      if (!filter) return true;
      if (filter.turma_id && e.turma_id !== filter.turma_id) return false;
      if (filter.professor_email && e.professor_responsavel_email !== String(filter.professor_email).toLowerCase()) return false;
      if (filter.equipe_id && e.equipe_id !== filter.equipe_id) return false;
      return true;
    });
}

function generateEquipeId(turma_id, equipe_nome) {
  return String(turma_id) + '-' + slug(equipe_nome);
}

function Equipes_list(params) {
  if (!params.turma_id && !params.professor_email && !params.equipe_id) {
    throw httpError('BAD_REQUEST', 'turma_id or professor_email is required');
  }
  const equipes = readEquipes(params);
  const status = readAllStatus();
  return equipes.map(function (e) {
    return Object.assign({}, e, { status: status[e.equipe_id] || null });
  });
}

function Equipes_mutate(body) {
  const action = body.action;
  if (action === 'create') return createEquipe(body);
  if (action === 'update') return updateEquipe(body);
  if (action === 'delete') return deleteEquipe(body);
  throw httpError('BAD_REQUEST', 'unknown action: ' + action);
}

function createEquipe(body) {
  if (!body.turma_id) throw httpError('BAD_REQUEST', 'turma_id required');
  if (!body.equipe_nome) throw httpError('BAD_REQUEST', 'equipe_nome required');
  const turmaExists = readAllRows(SHEET_NAMES.TURMAS).some(function (t) {
    return String(t.turma_id) === String(body.turma_id);
  });
  if (!turmaExists) throw httpError('NOT_FOUND', 'turma not found: ' + body.turma_id);

  const equipe_id = body.equipe_id || generateEquipeId(body.turma_id, body.equipe_nome);
  const collision = readEquipes({ equipe_id: equipe_id }).length > 0;
  if (collision) throw httpError('CONFLICT', 'equipe_id already exists: ' + equipe_id);

  const fields = {
    equipe_id: equipe_id,
    turma_id: body.turma_id,
    equipe_nome: body.equipe_nome,
    membros: Array.isArray(body.membros) ? body.membros.join(', ') : (body.membros || ''),
    professor_responsavel_email: String(body.professor_responsavel_email || '').toLowerCase(),
    english_track: !!body.english_track,
    english_teacher_email: String(body.english_teacher_email || '').toLowerCase(),
    created_at: nowIso()
  };
  upsertByKey(SHEET_NAMES.EQUIPES, 'equipe_id', equipe_id, fields);
  const status = readAllStatus();
  const created = readEquipes({ equipe_id: equipe_id })[0];
  return Object.assign({}, created, { status: status[equipe_id] || null });
}

function updateEquipe(body) {
  if (!body.equipe_id) throw httpError('BAD_REQUEST', 'equipe_id required');
  const existing = readEquipes({ equipe_id: body.equipe_id });
  if (existing.length === 0) throw httpError('NOT_FOUND', 'equipe not found');

  const fields = {};
  if (body.turma_id !== undefined) fields.turma_id = body.turma_id;
  if (body.equipe_nome !== undefined) fields.equipe_nome = body.equipe_nome;
  if (body.membros !== undefined) {
    fields.membros = Array.isArray(body.membros) ? body.membros.join(', ') : body.membros;
  }
  if (body.professor_responsavel_email !== undefined) {
    fields.professor_responsavel_email = String(body.professor_responsavel_email).toLowerCase();
  }
  if (body.english_track !== undefined) fields.english_track = !!body.english_track;
  if (body.english_teacher_email !== undefined) {
    fields.english_teacher_email = String(body.english_teacher_email).toLowerCase();
  }
  upsertByKey(SHEET_NAMES.EQUIPES, 'equipe_id', body.equipe_id, fields);
  const status = readAllStatus();
  const updated = readEquipes({ equipe_id: body.equipe_id })[0];
  return Object.assign({}, updated, { status: status[body.equipe_id] || null });
}

function deleteEquipe(body) {
  if (!body.equipe_id) throw httpError('BAD_REQUEST', 'equipe_id required');
  const removed = deleteRowByKey(SHEET_NAMES.EQUIPES, 'equipe_id', body.equipe_id);
  if (!removed) throw httpError('NOT_FOUND', 'equipe not found');
  // Cascade Status
  deleteRowByKey(SHEET_NAMES.STATUS, 'equipe_id', body.equipe_id);
  return { equipe_id: body.equipe_id, deleted: true };
}

// Installable onEdit trigger — set up via Triggers menu (Equipes.gs > onEditEquipes > onEdit).
// Auto-fills equipe_id (from turma_id + slug(equipe_nome)) and created_at when both are present.
function onEditEquipes(e) {
  if (!e || !e.range) return;
  const sh = e.range.getSheet();
  if (sh.getName() !== SHEET_NAMES.EQUIPES) return;
  const row = e.range.getRow();
  if (row === 1) return;

  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const idColIdx = headers.indexOf('equipe_id');
  const turmaColIdx = headers.indexOf('turma_id');
  const nomeColIdx = headers.indexOf('equipe_nome');
  const createdColIdx = headers.indexOf('created_at');
  if (idColIdx === -1 || turmaColIdx === -1 || nomeColIdx === -1) return;

  const rowVals = sh.getRange(row, 1, 1, headers.length).getValues()[0];
  const turmaId = rowVals[turmaColIdx];
  const equipeNome = rowVals[nomeColIdx];
  const currentId = rowVals[idColIdx];
  if (!turmaId || !equipeNome) return;

  if (!currentId) {
    const newId = generateEquipeId(turmaId, equipeNome);
    sh.getRange(row, idColIdx + 1).setValue(newId);
  }
  if (createdColIdx !== -1 && !rowVals[createdColIdx]) {
    sh.getRange(row, createdColIdx + 1).setValue(nowIso());
  }
}
