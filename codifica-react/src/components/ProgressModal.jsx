import React from 'react'
import { X, BarChart3, Target, TrendingUp } from 'lucide-react'
import './ProgressModal.css'

function ProgressModal({ isOpen, onClose, progressData, title }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="progress-details-modal">
            <div className="progress-stat-item">
              <BarChart3 size={24} />
              <div>
                <div className="stat-label-modal">Progresso Médio</div>
                <div className="stat-value-modal">{progressData.average}%</div>
              </div>
            </div>
            {progressData.teams && progressData.teams.length > 0 && (
              <div className="teams-progress-list">
                <div className="teams-progress-title">Progresso por Equipe:</div>
                {progressData.teams.map((team, index) => (
                  <div key={index} className="team-progress-item">
                    <div className="team-progress-name">{team.name}</div>
                    <div className="team-progress-bar-container">
                      <div 
                        className="team-progress-bar" 
                        style={{width: `${team.progress}%`}}
                      ></div>
                    </div>
                    <div className="team-progress-value">{team.progress}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressModal
