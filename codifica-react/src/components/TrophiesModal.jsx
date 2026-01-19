import { X, Trophy, Award } from 'lucide-react'
import { getIcon } from '../utils/iconMap'
import './TrophiesModal.css'

function TrophiesModal({ isOpen, onClose, trophies, title }) {
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
          {trophies && trophies.length > 0 ? (
            <div className="trophies-list">
              {trophies.map((trophy, index) => {
                const TrophyIcon = getIcon(trophy.icon) || Trophy
                return (
                  <div key={trophy.id || index} className="trophy-item">
                    <div className="trophy-icon-wrapper">
                      <TrophyIcon size={32} />
                    </div>
                    <div className="trophy-info">
                      <div className="trophy-name">
                        <strong>{trophy.name}</strong>
                      </div>
                      <div className="trophy-description">{trophy.description}</div>
                      <div className="trophy-criteria">
                        <Award size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} />
                        Critérios: {trophy.criteria}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="no-trophies">
              <p>Nenhum troféu conquistado ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrophiesModal
