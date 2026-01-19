# Codifica+ Climate Action - Sistema de Gamificação

## 📋 Sobre este Protótipo

Este é um protótipo completo e navegável do sistema de gamificação do programa **Codifica+ Climate Action**. O objetivo é demonstrar visualmente como badges, troféus e reconhecimentos funcionarão na prática para professores, estudantes e escolas.

## 🎯 Estrutura do Sistema

### Atores Principais
1. **Professores** - Fazem inscrições, alocam alunos, gerenciam equipes e recebem comunicações oficiais
2. **Estudantes** - Realizam entregas, ganham badges, participam de workshops
3. **Escolas** - Recebem troféus baseados no desempenho coletivo das equipes

### Reconhecimentos
- **19 Badges Individuais** - Conquistas para equipes ao longo da jornada
- **8 Troféus Escolares** - Reconhecimentos institucionais para escolas
- **5 Fases do Programa** - Inscrição, Ideação, Prototipagem, Pitch, Banca Final

## 📁 Arquivos Incluídos

### 1. `index.html`
**Página de Navegação Central**
- Hub para acessar todas as outras páginas
- Visão geral do sistema completo
- Estatísticas e observações técnicas

### 2. `codifica_timeline_public.html`
**Timeline Pública do Programa**
- **Público**: Aberta para todos (não requer login)
- **Propósito**: Apresentar o programa para professores interessados
- **Conteúdo**:
  - 5 fases detalhadas com datas específicas
  - Badges e troféus disponíveis em cada fase
  - Recompensas (visibilidade, acessos, prêmios)
  - CTAs para professores se inscreverem

### 3. `codifica_teacher_dashboard.html`
**Dashboard do Professor**
- **Público**: Área logada para professores
- **Propósito**: Gerenciar múltiplas equipes
- **Conteúdo**:
  - Badge "Professor Multi-time" destacado
  - Lista de todas as equipes orientadas
  - Progresso individualizado por equipe
  - Notificações e alertas de prazos
  - Ações rápidas (adicionar equipe, relatórios, calendário)

### 4. `codifica_gamification_mockup.html`
**Dashboard da Equipe (Estudantes)**
- **Público**: Área logada para estudantes
- **Propósito**: Visualizar progresso e badges conquistados
- **Conteúdo**:
  - 19 badges organizados por fase
  - Barra de progresso da jornada (9/19 badges = 47%)
  - Badges conquistados destacados em dourado
  - Badges futuros em cinza (locked)
  - Vitrine pública com destaques

### 5. `codifica_school_dashboard.html`
**Dashboard da Escola**
- **Público**: Área logada para gestores escolares
- **Propósito**: Visualizar reconhecimento institucional
- **Conteúdo**:
  - 8 troféus escolares (5 conquistados, 3 locked)
  - Ranking estadual competitivo (posição 3º)
  - Estatísticas agregadas (7 equipes, 86% conclusão)
  - Critérios objetivos para cada troféu

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: Gradiente roxo (#667eea → #764ba2)
- **Sucesso**: Verde (#4caf50)
- **Destaque**: Dourado (#ffd700) para badges conquistados
- **Alerta**: Laranja (#ff9800) e Vermelho (#ff6b6b)

### Elementos Visuais
- **Badges conquistados**: Fundo dourado com animações de brilho
- **Badges futuros**: Cinza com opacidade reduzida
- **Barras de progresso**: Gradiente roxo com percentual
- **Cards**: Elevação sutil com hover effects

### Responsividade
- Layout adaptável para desktop, tablet e mobile
- Grid system com `minmax()` para flexibilidade
- Breakpoints em 768px para layouts simplificados

## 🔧 Aspectos Técnicos Importantes

### Comunicação
✅ **Professores são o ponto focal**
- Toda comunicação oficial vai para professores
- Professores gerenciam inscrições e equipes
- Estudantes são alocados pelos professores

### Verificação de Badges
✅ **100% Automática**
- Submissões com timestamp
- Presença em workshops/plantões (integração necessária)
- Campos obrigatórios preenchidos
- Sem processo manual de apelação

### Privacidade
⚠️ **Badge "Equipe Diversa"**
- Requer campo de gênero no cadastro
- Considerar opt-in ou nomenclatura genérica
- Não expor dados sensíveis publicamente

### Sistema de Pontos
❓ **Coluna "Moeda" vazia**
- Atualmente não implementada
- Sugestão: Sistema de pontos acumuláveis
- Possibilidade de "gastar" pontos em benefícios

## 📊 Badges e Troféus

### Badges por Fase

**Fase 1: Inscrição (3 badges)**
- ✅ Equipe Ativada
- 🌈 Equipe Diversa
- 👨‍🏫 Professor Multi-time

**Fase 2: Ideação (4 badges)**
- 💡 Ideação Concluída
- 🎪 Workshop Ideação
- 💬 Plantão Ativo Ideação
- 🌱 Climate Skills OK Ideação

**Fase 3: Prototipagem (4 badges)**
- 🔧 Protótipo Concluído
- 🎪 Workshop Prototipagem
- 💬 Plantão Ativo Prototipagem
- 🌿 Climate Skills OK Protótipo

**Fase 4: Pitch (4 badges)**
- 🎬 Pitch Enviado
- 🌳 Climate Skills OK Pitch
- 🎭 Workshop Pitch
- 🏅 Finalista de Banca

**Fase 5: Banca Final (4 badges)**
- 🎯 Apresentou em Banca
- 🤝 Trabalho em Equipe
- 👩‍🏫 Professores-Líderes
- 🌍 Global Change Makers

### Troféus Escolares

1. 🏆 **Escola Mobilizadora** - 5+ equipes inscritas
2. 💪 **Escola Persistente** - 80%+ concluíram ideação
3. 🚀 **Escola Inovadora** - 3+ equipes na fase final
4. 🌍 **Climate Champion** - 100% preencheram Climate Skills
5. 🌈 **Escola Inclusiva** - 70%+ equipes diversas
6. 👑 **Escola Finalista** - 1+ equipe na banca
7. 🎯 **Escola Impacto Real** - Média 50+ pessoas testando
8. ⭐ **Escola Transformadora** - Conquistar todos os troféus

## 🚀 Como Usar Este Protótipo

1. **Abra `index.html`** em qualquer navegador
2. Navegue pelas 4 páginas usando os botões
3. Explore cada dashboard para ver diferentes perspectivas
4. Use para apresentações e demonstrações aos stakeholders

## 💡 Sugestões de Melhoria

### Curto Prazo
- [ ] Definir sistema de pontos (coluna "Moeda")
- [ ] Resolver questão de privacidade do badge "Equipe Diversa"
- [ ] Completar texto do badge "Global Change Makers" (Item 19)
- [ ] Considerar processo básico de apelação para erros técnicos

### Médio Prazo
- [ ] Adicionar badges intermediários entre Ideação e Prototipagem
- [ ] Criar badge de "Resiliência" para equipes que resubmeteram
- [ ] Implementar badges colaborativos (mentor voluntário, feedback construtivo)
- [ ] Desenvolver dashboard mobile nativo

### Longo Prazo
- [ ] Sistema de ranking em tempo real
- [ ] Integração com redes sociais para compartilhamento
- [ ] Certificados digitais automáticos
- [ ] Analytics e relatórios avançados

## 📞 Próximos Passos

1. **Validação com Stakeholders**
   - Apresentar protótipo para equipe interna
   - Coletar feedback de professores piloto
   - Ajustar baseado em insights

2. **Desenvolvimento Técnico**
   - Escolher stack tecnológico
   - Definir arquitetura de banco de dados
   - Implementar automações de verificação
   - Integrar com sistema de presença

3. **Conteúdo e Comunicação**
   - Criar materiais de onboarding para professores
   - Desenvolver tutoriais em vídeo
   - Preparar templates de comunicação oficial

## 📄 Licença e Créditos

**Desenvolvido para**: Mastertech  
**Programa**: Codifica+ Climate Action  
**Versão**: 1.0 - Mockup de Demonstração  
**Data**: Janeiro 2025

---

**Contato para Dúvidas**: [Incluir email ou canal de comunicação]
