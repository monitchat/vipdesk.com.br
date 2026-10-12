// Supports: /en/whatsapp-customer-service/ (informational intent "how to organize").
// English counterpart of /blog/whatsapp-varios-atendentes/.
export default {
  key: 'post-whatsapp-team',
  slug: 'whatsapp-team-inbox',
  title: 'How to Run WhatsApp Customer Service with Multiple Agents',
  description:
    'A step-by-step guide to having a whole team answer from one WhatsApp number: queue, ownership rules, history, deadlines, saved replies and metrics.',
  h1: 'How to run WhatsApp customer service with multiple agents',
  published: '2026-10-12',
  solutions: ['/en/whatsapp-customer-service/', '/en/omnichannel-customer-service/', '/en/customer-service-automation/'],
  summary: `for several people to provide good service from the same WhatsApp number, a business
    needs four things: a single queue, a clear rule for who owns each conversation, history that stays
    with the company (not on a phone) and deadlines that are actually tracked. Tools help, but the
    rules come first.`,
  body: `
<p>At most companies, WhatsApp starts on a single phone. That works while volume is low. As the team
grows, the familiar problems show up: the phone gets passed around, customers get two different
answers, others get none, and nobody can say how long someone has been waiting.</p>
<p>This guide shows how to structure customer service with multiple agents on one number, starting
with operating rules that apply to any tool.</p>

<h2>1. Start with a queue, not a phone</h2>
<p>The first step is to stop thinking about “who has the phone” and start thinking about a
<strong>customer service queue</strong>. Every new conversation enters a single queue, visible to
the team, and leaves it when someone takes ownership.</p>
<p>In practice, this requires a platform that connects the number to several users at once. Without
it, the alternatives tend to be worse: agents' personal numbers (the company loses the contact when
the person leaves) or several phones with different numbers (customers don't know which one to
use).</p>

<h2>2. Decide who owns each conversation</h2>
<p>The most important rule of a shared inbox is simple: <strong>each conversation has one owner at a
time</strong>. Once someone takes it, everyone else knows they don't need to reply. Also define:</p>
<ul>
  <li><strong>How conversations are assigned:</strong> agents pull from the queue, or distribution is
  automatic among whoever is available.</li>
  <li><strong>When a conversation can be transferred:</strong> for example, from support to billing,
  or from pre-sales to an account executive.</li>
  <li><strong>What happens at shift change:</strong> open conversations go back to the queue or stay
  with someone on the next shift.</li>
</ul>

<h2>3. Make sure the history stays with the company</h2>
<p>Whoever takes over needs to see what has already been said, including when the customer reached
out earlier on another channel, such as Instagram or email. History should be recorded <strong>per
contact</strong>, on the platform, not on the phone of whoever answered. That way, vacations, shift
changes and departures don't erase your relationship with the customer.</p>

<h2>4. Separate requests that need follow-up</h2>
<p>Not every conversation ends right away. Returns, technical problems and requests that depend on
another department need follow-up. Turning those conversations into <strong>tickets</strong>, with a
category and an owner, keeps them from getting lost among the day's messages.</p>

<h2>5. Set deadlines and track them</h2>
<p>Define realistic time targets for your operation, such as the first-response target during business
hours and the resolution target for each type of ticket. What matters is that deadlines are
<strong>visible and tracked</strong>: alerts before they expire and someone pulled in when something
runs late. We go deeper on this in
<a href="/en/blog/first-response-time/">how to reduce first response time</a>.</p>

<h2>6. Standardize without sounding like a robot</h2>
<p>With several people speaking for your company, the tone needs to be consistent. Write a short guide
with:</p>
<ul>
  <li>how to greet customers and close a conversation;</li>
  <li>reference replies for the most common questions;</li>
  <li>what never to promise without checking first (delivery dates, discounts, terms);</li>
  <li>when to transfer a conversation to another department.</li>
</ul>
<p>Reference replies are a starting point. Agents adapt them to the context, and customers should never
feel like they're talking to a form.</p>

<h2>7. Move sales into a pipeline</h2>
<p>Many WhatsApp conversations are sales opportunities. If they only live in the chat, nobody knows how
many proposals are open or which ones are going cold. Route those contacts into a sales pipeline, with
an owner and next steps. See how in
<a href="/en/blog/connect-customer-service-and-sales-pipeline/">how to connect customer service to
your sales pipeline</a>.</p>

<h2>8. Protect your number and respect consent</h2>
<p>Your WhatsApp number is a business asset. Follow WhatsApp's policies: message people who asked to be
contacted, avoid unsolicited bulk messages and give customers a clear way to opt out. Also evaluate how
the number is connected to your platform: WhatsApp Web–based connections are not approved by Meta and
carry a risk of the number being blocked, while the official WhatsApp Business API follows Meta's own
rules and pricing.</p>

<h2>Checklist to get started</h2>
<ol>
  <li>Connect the number to a platform with a shared queue.</li>
  <li>Define the ownership and transfer rules for conversations.</li>
  <li>Keep history per contact, independent of the agent.</li>
  <li>Create ticket categories for anything that needs follow-up.</li>
  <li>Set first-response and resolution deadlines, with alerts.</li>
  <li>Write the tone guide and reference replies.</li>
  <li>Route sales opportunities into a pipeline.</li>
  <li>Review your consent practices and how the number is connected.</li>
</ol>
<p class="destaque">In VipDesk, the shared queue, unified history per contact, SLA-based tickets and
sales pipeline live on the same platform. Learn about our
<a href="/en/whatsapp-customer-service/">WhatsApp customer service software for teams</a>.</p>
`,
};
