# LembrAI — site de apresentação

Página pública do LembrAI, construída com React, TypeScript, Vite e Tailwind CSS.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Publicação

A versão pública é controlada na branch `chore/site-dominio-personalizado`. Cada push para essa branch executa o workflow em `.github/workflows/deploy-pages.yml` e publica o site em `https://lembrai.ia.br/` pelo GitHub Pages. Também é possível executar o workflow manualmente, selecionando essa mesma branch. O ambiente `github-pages` permite publicação apenas dessa branch.

O workflow verifica o código e usa o caminho informado pelo próprio GitHub Pages para gerar os arquivos. Assim, imagens, ícones, CSS e JavaScript funcionam tanto em `https://lembraai.github.io/lembrai-site/` quanto na raiz de um domínio personalizado, sem manter configurações diferentes.

Para conferir os dois caminhos localmente:

```sh
PAGES_BASE_PATH=/lembrai-site npm run build
PAGES_BASE_PATH= npm run build
```

O domínio personalizado deve ser configurado em Settings → Pages antes de alterar o DNS. A publicação no novo endereço só está concluída depois de validar o DNS, o certificado HTTPS e os arquivos do site pela URL pública.

O domínio confirmado no Registro.br é `lembrai.ia.br`. Seu DNS usa os quatro registros A oficiais do GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`) e o CNAME de `www` para `lembraai.github.io`. A configuração do domínio é feita em Settings → Pages; este projeto publica com GitHub Actions e não depende de um arquivo CNAME no repositório.

## Conteúdo

O site apresenta o LembrAI para pessoas com TDAH, com foco em lembretes inteligentes, tarefas divididas em passos, modo foco e relatório semanal compartilhável com o psicólogo mediante consentimento. O aplicativo está identificado como em desenvolvimento; as telas usam dados fictícios.

O site não oferece download público nem atendimento clínico.

## Lista de espera

A seção `#inscricao` coleta nome, e-mail, perfil, interesses e consentimento. O destino é definido no build por variáveis de repositório do GitHub (Settings → Secrets and variables → Actions → Variables) e repassado ao build pelo workflow:

- `VITE_WAITLIST_ENDPOINT`: URL que recebe `POST` com JSON (`name`, `email`, `profile`, `interests`, `consent`, `source`, `createdAt`), como Formspree, Google Apps Script ou uma função própria. Tem prioridade.
- `VITE_WAITLIST_EMAIL`: alternativa sem backend; abre o aplicativo de e-mail da pessoa com a inscrição preenchida.

Sem nenhuma das duas, o formulário informa que as inscrições abrem em breve e não envia dados.

O workflow já repassa as duas variáveis ao build. Após criar ou atualizar uma variável, execute novamente a publicação para que a configuração entre no site. Não use essas variáveis para segredos: os valores `VITE_` fazem parte do código público enviado ao navegador.
