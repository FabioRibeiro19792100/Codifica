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
