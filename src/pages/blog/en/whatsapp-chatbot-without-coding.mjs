// Supports /en/deskflow/ and /en/whatsapp-customer-service/ (informational intent: "WhatsApp
// chatbot", "WhatsApp flow automation"). English counterpart of /blog/chatbot-whatsapp-sem-programar/.
export default {
  key: 'post-whatsapp-chatbot',
  slug: 'whatsapp-chatbot-without-coding',
  title: 'How to Build a WhatsApp Chatbot Without Coding',
  description:
    'Step by step to build a WhatsApp chatbot in a visual flow builder: goal, menu, data capture, API integration, AI and hand-off to your team.',
  h1: 'How to build a WhatsApp chatbot without coding',
  published: '2026-10-23',
  solutions: ['/en/deskflow/', '/en/whatsapp-customer-service/', '/en/customer-service-automation/'],
  summary: `a WhatsApp chatbot is a flow: trigger, menu, questions, conditions and actions. With a
    visual builder you assemble that flow by dragging blocks, connect the WhatsApp account, test it in
    a simulated environment and publish. The most important decision is when the conversation goes to
    a person.`,
  body: `
<p>A large share of the messages that reach a company’s WhatsApp are predictable: opening hours,
order status, a copy of an invoice, booking an appointment, talking to sales. A
<strong>WhatsApp chatbot</strong> handles that volume with no queue and no waiting, and passes to
your team only what needs a person. This guide shows how to build one from scratch in a
<strong>visual flow builder</strong>, without writing code.</p>

<h2>What a flow chatbot is</h2>
<p>A flow chatbot is a diagram that runs: each block is a step (send a message, ask a question,
query a system, transfer) and each arrow is a transition, with or without a condition. When the
customer sends a message, the flow starts at the start block and follows the arrows until it ends
or hands the conversation to an agent.</p>
<p>That is different from an AI replying freely. The flow is deterministic: the same answer always
leads to the same place. AI can come in at specific points, as we will see, but the backbone of
the chatbot is the flow.</p>

<h2>Step 1: define what the chatbot solves and what it doesn’t</h2>
<p>List the five most frequent reasons for contact. For each one, decide: does the chatbot solve it
alone, solve it with a lookup in another system, or only collect the details and transfer? This
mapping avoids the most common mistake, which is trying to automate everything and frustrating
the people who needed a person.</p>
<ul>
  <li><strong>Solves alone:</strong> hours, address, payment methods, return policy.</li>
  <li><strong>Solves with a lookup:</strong> order status, balance, invoice copy, available time slots.</li>
  <li><strong>Collects and transfers:</strong> complaints, negotiations, anything off script.</li>
</ul>

<h2>Step 2: sketch the flow before configuring</h2>
<p>On paper or in the editor itself, draw the conversation as a diagram: welcome, main menu, one
branch per option and, in each branch, the questions, the lookups and the ending or the transfer.
A good first flow has few menu levels and a clear path to “talk to an agent” from any point.</p>

<h2>Step 3: build the chatbot in the visual builder</h2>
<p>In <a href="/en/deskflow/">DeskFlow</a>, VipDesk’s flow builder, blocks sit in a palette and are
dragged onto the canvas. The ones you will use first:</p>
<ol>
  <li><strong>Start:</strong> the trigger. The flow starts when a message arrives on the WhatsApp account bound to it.</li>
  <li><strong>Text message:</strong> the greeting. Use variables such as the contact’s name to personalize it.</li>
  <li><strong>Menu (router):</strong> numbered options. Each option becomes an output of the block; the error output covers unexpected replies.</li>
  <li><strong>Buttons and lists:</strong> alternatives to the typed menu, within WhatsApp’s limits (buttons allow at most three options).</li>
  <li><strong>Capture data:</strong> asks and validates the answer (ID number, order number, email) and stores it in a conversation variable.</li>
  <li><strong>Condition (if/else):</strong> picks the path from a variable, such as “registered customer” or “amount greater than”.</li>
  <li><strong>Transfer:</strong> hands the conversation to a department, distributing it among available agents.</li>
  <li><strong>End:</strong> finishes the flow and clears the conversation context.</li>
</ol>
<p>Conditions can also live on the arrows themselves (equals, contains, positive answer, digits
only, regular expression), which keeps the diagram lean.</p>

<h2>Step 4: connect the chatbot to your systems</h2>
<p>This is where the chatbot stops being a menu and starts solving things. The HTTP request block
calls your system’s API (ERP, e-commerce, calendar, in-house system) with the details the customer
gave, and the response becomes a variable for the next messages:</p>
<p class="destaque">“Your order <code>\${{order.number}}</code> is <code>\${{order.status}}</code>
and should arrive on <code>\${{order.eta}}</code>.”</p>
<p>Store credentials as secrets (never in the flow text), handle the call’s error output (transfer
to an agent instead of leaving the customer without a reply) and use the block’s one-off test to
check the API response before publishing.</p>

<h2>Step 5: use AI only where it helps</h2>
<p>Two uses are worth it from day one:</p>
<ul>
  <li><strong>Understanding free text at the menu.</strong> If the customer writes “my delivery is late” instead of typing “2”, the AI picks the matching option. Whoever types the number goes straight through, with no AI.</li>
  <li><strong>Answering questions from your knowledge base.</strong> An AI agent with access to your documents answers open questions and transfers when it doesn’t know.</li>
</ul>
<p>Keep the AI fenced by the flow: deterministic validations before it, controlled actions after
it and always a path to your team. The article
<a href="/en/blog/ai-agent-for-whatsapp/">AI agent for WhatsApp: what it does and when to use it</a>
goes into the criteria.</p>

<h2>Step 6: decide how the conversation reaches your team</h2>
<p>The best chatbot is the one that knows when to stop. Define:</p>
<ul>
  <li>Which menu options transfer directly, and to which department.</li>
  <li>What happens outside business hours: a condition on the current time says so, logs the request and, if needed, flags the ticket for the next morning.</li>
  <li>How many attempts the customer gets before the conversation goes to a person.</li>
</ul>
<p>In a customer service system such as VipDesk, the agent receives the conversation in the same
queue as <a href="/en/whatsapp-customer-service/">WhatsApp with multiple agents</a>, with the
history of what the chatbot already asked. Nobody asks for the ID number twice.</p>

<h2>Step 7: test, publish and activate</h2>
<ol>
  <li><strong>Test in the playground</strong>, with simulated sessions, before any customer sees the flow.</li>
  <li><strong>Publish</strong> when you are satisfied. Changes stay in a draft until then, and the version history lets you roll back.</li>
  <li><strong>Bind the WhatsApp account</strong> to the flow and activate it. An account belongs to one active flow at a time.</li>
  <li><strong>Watch the execution logs</strong> during the first days and adjust error messages and transfer points.</li>
</ol>

<h2>About the WhatsApp connection</h2>
<p>The chatbot runs on the WhatsApp account connected to the platform. For business-critical
operations, VipDesk’s <a href="/en/terms/">Terms of Use</a> recommend the official WhatsApp Business
API, which is also what allows sending approved templates in scheduled flows such as reminders and
billing notices. A QR-code connection exists, but carries a risk of the number being blocked.</p>

<h2>Common mistakes</h2>
<ul>
  <li><strong>Too many menu levels.</strong> Three taps to reach “talk to an agent” is already too many.</li>
  <li><strong>No error output.</strong> Every system lookup and every menu needs a path for unexpected replies.</li>
  <li><strong>Automating complaints.</strong> An upset customer wants a person. Collect the minimum and transfer.</li>
  <li><strong>Forgetting what happens after the transfer.</strong> The agent needs to see what the chatbot already did; otherwise the customer repeats everything.</li>
</ul>
<p class="destaque">In VipDesk, the chatbot is built in <a href="/en/deskflow/">DeskFlow</a>, with
menus, data capture, API integration, AI agents and hand-off to your team on the same WhatsApp
number. In the demo, we build the flow around your scenario.</p>
`,
};
