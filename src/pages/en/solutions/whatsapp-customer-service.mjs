// Intent: "WhatsApp customer service software" / "shared WhatsApp inbox for teams".
// English counterpart of /sistema-atendimento-whatsapp/ (same verified facts).
import { landingPage } from '../../../lib/landing.mjs';
import { html } from '../../../lib/html.mjs';
import { list, steps, panels, cards as cardsIn } from '../../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'en');

export default landingPage({
  lang: 'en',
  path: '/en/whatsapp-customer-service/',
  title: 'WhatsApp Customer Service Software for Teams | VipDesk',
  description:
    'Run customer service on WhatsApp with multiple agents on one number: a shared queue, history per contact, SLA tickets and automations.',
  h1: 'WhatsApp customer service software for teams with multiple agents',
  lead: `Put your whole team on the same WhatsApp number, with a shared queue, each customer's full
    history, tickets with deadlines and conversations connected to your sales pipeline.`,
  sections: [
    {
      title: 'When your business WhatsApp becomes a bottleneck',
      intro: `Many customers prefer to reach businesses on WhatsApp, but a single shared phone was never
        built for a whole team. The symptoms are usually the same:`,
      content: list([
        'One phone passed from hand to hand, or several personal numbers speaking for the company.',
        'Conversations without an owner: two people answer the same customer, or nobody does.',
        'When an agent goes on vacation or leaves the company, the conversation history leaves too.',
        'Nobody knows how long a customer has been waiting or which requests are overdue.',
        'Quote requests get lost between messages and never reach the sales team.',
        'Managers can’t follow the operation without reading conversation after conversation.',
      ]),
    },
    {
      title: 'How VipDesk organizes conversations',
      intro: 'Every message follows a clear path, from first contact to resolution or sale.',
      content: steps([
        {
          title: 'The conversation enters a shared queue',
          text: `WhatsApp messages — as well as Instagram, Facebook, Telegram and email — arrive in the
            same queue, visible to authorized team members.`,
        },
        {
          title: 'An agent picks it up with the full history',
          text: `Whoever takes over sees everything that already happened with that contact, including
            conversations that started on other channels or were handled by teammates.`,
        },
        {
          title: 'Requests become tickets with deadlines',
          text: `When a request needs follow-up, the agent opens a ticket straight from the conversation,
            with a category and first-response and resolution deadlines.`,
        },
        {
          title: 'Buying intent becomes an opportunity',
          text: `If the conversation is a sale, it moves into your CRM pipeline, with proposals, contracts
            and automatic follow-ups.`,
        },
      ]),
    },
    {
      title: 'Many agents, one number, full control',
      intro: `A shared inbox only works when everyone knows what's theirs and managers can see the big
        picture.`,
      content: panels([
        {
          title: 'Team organization',
          text: 'Your operation no longer depends on a single phone or a single person.',
          list: [
            'Shared queue across authorized agents',
            'Unified history per contact, kept on the platform',
            'Ticket categories to separate topics and owners',
          ],
        },
        {
          title: 'Control and security',
          text: 'Each person accesses only what their role allows.',
          list: [
            'Role-based user access',
            'Audit log of user actions',
            'Integration credentials stored encrypted',
          ],
        },
      ]),
    },
    {
      title: 'Distribution and deadline tracking',
      intro: `What has no deadline doesn't get tracked. In VipDesk, both support and sales run on a
        clock, with alerts.`,
      content: panels([
        {
          title: 'SLA-based tickets',
          list: [
            'First-response and resolution deadlines per ticket',
            'Alerts before deadlines expire',
            'Automatic escalation when a deadline is at risk',
          ],
        },
        {
          title: 'Leads distributed across sales reps',
          list: [
            'Automatic lead distribution across your sales team',
            'A set deadline for first contact',
            'Automatic reassignment when a rep doesn’t respond',
          ],
        },
      ]),
    },
    {
      title: 'Automation and day-to-day productivity',
      intro: 'Less repetitive work for your team, without taking important decisions away from them.',
      content: cards([
        {
          title: 'Automatic follow-ups',
          text: `Follow-up sequences per pipeline stage, with wait steps that cancel themselves when the
            customer replies.`,
          link: { href: '/en/customer-service-automation/', label: 'Customer service automation' },
        },
        {
          title: 'AI summaries and suggestions',
          text: `AI summarizes long conversations and suggests replies, which the agent reviews before
            sending.`,
          link: { href: '/en/ai-customer-service/', label: 'AI for customer service' },
        },
        {
          title: 'Scheduling inside the conversation',
          text: `Time slots checked against the professional's real calendar, with confirmations and
            reminders sent over WhatsApp.`,
          link: { href: '/en/whatsapp-appointment-scheduling/', label: 'WhatsApp appointment scheduling' },
        },
      ]),
    },
    {
      title: 'How your WhatsApp number is connected',
      content: html`<div class="texto">
        <p>A number can be connected to the platform by scanning a QR code. This method relies on
        WhatsApp Web–based interfaces that <strong>are not approved by Meta</strong>, so it carries a
        risk of the number being blocked or disconnected at WhatsApp's discretion.</p>
        <p>For business-critical operations, our <a href="/en/terms/">Terms of Use</a> recommend the
        official WhatsApp Business API (Cloud API), which is subject to Meta's own rules and fees.
        During the demo, our sales team will help you choose the best path for your volume and type
        of operation.</p>
      </div>`,
    },
  ],
  faqs: [
    {
      q: 'Can several agents use the same WhatsApp number?',
      a: `<p>Yes. Conversations from the number land in a shared queue and each authorized agent can pick
        up a contact with the full history. The number of users depends on your plan; our sales team can
        walk you through the available options.</p>`,
    },
    {
      q: 'What happens to the history when an agent leaves the company?',
      a: `<p>The history is stored per contact on the platform, not on the phone of whoever handled it.
        Just remove the user's access: the conversations remain available to whoever takes over.</p>`,
    },
    {
      q: 'Can I handle Instagram, Facebook and email on the same screen?',
      a: `<p>Yes. WhatsApp, Instagram, Facebook, Telegram and email arrive in the same queue, with a
        unified history per contact. See <a href="/en/omnichannel-customer-service/">omnichannel
        customer service</a>.</p>`,
    },
    {
      q: 'How do I make sure customers get answered on time?',
      a: `<p>With SLA-based tickets: each ticket has a first-response and a resolution deadline, an alert
        before it expires and automatic escalation. For leads, there is a first-contact deadline and
        reassignment when the rep doesn't respond.</p>`,
    },
    {
      q: 'Can a conversation turn into a sale?',
      a: `<p>Yes. The conversation can move into your sales pipeline, with proposals, contracts, goals and
        automatic follow-ups. Learn more about the <a href="/en/whatsapp-crm/">WhatsApp CRM</a>.</p>`,
    },
    {
      q: 'Is there a risk of the number being blocked?',
      a: `<p>With the QR code connection, yes: it is not a Meta-approved method and WhatsApp may block the
        number at its discretion, as detailed in our <a href="/en/terms/">Terms of Use</a>. For
        business-critical operations, the recommendation is the official WhatsApp Business API.
        Respecting contacts' consent (opt-in) and avoiding unsolicited bulk messages is also mandatory.</p>`,
    },
  ],
  related: ['/en/whatsapp-crm/', '/en/omnichannel-customer-service/', '/en/customer-service-automation/'],
  posts: ['/en/blog/whatsapp-team-inbox/', '/en/blog/first-response-time/'],
  cta: {
    title: 'Get your team’s WhatsApp organized',
    text: 'Book a demo and see the queue, history and deadlines working with your own workflow.',
  },
});
