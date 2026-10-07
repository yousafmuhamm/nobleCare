export * from './content/business.js';
export * from './content/about.js';
export * from './content/faq.js';
export * from './content/services.js';
export * from './content/team.js';

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export const PATHS = [
  {
    id: 'parent',
    icon: 'homeHeart',
    label: 'My mom or dad',
    title: 'You want them safe and still themselves.',
    message:
      'It is hard to see a parent need help, and harder to know when to step in. We start by listening to what matters to them, then build care that keeps their routines, their home and their independence.',
    services: ['personal-care', 'companionship', 'aging-in-place'],
  },
  {
    id: 'partner',
    icon: 'heart',
    label: 'My husband, wife or partner',
    title: 'You have been doing so much already.',
    message:
      'Caring for the person you share your life with is a lot to carry. We can step in for part of the day or the night, so you stay a spouse first and a caregiver second.',
    services: ['personal-care', 'respite-care', 'overnight-care'],
  },
  {
    id: 'self',
    icon: 'person',
    label: 'Myself',
    title: 'It is okay to ask for a little help.',
    message:
      'Wanting to stay in your own home is completely reasonable. We help with the parts of the day that have become harder, and you stay in charge of how things are done.',
    services: ['housekeeping-errands', 'meals-home-support', 'transportation'],
  },
  {
    id: 'caregiver',
    icon: 'coffee',
    label: 'I’m a family caregiver and I need a break',
    title: 'You deserve rest too.',
    message:
      'Needing a break does not mean you love them any less. Our caregivers can cover a few hours, an evening or a few nights, and leave you a note so you know how it went.',
    services: ['respite-care', 'overnight-care', 'dementia-care'],
  },
];

export const STEPS = [
  { title: 'Free consultation', text: 'We talk with you, and your loved one if they are able, about what is needed and what matters most.' },
  { title: 'Personalized care plan', text: 'We write a clear plan together, with hours, tasks and routines. You approve it before anything starts.' },
  { title: 'Caregiver matching', text: 'We introduce a caregiver who suits your loved one’s personality and needs.' },
  { title: 'Ongoing check-ins', text: 'We keep in touch, listen to feedback and adjust the plan as needs change.' },
];

export const WHY = [
  { title: 'Screened and trained caregivers', text: 'Every caregiver is interviewed, background checked and trained before meeting a family.' },
  { title: 'The same caregiver, wherever possible', text: 'Familiar faces build trust. We aim for consistency so your loved one is not meeting someone new each week.' },
  { title: 'Flexible scheduling', text: 'A few hours, overnight or full days. Care can start small and change as life does.' },
  { title: 'Open communication with family', text: 'You will know how the day went. Call us any time with a question or concern.' },
  { title: 'A local team', text: 'We live and work in your community, so you are talking to neighbours, not a call centre.' },
  { title: 'No long-term contracts', text: 'Stay for as long as it helps. You can pause or change care when you need to.' },
];

export const TRUST = [
  { icon: 'shield', label: 'Licensed & Insured' }, // SAMPLE: confirm you hold the licences and insurance you claim
  { icon: 'users', label: 'Vetted Caregivers' },
  { icon: 'clock', label: 'Available 24/7' },
];

export const img = (name) => `/images/${name}`;
