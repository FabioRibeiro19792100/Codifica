// Status (current_stage_id + earned_badge_ids per team).
// One row per equipe; POST upserts.

function readAllStatus() {
  const rows = readAllRows(SHEET_NAMES.STATUS);
  const out = {};
  rows.forEach(function (r) {
    if (!r.equipe_id) return;
    out[String(r.equipe_id)] = {
      equipe_id: String(r.equipe_id),
      current_stage_id: parseInt(r.current_stage_id, 10) || null,
      earned_badge_ids: parseCsvIntList(r.earned_badge_ids),
      last_submission_at: r.last_submission_at || null,
      last_submission_stage: r.last_submission_stage === '' ? null : (parseInt(r.last_submission_stage, 10) || null),
      observacoes: String(r.observacoes || ''),
      updated_at: r.updated_at || null,
      updated_by: String(r.updated_by || '')
    };
  });
  return out;
}

function readStatus(equipeId) {
  const all = readAllStatus();
  if (!equipeId) return Object.keys(all).map(function (k) { return all[k]; });
  return all[equipeId] || null;
}

function Status_get(params) {
  if (params.equipe_id) {
    const single = readStatus(params.equipe_id);
    if (!single) throw httpError('NOT_FOUND', 'no status for equipe_id: ' + params.equipe_id);
    return single;
  }
  return readStatus();
}

function validateStageId(id) {
  if (id === undefined || id === null || id === '') return null;
  const n = parseInt(id, 10);
  if (ALL_STAGE_IDS.indexOf(n) === -1) {
    throw httpError('BAD_REQUEST', 'invalid current_stage_id: ' + id);
  }
  return n;
}

function validateBadgeIds(ids) {
  if (!ids) return [];
  const arr = Array.isArray(ids) ? ids : String(ids).split(',');
  const out = [];
  arr.forEach(function (raw) {
    const n = parseInt(raw, 10);
    if (isNaN(n)) return;
    if (ALL_BADGE_IDS.indexOf(n) === -1) {
      throw httpError('BAD_REQUEST', 'unknown badge id: ' + n);
    }
    if (out.indexOf(n) === -1) out.push(n);
  });
  return out;
}

function Status_upsert(body) {
  if (!body.equipe_id) throw httpError('BAD_REQUEST', 'equipe_id required');
  const equipeExists = readEquipes({ equipe_id: body.equipe_id }).length > 0;
  if (!equipeExists) throw httpError('NOT_FOUND', 'equipe not found: ' + body.equipe_id);

  const fields = { equipe_id: body.equipe_id };
  if (body.current_stage_id !== undefined) {
    fields.current_stage_id = validateStageId(body.current_stage_id);
  }
  if (body.earned_badge_ids !== undefined) {
    fields.earned_badge_ids = intListToCsv(validateBadgeIds(body.earned_badge_ids));
  }
  if (body.last_submission_at !== undefined) fields.last_submission_at = body.last_submission_at;
  if (body.last_submission_stage !== undefined) {
    fields.last_submission_stage = validateStageId(body.last_submission_stage);
  }
  if (body.observacoes !== undefined) fields.observacoes = String(body.observacoes);
  fields.updated_at = nowIso();
  fields.updated_by = body.updated_by ? ('api:' + String(body.updated_by)) : 'api';

  upsertByKey(SHEET_NAMES.STATUS, 'equipe_id', body.equipe_id, fields);
  return readStatus(body.equipe_id);
}
