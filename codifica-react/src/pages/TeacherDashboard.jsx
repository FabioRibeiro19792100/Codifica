import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Users, MapPin, School, Globe, Trophy, Plus, BarChart3, Calendar, MessageSquare, Zap, Award, Bell, Clock, AlertTriangle, CheckCircle2, Rocket, Target } from 'lucide-react'
import { loadGamificationData } from '../data/gamificationData'
import TeamsModal from '../components/TeamsModal'
import CalendarModal from '../components/CalendarModal'
import ProgressModal from '../components/ProgressModal'
import StudentsModal from '../components/StudentsModal'
import MessagesModal from '../components/MessagesModal'
import ReportModal from '../components/ReportModal'
import Footer from '../components/Footer'
import './TeacherDashboard.css'

function TeacherDashboard() {
  const [data, setData] = useState(null)
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
  const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false)
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  useEffect(() => {
    const loadData = () => {
      try {
        const loadedData = loadGamificationData()
        setData(loadedData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        // Usar dados padrão em caso de erro
        setData(loadGamificationData())
      }
    }
    loadData()
    window.addEventListener('storage', loadData)
    window.addEventListener('gamificationDataChanged', loadData)
    return () => {
      window.removeEventListener('storage', loadData)
      window.removeEventListener('gamificationDataChanged', loadData)
    }
  }, [])

  if (!data) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div>Carregando...</div>
      </div>
    )
  }
  
      // Calcular total de badges
      const totalBadges = data.phases.reduce((sum, phase) => sum + phase.badges.length, 0)
      
      // Mock data - em produção viria da API
      // Lógica: badges baseados na fase atual
      // Se está na mesma fase, tem o mesmo número de badges
      const teacherTeams = [
        {
          name: "EcoTech Solutions",
          members: ["Ana Silva", "Bruno Santos", "Carla Oliveira", "Diego Costa", "Elena Ferreira"],
          currentPhase: 3, // Prototipagem
          badgesCount: 8, // Fase 1 completa (3) + Fase 2 completa (3) + 2 da Fase 3 (Workshop e Plantão)
          status: "Em dia - Fase: Prototipagem"
        },
        {
          name: "Verde Futuro",
          members: ["Fernando Lima", "Gabriela Rocha", "Henrique Alves", "Isabela Martins"],
          currentPhase: 3, // Prototipagem
          badgesCount: 8, // MESMO que EcoTech - ambas na mesma fase
          status: "Em dia - Fase: Prototipagem"
        },
        {
          name: "Água Limpa",
          members: ["João Pedro", "Larissa Souza", "Marcos Teixeira"],
          currentPhase: 2, // Ideação
          badgesCount: 6, // Fase 1 completa (3) + Fase 2 completa (3)
          status: "Atenção - Fase: Ideação"
        }
      ]
  
  // Mock data - eventos do calendário
  const calendarEvents = [
    {
      date: "5 de Março",
      time: "19h",
      title: "Workshop de Ideação",
      description: "Oficina online para orientar equipes na fase de ideação e desenvolvimento de soluções inovadoras.",
      location: "Online (Zoom)",
      type: "workshop"
    },
    {
      date: "12 de Março",
      time: "19h",
      title: "Plantão de Dúvidas - Ideação",
      description: "Sessão de perguntas e respostas sobre a fase de Ideação.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "19 de Março",
      time: "19h",
      title: "Plantão de Dúvidas - Ideação",
      description: "Sessão de perguntas e respostas sobre a fase de Ideação.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "21 de Março",
      title: "Prazo: Entrega de Ideação",
      description: "Último dia para envio das entregas da fase de Ideação.",
      type: "prazo"
    },
    {
      date: "26 de Março",
      time: "19h",
      title: "Workshop de Prototipagem",
      description: "Oficina online para orientar equipes na criação de protótipos funcionais.",
      location: "Online (Zoom)",
      type: "workshop"
    },
    {
      date: "2 de Abril",
      time: "19h",
      title: "Plantão de Dúvidas - Prototipagem",
      description: "Sessão de perguntas e respostas sobre a fase de Prototipagem.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "9 de Abril",
      time: "19h",
      title: "Plantão de Dúvidas - Prototipagem",
      description: "Sessão de perguntas e respostas sobre a fase de Prototipagem.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "16 de Abril",
      time: "19h",
      title: "Plantão de Dúvidas - Prototipagem",
      description: "Sessão de perguntas e respostas sobre a fase de Prototipagem.",
      location: "Online (Zoom)",
      type: "plantao"
    },
    {
      date: "18 de Abril",
      title: "Prazo: Entrega de Prototipagem",
      description: "Último dia para envio dos protótipos funcionais.",
      type: "prazo"
    },
    {
      date: "23 de Abril",
      time: "19h",
      title: "Workshop de Pitch",
      description: "Oficina online para orientar equipes na criação de vídeos pitch de 3 minutos.",
      location: "Online (Zoom)",
      type: "workshop"
    },
    {
      date: "28 de Abril",
      title: "Prazo: Envio do Pitch",
      description: "Último dia para envio dos vídeos pitch.",
      type: "prazo"
    },
    {
      date: "30 de Abril",
      title: "Anúncio dos 10 Finalistas",
      description: "Divulgação das equipes selecionadas para a banca final.",
      type: "prazo"
    },
    {
      date: "5 de Maio",
      time: "14h",
      title: "Banca Final Presencial",
      description: "Apresentação das 10 equipes finalistas em São Paulo.",
      location: "São Paulo, SP",
      type: "workshop"
    },
    {
      date: "9 de Maio",
      time: "19h",
      title: "Cerimônia de Premiação",
      description: "Anúncio das 3 equipes vencedoras e entrega dos prêmios.",
      location: "São Paulo, SP",
      type: "workshop"
    }
  ]

  return (
    <div className="teacher-dashboard">
      <div className="container">
        <div className="teacher-profile">
          <div className="teacher-avatar"><GraduationCap size={40} style={{color: 'hsl(35, 25%, 92%)'}} /></div>
          <div className="teacher-info">
            <div className="teacher-name">Prof. Carlos Eduardo Silva</div>
            <div className="teacher-school"><MapPin size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> E.E. Professor João Silva • São Paulo, SP</div>
          </div>
          <div className="teacher-badge">
            <Trophy size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '6px', color: 'hsl(35, 25%, 92%)'}} />
            <span>Professor Multi-time</span>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card clickable" onClick={() => setIsTeamsModalOpen(true)}>
            <div className="stat-number">3</div>
            <div className="stat-label">Equipes Orientadas</div>
          </div>
          <div className="stat-card clickable" onClick={() => setIsProgressModalOpen(true)}>
            <div className="stat-number">67%</div>
            <div className="stat-label">Progresso Médio</div>
          </div>
          <div className="stat-card clickable" onClick={() => setIsStudentsModalOpen(true)}>
            <div className="stat-number">15</div>
            <div className="stat-label">Estudantes Impactados</div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h2 className="section-title"><Zap size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Ações Rápidas</h2>
          <div className="actions-grid">
            <div className="action-card clickable" onClick={() => setIsReportModalOpen(true)}>
              <div className="action-icon"><BarChart3 size={48} /></div>
              <div className="action-title">Ver Relatório Geral</div>
              <div className="action-desc">Análise consolidada de todas as equipes</div>
            </div>
            
            <div className="action-card clickable" onClick={() => setIsCalendarModalOpen(true)}>
              <div className="action-icon"><Calendar size={48} /></div>
              <div className="action-title">Calendário de Eventos</div>
              <div className="action-desc">Workshops, plantões e prazos</div>
            </div>
            
            <div className="action-card clickable" onClick={() => setIsMessagesModalOpen(true)}>
              <div className="action-icon"><MessageSquare size={48} /></div>
              <div className="action-title">Mensagens da Mastertech</div>
              <div className="action-desc">Comunicados oficiais e atualizações</div>
            </div>
          </div>
        </div>
        
            <div className="teams-section">
              <h2 className="section-title"><Rocket size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Minhas Equipes</h2>
          
          <div className="teams-grid">
            <div className="team-card">
              <div className="team-header">
                <div>
                  <div className="team-name">EcoTech Solutions</div>
                  <div className="team-members"><Users size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> 5 estudantes • 2º ano EM</div>
                </div>
                <div className="team-status">Em dia</div>
              </div>
              
              <div className="team-progress">
                <div className="progress-label">
                  <span><strong>Fase Atual:</strong> Prototipagem</span>
                  <span><strong>{teacherTeams[0].badgesCount}/{totalBadges}</strong> badges</span>
                </div>
                <div className="progress-bar-small"><div className="progress-fill" style={{width: `${Math.round((teacherTeams[0].badgesCount / totalBadges) * 100)}%`}}></div></div>
                <div className="progress-percentage">{Math.round((teacherTeams[0].badgesCount / totalBadges) * 100)}%</div>
              </div>
            </div>
            
            <div className="team-card">
              <div className="team-header">
                <div>
                  <div className="team-name">Verde Futuro</div>
                  <div className="team-members"><Users size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> 4 estudantes • 3º ano EM</div>
                </div>
                <div className="team-status">Em dia</div>
              </div>
              
              <div className="team-progress">
                <div className="progress-label">
                  <span><strong>Fase Atual:</strong> Prototipagem</span>
                  <span><strong>{teacherTeams[1].badgesCount}/{totalBadges}</strong> badges</span>
                </div>
                <div className="progress-bar-small"><div className="progress-fill" style={{width: `${Math.round((teacherTeams[1].badgesCount / totalBadges) * 100)}%`}}></div></div>
                <div className="progress-percentage">{Math.round((teacherTeams[1].badgesCount / totalBadges) * 100)}%</div>
              </div>
            </div>
            
            <div className="team-card">
              <div className="team-header">
                <div>
                  <div className="team-name">Água Limpa</div>
                  <div className="team-members"><Users size={16} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> 3 estudantes • 1º ano EM</div>
                </div>
                <div className="team-status warning">Atenção</div>
              </div>
              
              <div className="team-progress">
                <div className="progress-label">
                  <span><strong>Fase Atual:</strong> Ideação</span>
                  <span><strong>{teacherTeams[2].badgesCount}/{totalBadges}</strong> badges</span>
                </div>
                <div className="progress-bar-small"><div className="progress-fill" style={{width: `${Math.round((teacherTeams[2].badgesCount / totalBadges) * 100)}%`}}></div></div>
                <div className="progress-percentage">{Math.round((teacherTeams[2].badgesCount / totalBadges) * 100)}%</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="notifications">
          <h2 className="section-title"><Bell size={24} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /> Notificações e Lembretes</h2>
          
          <div className="notification-item">
            <div className="notification-title">
              <Clock size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Prazo Próximo: Entrega de Prototipagem</span>
            </div>
            <div className="notification-body">
              As equipes <strong>EcoTech Solutions</strong> e <strong>Verde Futuro</strong> precisam enviar seus protótipos até <strong>18 de Abril, 23h59</strong>. Faltam 5 dias!
            </div>
            <div className="notification-time">Há 2 horas</div>
          </div>
          
          <div className="notification-item">
            <div className="notification-title">
              <CheckCircle2 size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Badge Conquistado!</span>
            </div>
            <div className="notification-body">
              Parabéns! A equipe <strong>Verde Futuro</strong> conquistou o badge <strong>"Plantão Ativo Prototipagem"</strong> após participar do plantão de hoje.
            </div>
            <div className="notification-time">Há 3 horas</div>
          </div>
          
          <div className="notification-item">
            <div className="notification-title">
              <Calendar size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Workshop Disponível</span>
            </div>
            <div className="notification-body">
              O próximo <strong>Plantão de Prototipagem</strong> será na próxima terça-feira, 16 de Abril, às 19h. Incentive suas equipes a participarem!
            </div>
            <div className="notification-time">Ontem</div>
          </div>
          
          <div className="notification-item">
            <div className="notification-title">
                    <span><School size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} /></span>
                    <span>Atualização da Escola</span>
                </div>
                <div className="notification-body">
                    Sua escola conquistou o troféu <strong>"Escola Climate Champion"</strong>! Todas as equipes demonstraram estimular competências climáticas em todas as entregas. <Globe size={16} style={{display: 'inline', verticalAlign: 'middle', marginLeft: '4px'}} />
            </div>
            <div className="notification-time">2 dias atrás</div>
          </div>
          
          <div className="notification-item">
            <div className="notification-title">
              <AlertTriangle size={20} style={{display: 'inline', verticalAlign: 'middle', marginRight: '8px'}} />
              <span>Equipe Precisa de Atenção</span>
            </div>
            <div className="notification-body">
              A equipe <strong>Água Limpa</strong> ainda não participou de nenhum plantão. Considere incentivá-los a comparecer no próximo para ganhar suporte adicional.
            </div>
            <div className="notification-time">3 dias atrás</div>
          </div>
        </div>
      </div>
      
      <TeamsModal
        isOpen={isTeamsModalOpen}
        onClose={() => setIsTeamsModalOpen(false)}
        teams={teacherTeams}
        title="Equipes Orientadas"
      />
      
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        events={calendarEvents}
        title="Calendário de Eventos"
      />

      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        progressData={{
          average: Math.round(teacherTeams.reduce((sum, team) => sum + Math.round((team.badgesCount / totalBadges) * 100), 0) / teacherTeams.length),
          teams: teacherTeams.map(team => ({
            name: team.name,
            progress: Math.round((team.badgesCount / totalBadges) * 100)
          }))
        }}
        title="Progresso Médio"
      />

      <StudentsModal
        isOpen={isStudentsModalOpen}
        onClose={() => setIsStudentsModalOpen(false)}
        students={teacherTeams.flatMap(team => 
          team.members.map(member => ({
            name: member,
            team: team.name,
            badgesCount: Math.floor(team.badgesCount / team.members.length)
          }))
        )}
        title="Estudantes Impactados"
      />

      <MessagesModal
        isOpen={isMessagesModalOpen}
        onClose={() => setIsMessagesModalOpen(false)}
        messages={[
          {
            type: 'info',
            title: 'Bem-vindo ao Codifica+ 2026!',
            body: 'Estamos muito felizes em tê-lo conosco nesta jornada. Acompanhe suas equipes e incentive a participação em todos os workshops e plantões.',
            date: '15 de Fevereiro, 2026'
          },
          {
            type: 'success',
            title: 'Workshop de Ideação Disponível',
            body: 'O primeiro workshop do programa será realizado no dia 5 de Março, às 19h, via Zoom. Certifique-se de que suas equipes estão inscritas.',
            date: '1 de Março, 2026'
          },
          {
            type: 'urgent',
            title: 'Prazo de Entrega: Prototipagem',
            body: 'Lembre-se: o prazo final para entrega dos protótipos é 18 de Abril, 23h59. Verifique o progresso de todas as suas equipes.',
            date: '10 de Abril, 2026'
          },
          {
            type: 'info',
            title: 'Novo Plantão Agendado',
            body: 'Um novo plantão de dúvidas sobre Prototipagem será realizado na próxima terça-feira. Incentive a participação de suas equipes!',
            date: '12 de Abril, 2026'
          }
        ]}
        title="Mensagens da Mastertech"
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={{
          sections: [
            {
              icon: BarChart3,
              title: 'Visão Geral',
              content: (
                <div>
                  <p><strong>Total de Equipes:</strong> {teacherTeams.length}</p>
                  <p><strong>Total de Estudantes:</strong> {teacherTeams.reduce((sum, team) => sum + team.members.length, 0)}</p>
                  <p><strong>Progresso Médio:</strong> 67%</p>
                </div>
              )
            },
            {
              icon: Users,
              title: 'Desempenho por Equipe',
              content: (
                <div>
                  {teacherTeams.map(team => (
                    <p key={team.name}>
                      <strong>{team.name}:</strong> {team.badgesCount} badges • {team.status}
                    </p>
                  ))}
                </div>
              )
            },
            {
              icon: Award,
              title: 'Badges Totais',
              content: (
                <div>
                  <p><strong>Total de Badges Conquistados:</strong> {teacherTeams.reduce((sum, team) => sum + team.badgesCount, 0)}</p>
                  <p><strong>Média por Equipe:</strong> {Math.round(teacherTeams.reduce((sum, team) => sum + team.badgesCount, 0) / teacherTeams.length)} badges</p>
                </div>
              )
            },
            {
              icon: Target,
              title: 'Próximos Passos',
              content: (
                <div>
                  <p><strong>Foco Principal:</strong> Prototipagem</p>
                  <p><strong>Equipes em Atenção:</strong> {teacherTeams.filter(t => t.status.includes('Atenção')).length}</p>
                  <p><strong>Recomendação:</strong> Incentive a participação nos plantões para aumentar o engajamento das equipes.</p>
                </div>
              )
            }
          ]
        }}
        title="Relatório Geral"
      />
      <Footer />
    </div>
  )
}

export default TeacherDashboard
