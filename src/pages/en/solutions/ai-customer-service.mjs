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
  title: 'AI for Customer Service, with Agents in Control | VipDesk',
  description:
    'Use AI to support triage, summarize conversations, suggest replies and classify opportunities in VipDesk, while your team makes the final call.',
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
      a: `<p>In VipDesk, AI works as support for your team: it suggests replies, and the agent reviews
        them and decides what to send.</p>`,
    },
    {
      q: 'Does VipDesk have a chatbot?',
      a: `<p>The focus of VipDesk's AI is helping agents with triage, summaries, reply suggestions and
        opportunity classification. If you need a specific automated flow, walk our sales team through
        your scenario during the demo.</p>`,
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
  related: ['/en/customer-service-automation/', '/en/whatsapp-customer-service/', '/en/whatsapp-crm/'],
  cta: {
    title: 'See AI helping your team',
    text: 'Book a demo and see summaries and reply suggestions on conversations similar to yours.',
  },
});
