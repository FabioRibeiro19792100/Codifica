// Estrutura de dados centralizada para o sistema de gamificação
// Este arquivo pode ser editado diretamente ou através da interface admin

export const gamificationData = {
  phases: [
    {
      id: 1,
      number: 1,
      title: "Inscrições e Ativação",
      subtitle: "Semana 1-2",
      dateRange: "15 a 28 de Fevereiro",
      icon: "FileText",
      activities: [
        "Monte equipes de 3-5 estudantes cada",
        "Cadastre-se como professor orientador",
        "Aloque seus alunos nas equipes",
        "Preencha o formulário de inscrição por equipe",
        "Receba acesso à plataforma de acompanhamento",
        "Você pode orientar múltiplas equipes!"
      ],
      badges: [
        { id: 1, name: "Equipe Ativada", icon: "CheckCircle2", description: "Equipe registrada com professor e estudantes" },
        { id: 2, name: "Equipe Diversa", icon: "Users", description: "Equipe com estudantes de 2+ gêneros diferentes" },
        { id: 3, name: "Professor Multi-time", icon: "GraduationCap", description: "Professor orientando 2+ equipes" }
      ],
      trophies: [
        { name: "Escola Mobilizadora", criteria: "5+ equipes inscritas e ativadas" }
      ],
      rewards: "Acesso à lista oficial + Sessões exclusivas"
    },
    {
      id: 2,
      number: 2,
      title: "Módulo Básico - Ideação",
      subtitle: "Semana 3-5",
      dateRange: "1 a 21 de Março",
      icon: "Lightbulb",
      // NOVO: Competências desenvolvidas nesta fase
      competencies: [
        {
          name: "Pensamento Crítico",
          description: "Como identificar problemas autênticos e do mundo real que são importantes para as comunidades",
          evidence: "Justificativa clara do problema com pesquisa e contexto de apoio"
        },
        {
          name: "Empatia e Contexto",
          description: "Compreender a perspectiva, as necessidades e a experiência vivida do usuário",
          evidence: "Clareza na definição do público-alvo e seus desafios específicos"
        },
        {
          name: "Colaboração Inicial",
          description: "Trabalhar eficazmente em grupos com diversas perspectivas e habilidades",
          evidence: "Estrutura de equipe organizada com papéis claros e padrões de comunicação"
        }
      ],
      activities: [
        "Workshop de Ideação - 5 de Março (online)",
        "Você orienta suas equipes a identificar problemas climáticos",
        "Suas equipes desenvolvem soluções inovadoras",
        "Acompanhe se o projeto demonstrou estimular competências climáticas",
        "Plantão de Dúvidas - 12 e 19 de Março",
        "Entrega pelas equipes: 21 de Março, 23h59"
      ],
      badges: [
        // Badges originais (sempre visíveis - estilo original mantido)
        { 
          id: 4, 
          name: "Workshop Ideação", 
          icon: "Calendar", 
          description: "Participação na oficina de ideação"
        },
        { 
          id: 5, 
          name: "Plantão Ativo", 
          icon: "MessageSquare", 
          description: "Presença confirmada no plantão de dúvidas"
        },
        { 
          id: 6, 
          name: "Ideação Concluída", 
          icon: "Lightbulb", 
          description: "Entrega da fase de Ideação registrada"
        },
        { 
          id: 7, 
          name: "Climate Skills OK Ideação", 
          icon: "Leaf", 
          description: "Campo Climate Skills preenchido na entrega"
        },
        // Badges pedagógicos NOVOS (só aparecem com toggle ligado)
        { 
          id: 100, 
          name: "Problema Bem Definido", 
          icon: "Lightbulb", 
          description: "Demonstra articulação clara do problema",
          isPedagogical: true,
          competency: "Pensamento Crítico",
          level: "basic",
          criteria: {
            minimum: [
              "Problema real descrito com clareza",
              "Público-alvo claramente identificado",
              "Contexto básico fornecido"
            ],
            excellence: [
              "Evidência de pesquisa que apoia a existência do problema",
              "Articulação clara do impacto se o problema permanecer sem solução",
              "Compreensão nuances dos stakeholders afetados"
            ]
          }
        },
        { 
          id: 101, 
          name: "Ideia Propósito", 
          icon: "Target", 
          description: "Reflete conexão significativa com as necessidades do usuário",
          isPedagogical: true,
          competency: "Empatia e Contexto",
          level: "basic",
          criteria: {
            minimum: [
              "Conexão básica estabelecida entre ideia e necessidade do usuário"
            ],
            excellence: [
              "Análise profunda das necessidades do usuário",
              "Evidência de pesquisa com usuários reais",
              "Solução demonstra compreensão genuína do contexto"
            ]
          }
        }
      ],
      trophies: [
        { name: "Escola Persistente", criteria: "80%+ das equipes entregam" }
      ],
      rewards: "Mural público + Prioridade em plantões + Microfeedback"
    },
    {
      id: 3,
      number: 3,
      title: "Módulo Avançado - Prototipagem",
      subtitle: "Semana 6-9",
      dateRange: "24 de Março a 18 de Abril",
      icon: "Wrench",
      // NOVO: Competências desenvolvidas nesta fase
      competencies: [
        {
          name: "Pensamento Computacional",
          description: "Estruturar soluções através de sequenciamento lógico e pensamento algorítmico",
          evidence: "Diagramas de fluxo de trabalho claros, protótipos lógicos ou estruturas de código funcionais"
        },
        {
          name: "Iteração",
          description: "Testar premissas, coletar feedback e aprimorar designs sistematicamente",
          evidence: "Múltiplas versões de protótipos mostrando refinamento progressivo"
        },
        {
          name: "Autonomia",
          description: "Resolver problemas técnicos de forma independente e tomar decisões informadas",
          evidence: "Decisões técnicas documentadas com raciocínio claro e compensações"
        }
      ],
      activities: [
        "Workshop de Prototipagem - 26 de Março",
        "Suas equipes criam protótipos funcionais",
        "Você orienta testes com usuários reais",
        "Acompanhe a documentação do processo",
        "Plantão de Dúvidas - 2 e 9 de Abril",
        "Entrega pelas equipes: 18 de Abril, 23h59"
      ],
      badges: [
        // Badges originais (sempre visíveis - estilo original mantido)
        { 
          id: 8, 
          name: "Workshop Prototipagem", 
          icon: "Calendar", 
          description: "Participação na oficina de prototipagem"
        },
        { 
          id: 9, 
          name: "Plantão Ativo", 
          icon: "MessageSquare", 
          description: "Presença confirmada no plantão"
        },
        { 
          id: 10, 
          name: "Protótipo Concluído", 
          icon: "Wrench", 
          description: "Entrega do protótipo registrada"
        },
        { 
          id: 11, 
          name: "Climate Skills OK Protótipo", 
          icon: "Leaf", 
          description: "Campo Climate Skills preenchido na entrega"
        },
        // Badges pedagógicos NOVOS (só aparecem com toggle ligado)
        { 
          id: 102, 
          name: "Protótipo Funcional", 
          icon: "Wrench", 
          description: "Demonstra um produto mínimo viável funcionando",
          isPedagogical: true,
          competency: "Pensamento Computacional",
          level: "basic",
          criteria: {
            minimum: [
              "Protótipo funcional entregue",
              "Demonstração básica de funcionamento"
            ],
            excellence: [
              "Protótipo totalmente funcional com todas as features principais",
              "Documentação clara do funcionamento",
              "Testes básicos realizados"
            ]
          }
        },
        { 
          id: 103, 
          name: "Iteração Inteligente", 
          icon: "RotateCw", 
          description: "Mostra refinamento cuidadoso baseado em testes",
          isPedagogical: true,
          competency: "Iteração",
          level: "advanced",
          criteria: {
            minimum: [
              "Protótipo ajustado com base no feedback recebido em testes ou de colegas"
            ],
            excellence: [
              "Documentação clara do que mudou, por que mudou e o que foi aprendido durante o processo de iteração",
              "Múltiplas versões documentadas",
              "Evidência de aprendizado com cada iteração"
            ]
          }
        },
        { 
          id: 104, 
          name: "Autonomia Técnica", 
          icon: "Zap", 
          description: "Reflete capacidade de resolução independente de problemas",
          isPedagogical: true,
          competency: "Autonomia",
          level: "advanced",
          criteria: {
            minimum: [
              "Resolveu problemas técnicos sem ajuda constante"
            ],
            excellence: [
              "Decisões técnicas documentadas com raciocínio claro e compensações",
              "Demonstrou capacidade de pesquisar e aplicar soluções",
              "Tomou decisões informadas sobre trade-offs técnicos"
            ]
          }
        }
      ],
      trophies: [
        { name: "Escola Inovadora", criteria: "3+ equipes na final" },
        { name: "Climate Champion", criteria: "100% de alinhamento climático" }
      ],
      rewards: "Mural de Protótipos + Plantão VIP + Revisão de Demo"
    },
    {
      id: 4,
      number: 4,
      title: "Fase Final - Apresentação",
      subtitle: "Semana 10-11",
      dateRange: "21 de Abril a 2 de Maio",
      icon: "Mic",
      activities: [
        "Workshop de Pitch - 23 de Abril",
        "Suas equipes gravam vídeos pitch de 3 minutos",
        "Você auxilia na narrativa de impacto",
        "Revisão dos protótipos funcionando",
        "Envio do Pitch: 28 de Abril, 23h59",
        "Anúncio dos 10 Finalistas: 30 de Abril"
      ],
      // NOVO: Competências desenvolvidas nesta fase
      competencies: [
        {
          name: "Comunicação",
          description: "Articular ideias complexas de forma clara para diversas audiências",
          evidence: "Clareza e coerência na apresentação do pitch e materiais de apoio"
        },
        {
          name: "Argumentação",
          description: "Defender decisões de design com raciocínio lógico e evidências",
          evidence: "Coerência lógica conectando problema, solução e impacto"
        },
        {
          name: "Síntese",
          description: "Priorizar informações e criar narrativas focadas",
          evidence: "Pitch conciso e objetivo que comunica valor essencial"
        }
      ],
      badges: [
        // Badges originais
        { 
          id: 14, 
          name: "Workshop Pitch", 
          icon: "Theater", 
          description: "Participação no workshop de pitch"
        },
        { 
          id: 15, 
          name: "Pitch Enviado", 
          icon: "Video", 
          description: "Vídeo pitch enviado com sucesso"
        },
        { 
          id: 16, 
          name: "Finalista de Banca", 
          icon: "Award", 
          description: "Equipe selecionada entre os 10 finalistas"
        },
        // Badges pedagógicos
        { 
          id: 17, 
          name: "Climate Skills OK Pitch", 
          icon: "Leaf", 
          description: "Campo Climate Skills preenchido na entrega"
        },
        // Badges pedagógicos NOVOS (só aparecem com toggle ligado)
        { 
          id: 105, 
          name: "Pitch Claro", 
          icon: "Video", 
          description: "Demonstra comunicação eficaz de valor",
          isPedagogical: true,
          competency: "Comunicação",
          level: "basic",
          criteria: {
            minimum: [
              "A mensagem é compreensível e pode ser entregue em até 3 minutos com fluxo lógico"
            ],
            excellence: [
              "Narrativa envolvente combinada com dados de suporte e comunicação visual clara",
              "Pitch cativa públicos diversos",
              "Mensagem memorável e impactante"
            ]
          }
        },
        { 
          id: 106, 
          name: "Síntese Poderosa", 
          icon: "Scissors", 
          description: "Mostra habilidade de destilar complexidade",
          isPedagogical: true,
          competency: "Síntese",
          level: "advanced",
          criteria: {
            minimum: [
              "Pitch focado nos pontos essenciais"
            ],
            excellence: [
              "Consegue comunicar valor essencial de forma concisa",
              "Prioriza informações de forma estratégica",
              "Narrativa focada e impactante"
            ]
          }
        },
        { 
          id: 107, 
          name: "Proposta Convincente", 
          icon: "MessageSquare", 
          description: "Reflete argumentação persuasiva",
          isPedagogical: true,
          competency: "Argumentação",
          level: "advanced",
          criteria: {
            minimum: [
              "Argumentação básica apresentada"
            ],
            excellence: [
              "Coerência lógica conectando problema, solução e impacto",
              "Evidências sólidas que apoiam as decisões",
              "Argumentação convincente e bem estruturada"
            ]
          }
        }
      ],
      trophies: [
        { name: "Escola Finalista", criteria: "1+ equipe entre os 10 finalistas" }
      ],
      rewards: "Galeria pública + Destaques editoriais + Oficina VIP"
    },
    {
      id: 5,
      number: 5,
      title: "Impacto e Contexto",
      subtitle: "Reflexão sobre Impacto",
      dateRange: "Entre Pitch e Banca",
      icon: "Globe",
      // NOVO: Competências desenvolvidas nesta fase
      competencies: [
        {
          name: "Responsabilidade Social",
          description: "Pensar criticamente sobre o impacto em comunidades e partes interessadas",
          evidence: "Análise cuidadosa do contexto e das implicações no mundo real"
        },
        {
          name: "Ética e Sustentabilidade",
          description: "Considerar consequências, compensações e efeitos a longo prazo",
          evidence: "Justificativa crítica abordando riscos e benefícios potenciais"
        },
        {
          name: "Visão Sistêmica",
          description: "Pensar além do produto para ecossistemas mais amplos",
          evidence: "Conexões claras entre a solução e os sistemas do mundo real"
        }
      ],
      activities: [
        "Reflexão sobre impacto social do projeto",
        "Análise de implicações éticas",
        "Consideração de efeitos a longo prazo",
        "Avaliação de impacto em comunidades"
      ],
      badges: [
        { 
          id: 111, 
          name: "Impacto Relevante", 
          icon: "Heart", 
          description: "Demonstra contribuição social significativa",
          isPedagogical: true,
          competency: "Responsabilidade Social",
          level: "basic",
          criteria: {
            minimum: [
              "Relação clara estabelecida entre o projeto e um problema social identificado"
            ],
            excellence: [
              "Análise abrangente do potencial impacto positivo juntamente com uma avaliação honesta de possíveis riscos ou limitações",
              "Consideração de stakeholders afetados",
              "Plano de impacto bem estruturado"
            ]
          }
        },
        { 
          id: 112, 
          name: "Consciência Sistêmica", 
          icon: "Network", 
          description: "Mostra compreensão de implicações mais amplas",
          isPedagogical: true,
          competency: "Visão Sistêmica",
          level: "advanced",
          criteria: {
            minimum: [
              "Reconhece conexões básicas com sistemas maiores"
            ],
            excellence: [
              "Conexões claras entre a solução e os sistemas do mundo real",
              "Compreende efeitos em cascata",
              "Pensa em ecossistemas completos"
            ]
          }
        },
        { 
          id: 113, 
          name: "Tecnologia Responsável", 
          icon: "Shield", 
          description: "Reflete consideração ética e visão futura",
          isPedagogical: true,
          competency: "Ética e Sustentabilidade",
          level: "advanced",
          criteria: {
            minimum: [
              "Consideração básica de aspectos éticos"
            ],
            excellence: [
              "Justificativa crítica abordando riscos e benefícios potenciais",
              "Análise de consequências a longo prazo",
              "Consideração de sustentabilidade"
            ]
          }
        }
      ],
      trophies: [],
      rewards: "Reconhecimento de impacto + Destaque em materiais educativos"
    },
    {
      id: 6,
      number: 6,
      title: "Banca Final e Legado",
      subtitle: "Semana 12",
      dateRange: "5 a 9 de Maio",
      icon: "Trophy",
      activities: [
        "Banca Presencial: 5 de Maio em São Paulo",
        "10 equipes finalistas apresentam ao vivo",
        "Demonstração dos protótipos",
        "Perguntas da banca especializada",
        "Cerimônia de Premiação: 9 de Maio",
        "Anúncio das 3 equipes vencedoras"
      ],
      // NOVO: Competências desenvolvidas nesta fase
      competencies: [
        {
          name: "Metacognição",
          description: "Refletir criticamente sobre seu processo e crescimento",
          evidence: "Autoavaliação ponderada de pontos fortes e áreas de melhoria"
        },
        {
          name: "Liderança",
          description: "Influenciar outros e colaborar em níveis mais altos",
          evidence: "Participação ativa em painéis de avaliação e mentoria de pares"
        },
        {
          name: "Visão de Futuro",
          description: "Identificar habilidades transferíveis para crescimento contínuo",
          evidence: "Articulação clara dos próximos passos e metas de aprendizado contínuo"
        }
      ],
      badges: [
        // Badges originais (sempre visíveis - estilo original mantido)
        { 
          id: 21, 
          name: "Apresentou em Banca", 
          icon: "Target", 
          description: "Equipe apresentou na banca final"
        },
        { 
          id: 22, 
          name: "Trabalho em Equipe", 
          icon: "Handshake", 
          description: "Demonstrou excelente colaboração"
        },
        { 
          id: 23, 
          name: "Professores-Líderes", 
          icon: "GraduationCap", 
          description: "Professor destacado como líder"
        },
        { 
          id: 24, 
          name: "Global Change Makers", 
          icon: "Globe", 
          description: "Equipe reconhecida como agente de mudança global"
        },
        // Badges pedagógicos NOVOS (só aparecem com toggle ligado)
        { 
          id: 108, 
          name: "Projeto de Legado", 
          icon: "Star", 
          description: "Demonstra contribuição e aprendizado duradouros",
          isPedagogical: true,
          competency: "Visão de Futuro",
          level: "advanced",
          criteria: {
            minimum: [
              "Projeto concluído com sucesso"
            ],
            excellence: [
              "Contribuição duradoura identificada",
              "Aprendizado transferível articulado",
              "Impacto que vai além do projeto"
            ]
          }
        },
        { 
          id: 109, 
          name: "Aprendiz Consciente", 
          icon: "BookOpen", 
          description: "Demonstra profunda autoconsciência e reflexão",
          isPedagogical: true,
          competency: "Metacognição",
          level: "advanced",
          criteria: {
            minimum: [
              "Reflexão básica sobre o processo"
            ],
            excellence: [
              "Autoavaliação ponderada de pontos fortes e áreas de melhoria",
              "Reflexão crítica profunda",
              "Insights valiosos sobre o próprio aprendizado"
            ]
          }
        },
        { 
          id: 110, 
          name: "Protagonismo Digital", 
          icon: "Rocket", 
          description: "Reflete agência e mentalidade preparada para o futuro",
          isPedagogical: true,
          competency: "Visão de Futuro",
          level: "advanced",
          criteria: {
            minimum: [
              "Identificou habilidades desenvolvidas"
            ],
            excellence: [
              "Articulação clara dos próximos passos e metas de aprendizado contínuo",
              "Plano de desenvolvimento futuro",
              "Mentalidade de crescimento demonstrada"
            ]
          }
        }
      ],
      trophies: [
        { name: "Escola Impacto Real", criteria: "Média 50+ pessoas testando protótipos" },
        { name: "Escola Transformadora", criteria: "Conquistar todos os troféus" }
      ],
      rewards: "Prêmio TBD + Mentoria + Podcast oficial + Troféu físico"
    }
  ],
  allTrophies: [
    { id: 1, name: "Escola Mobilizadora", description: "Escola com alto engajamento e participação massiva no programa", criteria: "5+ equipes inscritas e ativadas", icon: "Trophy" },
    { id: 2, name: "Escola Persistente", description: "Demonstrou consistência e comprometimento ao longo da jornada", criteria: "80%+ das equipes concluíram a Ideação", icon: "Heart" },
    { id: 3, name: "Escola Inovadora", description: "Destaque em criatividade e desenvolvimento de soluções transformadoras", criteria: "3+ equipes chegaram à fase final", icon: "Zap" },
    { id: 4, name: "Climate Champion", description: "Compromisso exemplar com as competências climáticas em todas as entregas", criteria: "100% das equipes com alinhamento climático", icon: "Globe" },
    { id: 5, name: "Escola Inclusiva", description: "Liderança em diversidade e representatividade nas equipes", criteria: "70%+ das equipes são diversas", icon: "Users" },
    { id: 6, name: "Escola Finalista", description: "Excelência reconhecida com equipes na banca final do programa", criteria: "Pelo menos 1 equipe na banca final", icon: "Crown" },
    { id: 7, name: "Escola Impacto Real", description: "Soluções validadas com teste de usuários e evidências concretas", criteria: "Média de 50+ pessoas testando protótipos", icon: "Target" },
    { id: 8, name: "Escola Transformadora", description: "Conquista máxima do programa", criteria: "Conquistar todos os troféus", icon: "Star" }
  ]
}

// Função para salvar dados no localStorage
export const saveGamificationData = (data) => {
  try {
    localStorage.setItem('gamificationData', JSON.stringify(data))
    // Dispara evento customizado para atualizar todas as páginas (mesma aba)
    // O evento 'storage' só dispara em outras abas, não na mesma aba
    window.dispatchEvent(new CustomEvent('gamificationDataChanged', { 
      detail: data,
      bubbles: true,
      cancelable: true
    }))
  } catch (error) {
    console.error('Erro ao salvar dados no localStorage:', error)
  }
}

// Função para carregar dados do localStorage ou usar dados padrão
export const loadGamificationData = () => {
  try {
    const savedData = localStorage.getItem('gamificationData')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      // Verifica se os dados salvos têm a estrutura correta
      if (parsed && parsed.phases && Array.isArray(parsed.phases) && parsed.allTrophies && Array.isArray(parsed.allTrophies)) {
        return parsed
      } else {
        // Se a estrutura estiver incompleta, limpa e retorna padrão
        console.warn('Dados no localStorage com estrutura incompleta, usando dados padrão')
        localStorage.removeItem('gamificationData')
        return gamificationData
      }
    }
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:', error)
    // Remove dados corrompidos
    localStorage.removeItem('gamificationData')
  }
  // Se não houver dados salvos ou houver erro, retorna os dados padrão
  return gamificationData
}
