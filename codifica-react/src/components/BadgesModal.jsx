import React from 'react'
import { X, Award } from 'lucide-react'
import { getIcon } from '../utils/iconMap'
import './BadgesModal.css'

function BadgesModal({ isOpen, onClose, badges, title }) {
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
          {badges.length === 0 ? (
            <p>Nenhum badge encontrado.</p>
          ) : (
            <div className="badges-list-modal">
              {badges.map((badge, index) => {
                const BadgeIcon = getIcon(badge.icon) || Award
                return (
                  <div key={badge.id || index} className="badge-item-modal">
                    <div className="badge-icon-modal">
                      <BadgeIcon size={32} />
                    </div>
                    <div className="badge-info-modal">
                      <div className="badge-name-modal">{badge.name}</div>
                      <div className="badge-desc-modal">{badge.description}</div>
                      {badge.phaseTitle && (
                        <div className="badge-phase-modal">Fase: {badge.phaseTitle}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BadgesModal
