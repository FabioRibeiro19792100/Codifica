import React from 'react'
import { X, Star, Globe, Award, TrendingUp } from 'lucide-react'
import './ShowcaseModal.css'

function ShowcaseModal({ isOpen, onClose, showcases, title }) {
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
          {showcases.length === 0 ? (
            <p>Nenhuma vitrine encontrada.</p>
          ) : (
            <div className="showcases-list-modal">
              {showcases.map((showcase, index) => (
                <div key={index} className="showcase-item-modal">
                  <div className="showcase-icon-modal">
                    <Star size={24} />
                  </div>
                  <div className="showcase-info-modal">
                    <div className="showcase-title-modal">{showcase.title}</div>
                    <div className="showcase-desc-modal">{showcase.description}</div>
                    {showcase.date && (
                      <div className="showcase-date-modal">{showcase.date}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShowcaseModal
