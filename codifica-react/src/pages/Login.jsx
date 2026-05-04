import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, School, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
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
  const { login, getDefaultRoute } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!selectedRole) return
    login(selectedRole)
    const route = selectedRole === 'professor' ? '/teacher'
      : selectedRole === 'gestor' ? '/school'
      : '/admin'
    navigate(route)
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

          <button
            className="login-button"
            disabled={!selectedRole}
            onClick={handleLogin}
          >
            Enter
          </button>
        </div>

        <div className="login-footer">
          <p>GO UP! 2026 • British Council & Mastertech</p>
        </div>
      </div>
    </div>
  )
}

export default Login
