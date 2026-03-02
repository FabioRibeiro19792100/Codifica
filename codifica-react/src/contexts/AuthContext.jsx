import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Simulated profiles per role — when backend exists, this comes from API
const MOCK_PROFILES = {
  professor: {
    name: 'Prof. Sarah Johnson',
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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('learning_sectors_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('learning_sectors_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('learning_sectors_user')
    }
  }, [user])

  const login = (role) => {
    const profile = MOCK_PROFILES[role]
    setUser({ role, ...profile })
  }

  const logout = () => {
    setUser(null)
  }

  const getDefaultRoute = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'professor': return '/teacher'
      case 'gestor': return '/school'
      case 'admin': return '/admin'
      default: return '/login'
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getDefaultRoute }}>
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
