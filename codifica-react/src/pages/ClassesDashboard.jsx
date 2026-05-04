import { Link } from 'react-router-dom'
import { BookOpen, Users, GraduationCap, School, Trophy, ChevronRight, CircleDot } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { enrolledClasses, teamsCatalog } from '../data/gamificationData'
import Footer from '../components/Footer'
import './ClassesDashboard.css'

function ClassesDashboard() {
  const { user } = useAuth()

  if (!user) return null

  const visibleClasses = enrolledClasses.filter((cls) => {
    if (user.role === 'admin') return true
    if (user.role === 'gestor') return cls.school === user.school
    if (user.role === 'professor') return cls.teacher === user.name
    return false
  })

  const headerCopy = (() => {
    if (user.role === 'professor') {
      return {
        title: 'My enrolled classes',
        subtitle: 'Classes you lead — each one feeds into the work teams below.',
      }
    }
    if (user.role === 'gestor') {
      return {
        title: `Enrolled classes — ${user.school}`,
        subtitle: 'Track every class your school enrolled and the teams competing within them.',
      }
    }
    return {
      title: 'All enrolled classes',
      subtitle: 'Cross-school view of every class enrolled in GO UP! 2026.',
    }
  })()

  const groupedBySchool = user.role === 'admin'
    ? visibleClasses.reduce((acc, cls) => {
        acc[cls.school] = acc[cls.school] || []
        acc[cls.school].push(cls)
        return acc
      }, {})
    : null

  const renderClassCard = (cls) => {
    const teams = cls.teamIds.map((id) => ({
      id,
      ...(teamsCatalog[id] || { name: id, currentStage: '?', badgesCount: 0, membersCount: 0 }),
    }))

    return (
      <article key={cls.id} className={`class-card ${cls.status === 'inactive' ? 'is-inactive' : ''}`}>
        <header className="class-card-header">
          <div className="class-card-title-row">
            <BookOpen size={22} />
            <h3 className="class-card-title">{cls.name}</h3>
            <span className="class-card-grade">{cls.grade}</span>
          </div>
          <span className={`class-card-status status-${cls.status}`}>
            <CircleDot size={12} />
            {cls.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </header>

        <ul className="class-card-meta">
          <li><School size={14} /> {cls.school}</li>
          <li><GraduationCap size={14} /> {cls.teacher}</li>
          <li><Users size={14} /> {cls.studentsCount} students</li>
        </ul>

        <div className="class-card-teams">
          <div className="class-card-teams-label">
            <Trophy size={14} />
            <span>Work teams ({teams.length})</span>
          </div>
          <ul className="class-card-teams-list">
            {teams.map((team) => (
              <li key={team.id}>
                <Link to={`/team/${team.id}`} className="class-card-team-link">
                  <span className="team-link-name">{team.name}</span>
                  <span className="team-link-meta">
                    {team.membersCount} members · Stage {team.currentStage} · {team.badgesCount} badges
                  </span>
                  <ChevronRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    )
  }

  return (
    <div className="classes-dashboard">
      <div className="container">
        <header className="classes-header">
          <h1>{headerCopy.title}</h1>
          <p className="subtitle">{headerCopy.subtitle}</p>
        </header>

        <section className="classes-summary">
          <div className="summary-stat">
            <span className="summary-stat-number">{visibleClasses.length}</span>
            <span className="summary-stat-label">Enrolled classes</span>
          </div>
          <div className="summary-stat">
            <span className="summary-stat-number">
              {visibleClasses.reduce((s, c) => s + c.teamIds.length, 0)}
            </span>
            <span className="summary-stat-label">Work teams formed</span>
          </div>
          <div className="summary-stat">
            <span className="summary-stat-number">
              {visibleClasses.reduce((s, c) => s + c.studentsCount, 0)}
            </span>
            <span className="summary-stat-label">Total students</span>
          </div>
        </section>

        {visibleClasses.length === 0 ? (
          <div className="classes-empty">
            <BookOpen size={32} />
            <p>No enrolled classes yet.</p>
          </div>
        ) : groupedBySchool ? (
          Object.entries(groupedBySchool).map(([school, classes]) => (
            <section key={school} className="classes-school-group">
              <h2 className="classes-school-group-title">
                <School size={20} /> {school}
              </h2>
              <div className="classes-grid">
                {classes.map(renderClassCard)}
              </div>
            </section>
          ))
        ) : (
          <div className="classes-grid">
            {visibleClasses.map(renderClassCard)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ClassesDashboard
