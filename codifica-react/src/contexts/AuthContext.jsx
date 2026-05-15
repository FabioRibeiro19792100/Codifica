import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { fetchProfessorBundle, BACKEND_ENABLED } from '../services/backendService'
import { enrolledClasses, teamsCatalog } from '../data/gamificationData'

const AuthContext = createContext(null)

const BUNDLE_KEY = 'goup_professor_bundle'

// Default profiles per role for local/mock use. The professor email is what triggers
// hydration from the Sheets backend when BACKEND_ENABLED.
const MOCK_PROFILES = {
  professor: {
    name: 'Prof. Sarah Johnson',
    email: 'sarah@etec.sp.gov.br',
    school: 'E.E. Professor João Silva',
    location: 'São Paulo, SP',
  },
  gestor: {
    name: 'Maria Helena Santos',
    school: 'E.E. Professor João Silva',
    location: 'São Paulo, SP • Zona Leste',
  },
  admin: {
    name: 'Administrador',
    school: 'Conselho Britânico',
    location: '',
  },
}

// Builds turmas/equipes from the existing mock data (for fallback when backend is off).
function buildMockBundle(name) {
  const turmas = enrolledClasses
    .filter((c) => c.teacher === name)
    .map((c) => ({
      turma_id: c.id,
      etec_numero: '',
      etec_nome: c.school,
      turma_nome: c.name,
      professor_lead_email: '',
      professor_lead_nome: c.teacher,
      students_count_estimate: c.studentsCount,
      status: c.status,
      equipe_count: c.teamIds.length,
    }))

  const equipes = enrolledClasses
    .filter((c) => c.teacher === name)
    .flatMap((c) =>
      c.teamIds.map((tid) => {
        const meta = teamsCatalog[tid] || { name: tid, currentStage: 1, badgesCount: 0, membersCount: 0 }
        return {
          equipe_id: tid,
          turma_id: c.id,
          equipe_nome: meta.name,
          membros: [],
          professor_responsavel_email: '',
          english_track: true,
          english_teacher_email: '',
          created_at: '',
          status: {
            equipe_id: tid,
            current_stage_id: meta.currentStage,
            earned_badge_ids: [],
            last_submission_at: null,
            last_submission_stage: null,
            observacoes: '',
            updated_at: null,
            updated_by: 'mock',
          },
        }
      })
    )

  return { turmas, equipes }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('learning_sectors_user')
    return saved ? JSON.parse(saved) : null
  })
  const [bundle, setBundle] = useState(() => {
    const saved = localStorage.getItem(BUNDLE_KEY)
    return saved ? JSON.parse(saved) : { turmas: [], equipes: [] }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('learning_sectors_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('learning_sectors_user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem(BUNDLE_KEY, JSON.stringify(bundle))
  }, [bundle])

  // Auto-hydrate on mount when a user is restored from localStorage but bundle is empty
  // (e.g. user refreshes the page after a previous login).
  useEffect(() => {
    if (user && user.role === 'professor' && bundle.turmas.length === 0 && bundle.equipes.length === 0) {
      hydrateBundle(user.role, user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hydrateBundle = useCallback(async (role, profile) => {
    if (role !== 'professor') {
      setBundle({ turmas: [], equipes: [] })
      return
    }
    if (BACKEND_ENABLED && profile.email) {
      try {
        const data = await fetchProfessorBundle(profile.email)
        setBundle({ turmas: data.turmas || [], equipes: data.equipes || [] })
        return
      } catch (err) {
        console.warn('fetchProfessorBundle failed; falling back to mock', err)
      }
    }
    setBundle(buildMockBundle(profile.name))
  }, [])

  const login = useCallback(async (role, overrides = {}) => {
    const profile = { ...MOCK_PROFILES[role], ...overrides }
    setUser({ role, ...profile })
    await hydrateBundle(role, profile)
  }, [hydrateBundle])

  const logout = useCallback(() => {
    setUser(null)
    setBundle({ turmas: [], equipes: [] })
  }, [])

  const refreshBundle = useCallback(async () => {
    if (!user) return
    await hydrateBundle(user.role, user)
  }, [user, hydrateBundle])

  const getDefaultRoute = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'professor': return '/teacher'
      case 'gestor': return '/school'
      case 'admin': return '/admin'
      default: return '/login'
    }
  }

  const value = {
    user,
    login,
    logout,
    getDefaultRoute,
    turmas: bundle.turmas,
    equipes: bundle.equipes,
    refreshBundle,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
