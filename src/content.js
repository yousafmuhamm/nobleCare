export * from './content/business.js';
export * from './content/about.js';
export * from './content/faq.js';

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export const SERVICES = [
  {
    id: 'personal-care',
    icon: 'droplet',
    name: 'Personal Care',
    short: 'Help with bathing, grooming, dressing and getting around, offered with dignity and at your parent’s pace.',
    description:
      'Some tasks get harder with age, and asking for help with them can feel awkward. Our caregivers are trained to make it feel natural. They go at your loved one’s pace and respect their routines and privacy.',
    included: [
      'Bathing, showering and skin care',
      'Dressing and grooming',
      'Toileting and continence support',
      'Help moving safely around the home',
      'Transfers in and out of bed or chairs',
      'Fall prevention and safety checks',
    ],
    fit: 'A good fit if your parent needs a hand with daily routines but wants to stay in their own home.',
  },
  {
    id: 'companionship',
    icon: 'users',
    name: 'Companionship Care',
    short: 'Friendly company, conversation and activities that bring a little more joy to each day.',
    description:
      'Loneliness is hard on anyone. A regular visitor who listens, laughs and shares a cup of tea can change how a whole week feels. We match people on personality and interests, not just schedules.',
    included: [
      'Conversation, games and hobbies',
      'Walks and time outdoors',
      'Reading together and looking through photos',
      'Help staying in touch with family and friends',
      'Light meal company',
      'A regular, familiar face',
    ],
    fit: 'A good fit if your parent is mostly well but spends too much time alone.',
    image: { src: 'knitting-companions.jpg', w: 1400, h: 990, alt: 'A caregiver sitting with older women who are knitting and chatting together' },
  },
  {
    id: 'respite-care',
    icon: 'coffee',
    name: 'Respite Care',
    short: 'A reliable break for family caregivers, from a few hours to a few days.',
    description:
      'Caring for someone you love is a gift, and it is also exhausting. Respite care gives you time to rest, run errands or simply breathe, knowing a trusted person is with your family member.',
    included: [
      'Regular weekly breaks of a few hours',
      'Short stays while you travel or recover',
      'Overnight cover so you can sleep',
      'Continuing your loved one’s routine',
      'Updates after every visit',
      'Last-minute help when we can',
    ],
    fit: 'A good fit if you are the main caregiver and running on empty.',
    image: { src: 'photo-album-together.jpg', w: 1400, h: 932, alt: 'A younger woman and an older man laughing together over a photo album on a sofa' },
  },
  {
    id: 'dementia-care',
    icon: 'frame',
    name: 'Dementia & Alzheimer’s Care',
    short: 'Patient, calm support from caregivers trained in memory care.',
    description:
      'Memory loss changes how a person experiences the world. Our caregivers learn what comforts your loved one and keep days predictable, kind and safe. We work with you so care follows the person, not just the diagnosis.',
    included: [
      'Familiar daily routines and gentle prompts',
      'Safe, calm responses to confusion or worry',
      'Memory activities such as music and photos',
      'Wandering and home safety awareness',
      'Support with eating, hydration and rest',
      'Guidance and reassurance for the family',
    ],
    fit: 'A good fit if memory changes are affecting daily life or safety at home.',
    image: { src: 'hands-holding.jpg', w: 1400, h: 933, alt: 'A younger hand gently holding an older hand in warm light' },
  },
  {
    id: 'recovery-care',
    icon: 'sunrise',
    name: 'Post-Hospital & Recovery Care',
    short: 'Extra hands at home after surgery, illness or a hospital stay.',
    description:
      'Coming home from hospital is a vulnerable time. We help your loved one settle in, follow the care plan and rebuild strength, so recovery is steadier and the family is less worried.',
    included: [
      'Support with the discharge care plan',
      'Help with mobility and gentle exercises',
      'Personal care while strength returns',
      'Meals and hydration',
      'Reminders for medication and appointments',
      'Watching for changes and telling you early',
    ],
    fit: 'A good fit if a hospital stay or surgery is coming up, or has just ended.',
    image: { src: 'couple-laughing-outdoors.jpg', w: 1000, h: 1500, alt: 'An older couple laughing together outside a brick home, she uses a walker' },
  },
  {
    id: 'palliative-care',
    icon: 'leaf',
    name: 'Palliative & End-of-Life Support',
    short: 'Quiet comfort and presence for your loved one, and support for you.',
    description:
      'At this stage, comfort and dignity matter most. We work alongside your nurses and doctors so your loved one can stay at home, surrounded by what is familiar, with someone gentle always close by.',
    included: [
      'Comfort-focused personal care',
      'A calm, reassuring presence',
      'Overnight support for families',
      'Working with your health care team',
      'Respecting wishes and traditions',
      'Emotional support for the whole family',
    ],
    fit: 'A good fit if you want your loved one to be comfortable at home.',
    image: { src: 'hands-support.jpg', w: 1000, h: 1500, alt: 'Several hands holding one another in support against a dark background' },
  },
  {
    id: 'live-in-care',
    icon: 'moon',
    name: 'Overnight & 24-Hour Live-In Care',
    short: 'Someone there through the night, or around the clock.',
    description:
      'Nights can be the hardest part of the day for families. Overnight and live-in care means help is always close, whether that is a quiet bathroom trip at 3 a.m. or a steady hand through the day.',
    included: [
      'Awake overnight caregivers',
      'Live-in caregivers with proper rest breaks',
      'Help with night-time toileting and repositioning',
      'Reassurance for those who wake confused or anxious',
      'Morning routines and breakfast',
      'A daily note to keep the family in the loop',
    ],
    fit: 'A good fit if your parent should not be alone at night, or needs help throughout the day.',
  },
  {
    id: 'housekeeping-meals',
    icon: 'utensils',
    name: 'Light Housekeeping, Meals & Errands',
    short: 'A tidy, comfortable home, good food on the table and errands taken care of.',
    description:
      'A clean kitchen and a proper meal do a lot for health and mood. We keep the home safe and comfortable, cook what your loved one actually enjoys and take care of the small jobs that pile up.',
    included: [
      'Light cleaning, laundry and tidying',
      'Meal planning and home cooking',
      'Special diets and dietary needs',
      'Grocery shopping and pharmacy pickups',
      'Changing bed linens',
      'Keeping the fridge fresh and safe',
    ],
    fit: 'A good fit if the home or the kitchen is getting harder to keep up with.',
  },
  {
    id: 'medication-reminders',
    icon: 'pill',
    name: 'Medication Reminders',
    short: 'Gentle, on-time reminders so medication is taken as prescribed.',
    description:
      'Missed or doubled doses are a common worry. Our caregivers remind your loved one to take medication at the right time and keep a simple record for you. We do not change doses or give medical advice.',
    included: [
      'Timely verbal reminders',
      'Prompting from pre-sorted pill organizers',
      'A simple log you can read at any time',
      'Letting you know about missed doses',
      'Reminders about refills and appointments',
      'Working from your pharmacist’s or nurse’s plan',
    ],
    fit: 'A good fit if your parent is independent but sometimes forgets pills.',
  },
  {
    id: 'transportation',
    icon: 'car',
    name: 'Transportation & Appointment Escort',
    short: 'A friendly companion for the trip to the doctor, the shops or a family visit.',
    description:
      'Getting out is good for the spirit, and appointments are easier with someone beside you. Our caregivers drive or accompany your loved one, wait with them and make sure nothing gets missed.',
    included: [
      'Rides to medical and dental appointments',
      'A companion in the waiting room and exam room',
      'Notes of what the doctor said',
      'Trips to the shops, church or community events',
      'Help getting in and out of the car',
      'Walkers and wheelchairs safely handled',
    ],
    fit: 'A good fit if driving or getting to appointments has become stressful.',
    image: { src: 'wheelchair-sunset-walk.jpg', w: 1400, h: 933, alt: 'A person pushing someone in a wheelchair across a park at golden hour' },
  },
];

export const HOME_SERVICE_IDS = [
  'personal-care',
  'companionship',
  'respite-care',
  'dementia-care',
  'recovery-care',
  'housekeeping-meals',
];

export const PATHS = [
  {
    id: 'parent',
    icon: 'homeHeart',
    label: 'My mom or dad',
    title: 'You want them safe and still themselves.',
    message:
      'It is hard to see a parent need help, and harder to know when to step in. We start by listening to what matters to them, then build care that keeps their routines, their home and their independence.',
    services: ['personal-care', 'companionship', 'medication-reminders'],
  },
  {
    id: 'partner',
    icon: 'heart',
    label: 'My husband, wife or partner',
    title: 'You have been doing so much already.',
    message:
      'Caring for the person you share your life with is a lot to carry. We can step in for part of the day or the night, so you stay a spouse first and a caregiver second.',
    services: ['personal-care', 'respite-care', 'live-in-care'],
  },
  {
    id: 'self',
    icon: 'person',
    label: 'Myself',
    title: 'It is okay to ask for a little help.',
    message:
      'Wanting to stay in your own home is completely reasonable. We help with the parts of the day that have become harder, and you stay in charge of how things are done.',
    services: ['housekeeping-meals', 'transportation', 'companionship'],
  },
  {
    id: 'caregiver',
    icon: 'coffee',
    label: 'I’m a family caregiver and I need a break',
    title: 'You deserve rest too.',
    message:
      'Needing a break does not mean you love them any less. Our caregivers can cover a few hours, an evening or a few nights, and leave you a note so you know how it went.',
    services: ['respite-care', 'live-in-care', 'dementia-care'],
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
