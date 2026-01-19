import { X, Users, GraduationCap, Award, CheckCircle2 } from 'lucide-react'
import './TeamsModal.css'

function TeamsModal({ isOpen, onClose, teams, title }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {teams && teams.length > 0 ? (
            <div className="teams-list">
              {teams.map((team, index) => (
                <div key={index} className="team-item">
                  <div className="team-header">
                    <div className="team-name">
                      <Users size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
                      <strong>{team.name}</strong>
                    </div>
                    <div className="team-badges-count">
                      <Award size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} />
                      {team.badgesCount} badges
                    </div>
                  </div>
                  <div className="team-members">
                    <div className="team-members-label">
                      <GraduationCap size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} />
                      Membros:
                    </div>
                    <div className="team-members-list">
                      {team.members.map((member, idx) => (
                        <span key={idx} className="team-member">
                          {member}
                          {idx < team.members.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                  {team.status && (
                    <div className="team-status">
                      <CheckCircle2 size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} />
                      {team.status}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-teams">
              <p>Nenhuma equipe encontrada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamsModal
