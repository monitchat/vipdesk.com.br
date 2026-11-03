# Mensuração de SEO, GEO e AEO

03/11/2026. A instrumentação existente foi preservada; não houve acesso aos painéis, cadastro de propriedades ou métricas inventadas.

## Instrumentação observada

GA4 `G-5L7TXDVM7T` em `src/config.mjs`, carregamento assíncrono e um `config` por página. `cta_click` registra `cta_type`, `cta_location` e `link_url`. Em português, o CTA leva ao formulário existente; em inglês, ao e-mail comercial enquanto não houver agenda configurada.

`generate_lead` já existe: observa a confirmação `.vd-msg-ok` após submit do formulário. Preservamos esse contrato e adicionamos testes para falha, sucesso e reenvio. Uma mudança no widget externo pode exigir revisão do seletor; o contrato é validado com fixture, não com envio de lead real. `form_id` e `lead_source` não contêm campos digitados.

`app_access` é acesso à plataforma, não aquisição comprovada; `demo_request` é intenção, não agendamento confirmado. `trial_start` só existe quando `trialUrl` for configurada. Não adicionar evento de cadastro concluído sem uma confirmação real na aplicação.

## Ações nos painéis — PENDENTES

1. Verificar uma propriedade de domínio `vipdesk.com.br` no Google Search Console por DNS. Confirmar propriedades existentes antes de criar outra. Enviar `https://vipdesk.com.br/sitemap.xml` e inspecionar home, solução, blog e artigo, conferindo canonical declarado/escolhido e HTML renderizado.
2. Verificar/importar o site no Bing Webmaster Tools, enviar o mesmo sitemap e usar inspeção de URL. Acompanhar problemas de rastreamento e indexação. Não gerar chaves ou tokens fictícios no repositório.
3. No GA4, confirmar propriedade e fluxo, vincular Search Console se autorizado, configurar dimensões de evento `cta_type`, `cta_location`, `form_id`, `lead_source`. Avaliar `generate_lead` como evento-chave; manter cliques separados de leads confirmados.
4. Definir filtro de tráfego interno e validar DebugView. Os testes automatizados e o script de performance bloqueiam analytics para evitar visitas sintéticas. Conferir também robôs e outras fontes de tráfego inválido nos relatórios.
5. Registrar baseline real de 28 dias antes do deploy e guardar a data da publicação. Comparar janelas equivalentes, segmentando idioma, página de entrada e dispositivo. Mudanças sazonais e outras campanhas podem explicar variações; não atribuir causalidade automática ao SEO.

## KPIs e rotina

| KPI | Fonte / cálculo | Frequência e interpretação |
| --- | --- | --- |
| URLs indexadas e exclusões | Search Console e Bing; inspecionar URLs do sitemap | Semanal; sitemap enviado não significa indexação |
| Cliques e impressões orgânicos | Desempenho de pesquisa, por URL e consulta | Semanal e janela de 28 dias; separar marca e não marca |
| CTR | Cliques / impressões, sem misturar fontes | Revisar consultas e intenção antes de mudar títulos |
| Posição média | Search Console por consulta/dispositivo | Contexto diagnóstico; não promessa de ranking |
| Sessões e páginas de entrada orgânicas | GA4, canal Organic Search e origem/mídia de sessão | Semanal; diferenciar aquisição da sessão e do primeiro usuário |
| Páginas mais acessadas | Visualizações, sessões de entrada e engajamento | Mensal; separar `/en/`, blog e soluções |
| Intenção comercial | `cta_click` por tipo e localização | Semanal; não contar como venda ou lead confirmado |
| Leads orgânicos | `generate_lead` de sessões orgânicas | Semanal; validar duplicidades, qualidade e confirmação comercial |
| Taxa de conversão orgânica | Sessões orgânicas com lead / sessões orgânicas | Usar sessões únicas, não dividir número bruto de reenvios |
| Referências de assistentes | GA4 origem/mídia e landing page | Comparar referrals identificáveis, sem presumir toda visita direta como IA |
| CWV | Search Console/CrUX, se houver amostra suficiente | Mensal, p75 por dispositivo; laboratório não substitui campo |
| Saúde técnica | `npm test`, `npm run audit:prod`, logs HTTP | A cada deploy e após mudanças de borda |

Para referências de IA, começar pelos domínios efetivamente encontrados (por exemplo, `chatgpt.com`, `chat.openai.com`, `perplexity.ai`, `claude.ai`, `copilot.microsoft.com`) e parâmetros UTM recebidos. Não modificar URLs internas com UTM para medir navegação, pois isso pode distorcer aquisição. Referrer pode ser removido por privacidade, apps ou redirecionamentos: ausência de referência não demonstra ausência de tráfego de IA. Bing não deve ser integralmente classificado como Copilot.

## Revisão de conteúdo e conversão

Mensalmente, cruzar páginas com impressões e baixo CTR, consultas que o texto não responde, cliques comerciais e leads qualificados. Atualizar respostas e exemplos onde houver lacuna real. O plano editorial tem dez pautas ainda não publicadas: usar dados observados para priorizar, sem criar páginas apenas por quantidade.

Não usar posição ou recomendação no ChatGPT como critério de aceite. Perguntas manuais em assistentes podem ajudar a descobrir lacunas, mas os resultados variam e não constituem medição estável de participação de mercado.

## Fontes e privacidade

- [Search Console: começar a usar](https://developers.google.com/search/docs/monitor-debug/search-console-start).
- [Google: dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- [Bing Webmaster Tools](https://www.bing.com/webmasters/about).
- [Web Vitals](https://web.dev/articles/vitals): LCP, INP e CLS em dados de campo; o script local oferece diagnóstico limitado.

Consentimento e política de privacidade do analytics continuam sujeitos às decisões já registradas em `ANALYTICS.md`. Nenhuma política de consentimento foi alterada neste trabalho. Não enviar e-mail, telefone, mensagem do formulário ou outros dados pessoais em eventos de medição.
