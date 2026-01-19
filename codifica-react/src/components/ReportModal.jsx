import React from 'react'
import { X, BarChart3, TrendingUp, Users, Award, Target } from 'lucide-react'
import './ReportModal.css'

function ReportModal({ isOpen, onClose, reportData, title }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="report-sections">
            {reportData.sections && reportData.sections.map((section, index) => (
              <div key={index} className="report-section">
                <h3 className="report-section-title">
                  {section.icon && <section.icon size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />}
                  {section.title}
                </h3>
                <div className="report-section-content">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportModal
