import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Users, MapPin, School, Globe, Trophy, BarChart3, Calendar, MessageSquare, Zap, Award, Bell, Clock, AlertTriangle, CheckCircle2, Rocket, Target, Languages } from 'lucide-react'
import { loadGamificationData } from '../data/gamificationData'
import TranslationTip from '../components/TranslationTip'
import TeamsModal from '../components/TeamsModal'
import CalendarModal from '../components/CalendarModal'
import ProgressModal from '../components/ProgressModal'
import StudentsModal from '../components/StudentsModal'
import MessagesModal from '../components/MessagesModal'
import ReportModal from '../components/ReportModal'
import Footer from '../components/Footer'
import './TeacherDashboard.css'

function TeacherDashboard() {
  const [data, setData] = useState(null)
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false)
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  useEffect(() => {
    const loadData = () => {
      try {
        const loadedData = loadGamificationData()
        setData(loadedData)
      } catch (error) {
        console.error('Error loading data:', error)
        setData(loadGamificationData())
      }
    }
    loadData()
    window.addEventListener('storage', loadData)
    window.addEventListener('gamificationDataChanged', loadData)
    return () => {
      window.removeEventListener('storage', loadData)
      window.removeEventListener('gamificationDataChanged', loadData)
    }
  }, [])

  if (!data) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div>Loading...</div>
      </div>
    )
  }

      // Calculate total badges
      const totalBadges = data.stages.reduce((sum, stage) => sum + stage.badges.length, 0)

      const teacherTeams = [
        {
          id: "ecotech-solutions",
          name: "EcoTech Solutions",
          members: ["Ana Silva", "Bruno Santos", "Carla Oliveira", "Diego Costa", "Elena Ferreira"],
          currentStage: 2,
          badgesCount: 8,
          status: "On track - Stage: Prototyping",
          grade: "11th grade",
          englishTrack: true,
          englishTeacher: "Prof. Sarah Johnson",
          competencies: { stem: 75, english: 82, collaboration: 90, ods: 70 }
        },
        {
          id: "verde-futuro",
          name: "Verde Futuro",
          members: ["Fernando Lima", "Gabriela Rocha", "Henrique Alves", "Isabela Martins"],
          currentStage: 2,
          badgesCount: 8,
          status: "On track - Stage: Prototyping",
          grade: "12th grade",
          englishTrack: true,
          englishTeacher: "Prof. Sarah Johnson",
          competencies: { stem: 68, english: 74, collaboration: 85, ods: 65 }
        },
        {
          id: "agua-limpa",
          name: "Água Limpa",
          members: ["João Pedro", "Larissa Souza", "Marcos Teixeira"],
          currentStage: 1,
          badgesCount: 6,
          status: "Attention - Stage: Strategic Plan",
          grade: "10th grade",
          englishTrack: true,
          englishTeacher: "Prof. Sarah Johnson",
          competencies: { stem: 55, english: 48, collaboration: 60, ods: 40 }
        }
      ]

  // Mock data - calendar events
  const calendarEvents = [
    {
      date: "March 5",
      time: "7 PM",
      title: "Strategic Plan Workshop",
      description: "Online workshop to guide teams in developing their strategic plan and identifying STEM problems. Conducted in English.",
      location: "Online (Zoom)",
      type: "workshop"
    },
    {
      date: "March 12",
      time: "7 PM",
      title: "Office Hours - Strategic Plan",
      description: "Q&A session about the Strategic Plan stage.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "March 19",
      time: "7 PM",
      title: "Office Hours - Strategic Plan",
      description: "Q&A session about the Strategic Plan stage.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "March 21",
      title: "Deadline: Strategic Plan Delivery",
      description: "Last day to submit Strategic Plan deliveries (in English).",
      type: "prazo"
    },
    {
      date: "March 26",
      time: "7 PM",
      title: "Prototyping Workshop",
      description: "Online workshop to guide teams in creating functional prototypes. Conducted in English.",
      location: "Online (Zoom)",
      type: "workshop"
    },
    {
      date: "April 2",
      time: "7 PM",
      title: "Office Hours - Prototyping",
      description: "Q&A session about the Prototyping stage.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "April 9",
      time: "7 PM",
      title: "Office Hours - Prototyping",
      description: "Q&A session about the Prototyping stage.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "April 16",
      time: "7 PM",
      title: "Office Hours - Prototyping",
      description: "Q&A session about the Prototyping stage.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "April 18",
      title: "Deadline: Prototyping Delivery",
      description: "Last day to submit functional prototypes (documentation in English).",
      type: "prazo"
    },
    {
      date: "April 23",
      time: "7 PM",
      title: "Pitch Workshop",
      description: "Online workshop to guide teams in creating 3-minute pitch videos in English.",
      location: "Online (Zoom)",
      type: "workshop"
    },
    {
      date: "April 28",
      title: "Deadline: Pitch Submission",
      description: "Last day to submit pitch videos (in English).",
      type: "prazo"
    },
    {
      date: "April 30",
      title: "Top 10 Finalists Announcement",
      description: "Announcement of teams selected for the final panel.",
      type: "prazo"
    },
    {
      date: "May 5",
      time: "2 PM",
      title: "In-Person Final Panel",
      description: "Presentation of the 10 finalist teams in São Paulo.",
      location: "São Paulo, SP",
      type: "workshop"
    },
    {
      date: "May 9",
      time: "7 PM",
      title: "Awards Ceremony",
      description: "Announcement of the 3 winning teams and prize distribution.",
      location: "São Paulo, SP",
      type: "workshop"
    }
  ]

  // Consolidated competencies
  const avgCompetencies = {
    stem: Math.round(teacherTeams.reduce((sum, t) => sum + t.competencies.stem, 0) / teacherTeams.length),
    english: Math.round(teacherTeams.reduce((sum, t) => sum + t.competencies.english, 0) / teacherTeams.length),
    collaboration: Math.round(teacherTeams.reduce((sum, t) => sum + t.competencies.collaboration, 0) / teacherTeams.length),
    ods: Math.round(teacherTeams.reduce((sum, t) => sum + t.competencies.ods, 0) / teacherTeams.length),
  }

  return (
    <div className="teacher-dashboard">
      <div className="container">
        <div className="teacher-profile">
          <div className="teacher-avatar"><GraduationCap size={40} style={{color: 'hsl(35, 25%, 92%)'}} /></div>
          <div className="teacher-info">
            <div className="teacher-name">Prof. Sarah Johnson</div>
            <div className="teacher-school"><MapPin size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> E.E. Professor João Silva • São Paulo, SP</div>
            <div className="teacher-role-tag">
              <Languages size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} />
              English Teacher — Leader
            </div>
          </div>
          <div className="teacher-badge">
            <Trophy size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px', color: 'hsl(35, 25%, 92%)'}} />
            <span>Multi-team Teacher</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card clickable" onClick={() => setIsTeamsModalOpen(true)}>
            <div className="stat-number">3</div>
            <div className="stat-label">Teams Mentored</div>
          </div>
          <div className="stat-card clickable" onClick={() => setIsProgressModalOpen(true)}>
            <div className="stat-number">67%</div>
            <div className="stat-label">Average Progress</div>
          </div>
          <div className="stat-card clickable" onClick={() => setIsStudentsModalOpen(true)}>
            <div className="stat-number">15</div>
            <div className="stat-label">Students Impacted</div>
          </div>
        </div>

        <div className="quick-actions">
          <h2 className="section-title"><Zap size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Quick Actions</h2>
          <div className="actions-grid">
            <div className="action-card clickable" onClick={() => setIsReportModalOpen(true)}>
              <div className="action-icon"><BarChart3 size={48} /></div>
              <div className="action-title">View General Report</div>
              <div className="action-desc">Consolidated analysis of all teams</div>
            </div>

            <div className="action-card clickable" onClick={() => setIsCalendarModalOpen(true)}>
              <div className="action-icon"><Calendar size={48} /></div>
              <div className="action-title">Event Calendar</div>
              <div className="action-desc">Workshops, office hours, and deadlines</div>
            </div>

            <div className="action-card clickable" onClick={() => setIsMessagesModalOpen(true)}>
              <div className="action-icon"><MessageSquare size={48} /></div>
              <div className="action-title">Program Messages</div>
              <div className="action-desc">Official announcements and updates</div>
            </div>
          </div>
        </div>

            <div className="teams-section">
              <h2 className="section-title"><Rocket size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> My Teams</h2>

          <div className="english-track-notice">
            <Languages size={18} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
            <span><strong>English Track</strong> — All deliveries must be in English</span>
          </div>

          <div className="teams-grid">
            {teacherTeams.map((team) => {
              const stageNames = { 1: 'Strategic Plan', 2: 'Prototyping', 3: 'Pitch & Evaluation' }
              const stageName = stageNames[team.currentStage] || `Stage ${team.currentStage}`
              const progressPct = Math.round((team.badgesCount / totalBadges) * 100)
              const isWarning = team.status.includes('Attention')

              return (
                <Link key={team.id} to={`/team/${team.id}`} className="team-card clickable" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="team-header">
                    <div>
                      <div className="team-name">{team.name}</div>
                      <div className="team-members"><Users size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> {team.members.length} students • {team.grade}</div>
                    </div>
                    <div className={`team-status${isWarning ? ' warning' : ''}`}>{isWarning ? 'Attention' : 'On track'}</div>
                  </div>

                  <div className="team-progress">
                    <div className="progress-label">
                      <span><strong>Current Stage:</strong> {stageName}</span>
                      <span><strong>{team.badgesCount}/{totalBadges}</strong> badges</span>
                    </div>
                    <div className="progress-bar-small"><div className="progress-fill" style={{width: `${progressPct}%`}}></div></div>
                    <div className="progress-percentage">{progressPct}%</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Competency Analytics */}
        <div className="competency-section">
          <h2 className="section-title">
            <BarChart3 size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> <TranslationTip pt="Visão Analítica por Competências — acompanhe o desempenho em cada dimensão">Competency Analytics</TranslationTip>
          </h2>
          <p className="competency-desc">
            Use this data for competency-based management of your teams. Gamification provides an analytical view of performance across each dimension.
          </p>

          <div className="competency-overview">
            <div className="competency-bar-group">
              <div className="competency-label">
                <span>STEM Skills</span>
                <span className="competency-value">{avgCompetencies.stem}%</span>
              </div>
              <div className="competency-bar"><div className="competency-fill" style={{width: `${avgCompetencies.stem}%`, backgroundColor: '#4A90D9'}}></div></div>
            </div>
            <div className="competency-bar-group">
              <div className="competency-label">
                <span>English Proficiency</span>
                <span className="competency-value">{avgCompetencies.english}%</span>
              </div>
              <div className="competency-bar"><div className="competency-fill" style={{width: `${avgCompetencies.english}%`, backgroundColor: '#7BC67E'}}></div></div>
            </div>
            <div className="competency-bar-group">
              <div className="competency-label">
                <span>Collaboration</span>
                <span className="competency-value">{avgCompetencies.collaboration}%</span>
              </div>
              <div className="competency-bar"><div className="competency-fill" style={{width: `${avgCompetencies.collaboration}%`, backgroundColor: '#F5A623'}}></div></div>
            </div>
            <div className="competency-bar-group">
              <div className="competency-label">
                <span><TranslationTip pt="Alinhamento com os Objetivos de Desenvolvimento Sustentável da ONU">SDG Alignment</TranslationTip></span>
                <span className="competency-value">{avgCompetencies.ods}%</span>
              </div>
              <div className="competency-bar"><div className="competency-fill" style={{width: `${avgCompetencies.ods}%`, backgroundColor: '#9B59B6'}}></div></div>
            </div>
          </div>

          <div className="competency-teams-detail">
            {teacherTeams.map((team) => (
              <div key={team.id} className="competency-team-row">
                <div className="competency-team-name">{team.name}</div>
                <div className="competency-mini-bars">
                  <div className="competency-mini" title="STEM Skills">
                    <div className="competency-mini-fill" style={{width: `${team.competencies.stem}%`, backgroundColor: '#4A90D9'}}></div>
                  </div>
                  <div className="competency-mini" title="English Proficiency">
                    <div className="competency-mini-fill" style={{width: `${team.competencies.english}%`, backgroundColor: '#7BC67E'}}></div>
                  </div>
                  <div className="competency-mini" title="Collaboration">
                    <div className="competency-mini-fill" style={{width: `${team.competencies.collaboration}%`, backgroundColor: '#F5A623'}}></div>
                  </div>
                  <div className="competency-mini" title="SDG Alignment">
                    <div className="competency-mini-fill" style={{width: `${team.competencies.ods}%`, backgroundColor: '#9B59B6'}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="notifications">
          <h2 className="section-title"><Bell size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Notifications & Reminders</h2>

          <div className="notification-item">
            <div className="notification-title">
              <Languages size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Reminder: Deliveries in English</span>
            </div>
            <div className="notification-body">
              All program deliveries must be completed entirely in English. Make sure to review your teams' materials before submission.
            </div>
            <div className="notification-time">Pinned</div>
          </div>

          <div className="notification-item">
            <div className="notification-title">
              <Clock size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Upcoming Deadline: Prototyping Delivery</span>
            </div>
            <div className="notification-body">
              Teams <strong>EcoTech Solutions</strong> and <strong>Verde Futuro</strong> need to submit their prototypes (in English) by <strong>April 18, 11:59 PM</strong>. 5 days left!
            </div>
            <div className="notification-time">2 hours ago</div>
          </div>

          <div className="notification-item">
            <div className="notification-title">
              <CheckCircle2 size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Badge Earned!</span>
            </div>
            <div className="notification-body">
              Congratulations! Team <strong>Verde Futuro</strong> earned the <strong>"Office Hours Active"</strong> badge after attending today's session.
            </div>
            <div className="notification-time">3 hours ago</div>
          </div>

          <div className="notification-item">
            <div className="notification-title">
              <Calendar size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Workshop Available</span>
            </div>
            <div className="notification-body">
              The next <strong>Prototyping Office Hours</strong> session is next Tuesday, April 16, at 7 PM. Encourage your teams to participate!
            </div>
            <div className="notification-time">Yesterday</div>
          </div>

          <div className="notification-item">
            <div className="notification-title">
                    <span><School size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /></span>
                    <span>School Update</span>
                </div>
                <div className="notification-body">
                    Your school earned the <strong>"STEM + English Excellence"</strong> distinction! All teams demonstrated STEM alignment, English proficiency, and commitment to SDGs. <Globe size={16} style={{display: 'inline', verticalAlign: 'middle', marginLeft: '4px'}} />
            </div>
            <div className="notification-time">2 days ago</div>
          </div>

          <div className="notification-item">
            <div className="notification-title">
              <AlertTriangle size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Team Needs Attention</span>
            </div>
            <div className="notification-body">
              Team <strong>Água Limpa</strong> has not attended any office hours session yet. Consider encouraging them to attend the next one for additional support.
            </div>
            <div className="notification-time">3 days ago</div>
          </div>
        </div>
      </div>

      <TeamsModal
        isOpen={isTeamsModalOpen}
        onClose={() => setIsTeamsModalOpen(false)}
        teams={teacherTeams}
        title="Teams Mentored"
      />

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        events={calendarEvents}
        title="Event Calendar"
      />

      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        progressData={{
          average: Math.round(teacherTeams.reduce((sum, team) => sum + Math.round((team.badgesCount / totalBadges) * 100), 0) / teacherTeams.length),
          teams: teacherTeams.map(team => ({
            name: team.name,
            progress: Math.round((team.badgesCount / totalBadges) * 100)
          }))
        }}
        title="Average Progress"
      />

      <StudentsModal
        isOpen={isStudentsModalOpen}
        onClose={() => setIsStudentsModalOpen(false)}
        students={teacherTeams.flatMap(team =>
          team.members.map(member => ({
            name: member,
            team: team.name,
            badgesCount: Math.floor(team.badgesCount / team.members.length)
          }))
        )}
        title="Students Impacted"
      />

      <MessagesModal
        isOpen={isMessagesModalOpen}
        onClose={() => setIsMessagesModalOpen(false)}
        messages={[
          {
            type: 'info',
            title: 'Welcome to Codifica+ 2026 — STEM and English!',
            body: 'We are very happy to have you with us on this journey. As an English teacher leader, you are essential to guiding your teams in their English deliveries. Track progress and encourage participation in all workshops.',
            date: 'February 15, 2026'
          },
          {
            type: 'success',
            title: 'Strategic Plan Workshop Available',
            body: 'The first workshop of the program will be held on March 5, at 7 PM, via Zoom (conducted in English). Make sure your teams are registered.',
            date: 'March 1, 2026'
          },
          {
            type: 'urgent',
            title: 'Delivery Deadline: Prototyping',
            body: 'Remember: the final deadline for prototype delivery (documentation in English) is April 18, 11:59 PM. Check the progress of all your teams.',
            date: 'April 10, 2026'
          },
          {
            type: 'info',
            title: 'New Office Hours Scheduled',
            body: 'A new Prototyping office hours session will be held next Tuesday. Encourage your teams to participate!',
            date: 'April 12, 2026'
          }
        ]}
        title="Program Messages"
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={{
          sections: [
            {
              icon: BarChart3,
              title: 'Overview',
              content: (
                <div>
                  <p><strong>Total Teams:</strong> {teacherTeams.length}</p>
                  <p><strong>Total Students:</strong> {teacherTeams.reduce((sum, team) => sum + team.members.length, 0)}</p>
                  <p><strong>Average Progress:</strong> 67%</p>
                  <p><strong>Track:</strong> 100% English Track</p>
                </div>
              )
            },
            {
              icon: Users,
              title: 'Performance by Team',
              content: (
                <div>
                  {teacherTeams.map(team => (
                    <p key={team.name}>
                      <strong>{team.name}:</strong> {team.badgesCount} badges • {team.status}
                    </p>
                  ))}
                </div>
              )
            },
            {
              icon: Award,
              title: 'Total Badges',
              content: (
                <div>
                  <p><strong>Total Badges Earned:</strong> {teacherTeams.reduce((sum, team) => sum + team.badgesCount, 0)}</p>
                  <p><strong>Average per Team:</strong> {Math.round(teacherTeams.reduce((sum, team) => sum + team.badgesCount, 0) / teacherTeams.length)} badges</p>
                </div>
              )
            },
            {
              icon: Target,
              title: 'Next Steps',
              content: (
                <div>
                  <p><strong>Main Focus:</strong> Prototyping (deliveries in English)</p>
                  <p><strong>Teams Needing Attention:</strong> {teacherTeams.filter(t => t.status.includes('Attention')).length}</p>
                  <p><strong>Recommendation:</strong> Encourage participation in office hours and review the quality of English in team deliveries.</p>
                </div>
              )
            }
          ]
        }}
        title="General Report"
      />
      <Footer />
    </div>
  )
}

export default TeacherDashboard
