import React from 'react'
import { X, MessageSquare, Bell, AlertCircle, Info, CheckCircle2 } from 'lucide-react'
import './MessagesModal.css'

function MessagesModal({ isOpen, onClose, messages, title }) {
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
          {messages.length === 0 ? (
            <p>Nenhuma mensagem encontrada.</p>
          ) : (
            <div className="messages-list-modal">
              {messages.map((message, index) => {
                const getIcon = () => {
                  if (message.type === 'urgent') return <AlertCircle size={20} />
                  if (message.type === 'success') return <CheckCircle2 size={20} />
                  if (message.type === 'info') return <Info size={20} />
                  return <Bell size={20} />
                }
                
                return (
                  <div key={index} className={`message-item-modal ${message.type || ''}`}>
                    <div className="message-icon-modal">
                      {getIcon()}
                    </div>
                    <div className="message-info-modal">
                      <div className="message-title-modal">{message.title}</div>
                      <div className="message-body-modal">{message.body}</div>
                      {message.date && (
                        <div className="message-date-modal">{message.date}</div>
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

export default MessagesModal
