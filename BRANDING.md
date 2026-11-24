# OwnForge — personalização do fork Mailflare

Implementação iniciada em 24/11/2026. Referência: prancha de identidade OwnForge fornecida pelo proprietário. Nome da plataforma e empresa: **OwnForge**. Assinatura: “Engineering Intelligent Infrastructure.” Não foram presumidos domínio, endereço de suporte ou razão social. OwnStorage e OwnNexus aparecem na referência como produtos do ecossistema; não foram usados para renomear módulos com funções diferentes.

## Identidade e configuração

Edite `src/lib/branding/config.ts`. `showUpgradePrompts` controla a promoção comercial do cabeçalho; desativá-la não altera os direitos de acesso ou a administração de licenças. Esse arquivo controla nome, empresa, descrição, assinatura, logotipos, favicon, contato, domínio, fonte do software, idioma e fuso padrão. Campos de domínio e contato vazios não são publicados. Não coloque segredos nesse arquivo: ele é compartilhado com o navegador.

| Token | HEX | Uso |
| --- | --- | --- |
| Azul Forge | #2563EB | Ações e foco |
| Roxo Forge | #7C3AED | Identidade |
| Ciano | #22D3EE | Gradiente do símbolo |
| Violeta | #A855F7 | Gradiente do símbolo |
| Grafite | #0B1220 | Texto / fundo escuro |
| Cinza 800 | #1E293B | Superfícies escuras |
| Cinza 600 | #475569 | Texto secundário |
| Cinza 200 | #E2E8F0 | Bordas |
| Cinza 50 | #F8FAFC | Fundo claro |
| Verde | #10B981 | Sucesso |
| Âmbar | #F59E0B | Alerta |
| Vermelho | #EF4444 | Erro |

A interface mantém Geist, alternativa sem serifa compatível com o estilo Inter da referência, usando o mecanismo `next/font` já existente. Não se adicionaram fontes ou rastreadores externos em tempo de execução. As versões vetoriais dos logotipos usam Inter/Arial como fallback; substitua o texto por curvas no arquivo mestre aprovado se precisar de reprodução tipográfica exata.

O símbolo é uma interpretação vetorial da fita geométrica da imagem, não uma extração do arquivo mestre. Substitua os SVGs aprovados em `public/branding/` e ajuste `scripts/prepare-branding.mjs` para não sobrescrevê-los. O script usa `sharp`, já presente na árvore do Next, apenas durante a preparação local. Gera ícones PNG 48/96/192/512, Apple Touch, máscara com área segura e ICO, preservando as URLs usadas pelo push e PWA. `logo-light.svg` e `logo-dark.svg` são versões horizontais; os componentes existentes usam símbolo e nome dinâmico para preservar a personalização administrativa.

Execute `npm run brand:prepare` depois de alterar a configuração. Os comandos de desenvolvimento e build também fazem isso. `src/app/brand-tokens.css` é gerado: personalize cores institucionais na configuração e escalas derivadas no gerador. `src/app/globals.css` mantém o mapeamento Tailwind e comportamento global. As escalas neutras e azuis alcançam os módulos existentes sem reescrever sua lógica. Semântica, foco visível, modo escuro, redução de movimento, contraste das ações principais e superfícies são compartilhados. Não aplique a paleta corporativa aos corpos de e-mails recebidos nem às cores escolhidas pelo usuário para calendários.

## Idioma e datas

Novas sessões usam pt-BR; cookies de idioma existentes são respeitados. O catálogo inglês continua sendo o fallback e os outros idiomas continuam disponíveis como assets. A troca do idioma padrão não troca o catálogo inglês pelo português. A interface usa America/Sao_Paulo quando não há preferência de usuário, e relógio de 24 horas nos formatadores compartilhados. Preferências salvas, fusos explícitos de eventos, UTC de armazenamento e aritmética de datas são preservados. Textos legados e formatações que não passam pelos helpers compartilhados podem precisar de revisão adicional.

## Escopo e arquivos

- `src/lib/branding/config.ts`, `service.ts`: identidade estática e fallback, sem remover o gate de licença da personalização administrativa.
- `src/components/branding-provider*.ts*`, `auth/auth-shell.tsx`, `legal-notice.tsx`, `sidebar-footer.tsx`: aplicação da identidade e acesso ao código-fonte.
- `src/app/layout.tsx`, `manifest.ts`, `page.tsx`, `not-found.tsx`, `error.tsx`, `api/branding/icon/route.ts`: metadados, PWA, entrada, erros e ícone.
- Layouts de administração, e-mail, Drive, agenda e configurações; páginas públicas `/book/...` e `/d/...`; skeletons e sidebar: fundo semântico compartilhado.
- `src/app/globals.css`, `brand-tokens.css`, `src/components/ui/button.tsx`, `input.tsx`: tokens e controles.
- `src/lib/i18n/locales.ts`, `utils.ts`, catálogos inglês/pt-BR e `src/lib/time/utils.ts`: padrões e marca no texto de interface.
- `src/lib/push/native.ts`, `public/sw.js`, `offline.html`, ícones e `public/branding/*`: notificações e assets.
- `scripts/prepare-branding.mjs`, `package-source.mjs`, `package.json`, `.gitignore`: preparação e oferta de fonte correspondente.

Não houve alteração de schema, migração, isolamento de dados, permissões, autenticação, envio, recebimento ou armazenamento. Identificadores de infraestrutura, cookies, protocolos JMAP/MCP, cabeçalhos MIME, nomes dos recursos, backups e contratos continuam compatíveis com o upstream. Referências Mailflare relativas a licença, atualizações, cliente móvel e autoria são deliberadamente preservadas.

## Licença e atualização do fork

O `LICENSE` original é GNU AGPLv3 ou posterior e identifica Mailflare, Copyright (C) 2026 Hieu Nguyen. Preserve esse arquivo e os avisos de autoria. Uma versão modificada oferecida pela rede deve oferecer aos usuários a fonte correspondente sob a AGPL, incluindo as modificações e os materiais necessários para construir a versão fornecida. Não confunda a licença do código com eventuais direitos de marca ou condições dos serviços de terceiros.

`npm run brand:source` cria `public/source/ownforge-source.tar.gz`, servido como asset e ligado nas telas públicas de entrada e no rodapé privado. O empacotador também funciona a partir da fonte baixada, sem diretório Git. O arquivo contém os arquivos versionados atuais e uma lista explícita dos novos arquivos desta personalização; não inclui histórico Git, dependências instaladas, dados dos usuários ou arquivos locais de ambiente. **Ao adicionar arquivos novos necessários à construção, amplie a lista do script ou versione esses arquivos antes do build.** Revise o conteúdo do arquivo antes de distribuir, especialmente se alguém tiver versionado credenciais indevidamente. O arquivo gerado não deve ser commitado. Se `sourceUrl` apontar para outro serviço, disponibilize a fonte exata de cada versão implantada; não aponte só para o upstream sem as modificações.

Para atualizar: salve suas alterações em um branch, faça backup, integre o upstream em ambiente de homologação e revise conflitos nos pontos listados. Preserve a configuração e gere novamente os assets. Execute testes, tipos, lint e build. Se o upstream modificar schema, siga AGENTS.md para os três dialetos e os grupos de backup. O atualizador automático original pode integrar mudanças do upstream; revise seu uso para não publicar alterações de marca sem homologação.

## Cloudflare Free: limites e pontos de atenção

Não se adicionou serviço, dependência obrigatória de IA, banco externo, contêiner de produção ou recurso pago. `wrangler.jsonc` e os bindings foram preservados. Isso **não é garantia de que o aplicativo completo caiba no plano Free**: é necessário verificar o tamanho comprimido produzido pelo build e medir CPU das rotas e consumidores com mensagens reais.

**Restrição concreta preexistente:** `src/lib/auth/password.ts` usa `bcrypt.hashSync` e `compareSync` com fator 12. Benchmark local com Node 24: 266 ms de CPU para hash e 243 ms para verificação, muito acima de 10 ms. Esse benchmark não mede o Worker real, mas impede afirmar compatibilidade integral do login por senha com Workers Free. Não reduzi o fator nem alterei hashes ou autenticação. Homologar passkeys e medir CPU no Worker; uma eventual migração de algoritmo exige projeto de segurança separado e compatibilidade com senhas existentes.

Documentação oficial consultada em 24/11/2026:

| Serviço | Franquia / restrição relevante |
| --- | --- |
| [Workers](https://developers.cloudflare.com/workers/platform/limits/) | 100 mil requisições/dia, 10 ms CPU por requisição HTTP e 3 MiB de Worker comprimido no Free; assets estáticos separados |
| [D1](https://developers.cloudflare.com/d1/platform/pricing/) | 5 milhões de linhas lidas/dia, 100 mil escritas/dia, 5 GB totais; [500 MB por banco e 50 consultas por invocação no Free](https://developers.cloudflare.com/d1/platform/limits/) |
| [R2 Standard](https://developers.cloudflare.com/r2/pricing/) | 10 GB-mês, 1 milhão de operações A e 10 milhões B por mês; excedentes podem gerar cobrança |
| [Queues](https://developers.cloudflare.com/queues/platform/pricing/) | 10 mil operações/dia no Free, retenção de 24h; entrega normalmente usa escrita, leitura e exclusão, retries consomem mais |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/platform/pricing/) | Free suporta backend SQLite; o projeto usa `new_sqlite_classes` |
| [Email Service](https://developers.cloudflare.com/email-service/platform/pricing/) | Email Routing disponível no Free; envio a destinatários arbitrários exige Workers Paid. Usar Resend para o perfil gratuito |
| [Images](https://developers.cloudflare.com/images/pricing/) | Free: 5 mil transformações únicas/mês de imagens externas; novas transformações falham ao exceder a cota |
| [Resend](https://resend.com/pricing) | Plano gratuito de envio: 3 mil e-mails/mês e 100/dia; confirmar condições da conta e domínio |

Para operação econômica, usar o recebimento Email Routing existente e selecionar Resend para envio no domínio, sem habilitar Email Sending pago automaticamente. A documentação original de deploy ainda descreve o onboarding de envio Cloudflare pago: não execute essa etapa ao usar Resend. R2 pode exigir habilitação de faturamento mesmo dentro da franquia; não foi ativado nesta tarefa. IMAGES, AI e envio EMAIL já constam no Wrangler original; não foram ativados remotamente. Confira suas condições antes de provisionar. IA é opcional: mantenha desativada se não desejar consumo. Assets e fonte do software não contêm dados de correio.

## Execução e deploy

Use Node 24 e o ambiente Linux/WSL do projeto:

```sh
npm ci
npm run dev
```

Copie `.dev.vars.example` para `.dev.vars` e preencha somente as variáveis necessárias à instalação, sem versionar segredos. Abra `http://localhost:3000`. O `/setup` faz as verificações e inicialização já existentes. Não utilize dados de produção em testes visuais.

```sh
npm run lint
npx tsc --noEmit
node --test tests/*.test.mjs
npm run build
```

Para deploy posterior autorizado: revise `wrangler.jsonc`, credenciais e cotas, configure os recursos existentes seguindo `docs/deployment.md`, defina o provedor de envio econômico e execute `npm run deploy`. Esse comando publica; não foi executado nesta tarefa. Não renomeie Worker, self-reference, filas, D1, R2 ou bindings como parte da marca. Revise as migrações pendentes no fluxo administrativo existente. Não altere DNS sem autorização.

## Validação e próximos passos

Resultados efetivamente executados são registrados na entrega e em `BRANDING-VALIDATION.md`. Fluxos que exigem contas, domínio, D1/R2 remotos ou e-mail real precisam de homologação com os dados da instalação. Recomenda-se fornecer o logotipo vetorial mestre, preencher domínio/suporte verificados e medir CPU, bundle e cotas antes de qualquer publicação. Teste navegação por teclado, telas pequenas, ambos os temas, login/recuperação, agenda, compartilhamento e agendamento com usuários de teste.

## Inventário dos arquivos alterados

- `.gitignore`
- `BRANDING-VALIDATION.md`
- `BRANDING.md`
- `package.json`
- `public/apple-touch-icon.png`
- `public/branding/logo-dark.svg`
- `public/branding/logo-light.svg`
- `public/branding/mark.svg`
- `public/favicon.ico`
- `public/icon-192.png`
- `public/icon-48.png`
- `public/icon-512.png`
- `public/icon-96.png`
- `public/icon-maskable-512.png`
- `public/locales/pt-BR.json`
- `public/offline.html`
- `public/sw.js`
- `screenshots/ownforge/admin-dark.png`
- `screenshots/ownforge/admin-light.png`
- `screenshots/ownforge/calendar-dark.png`
- `screenshots/ownforge/calendar-light.png`
- `screenshots/ownforge/desktop-dark.png`
- `screenshots/ownforge/desktop-light.png`
- `screenshots/ownforge/drive-dark.png`
- `screenshots/ownforge/drive-light.png`
- `screenshots/ownforge/inbox-dark.png`
- `screenshots/ownforge/inbox-light.png`
- `screenshots/ownforge/login-dark.png`
- `screenshots/ownforge/login-light.png`
- `screenshots/ownforge/mobile-dark.png`
- `screenshots/ownforge/mobile-light.png`
- `scripts/package-source.mjs`
- `scripts/prepare-branding.mjs`
- `src/app/(admin)/layout.tsx`
- `src/app/(calendar)/booking/page.tsx`
- `src/app/(calendar)/calendar/page.tsx`
- `src/app/(calendar)/layout.tsx`
- `src/app/(dashboard)/layout.tsx`
- `src/app/(drive)/layout.tsx`
- `src/app/(settings)/layout.tsx`
- `src/app/api/branding/icon/route.ts`
- `src/app/book/[userId]/[eventId]/page.tsx`
- `src/app/book/[userId]/page.tsx`
- `src/app/brand-tokens.css`
- `src/app/d/[token]/page.tsx`
- `src/app/error.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/manifest.ts`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/components/auth/auth-shell.tsx`
- `src/components/branding-provider-utils.ts`
- `src/components/branding-provider.tsx`
- `src/components/legal-notice.tsx`
- `src/components/license-indicator.tsx`
- `src/components/loading-transition.tsx`
- `src/components/route-skeleton.tsx`
- `src/components/settings/time-zone-form.tsx`
- `src/components/sidebar-aside.tsx`
- `src/components/sidebar-footer.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/lib/auth/password-reset-utils.ts`
- `src/lib/booking/confirmation-utils.ts`
- `src/lib/branding/config.ts`
- `src/lib/branding/service.ts`
- `src/lib/email/cloud-attachment-utils.ts`
- `src/lib/email/system-mail.ts`
- `src/lib/email/webhooks.ts`
- `src/lib/i18n/en.json`
- `src/lib/i18n/locales.ts`
- `src/lib/i18n/utils.ts`
- `src/lib/push/native.ts`
- `src/lib/time/utils.ts`
- `tests/booking-confirmation.test.mjs`
- `tests/e2e/message-undo.spec.ts`
- `tests/e2e/passkeys.spec.ts`
- `tests/i18n.test.mjs`
- `tests/pwa-manifest.test.mjs`
- `tests/pwa-offline-fallback.test.mjs`
