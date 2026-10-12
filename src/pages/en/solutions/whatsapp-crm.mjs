// Intent: "WhatsApp CRM". English counterpart of /crm-whatsapp/ (same verified facts).
import { landingPage } from '../../../lib/landing.mjs';
import { list, steps, panels, cards as cardsIn } from '../../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'en');

export default landingPage({
  lang: 'en',
  path: '/en/whatsapp-crm/',
  title: 'WhatsApp CRM: Pipelines, Leads and Proposals | VipDesk',
  description:
    'Manage leads from WhatsApp and other channels with configurable pipelines, proposals, contracts, goals and automatic lead distribution.',
  h1: 'WhatsApp CRM: from first message to signed contract',
  lead: `Move every sales conversation into an organized pipeline, with automatic lead distribution,
    first-contact deadlines, proposals, contracts, goals and follow-ups that don't depend on a sales
    rep's memory.`,
  sections: [
    {
      title: 'Why WhatsApp sales slip through the cracks',
      intro: `When conversations happen in one place and sales tracking happens in another, the pipeline
        is always out of date.`,
      content: list([
        'A lead comes in on WhatsApp, but nobody logs it in the CRM — or it gets logged days later.',
        'Leads sit idle because it isn’t clear which rep should respond.',
        'Follow-ups depend on personal reminders and get lost in the rush.',
        'The proposal is sent in the chat, but the pipeline has no idea what stage the deal is in.',
        'Managers track goals in spreadsheets that don’t talk to customer conversations.',
      ]),
    },
    {
      title: 'Customer service and sales on the same platform',
      intro: `In VipDesk, the CRM lives in the same platform as your conversations. The opportunity is
        born from the contact and carries the history from every channel.`,
      content: steps([
        {
          title: 'A lead arrives on any channel',
          text: 'WhatsApp, Instagram, Facebook, Telegram or email: the contact comes in with a unified history.',
        },
        {
          title: 'It is distributed automatically',
          text: `The platform distributes leads across your sales reps, with a deadline for first contact.
            If the rep doesn't respond in time, the lead is reassigned.`,
        },
        {
          title: 'It moves through the pipeline',
          text: `Configurable pipelines mirror your sales process. Each stage can have automation rules
            with conditions.`,
        },
        {
          title: 'Proposal, contract and goal',
          text: 'Proposals and contracts are recorded on the opportunity, and results feed your team’s goals.',
        },
      ]),
    },
    {
      title: 'CRM features',
      content: cards([
        {
          title: 'Configurable pipelines',
          text: 'Build the stages of your own sales process instead of adapting your team to a generic funnel.',
        },
        {
          title: 'Automatic lead distribution',
          text: 'Leads shared across sales reps, with a first-contact deadline and reassignment when a rep doesn’t respond.',
        },
        {
          title: 'Proposals and contracts',
          text: 'Sales documents attached to the opportunity, so nobody has to dig through old conversations.',
        },
        {
          title: 'Goals',
          text: 'Track your sales team’s goals on the same platform where the sales actually happen.',
        },
        {
          title: 'Stage-based automations',
          text: `Rules with conditions and follow-up sequences. Wait steps are canceled automatically when
            the customer replies.`,
          link: { href: '/en/customer-service-automation/', label: 'See automations' },
        },
        {
          title: 'AI-assisted classification',
          text: 'AI helps classify opportunities so your team can prioritize better.',
          link: { href: '/en/ai-customer-service/', label: 'AI for customer service' },
        },
      ]),
    },
    {
      title: 'Organized contacts and interaction history',
      content: panels([
        {
          title: 'Interaction history',
          text: 'Before calling or replying, the rep sees everything the customer has already discussed with your company.',
          list: [
            'Unified history per contact, across all channels',
            'Support tickets visible to the sales team',
            'Conversations kept even when the account changes hands',
          ],
        },
        {
          title: 'Meetings without the back-and-forth',
          text: 'Scheduling uses the real availability of the rep’s calendar.',
          list: [
            'Google Calendar and Microsoft 365 / Teams integration',
            'Invites with a Google Meet or Microsoft Teams link',
            'WhatsApp reminders to reduce no-shows',
          ],
        },
      ]),
    },
  ],
  faqs: [
    {
      q: 'What is a WhatsApp CRM?',
      a: `<p>It's a customer and opportunity management system connected to your WhatsApp conversations.
        Instead of manually logging what was said in the chat, the lead, the history and the deal stage
        live in the same place where the conversation happens.</p>`,
    },
    {
      q: 'How are leads distributed across sales reps?',
      a: `<p>Distribution is automatic and each lead gets a first-contact deadline. If the rep doesn't
        respond within that deadline, the lead is reassigned to someone else on the team.</p>`,
    },
    {
      q: 'Can I adapt the pipeline to my sales process?',
      a: `<p>Yes. Pipelines are configurable, and each stage can have automation rules with conditions
        and follow-up sequences.</p>`,
    },
    {
      q: 'Does the automatic follow-up keep going if the customer replies?',
      a: `<p>No. The wait steps in a sequence are canceled automatically when the customer replies, so
        they don't receive out-of-context messages.</p>`,
    },
    {
      q: 'Does the CRM only work with WhatsApp?',
      a: `<p>No. Contacts can come in through WhatsApp, Instagram, Facebook, Telegram and email, and the
        history is unified per contact. See <a href="/en/omnichannel-customer-service/">omnichannel
        customer service</a>.</p>`,
    },
  ],
  related: ['/en/whatsapp-customer-service/', '/en/customer-service-automation/', '/en/whatsapp-appointment-scheduling/'],
  posts: ['/en/blog/connect-customer-service-and-sales-pipeline/'],
  cta: {
    title: 'See your sales pipeline inside VipDesk',
    text: 'Book a demo and show us how your team sells today: we configure it around your process.',
  },
});
