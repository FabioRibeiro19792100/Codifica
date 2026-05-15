import { Link } from 'react-router-dom'
import { BookOpen, Users, GraduationCap, School, Trophy, ChevronRight, CircleDot } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { enrolledClasses, teamsCatalog } from '../data/gamificationData'
import Footer from '../components/Footer'
import './ClassesDashboard.css'

// Normalizes a backend turma + its equipes into the same shape ClassesDashboard rendered before.
function turmaToClassView(turma, equipesForTurma) {
  return {
    id: turma.turma_id,
    name: turma.turma_nome,
    grade: turma.etec_numero ? `ETEC ${turma.etec_numero}` : '',
    school: turma.etec_nome || '',
    teacher: turma.professor_lead_nome || '',
    studentsCount: turma.students_count_estimate || 0,
    status: turma.status || 'active',
    teams: equipesForTurma.map((e) => ({
      id: e.equipe_id,
      name: e.equipe_nome,
      currentStage: e.status?.current_stage_id ?? '?',
      badgesCount: e.status?.earned_badge_ids?.length ?? 0,
      membersCount: Array.isArray(e.membros) ? e.membros.length : 0,
    })),
  }
}

// Mock-fallback shape (preserves old gestor/admin views until backend covers those roles).
function mockClassToView(cls) {
  return {
    id: cls.id,
    name: cls.name,
    grade: cls.grade,
    school: cls.school,
    teacher: cls.teacher,
    studentsCount: cls.studentsCount,
    status: cls.status,
    teams: cls.teamIds.map((id) => ({
      id,
      ...(teamsCatalog[id] || { name: id, currentStage: '?', badgesCount: 0, membersCount: 0 }),
    })),
  }
}

function ClassesDashboard() {
  const { user, turmas, equipes } = useAuth()

  if (!user) return null

  let visibleClasses
  if (user.role === 'professor' && turmas.length > 0) {
    const equipesByTurma = equipes.reduce((acc, e) => {
      acc[e.turma_id] = acc[e.turma_id] || []
      acc[e.turma_id].push(e)
      return acc
    }, {})
    visibleClasses = turmas.map((t) => turmaToClassView(t, equipesByTurma[t.turma_id] || []))
  } else {
    visibleClasses = enrolledClasses
      .filter((cls) => {
        if (user.role === 'admin') return true
        if (user.role === 'gestor') return cls.school === user.school
        if (user.role === 'professor') return cls.teacher === user.name
        return false
      })
      .map(mockClassToView)
  }

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

  const renderClassCard = (cls) => (
    <article key={cls.id} className={`class-card ${cls.status === 'inactive' ? 'is-inactive' : ''}`}>
      <header className="class-card-header">
        <div className="class-card-title-row">
          <BookOpen size={22} />
          <h3 className="class-card-title">{cls.name}</h3>
          {cls.grade && <span className="class-card-grade">{cls.grade}</span>}
        </div>
        <span className={`class-card-status status-${cls.status}`}>
          <CircleDot size={12} />
          {cls.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </header>

      <ul className="class-card-meta">
        {cls.school && <li><School size={14} /> {cls.school}</li>}
        {cls.teacher && <li><GraduationCap size={14} /> {cls.teacher}</li>}
        <li><Users size={14} /> {cls.studentsCount} students</li>
      </ul>

      <div className="class-card-teams">
        <div className="class-card-teams-label">
          <Trophy size={14} />
          <span>Work teams ({cls.teams.length})</span>
        </div>
        {cls.teams.length === 0 ? (
          <p className="class-card-teams-empty">No teams formed yet.</p>
        ) : (
          <ul className="class-card-teams-list">
            {cls.teams.map((team) => (
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
        )}
      </div>
    </article>
  )

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
              {visibleClasses.reduce((s, c) => s + c.teams.length, 0)}
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
