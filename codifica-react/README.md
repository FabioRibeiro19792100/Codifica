# Codifica+ Climate Action - Sistema de Gamificação

Sistema de gamificação completo desenvolvido com Vite + React para o programa Codifica+ Climate Action.

## 🚀 Tecnologias

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server ultra-rápido
- **React Router DOM** - Roteamento para aplicações React
- **CSS3** - Estilização moderna com gradientes e animações

## 📁 Estrutura do Projeto

```
codifica-react/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Página inicial com navegação
│   │   ├── TimelinePublic.jsx    # Timeline pública do programa
│   │   ├── TeacherDashboard.jsx   # Dashboard do professor
│   │   ├── TeamDashboard.jsx     # Dashboard da equipe
│   │   └── SchoolDashboard.jsx   # Dashboard da escola
│   ├── App.jsx                   # Componente principal com rotas
│   ├── App.css                   # Estilos globais
│   ├── index.css                 # Reset e estilos base
│   └── main.jsx                  # Ponto de entrada
├── public/                       # Arquivos estáticos
└── package.json                  # Dependências do projeto
```

## 🎯 Páginas Disponíveis

1. **Home** (`/`) - Página inicial com navegação para todas as seções
2. **Timeline Pública** (`/timeline`) - Visão completa das fases do programa
3. **Dashboard do Professor** (`/teacher`) - Gestão de equipes e notificações
4. **Dashboard da Equipe** (`/team`) - Badges e progresso da equipe
5. **Dashboard da Escola** (`/school`) - Troféus e ranking estadual

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+ e npm

### Instalação

```bash
cd codifica-react
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Preview da Build

```bash
npm run preview
```

## 🎨 Características

- ✅ Design responsivo e moderno
- ✅ Navegação fluida entre páginas
- ✅ Animações e transições suaves
- ✅ Sistema completo de badges e troféus
- ✅ Rankings e estatísticas em tempo real
- ✅ Interface intuitiva e gamificada

## 📝 Funcionalidades

### Sistema de Badges
- 19 badges para equipes organizados por fase
- Badges ganhos vs. bloqueados com visual diferenciado
- Recompensas e reconhecimentos públicos

### Sistema de Troféus
- 8 troféus escolares
- Animações especiais para troféus conquistados
- Critérios objetivos de conquista

### Rankings
- Ranking estadual competitivo
- Estatísticas agregadas por escola
- Progresso visual com barras

### Dashboards
- Dashboard do professor com gestão de múltiplas equipes
- Dashboard da equipe com progresso individualizado
- Dashboard da escola com reconhecimento institucional

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o linter ESLint

## 📄 Licença

Desenvolvido para Mastertech • 2025

---

**Codifica+ Climate Action** • Sistema de Gamificação Completo
