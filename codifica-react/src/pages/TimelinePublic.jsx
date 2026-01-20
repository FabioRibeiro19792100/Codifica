import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, GraduationCap, School, Globe, BarChart3, Award, Users, Lightbulb, Calendar, Wrench, Mic, Sparkles, CheckCircle2, FileText, MessageSquare, Leaf, Video, TreePine, Theater, Target, Handshake, BookOpen, Mail, Rocket, Clock, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { loadGamificationData } from '../data/gamificationData'
import { getIcon } from '../utils/iconMap'
import PedagogicalBadgeModal from '../components/PedagogicalBadgeModal'
import Footer from '../components/Footer'
import './TimelinePublic.css'

function TimelinePublic() {
  const [data, setData] = useState(null)
  const [expandedPhases, setExpandedPhases] = useState([]) // IDs das fases expandidas
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false)
  const [selectedPedagogicalBadge, setSelectedPedagogicalBadge] = useState(null)
  const [showPedagogical, setShowPedagogical] = useState(() => {
    const saved = localStorage.getItem('showPedagogicalBadges')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    // Recarrega dados quando a página é montada ou quando há mudanças no localStorage
    const loadData = () => {
      setData(loadGamificationData())
    }
    loadData()
    
    // Escuta mudanças no localStorage (evento nativo para outras abas)
    window.addEventListener('storage', (e) => {
      if (e.key === 'showPedagogicalBadges') {
        setShowPedagogical(JSON.parse(e.newValue || 'false'))
      }
      loadData()
    })
    
    // Escuta evento customizado (para mesma aba)
    window.addEventListener('gamificationDataChanged', loadData)
    
    // Escuta mudanças no toggle pedagógico
    const handleToggleChange = (e) => {
      setShowPedagogical(e.detail)
    }
    window.addEventListener('pedagogicalToggleChanged', handleToggleChange)
    
    return () => {
      window.removeEventListener('storage', loadData)
      window.removeEventListener('gamificationDataChanged', loadData)
      window.removeEventListener('pedagogicalToggleChanged', handleToggleChange)
    }
  }, [])

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    )
  }

  if (!data) return <div>Carregando...</div>


  // Calcular estatísticas dinamicamente (contando apenas badges visíveis)
  const totalBadges = data.phases.reduce((sum, phase) => {
    const visibleBadges = phase.badges.filter(badge => {
      if (!showPedagogical) {
        return !badge.isPedagogical && !badge.competency && !badge.criteria
      }
      // Se toggle ligado, conta apenas básicos
      return badge.level !== 'advanced'
    })
    return sum + visibleBadges.length
  }, 0)
  const totalTrophies = data.allTrophies.length
  const totalPhases = data.phases.length

  return (
    <div className="timeline-container-page">
      <div className="container">
        <div className="timeline-section">
          <h2 className="timeline-section-title">
            <Rocket size={28} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Jornada Completa do Programa
          </h2>
          <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {data.phases.map((phase) => {
            const PhaseIcon = getIcon(phase.icon)
            const isExpanded = expandedPhases.includes(phase.id)
            
            return (
              <div key={phase.id} className="phase-section">
                <div 
                  className="phase-header clickable" 
                  onClick={() => togglePhase(phase.id)}
                >
                  <div className="phase-number">{phase.number}</div>
                  <div className="phase-info">
                    <div className="phase-title">
                      <PhaseIcon size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> {phase.title}
                    </div>
                    <div className="phase-date">
                      <Calendar size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}} />
                      <span className="phase-week">{phase.subtitle}</span>
                      <span className="phase-date-range">{phase.dateRange}</span>
                    </div>
                  </div>
                  <div className="phase-toggle">
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="phase-content">
                    <div className="what-happens">
                      <div className="section-subtitle">
                        {phase.number === 1 
                          ? "O que você (professor) faz nesta fase?"
                          : "O que acontece nesta fase?"
                        }
                      </div>
                      <ul className="activity-list">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="rewards-panel">
                      <div className="section-subtitle">
                        <Trophy size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> O que você pode conquistar?
                      </div>
                      <div className="badges-at-stake">
                        {phase.badges
                          .filter(badge => {
                            // Se toggle desligado, mostra apenas badges originais (sem isPedagogical)
                            if (!showPedagogical) {
                              // Garante que badge.isPedagogical seja explicitamente false ou undefined
                              // E também verifica se não tem competency ou criteria
                              return !badge.isPedagogical && !badge.competency && !badge.criteria
                            }
                            // Se toggle ligado, mostra apenas badges básicos (não avançados)
                            return badge.level !== 'advanced'
                          })
                          .map((badge) => {
                            const BadgeIcon = getIcon(badge.icon)
                            const isPedagogical = badge.isPedagogical || false
                            return (
                              <div 
                                key={badge.id} 
                                className={`badge-item-stake ${isPedagogical ? 'pedagogical-badge clickable' : ''} ${badge.level === 'advanced' ? 'advanced-badge' : ''}`}
                                onClick={isPedagogical ? () => setSelectedPedagogicalBadge(badge) : undefined}
                                style={isPedagogical ? { cursor: 'pointer' } : {}}
                              >
                                <div className="badge-icon-stake">
                                  <BadgeIcon size={24} />
                                </div>
                                <div className="badge-info-stake">
                                  <div className="badge-name-stake">
                                    {badge.name}
                                  </div>
                                  <div className="badge-desc-stake">{badge.description}</div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          </div>
        </div>
        
        <div className="legend">
          <div className="legend-title">
            <Target size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Entenda o Sistema de Reconhecimento
          </div>
          <div className="legend-grid">
            <div className="legend-item">
              <div className="legend-icon"><Award size={32} /></div>
              <div className="legend-text">
                <div className="legend-label">Badges Individuais</div>
                <div className="legend-desc">{totalBadges} conquistas para equipes ao longo da jornada</div>
              </div>
            </div>
            
            <div className="legend-item">
              <div className="legend-icon"><Trophy size={32} /></div>
              <div className="legend-text">
                <div className="legend-label">Troféus Escolares</div>
                <div className="legend-desc">{totalTrophies} reconhecimentos institucionais para escolas</div>
              </div>
            </div>
            
            <div className="legend-item">
              <div className="legend-icon"><Star size={32} /></div>
              <div className="legend-text">
                <div className="legend-label">Visibilidade Pública</div>
                <div className="legend-desc">Murais, galerias e destaques oficiais</div>
              </div>
            </div>
            
            <div className="legend-item">
              <div className="legend-icon"><GraduationCap size={32} /></div>
              <div className="legend-text">
                <div className="legend-label">Acessos Exclusivos</div>
                <div className="legend-desc">Plantões VIP, oficinas e mentorias especiais</div>
              </div>
            </div>
            
            <div className="legend-item">
              <div className="legend-icon"><Trophy size={32} /></div>
              <div className="legend-text">
                <div className="legend-label">Prêmio Principal</div>
                <div className="legend-desc">Prêmio TBD para o time vencedor</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="final-cta">
          <div className="final-cta-content">
            <h2>
              <Rocket size={28} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Pronto para Orientar suas Equipes?
            </h2>
            <p>
              Cadastre-se como professor orientador, organize suas equipes de estudantes<br />e embarque nesta jornada de inovação climática.
            </p>
            <p>
              <strong>Você pode orientar múltiplas equipes e ganhar reconhecimento especial!</strong>
            </p>
            <div className="cta-buttons">
              <button onClick={() => setIsComingSoonModalOpen(true)} className="btn btn-primary">
                <Sparkles size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}} /> Cadastrar Equipe
              </button>
              <button onClick={() => setIsComingSoonModalOpen(true)} className="btn btn-secondary">
                <Mail size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}} /> Tirar Dúvidas
              </button>
            </div>
          </div>
          
          <div className="teacher-tip">
            <Lightbulb size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px', flexShrink: 0}} />
            <div>
              <strong>Dica para Professores:</strong> Professores que orientam múltiplas equipes ganham o badge "Professor Multi-time" e acesso a sessões exclusivas. Quanto mais equipes participam dos workshops e plantões, maior o reconhecimento da sua escola!
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Coming Soon */}
      {isComingSoonModalOpen && (
        <div className="coming-soon-modal-overlay" onClick={() => setIsComingSoonModalOpen(false)}>
          <div className="coming-soon-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="coming-soon-modal-close" onClick={() => setIsComingSoonModalOpen(false)}>×</button>
            <h3>Em Breve</h3>
            <p>Estamos trabalhando para criar essas seções. Em breve você poderá cadastrar equipes e tirar dúvidas diretamente pela plataforma.</p>
            <button className="btn btn-primary" onClick={() => setIsComingSoonModalOpen(false)}>Entendi</button>
          </div>
        </div>
      )}
      
      <Footer />
      
      <PedagogicalBadgeModal
        isOpen={!!selectedPedagogicalBadge}
        onClose={() => setSelectedPedagogicalBadge(null)}
        badge={selectedPedagogicalBadge}
      />
    </div>
  )
}

export default TimelinePublic
