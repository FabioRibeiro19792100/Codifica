import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Users, School, Globe, Award, Zap, Heart, Crown, Target, Star, TrendingUp, BarChart3, MapPin, CheckCircle2, Sparkles, PartyPopper, Megaphone, Clock, Rocket, Lightbulb } from 'lucide-react'
import { loadGamificationData } from '../data/gamificationData'
import { getIcon } from '../utils/iconMap'
import TeamsModal from '../components/TeamsModal'
import TrophiesModal from '../components/TrophiesModal'
import ProgressModal from '../components/ProgressModal'
import RankingModal from '../components/RankingModal'
import Footer from '../components/Footer'
import './SchoolDashboard.css'

function SchoolDashboard() {
  const [data, setData] = useState(null)
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false)
  const [isTrophiesModalOpen, setIsTrophiesModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false)

  useEffect(() => {
    const loadData = () => {
      // Força um pequeno delay para garantir que o localStorage foi atualizado
      setTimeout(() => {
        const loadedData = loadGamificationData()
        setData(loadedData)
        // Debug: verificar se os dados foram carregados corretamente
        if (loadedData && loadedData.allTrophies) {
          const impactoReal = loadedData.allTrophies.find(t => t.id === 7)
          if (impactoReal) {
            console.log('Escola Impacto Real criteria:', impactoReal.criteria)
          }
        }
      }, 10)
    }
    loadData()
    // Escuta mudanças no localStorage (outras abas)
    window.addEventListener('storage', loadData)
    // Escuta evento customizado (mesma aba)
    window.addEventListener('gamificationDataChanged', loadData)
    return () => {
      window.removeEventListener('storage', loadData)
      window.removeEventListener('gamificationDataChanged', loadData)
    }
  }, [])

  if (!data) return <div>Carregando...</div>

  // Mock - em produção viria da API
  const earnedTrophyIds = [1, 2, 3, 4, 5]
  
  // Filtrar troféus conquistados
  const earnedTrophies = data.allTrophies.filter(trophy => earnedTrophyIds.includes(trophy.id))
  
  // Mock data - em produção viria da API
  const schoolTeams = [
    {
      name: "EcoTech Solutions",
      members: ["Ana Silva", "Bruno Santos", "Carla Oliveira", "Diego Costa", "Elena Ferreira"],
      badgesCount: 9,
      status: "Em dia - Fase: Prototipagem"
    },
    {
      name: "Verde Futuro",
      members: ["Fernando Lima", "Gabriela Rocha", "Henrique Alves", "Isabela Martins"],
      badgesCount: 10,
      status: "Em dia - Fase: Prototipagem"
    },
    {
      name: "Água Limpa",
      members: ["João Pedro", "Larissa Souza", "Marcos Teixeira"],
      badgesCount: 8,
      status: "Atenção - Fase: Ideação"
    },
    {
      name: "ClimaTech",
      members: ["Maria Santos", "Pedro Oliveira", "Rafaela Costa", "Thiago Lima"],
      badgesCount: 11,
      status: "Em dia - Fase: Prototipagem"
    },
    {
      name: "Sustentabilidade Jovem",
      members: ["Julia Ferreira", "Lucas Almeida", "Mariana Rocha"],
      badgesCount: 7,
      status: "Em dia - Fase: Ideação"
    },
    {
      name: "Green Innovation",
      members: ["Paula Mendes", "Ricardo Silva", "Sofia Costa", "Vitor Martins", "Yasmin Lima"],
      badgesCount: 12,
      status: "Em dia - Fase: Prototipagem"
    },
    {
      name: "Eco Warriors",
      members: ["Beatriz Souza", "Caio Teixeira", "Daniela Alves"],
      badgesCount: 6,
      status: "Atenção - Fase: Ideação"
    }
  ]

  return (
    <div className="school-dashboard">
      <div className="container">
        <div className="school-profile">
          <div className="school-header">
            <div className="school-logo"><School size={48} /></div>
            <div className="school-info">
              <div className="school-name">E.E. Professor João Silva</div>
              <div className="school-location">
                <MapPin size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> São Paulo, SP • Zona Leste
              </div>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card clickable" onClick={() => setIsTeamsModalOpen(true)}>
              <div className="stat-number">7</div>
              <div className="stat-label">Equipes Ativas</div>
            </div>
            <div className="stat-card clickable" onClick={() => setIsTrophiesModalOpen(true)}>
              <div className="stat-number">{earnedTrophyIds.length}</div>
              <div className="stat-label">Troféus Conquistados</div>
            </div>
            <div className="stat-card clickable" onClick={() => setIsProgressModalOpen(true)}>
              <div className="stat-number">86%</div>
              <div className="stat-label">Taxa de Conclusão</div>
            </div>
            <div className="stat-card clickable" onClick={() => setIsRankingModalOpen(true)}>
              <div className="stat-number">3º</div>
              <div className="stat-label">Posição no Ranking</div>
            </div>
          </div>
        </div>
        
        <div className="trophies-section">
          <h2 className="section-title">
            <Trophy size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Troféus da Escola
          </h2>
          
          <div className="trophies-grid">
            {data.allTrophies.map((trophy) => {
              const TrophyIcon = getIcon(trophy.icon || 'Trophy')
              const isEarned = earnedTrophyIds.includes(trophy.id)
              
              return (
                <div key={trophy.id} className={`trophy-card ${isEarned ? 'earned' : 'locked'}`}>
                  <div className="trophy-icon">
                    <TrophyIcon size={64} />
                  </div>
                  <div className="trophy-name">{trophy.name}</div>
                  <div className="trophy-description">{trophy.description}</div>
                  <div className="trophy-criteria">
                    <CheckCircle2 size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> {trophy.criteria}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="ranking-section">
          <h2 className="section-title">
            <BarChart3 size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Ranking Estadual - São Paulo
          </h2>
          
          <table className="ranking-table">
            <thead>
              <tr>
                <th style={{width: '80px', textAlign: 'center'}}>Posição</th>
                <th style={{width: '200px'}}>Escola</th>
                <th style={{width: '100px', textAlign: 'center'}}>Equipes</th>
                <th style={{width: '100px', textAlign: 'center'}}>Troféus</th>
                <th style={{width: '200px', textAlign: 'left'}}>Taxa Conclusão</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="rank-position top3">
                  <span style={{display: 'inline-block', width: '28px', textAlign: 'left'}}>
                    <Trophy size={24} style={{display: 'inline', verticalAlign: 'middle', color: '#ffd700'}} />
                  </span>1º
                </td>
                <td className="school-name-cell">Escola da Zona Sul, SP</td>
                <td style={{textAlign: 'center'}}>12</td>
                <td style={{textAlign: 'center'}}>8</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>92%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '92%'}}></div>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="rank-position top3">
                  <span style={{display: 'inline-block', width: '28px', textAlign: 'left'}}>
                    <Award size={24} style={{display: 'inline', verticalAlign: 'middle', color: '#c0c0c0'}} />
                  </span>2º
                </td>
                <td className="school-name-cell">Escola da Zona Oeste, SP</td>
                <td style={{textAlign: 'center'}}>10</td>
                <td style={{textAlign: 'center'}}>7</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>88%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '88%'}}></div>
                  </div>
                </td>
              </tr>
              
              <tr className="highlight-row">
                <td className="rank-position top3">
                  <span style={{display: 'inline-block', width: '28px', textAlign: 'left'}}>
                    <Award size={24} style={{display: 'inline', verticalAlign: 'middle', color: '#cd7f32'}} />
                  </span>3º
                </td>
                <td className="school-name-cell">
                  E.E. Professor João Silva <Star size={16} style={{display: 'inline', verticalAlign: 'middle', marginLeft: '4px'}} /> VOCÊ
                </td>
                <td style={{textAlign: 'center'}}>7</td>
                <td style={{textAlign: 'center'}}>5</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>86%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '86%'}}></div>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="rank-position">
                  <span style={{display: 'inline-block', width: '28px'}}></span>4º
                </td>
                <td className="school-name-cell">Escola da Zona Norte, SP</td>
                <td style={{textAlign: 'center'}}>9</td>
                <td style={{textAlign: 'center'}}>6</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>84%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '84%'}}></div>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="rank-position">
                  <span style={{display: 'inline-block', width: '28px'}}></span>5º
                </td>
                <td className="school-name-cell">Escola da Região Metropolitana, SP</td>
                <td style={{textAlign: 'center'}}>8</td>
                <td style={{textAlign: 'center'}}>5</td>
                <td>
                  <div style={{textAlign: 'left', fontWeight: 'bold', color: 'hsl(0, 0%, 5%)'}}>82%</div>
                  <div className="progress-bar-small">
                    <div className="progress-fill" style={{width: '82%'}}></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="tips-section">
          <h3 className="tips-title">
            <Lightbulb size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Como Subir no Ranking
          </h3>
          <div className="tips-content">
            <strong>• Ative mais equipes:</strong> Cada equipe adicional aumenta sua pontuação base<br />
            <strong>• Mantenha alta taxa de conclusão:</strong> Escolas com +85% ganham bônus multiplicador<br />
            <strong>• Conquiste troféus:</strong> Cada troféu desbloqueado adiciona pontos significativos<br />
            <strong>• Incentive participação em workshops:</strong> Equipes que participam ganham badges extras<br />
                <strong>• Foque em Alinhamento Climático:</strong> 100% dos projetos estimulando competências climáticas desbloqueia troféu especial
          </div>
        </div>
        
        <div className="achievement-box">
          <Sparkles size={32} style={{display: 'inline', verticalAlign: 'middle', marginRight: '12px'}} />
          <div>
            <strong>Parabéns!</strong><br />
            Sua escola está no <strong style={{color: 'hsl(0, 0%, 5%)'}}>TOP 3</strong> do estado de São Paulo!<br />
            Continue apoiando suas equipes para conquistar ainda mais troféus e reconhecimento.
          </div>
        </div>
      </div>
      
      <TeamsModal
        isOpen={isTeamsModalOpen}
        onClose={() => setIsTeamsModalOpen(false)}
        teams={schoolTeams}
        title="Equipes Ativas"
      />
      
      <TrophiesModal
        isOpen={isTrophiesModalOpen}
        onClose={() => setIsTrophiesModalOpen(false)}
        trophies={earnedTrophies}
        title="Troféus Conquistados"
      />

      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        progressData={{
          average: 86,
          teams: schoolTeams.map(team => ({
            name: team.name,
            progress: team.badgesCount * 5 // Aproximação baseada em badges
          }))
        }}
        title="Taxa de Conclusão"
      />

      <RankingModal
        isOpen={isRankingModalOpen}
        onClose={() => setIsRankingModalOpen(false)}
        rankingData={{
          position: "3º",
          details: {
            school: "E.E. Professor João Silva",
            region: "São Paulo, SP • Zona Leste",
            points: 1240,
            teams: 7,
            trophies: 5
          },
          comparison: [
            { position: "1º", school: "E.E. Maria Montessori", points: 1850 },
            { position: "2º", school: "Colégio Técnico Industrial", points: 1620 },
            { position: "3º", school: "E.E. Professor João Silva (VOCÊ)", points: 1240 }
          ]
        }}
        title="Posição no Ranking"
      />
      <Footer />
    </div>
  )
}

export default SchoolDashboard
