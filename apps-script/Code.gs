// Router for the GO UP! backend Web App.
// Deploy: Deploy → New deployment → Web app, Execute as Me, Anyone with link.
// After any code change, create a New version of the deployment for /exec to serve it.

function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    const resource = params.resource;
    let data;
    switch (resource) {
      case 'turmas':    data = Turmas_list(params); break;
      case 'equipes':   data = Equipes_list(params); break;
      case 'status':    data = Status_get(params); break;
      case 'professor': data = Professor_bundle(params); break;
      case 'health':    data = { ok: true, version: getDeploymentVersion() }; break;
      default:
        throw httpError('BAD_REQUEST', 'unknown resource: ' + resource);
    }
    return jsonResponse({ ok: true, data: data });
  } catch (err) {
    return errorResponse(err);
  }
}

function doPost(e) {
  try {
    const body = parseBody(e);
    const resource = body.resource;
    if (!resource) throw httpError('BAD_REQUEST', 'resource required');
    requireWriteToken(body);
    let data;
    switch (resource) {
      case 'status':  data = Status_upsert(body); break;
      case 'equipe':  data = Equipes_mutate(body); break;
      case 'turmas':
        if (body.action === 'rebuild') {
          data = rebuildTurmas();
        } else {
          throw httpError('BAD_REQUEST', 'unknown turmas action: ' + body.action);
        }
        break;
      default:
        throw httpError('BAD_REQUEST', 'unknown resource: ' + resource);
    }
    return jsonResponse({ ok: true, data: data });
  } catch (err) {
    return errorResponse(err);
  }
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    throw httpError('BAD_REQUEST', 'invalid JSON body');
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(err) {
  const code = err && err._apiCode ? err._apiCode : 'INTERNAL';
  const message = err && err.message ? err.message : 'unknown error';
  return jsonResponse({ ok: false, error: { code: code, message: message } });
}

// ---------- Turmas list (lives in Code.gs because it joins multiple tabs) ----------

function Turmas_list(params) {
  const turmas = readAllRows(SHEET_NAMES.TURMAS).filter(function (t) { return t.turma_id; });
  const equipesByTurma = {};
  readEquipes().forEach(function (eq) {
    equipesByTurma[eq.turma_id] = (equipesByTurma[eq.turma_id] || 0) + 1;
  });

  const profFilter = params.professor_email ? String(params.professor_email).toLowerCase() : null;
  const etecFilter = params.etec_numero ? String(params.etec_numero) : null;
  const statusFilter = params.status || null;

  return turmas
    .filter(function (t) {
      if (profFilter && String(t.professor_lead_email).toLowerCase() !== profFilter) return false;
      if (etecFilter && String(t.etec_numero) !== etecFilter) return false;
      if (statusFilter && String(t.status) !== statusFilter) return false;
      return true;
    })
    .map(function (t) {
      return {
        turma_id: String(t.turma_id),
        etec_numero: String(t.etec_numero),
        etec_nome: String(t.etec_nome || ''),
        turma_nome: String(t.turma_nome || ''),
        professor_lead_email: String(t.professor_lead_email || '').toLowerCase(),
        professor_lead_nome: String(t.professor_lead_nome || ''),
        students_count_estimate: parseInt(t.students_count_estimate, 10) || 0,
        status: String(t.status || 'active'),
        equipe_count: equipesByTurma[String(t.turma_id)] || 0
      };
    });
}

// ---------- Hydrate-on-login bundle ----------

function Professor_bundle(params) {
  if (!params.email) throw httpError('BAD_REQUEST', 'email required');
  const inscricao = findInscricaoByEmail(params.email);
  const professor = safeProfessorView(inscricao) || {
    email: String(params.email).toLowerCase(),
    nome: '',
    etec_numeros: []
  };
  const turmas = Turmas_list({ professor_email: professor.email });
  const turmaIds = turmas.map(function (t) { return t.turma_id; });
  const status = readAllStatus();
  const equipes = readEquipes()
    .filter(function (e) { return turmaIds.indexOf(e.turma_id) !== -1; })
    .map(function (e) {
      return Object.assign({}, e, { status: status[e.equipe_id] || null });
    });
  return { professor: professor, turmas: turmas, equipes: equipes };
}

function getDeploymentVersion() {
  return PropertiesService.getScriptProperties().getProperty('VERSION') || 'dev';
}
