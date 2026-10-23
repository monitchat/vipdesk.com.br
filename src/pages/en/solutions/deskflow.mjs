// Intent: "visual flow builder / visual process automation for customer service and CRM".
// English counterpart of /deskflow/. Same verified facts as the Portuguese page.
import { landingPage } from '../../../lib/landing.mjs';
import { html } from '../../../lib/html.mjs';
import { list, steps, cards as cardsIn, demoButton, contactButton } from '../../../lib/components.mjs';
import { editorImage, dialogImage, paletteImage, demoVideo, videoObject, deskflowText } from '../../../lib/deskflow.mjs';

const lang = 'en';
const cards = (items) => cardsIn(items, lang);
const t = deskflowText(lang);
// Três painéis lado a lado (a grade de cards acomoda 3 colunas; .duas só 2).
const trio = (items) => html`<div class="grade">${items.map((p) => html`<div class="painel"><h3>${p.title}</h3>${list(p.list)}</div>`)}</div>`;
const ctas = (location) => html`<div class="acoes-inline">${demoButton(location, lang, 'btn-primario')}${contactButton(location, lang, 'btn-linha')}</div>`;

const page = landingPage({
  lang,
  path: '/en/deskflow/',
  title: 'DeskFlow: WhatsApp Flow Automation and AI | VipDesk',
  description:
    'WhatsApp flow automation with DeskFlow, VipDesk’s visual editor: a chatbot with menus, AI agents, conditions, CRM actions and API integrations, no code.',
  h1: 'DeskFlow: WhatsApp flow automation and AI, without coding',
  lead: `Build your WhatsApp chatbot and the processes around it in VipDesk’s visual flow builder: menus,
    data capture, AI agents, lookups in other systems and actions in the CRM and on tickets, with a
    hand-off to your team when a person is needed. No code required.`,
  sections: [
    {
      id: 'editor',
      title: 'A visual editor to automate WhatsApp flows',
      intro: `Each flow is a diagram: blocks are the steps (send a message, ask a question, query a
        system, create a deal) and arrows are the transitions, with or without a condition. What is on
        the canvas is exactly what runs on your channels.`,
      content: html`
        <figure class="moldura">${editorImage(lang, { eager: true })}</figure>
        <p class="legenda">${t.editorCaption}</p>
        <div class="grade" style="margin-top:36px">
          ${cards([
            { title: 'Drag, connect, configure', text: 'Component palette by category, block search, zoom, minimap, undo and redo, copy and paste, groups and sticky notes on the canvas.' },
            { title: 'Draft and publish', text: 'Changes stay in a draft with auto-save. You publish when you are ready and can roll back to a previous version from the history.' },
            { title: 'Test before activating', text: 'Playground with simulated sessions, one-off tests of API calls, a visible conversation context and execution logs per flow.' },
            { title: 'Organization and teamwork', text: 'Folders, a trash with restore, JSON export and import, comments on the flow and an indicator of who is editing.' },
          ])}
        </div>
        ${ctas('deskflow_editor')}`,
    },
    {
      id: 'triggers-conditions-actions',
      title: 'Triggers, conditions and actions',
      intro: 'Every flow starts with a trigger, picks its path with conditions and runs actions on your channels, inside VipDesk or in other systems.',
      content: html`
        ${trio([
          {
            title: 'Triggers: what starts the flow',
            list: [
              '<strong>Incoming message</strong> on a channel connected to VipDesk, such as WhatsApp. The flow replies on the same channel.',
              '<strong>Schedule:</strong> runs at an interval, daily or weekly, with a time window, weekend, holiday and specific-date blocking, for a list of numbers, a contact group or a CSV file.',
              '<strong>API call:</strong> another system starts the flow for a given number, passing context data.',
            ],
          },
          {
            title: 'Conditions: where the conversation goes',
            list: [
              '<strong>If/else</strong> with equality, comparison, “contains”, “exists”, list and regular-expression operators on any conversation data.',
              '<strong>Conditions on the arrow itself:</strong> equals, contains, context value, positive answer, digits only or regex, with no extra block.',
              '<strong>Numbered menu</strong> and, optionally, an AI that picks the option when the customer writes in their own words.',
            ],
          },
          {
            title: 'Actions: what the flow does',
            list: [
              'Text messages, buttons, lists, media and approved WhatsApp templates.',
              'Data capture and validation (name, ID number, number, email) stored as conversation variables.',
              'Variables and expressions in any field, with built-in helpers for dates, currency, text and lists; loops over lists and pauses of up to 5 minutes.',
              'Actions inside VipDesk, lookups in other systems and AI agents, described below.',
            ],
          },
        ])}`,
    },
    {
      id: 'api-integration',
      title: 'System integration through APIs',
      intro: 'The HTTP request block reads and writes data in ERPs, e-commerce platforms, internal systems and any service with an API, and the response becomes a variable for the next steps.',
      content: html`
        <div class="lado-a-lado">
          <div class="texto">
            ${list([
              '<strong>GET, POST, PUT, PATCH and DELETE</strong> with headers, query parameters and a body built from flow variables.',
              '<strong>Authentication</strong> with a Bearer token, username and password, an API key in a header or in the URL, a session with automatic login, or a token fetched from a login endpoint.',
              '<strong>Response in context:</strong> pick the response field (for example <code>items[0].price</code>) and use it in the following messages and conditions. Separate success and error outputs.',
              '<strong>Stored credentials</strong> kept as encrypted secrets, referenced by name, never written into the flow.',
              '<strong>Failure alerts</strong> sent to a webhook when an integration starts failing.',
              '<strong>Data sources and knowledge base:</strong> import records through an API, CSV spreadsheets or Google Drive files for the AI to consult during conversations.',
            ])}
            <p style="margin-top:20px">For developers, there are custom blocks in Python run in an isolated sandbox, and connections to MCP servers that expose tools to the AI agents.</p>
            ${ctas('deskflow_integracoes')}
          </div>
          <div>
            <div class="painel">
              <h3>Example: order lookup</h3>
              <p>The customer types the order number. The flow calls your system’s API with that number, stores the status in a variable and replies “Your order is ${'${{order.status}}'} and ships on ${'${{order.eta}}'}”. If the API fails, the error output hands the conversation to an agent.</p>
            </div>
          </div>
        </div>`,
    },
    {
      id: 'vipdesk-nodes',
      title: 'VipDesk-specific blocks',
      intro: 'Beyond messages and integrations, the flow acts directly on your operation: tickets, CRM, calendar, payments, Kanban and telephony, without copying data between screens.',
      content: html`
        <div class="lado-a-lado invertido">
          <div>
            <figure class="moldura estreita">${paletteImage(lang)}</figure>
            <p class="legenda">“Customer service” category of the component palette (the editor’s interface is in Portuguese).</p>
          </div>
          <div>
            ${cards([
              { title: 'Tickets and team', text: 'Transfer to a department (with distribution across agents), change the ticket status and owner, apply tags to the contact and the ticket, hand the conversation to another flow.' },
              { title: 'Sales CRM', text: 'Create a deal in the pipeline with title, value and source filled from the conversation; move the deal to another stage or pipeline when the customer advances.' },
              { title: 'Calendar and Kanban', text: 'Create an appointment in VipDesk’s calendar (professional, service and time) and open or move Kanban cards for tasks that need follow-up.' },
              { title: 'Payments and telephony', text: 'Generate a payment link or Pix charge through the payment provider configured in VipDesk and check whether it was paid; place a call with a recorded audio or connect the agent to the customer.' },
            ])}
            <figure class="moldura" style="max-width:380px;margin-top:28px">${dialogImage(lang)}</figure>
            <p class="legenda">Settings of the “Create deal (CRM)” block: title, value and source accept conversation variables.</p>
          </div>
        </div>`,
    },
    {
      id: 'ai',
      title: 'AI on WhatsApp: agents that talk and take action',
      intro: 'An AI agent on WhatsApp talks to the customer, looks up data and takes action within the limits you set in the flow. You use your own provider’s API key (OpenAI, Google Gemini or Anthropic).',
      content: cards([
        { title: 'AI agent with tools', text: 'A free-conversation block with your instructions and tools it can call: query an API, search the knowledge base, create a deal, apply a tag, book an appointment, generate a payment link or hand off to a human.' },
        { title: 'Intent classification', text: 'The AI routing block reads the message and picks one of the outputs you defined (“duplicate invoice”, “support”, “cancel”), with a fallback reply.' },
        { title: 'Knowledge base', text: 'Imported documents and records become grounded answers: the AI replies only from your company’s material.' },
        { title: 'Audio and images', text: 'Automatic transcription of incoming voice messages and image reading by the agent, so the flow understands what the customer sent.' },
      ]),
    },
    {
      id: 'examples',
      title: 'Examples of WhatsApp flow automation',
      intro: 'Three flows built only with the blocks described on this page.',
      content: html`
        ${steps([
          {
            title: 'Customer service: a menu with AI only when needed',
            text: `The customer writes on WhatsApp. The flow greets them by name, offers a numbered menu and,
              if the person replies in free text, the AI picks the option. Simple lookups are answered
              through an API; outside business hours, a condition on the current time says so and logs
              the request; during business hours, it transfers to the right department with distribution
              across agents.`,
          },
          {
            title: 'CRM: from first contact to the sales rep',
            text: `The flow asks for name, product of interest and timeline. With the answers, it creates
              the deal in the pipeline with title and value filled in, applies the source tag and hands the
              conversation to the sales team. When the customer confirms the proposal in another
              conversation, another flow moves the deal to the next stage and generates the payment link.`,
          },
          {
            title: 'Tickets: status, owner and escalation',
            text: `A customer reports a problem. The flow collects the details, applies the tag for the type
              of issue, changes the ticket status and delivers it to the responsible department. If the
              field-service API confirms a visit, the flow shares the date; if it does not respond, it
              escalates to a manager by transfer. SLA deadlines and expiry alerts remain with
              <a href="/en/customer-service-automation/">VipDesk’s native automation rules</a>.`,
          },
        ])}
        ${ctas('deskflow_exemplos')}`,
    },
    {
      id: 'video',
      title: 'See DeskFlow in action',
      intro: 'Just over twenty seconds in the editor: the demo flow, the settings of a CRM block, the customer service component palette and an AI agent.',
      content: html`
        ${demoVideo(lang)}
        <p class="legenda">Recording of the editor with a demo flow and no customer data. The video has no audio; the captions describe each step. The editor’s interface is in Portuguese.</p>`,
    },
  ],
  faqs: [
    {
      q: 'Is DeskFlow a separate product from VipDesk?',
      a: `<p>No. DeskFlow is VipDesk’s visual automation engine and opens inside the platform with the
        same login. Flows act on the channels, tickets, CRM and calendar of your account.</p>`,
    },
    {
      q: 'Can I build a WhatsApp chatbot with DeskFlow?',
      a: `<p>Yes. The flow starts when a message arrives on a WhatsApp number connected to VipDesk and
        replies on the same channel: menus with options, buttons and lists, data capture, lookups in
        other systems and, when a person is needed, a transfer to the right department with the
        history. The chatbot and <a href="/en/whatsapp-customer-service/">human customer service</a>
        share the same queue. See the step by step in
        <a href="/en/blog/whatsapp-chatbot-without-coding/">how to build a WhatsApp chatbot without
        coding</a>.</p>`,
    },
    {
      q: 'How does AI work on WhatsApp?',
      a: `<p>In two ways. The AI routing block understands what the customer wrote and picks a path in
        the flow. The AI agent talks freely following your instructions and calls tools: search the
        knowledge base, query an API, create a CRM deal, book an appointment or hand off to an agent.
        The AI uses the API key of the provider your company chooses. More in
        <a href="/en/blog/ai-agent-for-whatsapp/">AI agent for WhatsApp: what it does and when to use
        it</a>.</p>`,
    },
    {
      q: 'Do I need to know how to code?',
      a: `<p>No. Flows are built by dragging and configuring blocks. Variables and conditions use a simple
        syntax with suggestions as you type. Developers can optionally create custom blocks in Python.</p>`,
    },
    {
      q: 'How is DeskFlow different from VipDesk’s automation rules?',
      a: `<p>The <a href="/en/customer-service-automation/">native rules</a> handle lead distribution,
        pipeline-stage follow-ups, SLA deadlines and escalation. DeskFlow is for processes you design:
        guided conversations, lookups in other systems, conditional decisions and chained actions in the
        CRM and on tickets. The two work together.</p>`,
    },
    {
      q: 'Can it integrate with my system?',
      a: `<p>Yes, through APIs. The HTTP request block makes GET, POST, PUT, PATCH and DELETE calls with
        token, username and password, API key or session authentication, and the response is available
        to the rest of the flow. Other systems can also start a flow through the API.</p>`,
    },
    {
      q: 'How do I test a flow before activating it?',
      a: `<p>In the playground, with simulated sessions and the conversation context visible, without
        messaging customers. API calls can be tested one at a time. Changes stay in a draft until you
        publish, and the history lets you roll back to a previous version.</p>`,
    },
    {
      q: 'Is artificial intelligence required?',
      a: `<p>No. A flow can be fully deterministic, with menus, conditions and integrations. The AI blocks
        are optional and use the API key of the provider your company chooses (OpenAI, Google Gemini or
        Anthropic).</p>`,
    },
    {
      q: 'Which channels does the flow reply on?',
      a: `<p>The channels connected to your VipDesk account. A flow is bound to the accounts it should act
        on, and each account belongs to one active flow at a time. Scheduled flows can also send messages
        to a list of numbers, a contact group or a CSV file.</p>`,
    },
  ],
  related: ['/en/customer-service-automation/', '/en/whatsapp-crm/', '/en/ai-customer-service/'],
  posts: ['/en/blog/whatsapp-chatbot-without-coding/', '/en/blog/ai-agent-for-whatsapp/', '/en/blog/connect-customer-service-and-sales-pipeline/'],
  cta: {
    title: 'See a flow built for your operation',
    text: 'In the demo, we design one of your team’s real processes with you in DeskFlow, from the trigger to the action in the CRM or on the ticket.',
  },
});

page.jsonLd.push(videoObject(lang, page.path));

export default page;
