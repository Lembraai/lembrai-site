# LembrAI — site de apresentação

Página pública do LembrAI, construída com React, TypeScript, Vite e Tailwind CSS.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Publicação

Cada push para `main` executa o workflow em `.github/workflows/deploy-pages.yml` e publica a versão de produção no GitHub Pages.

## Conteúdo

O site apresenta o LembrAI para pessoas com TDAH, com foco em lembretes inteligentes, tarefas divididas em passos, modo foco e relatório semanal compartilhável com o psicólogo mediante consentimento. O aplicativo está identificado como em desenvolvimento; as telas usam dados fictícios.

O site não oferece download público nem atendimento clínico.

## Lista de espera

A seção `#inscricao` coleta nome, e-mail, perfil, interesses e consentimento. O destino é definido no build por variáveis de repositório do GitHub (Settings → Secrets and variables → Actions → Variables) e repassado ao build pelo workflow:

- `VITE_WAITLIST_ENDPOINT`: URL que recebe `POST` com JSON (`name`, `email`, `profile`, `interests`, `consent`, `source`, `createdAt`), como Formspree, Google Apps Script ou uma função própria. Tem prioridade.
- `VITE_WAITLIST_EMAIL`: alternativa sem backend; abre o aplicativo de e-mail da pessoa com a inscrição preenchida.

Sem nenhuma das duas, o formulário informa que as inscrições abrem em breve e não envia dados.

Para ativar, além de criar a variável, repasse-a no passo `Build site` de `.github/workflows/deploy-pages.yml`:

```yaml
        env:
          VITE_WAITLIST_ENDPOINT: ${{ vars.VITE_WAITLIST_ENDPOINT }}
          VITE_WAITLIST_EMAIL: ${{ vars.VITE_WAITLIST_EMAIL }}
```
