# Versão em inglês e mercado dos EUA — VipDesk

Data: 12/10/2026.

## 1. O que foi feito

O site passou a ser **bilíngue**. O português continua na raiz (`/`) e o inglês fica em `/en/`,
com as mesmas 13 páginas indexáveis.

| Português | Inglês | Palavra-chave principal (EN, hipótese) |
| --- | --- | --- |
| `/` | `/en/` | omnichannel customer service platform |
| `/sistema-atendimento-whatsapp/` | `/en/whatsapp-customer-service/` | WhatsApp customer service software; shared WhatsApp inbox |
| `/crm-whatsapp/` | `/en/whatsapp-crm/` | WhatsApp CRM |
| `/atendimento-omnichannel/` | `/en/omnichannel-customer-service/` | omnichannel customer service |
| `/automacao-atendimento/` | `/en/customer-service-automation/` | customer service automation |
| `/agendamento-whatsapp/` | `/en/whatsapp-appointment-scheduling/` | WhatsApp appointment scheduling |
| `/inteligencia-artificial-atendimento/` | `/en/ai-customer-service/` | AI for customer service |
| `/blog/` | `/en/blog/` | — |
| `/blog/whatsapp-varios-atendentes/` | `/en/blog/whatsapp-team-inbox/` | WhatsApp multiple agents / team inbox |
| `/blog/tempo-de-primeira-resposta/` | `/en/blog/first-response-time/` | first response time |
| `/blog/integrar-atendimento-e-funil-de-vendas/` | `/en/blog/connect-customer-service-and-sales-pipeline/` | customer service and sales pipeline |
| `/terms/` | `/en/terms/` | — |
| `/privacy/` | `/en/privacy/` | — |

Volumes e dificuldade das palavras-chave **não foram medidos** (sem acesso a Keyword Planner,
Semrush ou Ahrefs). Valide antes de investir em conteúdo novo.

### Decisões técnicas

- **Por que `/en/` e não substituir o português:** substituir derrubaria o tráfego brasileiro
  (hoje praticamente todo o tráfego orgânico) e a homepage usada na verificação OAuth do Google
  (ver README).
- **hreflang:** cada página declara a si mesma e a sua tradução (`pt-BR` e `en`), de forma
  recíproca. `x-default` aponta para o inglês, a versão mais útil para quem não fala nenhum dos
  dois idiomas. Testado em `tests/static/seo.test.mjs`.
- **Slugs em inglês** (`/en/whatsapp-crm/`), porque as palavras da URL também são lidas por quem
  busca em inglês.
- **Canonical próprio** em cada idioma. Nunca aponta para a outra língua.
- **Seletor de idioma** no cabeçalho, no menu mobile e no rodapé, levando à página equivalente,
  não à home.
- **Interface traduzida** por um dicionário único (`src/i18n.mjs`): menus, botões, breadcrumbs,
  datas ("October 12, 2026"), assunto e corpo do e-mail de demonstração (o corpo em inglês pede
  país e fuso horário).
- **Open Graph:** `og:locale` `en_US` e imagem de compartilhamento em inglês
  (`assets/og-vipdesk-en.png`).
- **JSON-LD:** `inLanguage` e a descrição do produto no idioma da página.
- **404:** o GitHub Pages serve um único `404.html`, por isso ele é bilíngue.
- **Sitemap:** 26 URLs (13 por idioma).

### Adaptações de conteúdo para os EUA (sem inventar nada)

- Os fatos são os mesmos da versão em português. Nenhum recurso novo foi anunciado.
- **Conformidade:** só se cita a LGPD brasileira. **Não** há alegação de CCPA, GDPR, HIPAA, SOC 2
  etc., porque nada disso foi verificado.
- **Saúde:** o exemplo "clínicas" virou "appointment-based businesses" / "consultants and
  professional services". Anunciar para clínicas nos EUA implicaria HIPAA (inclusive BAA), que não
  foi verificado.
- **Identidade:** a empresa aparece claramente como brasileira (CNPJ, endereço em Linhares, ES,
  Brasil), o que é transparente e evita expectativas falsas.
- **Risco da conexão por QR Code:** mantido em inglês, como na versão em português.
- **Textos jurídicos:** traduzidos integralmente, com um aviso de que a versão em português
  prevalece. **Esse aviso é uma decisão jurídica** e precisa ser aprovado (ver pendências).

## 2. Riscos de negócio que precisam de decisão antes de investir nos EUA

### 2.1 Marca: "VIPdesk Connect" já atua nos EUA, no mesmo ramo (ALTO)

A VIPdesk Connect é uma empresa americana de atendimento ao cliente terceirizado (omnichannel,
"full AI and assisted AI solutions"), com origem em 1997 segundo fontes públicas. É o mesmo
segmento do VipDesk. Isso traz:

- risco de **conflito de marca** (*trademark*) ao comercializar "VipDesk" nos EUA;
- **confusão nas buscas**: a busca "vipdesk" em inglês tende a mostrar a empresa americana. A
  consulta "vipdesk connect" já aparece na Search Console (1 impressão).

**Recomendação:** antes de investir em mídia ou conteúdo nos EUA, consultar um advogado de marcas
e fazer uma busca no USPTO (TESS). Se houver conflito, avaliar um nome para o mercado americano.
Esta tradução foi feita de forma que trocar o nome exija mudanças concentradas em `src/`.

Fontes: [VIPdesk Connect (Bright Pattern)](https://www.brightpattern.com/wp-content/uploads/2019/04/VIPdesk-Connect.pdf),
[InsuranceNewsNet](https://insurancenewsnet.com/oarticle/Aspire-Lifestyles-Announces-Spin-Off-of-Customer-Service-Business-To-VIPdesk-Con-a-510573),
[Top Workplaces](https://topworkplaces.com/company/vipdesk-connect-inc/washington-dc/).

### 2.2 Domínio `.com.br` (MÉDIO)

O Google trata domínios de código de país (ccTLD) como direcionados àquele país. `vipdesk.com.br`
sinaliza Brasil, e não é possível mudar o país-alvo de um ccTLD na Search Console. O `/en/` com
hreflang ajuda quem busca em inglês, mas **competir nos EUA com `.com.br` tende a ser mais
difícil**.

**Recomendação:** se os EUA forem prioridade, avaliar um domínio genérico (ex.: `.com`) para a
versão em inglês. A arquitetura atual permite migrar o `/en/` com redirecionamentos 301 por página.

### 2.3 Prontidão do produto para clientes americanos (BLOQUEANTE para vender)

Não verificável a partir deste repositório. Precisa de confirmação **antes** de atrair leads:

- [ ] A aplicação (`app.vipdesk.com.br`) tem interface em inglês?
- [ ] Cobrança em dólar e cartão internacional? (Os Termos citam boleto, PIX e cartão, e o
      excedente de armazenamento está em reais.)
- [ ] Suporte e vendas em inglês e no fuso horário dos EUA? O e-mail `comercial@vipphone.com.br`
      será respondido em inglês?
- [ ] Telefonia funciona com números dos EUA? (A página só diz "phone", sem detalhes.)
- [ ] O WhatsApp é relevante para o cliente-alvo? Nos EUA o uso é menor que no Brasil. Os públicos
      mais prováveis são empresas que atendem clientes latino-americanos ou internacionais. SMS não
      é anunciado porque não consta como recurso.
- [ ] Conformidade exigida pelos compradores americanos (CCPA/CPRA para dados da Califórnia; HIPAA
      se houver saúde; questionários de segurança/SOC 2 em vendas B2B).

### 2.4 Jurídico (ALTO)

- [ ] Aprovar as traduções de `/en/terms/` e `/en/privacy/` e o aviso de que o português prevalece.
- [ ] Avaliar se Termos regidos pela lei brasileira, com foro em Linhares/ES, são aceitáveis para
      clientes americanos, ou se haverá contrato específico.
- [ ] Avaliar a necessidade de avisos de privacidade específicos dos EUA (ex.: CCPA/CPRA).
- [ ] Nome do Encarregado (DPO): o campo segue vazio no original em português. Na versão em inglês
      a frase foi redigida sem o nome ("contact our Data Protection Officer at
      dpo@vipphone.com.br"), sem inventar dados.

## 3. Como editar e acrescentar traduções

- Textos de interface: `src/i18n.mjs`.
- Soluções e menu por idioma: `src/navigation.mjs` (o campo `key` liga as traduções).
- Páginas em inglês: `src/pages/en/`. Artigos em inglês: `src/pages/blog/en/`. Textos jurídicos:
  `src/pages/legal/*.en.body.html`.
- Toda página indexável precisa de uma `key` igual à da sua tradução. O teste
  "versões traduzidas são completas" falha se faltar a página equivalente em algum idioma.
- Depois de editar: `npm run build && npm test`.

## 4. Medição

- **Search Console:** a propriedade de domínio cobre `/en/`. Filtre por página `/en/` e por país
  "Estados Unidos" e acompanhe impressões de consultas em inglês.
- Para separar idiomas no GA4, filtre pelo caminho da página com prefixo `/en/` (ou pela dimensão de idioma). Os eventos
  `cta_click` são associados à página em que ocorreram.
- **Expectativa realista:** sem histórico, sem backlinks em inglês e com `.com.br`, a indexação e
  as primeiras impressões em inglês podem levar semanas. Nada aqui garante ranking.

## 5. Próximos passos sugeridos (em ordem)

1. Resolver 2.1 (marca) e 2.3 (prontidão do produto). Sem isso, tráfego dos EUA não vira cliente.
2. Aprovação jurídica das traduções (2.4).
3. Revisão do texto em inglês por um falante nativo do setor (tom de vendas B2B americano).
4. Decidir o domínio (2.2).
5. Só então: conteúdo em inglês voltado aos casos de uso confirmados nos EUA e busca de backlinks
   em inglês (diretórios de software como G2/Capterra exigem dados reais da empresa).
