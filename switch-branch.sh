#!/bin/bash

# Script helper para alternar entre branches do projeto Codifica+

echo "🌿 Alternador de Branches - Codifica+"
echo "======================================"
echo ""

# Verifica qual branch está ativa
CURRENT_BRANCH=$(git branch --show-current)
echo "Branch atual: $CURRENT_BRANCH"
echo ""

# Mostra opções
echo "Escolha uma opção:"
echo "1) main (versão atual - porta 3001)"
echo "2) estrutura-pedagogica (versão pedagógica - porta 3002)"
echo "3) Ver status atual"
echo "4) Sair"
echo ""
read -p "Digite o número: " choice

case $choice in
  1)
    echo ""
    echo "🔄 Mudando para branch: main"
    git checkout main
    if [ $? -eq 0 ]; then
      echo "✅ Agora você está na branch MAIN"
      echo "📦 Para iniciar o servidor:"
      echo "   cd codifica-react && npm run dev"
      echo "🌐 O servidor rodará em: http://localhost:3001"
    else
      echo "❌ Erro ao mudar de branch"
    fi
    ;;
  2)
    echo ""
    echo "🔄 Mudando para branch: estrutura-pedagogica"
    git checkout estrutura-pedagogica
    if [ $? -eq 0 ]; then
      echo "✅ Agora você está na branch ESTRUTURA-PEDAGOGICA"
      echo "📦 Para iniciar o servidor:"
      echo "   cd codifica-react && npm run dev"
      echo "🌐 O servidor rodará em: http://localhost:3002"
    else
      echo "❌ Erro ao mudar de branch"
    fi
    ;;
  3)
    echo ""
    echo "📊 Status atual:"
    git status --short
    echo ""
    echo "🌿 Branches disponíveis:"
    git branch
    ;;
  4)
    echo "👋 Até logo!"
    exit 0
    ;;
  *)
    echo "❌ Opção inválida"
    ;;
esac
