# Checklist Cloudflare, hospedagem e indexação

03/11/2026. **Nenhuma configuração de painel foi alterada e nenhum deploy foi feito.** O repositório usa GitHub Pages (main/raiz, Jekyll, `CNAME`). Não existem Workers, `_redirects`, `_headers` ou configuração da zona. Arquivos destinados a Cloudflare Pages não controlariam esta hospedagem, por isso não foram criados.

## Evidências públicas e limites

A auditoria GET/HEAD da versão atualmente publicada encontrou 32 URLs no sitemap, 33 URLs rastreadas e nenhum problema P0/P1. HTTP→HTTPS e www→apex retornaram 301→200; `/crm-whatsapp` também redirecionou 301 para a barra final. URL inexistente retornou 404. Parâmetros mantiveram canonical limpo. `/crm-whatsapp/index.html` respondeu 200 com canonical para `/crm-whatsapp/`: há alias, mas não é linkado nem está no sitemap.

Na amostra de `/`, `/robots.txt` e fonte WOFF2, os headers foram `server: GitHub.com`, `cache-control: max-age=600`, sem `cf-cache-status` e sem `X-Robots-Tag`. Isso é compatível com origem Pages e possivelmente DNS sem proxy; não comprova como a conta Cloudflare está configurada. Robots público observado ainda era o wildcard original. As mudanças locais só chegarão ao domínio após deploy autorizado.

## Painel: conferência necessária

- [ ] Confirmar DNS de apex e www, origem de cada registro e estado do proxy. Preservar os subdomínios da aplicação, formulários e ajuda. Não alterar IPs com base em uma lista antiga do README.
- [ ] Confirmar domínio customizado e Enforce HTTPS no GitHub Pages. Se houver proxy, validar certificado da origem e TLS Full (strict), evitando Flexible com redirects de HTTPS da origem. Ver [modos SSL/TLS](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/).
- [ ] Inventariar Redirect Rules, Bulk Redirects, Page Rules e Workers existentes antes de criar qualquer regra. Os redirects HTTP/www já funcionaram no teste; não acrescentar regras redundantes.
- [ ] Se desejar consolidar `/index.html`, restringir a regra ao host público e às páginas conhecidas: `/index.html` → `/`, `/crm-whatsapp/index.html` → `/crm-whatsapp/`, preservando query string. Usar 301/308. Nunca aplicar uma regra genérica que transforme URLs desconhecidas em páginas válidas. Testar ausência de loops.
- [ ] Manter barras finais para rotas de diretórios. Não criar fallback SPA para `index.html`: desconhecidas devem manter status 404, mesmo quando exibem a página personalizada.
- [ ] Verificar Response Header Transform Rules: páginas públicas sem `X-Robots-Tag: noindex`; 404 com noindex no HTML. HTML em `text/html`, sitemap em XML, robots em texto, VTT e vídeos com MIME correto.
- [ ] Conferir Jekyll `exclude` após o build de produção: `/src/`, `/docs/`, `/scripts/`, testes, dependências e arquivos de configuração não devem ser publicados. O servidor local simula isso; o build remoto continua dependendo do Pages.
- [ ] Manter cache curto/revalidável para HTML, robots e sitemap. Evitar regras que guardem desafios, 403 ou 404 por períodos longos. Invalidar os arquivos alterados após publicação.
- [ ] O novo `/assets/site-<hash>.js` permite cache longo; só usar `immutable` em recursos com versão no nome. Imagens/fontes existentes sem hash devem continuar revalidáveis. Testar navegação com cache quente e recarregamento depois de nova versão. Não atribuir cache de assets ao HTML.
- [ ] Preservar compactação da hospedagem, verificar Brotli/gzip na borda quando disponível. Revisar Rocket Loader e transformações de JS se interferirem nos widgets ou na medição; qualquer ajuste deve ser específico e validado, sem desligar segurança globalmente.

## OAI-SearchBot e segurança

[Documentação oficial da OpenAI](https://developers.openai.com/api/docs/bots) distingue OAI-SearchBot (busca) de GPTBot (treinamento). O arquivo local libera explicitamente OAI-SearchBot, Googlebot e Bingbot e preserva o grupo wildcard anterior. Nenhuma política de GPTBot/treinamento foi alterada.

- [ ] Em AI Crawl Control e nas políticas de AI Crawler and Agent access, conferir a política **Search** e o OAI-SearchBot. Preservar as escolhas existentes para Training e outros agentes. A [referência oficial de bots](https://developers.cloudflare.com/ai-crawl-control/reference/bots/) identifica OAI-SearchBot como AI Search.
- [ ] Conferir Bot Preference Sync/robots gerenciado. Cloudflare pode acrescentar diretivas ao arquivo da origem conforme as políticas do painel; comparar o `robots.txt` final entregue com o arquivo versionado. Não desativar ou sobrescrever restrições de treinamento. Ver [robots gerenciado](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/).
- [ ] Em Security Events, filtrar host, caminho, horário, user-agent e regra que produziu bloqueio ou desafio. Investigar 403/429, desafios JS e bloqueios por geolocalização também para sitemap e robots.
- [ ] Validar a identidade do crawler, não só a string de user-agent. A consulta oficial a [searchbot.json](https://openai.com/searchbot.json) foi feita em 03/11/2026; a resposta consultada trouxe `creationTime: 2026-01-02T11:00:00.000000`. **Reconsultar antes de criar qualquer regra por IP**, usando todos os prefixos atuais IPv4/IPv6 retornados. Nenhuma allowlist estática foi adicionada ao código.
- [ ] Se houver falso positivo comprovado, criar exceção limitada ao crawler verificado, host público, GET/HEAD e regra responsável. Não usar bypass baseado somente em user-agent e não desabilitar WAF, rate limiting ou proteção de bots globalmente. Validar disponibilidade da opção no plano contratado.
- [ ] Confirmar acesso nos logs de requisições reais. Um `curl -A OAI-SearchBot` vindo de outra rede testa somente o tratamento do header; não prova a verificação de IP nem a ausência de bloqueio para o bot real.

## Validação após publicação autorizada

```bash
npm run build
npm test
npm run audit:prod
npm run test:prod -- --workers=2
curl -I https://vipdesk.com.br/
curl -I http://www.vipdesk.com.br/crm-whatsapp/
curl -I https://vipdesk.com.br/uma-rota-inexistente/
curl -sS https://vipdesk.com.br/robots.txt
curl -sS https://vipdesk.com.br/sitemap.xml
```

Conferir também uma URL de artigo, seu `lastmod` e a nova URL do JS. Os testes de navegador simulam integrações comerciais; confirmar manualmente formulário e chat no ambiente publicado, sem tratar o teste simulado como prova do serviço externo. Não há garantia de indexação, posicionamento ou citação por assistentes.
