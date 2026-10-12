// Intent: "customer service automation" (includes tickets, SLAs and escalation).
// English counterpart of /automacao-atendimento/.
import { landingPage } from '../../../lib/landing.mjs';
import { html } from '../../../lib/html.mjs';
import { list, steps, cards as cardsIn } from '../../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'en');

export default landingPage({
  lang: 'en',
  path: '/en/customer-service-automation/',
  title: 'Customer Service Automation and SLAs | VipDesk',
  description:
    'Automate follow-ups, lead distribution, SLA alerts, escalation and appointment reminders in VipDesk, with your team in control.',
  h1: 'Customer service automation without losing the human touch',
  lead: `Let the platform handle the repetitive work — distributing leads, chasing deadlines, sending
    follow-ups and reminders — and free your team for the conversations that need a person.`,
  sections: [
    {
      title: 'The manual work that eats your team’s time',
      intro: 'A big share of customer service time goes to tasks that repeat every single day:',
      content: list([
        'Deciding who should answer each new contact.',
        'Remembering to get back to the customer who never replied to the proposal.',
        'Checking, one by one, which requests are about to miss their deadline.',
        'Letting a manager know when something is late.',
        'Confirming appointments and reminding customers of upcoming bookings.',
      ]),
    },
    {
      title: 'What you can automate in VipDesk',
      content: cards([
        {
          title: 'Pipeline-stage rules',
          text: 'Automatic actions with conditions, triggered as an opportunity moves through your sales pipeline.',
          link: { href: '/en/whatsapp-crm/', label: 'WhatsApp CRM' },
        },
        {
          title: 'Follow-up sequences',
          text: 'Follow-up messages with wait steps, canceled automatically when the customer replies.',
        },
        {
          title: 'Lead distribution',
          text: 'Leads shared across sales reps, with a first-contact deadline and reassignment when a rep doesn’t respond.',
        },
        {
          title: 'SLA alerts and escalation',
          text: 'Tickets with first-response and resolution deadlines, an alert before they expire and automatic escalation.',
        },
        {
          title: 'Confirmations and reminders',
          text: 'Appointment confirmations and reminders sent over WhatsApp to reduce no-shows.',
          link: { href: '/en/whatsapp-appointment-scheduling/', label: 'WhatsApp appointment scheduling' },
        },
        {
          title: 'AI assistance',
          text: 'Triage, conversation summaries and reply suggestions, always reviewed by the agent.',
          link: { href: '/en/ai-customer-service/', label: 'AI for customer service' },
        },
      ]),
    },
    {
      title: 'Practical examples',
      intro: 'Three common workflows built with the platform’s features.',
      content: steps([
        {
          title: 'No new lead goes unanswered',
          text: `A contact asks for a quote on WhatsApp. The lead is assigned to a sales rep with a
            first-contact deadline. If the deadline passes without a reply, it is reassigned
            automatically.`,
        },
        {
          title: 'A proposal with automatic follow-up',
          text: `The opportunity reaches the “proposal sent” stage and starts a follow-up sequence with
            wait steps. If the customer replies along the way, the remaining steps are canceled and the
            conversation continues with the rep.`,
        },
        {
          title: 'A ticket that doesn’t miss its deadline',
          text: `A customer reports a problem and the agent opens a ticket right in the conversation. The
            platform tracks the SLA deadlines, alerts before they expire and escalates when needed.`,
        },
      ]),
    },
    {
      title: 'The benefits of automation done right',
      content: html`<div class="texto">
        ${list([
          '<strong>Consistency:</strong> every lead and every ticket goes through the same rules, without relying on memory.',
          '<strong>Faster responses:</strong> distribution and alerts shorten the time to first contact.',
          '<strong>Fewer out-of-context messages:</strong> follow-ups stop when the customer replies.',
          '<strong>Management by exception:</strong> managers are pulled in by escalation when something goes off track.',
        ])}
        <p style="margin-top:20px">Automation doesn't replace your team: it clears repetitive work out
        of the way so people can focus on what takes judgment.</p>
      </div>`,
    },
  ],
  faqs: [
    {
      q: 'What is customer service automation?',
      a: `<p>It's the use of rules in your customer service platform to run repetitive tasks without
        manual work, such as distributing contacts, sending follow-ups, chasing deadlines and sending
        reminders.</p>`,
    },
    {
      q: 'Does the automatic follow-up stop when the customer replies?',
      a: '<p>Yes. The wait steps in the sequence are canceled automatically as soon as the customer replies.</p>',
    },
    {
      q: 'How does automatic escalation work?',
      a: `<p>Each ticket has first-response and resolution deadlines. The platform sends an alert before
        they expire and escalates the ticket when a deadline is at risk.</p>`,
    },
    {
      q: 'Does automation replace customer service agents?',
      a: `<p>No. Automations take care of repetitive tasks and deadlines; conversations that require
        judgment stay with your team. Even the AI works with the agent in control.</p>`,
    },
    {
      q: 'Can I automate appointment reminders?',
      a: `<p>Yes. Confirmations and reminders for booked appointments can be sent over WhatsApp. See
        <a href="/en/whatsapp-appointment-scheduling/">WhatsApp appointment scheduling</a>.</p>`,
    },
  ],
  related: ['/en/whatsapp-crm/', '/en/ai-customer-service/', '/en/whatsapp-appointment-scheduling/'],
  posts: ['/en/blog/first-response-time/', '/en/blog/connect-customer-service-and-sales-pipeline/'],
  cta: {
    title: 'Find out what to automate in your operation',
    text: 'In the demo, we map your team’s repetitive tasks and show you how to set them up in VipDesk.',
  },
});
