import { X, Calendar, Clock, MapPin, Users } from 'lucide-react'
import './CalendarModal.css'

function CalendarModal({ isOpen, onClose, events, title }) {
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
          {events && events.length > 0 ? (
            <div className="events-list">
              {events.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-date">
                    <Calendar size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
                    <strong>{event.date}</strong>
                    {event.time && (
                      <>
                        <Clock size={16} style={{display: 'inline', verticalAlign: 'middle', marginLeft: '12px', marginRight: '4px'}} />
                        {event.time}
                      </>
                    )}
                  </div>
                  <div className="event-title">
                    <strong>{event.title}</strong>
                  </div>
                  {event.description && (
                    <div className="event-description">{event.description}</div>
                  )}
                  {event.location && (
                    <div className="event-location">
                      <MapPin size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} />
                      {event.location}
                    </div>
                  )}
                  {event.type && (
                    <div className="event-type">
                      <span className={`event-badge ${event.type}`}>{event.type}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-events">
              <p>Nenhum evento agendado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarModal
