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
      activities: [
        "Workshop de Ideação - 5 de Março (online)",
        "Você orienta suas equipes a identificar problemas climáticos",
        "Suas equipes desenvolvem soluções inovadoras",
        "Acompanhe se o projeto demonstrou estimular competências climáticas",
        "Plantão de Dúvidas - 12 e 19 de Março",
        "Entrega pelas equipes: 21 de Março, 23h59"
      ],
      badges: [
        { id: 4, name: "Workshop Ideação", icon: "Calendar", description: "Participação na oficina de ideação" },
        { id: 5, name: "Plantão Ativo", icon: "MessageSquare", description: "Presença confirmada no plantão de dúvidas" },
        { id: 6, name: "Ideação Concluída", icon: "Lightbulb", description: "Entrega da fase de Ideação registrada" }
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
      activities: [
        "Workshop de Prototipagem - 26 de Março",
        "Suas equipes criam protótipos funcionais",
        "Você orienta testes com usuários reais",
        "Acompanhe a documentação do processo",
        "Plantão de Dúvidas - 2 e 9 de Abril",
        "Entrega pelas equipes: 18 de Abril, 23h59"
      ],
      badges: [
        { id: 8, name: "Workshop Prototipagem", icon: "Calendar", description: "Participação na oficina de prototipagem" },
        { id: 9, name: "Plantão Ativo", icon: "MessageSquare", description: "Presença confirmada no plantão" },
        { id: 10, name: "Protótipo Concluído", icon: "Wrench", description: "Entrega do protótipo registrada" }
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
      badges: [
        { id: 12, name: "Workshop Pitch", icon: "Theater", description: "Participação no workshop de pitch" },
        { id: 13, name: "Pitch Enviado", icon: "Video", description: "Vídeo pitch enviado com sucesso" },
        { id: 14, name: "Finalista de Banca", icon: "Award", description: "Equipe selecionada entre os 10 finalistas" }
      ],
      trophies: [
        { name: "Escola Finalista", criteria: "1+ equipe entre os 10 finalistas" }
      ],
      rewards: "Galeria pública + Destaques editoriais + Oficina VIP"
    },
    {
      id: 5,
      number: 5,
      title: "Banca Final e Premiação",
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
      badges: [
        { id: 16, name: "Top 3 na Banca", icon: "Target", description: "Equipe entre as 3 vencedoras da banca final" },
        { id: 17, name: "Trabalho em Equipe", icon: "Handshake", description: "Demonstrou excelente colaboração" },
        { id: 18, name: "Alinhamento Climático", icon: "Leaf", description: "Projeto demonstrou estimular competências climáticas na entrega" }
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
