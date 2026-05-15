// Backend service layer for the Google Apps Script Web App.
// All POSTs use Content-Type: text/plain to avoid CORS preflight that Apps Script
// cannot handle. Token is sent in the JSON body, never as a header.

import { BACKEND_BASE, BACKEND_TOKEN, BACKEND_ENABLED, backendUrl } from '../config/api'

const CACHE_TTL_MS = 60_000
const cache = new Map()

function readCache(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.at > CACHE_TTL_MS) {
    cache.delete(key)
    return null
  }
  return entry.value
}

function writeCache(key, value) {
  cache.set(key, { at: Date.now(), value })
}

function invalidateCache(prefix) {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) cache.delete(key)
  }
}

async function getJson(url) {
  const cached = readCache(url)
  if (cached) return cached
  const res = await fetch(url)
  const json = await res.json()
  if (!json.ok) {
    const err = new Error(json.error?.message || 'Backend error')
    err.code = json.error?.code || 'INTERNAL'
    throw err
  }
  writeCache(url, json.data)
  return json.data
}

async function postJson(payload) {
  if (!BACKEND_BASE) throw new Error('Backend not configured')
  const res = await fetch(BACKEND_BASE, {
    method: 'POST',
    body: JSON.stringify({ token: BACKEND_TOKEN, ...payload }),
  })
  const json = await res.json()
  if (!json.ok) {
    const err = new Error(json.error?.message || 'Backend error')
    err.code = json.error?.code || 'INTERNAL'
    throw err
  }
  return json.data
}

export function fetchTurmas(params = {}) {
  return getJson(backendUrl({ resource: 'turmas', ...params }))
}

export function fetchEquipesByTurma(turma_id) {
  return getJson(backendUrl({ resource: 'equipes', turma_id }))
}

export function fetchEquipesByProfessor(professor_email) {
  return getJson(backendUrl({ resource: 'equipes', professor_email }))
}

export async function fetchEquipe(equipe_id) {
  const list = await getJson(backendUrl({ resource: 'equipes', equipe_id }))
  return list[0] || null
}

export function fetchStatus(equipe_id) {
  return getJson(backendUrl(equipe_id ? { resource: 'status', equipe_id } : { resource: 'status' }))
}

export function fetchProfessorBundle(email) {
  return getJson(backendUrl({ resource: 'professor', email }))
}

export async function updateTeamStatus({ equipe_id, current_stage_id, earned_badge_ids, last_submission_at, last_submission_stage, observacoes, updated_by }) {
  const data = await postJson({
    resource: 'status',
    equipe_id,
    current_stage_id,
    earned_badge_ids,
    last_submission_at,
    last_submission_stage,
    observacoes,
    updated_by,
  })
  invalidateCache(BACKEND_BASE) // status changes can affect equipes/professor bundles
  return data
}

export async function upsertEquipe({ action, ...fields }) {
  const data = await postJson({ resource: 'equipe', action, ...fields })
  invalidateCache(BACKEND_BASE)
  return data
}

export async function rebuildTurmasRemote() {
  const data = await postJson({ resource: 'turmas', action: 'rebuild' })
  invalidateCache(BACKEND_BASE)
  return data
}

export { BACKEND_ENABLED }
