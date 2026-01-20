# 🌿 Como Usar as Branches

## ✅ O que foi configurado:

1. ✅ **Branch `main`** - Versão atual (porta 3001)
2. ✅ **Branch `estrutura-pedagogica`** - Versão com melhorias pedagógicas (porta 3002)
3. ✅ **Script helper** - `switch-branch.sh` para alternar facilmente

## 🚀 Como usar:

### Opção 1: Usar o script (mais fácil)
```bash
./switch-branch.sh
```

### Opção 2: Comandos manuais

**Ver qual branch está ativa:**
```bash
git branch
# A branch com * é a ativa
```

**Mudar para main (versão atual):**
```bash
git checkout main
cd codifica-react
npm run dev
# Abre em: http://localhost:3001
```

**Mudar para estrutura-pedagogica (versão nova):**
```bash
git checkout estrutura-pedagogica
cd codifica-react
npm run dev
# Abre em: http://localhost:3002
```

## 💡 Dica Pro:

Você pode ter **ambas as versões rodando ao mesmo tempo**:
- Terminal 1: `main` na porta 3001
- Terminal 2: `estrutura-pedagogica` na porta 3002

Assim você compara lado a lado!

## 📝 Trabalhar na versão pedagógica:

```bash
# 1. Mudar para a branch
git checkout estrutura-pedagogica

# 2. Fazer suas mudanças
# (editar arquivos...)

# 3. Commitar
git add .
git commit -m "Adiciona competências à Fase 1"
git push -u origin estrutura-pedagogica
```

## 🔄 Quando terminar e quiser juntar tudo:

```bash
git checkout main
git merge estrutura-pedagogica
```
