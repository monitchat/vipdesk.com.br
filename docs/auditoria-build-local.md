# Auditoria de SEO — build local (emulação do GitHub Pages)

Gerado em 2026-10-11T13:02:14.003Z por `scripts/audit.mjs`. HTML analisado como recebido do servidor (sem JavaScript).

Resumo: 13 URLs rastreadas, 13 no sitemap · P0: 0 · P1: 0 · P2: 1 · P3: 0

## robots.txt e sitemap

| Item | Resultado |
| --- | --- |
| robots.txt | HTTP 200; Sitemap: https://vipdesk.com.br/sitemap.xml |
| sitemap.xml | HTTP 200; bem formado: sim; URLs: 13 |

## Matriz de URLs

| URL | HTTP | Title | Description | H1 | Canonical | Indexável | Problemas | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | 200 | VipDesk \| Plataforma de Atendimento Omnichannel, CRM e IA | 141 car. | Plataforma de atendimento omnichannel com WhatsApp, CRM e inteligência artificial | própria | sim | — | — |
| /sistema-atendimento-whatsapp/ | 200 | Sistema de Atendimento WhatsApp para Equipes \| VipDesk | 144 car. | Sistema de atendimento pelo WhatsApp para equipes com vários atendentes | própria | sim | — | — |
| /crm-whatsapp/ | 200 | CRM para WhatsApp: Funil, Leads e Propostas \| VipDesk | 145 car. | CRM para WhatsApp: do primeiro contato ao contrato fechado | própria | sim | — | — |
| /atendimento-omnichannel/ | 200 | Plataforma de Atendimento Omnichannel \| VipDesk | 146 car. | Plataforma de atendimento omnichannel: todos os canais numa fila só | própria | sim | — | — |
| /automacao-atendimento/ | 200 | Automação de Atendimento ao Cliente e SLA \| VipDesk | 140 car. | Automação de atendimento ao cliente sem perder o toque humano | própria | sim | — | — |
| /agendamento-whatsapp/ | 200 | Agendamento pelo WhatsApp com Lembretes \| VipDesk | 139 car. | Agendamento pelo WhatsApp com confirmação, lembretes e agenda integrada | própria | sim | — | — |
| /inteligencia-artificial-atendimento/ | 200 | Inteligência Artificial no Atendimento \| VipDesk | 143 car. | Inteligência artificial no atendimento, com o atendente no controle | própria | sim | — | — |
| /blog/ | 200 | Blog VipDesk: Atendimento, WhatsApp e Vendas | 122 car. | Blog do VipDesk | própria | sim | — | — |
| /blog/whatsapp-varios-atendentes/ | 200 | Como Organizar o Atendimento no WhatsApp com Vários Atendentes | 148 car. | Como organizar o atendimento pelo WhatsApp com vários atendentes | própria | sim | — | — |
| /blog/tempo-de-primeira-resposta/ | 200 | Como Reduzir o Tempo de Primeira Resposta no Atendimento | 152 car. | Como reduzir o tempo de primeira resposta no atendimento | própria | sim | — | — |
| /blog/integrar-atendimento-e-funil-de-vendas/ | 200 | Como Integrar o Atendimento ao Funil de Vendas | 141 car. | Como integrar o atendimento ao funil de vendas | própria | sim | — | — |
| /terms/ | 200 | Termos de Uso — VipDesk | 136 car. | Termos de Uso e Condições de Serviço | própria | sim | — | — |
| /privacy/ | 200 | Política de Privacidade — VipDesk | 117 car. | Política de Privacidade e Proteção de Dados | própria | sim | P2 Nome do Encarregado (DPO) vazio | P2 |

## Variações de URL e 404

| Caso | URL | Resultado | Esperado |
| --- | --- | --- | --- |
| URL inexistente | /__auditoria-seo-inexistente-1791723733972/ | 404 | 404 |
| Sem barra final | /crm-whatsapp | 301→200 /crm-whatsapp/ | 301 → /crm-whatsapp/ |
| Com parâmetros | /crm-whatsapp/?utm_source=auditoria&ref=x | 200, canonical https://vipdesk.com.br/crm-whatsapp/ | 200, canonical https://vipdesk.com.br/crm-whatsapp/ |
| HTTP/HTTPS e www | - | NÃO VERIFICADO (só em produção: SEO_BASE_URL=https://vipdesk.com.br) | 301 → https://vipdesk.com.br |

## CTAs encontrados (tipo | texto | destino → ocorrências)

- app_access \| Acessar a plataforma \| https://app.vipdesk.com.br → 39
- demo_request \| Agendar demonstração \| mailto:comercial@vipphone.com.br → 18
- contact_click \| Falar com especialista \| mailto:comercial@vipphone.com.br → 18
- contact_click \| comercial@vipphone.com.br \| mailto:comercial@vipphone.com.br → 24

## Links externos

| Destino | HTTP | Origem |
| --- | --- | --- |
| https://app.vipdesk.com.br/ | NÃO VERIFICADO (ENOTFOUND) | /, /sistema-atendimento-whatsapp/, /crm-whatsapp/ |
| https://developers.google.com/terms/api-services-user-data-policy | NÃO VERIFICADO (ENOTFOUND) | /privacy/ |
| https://myaccount.google.com/permissions | NÃO VERIFICADO (ENOTFOUND) | /privacy/ |

## Comparação com o repositório

- Title, H1 e description de todas as rotas do repositório conferem com o ambiente.

## Problemas

| URL | Problema | Evidência | Prioridade |
| --- | --- | --- | --- |
| /privacy/ | Nome do Encarregado (DPO) vazio | Encarregado (DPO): . | P2 |
