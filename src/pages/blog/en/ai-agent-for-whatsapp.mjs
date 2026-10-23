// Supports /en/deskflow/ and /en/ai-customer-service/ (informational intent: "AI agent for
// WhatsApp", "AI with WhatsApp"). English counterpart of /blog/agente-de-ia-no-whatsapp/.
export default {
  key: 'post-ai-agent-whatsapp',
  slug: 'ai-agent-for-whatsapp',
  title: 'AI Agent for WhatsApp: What It Does and When to Use It',
  description:
    'What an AI agent on WhatsApp is, how it differs from a menu chatbot and assistive AI, when it pays off and how to keep the conversation under control.',
  h1: 'AI agent for WhatsApp: what it does and when to use it',
  published: '2026-10-23',
  solutions: ['/en/deskflow/', '/en/ai-customer-service/', '/en/whatsapp-customer-service/'],
  summary: `an AI agent on WhatsApp talks to the customer following your instructions and calls
    tools: look up data, create a deal, book an appointment, transfer. It is worth using for open
    questions and varied lookups; not for what is predictable, which a menu flow handles better, nor
    for what requires human accountability. The secret is to fence it with rules.`,
  body: `
<p>“AI on WhatsApp” has become an umbrella term. It covers everything from a bot that replies “hi”
to an agent that checks stock, creates the order and schedules delivery. This article separates the
types, explains what an <strong>AI agent</strong> actually does in a WhatsApp conversation and
gives criteria to decide where it pays off.</p>

<h2>Three different things called “AI on WhatsApp”</h2>
<table class="comparativo">
  <thead>
    <tr><th>Type</th><th>What it does</th><th>Who decides the reply</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Flow chatbot</strong></td><td>Follows a diagram: menu, questions, conditions, actions.</td><td>The flow design. Same input, same output.</td></tr>
    <tr><td><strong>Assistive AI for agents</strong></td><td>Summarizes the conversation, suggests a reply, classifies the contact.</td><td>The human agent, who reviews and sends.</td></tr>
    <tr><td><strong>AI agent</strong></td><td>Talks to the customer, interprets requests and calls tools.</td><td>The model, within the instructions and tools you defined.</td></tr>
  </tbody>
</table>
<p>The three coexist. In a well-built operation, the flow handles the predictable, the agent the
open questions, and assistive AI speeds up the human agent once the conversation reaches a
person.</p>

<h2>What an AI agent does in a conversation</h2>
<p>An agent is a free-conversation block with three ingredients:</p>
<ol>
  <li><strong>Instructions.</strong> A text from you saying who it is, what it can and cannot do, its tone and when to transfer. It is the most important document in the project.</li>
  <li><strong>Conversation memory.</strong> It considers the recent messages and a summary of what came before, so it doesn’t ask the same thing twice.</li>
  <li><strong>Tools.</strong> Actions it can call when the conversation asks for them: search the knowledge base, query an API, create a CRM deal, check and book a time slot, generate a payment link, apply a tag, transfer to a department or end the chat.</li>
</ol>
<p>In practice the conversation looks like this: the customer asks “do you have model X in blue?”,
the agent calls the catalog lookup tool, reads the response and replies with what it found. If the
customer says “I’ll take it”, it creates the deal in the CRM and hands off to a sales rep. None of
this was scripted as a menu; it was defined as available tools and rules of use.</p>

<h2>When an agent is worth it</h2>
<ul>
  <li><strong>Open questions about your company</strong>, answered from a knowledge base: policies, products, lead times, documentation.</li>
  <li><strong>Varied lookups in the same system</strong>, where a menu would become huge: “what’s my order status”, “when is my invoice due”, “is there a slot on Thursday”.</li>
  <li><strong>Free text instead of options</strong>: people who describe the problem in their own words, including transcribed voice messages.</li>
  <li><strong>Lead qualification</strong> with questions that change depending on the previous answer.</li>
</ul>

<h2>When not to use it (or to use it carefully)</h2>
<ul>
  <li><strong>What is predictable.</strong> Opening hours and invoice copies don’t need a language model; a menu flow is cheaper, faster and doesn’t make mistakes.</li>
  <li><strong>Promises with consequences.</strong> Negotiated prices, guaranteed deadlines, cancellations, refunds. Leave them to a person, or limit the agent to collecting and transferring.</li>
  <li><strong>Upset customers.</strong> A complaint calls for human listening. Set the agent to transfer when it detects the tone, or keep it out of that branch altogether.</li>
  <li><strong>No knowledge base.</strong> An agent without a reliable source makes things up. Feed it your documents and limit replies to them.</li>
</ul>

<h2>How to keep the agent under control</h2>
<p>The risk with an agent is not that it “thinks too much”; it is that it operates without a
fence. Five fences that work:</p>
<ol>
  <li><strong>A flow around the agent.</strong> Before it, identify the customer and the topic with deterministic blocks. After it, run the actions through the flow, not through the AI. In <a href="/en/deskflow/">DeskFlow</a>, the agent is one block among others.</li>
  <li><strong>Minimal tools.</strong> Give only the tools that particular agent needs. A support agent doesn’t need to create CRM deals.</li>
  <li><strong>Explicit hand-off.</strong> A “transfer to human” tool with criteria written in the instructions: when it doesn’t know, when the customer asks, when there is a complaint.</li>
  <li><strong>Iteration and time limits.</strong> Prevents conversations going in circles and unexpected costs.</li>
  <li><strong>Test with real, anonymized conversations</strong> before publishing, and read the logs during the first weeks. The instructions improve with every review.</li>
</ol>

<h2>Cost and provider</h2>
<p>An agent consumes calls to a language model with every message. In VipDesk, you use the API
key of the provider your company chooses (OpenAI, Google Gemini or Anthropic), pay the provider
directly for usage and pick the model per flow. Hence the rule from the previous section: what the
flow can solve without AI, solve without AI.</p>

<h2>A complete example</h2>
<p>A repair service receives quote requests, status inquiries and complaints on WhatsApp.</p>
<ul>
  <li>The <strong>flow</strong> greets the customer, asks for an ID number and looks up the record through an API.</li>
  <li>An <strong>AI router</strong> reads the first message and sorts it: quote, status, complaint.</li>
  <li><strong>Status</strong> is solved by the flow with an API lookup, no agent involved.</li>
  <li><strong>Quote</strong> goes to an AI agent with the knowledge base of services and reference prices; when the customer accepts, the agent creates the CRM deal and hands off to the team.</li>
  <li><strong>Complaint</strong> never reaches the agent: the flow applies the tag, changes the ticket status and transfers to the supervisor.</li>
</ul>
<p>The result is an operation where AI answers what varies, the flow answers what repeats, and
the team receives what requires judgment, with full context.</p>
<p class="destaque">In VipDesk, AI agents are built in <a href="/en/deskflow/">DeskFlow</a> and work
alongside <a href="/en/ai-customer-service/">assistive AI for agents</a>. In the demo, we show an
agent configured for your scenario.</p>
`,
};
