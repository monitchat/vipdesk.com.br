// Intent: "AI for customer service". English counterpart of /inteligencia-artificial-atendimento/.
// As in Portuguese, only agent-assist AI is documented (triage, summaries, suggestions,
// classification). No autonomous chatbot is claimed — see docs/SEO-AUDIT.md (pending items).
import { landingPage } from '../../../lib/landing.mjs';
import { html } from '../../../lib/html.mjs';
import { steps, panels, cards as cardsIn } from '../../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'en');

export default landingPage({
  lang: 'en',
  path: '/en/ai-customer-service/',
  title: 'AI for Customer Service and WhatsApp | VipDesk',
  description:
    'AI in VipDesk: triage, summaries and reply suggestions for your team, plus AI agents on WhatsApp that talk to customers, query systems and hand off to humans.',
  h1: 'AI for customer service, with your agents in control',
  lead: `VipDesk's AI speeds up your team's work: it supports triage, summarizes long conversations,
    suggests replies and helps classify opportunities. Your agent still decides what is sent to the
    customer.`,
  sections: [
    {
      title: 'What AI does in VipDesk',
      content: cards([
        { title: 'Triage support', text: 'Helps understand what each contact is about so it reaches the right person faster.' },
        { title: 'Conversation summaries', text: 'Whoever picks up a conversation gets the context without reading the whole history.' },
        { title: 'Reply suggestions', text: 'A draft reply that the agent reviews, edits and decides whether to send.' },
        { title: 'Opportunity classification', text: 'Helps your sales team prioritize the opportunities in the pipeline.' },
      ]),
    },
    {
      title: 'How it works day to day',
      content: steps([
        {
          title: 'A contact comes in',
          text: 'AI supports triage, helping identify the topic and where the conversation should go.',
        },
        {
          title: 'An agent picks up a long conversation',
          text: 'Instead of scrolling through the whole history, they read a summary and get up to speed in seconds.',
        },
        {
          title: 'It’s time to reply',
          text: 'The platform suggests a reply. The agent reviews it, edits it if needed and sends it.',
        },
        {
          title: 'The conversation becomes an opportunity',
          text: 'Classification helps the sales team decide where to focus.',
        },
      ]),
    },
    {
      title: 'Why keep the agent in control',
      content: panels([
        {
          title: 'AI makes mistakes, and customers notice',
          text: `Language models can produce inaccurate replies or miss your company's tone. That's why,
            in VipDesk, a suggestion is a starting point reviewed by a person.`,
        },
        {
          title: 'Your company remains accountable',
          text: `Prices, deadlines, terms and promises to customers should be confirmed by whoever is
            responsible for them. AI speeds up writing; your team has the final word.`,
        },
      ]),
    },
    {
      id: 'agents',
      title: 'AI agents on WhatsApp with DeskFlow',
      intro: `Beyond assisting agents, VipDesk has AI agents that talk to customers on WhatsApp and take
        action, built in <a href="/en/deskflow/">DeskFlow</a>, the platform’s visual flow builder.`,
      content: cards([
        { title: 'Conversation with your instructions', text: 'You write what the agent does, its tone and its limits. It replies to the customer following those instructions and the recent conversation history.' },
        { title: 'Tools, not just text', text: 'The agent searches your company’s knowledge base, queries an API, creates the CRM deal, books an appointment, generates a payment link or applies tags.' },
        { title: 'Hand-off to a person', text: 'When the topic goes beyond what it can solve, the agent transfers to the right department, and the human agent receives the conversation with context.' },
        { title: 'Inside a flow', text: 'The agent is a block in the flow: deterministic menus and validations can come before it, and VipDesk actions after it. You use your own AI provider’s API key.' },
      ]),
    },
    {
      title: 'AI alongside automations',
      content: html`<div class="texto">
        <p>AI complements the platform's rules. <a href="/en/customer-service-automation/">Automations</a>
        handle what is predictable — distributing leads, chasing deadlines, sending follow-ups — while AI
        helps with the parts that require interpreting text, such as understanding and summarizing a
        conversation.</p>
        <p>The result is a team that spends less time reading and writing and more time solving and
        selling, in <a href="/en/omnichannel-customer-service/">omnichannel customer service</a> and in
        the <a href="/en/whatsapp-crm/">CRM</a>.</p>
      </div>`,
    },
  ],
  faqs: [
    {
      q: 'Does the AI reply to customers on its own?',
      a: `<p>It depends on how you set it up. As assistance, the AI suggests replies and the person
        decides what to send. In a DeskFlow flow, an AI agent can reply directly to the customer on
        WhatsApp, following your instructions, and hand off to your team when the topic goes beyond
        what it can solve.</p>`,
    },
    {
      q: 'Does VipDesk have a chatbot?',
      a: `<p>Yes. DeskFlow, VipDesk’s visual flow builder, builds the WhatsApp chatbot with menus,
        data capture, lookups in other systems and AI agents, and you define when the conversation
        goes to a human agent. Discover <a href="/en/deskflow/">DeskFlow</a> and see
        <a href="/en/blog/whatsapp-chatbot-without-coding/">how to build a WhatsApp chatbot without
        coding</a>.</p>`,
    },
    {
      q: 'What is the difference between assistive AI and an AI agent?',
      a: `<p>Assistive AI works for the agent: it summarizes, suggests and classifies, and the person
        decides what to send. An AI agent talks directly to the customer on WhatsApp inside a
        DeskFlow flow, with instructions, tools and a hand-off point to humans. Both can coexist in the
        same operation.</p>`,
    },
    {
      q: 'Does AI replace customer service agents?',
      a: `<p>No. It cuts the time spent reading and writing, but decisions about each conversation stay
        with your team.</p>`,
    },
    {
      q: 'What are conversation summaries for?',
      a: `<p>So that whoever takes over a conversation — at a shift change or a hand-off between teams,
        for example — quickly understands what has already been discussed, without reading the whole
        history.</p>`,
    },
  ],
  related: ['/en/deskflow/', '/en/customer-service-automation/', '/en/whatsapp-customer-service/'],
  posts: ['/en/blog/ai-agent-for-whatsapp/'],
  cta: {
    title: 'See AI helping your team',
    text: 'Book a demo and see summaries and reply suggestions on conversations similar to yours.',
  },
});
