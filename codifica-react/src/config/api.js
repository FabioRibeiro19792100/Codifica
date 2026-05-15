// Configuração da API
// Substitua pela URL do seu host que começa com 9
export const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:3000'

export const API_ENDPOINTS = {
  teams: `${API_HOST}/api/teams`,
  badges: `${API_HOST}/api/badges`,
  trophies: `${API_HOST}/api/trophies`,
  progress: `${API_HOST}/api/progress`,
  ranking: `${API_HOST}/api/ranking`,
}

// Google Apps Script Web App backend (turmas / equipes / status).
// Set VITE_BACKEND_BASE to the deployment /exec URL and VITE_BACKEND_TOKEN to the
// shared WRITE_TOKEN configured in the Apps Script Script Properties.
// When VITE_BACKEND_BASE is empty, the frontend falls back to the mock data in
// src/data/gamificationData.js so local dev keeps working without env vars.
export const BACKEND_BASE = import.meta.env.VITE_BACKEND_BASE || ''
export const BACKEND_TOKEN = import.meta.env.VITE_BACKEND_TOKEN || ''
export const BACKEND_ENABLED = Boolean(BACKEND_BASE)

export const backendUrl = ({ resource, ...params }) => {
  if (!BACKEND_BASE) return ''
  const qs = new URLSearchParams({ resource, ...params }).toString()
  return `${BACKEND_BASE}?${qs}`
}
