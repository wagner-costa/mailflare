# Validação OwnForge — 24/11/2026

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| `npm ci --no-audit --no-fund` | Concluído, sem alteração de dependências ou lockfile |
| `node --test --test-concurrency=2 tests/*.test.mjs` | Última execução completa: 1.254 testes, 1.252 aprovados, 2 ignorados, zero falhas |
| Regressões de i18n, manifesto, cache offline e recuperação de senha | 32 aprovados após os ajustes finais dessas áreas |
| Confirmação de agendamento | 10 aprovados, incluindo português e preservação de templates personalizados |
| `npx tsc --noEmit` | Concluído sem erros |
| `npm run build` | Build completo de cliente, RSC, SSR e Worker |
| `wrangler deploy --dry-run` | Concluído localmente, sem upload/publicação; aproximadamente 2,17 MiB gzip de Worker, abaixo de 3 MiB |
| Pacote público de código-fonte | Aproximadamente 3,8 MiB, abaixo do limite de 25 MiB por asset |
| `npm run lint` | 93 avisos e um erro preexistente: `prefer-const` em `src/app/api/calendar/events/[eventId]/route.ts:43` (`inviteErrors`). A mesma declaração foi confirmada em `git show HEAD:...`; o arquivo não foi alterado |

A primeira execução de testes encontrou sete expectativas antigas de idioma, tema, máscara de ícone e versão do cache. Os testes foram atualizados para validar os novos padrões, mantendo a cobertura de cookies, SSR, idiomas alternativos, área segura do ícone e exclusão seletiva de caches. A segunda execução completa passou. Os testes E2E escolhem inglês explicitamente por cookie para preservar seus seletores, independentemente do padrão pt-BR.

## Verificação visual

Chromium/Playwright acessou `/setup` com `pt-BR`, em 1440×1000 e 390×844, nos temas claro e escuro. Confirmados: título OwnForge, idioma HTML pt-BR, símbolo, paleta, tipografia, campos e mensagens legíveis, rodapé de autoria e fonte. Não houve erro JavaScript capturado nem overflow horizontal nessas quatro combinações. Capturas: `screenshots/ownforge/desktop-light.png`, `desktop-dark.png`, `mobile-light.png`, `mobile-dark.png`.

A tela apresenta corretamente o bloqueio de configuração por ausência de credenciais Cloudflare, sem revelar segredos. Os rótulos técnicos devolvidos pela API de configuração continuam no idioma original do upstream. A validação visual realizada não equivale a uma auditoria completa WCAG, leitor de tela ou teste de entrega de e-mail.

## Limites e homologação

O teste de envio/recebimento com domínio real, DNS, autenticação externa e recursos Cloudflare remotos não foi executado. Nenhum deploy, alteração de DNS ou contratação foi realizado. Não há garantia de CPU abaixo de 10 ms nas rotas reais: medir com mensagens representativas antes da implantação Free. Imagens/IA/Email Sending já existem na configuração upstream; conferir os serviços habilitados antes de provisionar e usar Resend para o perfil gratuito de envio desejado.

O primeiro dry-run encontrou um pacote de fonte excessivo por incluir vídeo/imagens de demonstração. O empacotador passou a excluir `docs/demo.mp4`, `screenshots/` e `sponsors/`, mantendo código, configuração de build, testes, migrações, licença e documentação textual. O dry-run posterior passou. O pacote não contém `.dev.vars`, ambientes reais, histórico Git ou dados locais.

Os testes de navegador foram tentados em uma instância local descartável em `/tmp/ownforge-e2e-20261124`, na porta 3002. A preparação inicial encontrou ausência de credenciais e schema; esses resultados não foram classificados como testes funcionais aprovados. Após aplicar as migrações existentes apenas nessa instância descartável e criar os dados demo, a execução completa com timeout de 90s terminou em 7 cenários aprovados e 5 falhas de passkeys/segundo fator. Os quatro testes de mensagens/desfazer passaram. Os cenários que falharam receberam 401 em verificações de passkey ou step-up e excederam a espera pela navegação/fechamento de diálogo. As implementações de autenticação não foram alteradas. Não foi comprovado se essas falhas já ocorriam no upstream; elas permanecem pendentes para homologação. Traces estão em `test-results/`, ignorado pelo Git.

Benchmark de bcrypt original (Node 24, uso de CPU do processo, uma amostra): hash fator 12 = 266,114 ms; verificação = 242,671 ms. É um risco concreto para o teto HTTP de 10 ms no Workers Free. Não equivale a medição no edge. O algoritmo e os hashes existentes foram preservados; não declarar o login por senha certificado para Free.

O empacotador de fonte foi executado com sucesso a partir de uma extração sem diretório Git, gerando novamente um arquivo de aproximadamente 3,8 MiB.

As páginas autenticadas /inbox, /calendar, /drive e /admin foram abertas com o usuário demo local nos dois temas, com título e idioma coerentes, sem erros JavaScript capturados nem overflow horizontal em desktop. O controle showUpgradePrompts=false remove a promoção comercial do cabeçalho, preservando a página administrativa e todos os gates de licença.

A inspeção visual também confirmou as telas finais de calendário escuro, caixa de entrada escura e Drive claro. As capturas aguardam o desaparecimento por opacidade do splash antes de registrar os módulos.
