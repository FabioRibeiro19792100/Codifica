import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Globe, GraduationCap, School, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import './Navigation.css'

const NAV_ITEMS = [
  { to: '/timeline', icon: Globe, label: 'Timeline', roles: ['professor', 'gestor', 'admin'] },
  { to: '/teacher', icon: GraduationCap, label: 'Dashboard', roles: ['professor', 'admin'] },
  { to: '/school', icon: School, label: 'Dashboard', roles: ['gestor', 'admin'] },
  { to: '/admin', icon: Settings, label: 'Admin', roles: ['admin'] },
]

function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const visibleItems = NAV_ITEMS.filter(item =>
    user && item.roles.includes(user.role)
  )

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navigation">
      <div className="nav-background"></div>
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-left">
            <div className="nav-logo-wrapper">
              <Link to="/" className="nav-logo">
                <span>codifica+</span>
                <span className="nav-year">2026</span>
              </Link>
            </div>

            <div className="nav-links">
              {visibleItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {user && (
            <div className="nav-right">
              <span className="nav-user-name">{user.name}</span>
              <button className="nav-logout" onClick={handleLogout} title="Log out">
                <LogOut size={18} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
