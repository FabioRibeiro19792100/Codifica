import React from 'react'
import { X, Trophy, Award, Star, TrendingUp } from 'lucide-react'
import './RankingModal.css'

function RankingModal({ isOpen, onClose, rankingData, title }) {
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
          <div className="ranking-info-modal">
            <div className="ranking-position-large">
              <div className="position-number">{rankingData.position}</div>
              <div className="position-label">Ranking Position</div>
            </div>
            {rankingData.details && (
              <div className="ranking-details">
                <p><strong>School:</strong> {rankingData.details.school}</p>
                <p><strong>Region:</strong> {rankingData.details.region}</p>
                <p><strong>Total Points:</strong> {rankingData.details.points}</p>
                <p><strong>Active Teams:</strong> {rankingData.details.teams}</p>
                <p><strong>Distinctions Earned:</strong> {rankingData.details.distinctions}</p>
              </div>
            )}
            {rankingData.comparison && (
              <div className="ranking-comparison">
                <h3>Top 3 Comparison</h3>
                <div className="comparison-list">
                  {rankingData.comparison.map((item, index) => (
                    <div key={index} className="comparison-item">
                      <div className="comparison-position">{item.position}</div>
                      <div className="comparison-school">{item.school}</div>
                      <div className="comparison-points">{item.points} points</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RankingModal
