import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, School, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { BACKEND_ENABLED, BACKEND_BASE } from '../config/api'
import './Login.css'

const ROLES = [
  {
    id: 'professor',
    label: 'Teacher',
    description: 'Track your teams, view badges, monitor student progress and the competency analytics dashboard.',
    icon: GraduationCap,
  },
  {
    id: 'gestor',
    label: 'School Manager',
    description: 'View school distinctions, state ranking, and collective team performance.',
    icon: School,
  },
  {
    id: 'admin',
    label: 'Administrator',
    description: 'Configure stages, badges, distinctions, and program activities.',
    icon: Settings,
  },
]

function Login() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!selectedRole) return
    setSubmitting(true)
    try {
      const overrides = selectedRole === 'professor' && email.trim() ? { email: email.trim().toLowerCase() } : {}
      await login(selectedRole, overrides)
      const route = selectedRole === 'professor' ? '/teacher'
        : selectedRole === 'gestor' ? '/school'
        : '/admin'
      navigate(route)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">GO UP!</h1>
          <p className="login-year">2026</p>
          <p className="login-subtitle">Growing Opportunities Unlocking Potential</p>
        </div>

        <div className="login-form">
          <h2 className="login-prompt">How will you access?</h2>

          <div className="role-options">
            {ROLES.map((role) => {
              const Icon = role.icon
              return (
                <button
                  key={role.id}
                  className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="role-icon">
                    <Icon size={32} />
                  </div>
                  <div className="role-info">
                    <div className="role-label">{role.label}</div>
                    <div className="role-description">{role.description}</div>
                  </div>
                </button>
              )
            })}
          </div>

          {selectedRole === 'professor' && (
            <div className="login-email-field">
              <label htmlFor="login-email">Your registration email (optional)</label>
              <input
                id="login-email"
                type="email"
                placeholder="sarah@etec.sp.gov.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <small>Used to load your enrolled classes from the backend. Leave blank to use mock data.</small>
            </div>
          )}

          <button
            className="login-button"
            disabled={!selectedRole || submitting}
            onClick={handleLogin}
          >
            {submitting ? 'Loading…' : 'Enter'}
          </button>
        </div>

        <div className="login-footer">
          <p>GO UP! 2026 • British Council & Mastertech</p>
          <p className={`backend-status ${BACKEND_ENABLED ? 'connected' : 'mock'}`}>
            {BACKEND_ENABLED
              ? `✓ Backend connected: ${new URL(BACKEND_BASE).host}`
              : '⚠ Backend not configured — running in mock mode (set VITE_BACKEND_BASE in Vercel)'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
