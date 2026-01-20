import { Link } from 'react-router-dom'
import { GraduationCap, Users, School, BarChart3, Award, BookOpen, CheckCircle2, Star } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <Navigation />
      
      <div className="container">
        <section className="home-hero">
          <div className="hero-title-section">
            <h1 className="home-title">codifica+</h1>
            <p className="home-subtitle">2026</p>
            <p className="home-version">Sistema de Gamificação • Versão 1.0</p>
          </div>
          
          <div className="hero-content-section">
            <p className="intro-text">
              Este é um protótipo completo do sistema de gamificação do programa <strong>Codifica+ 2026</strong>.
            </p>
            <p className="intro-text">
              O sistema foi desenvolvido para demonstrar como badges, troféus e reconhecimentos funcionarão na prática.
            </p>
          </div>
        </section>
        
        <section id="fluxo-sistema" className="flow-section-page">
          <div className="flow-container">
            <h2 className="section-title">Fluxo do Sistema</h2>
            <div className="flow-grid-4">
              <div className="flow-column">
                <div className="flow-icon-wrapper">
                  <GraduationCap className="flow-icon" />
                </div>
                <h3 className="flow-column-title">Professores</h3>
                <p className="flow-column-text">inscrevem e gerenciam equipes</p>
              </div>
              <div className="flow-column">
                <div className="flow-icon-wrapper">
                  <Users className="flow-icon" />
                </div>
                <h3 className="flow-column-title">Equipes</h3>
                <p className="flow-column-text">realizam entregas e ganham badges</p>
              </div>
              <div className="flow-column">
                <div className="flow-icon-wrapper">
                  <School className="flow-icon" />
                </div>
                <h3 className="flow-column-title">Escolas</h3>
                <p className="flow-column-text">acumulam troféus baseados no desempenho coletivo</p>
              </div>
              <div className="flow-column">
                <div className="flow-icon-wrapper">
                  <BarChart3 className="flow-icon" />
                </div>
                <h3 className="flow-column-title">Todo mundo</h3>
                <p className="flow-column-text">acompanha progresso em tempo real</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="modelos-badges" className="models-section">
          <div className="container">
            <h2 className="section-title">Sistemas de Badges</h2>
            <div className="models-grid">
              <div className="model-box original">
                <div className="model-header">
                  <h3 className="model-title">Badges de Participação</h3>
                  <span className="model-badge-count">19 badges</span>
                </div>
                <p className="model-description">
                  Sistema de gamificação focado em reconhecimento de participação e conquistas ao longo do programa.
                </p>
                <ul className="model-features">
                  <li><CheckCircle2 size={16} /> Badges de participação (workshops, plantões)</li>
                  <li><CheckCircle2 size={16} /> Badges de entrega (fases concluídas)</li>
                  <li><CheckCircle2 size={16} /> Badges de conquista (finalistas, diversidade)</li>
                  <li><CheckCircle2 size={16} /> Visual azul quando conquistado</li>
                  <li><CheckCircle2 size={16} /> Sempre visíveis no sistema</li>
                </ul>
                <div className="model-visual">
                  <div className="badge-example earned">
                    <Award className="badge-example-icon" size={32} />
                    <div className="badge-example-name">Badge Conquistado</div>
                  </div>
                  <div className="badge-example locked">
                    <Award className="badge-example-icon" size={32} />
                    <div className="badge-example-name">Badge Não Conquistado</div>
                  </div>
                </div>
              </div>
              
              <div className="model-box pedagogical">
                <div className="model-header">
                  <h3 className="model-title">Badges por Competências</h3>
                  <span className="model-badge-count">Sistema pedagógico</span>
                </div>
                <p className="model-description">
                  Sistema baseado em competências, com critérios claros de avaliação e níveis de desempenho.
                </p>
                <ul className="model-features">
                  <li><CheckCircle2 size={16} /> Baseados em competências específicas</li>
                  <li><CheckCircle2 size={16} /> Critérios de mínimo e excelência</li>
                  <li><CheckCircle2 size={16} /> Níveis básico e avançado</li>
                  <li><CheckCircle2 size={16} /> Visual verde (básico) ou roxo (avançado)</li>
                  <li><CheckCircle2 size={16} /> Clique para ver detalhes completos</li>
                </ul>
                <div className="model-toggle-info">
                  <p className="toggle-hint">
                    Use o toggle <strong>"Badges Pedagógicos"</strong> no menu de navegação para ativar/desativar estes badges
                  </p>
                </div>
                <div className="model-visual">
                  <div className="badge-example pedagogical-basic">
                    <BookOpen className="badge-example-icon" size={32} />
                    <div className="badge-example-name">Badge Básico</div>
                  </div>
                  <div className="badge-example pedagogical-advanced">
                    <Star className="badge-example-icon" size={32} />
                    <div className="badge-example-name">Badge Avançado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="paginas-sistema" className="pages-section">
          <h2 className="section-title">Seções do Sistema</h2>
          <div className="pages-grid">
                <div className="page-item">
                  <Link to="/timeline" className="page-link">
                    <h2 className="page-title">Informações<br />Gerais</h2>
                    <p className="page-description">
                      Página de apresentação do programa mostrando todas as fases, prazos e o que está em jogo em cada etapa.
                    </p>
                <ul className="page-features">
                  <li>6 fases detalhadas com datas</li>
                  <li>Badges e troféus por fase</li>
                  <li>Recompensas e prêmios</li>
                  <li>CTA para professores</li>
                </ul>
              </Link>
            </div>
            
            <div className="page-item">
              <Link to="/teacher" className="page-link">
                <h2 className="page-title">Dashboard do Professor</h2>
                <p className="page-description">
                  Painel completo onde o professor gerencia todas suas equipes, vê progresso e recebe notificações.
                </p>
                <ul className="page-features">
                  <li>Gestão de múltiplas equipes</li>
                  <li>Progresso individualizado</li>
                  <li>Notificações e alertas</li>
                  <li>Ações rápidas</li>
                </ul>
              </Link>
            </div>
            
            <div className="page-item">
              <Link to="/team" className="page-link">
                <h2 className="page-title">Dashboard da<br />Equipe</h2>
                <p className="page-description">
                  Visão que os estudantes têm: seus badges conquistados, progresso da jornada e vitrine pública.
                </p>
                <ul className="page-features">
                  <li>19 badges organizados por fase</li>
                  <li>Barra de progresso visual</li>
                  <li>Badges ganhos vs. futuros</li>
                  <li>Vitrine de destaques</li>
                </ul>
              </Link>
            </div>
            
            <div className="page-item">
              <Link to="/school" className="page-link">
                <h2 className="page-title">Dashboard da<br />Escola</h2>
                <p className="page-description">
                  Painel institucional mostrando troféus conquistados, ranking estadual e estatísticas da escola.
                </p>
                <ul className="page-features">
                  <li>8 troféus escolares</li>
                  <li>Ranking estadual competitivo</li>
                  <li>Estatísticas agregadas</li>
                  <li>Critérios objetivos</li>
                </ul>
              </Link>
            </div>
          </div>
        </section>
        
        <section id="informacoes" className="info-section">
          <div className="container">
            <h2 className="section-title">Informações</h2>
            <div className="info-grid">
              <div className="info-box">
                <h3 className="info-title">Como usar este protótipo</h3>
                <ol className="info-list">
                  <li>Comece pela <strong>Timeline Pública</strong> para entender a jornada completa</li>
                  <li>Veja o <strong>Dashboard do Professor</strong> para entender a gestão de múltiplas equipes</li>
                  <li>Explore o <strong>Dashboard da Equipe</strong> para ver a experiência dos estudantes</li>
                  <li>Acesse o <strong>Dashboard da Escola</strong> para visualizar reconhecimento institucional</li>
                  <li>Use o toggle <strong>"Badges Pedagógicos"</strong> para alternar entre os dois modelos</li>
                </ol>
              </div>
              
              <div className="info-box warning">
                <h3 className="info-title">Observações Técnicas</h3>
                <p className="info-text">
                  Todas as verificações são automáticas (submissões, timestamps, presença). Professores são o ponto focal de comunicação. Estudantes são alocados pelos professores. Badge "Equipe Diversa" requer atenção à privacidade. Sistema sem processo de apelação manual.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  )
}

export default Home
