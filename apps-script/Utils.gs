// Shared helpers, sheet access, ETEC directory, badge id source-of-truth.
// IMPORTANT: ALL_BADGE_IDS mirrors codifica-react/src/data/gamificationData.js
// (stages[].badges[].id). When the frontend catalog changes, update here too.

const SHEET_NAMES = {
  INSCRICOES: 'Inscricoes',
  TURMAS: 'Turmas',
  EQUIPES: 'Equipes',
  STATUS: 'Status',
  CONFIG: 'Config'
};

const ALL_BADGE_IDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const ALL_STAGE_IDS = [1,2,3];

// ETEC numero -> nome lookup. Extend as needed; missing entries fall back to "ETEC {numero}".
const ETEC_DIR = {
  '107': 'ETEC Prof. Camargo Aranha',
  '136': 'ETEC Adolpho Berezin'
};

function sheet(name) {
  const s = SpreadsheetApp.getActive().getSheetByName(name);
  if (!s) throw new Error('Sheet not found: ' + name);
  return s;
}

function rowsToObjects(values) {
  if (!values || values.length < 2) return [];
  const headers = values[0];
  const out = [];
  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    if (row.every(function (c) { return c === '' || c === null; })) continue;
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c];
    }
    out.push(obj);
  }
  return out;
}

function objectsToRows(objects, headers) {
  return objects.map(function (o) {
    return headers.map(function (h) {
      return o[h] === undefined || o[h] === null ? '' : o[h];
    });
  });
}

function readAllRows(sheetName) {
  const range = sheet(sheetName).getDataRange();
  return rowsToObjects(range.getValues());
}

// Upsert keyed by a column. fields = partial object. Returns the resulting full row object.
function upsertByKey(sheetName, keyColumn, key, fields) {
  const sh = sheet(sheetName);
  const data = sh.getDataRange().getValues();
  if (data.length === 0) throw new Error('Empty sheet (no header): ' + sheetName);
  const headers = data[0];
  const keyIdx = headers.indexOf(keyColumn);
  if (keyIdx === -1) throw new Error('Key column not found: ' + keyColumn + ' in ' + sheetName);

  // Find existing row
  for (let r = 1; r < data.length; r++) {
    if (String(data[r][keyIdx]) === String(key)) {
      const merged = {};
      headers.forEach(function (h, i) { merged[h] = data[r][i]; });
      Object.keys(fields).forEach(function (k) {
        if (headers.indexOf(k) !== -1) merged[k] = fields[k];
      });
      const newRow = headers.map(function (h) { return merged[h] === undefined ? '' : merged[h]; });
      sh.getRange(r + 1, 1, 1, headers.length).setValues([newRow]);
      return merged;
    }
  }
  // Append new
  const newObj = Object.assign({}, fields);
  newObj[keyColumn] = key;
  const newRow = headers.map(function (h) { return newObj[h] === undefined ? '' : newObj[h]; });
  sh.appendRow(newRow);
  return newObj;
}

function deleteRowByKey(sheetName, keyColumn, key) {
  const sh = sheet(sheetName);
  const data = sh.getDataRange().getValues();
  const headers = data[0];
  const keyIdx = headers.indexOf(keyColumn);
  for (let r = 1; r < data.length; r++) {
    if (String(data[r][keyIdx]) === String(key)) {
      sh.deleteRow(r + 1);
      return true;
    }
  }
  return false;
}

function slug(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function nowIso() {
  const d = new Date();
  const pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
         pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

function etecNome(numero) {
  const key = String(numero).trim();
  return ETEC_DIR[key] || ('ETEC ' + key);
}

function parseCsvIntList(value) {
  if (value === '' || value === null || value === undefined) return [];
  return String(value).split(',').map(function (s) {
    const n = parseInt(s.trim(), 10);
    return isNaN(n) ? null : n;
  }).filter(function (n) { return n !== null; });
}

function intListToCsv(arr) {
  if (!arr || arr.length === 0) return '';
  return arr.map(function (n) { return parseInt(n, 10); })
    .filter(function (n) { return !isNaN(n); })
    .join(',');
}
