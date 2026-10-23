// English home page (/en/). Same verified facts as the Portuguese home (src/pages/home.mjs).
// US adaptations: compliance is stated only for Brazil's LGPD (no CCPA/GDPR/HIPAA claims), the
// healthcare use case was replaced by appointment-based businesses (HIPAA not verified), and the
// company is clearly identified as Brazilian.
import { SITE } from '../../config.mjs';
import { html } from '../../lib/html.mjs';
import { hero, section, cards as cardsIn, faq, ctaBand, list } from '../../lib/components.mjs';
import { deskflowBand } from '../../lib/deskflow.mjs';
import { faqPage, softwareApplication } from '../../lib/schema.mjs';
import { POSTS } from '../blog/posts.mjs';

const lang = 'en';
const cards = (items) => cardsIn(items, lang);

const FAQS = [
  {
    q: 'What is VipDesk?',
    a: `<p>VipDesk is an omnichannel customer service and CRM platform built by ${SITE.company.name},
      a software company based in Brazil. It brings WhatsApp, Instagram, Facebook, Telegram, email and
      phone conversations into a single screen, and keeps customer service, SLA-based tickets, your sales
      pipeline, automations and your team's calendar in the same place.</p>`,
  },
  {
    q: 'How do multiple agents share the same WhatsApp number?',
    a: `<p>Conversations land in a shared queue and any authorized agent can pick up a contact with the
      full history, including conversations from other channels. Access is controlled by user role and
      actions are recorded in an audit log. See
      <a href="/en/whatsapp-customer-service/">WhatsApp customer service for teams</a>.</p>`,
  },
  {
    q: 'Can I bring different channels together?',
    a: `<p>Yes. WhatsApp, Instagram, Facebook, Telegram and email arrive in the same queue with a unified
      history per contact, and phone is part of the same platform. Learn more about
      <a href="/en/omnichannel-customer-service/">omnichannel customer service</a>.</p>`,
  },
  {
    q: 'How does the CRM work?',
    a: `<p>The CRM has configurable pipelines, proposals, contracts and goals. Leads can be distributed
      automatically across sales reps, with a deadline for first contact and reassignment when nobody
      responds. See the <a href="/en/whatsapp-crm/">WhatsApp CRM</a>.</p>`,
  },
  {
    q: 'What role does AI play?',
    a: `<p>AI helps with triage, summarizes conversations, suggests replies and helps classify sales
      opportunities. Your agent stays in charge of what gets sent. More on
      <a href="/en/ai-customer-service/">AI for customer service</a>.</p>`,
  },
  {
    q: 'How is a WhatsApp number connected?',
    a: `<p>A number can be connected by scanning a QR code. This method relies on WhatsApp Web–based
      interfaces that are not approved by Meta and carries a real risk of the number being blocked, as
      explained in our <a href="/en/terms/">Terms of Use</a>, which recommend the official WhatsApp
      Business API for business-critical operations. During the demo, our sales team will help you choose
      the right option for your operation.</p>`,
  },
  {
    q: 'How can I try VipDesk?',
    a: `<p>The platform may be offered with a free trial for a limited period, as described in our
      <a href="/en/terms/">Terms of Use</a>. To get a trial or learn about plans, email our sales team at
      <a href="mailto:${SITE.emails.sales}">${SITE.emails.sales}</a>.</p>`,
  },
  {
    q: 'How do I book a demo?',
    a: `<p>Click “Book a demo” or email <a href="mailto:${SITE.emails.sales}">${SITE.emails.sales}</a>
      with the channels you use, your team size and your time zone. The demo is built around your own
      channels and pipeline.</p>`,
  },
  {
    q: 'How is data protected?',
    a: `<p>VipDesk is operated in compliance with Brazil's General Data Protection Law (LGPD), with
      encrypted integration credentials, role-based access and audit logs. Controller and processor roles
      are described in our <a href="/en/privacy/">Privacy Policy</a>.</p>`,
  },
];

const FEATURES = [
  {
    title: 'Omnichannel inbox',
    text: `WhatsApp, Instagram, Facebook, Telegram and email in the same queue, with a unified history
      per contact. Agents see the whole conversation, no matter which channel it started on.`,
    link: { href: '/en/omnichannel-customer-service/', label: 'Omnichannel customer service' },
  },
  {
    title: 'Tickets and SLAs',
    text: `Open tickets straight from a conversation, with categories, first-response and resolution
      deadlines, alerts before they expire and automatic escalation.`,
    link: { href: '/en/customer-service-automation/', label: 'Automation and SLAs' },
  },
  {
    title: 'Sales CRM',
    text: `Configurable pipelines, proposals, contracts and goals. Automatic lead distribution across
      sales reps, with a first-contact deadline and reassignment when a rep doesn't respond.`,
    link: { href: '/en/whatsapp-crm/', label: 'WhatsApp CRM' },
  },
  {
    title: 'Automations',
    text: `Pipeline-stage rules with conditions and follow-up sequences, including wait steps that are
      canceled automatically when the customer replies.`,
    link: { href: '/en/customer-service-automation/', label: 'Customer service automation' },
  },
  {
    title: 'Scheduling',
    text: `Per-professional calendars, a public self-scheduling portal, and confirmations and reminders
      sent over WhatsApp to cut down on no-shows.`,
    link: { href: '/en/whatsapp-appointment-scheduling/', label: 'WhatsApp appointment scheduling' },
  },
  {
    title: 'Artificial intelligence',
    text: `Help with triage, conversation summaries, reply suggestions and opportunity classification,
      with your agent always in control.`,
    link: { href: '/en/ai-customer-service/', label: 'AI for customer service' },
  },
];

const WHY = [
  { title: 'Support and sales in one place', text: 'A conversation that starts on WhatsApp becomes a deal in your pipeline without copying data into another tool.' },
  { title: 'Unified history per contact', text: 'Whoever picks up a conversation sees everything that already happened with that customer, on every channel.' },
  { title: 'Deadlines under control', text: 'First-response and resolution SLAs, with alerts before they expire and automatic escalation.' },
  { title: 'Scheduling based on real availability', text: 'Time slots offered to customers respect each professional’s Google Calendar or Microsoft 365 calendar.' },
  { title: 'AI with your agent in control', text: 'Summaries and suggestions speed up the work; your team still decides what gets sent.' },
  { title: 'Security and data protection', text: 'Encrypted credentials, role-based access and an audit log of user actions.' },
];

const USES = [
  {
    title: 'Appointment-based businesses',
    text: `Per-professional calendars, self-scheduling through the portal and WhatsApp reminders to
      reduce no-shows, with the front desk handling every channel from one queue.`,
    link: { href: '/en/whatsapp-appointment-scheduling/', label: 'WhatsApp appointment scheduling' },
  },
  {
    title: 'Real estate agencies',
    text: `Leads from every channel distributed across agents, with a first-contact deadline, automatic
      reassignment and scheduled property visits.`,
    link: { href: '/en/whatsapp-crm/', label: 'WhatsApp CRM' },
  },
  {
    title: 'Sales teams',
    text: `Configurable pipelines, proposals, contracts and goals, with automatic follow-ups that stop on
      their own when the customer replies.`,
    link: { href: '/en/customer-service-automation/', label: 'Customer service automation' },
  },
  {
    title: 'Retail and services',
    text: `WhatsApp, Instagram and Facebook in a single queue, plus tickets with deadlines for returns,
      questions and after-sales support.`,
    link: { href: '/en/whatsapp-customer-service/', label: 'WhatsApp customer service' },
  },
];

const CALENDAR = html`
<section class="alt" id="agenda">
  <div class="wrap">
    <div class="cabeca">
      <h2>Calendar integration for your sales team</h2>
      <p>
        VipDesk connects to <strong>Google Calendar</strong> and <strong>Microsoft 365 / Teams</strong>
        so that appointments booked on the platform respect the real calendar of the person who will
        attend.
      </p>
    </div>
    <div class="duas">
      <div class="painel">
        <h3>Real availability</h3>
        <p style="margin-bottom:16px">
          Before offering a time slot to a customer, the platform checks when the professional's
          calendar is already busy.
        </p>
        <ul class="lista">
          <li>We read only the <strong>start and end</strong> of events</li>
          <li>We do not access titles, descriptions, attendees or locations</li>
          <li>No event from your calendar is copied into our database</li>
        </ul>
      </div>
      <div class="painel">
        <h3>Meetings created automatically</h3>
        <p style="margin-bottom:16px">
          When a customer books a time, the event shows up on the professional's calendar — nobody has
          to copy anything by hand.
        </p>
        <ul class="lista">
          <li>Invitation sent to the customer</li>
          <li>Google Meet or Microsoft Teams link included in the invite</li>
          <li>Reschedules and cancellations reflected in the same event</li>
        </ul>
      </div>
    </div>
    <p style="margin-top:28px; font-size:15.5px">
      The connection is authorized by the user and can be revoked at any time, in the platform or
      directly in the Google or Microsoft account. Details on how data is handled are in our
      <a href="/en/privacy/">Privacy Policy</a>.
    </p>
  </div>
</section>`;

const PRIVACY = html`
<section id="privacidade">
  <div class="wrap">
    <div class="duas">
      <div>
        <h2>Privacy and security</h2>
        <p style="margin-top:16px; font-size:17px">
          VipDesk is operated by ${SITE.company.name} and treated as customer service infrastructure for
          our clients. We operate in compliance with Brazil's General Data Protection Law (LGPD).
        </p>
      </div>
      <div>
        ${list([
          'Integration credentials stored encrypted',
          'Role-based access, with an audit log of user actions',
          'Data obtained through Google APIs used only for the functions described, never for advertising or to train models',
          '<a href="/en/privacy/">Privacy Policy</a> and <a href="/en/terms/">Terms of Use</a>',
        ])}
      </div>
    </div>
  </div>
</section>`;

const page = {
  lang,
  key: 'home',
  path: '/en/',
  title: 'VipDesk | Omnichannel Customer Service Platform with CRM & AI',
  description:
    'Bring WhatsApp, Instagram, email and phone into one shared inbox, manage sales in a built-in CRM and automate customer service with AI.',
  ogTitle: 'VipDesk — Omnichannel customer service, CRM and AI in one platform',
  h1: 'Omnichannel customer service platform with WhatsApp, CRM and AI',
};

page.jsonLd = [softwareApplication(lang), faqPage(page, FAQS)];
page.about = { '@id': `${SITE.origin}/#software` };

page.body = html`
${hero({
  lang,
  eyebrow: `A ${SITE.company.name} product`,
  h1: page.h1,
  lead: `Bring your WhatsApp, Instagram, Facebook, Telegram, email and phone conversations together,
    organize your team, automate repetitive work and follow every opportunity through to the sale,
    with built-in scheduling. Your team supports, sells and books meetings without switching tools.`,
})}
${section({
  id: 'recursos',
  title: 'What the platform does',
  intro: `All of your customer conversations in one place: a single workspace for your support team
    and your sales team, from first contact to closed deal.`,
  content: cards(FEATURES),
})}
${deskflowBand('en')}
${section({
  alt: true,
  title: 'Why teams choose VipDesk',
  intro: 'What changes day to day when support, sales and scheduling stop living in separate tools.',
  content: cards(WHY),
})}
${section({
  id: 'usos',
  title: 'Who it’s for',
  intro: `Examples of how different teams use the same features. In the demo, we configure it around
    your real workflow.`,
  content: cards(USES),
})}
${CALENDAR}
${PRIVACY}
${section({
  id: 'perguntas',
  alt: true,
  title: 'Frequently asked questions',
  content: faq(FAQS),
})}
${section({
  title: 'Guides to run better customer service',
  intro: 'Practical guides from the VipDesk team on customer service, sales and digital operations.',
  content: html`${cards(POSTS.en.slice(0, 3).map((p) => ({ title: p.h1, text: p.description, href: p.path, linkLabel: 'Read article' })))}
    <p style="margin-top:24px"><a href="/en/blog/">See all blog articles</a></p>`,
})}
${ctaBand({
  lang,
  title: 'Want to see VipDesk in action?',
  text: 'Talk to our sales team and book a demo of the platform with your own channels and pipeline.',
})}`;

export default page;
