// Write-endpoint auth via shared secret stored in PropertiesService.
// To set the token: Project Settings → Script Properties → add WRITE_TOKEN.
// Optional WRITE_TOKEN_PREV supports overlapping rotation windows.

function getWriteToken() {
  return PropertiesService.getScriptProperties().getProperty('WRITE_TOKEN') || '';
}

function getPrevWriteToken() {
  return PropertiesService.getScriptProperties().getProperty('WRITE_TOKEN_PREV') || '';
}

function constantTimeEquals(a, b) {
  a = String(a || '');
  b = String(b || '');
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i));
  }
  return mismatch === 0;
}

function requireWriteToken(body) {
  const provided = body && body.token;
  const current = getWriteToken();
  const previous = getPrevWriteToken();
  if (!current) {
    throw httpError('INTERNAL', 'WRITE_TOKEN not configured in Script Properties');
  }
  if (constantTimeEquals(provided, current)) return;
  if (previous && constantTimeEquals(provided, previous)) return;
  throw httpError('UNAUTHORIZED', 'invalid token');
}

function httpError(code, message) {
  const err = new Error(message);
  err._apiCode = code;
  return err;
}
