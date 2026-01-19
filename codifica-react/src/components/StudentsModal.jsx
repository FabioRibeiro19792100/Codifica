import React from 'react'
import { X, Users, GraduationCap } from 'lucide-react'
import './StudentsModal.css'

function StudentsModal({ isOpen, onClose, students, title }) {
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
          {students.length === 0 ? (
            <p>Nenhum estudante encontrado.</p>
          ) : (
            <div className="students-list-modal">
              {students.map((student, index) => (
                <div key={index} className="student-item-modal">
                  <div className="student-icon-modal">
                    <GraduationCap size={24} />
                  </div>
                  <div className="student-info-modal">
                    <div className="student-name-modal">{student.name}</div>
                    {student.team && (
                      <div className="student-team-modal">Equipe: {student.team}</div>
                    )}
                    {student.badgesCount !== undefined && (
                      <div className="student-badges-modal">{student.badgesCount} badges conquistados</div>
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

export default StudentsModal
