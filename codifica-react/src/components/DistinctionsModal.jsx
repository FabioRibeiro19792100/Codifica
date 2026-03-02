import { X, Trophy, Award } from 'lucide-react'
import { getIcon } from '../utils/iconMap'
import './DistinctionsModal.css'

const TYPE_LABELS = {
  certificado_digital: 'Digital Certificate',
  selo_reconhecimento: 'Recognition Seal',
  mencao_honrosa: 'Honorable Mention',
}

function DistinctionsModal({ isOpen, onClose, distinctions, title }) {
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
          {distinctions && distinctions.length > 0 ? (
            <div className="distinctions-list">
              {distinctions.map((distinction, index) => {
                const DistinctionIcon = getIcon(distinction.icon) || Trophy
                return (
                  <div key={distinction.id || index} className="distinction-item">
                    <div className="distinction-icon-wrapper">
                      <DistinctionIcon size={32} />
                    </div>
                    <div className="distinction-info">
                      <div className="distinction-name">
                        <strong>{distinction.name}</strong>
                        {distinction.type && (
                          <span className="distinction-type-tag">{TYPE_LABELS[distinction.type] || distinction.type}</span>
                        )}
                      </div>
                      <div className="distinction-description">{distinction.description}</div>
                      <div className="distinction-criteria">
                        <Award size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} />
                        Criteria: {distinction.criteria}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="no-distinctions">
              <p>No distinctions earned yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DistinctionsModal
