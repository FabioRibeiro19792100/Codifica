import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Users, Globe, Trophy, Lightbulb, Calendar, Wrench, Mic, Award, Sparkles, BarChart3, Rocket, Target, FileText, MessageSquare, Leaf, Video, TreePine, Theater, Gift, Handshake, School, Megaphone, Radio, Zap, Star } from 'lucide-react'
import { loadGamificationData } from '../data/gamificationData'
import { getIcon } from '../utils/iconMap'
import BadgesModal from '../components/BadgesModal'
import ProgressModal from '../components/ProgressModal'
import ShowcaseModal from '../components/ShowcaseModal'
import Footer from '../components/Footer'
import './TeamDashboard.css'

function TeamDashboard() {
  const [data, setData] = useState(null)
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isShowcaseModalOpen, setIsShowcaseModalOpen] = useState(false)

  useEffect(() => {
    const loadData = () => {
      setData(loadGamificationData())
    }
    loadData()
    window.addEventListener('storage', loadData)
    window.addEventListener('gamificationDataChanged', loadData)
    return () => {
      window.removeEventListener('storage', loadData)
      window.removeEventListener('gamificationDataChanged', loadData)
    }
  }, [])

  if (!data) return <div>Carregando...</div>

  // Calcular progresso dinamicamente
  const totalBadges = data.phases.reduce((sum, phase) => sum + phase.badges.length, 0)
  
  // Criar lista de todos os badges com informações de fase
  const allBadges = data.phases.flatMap((phase, phaseIndex) => 
    phase.badges.map((badge, badgeIndex) => ({
      ...badge,
      phaseNumber: phase.number,
      phaseTitle: phase.title,
      phaseIndex,
      badgeIndex,
      globalIndex: data.phases.slice(0, phaseIndex).reduce((sum, p) => sum + p.badges.length, 0) + badgeIndex
    }))
  )
  
  // Mock - fase atual da equipe e badges conquistados (em produção viria da API)
  const currentPhaseNumber = 3 // Mock: equipe está na fase de Prototipagem
  // Badges individuais conquistados - pode ter alguns da fase atual
  // Exemplo: na Prototipagem, pode ter Workshop e Plantão, mas ainda não o Protótipo Concluído
  // IDs: 1-3 (Fase 1 completa), 4-6 (Fase 2 completa), 8-9 (Fase 3 parcial - só Workshop e Plantão)
  const earnedBadgeIds = [1, 2, 3, 4, 5, 6, 8, 9] // Mock: todos da fase 1 (3), todos da fase 2 (3), 2 da fase 3 (Workshop e Plantão)
  
  const earnedBadges = earnedBadgeIds.length
  const progress = Math.round((earnedBadges / totalBadges) * 100)
  
  // Calcular ranges de badges por fase
  const phaseRanges = data.phases.map((phase, index) => {
    const startBadge = index === 0 ? 1 : data.phases.slice(0, index).reduce((sum, p) => sum + p.badges.length, 0) + 1
    const endBadge = startBadge + phase.badges.length - 1
    return {
      phase,
      startBadge,
      endBadge,
      badgeCount: phase.badges.length
    }
  })

  return (
    <div className="team-dashboard">
      <div className="container">
        <div className="team-info">
          <div className="team-header">
            <div>
              <div className="team-name">Equipe EcoTech Solutions</div>
              <div className="team-teacher">
                <GraduationCap size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}} />
                Professor: Prof. Carlos Eduardo Silva
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="stat-item clickable" onClick={() => setIsBadgesModalOpen(true)}>
              <div className="stat-number">{earnedBadges}</div>
              <div className="stat-label">Badges Conquistados</div>
            </div>
            <div className="stat-item clickable" onClick={() => setIsProgressModalOpen(true)}>
              <div className="stat-number">{progress}%</div>
              <div className="stat-label">Jornada Completa</div>
            </div>
            <div className="stat-item clickable" onClick={() => setIsShowcaseModalOpen(true)}>
              <div className="stat-number">3</div>
              <div className="stat-label">Vitrines Públicas</div>
            </div>
          </div>
        </div>
        
        <div className="badges-section">
          <h2 className="section-title">
            <Trophy size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Seus Badges
          </h2>
          
          {data.phases.map((phase, phaseIdx) => {
            const PhaseIcon = getIcon(phase.icon)
            
            return (
              <div key={phase.id}>
                <div style={{margin: phaseIdx === 0 ? '0 0 30px 0' : '40px 0 30px 0'}}>
                  <span className="phase-indicator">
                    <PhaseIcon size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}} /> {phase.title}
                  </span>
                </div>
                
                <div className="badges-grid">
                  {phase.badges.map((badge) => {
                    const BadgeIcon = getIcon(badge.icon)
                    // Badge conquistado baseado na lista individual de badges conquistados
                    const isEarned = earnedBadgeIds.includes(badge.id)
                    
                    return (
                      <div key={badge.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
                        <div className="badge-icon">
                          <BadgeIcon size={48} />
                        </div>
                        <div className="badge-name">{badge.name}</div>
                        <div className="badge-description">{badge.description}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        
      </div>

      {/* Mock data for earned badges */}
      {(() => {
        const earnedBadgeList = allBadges.filter(badge => earnedBadgeIds.includes(badge.id))
        return (
          <BadgesModal
            isOpen={isBadgesModalOpen}
            onClose={() => setIsBadgesModalOpen(false)}
            badges={earnedBadgeList}
            title="Badges Conquistados"
          />
        )
      })()}

      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        progressData={{
          average: progress,
          teams: [{
            name: "EcoTech Solutions",
            progress: progress
          }]
        }}
        title="Jornada Completa"
      />

      <ShowcaseModal
        isOpen={isShowcaseModalOpen}
        onClose={() => setIsShowcaseModalOpen(false)}
        showcases={[
          {
            title: "Mural Ideias em Movimento",
            description: "Sua equipe foi destaque no mural público após a conclusão da fase de Ideação com excelência.",
            date: "25 de Março, 2026"
          },
          {
            title: "Mural Protótipos no Ar",
            description: "O protótipo da sua equipe foi selecionado para o mural de protótipos funcionais.",
            date: "20 de Abril, 2026"
          },
          {
            title: "Destaque Semanal",
            description: "Equipe EcoTech Solutions foi destaque da semana por alta participação em workshops e plantões.",
            date: "15 de Abril, 2026"
          }
        ]}
        title="Vitrines Públicas"
      />
      <Footer />
    </div>
  )
}

export default TeamDashboard
