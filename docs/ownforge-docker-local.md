# OwnForge local no Docker do WSL

Esta instalação compila a personalização deste checkout. Não usa a imagem pré-compilada do Mailflare original.

```sh
cd /home/wrcosta/workflow/mailflare
# Somente se o arquivo ainda não existir:
test -f .env.docker || cp .env.docker.example .env.docker
docker compose -p ownforge-local -f docker-compose.local.yml up -d --build
```

- Aplicação: http://127.0.0.1:3000
- Primeiro acesso: http://127.0.0.1:3000/setup
- E-mails de teste capturados: http://127.0.0.1:8025

O primeiro administrador é criado pelo próprio usuário em `/setup`. Nenhuma senha padrão é criada. Para testar sem domínio real, use um domínio reservado como `ownforge.test` e selecione a opção de pular DNS. Não configure DNS real nesta instalação de teste.

O serviço SMTP de entrada da aplicação está desativado. O SMTP de saída aponta para o Mailpit na rede Docker, sem publicar sua porta SMTP no host. As mensagens ficam no capturador local; não há envio externo configurado.

O projeto Compose é `ownforge-local`. SQLite, anexos e backups ficam no volume `ownforge-local_mailflare-data`; as mensagens capturadas ficam em `ownforge-local_mailpit-data`. As portas HTTP ficam vinculadas a `127.0.0.1`. O Dockerfile usa Node 24, alinhado aos scripts de preparação da marca.

`.env.docker` é local, ignorado pelo Git e excluído do contexto da imagem. O Compose local define `APP_URL=http://127.0.0.1:3000` e o fuso America/Sao_Paulo. Não coloque credenciais no YAML.

```sh
# Estado e logs
docker compose -p ownforge-local -f docker-compose.local.yml ps
docker compose -p ownforge-local -f docker-compose.local.yml logs --tail=100 mailflare

# Parar, preservando os volumes
docker compose -p ownforge-local -f docker-compose.local.yml down

# Reiniciar
docker compose -p ownforge-local -f docker-compose.local.yml up -d

# Aplicar mudanças do checkout
docker compose -p ownforge-local -f docker-compose.local.yml up -d --build
```

Não use `down -v` se quiser preservar os dados. Para configurar envio/recebimento real posteriormente, siga `self-hosting.md` e use credenciais próprias; esta configuração local não altera a infraestrutura Cloudflare.

## Verificação da instalação — 24/11/2026

Imagem local construída com Node 24.22.3. Os dois serviços foram confirmados como healthy. A página de configuração e o Mailpit responderam HTTP 200 pelo IPv4 do Windows; a preparação inicial passou e a conexão SMTP interna foi verificada sem enviar mensagens. SQLite presente e /data gravável. Nenhum administrador foi criado automaticamente.

Foi adotado 127.0.0.1 como endereço canônico porque localhost apresentou timeout ao resolver por IPv6 no Windows deste ambiente. Use o endereço configurado em APP_URL também no navegador.
