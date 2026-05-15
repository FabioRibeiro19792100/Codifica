// One-time bootstrap: run setupWorkbook() from the Apps Script editor to create
// all five tabs (Inscricoes, Turmas, Equipes, Status, Config) with headers, validations
// and frozen header rows. Idempotent — safe to re-run; existing tabs are left alone.

function setupWorkbook() {
  const ss = SpreadsheetApp.getActive();
  const created = [];

  // Inscricoes — raw paste from Microsoft Forms export
  const inscricoesHeaders = [
    'Id', 'Start time', 'Completion time', 'Email', 'Name',
    'LGPD declaration', 'Classes count', 'Full name', 'CPF', 'Best email',
    'Mobile', 'Age range', 'Ethnicity', 'Gender identity', 'Disability',
    'Students total', 'ETEC numbers', 'Classes raw', 'Grades taught',
    'Other components', 'Prior IT/CT knowledge', 'Authorisation',
    'Documentation declaration', '_imported_at'
  ];
  if (ensureSheet(ss, SHEET_NAMES.INSCRICOES, inscricoesHeaders)) created.push(SHEET_NAMES.INSCRICOES);

  // Turmas — derived
  const turmasHeaders = [
    'turma_id', 'etec_numero', 'etec_nome', 'turma_nome',
    'professor_lead_email', 'professor_lead_nome',
    'students_count_estimate', 'status', '_inscricao_id'
  ];
  if (ensureSheet(ss, SHEET_NAMES.TURMAS, turmasHeaders)) created.push(SHEET_NAMES.TURMAS);
  applyValidationList(ss.getSheetByName(SHEET_NAMES.TURMAS), 'status', ['active', 'inactive']);

  // Equipes — manual
  const equipesHeaders = [
    'equipe_id', 'turma_id', 'equipe_nome', 'membros',
    'professor_responsavel_email', 'english_track',
    'english_teacher_email', 'created_at'
  ];
  if (ensureSheet(ss, SHEET_NAMES.EQUIPES, equipesHeaders)) created.push(SHEET_NAMES.EQUIPES);
  applyTurmaIdValidation(ss);
  applyCheckbox(ss.getSheetByName(SHEET_NAMES.EQUIPES), 'english_track');

  // Status — current stage + badges
  const statusHeaders = [
    'equipe_id', 'current_stage_id', 'earned_badge_ids',
    'last_submission_at', 'last_submission_stage',
    'observacoes', 'updated_at', 'updated_by'
  ];
  if (ensureSheet(ss, SHEET_NAMES.STATUS, statusHeaders)) created.push(SHEET_NAMES.STATUS);
  applyEquipeIdValidation(ss);
  applyValidationList(ss.getSheetByName(SHEET_NAMES.STATUS), 'current_stage_id', ['1', '2', '3']);
  applyValidationList(ss.getSheetByName(SHEET_NAMES.STATUS), 'last_submission_stage', ['1', '2', '3']);

  // Config
  const configHeaders = ['key', 'value', 'notes'];
  if (ensureSheet(ss, SHEET_NAMES.CONFIG, configHeaders)) created.push(SHEET_NAMES.CONFIG);
  seedConfigDefaults(ss.getSheetByName(SHEET_NAMES.CONFIG));

  SpreadsheetApp.getUi().alert(
    created.length > 0
      ? 'Workbook ready. Created tabs: ' + created.join(', ')
      : 'All tabs already existed — validations refreshed.'
  );
}

function ensureSheet(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#f3f3f3');
    sh.autoResizeColumns(1, headers.length);
    return true;
  }
  return false;
}

function applyValidationList(sh, columnHeader, allowed) {
  if (!sh) return;
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const idx = headers.indexOf(columnHeader);
  if (idx === -1) return;
  const range = sh.getRange(2, idx + 1, sh.getMaxRows() - 1, 1);
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(allowed, true)
    .setAllowInvalid(true)
    .build();
  range.setDataValidation(rule);
}

function applyCheckbox(sh, columnHeader) {
  if (!sh) return;
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const idx = headers.indexOf(columnHeader);
  if (idx === -1) return;
  const range = sh.getRange(2, idx + 1, sh.getMaxRows() - 1, 1);
  range.insertCheckboxes();
}

function applyTurmaIdValidation(ss) {
  const equipes = ss.getSheetByName(SHEET_NAMES.EQUIPES);
  const turmas = ss.getSheetByName(SHEET_NAMES.TURMAS);
  if (!equipes || !turmas) return;
  const headers = equipes.getRange(1, 1, 1, equipes.getLastColumn()).getValues()[0];
  const idx = headers.indexOf('turma_id');
  if (idx === -1) return;
  const sourceRange = turmas.getRange('A2:A');
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(sourceRange, true)
    .setAllowInvalid(true)
    .build();
  equipes.getRange(2, idx + 1, equipes.getMaxRows() - 1, 1).setDataValidation(rule);
}

function applyEquipeIdValidation(ss) {
  const status = ss.getSheetByName(SHEET_NAMES.STATUS);
  const equipes = ss.getSheetByName(SHEET_NAMES.EQUIPES);
  if (!status || !equipes) return;
  const headers = status.getRange(1, 1, 1, status.getLastColumn()).getValues()[0];
  const idx = headers.indexOf('equipe_id');
  if (idx === -1) return;
  const sourceRange = equipes.getRange('A2:A');
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(sourceRange, true)
    .setAllowInvalid(true)
    .build();
  status.getRange(2, idx + 1, status.getMaxRows() - 1, 1).setDataValidation(rule);
}

function seedConfigDefaults(sh) {
  if (!sh) return;
  const existing = sh.getDataRange().getValues();
  const keys = existing.slice(1).map(function (r) { return r[0]; });
  const defaults = [
    ['cohort', '2026', 'current challenge year'],
    ['frontend_origins', 'https://goup.vercel.app,http://localhost:5173', 'comma-sep'],
  ];
  defaults.forEach(function (row) {
    if (keys.indexOf(row[0]) === -1) {
      sh.appendRow(row);
    }
  });
}

// Convenience: install the onEdit trigger for Equipes auto-fill.
function installEquipesTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function (t) {
    if (t.getHandlerFunction() === 'onEditEquipes') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onEditEquipes')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();
  SpreadsheetApp.getUi().alert('onEditEquipes trigger installed.');
}
