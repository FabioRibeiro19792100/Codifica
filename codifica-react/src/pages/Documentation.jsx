import { FileText, Users, Award, Trophy, Target, CheckCircle2, Lightbulb, Rocket, BookOpen, GraduationCap, School, Globe, Heart, Sparkles, FileDown, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import Footer from '../components/Footer'
import './Documentation.css'

function Documentation() {
  const [expandedPdfs, setExpandedPdfs] = useState({
    relatorioFinal: false,
    relatorioTecnico: false
  })

  const togglePdf = (pdfKey) => {
    setExpandedPdfs(prev => ({
      ...prev,
      [pdfKey]: !prev[pdfKey]
    }))
  }
  return (
    <div className="documentation-page">
      <div className="container">
        <header className="doc-header">
          <h1>documentação executiva</h1>
          <p className="doc-subtitle">Sistema de Gamificação Codifica+2026</p>
        </header>

        <section className="doc-section intro-section">
          <div className="intro-content">
            <h2>O que é o Codifica+?</h2>
            <p className="lead-text">
              O <strong>Codifica+</strong> é um percurso de pensamento computacional voltado a estudantes do Ensino Médio. É uma iniciativa do British Council que combina conteúdos conceituais, experimentação prática e atividades guiadas para desenvolver competências em computação, programação e resolução de problemas reais.
            </p>
            
            <div className="program-features">
              <div className="feature-item">
                <Rocket size={24} />
                <div>
                  <h3>Estrutura do Programa</h3>
                  <p>O programa acontece ao longo de 17 semanas, em cinco etapas que unem estudo, prática e acompanhamento com plantões de dúvidas. Professores e estudantes trabalham juntos em desafios aplicados, combinando formação, prática e projetos autorais.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <Target size={24} />
                <div>
                  <h3>Compromissos Fundamentais</h3>
                  <p>Todas as soluções desenvolvidas no programa precisam refletir compromisso com <strong>diversidade, equidade, acessibilidade e responsabilidade climática</strong>.</p>
                </div>
              </div>
            </div>

            <div className="adaptations-2026">
              <h3>Adaptações do Codifica+ para 2026</h3>
              
              <div className="adaptation-card">
                <h4>Climate Skills como eixo formativo</h4>
                <p>Conectando tecnologia, sustentabilidade e inovação social (mudanças climáticas, economia verde, transição energética, uso responsável de dados).</p>
              </div>
              
              <div className="adaptation-card">
                <h4>Língua inglesa como dimensão complementar</h4>
                <p>Trilha adicional para ampliar competências em contextos internacionais e vocabulário técnico STEM.</p>
              </div>
              
              <div className="adaptation-card">
                <h4>Formato integrado</h4>
                <p>Jornada que combina formação, prática e projetos autorais. Professores e estudantes trabalham juntos em desafios aplicados.</p>
              </div>
            </div>

            <div className="gamification-intro">
              <h3>Sobre este Sistema de Gamificação</h3>
              <p>
                Este sistema de gamificação foi criado especificamente para o <strong>Codifica+2026</strong>, com o objetivo de engajar professores, estudantes e escolas através de reconhecimentos visuais e objetivos ao longo de toda a jornada. O protótipo demonstra como badges, troféus e competências serão apresentados e conquistados, criando uma experiência motivadora e transparente para todos os participantes.
              </p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Objetivos do Sistema</h2>
          <div className="objectives-grid">
            <div className="objective-card">
              <Target size={32} />
              <h3>Engajamento</h3>
              <p>Motivar estudantes e professores através de reconhecimentos visuais e objetivos</p>
            </div>
            <div className="objective-card">
              <CheckCircle2 size={32} />
              <h3>Transparência</h3>
              <p>Deixar claro quais são os critérios para conquistar cada badge e troféu</p>
            </div>
            <div className="objective-card">
              <Rocket size={32} />
              <h3>Progresso</h3>
              <p>Visualizar o avanço das equipes e escolas ao longo das 6 fases do programa</p>
            </div>
            <div className="objective-card">
              <Heart size={32} />
              <h3>Reconhecimento</h3>
              <p>Celebrar conquistas individuais das equipes e coletivas das escolas</p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Público-Alvo</h2>
          
          <div className="audience-card">
            <div className="audience-icon">
              <GraduationCap size={40} />
            </div>
            <div className="audience-content">
              <h3>Professores</h3>
              <p><strong>Papel:</strong> Orientadores e gestores das equipes</p>
              <p><strong>Funcionalidades:</strong> Gerenciam múltiplas equipes, recebem comunicações oficiais, acompanham progresso detalhado de cada equipe, visualizam badges conquistados e pendentes</p>
              <p><strong>Benefício:</strong> Visão consolidada de todas as equipes que orientam, facilitando o acompanhamento e suporte</p>
            </div>
          </div>

          <div className="audience-card">
            <div className="audience-icon">
              <Users size={40} />
            </div>
            <div className="audience-content">
              <h3>Estudantes (Equipes)</h3>
              <p><strong>Papel:</strong> Participantes ativos do programa</p>
              <p><strong>Funcionalidades:</strong> Visualizam badges conquistados, acompanham progresso da jornada, veem competências desenvolvidas, acessam vitrine pública de conquistas</p>
              <p><strong>Benefício:</strong> Motivação através de reconhecimento visual imediato e clareza sobre próximos passos</p>
            </div>
          </div>

          <div className="audience-card">
            <div className="audience-icon">
              <School size={40} />
            </div>
            <div className="audience-content">
              <h3>Escolas</h3>
              <p><strong>Papel:</strong> Instituições que abrigam as equipes</p>
              <p><strong>Funcionalidades:</strong> Visualizam troféus conquistados, acompanham ranking estadual, veem estatísticas agregadas de todas as equipes da escola</p>
              <p><strong>Benefício:</strong> Reconhecimento institucional e visibilidade do engajamento coletivo da escola</p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Como Funciona o Sistema</h2>
          
          <div className="how-it-works">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Inscrição e Ativação</h3>
              <p>Professores inscrevem equipes de 3-5 estudantes. Cada equipe ativada recebe o primeiro badge automaticamente.</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Participação nas Fases</h3>
              <p>Ao longo de 6 fases, equipes participam de workshops, fazem entregas e desenvolvem competências. Badges são conquistados automaticamente quando critérios são atendidos.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Reconhecimento Visual</h3>
              <p>Badges conquistados aparecem em dourado nas dashboards. Equipes podem ver seu progresso e próximas conquistas possíveis.</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Trofeus Escolares</h3>
              <p>Escolas recebem troféus baseados no desempenho coletivo de suas equipes, criando um senso de comunidade e competição saudável.</p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Estrutura do Programa</h2>
          <p className="section-intro">O programa é dividido em 6 fases sequenciais, cada uma com objetivos específicos, competências a desenvolver e reconhecimentos disponíveis.</p>

          <div className="phase-doc-card">
            <div className="phase-doc-header">
              <span className="phase-doc-number">1</span>
              <div>
                <h3>Inscrições e Ativação</h3>
                <p className="phase-doc-dates">15 a 28 de Fevereiro (Semana 1-2)</p>
              </div>
            </div>
            <div className="phase-content">
              <p><strong>O que acontece:</strong> Professores formam equipes, cadastram estudantes e ativam participação no programa.</p>
              <p><strong>Badges disponíveis:</strong> Equipe Ativada, Equipe Diversa, Professor Multi-time</p>
              <p><strong>Troféu escolar:</strong> Escola Mobilizadora (5+ equipes inscritas)</p>
              <p><strong>Recompensas:</strong> Acesso à lista oficial e sessões exclusivas</p>
            </div>
          </div>

          <div className="phase-doc-card">
            <div className="phase-doc-header">
              <span className="phase-doc-number">2</span>
              <div>
                <h3>Módulo Básico - Ideação</h3>
                <p className="phase-doc-dates">1 a 21 de Março (Semana 3-5)</p>
              </div>
            </div>
            <div className="phase-content">
              <p><strong>O que acontece:</strong> Equipes identificam problemas climáticos reais e desenvolvem ideias de solução.</p>
              <p><strong>Competências desenvolvidas:</strong> Pensamento Crítico, Empatia e Contexto, Colaboração Inicial</p>
              <p><strong>Badges disponíveis:</strong> Workshop Ideação, Plantão Ativo, Ideação Concluída, Climate Skills OK</p>
              <p><strong>Badges pedagógicos:</strong> Problema Bem Definido, Ideia com Propósito</p>
              <p><strong>Troféu escolar:</strong> Escola Persistente (80%+ das equipes entregam)</p>
            </div>
          </div>

          <div className="phase-doc-card">
            <div className="phase-doc-header">
              <span className="phase-doc-number">3</span>
              <div>
                <h3>Módulo Avançado - Prototipagem</h3>
                <p className="phase-doc-dates">24 de Março a 18 de Abril (Semana 6-9)</p>
              </div>
            </div>
            <div className="phase-content">
              <p><strong>O que acontece:</strong> Equipes transformam ideias em protótipos funcionais, testando e iterando soluções.</p>
              <p><strong>Competências desenvolvidas:</strong> Pensamento Computacional, Iteração, Autonomia</p>
              <p><strong>Badges disponíveis:</strong> Workshop Prototipagem, Plantão Ativo, Protótipo Concluído, Climate Skills OK</p>
              <p><strong>Badges pedagógicos:</strong> Protótipo Funcional, Iteração Inteligente, Autonomia Técnica</p>
              <p><strong>Troféus escolares:</strong> Escola Inovadora, Climate Champion</p>
            </div>
          </div>

          <div className="phase-doc-card">
            <div className="phase-doc-header">
              <span className="phase-doc-number">4</span>
              <div>
                <h3>Fase Final - Apresentação</h3>
                <p className="phase-doc-dates">21 de Abril a 2 de Maio (Semana 10-11)</p>
              </div>
            </div>
            <div className="phase-content">
              <p><strong>O que acontece:</strong> Equipes preparam e enviam pitches de suas soluções. Finalistas são selecionados para a banca.</p>
              <p><strong>Competências desenvolvidas:</strong> Comunicação, Argumentação, Síntese</p>
              <p><strong>Badges disponíveis:</strong> Workshop Pitch, Pitch Enviado, Finalista de Banca, Climate Skills OK</p>
              <p><strong>Badges pedagógicos:</strong> Pitch Claro, Síntese Poderosa, Proposta Convincente</p>
              <p><strong>Troféu escolar:</strong> Escola Finalista (1+ equipe entre os 10 finalistas)</p>
            </div>
          </div>

          <div className="phase-doc-card">
            <div className="phase-doc-header">
              <span className="phase-doc-number">5</span>
              <div>
                <h3>Impacto e Contexto</h3>
                <p className="phase-doc-dates">Entre Pitch e Banca</p>
              </div>
            </div>
            <div className="phase-content">
              <p><strong>O que acontece:</strong> Equipes refletem sobre o impacto real de suas soluções e responsabilidade social.</p>
              <p><strong>Competências desenvolvidas:</strong> Responsabilidade Social, Ética e Sustentabilidade, Visão Sistêmica</p>
              <p><strong>Badges pedagógicos:</strong> Impacto Relevante, Consciência Sistêmica, Tecnologia Responsável</p>
            </div>
          </div>

          <div className="phase-doc-card">
            <div className="phase-doc-header">
              <span className="phase-doc-number">6</span>
              <div>
                <h3>Banca Final e Legado</h3>
                <p className="phase-doc-dates">5 a 9 de Maio (Semana 12)</p>
              </div>
            </div>
            <div className="phase-content">
              <p><strong>O que acontece:</strong> Finalistas apresentam projetos para banca avaliadora. Celebração de conquistas e legado do programa.</p>
              <p><strong>Competências desenvolvidas:</strong> Metacognição, Liderança, Visão de Futuro</p>
              <p><strong>Badges disponíveis:</strong> Apresentou em Banca, Trabalho em Equipe, Professores-Líderes, Global Change Makers, English Trail Champion</p>
              <p><strong>Badges pedagógicos:</strong> Projeto de Legado, Aprendiz Consciente, Protagonismo Digital</p>
              <p><strong>Troféus escolares:</strong> Escola Impacto Real, Escola Transformadora</p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Sistema de Reconhecimentos</h2>
          
          <div className="recognition-section">
            <h3>Badges Individuais (20 badges)</h3>
            <p>Reconhecimentos para equipes ao longo da jornada. Divididos em três categorias:</p>
            
            <div className="badge-category">
              <h4>Badges de Participação</h4>
              <p>Conquistados ao participar de workshops e plantões de dúvidas</p>
              <ul>
                <li>Workshop Ideação, Workshop Prototipagem, Workshop Pitch</li>
                <li>Plantão Ativo (em cada fase)</li>
              </ul>
            </div>

            <div className="badge-category">
              <h4>Badges de Entrega</h4>
              <p>Conquistados ao completar entregas de cada fase</p>
              <ul>
                <li>Ideiação Concluída, Protótipo Concluído, Pitch Enviado</li>
                <li>Climate Skills OK (em cada fase)</li>
              </ul>
            </div>

            <div className="badge-category">
              <h4>Badges de Conquista</h4>
              <p>Reconhecimentos especiais por marcos importantes</p>
              <ul>
                <li>Equipe Ativada, Equipe Diversa, Professor Multi-time</li>
                <li>Finalista de Banca, Apresentou em Banca</li>
                <li>Trabalho em Equipe, Professores-Líderes, Global Change Makers, English Trail Champion</li>
              </ul>
            </div>
          </div>

          <div className="recognition-section pedagogical-section">
            <h3>Badges por Competências (Sistema Pedagógico)</h3>
            <p>Novo sistema baseado em competências desenvolvidas, com critérios claros de avaliação:</p>
            
            <div className="pedagogical-info">
              <div className="pedagogical-feature">
                <BookOpen size={24} />
                <div>
                  <h4>Baseado em Competências</h4>
                  <p>Cada badge está vinculado a uma competência específica desenvolvida na fase</p>
                </div>
              </div>
              <div className="pedagogical-feature">
                <Target size={24} />
                <div>
                  <h4>Critérios Claros</h4>
                  <p>Definição de critérios mínimos e de excelência para cada badge</p>
                </div>
              </div>
              <div className="pedagogical-feature">
                <Sparkles size={24} />
                <div>
                  <h4>Níveis de Desempenho</h4>
                  <p>Badges básicos (verde) e avançados (roxo) para reconhecer diferentes níveis de proficiência</p>
                </div>
              </div>
            </div>
          </div>

          <div className="recognition-section">
            <h3>Trofeus Escolares (8 troféus)</h3>
            <p>Reconhecimentos institucionais baseados no desempenho coletivo das equipes da escola:</p>
            
            <div className="trophies-grid">
              <div className="trophy-doc-item">
                <Trophy size={24} />
                <h4>Escola Mobilizadora</h4>
                <p>5+ equipes inscritas e ativadas</p>
              </div>
              <div className="trophy-doc-item">
                <Award size={24} />
                <h4>Escola Persistente</h4>
                <p>80%+ das equipes concluíram a Ideação</p>
              </div>
              <div className="trophy-doc-item">
                <Award size={24} />
                <h4>Escola Inovadora</h4>
                <p>3+ equipes chegaram à fase final</p>
              </div>
              <div className="trophy-doc-item">
                <Award size={24} />
                <h4>Climate Champion</h4>
                <p>100% das equipes com alinhamento climático</p>
              </div>
              <div className="trophy-doc-item">
                <Users size={24} />
                <h4>Escola Inclusiva</h4>
                <p>70%+ das equipes são diversas</p>
              </div>
              <div className="trophy-doc-item">
                <Award size={24} />
                <h4>Escola Finalista</h4>
                <p>Pelo menos 1 equipe na banca final</p>
              </div>
              <div className="trophy-doc-item">
                <Award size={24} />
                <h4>Escola Impacto Real</h4>
                <p>Média de 50+ pessoas testando protótipos</p>
              </div>
              <div className="trophy-doc-item">
                <Award size={24} />
                <h4>Escola Transformadora</h4>
                <p>Conquistar todos os troféus</p>
              </div>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Dashboards Disponíveis</h2>
          <p className="section-intro">Cada público tem acesso a uma interface personalizada com informações relevantes para seu papel no programa.</p>

          <div className="dashboard-card">
            <div className="dashboard-header">
              <Globe size={32} />
              <h3>Timeline Pública</h3>
            </div>
            <p><strong>Acesso:</strong> Público (não requer login)</p>
            <p><strong>Conteúdo:</strong> Visão completa do programa com todas as 6 fases, badges disponíveis, troféus e competências desenvolvidas. Ideal para professores interessados em conhecer o programa antes de se inscrever.</p>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-header">
              <GraduationCap size={32} />
              <h3>Dashboard do Professor</h3>
            </div>
            <p><strong>Acesso:</strong> Área logada para professores</p>
            <p><strong>Funcionalidades principais:</strong></p>
            <ul>
              <li>Visualização de todas as equipes orientadas</li>
              <li>Progresso individualizado por equipe</li>
              <li>Badges conquistados e pendentes por equipe</li>
              <li>Notificações de prazos e ações necessárias</li>
              <li>Badge especial "Professor Multi-time" para quem orienta múltiplas equipes</li>
            </ul>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-header">
              <Users size={32} />
              <h3>Dashboard da Equipe</h3>
            </div>
            <p><strong>Acesso:</strong> Área logada para estudantes</p>
            <p><strong>Funcionalidades principais:</strong></p>
            <ul>
              <li>Visualização de todos os badges disponíveis</li>
              <li>Barra de progresso da jornada</li>
              <li>Badges conquistados destacados em dourado</li>
              <li>Sistema de badges pedagógicos (ativável via toggle)</li>
              <li>Vitrine pública de conquistas</li>
            </ul>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-header">
              <School size={32} />
              <h3>Dashboard da Escola</h3>
            </div>
            <p><strong>Acesso:</strong> Área logada para gestores escolares</p>
            <p><strong>Funcionalidades principais:</strong></p>
            <ul>
              <li>Trofeus conquistados pela escola</li>
              <li>Ranking estadual competitivo</li>
              <li>Estatísticas agregadas (número de equipes, taxa de conclusão)</li>
              <li>Critérios objetivos para cada troféu</li>
            </ul>
          </div>
        </section>

        <section className="doc-section">
          <h2>Características Importantes do Sistema</h2>
          
          <div className="feature-highlight">
            <h3>✅ Verificação Automática</h3>
            <p>Todos os badges são conquistados automaticamente quando os critérios são atendidos. Não há necessidade de processos manuais de verificação ou apelação.</p>
            <ul>
              <li>Submissões com timestamp automático</li>
              <li>Verificação de presença em workshops e plantões</li>
              <li>Validação de campos obrigatórios preenchidos</li>
            </ul>
          </div>

          <div className="feature-highlight">
            <h3>✅ Professores como Ponto Focal</h3>
            <p>Toda comunicação oficial do programa é direcionada aos professores, que são responsáveis por gerenciar inscrições, alocar estudantes e acompanhar o progresso das equipes.</p>
          </div>

          <div className="feature-highlight">
            <h3>✅ Transparência Total</h3>
            <p>Todos os critérios para conquistar badges e troféus são públicos e objetivos. Equipes e escolas sabem exatamente o que precisam fazer para serem reconhecidas.</p>
          </div>

          <div className="feature-highlight">
            <h3>✅ Sistema Dual de Badges</h3>
            <p>O sistema oferece duas perspectivas:</p>
            <ul>
              <li><strong>Badges de Participação:</strong> Sempre visíveis, focados em reconhecimento de engajamento</li>
              <li><strong>Badges Pedagógicos:</strong> Ativáveis via toggle, focados em competências desenvolvidas com critérios detalhados</li>
            </ul>
          </div>
        </section>

        <section className="doc-section">
          <h2>Benefícios do Sistema</h2>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <Lightbulb size={32} />
              <h3>Para Estudantes</h3>
              <ul>
                <li>Motivação através de reconhecimento visual imediato</li>
                <li>Clareza sobre objetivos e próximos passos</li>
                <li>Senso de conquista e progresso</li>
                <li>Desenvolvimento de competências com feedback claro</li>
              </ul>
            </div>

            <div className="benefit-card">
              <GraduationCap size={32} />
              <h3>Para Professores</h3>
              <ul>
                <li>Visão consolidada de múltiplas equipes</li>
                <li>Ferramenta de acompanhamento e suporte</li>
                <li>Identificação rápida de equipes que precisam de ajuda</li>
                <li>Reconhecimento por orientar múltiplas equipes</li>
              </ul>
            </div>

            <div className="benefit-card">
              <School size={32} />
              <h3>Para Escolas</h3>
              <ul>
                <li>Reconhecimento institucional</li>
                <li>Visibilidade do engajamento coletivo</li>
                <li>Competição saudável entre escolas</li>
                <li>Métricas objetivas de participação</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Próximos Passos</h2>
          
          <div className="next-steps">
            <div className="next-step-card">
              <div className="next-step-number">1</div>
              <h3>Validação com Stakeholders</h3>
              <p>Apresentar o protótipo para equipe interna e coletar feedback de professores piloto para ajustes finais.</p>
            </div>

            <div className="next-step-card">
              <div className="next-step-number">2</div>
              <h3>Desenvolvimento da Versão Final</h3>
              <p>Implementar integrações necessárias (sistema de presença, submissões, banco de dados) e automações de verificação.</p>
            </div>

            <div className="next-step-card">
              <div className="next-step-number">3</div>
              <h3>Comunicação e Onboarding</h3>
              <p>Criar materiais de apresentação, tutoriais e templates de comunicação para professores e escolas.</p>
            </div>

            <div className="next-step-card">
              <div className="next-step-number">4</div>
              <h3>Lançamento</h3>
              <p>Disponibilizar o sistema para inscrições e início do programa Codifica+2026.</p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Documentos de Referência</h2>
          <p className="section-intro">Abaixo estão disponíveis os relatórios completos do programa Codifica+ para consulta detalhada.</p>
          
          <div className="pdf-viewers">
            <div className="pdf-viewer-card">
              <div className="pdf-viewer-header">
                <FileText size={24} />
                <div>
                  <h3>Relatório Final Codifica+</h3>
                  <p>Apresentação executiva com os principais findings do programa</p>
                </div>
                <div className="pdf-header-actions">
                  <button
                    onClick={() => togglePdf('relatorioFinal')}
                    className="pdf-toggle-btn"
                    title={expandedPdfs.relatorioFinal ? "Reduzir" : "Expandir"}
                  >
                    {expandedPdfs.relatorioFinal ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <a 
                    href="/Relatorio_Final_Codifica.pdf" 
                    download 
                    className="pdf-download-btn"
                    title="Baixar PDF"
                  >
                    <FileDown size={20} />
                  </a>
                </div>
              </div>
              {expandedPdfs.relatorioFinal && (
                <div className="pdf-embed-container">
                  <iframe
                    src="/Relatorio_Final_Codifica.pdf#zoom=33"
                    title="Relatório Final Codifica+"
                    className="pdf-iframe"
                  />
                </div>
              )}
            </div>

            <div className="pdf-viewer-card">
              <div className="pdf-viewer-header">
                <FileText size={24} />
                <div>
                  <h3>Relatório Técnico Codifica+</h3>
                  <p>Documentação técnica detalhada do programa</p>
                </div>
                <div className="pdf-header-actions">
                  <button
                    onClick={() => togglePdf('relatorioTecnico')}
                    className="pdf-toggle-btn"
                    title={expandedPdfs.relatorioTecnico ? "Reduzir" : "Expandir"}
                  >
                    {expandedPdfs.relatorioTecnico ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <a 
                    href="/Relatorio_Tecnico_Codifica.pdf" 
                    download 
                    className="pdf-download-btn"
                    title="Baixar PDF"
                  >
                    <FileDown size={20} />
                  </a>
                </div>
              </div>
              {expandedPdfs.relatorioTecnico && (
                <div className="pdf-embed-container">
                  <iframe
                    src="/Relatorio_Tecnico_Codifica.pdf#zoom=110"
                    title="Relatório Técnico Codifica+"
                    className="pdf-iframe"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="doc-section final-section">
          <h2>Informações do Projeto</h2>
          <div className="project-info">
            <p><strong>Programa:</strong> Codifica+2026</p>
            <p><strong>Iniciativa:</strong> British Council</p>
            <p><strong>Versão do Protótipo:</strong> 1.0</p>
            <p><strong>Desenvolvido para:</strong> Mastertech</p>
            <p><strong>Data:</strong> Janeiro 2025</p>
            <p><strong>Status:</strong> Protótipo de Demonstração</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Documentation
