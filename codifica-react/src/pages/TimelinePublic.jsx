import { useState, useEffect } from 'react'
import { Trophy, GraduationCap, Globe, Award, Users, Lightbulb, Calendar, Wrench, Mic, Sparkles, CheckCircle2, FileText, MessageSquare, Leaf, Video, Theater, Target, Handshake, BookOpen, Mail, Rocket, Star, ChevronDown, ChevronUp, Languages, Quote, AlertCircle } from 'lucide-react'
import { loadGamificationData } from '../data/gamificationData'
import { getIcon } from '../utils/iconMap'
import TranslationTip from '../components/TranslationTip'
import Footer from '../components/Footer'
import './TimelinePublic.css'

function TimelinePublic() {
  const [data, setData] = useState(null)
  const [expandedStages, setExpandedStages] = useState([])

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

  const toggleStage = (stageId) => {
    setExpandedStages(prev =>
      prev.includes(stageId)
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    )
  }

  if (!data) return <div>Loading...</div>

  const totalBadges = data.stages.reduce((sum, stage) => sum + stage.badges.length, 0)
  const totalDistinctions = data.allDistinctions.length
  const stories = data.successStories || []

  return (
    <div className="timeline-container-page">
      <div className="container">

        {/* Hero Banner */}
        <div className="english-hero-banner">
          <div className="english-hero-content">
            <Languages size={36} />
            <div>
              <h2 className="english-hero-title">Growing Opportunities Unlocking Potential</h2>
              <p className="english-hero-desc">
                GO UP! 2026 combines technology and English proficiency to transform the future of Brazilian students. All deliveries are in English, led by English teachers.
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        {stories.length > 0 && (
          <div className="stories-section">
            <h2 className="timeline-section-title">
              <Star size={28} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Stories that Inspire
            </h2>
            <p className="stories-intro">
              English transformed the lives of these people. Their stories show how STEM and English together open doors in the job market and the world.
            </p>
            <div className="stories-grid">
              {stories.map((story) => (
                <div key={story.id} className="story-card">
                  <div className="story-avatar">
                    <GraduationCap size={32} />
                  </div>
                  <div className="story-content">
                    <div className="story-name">{story.name}</div>
                    <div className="story-role">{story.role}</div>
                    <div className="story-quote">
                      <Quote size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px', opacity: 0.5}} />
                      {story.quote}
                    </div>
                    <div className="story-highlight">{story.highlight}</div>
                    {story.sdgTag && (
                      <div className="story-sdg-tag">
                        <Globe size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} />
                        {story.sdgTag}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Program Journey */}
        <div className="timeline-section">
          <h2 className="timeline-section-title">
            <Rocket size={28} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Complete Program Journey
          </h2>
          <div className="timeline-container">
          <div className="timeline-line"></div>

          {data.stages.map((stage) => {
            const StageIcon = getIcon(stage.icon)
            const isExpanded = expandedStages.includes(stage.id)

            return (
              <div key={stage.id} className="phase-section">
                <div
                  className="phase-header clickable"
                  onClick={() => toggleStage(stage.id)}
                >
                  <div className="phase-number">{stage.number}</div>
                  <div className="phase-info">
                    <div className="phase-title">
                      <StageIcon size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> {stage.title}
                    </div>
                    <div className="phase-date">
                      <Calendar size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px'}} />
                      <span className="phase-week">{stage.subtitle}</span>
                      <span className="phase-date-range">{stage.dateRange}</span>
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
                        {stage.number === 1
                          ? "What do you (English teacher) do in this stage?"
                          : "What happens in this stage?"
                        }
                      </div>
                      <ul className="activity-list">
                        {stage.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rewards-panel">
                      <div className="section-subtitle">
                        <Trophy size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> What can you earn?
                      </div>
                      <div className="badges-at-stake">
                        {stage.badges.map((badge) => {
                          const BadgeIcon = getIcon(badge.icon)
                          return (
                            <div key={badge.id} className="badge-item-stake">
                              <div className="badge-icon-stake">
                                <BadgeIcon size={24} />
                              </div>
                              <div className="badge-info-stake">
                                <div className="badge-name-stake">{badge.name}</div>
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

        {/* Coexistence Rules - Placeholder */}
        <div className="coexistence-section">
          <h2 className="timeline-section-title">
            <AlertCircle size={28} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Simultaneous Participation Rules
          </h2>
          <div className="coexistence-content">
            <div className="coexistence-notice">
              <AlertCircle size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <div>
                <strong>English Track + Formula 1 Track</strong>
                <p>The rules for simultaneous participation in the English Track and Formula 1 Track are being finalized in alignment with the British Council. This section will be updated soon with the complete guidelines on how teams can compete in both tracks without participation conflicts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-title">
            <Target size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Understanding the Recognition System
          </div>
          <div className="legend-grid">
            <div className="legend-item">
              <div className="legend-icon"><Award size={32} /></div>
              <div className="legend-text">
                <div className="legend-label"><TranslationTip pt="Insígnias Digitais — conquistas individuais e de equipe">Digital Badges</TranslationTip></div>
                <div className="legend-desc">{totalBadges} badges in 4 categories: participation, deliveries, special achievements, and pedagogical (STEM + SDG)</div>
              </div>
            </div>

            <div className="legend-item">
              <div className="legend-icon"><Trophy size={32} /></div>
              <div className="legend-text">
                <div className="legend-label"><TranslationTip pt="Distinções Institucionais — selos e certificados para escolas">Institutional Distinctions</TranslationTip></div>
                <div className="legend-desc">{totalDistinctions} certificates and recognition seals for schools</div>
              </div>
            </div>

            <div className="legend-item">
              <div className="legend-icon"><Languages size={32} /></div>
              <div className="legend-text">
                <div className="legend-label">100% English Track</div>
                <div className="legend-desc">All deliveries, materials, and evaluations must be completed in English</div>
              </div>
            </div>

            <div className="legend-item">
              <div className="legend-icon"><Globe size={32} /></div>
              <div className="legend-text">
                <div className="legend-label"><TranslationTip pt="ODS — Objetivos de Desenvolvimento Sustentável da ONU">SDGs as Foundation</TranslationTip></div>
                <div className="legend-desc">Projects categorized by the UN Sustainable Development Goals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="final-cta">
          <div className="final-cta-content">
            <h2>
              <Rocket size={28} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Ready to Lead Your Teams?
            </h2>
            <p>
              Register as an English teacher leader, organize your student teams<br />and embark on this journey of STEM innovation and English mastery.
            </p>
            <p>
              <strong>You can lead multiple teams and earn special recognition!</strong>
            </p>
          </div>

          <div className="teacher-tip">
            <Lightbulb size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px', flexShrink: 0}} />
            <div>
              <strong>Tip for English Teachers:</strong> Teachers who lead multiple teams earn the "Multi-team Teacher" badge and access to exclusive sessions. It is mandatory that the team leader or co-leader is an English teacher, ensuring adequate pedagogical support for English deliveries.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TimelinePublic
