import React from 'react'
import { X, BookOpen, Star, CheckCircle2 } from 'lucide-react'
import { getIcon } from '../utils/iconMap'
import './PedagogicalBadgeModal.css'

function PedagogicalBadgeModal({ isOpen, onClose, badge }) {
  if (!isOpen || !badge) return null

  const BadgeIcon = getIcon(badge.icon) || BookOpen

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="pedagogical-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pedagogical-modal-header">
          <div className="pedagogical-badge-header-icon">
            <BadgeIcon size={48} />
            {badge.level === 'advanced' && <Star className="advanced-star" size={20} />}
          </div>
          <div>
            <h2>{badge.name}</h2>
            <div className="pedagogical-badge-competency">
              <BookOpen size={16} />
              <span>Competência: {badge.competency}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="pedagogical-modal-body">
          <p className="pedagogical-description">{badge.description}</p>
          
          {badge.criteria && (
            <div className="criteria-section">
              <h3>Critérios de Avaliação</h3>
              
              <div className="criteria-level">
                <div className="criteria-level-header">
                  <CheckCircle2 size={20} />
                  <span>Nível Básico</span>
                </div>
                <ul className="criteria-list">
                  {badge.criteria.minimum.map((criterion, idx) => (
                    <li key={idx}>{criterion}</li>
                  ))}
                </ul>
              </div>
              
              {badge.criteria.excellence && (
                <div className="criteria-level excellence">
                  <div className="criteria-level-header">
                    <Star size={20} />
                    <span>Nível Avançado</span>
                  </div>
                  <ul className="criteria-list">
                    {badge.criteria.excellence.map((criterion, idx) => (
                      <li key={idx}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PedagogicalBadgeModal
