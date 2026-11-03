export const site = {
  name: 'Centrl',
  url: 'https://centrl.rossinetwork.com',
  email: 'hello@centrl.rossinetwork.com',
  price: '$149',
  tagline: 'One place for everything you use. Ask once. Centrl handles the rest.',
} as const;

export const connections = [
  { name: 'Inbox', detail: 'Support mail and the follow-ups that stall there.' },
  { name: 'Calendar', detail: 'Holds, moves, and confirmations on the calendar you already share.' },
  { name: 'CRM', detail: 'Leads, estimates, and the notes around a job.' },
  { name: 'Team chat', detail: 'The room where a request actually starts.' },
  { name: 'Invoices', detail: 'Who has been billed, and who still needs a nudge.' },
  { name: 'Bookings', detail: 'Visits and appointments that should not collide.' },
  { name: 'Shared docs', detail: 'The sheet, scope, or folder where the job lives.' },
  { name: 'Forms', detail: 'Requests that arrive overnight and need a first response.' },
] as const;

export const faqs = [
  {
    q: 'What is Centrl?',
    a: 'Centrl is AI-native software for small service businesses. It connects the tools you already use, then agents execute work: follow-ups, support replies, scheduling, and organizing information.',
  },
  {
    q: 'Is Centrl another chatbot?',
    a: 'No. A chatbot stops at an answer. Centrl is built to carry the task through: reply, follow up, schedule, and file the result where your team already works.',
  },
  {
    q: 'Who is it for?',
    a: 'Owners and operators of small service businesses, about 2 to 30 people, who lose hours to admin across email, calendars, CRM, and chat.',
  },
  {
    q: 'What do the three lines cover?',
    a: 'Centrl Support handles customer questions, support email, and follow-ups. Centrl Growth handles marketing execution, sales assist, and lead follow-up. Centrl Ops handles scheduling, workflow coordination, admin, and organizing information.',
  },
  {
    q: 'What does $149 a month include?',
    a: 'One subscription. All three lines. Connections to the tools you already run, one place to ask, and a record of what was done. We talk through the setup before anything is switched on.',
  },
  {
    q: 'Which tools does it connect to?',
    a: 'Centrl is designed to meet the inbox, calendar, CRM, and chat you already run, plus the docs and invoices around them. It does not ask you to replace that stack. Exact connections are confirmed with you before they are turned on.',
  },
  {
    q: 'How do we start?',
    a: 'Use the contact form or write to hello@centrl.rossinetwork.com. Tell us the size of the team and the work you want handled first.',
  },
  {
    q: 'Are there other plans?',
    a: 'The published plan is $149 a month. If your setup needs a different shape, contact us. We do not list extra tiers.',
  },
] as const;

export const howSteps = [
  {
    n: '01',
    title: 'You name the outcome',
    body: 'One request, in plain language. The quiet estimates. The open support threads. Thursday’s crew without a double book.',
  },
  {
    n: '02',
    title: 'Centrl reads the tools involved',
    body: 'The inbox, calendar, CRM, and chat stay where they are. Centrl works from those records instead of asking you to paste them into a new home.',
  },
  {
    n: '03',
    title: 'An agent prepares the action',
    body: 'Replies, follow-ups, holds, and filing are prepared as work, not as a paragraph of advice.',
  },
  {
    n: '04',
    title: 'You approve what should leave',
    body: 'Customer-facing messages wait for you. The record shows what is ready and what already moved.',
  },
  {
    n: '05',
    title: 'The result lands where the team looks',
    body: 'The thread, the calendar, and the job notes stay in the tools your people already open.',
  },
] as const;

export const includes = [
  'Centrl Support, Centrl Growth, and Centrl Ops',
  'A setup conversation before the first workflow goes live',
  'Connections aimed at the tools you already pay for',
  'One place to ask, with a record of what was done',
  'Review before customer-facing messages go out',
  'A single monthly subscription for a team of about 2 to 30',
] as const;
