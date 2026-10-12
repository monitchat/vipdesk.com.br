// Intent: "WhatsApp appointment scheduling". English counterpart of /agendamento-whatsapp/.
// Calendar details match the Privacy Policy (calendar.freebusy and calendar.events scopes).
// US note: the clinics example was replaced by professional services (HIPAA not verified).
import { landingPage } from '../../../lib/landing.mjs';
import { list, steps, panels, cards as cardsIn } from '../../../lib/components.mjs';

const cards = (items) => cardsIn(items, 'en');

export default landingPage({
  lang: 'en',
  path: '/en/whatsapp-appointment-scheduling/',
  title: 'WhatsApp Appointment Scheduling and Reminders | VipDesk',
  description:
    'Self-scheduling portal, per-professional calendars, WhatsApp confirmations and reminders, synced with Google Calendar and Microsoft 365.',
  h1: 'WhatsApp appointment scheduling with confirmations, reminders and calendar sync',
  lead: `Offer time slots that respect each professional's real calendar, create the meeting
    automatically and send confirmations and reminders over WhatsApp — without endless back-and-forth
    messages.`,
  sections: [
    {
      title: 'The cost of scheduling by chat',
      content: list([
        'Many messages back and forth just to find a free slot.',
        'A time offered by the agent that was already taken on the professional’s calendar.',
        'An appointment agreed in the chat but missing from the calendar of whoever has to attend.',
        'Customers who don’t show up because nobody reminded them.',
      ]),
    },
    {
      title: 'How it works',
      content: steps([
        {
          title: 'The customer picks a time',
          text: `Through the public self-scheduling portal or with help from an agent, based on each
            professional's calendar.`,
        },
        {
          title: 'Real availability is checked',
          text: `Before offering a slot, the platform checks when the professional's Google Calendar or
            Microsoft 365 calendar is already busy.`,
        },
        {
          title: 'The meeting is created automatically',
          text: `The event shows up on the professional's calendar and the invitation is sent to the
            customer, with a Google Meet or Microsoft Teams link.`,
        },
        {
          title: 'WhatsApp confirmations and reminders',
          text: 'The customer receives a confirmation and reminders, which helps reduce no-shows.',
        },
        {
          title: 'Reschedules without rework',
          text: 'Reschedules and cancellations are reflected in the same calendar event.',
        },
      ]),
    },
    {
      title: 'Google Calendar and Microsoft 365 integration',
      intro: `The connection is authorized by the user and can be revoked at any time, in the platform or
        directly in the Google or Microsoft account.`,
      content: panels([
        {
          title: 'What the platform accesses',
          list: [
            'Only the start and end of events, to know when the calendar is busy',
            'Creating, updating and removing the events booked through the platform itself',
          ],
        },
        {
          title: 'What the platform does not access',
          list: [
            'Titles, descriptions, attendees and locations of your events',
            'No event from your calendar is copied into our database',
            'Full details in our <a href="/en/privacy/">Privacy Policy</a>',
          ],
        },
      ]),
    },
    {
      title: 'Use cases',
      content: cards([
        {
          title: 'Consultants and professional services',
          text: 'Per-professional calendars, self-scheduled appointments and reminders that cut down on no-shows.',
        },
        {
          title: 'Sales teams',
          text: 'Discovery and demo meetings booked from the pipeline, with a Meet or Teams link already in the invite.',
          link: { href: '/en/whatsapp-crm/', label: 'WhatsApp CRM' },
        },
        {
          title: 'Real estate and field services',
          text: 'Property visits and service calls booked on the agent’s or technician’s calendar, with a reminder for the customer.',
        },
      ]),
    },
  ],
  faqs: [
    {
      q: 'Does scheduling work with Google Calendar?',
      a: `<p>Yes. VipDesk integrates with Google Calendar to check availability and create the booked
        events, with a Google Meet link in the invite.</p>`,
    },
    {
      q: 'What about Microsoft 365 and Teams?',
      a: `<p>Yes. The Microsoft 365 / Teams integration works the same way, with a Microsoft Teams link in
        the invite.</p>`,
    },
    {
      q: 'Does the platform read the content of my events?',
      a: `<p>No. To check availability, the platform reads only the start and end of busy periods.
        Titles, descriptions, attendees and locations are not accessed, and no event from your calendar
        is copied into our database.</p>`,
    },
    {
      q: 'Do customers get a reminder?',
      a: '<p>Yes. Confirmations and reminders are sent over WhatsApp.</p>',
    },
    {
      q: 'Can customers book on their own?',
      a: '<p>Yes, through the public self-scheduling portal, which shows each professional’s available slots.</p>',
    },
    {
      q: 'How do I disconnect my calendar?',
      a: `<p>On the platform's integration screen or directly in your Google or Microsoft account. For the
        Google integration, our <a href="/en/privacy/">Privacy Policy</a> explains that access ends and
        the stored credentials are deleted after revocation.</p>`,
    },
  ],
  related: ['/en/whatsapp-customer-service/', '/en/whatsapp-crm/', '/en/customer-service-automation/'],
  cta: {
    title: 'Stop booking appointments by chat',
    text: 'Book a demo and see self-scheduling, calendar sync and reminders in action.',
  },
});
