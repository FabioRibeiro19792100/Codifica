import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GraduationCap, Trophy, Languages } from 'lucide-react'
import { loadGamificationData } from '../data/gamificationData'
import { useAuth } from '../contexts/AuthContext'
import { fetchEquipe, BACKEND_ENABLED } from '../services/backendService'
import { getIcon } from '../utils/iconMap'
import TranslationTip from '../components/TranslationTip'
import BadgesModal from '../components/BadgesModal'
import ProgressModal from '../components/ProgressModal'
import ShowcaseModal from '../components/ShowcaseModal'
import Footer from '../components/Footer'
import './TeamDashboard.css'

// Showcases are not yet tracked in the backend — kept as static fallback per team id.
const SHOWCASES_FALLBACK = {
  'ecotech-solutions': [
    { title: 'Ideas in Motion Wall', description: 'Team highlighted on the public wall after completing the Strategic Plan with excellence.', date: 'March 25, 2026' },
    { title: 'Prototypes on Display Wall', description: 'Prototype selected for the functional prototypes showcase wall.', date: 'April 20, 2026' },
    { title: 'Weekly Spotlight', description: 'Weekly spotlight for high participation in workshops and office hours.', date: 'April 15, 2026' },
  ],
  'verde-futuro': [
    { title: 'Ideas in Motion Wall', description: 'Team highlighted after Strategic Plan delivery.', date: 'March 25, 2026' },
    { title: 'Weekly Spotlight', description: 'Weekly spotlight for engagement in office hours.', date: 'April 8, 2026' },
  ],
  'agua-limpa': [
    { title: 'Ideas in Motion Wall', description: 'Team participated in the Strategic Plan stage public wall.', date: 'March 25, 2026' },
  ],
}

function TeamDashboard() {
  const { teamId } = useParams()
  const { user, equipes } = useAuth()
  const [data, setData] = useState(null)
  const [team, setTeam] = useState(null)
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isShowcaseModalOpen, setIsShowcaseModalOpen] = useState(false)

  // Resolve team from context first (already-loaded equipes), otherwise fetch directly.
  useEffect(() => {
    let cancelled = false
    const fromContext = equipes.find((e) => e.equipe_id === teamId)
    if (fromContext) {
      setTeam(equipeToTeamView(fromContext, user))
      return () => { cancelled = true }
    }
    if (BACKEND_ENABLED) {
      fetchEquipe(teamId).then((e) => {
        if (cancelled) return
        if (e) setTeam(equipeToTeamView(e, user))
      }).catch((err) => console.warn('fetchEquipe failed', err))
    }
    return () => { cancelled = true }
  }, [teamId, equipes, user])

  useEffect(() => {
    const loadData = () => setData(loadGamificationData())
    loadData()
    window.addEventListener('storage', loadData)
    window.addEventListener('gamificationDataChanged', loadData)
    return () => {
      window.removeEventListener('storage', loadData)
      window.removeEventListener('gamificationDataChanged', loadData)
    }
  }, [])

  if (!data) return <div>Loading...</div>
  if (!team) {
    return (
      <div className="team-dashboard">
        <div className="container">
          <p style={{ padding: '40px', textAlign: 'center' }}>Team not found.</p>
        </div>
        <Footer />
      </div>
    )
  }

  const totalBadges = data.stages.reduce((sum, stage) => sum + stage.badges.length, 0)

  const allBadges = data.stages.flatMap((stage, stageIndex) =>
    stage.badges.map((badge, badgeIndex) => ({
      ...badge,
      stageNumber: stage.number,
      stageTitle: stage.title,
      stageIndex,
      badgeIndex,
      globalIndex: data.stages.slice(0, stageIndex).reduce((sum, s) => sum + s.badges.length, 0) + badgeIndex
    }))
  )

  const earnedBadges = team.earnedBadgeIds.length
  const progress = Math.round((earnedBadges / totalBadges) * 100)

  return (
    <div className="team-dashboard">
      <div className="container">
        <div className="team-info">
          <div className="team-header">
            <div>
              <div className="team-name">Team {team.name}</div>
              <div className="team-teacher">
                <GraduationCap size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}} />
                English Teacher: {team.teacher}
              </div>
            </div>
          </div>

          {/* English Track Banner - fixed for all teams */}
          <div className="english-track-banner">
            <Languages size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
            <span><strong>English Track</strong> — All deliveries must be in English • {team.englishTeacher}</span>
          </div>

          <div className="stats">
            <div className="stat-item clickable" onClick={() => setIsBadgesModalOpen(true)}>
              <div className="stat-number">{earnedBadges}</div>
              <div className="stat-label"><TranslationTip pt="Insígnias digitais conquistadas">Badges Earned</TranslationTip></div>
            </div>
            <div className="stat-item clickable" onClick={() => setIsProgressModalOpen(true)}>
              <div className="stat-number">{progress}%</div>
              <div className="stat-label">Complete Journey</div>
            </div>
            <div className="stat-item clickable" onClick={() => setIsShowcaseModalOpen(true)}>
              <div className="stat-number">{team.showcases.length}</div>
              <div className="stat-label"><TranslationTip pt="Vitrines Públicas — reconhecimentos públicos da equipe">Public Showcases</TranslationTip></div>
            </div>
          </div>
        </div>

        <div className="badges-section">
          <h2 className="section-title">
            <Trophy size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Your <TranslationTip pt="Insígnias — conquistas desbloqueadas ao longo do programa">Badges</TranslationTip>
          </h2>

          {data.stages.map((stage, stageIdx) => {
            const StageIcon = getIcon(stage.icon)
            const categoryOrder = ['participacao', 'conclusao', 'conquista_especial', 'pedagogica']
            const badgesByCategory = categoryOrder
              .map(cat => ({
                key: cat,
                ...(data.badgeCategories[cat] || {}),
                badges: stage.badges.filter(b => b.category === cat)
              }))
              .filter(group => group.badges.length > 0)

            return (
              <div key={stage.id}>
                <div style={{margin: stageIdx === 0 ? '0 0 30px 0' : '40px 0 30px 0'}}>
                  <span className="stage-indicator">
                    <StageIcon size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}} /> {stage.title}
                  </span>
                </div>

                {badgesByCategory.map((group) => (
                  <div key={group.key} className="badge-category-group" style={{borderLeft: `3px solid ${group.color || '#999'}`, paddingLeft: '16px', marginBottom: '24px'}}>
                    <div className="badge-category-header" style={{fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: group.color || '#666', marginBottom: '12px'}}>
                      {group.label}
                    </div>
                    <div className="badges-grid">
                      {group.badges.map((badge) => {
                        const BadgeIcon = getIcon(badge.icon)
                        const isEarned = team.earnedBadgeIds.includes(badge.id)

                        return (
                          <div key={badge.id} className={`badge-card ${isEarned ? 'earned' : 'locked'}`}>
                            <div className="badge-icon">
                              <BadgeIcon size={48} />
                            </div>
                            <div className="badge-name">{badge.name}</div>
                            <div className="badge-description">{badge.description}</div>
                            {/* Tooltip on hover */}
                            <div className="badge-card-tooltip">
                              <div className="badge-card-tooltip-title">{badge.name}</div>
                              <div className="badge-card-tooltip-desc">{badge.description}</div>
                              {badge.criteria && (
                                <div className="badge-card-tooltip-criteria">
                                  <strong>Criteria:</strong> {badge.criteria}
                                </div>
                              )}
                              {badge.sdgTag && (
                                <div className="badge-card-tooltip-sdg">{badge.sdgTag}</div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

      </div>

      {(() => {
        const earnedBadgeList = allBadges.filter(badge => team.earnedBadgeIds.includes(badge.id))
        return (
          <BadgesModal
            isOpen={isBadgesModalOpen}
            onClose={() => setIsBadgesModalOpen(false)}
            badges={earnedBadgeList}
            title="Badges Earned"
          />
        )
      })()}

      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        progressData={{
          average: progress,
          teams: [{
            name: team.name,
            progress: progress
          }]
        }}
        title="Complete Journey"
      />

      <ShowcaseModal
        isOpen={isShowcaseModalOpen}
        onClose={() => setIsShowcaseModalOpen(false)}
        showcases={team.showcases}
        title="Public Showcases"
      />
      <Footer />
    </div>
  )
}

function equipeToTeamView(equipe, user) {
  const teacherFromUser = user?.role === 'professor' ? user.name : ''
  const teacherFromEquipe = equipe.english_teacher_email || equipe.professor_responsavel_email
  return {
    name: equipe.equipe_nome,
    teacher: teacherFromUser || teacherFromEquipe || '',
    currentStage: equipe.status?.current_stage_id ?? 1,
    englishTrack: !!equipe.english_track,
    englishTeacher: equipe.english_teacher_email || teacherFromUser || '',
    earnedBadgeIds: equipe.status?.earned_badge_ids ?? [],
    showcases: SHOWCASES_FALLBACK[equipe.equipe_id] || [],
  }
}

export default TeamDashboard
