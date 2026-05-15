# GO UP! Backend — Google Sheets + Apps Script

Backend leve para o frontend GO UP! (`codifica-react`). Usa um Google Sheets como banco
e um script publicado como Web App expondo endpoints REST de leitura e escrita.

## Visão geral

```
Microsoft Forms (export Excel)
        ↓ paste manual
Google Sheets ─ Inscricoes ─ Turmas ─ Equipes ─ Status ─ Config
        ↓ Apps Script (doGet/doPost)
        ↓ HTTPS /exec
React frontend (Vercel) — useAuth() → fetchProfessorBundle(email)
```

## Setup (uma vez)

### 1. Criar a planilha

1. Crie um Google Sheets novo — sugestão de nome: **`GO UP! 2026 — Inscricoes & Status`**.
2. `Extensions` → `Apps Script` para abrir o editor vinculado.
3. Apague o `Code.gs` padrão e crie 7 arquivos com o conteúdo desta pasta:
   - `Code.gs`, `Setup.gs`, `Auth.gs`, `Utils.gs`, `Inscricoes.gs`, `Equipes.gs`, `Status.gs`
4. Salve (`Ctrl/Cmd+S`).

### 2. Bootstrap das abas

No editor Apps Script, com o arquivo `Setup.gs` aberto:
- Selecione a função `setupWorkbook` no dropdown e clique em `Run`.
- Autorize o OAuth scope quando solicitado.
- A planilha agora tem 5 abas com headers, validações e checkboxes.

Para o auto-fill de `equipe_id` e `created_at` ao adicionar uma equipe:
- Rode `installEquipesTrigger` (mesmo dropdown). Confirma o trigger no `Triggers` lateral.

### 3. Configurar o token compartilhado

`Project Settings` (engrenagem) → `Script properties` → `Add property`:
- **`WRITE_TOKEN`** = saída de `openssl rand -hex 16` (32 hex chars).

(Opcional para rotação escalonada: `WRITE_TOKEN_PREV` aceita o token anterior.)

### 4. Publicar como Web App

`Deploy` → `New deployment` → ícone de engrenagem → **Web app**:
- Description: `goup-backend-v1`
- Execute as: **Me (sua conta)**
- Who has access: **Anyone**
- `Deploy`

Copie a URL `/exec`. É o `VITE_BACKEND_BASE` que vai no Vercel.

⚠️ **Toda mudança de código exige uma nova versão**: `Manage deployments` → editar → `New version`. Sem isso o `/exec` continua servindo a versão antiga.

### 5. Vercel / `.env.local`

No projeto Vercel (Settings → Environment Variables, Production e Preview) e em
`codifica-react/.env.local`:

```
VITE_BACKEND_BASE=https://script.google.com/macros/s/SEU_DEPLOY_ID/exec
VITE_BACKEND_TOKEN=mesmo-write-token-do-passo-3
```

Sem essas vars, o frontend cai automaticamente para o mock data — não quebra.

## Fluxo operacional

### Receber inscrições (Microsoft Forms)
1. Baixe o Excel do Forms.
2. Abra a aba `Inscricoes` da planilha.
3. Cole as linhas a partir da célula A2 (preserve a ordem das colunas).
4. No editor Apps Script, rode `rebuildTurmas` (ou faça `POST {resource:"turmas",action:"rebuild"}`).
5. A aba `Turmas` é atualizada (upsert). Edições manuais em `status` e `turma_nome` são preservadas.

### Formar equipes (após 1ª entrega)
1. Abra a aba `Equipes`.
2. Adicione uma linha: escolha `turma_id` no dropdown, preencha `equipe_nome`, `membros` (nomes separados por vírgula), email do prof responsável, marque o checkbox `english_track`.
3. `equipe_id` e `created_at` são preenchidos sozinhos pelo trigger `onEditEquipes`.

### Atualizar status
- Manual: edite a aba `Status` direto.
- API: `POST` no `/exec` com:
  ```json
  {
    "token": "...",
    "resource": "status",
    "equipe_id": "etec107-11a-ecotech",
    "current_stage_id": 2,
    "earned_badge_ids": [1,2,4,5,6,7,8,9,10],
    "updated_by": "camila"
  }
  ```

## Endpoints (leitura — sem auth)

| Método | URL                                                          | Retorno                                               |
| ------ | ------------------------------------------------------------ | ----------------------------------------------------- |
| GET    | `?resource=turmas[&professor_email=&etec_numero=&status=]`   | Array de turmas com `equipe_count`                    |
| GET    | `?resource=equipes&turma_id=X` ou `&professor_email=X`       | Array de equipes com `status` left-joined             |
| GET    | `?resource=status[&equipe_id=X]`                             | Status única ou todas                                 |
| GET    | `?resource=professor&email=X`                                | Bundle: `{ professor, turmas, equipes }` (sem PII)    |
| GET    | `?resource=health`                                           | `{ ok: true, version }`                               |

## Endpoints (escrita — `token` no body)

POST com `Content-Type: text/plain` (evita preflight CORS), body JSON:

```json
{
  "token": "<WRITE_TOKEN>",
  "resource": "status" | "equipe" | "turmas",
  ...
}
```

- `resource: "status"` → upsert por `equipe_id`. Valida stage ∈ {1,2,3} e badge ids ∈ {1..18}.
- `resource: "equipe", action: "create" | "update" | "delete"` → CRUD de equipes (delete cascateia em Status).
- `resource: "turmas", action: "rebuild"` → reprocessa Inscricoes → Turmas. Retorna `{ added, kept, total }`.

Resposta sempre `{ ok: true, data: ... }` ou `{ ok: false, error: { code, message } }`.

Códigos de erro: `BAD_REQUEST`, `UNAUTHORIZED`, `NOT_FOUND`, `CONFLICT`, `INTERNAL`.

## PII

`safeProfessorView` em `Inscricoes.gs` é o único caminho que expõe dados de professor pela API.
Ela retorna apenas `{ email, nome, etec_numeros }` — **nunca** CPF, mobile, ethnicity, gender,
disability ou age range. Esses campos vivem só na aba `Inscricoes`, que não é lida por nenhum
endpoint diretamente.

## Acoplamento com o frontend

O catálogo canônico de stages (1–3) e badges (ids 1–18) vive em
[`codifica-react/src/data/gamificationData.js`](../codifica-react/src/data/gamificationData.js).
A planilha só armazena referências por id. A constante `ALL_BADGE_IDS` em [`Utils.gs`](Utils.gs)
deve ser atualizada se essa lista mudar — é o único ponto de duplicação.

## Verificação rápida

```bash
# Health
curl "https://script.google.com/macros/s/DEPLOY_ID/exec?resource=health"

# Listar turmas
curl "https://script.google.com/macros/s/DEPLOY_ID/exec?resource=turmas"

# Update de status
curl -X POST "https://script.google.com/macros/s/DEPLOY_ID/exec" \
  -H "Content-Type: text/plain" \
  -d '{"token":"SEU_TOKEN","resource":"status","equipe_id":"etec107-11a-ecotech","current_stage_id":2,"earned_badge_ids":[1,2,4,5,6,7,8,9,10],"updated_by":"camila-curl"}'
```

## Rotação de secret

1. Novo: `openssl rand -hex 16`.
2. Apps Script Script Properties → atualize `WRITE_TOKEN`.
3. Vercel env var → atualize `VITE_BACKEND_TOKEN` e redeploy.

Janela curta entre 2 e 3 onde writes em prod falham. Para evitar: copie o valor antigo em
`WRITE_TOKEN_PREV` antes de trocar `WRITE_TOKEN`, faça os dois deploys, depois apague o `_PREV`.
