import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Users, School, Globe, Award, Zap, Heart, Crown, Target, Star, TrendingUp, BarChart3, MapPin, CheckCircle2, Sparkles, PartyPopper, Megaphone, Clock, Rocket, Lightbulb, Languages } from 'lucide-react'
import { loadGamificationData } from '../data/gamificationData'
import { getIcon } from '../utils/iconMap'
import TranslationTip from '../components/TranslationTip'
import TeamsModal from '../components/TeamsModal'
import DistinctionsModal from '../components/DistinctionsModal'
import ProgressModal from '../components/ProgressModal'
import RankingModal from '../components/RankingModal'
import Footer from '../components/Footer'
import './SchoolDashboard.css'

function SchoolDashboard() {
  const [data, setData] = useState(null)
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false)
  const [isDistinctionsModalOpen, setIsDistinctionsModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false)

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        const loadedData = loadGamificationData()
        setData(loadedData)
      }, 10)
    }
    loadData()
    window.addEventListener('storage', loadData)
    window.addEventListener('gamificationDataChanged', loadData)
    return () => {
      window.removeEventListener('storage', loadData)
      window.removeEventListener('gamificationDataChanged', loadData)
    }
  }, [])

  if (!data) return <div>Loading...</div>

  // Mock - in production would come from API
  const earnedDistinctionIds = [1, 2, 3, 4, 5]

  // Filter earned distinctions
  const earnedDistinctions = data.allDistinctions.filter(d => earnedDistinctionIds.includes(d.id))

  // Mock data - in production would come from API
  const schoolTeams = [
    {
      name: "EcoTech Solutions",
      members: ["Ana Silva", "Bruno Santos", "Carla Oliveira", "Diego Costa", "Elena Ferreira"],
      badgesCount: 9,
      status: "On track - Stage: Prototyping",
      englishTrack: true,
      competencies: { stem: 75, english: 82, collaboration: 90, ods: 70 }
    },
    {
      name: "Verde Futuro",
      members: ["Fernando Lima", "Gabriela Rocha", "Henrique Alves", "Isabela Martins"],
      badgesCount: 10,
      status: "On track - Stage: Prototyping",
      englishTrack: true,
      competencies: { stem: 68, english: 74, collaboration: 85, ods: 65 }
    },
    {
      name: "Água Limpa",
      members: ["João Pedro", "Larissa Souza", "Marcos Teixeira"],
      badgesCount: 8,
      status: "Attention - Stage: Strategic Plan",
      englishTrack: true,
      competencies: { stem: 55, english: 48, collaboration: 60, ods: 40 }
    },
    {
      name: "ClimaTech",
      members: ["Maria Santos", "Pedro Oliveira", "Rafaela Costa", "Thiago Lima"],
      badgesCount: 11,
      status: "On track - Stage: Prototyping",
      englishTrack: true,
      competencies: { stem: 80, english: 78, collaboration: 88, ods: 75 }
    },
    {
      name: "Youth Sustainability",
      members: ["Julia Ferreira", "Lucas Almeida", "Mariana Rocha"],
      badgesCount: 7,
      status: "On track - Stage: Strategic Plan",
      englishTrack: true,
      competencies: { stem: 50, english: 55, collaboration: 70, ods: 60 }
    },
    {
      name: "Green Innovation",
      members: ["Paula Mendes", "Ricardo Silva", "Sofia Costa", "Vitor Martins", "Yasmin Lima"],
      badgesCount: 12,
      status: "On track - Stage: Prototyping",
      englishTrack: true,
      competencies: { stem: 85, english: 88, collaboration: 92, ods: 80 }
    },
    {
      name: "Eco Warriors",
      members: ["Beatriz Souza", "Caio Teixeira", "Daniela Alves"],
      badgesCount: 6,
      status: "Attention - Stage: Strategic Plan",
      englishTrack: true,
      competencies: { stem: 45, english: 42, collaboration: 55, ods: 35 }
    }
  ]

  // School consolidated competencies
  const avgCompetencies = {
    stem: Math.round(schoolTeams.reduce((sum, t) => sum + t.competencies.stem, 0) / schoolTeams.length),
    english: Math.round(schoolTeams.reduce((sum, t) => sum + t.competencies.english, 0) / schoolTeams.length),
    collaboration: Math.round(schoolTeams.reduce((sum, t) => sum + t.competencies.collaboration, 0) / schoolTeams.length),
    ods: Math.round(schoolTeams.reduce((sum, t) => sum + t.competencies.ods, 0) / schoolTeams.length),
  }

  return (
    <div className="school-dashboard">
      <div className="container">
        <div className="school-profile">
          <div className="school-header">
            <div className="school-logo"><School size={48} /></div>
            <div className="school-info">
              <div className="school-name">E.E. Professor João Silva</div>
              <div className="school-location">
                <MapPin size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> São Paulo, SP • Zona Leste
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card clickable" onClick={() => setIsTeamsModalOpen(true)}>
              <div className="stat-number">7</div>
              <div className="stat-label">Active Teams</div>
            </div>
            <div className="stat-card clickable" onClick={() => setIsDistinctionsModalOpen(true)}>
              <div className="stat-number">{earnedDistinctionIds.length}</div>
              <div className="stat-label"><TranslationTip pt="Distinções — selos e certificados conquistados pela escola">Distinctions Earned</TranslationTip></div>
            </div>
            <div className="stat-card clickable" onClick={() => setIsProgressModalOpen(true)}>
              <div className="stat-number">86%</div>
              <div className="stat-label"><TranslationTip pt="Taxa de Conclusão — percentual de entregas concluídas">Completion Rate</TranslationTip></div>
            </div>
            <div className="stat-card clickable" onClick={() => setIsRankingModalOpen(true)}>
              <div className="stat-number">3rd</div>
              <div className="stat-label"><TranslationTip pt="Ranking Estadual — posição da escola no estado">Ranking Position</TranslationTip></div>
            </div>
          </div>
        </div>

        <div className="distinctions-section">
          <h2 className="section-title">
            <Trophy size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> School <TranslationTip pt="Distinções Institucionais — reconhecimentos oficiais do programa para escolas">Distinctions</TranslationTip>
          </h2>

          <div className="distinctions-grid">
            {data.allDistinctions.map((distinction) => {
              const DistinctionIcon = getIcon(distinction.icon || 'Trophy')
              const isEarned = earnedDistinctionIds.includes(distinction.id)

              return (
                <div key={distinction.id} className={`distinction-card ${isEarned ? 'earned' : 'locked'}`}>
                  <div className="distinction-icon">
                    <DistinctionIcon size={64} />
                  </div>
                  <div className="distinction-name">{distinction.name}</div>
                  <div className="distinction-description">{distinction.description}</div>
                  <div className="distinction-criteria">
                    <CheckCircle2 size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> {distinction.criteria}
                  </div>
                  {/* Tooltip on hover */}
                  <div className="distinction-tooltip">
                    <div className="distinction-tooltip-title">{distinction.name}</div>
                    <div className="distinction-tooltip-desc">{distinction.description}</div>
                    <div className="distinction-tooltip-criteria">
                      <strong>Criteria:</strong> {distinction.criteria}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* School Competency Analytics */}
        <div className="school-competency-section">
          <h2 className="section-title">
            <BarChart3 size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> School <TranslationTip pt="Visão Analítica por Competências — desempenho consolidado da escola">Competency Analytics</TranslationTip>
          </h2>
          <p className="school-competency-desc">
            Consolidated analytical view for competency-based management. Track team performance across each program dimension.
          </p>

          <div className="school-competency-overview">
            <div className="school-comp-bar-group">
              <div className="school-comp-label">
                <span>English Proficiency</span>
                <span className="school-comp-value">{avgCompetencies.english}%</span>
              </div>
              <div className="school-comp-bar"><div className="school-comp-fill" style={{width: `${avgCompetencies.english}%`, backgroundColor: '#7BC67E'}}></div></div>
            </div>
            <div className="school-comp-bar-group">
              <div className="school-comp-label">
                <span>STEM Skills</span>
                <span className="school-comp-value">{avgCompetencies.stem}%</span>
              </div>
              <div className="school-comp-bar"><div className="school-comp-fill" style={{width: `${avgCompetencies.stem}%`, backgroundColor: '#4A90D9'}}></div></div>
            </div>
            <div className="school-comp-bar-group">
              <div className="school-comp-label">
                <span>Collaboration</span>
                <span className="school-comp-value">{avgCompetencies.collaboration}%</span>
              </div>
              <div className="school-comp-bar"><div className="school-comp-fill" style={{width: `${avgCompetencies.collaboration}%`, backgroundColor: '#F5A623'}}></div></div>
            </div>
            <div className="school-comp-bar-group">
              <div className="school-comp-label">
                <span><TranslationTip pt="Impacto nos Objetivos de Desenvolvimento Sustentável da ONU">SDG Impact</TranslationTip></span>
                <span className="school-comp-value">{avgCompetencies.ods}%</span>
              </div>
              <div className="school-comp-bar"><div className="school-comp-fill" style={{width: `${avgCompetencies.ods}%`, backgroundColor: '#9B59B6'}}></div></div>
            </div>
          </div>
        </div>

        <div className="ranking-section">
          <h2 className="section-title">
            <BarChart3 size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> <TranslationTip pt="Ranking Estadual — classificação das escolas no estado de São Paulo">State Ranking</TranslationTip> - São Paulo
          </h2>

          <table className="ranking-table">
            <thead>
              <tr>
                <th style={{width: '80px', textAlign: 'center'}}>Position</th>
                <th style={{width: '200px'}}>School</th>
                <th style={{width: '100px', textAlign: 'center'}}>Teams</th>
                <th style={{width: '100px', textAlign: 'center'}}>Distinctions</th>
                <th style={{width: '200px', textAlign: 'left'}}>Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="rank-position top3">
                  <span style={{display: 'inline-block', width: '28px', textAlign: 'left'}}>
                    <Trophy size={24} style={{display: 'inline', verticalAlign: 'middle', color: '#ffd700'}} />
                  </span>1st
                </td>
                <td className="school-name-cell">Escola da Zona Sul, SP</td>
                <td style={{textAlign: 'center'}}>12</td>
                <td style={{textAlign: 'center'}}>8</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>92%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '92%'}}></div>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="rank-position top3">
                  <span style={{display: 'inline-block', width: '28px', textAlign: 'left'}}>
                    <Award size={24} style={{display: 'inline', verticalAlign: 'middle', color: '#c0c0c0'}} />
                  </span>2nd
                </td>
                <td className="school-name-cell">Escola da Zona Oeste, SP</td>
                <td style={{textAlign: 'center'}}>10</td>
                <td style={{textAlign: 'center'}}>7</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>88%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '88%'}}></div>
                  </div>
                </td>
              </tr>

              <tr className="highlight-row">
                <td className="rank-position top3">
                  <span style={{display: 'inline-block', width: '28px', textAlign: 'left'}}>
                    <Award size={24} style={{display: 'inline', verticalAlign: 'middle', color: '#cd7f32'}} />
                  </span>3rd
                </td>
                <td className="school-name-cell">
                  E.E. Professor João Silva <Star size={16} style={{display: 'inline', verticalAlign: 'middle', marginLeft: '4px'}} /> YOU
                </td>
                <td style={{textAlign: 'center'}}>7</td>
                <td style={{textAlign: 'center'}}>5</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>86%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '86%'}}></div>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="rank-position">
                  <span style={{display: 'inline-block', width: '28px'}}></span>4th
                </td>
                <td className="school-name-cell">Escola da Zona Norte, SP</td>
                <td style={{textAlign: 'center'}}>9</td>
                <td style={{textAlign: 'center'}}>6</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>84%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '84%'}}></div>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="rank-position">
                  <span style={{display: 'inline-block', width: '28px'}}></span>5th
                </td>
                <td className="school-name-cell">Escola da Região Metropolitana, SP</td>
                <td style={{textAlign: 'center'}}>8</td>
                <td style={{textAlign: 'center'}}>5</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>82%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '82%'}}></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="tips-section">
          <h3 className="tips-title">
            <Lightbulb size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> How to Climb the Ranking
          </h3>
          <div className="tips-content">
            <strong>• Activate more teams:</strong> Each additional team increases your base score<br />
            <strong>• Maintain high completion rate:</strong> Schools with 85%+ get a multiplier bonus<br />
            <strong>• Earn distinctions:</strong> Each unlocked distinction adds significant points<br />
            <strong>• Encourage workshop participation:</strong> Teams that attend earn extra badges<br />
            <strong>• Focus on STEM + English + SDG:</strong> 100% of projects with STEM alignment, English proficiency, and SDG unlocks a special distinction
          </div>
        </div>

        <div className="achievement-box">
          <Sparkles size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '12px'}} />
          <div>
            <strong>Congratulations!</strong><br />
            Your school is in the <strong style={{color: 'hsl(0, 0%, 5%)'}}>TOP 3</strong> in the state of São Paulo!<br />
            Keep supporting your teams to earn even more distinctions and recognition.
          </div>
        </div>
      </div>

      <TeamsModal
        isOpen={isTeamsModalOpen}
        onClose={() => setIsTeamsModalOpen(false)}
        teams={schoolTeams}
        title="Active Teams"
      />

      <DistinctionsModal
        isOpen={isDistinctionsModalOpen}
        onClose={() => setIsDistinctionsModalOpen(false)}
        distinctions={earnedDistinctions}
        title="Distinctions Earned"
      />

      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        progressData={{
          average: 86,
          teams: schoolTeams.map(team => ({
            name: team.name,
            progress: team.badgesCount * 5
          }))
        }}
        title="Completion Rate"
      />

      <RankingModal
        isOpen={isRankingModalOpen}
        onClose={() => setIsRankingModalOpen(false)}
        rankingData={{
          position: "3rd",
          details: {
            school: "E.E. Professor João Silva",
            region: "São Paulo, SP • Zona Leste",
            points: 1240,
            teams: 7,
            distinctions: 5
          },
          comparison: [
            { position: "1st", school: "E.E. Maria Montessori", points: 1850 },
            { position: "2nd", school: "Colégio Técnico Industrial", points: 1620 },
            { position: "3rd", school: "E.E. Professor João Silva (YOU)", points: 1240 }
          ]
        }}
        title="Ranking Position"
      />
      <Footer />
    </div>
  )
}

export default SchoolDashboard
