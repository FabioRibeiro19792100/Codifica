import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Home as HomeIcon, Globe, GraduationCap, Users, School, Settings, BookOpen } from 'lucide-react'
import './Navigation.css'

function Navigation() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [showPedagogical, setShowPedagogical] = useState(() => {
    const saved = localStorage.getItem('showPedagogicalBadges')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('showPedagogicalBadges', JSON.stringify(showPedagogical))
    // Dispara evento para atualizar outras páginas
    window.dispatchEvent(new CustomEvent('pedagogicalToggleChanged', { 
      detail: showPedagogical 
    }))
  }, [showPedagogical])

  return (
    <nav className="navigation">
      <div className="nav-background"></div>
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-left">
            <div className="nav-logo-wrapper">
              <Link 
                to="/" 
                className="nav-logo"
              >
                <span>codifica+</span>
                <span className="nav-year">2026</span>
              </Link>
              
              {isHomePage && (
                <div className="nav-menu">
                  <a href="#fluxo-sistema" className="nav-menu-item">
                    Fluxo do Sistema
                  </a>
                  <a href="#modelos-badges" className="nav-menu-item">
                    Sistemas de Badges
                  </a>
                  <a href="#paginas-sistema" className="nav-menu-item">
                    Seções do Sistema
                  </a>
                  <a href="#informacoes" className="nav-menu-item">
                    Informações
                  </a>
                </div>
              )}
            </div>
            
            <div className="nav-links">
              <Link 
                to="/timeline" 
                className={`nav-link ${location.pathname === '/timeline' ? 'active' : ''}`}
              >
                <Globe size={18} />
                <span>Timeline</span>
              </Link>
              <Link 
                to="/teacher" 
                className={`nav-link ${location.pathname === '/teacher' ? 'active' : ''}`}
              >
                <GraduationCap size={18} />
                <span>Professor</span>
              </Link>
              <Link 
                to="/team" 
                className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}
              >
                <Users size={18} />
                <span>Equipe</span>
              </Link>
              <Link 
                to="/school" 
                className={`nav-link ${location.pathname === '/school' ? 'active' : ''}`}
              >
                <School size={18} />
                <span>Escola</span>
              </Link>
            </div>
          </div>
          
          <div className="nav-right">
            <div className="pedagogical-toggle">
              <BookOpen size={16} />
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={showPedagogical}
                  onChange={(e) => setShowPedagogical(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">Badges Pedagógicos</span>
            </div>
            
            <Link 
              to="/admin" 
              className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
            >
              <Settings size={18} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
