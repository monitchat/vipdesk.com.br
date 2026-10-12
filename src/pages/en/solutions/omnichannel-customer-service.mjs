// Intent: "omnichannel customer service platform". English counterpart of /atendimento-omnichannel/.
import { landingPage } from '../../../lib/landing.mjs';
import { html } from '../../../lib/html.mjs';
import { list, panels, cards as cardsIn } from '../../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'en');

export default landingPage({
  lang: 'en',
  path: '/en/omnichannel-customer-service/',
  title: 'Omnichannel Customer Service Platform | VipDesk',
  description:
    'WhatsApp, Instagram, Facebook, Telegram, email and phone in one platform, with a unified history per contact, SLAs and a built-in CRM.',
  h1: 'Omnichannel customer service platform: every channel in one queue',
  lead: `Bring WhatsApp, Instagram, Facebook, Telegram, email and phone into a single platform, with
    each customer's history unified, service deadlines and your sales pipeline in the same place.`,
  sections: [
    {
      title: 'What is omnichannel customer service?',
      content: html`<div class="texto">
        <p>Omnichannel customer service means every contact channel your business offers works as
        <strong>one continuous conversation with the customer</strong>. Whether they sent a message on
        Instagram, wrote an email or reached out on WhatsApp, whoever responds sees the full history and
        picks up where the conversation left off.</p>
        <p>In practice, this requires a platform that receives every channel in the same queue,
        identifies the contact and keeps the history together. That's exactly what VipDesk does.</p>
      </div>`,
    },
    {
      title: 'Multichannel vs. omnichannel',
      intro: 'Being present on many channels is not the same as serving customers in an integrated way.',
      content: html`<div class="tabela-rolagem" tabindex="0" role="region" aria-label="Multichannel vs. omnichannel comparison"><table class="comparativo">
        <thead><tr><th scope="col"></th><th scope="col">Multichannel</th><th scope="col">Omnichannel</th></tr></thead>
        <tbody>
          <tr><th scope="row">Channels</th><td>Several channels, each with its own tool</td><td>Several channels on one platform</td></tr>
          <tr><th scope="row">History</th><td>Split by channel</td><td>Unified per contact</td></tr>
          <tr><th scope="row">Queue</th><td>One queue per channel or device</td><td>One queue for the whole team</td></tr>
          <tr><th scope="row">Customer experience</th><td>Repeats their story every time they switch channels</td><td>Continues the conversation where it left off</td></tr>
          <tr><th scope="row">Management</th><td>Fragmented view of the operation</td><td>Deadlines and results tracked in one place</td></tr>
        </tbody>
      </table></div>`,
    },
    {
      title: 'Channels in VipDesk',
      content: cards([
        { title: 'WhatsApp', text: 'Multiple agents on the same number, with a shared queue.', link: { href: '/en/whatsapp-customer-service/', label: 'WhatsApp customer service' } },
        { title: 'Instagram and Facebook', text: 'Messages from your company’s social accounts in the same queue as WhatsApp.' },
        { title: 'Telegram', text: 'One more messaging channel handled by the same team, with the same history.' },
        { title: 'Email', text: 'Emails handled as conversations, right next to instant messages.' },
        { title: 'Phone', text: 'Phone on the same platform where your team handles every other channel.' },
      ]),
    },
    {
      title: 'Continuity and team management',
      content: panels([
        {
          title: 'Continuity of service',
          text: 'Customers don’t have to repeat themselves when they switch channels or agents.',
          list: [
            'Unified history per contact',
            'Tickets opened straight from the conversation, with a category',
            'Conversations stored on the platform, not on a phone',
          ],
        },
        {
          title: 'Operations management',
          text: 'Clear deadlines and responsibilities for the whole team.',
          list: [
            'First-response and resolution deadlines (SLAs)',
            'Alerts before deadlines expire and automatic escalation',
            'Role-based access and an audit log of user actions',
          ],
        },
      ]),
    },
    {
      title: 'Business benefits',
      content: list([
        '<strong>Fewer forgotten customers:</strong> a single queue with deadlines and alerts instead of several inboxes.',
        '<strong>Sales connected to support:</strong> a conversation can become an opportunity in the <a href="/en/whatsapp-crm/">CRM</a> without retyping data.',
        '<strong>A more productive team:</strong> <a href="/en/customer-service-automation/">automations</a> and <a href="/en/ai-customer-service/">AI</a> take care of repetitive tasks.',
        '<strong>Less dependence on specific people:</strong> what your team knows about each customer is recorded.',
      ]),
    },
  ],
  faqs: [
    {
      q: 'What is the difference between multichannel and omnichannel customer service?',
      a: `<p>In multichannel, a business is present on several channels, but each one works in
        isolation. In omnichannel, channels are integrated: the team handles everything from one queue
        and sees each customer's unified history.</p>`,
    },
    {
      q: 'Which channels does VipDesk bring together?',
      a: '<p>WhatsApp, Instagram, Facebook, Telegram, email and phone.</p>',
    },
    {
      q: 'Is the history from different channels kept together?',
      a: `<p>Yes. History is unified per contact, so the agent sees the whole conversation no matter which
        channel it started on.</p>`,
    },
    {
      q: 'Does omnichannel customer service also help sales?',
      a: `<p>Yes. In VipDesk, customer service and the CRM live on the same platform: a conversation can
        become an opportunity in the pipeline, with automatic lead distribution and follow-ups.</p>`,
    },
    {
      q: 'How do I track service deadlines?',
      a: `<p>With SLA-based tickets, which have first-response and resolution deadlines, alerts before
        they expire and automatic escalation.</p>`,
    },
  ],
  related: ['/en/whatsapp-customer-service/', '/en/whatsapp-crm/', '/en/customer-service-automation/'],
  posts: ['/en/blog/first-response-time/', '/en/blog/whatsapp-team-inbox/'],
  cta: {
    title: 'Put every channel in one queue',
    text: 'Book a demo with the channels your company already uses and see the unified history in practice.',
  },
});
