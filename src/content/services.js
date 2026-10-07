// Service menu. This file is plain data (no imports) so the contact form's
// server-side validation can share the same list of service ids.
//
// Each service: id (used in links like /services#id), group, icon, name,
// short (one line for cards), description, included (bullet list), fit,
// optional image, optional note (scope reminder shown under the list) and
// optional includedLabel (heading for the list, default "What's included").

export const SERVICE_GROUPS = [
  {
    id: 'everyday',
    title: 'Everyday care at home',
    intro: 'Help with the daily routines that keep life comfortable, safe and familiar.',
  },
  {
    id: 'specialized',
    title: 'Specialized support',
    intro: 'Steady, knowledgeable care for memory loss, disability, recovery and the end of life.',
  },
  {
    id: 'relief',
    title: 'Breaks and around-the-clock care',
    intro: 'Relief for family caregivers, and care in the evenings, overnight and on weekends.',
  },
  {
    id: 'staffing',
    title: 'Care staffing',
    intro: 'Screened caregivers and support staff for families who hire privately and for care organizations.',
  },
];

export const SERVICES = [
  // ---------------------------------------------------------------- Everyday care at home
  {
    id: 'personal-care',
    group: 'everyday',
    icon: 'droplet',
    name: 'Personal Care & Daily Living Support',
    short: 'Help with bathing, dressing, grooming and getting around, given with dignity and at your loved one’s pace.',
    description:
      'Some everyday tasks get harder with age or illness, and asking for help can feel awkward. Our caregivers make it feel natural. They go at your loved one’s pace and respect their routines and privacy.',
    included: [
      'Bathing, showering and personal hygiene',
      'Grooming, dressing and oral care',
      'Toileting and continence care',
      'Help walking, moving and transferring safely',
      'Positioning and comfort',
      'Help at mealtimes, including feeding',
      'Morning and bedtime routines',
      'Medication reminders',
      'Keeping an eye on everyday safety',
    ],
    fit: 'A good fit if your loved one needs a hand with daily routines but wants to stay in their own home.',
  },
  {
    id: 'aging-in-place',
    group: 'everyday',
    icon: 'homeHeart',
    name: 'Senior & Aging-in-Place Care',
    short: 'Everyday support so older adults can keep living safely in the home they love.',
    description:
      'Most people want to grow older in their own home. With the right help at the right times, that is possible for longer than many families expect. We build care around your loved one’s routines and adjust it as needs change.',
    included: [
      'Everyday help so your loved one can stay at home',
      'Support with daily living tasks',
      'Meal, drink and medication reminders',
      'Help moving around safely and preventing falls',
      'Keeping household routines on track',
      'Company at appointments',
      'Relief for family caregivers',
      'Overnight and extended-hour care',
      '24-hour care, where appropriate',
    ],
    fit: 'A good fit if your parent wants to stay at home and the family wants peace of mind.',
    image: { src: 'activity-coloring.jpg', w: 1400, h: 990, alt: 'A caregiver helping an older man and woman with a colouring activity at a table' },
  },
  {
    id: 'companionship',
    group: 'everyday',
    icon: 'users',
    name: 'Companionship & Social Support',
    short: 'Friendly company, conversation and activities that bring more joy to each day.',
    description:
      'Loneliness is hard on anyone. A regular visitor who listens, laughs and shares a cup of tea can change how a whole week feels. We match people on personality and interests, not just schedules.',
    included: [
      'Regular companionship visits at home',
      'Conversation and friendly social time',
      'Reading, games, hobbies and other activities',
      'Company on walks and community outings',
      'Emotional support and encouragement',
      'Wellness check-in visits',
      'Company for your loved one while the family takes a break',
      'Support for people who feel isolated',
    ],
    fit: 'A good fit if your loved one is mostly well but spends too much time alone.',
    image: { src: 'knitting-companions.jpg', w: 1400, h: 990, alt: 'A caregiver sitting with older women who are knitting and chatting together' },
  },
  {
    id: 'meals-home-support',
    group: 'everyday',
    icon: 'utensils',
    name: 'Meal Preparation & Home Support',
    short: 'Good home-cooked food, help at mealtimes and a kitchen kept clean and safe.',
    description:
      'Eating well makes a big difference to health and mood. We plan and cook meals your loved one enjoys, follow any diet they have been given, and make sure they eat and drink enough.',
    included: [
      'Meal planning',
      'Grocery shopping',
      'Home cooking and meal preparation',
      'Help with eating, when needed',
      'Reminders to drink enough',
      'Following written dietary instructions',
      'Kitchen clean-up and tidying',
      'Keeping the fridge and pantry stocked and safe',
      'Letting the family know about changes in eating or drinking',
    ],
    fit: 'A good fit if cooking has become hard or meals are being skipped.',
  },
  {
    id: 'housekeeping-errands',
    group: 'everyday',
    icon: 'sparkles',
    name: 'Light Housekeeping & Errands',
    short: 'A clean, comfortable home, with errands and small jobs taken care of.',
    description:
      'A tidy home is safer and easier to live in. We keep on top of the everyday jobs that pile up, so your loved one can enjoy their home instead of worrying about it.',
    included: [
      'Light cleaning',
      'Laundry and changing bed linens',
      'Making beds',
      'Washing dishes and tidying the kitchen',
      'Tidying the bathroom',
      'Taking out the garbage',
      'Keeping the main living area organized',
      'Grocery shopping and pharmacy pickups',
      'Banking and other everyday errands',
    ],
    fit: 'A good fit if the house, or the weekly errands, are getting harder to keep up with.',
  },
  {
    // SAMPLE: only offer driving clients if your insurance, driver screening and vehicle policies cover it.
    id: 'transportation',
    group: 'everyday',
    icon: 'car',
    name: 'Appointment & Transportation Assistance',
    short: 'A friendly companion for appointments, errands and outings, from door to door.',
    description:
      'Getting out is good for the spirit, and appointments are easier with someone beside you. Our caregivers go with your loved one from their front door to the appointment and back, and make sure nothing gets missed.',
    included: [
      'Medical and clinic appointments',
      'Hospital visits',
      'Pharmacy trips',
      'Grocery shopping',
      'Banking and other errands',
      'Community activities and religious services',
      'Family and social events',
      'Door-to-door help, there and back',
    ],
    fit: 'A good fit if getting to appointments or running errands has become stressful.',
    image: { src: 'wheelchair-sunset-walk.jpg', w: 1400, h: 933, alt: 'A person pushing someone in a wheelchair across a park at golden hour' },
  },

  // ---------------------------------------------------------------- Specialized support
  {
    id: 'dementia-care',
    group: 'specialized',
    icon: 'frame',
    name: 'Dementia & Memory Support',
    short: 'Patient, calm support that keeps days familiar, safe and meaningful.',
    description:
      'Memory loss changes how a person experiences the world. Our caregivers learn what comforts your loved one and keep days predictable, kind and safe. We work with your family so care follows the person, not just the diagnosis.',
    included: [
      'Companionship from caregivers who understand dementia',
      'Help with routines and staying oriented',
      'Watching out for safety',
      'Meal and drink reminders',
      'Personal care',
      'Meaningful activities and engagement',
      'Relief for family caregivers',
      'Supervision for wandering risk, as set out in the care plan',
    ],
    fit: 'A good fit if memory changes are affecting daily life or safety at home.',
    image: { src: 'hands-holding.jpg', w: 1400, h: 933, alt: 'A younger hand gently holding an older hand in warm light' },
  },
  {
    id: 'disability-support',
    group: 'specialized',
    icon: 'accessible',
    name: 'Disability & Independent Living Support',
    short: 'Practical support for adults living with a disability who want to live independently.',
    description:
      'Independence looks different for everyone. We help with the parts of the day that need an extra pair of hands, so the people we support can live the way they choose, at home and in their community.',
    included: [
      'Personal assistance',
      'Help moving and transferring',
      'Meal preparation',
      'Household tasks',
      'Getting out and taking part in the community',
      'Company at appointments',
      'Shopping and errands',
      'Support with daily routines',
    ],
    fit: 'A good fit if an adult in your family needs help to live independently.',
  },
  {
    id: 'hospital-to-home',
    group: 'specialized',
    icon: 'homeArrow',
    name: 'Hospital-to-Home & Recovery Support',
    short: 'A calm, safe return home after a hospital stay, and steady help while your loved one recovers.',
    description:
      'Coming home from hospital or surgery is a vulnerable time. We help your loved one settle back in safely, follow the discharge plan and take care of the everyday things, so they can focus on getting stronger.',
    included: [
      'Help after hospital discharge',
      'Settling back in safely at home',
      'Personal care while strength returns',
      'Meal preparation',
      'Help moving around',
      'Rides and company at follow-up appointments',
      'Medication reminders',
      'Overnight help',
      'Relief for family caregivers',
      'Watching for concerns and raising them as set out in the care plan',
    ],
    fit: 'A good fit if a hospital stay or surgery is coming up, or has just ended.',
    note: 'This is non-medical support. Wound care, nursing and medical care stay with your health care team.',
    image: { src: 'couple-laughing-outdoors.jpg', w: 1000, h: 1500, alt: 'An older couple laughing together outside a brick home, she uses a walker' },
  },
  {
    id: 'palliative-care',
    group: 'specialized',
    icon: 'leaf',
    name: 'Palliative & Comfort Support',
    short: 'Quiet comfort and presence for your loved one, and support for the whole family.',
    description:
      'At this stage, comfort and dignity matter most. We work alongside your loved one’s clinical team so they can stay at home, surrounded by what is familiar, with someone gentle always close by.',
    included: [
      'Comfort-focused, non-medical care',
      'Personal care',
      'Companionship',
      'Relief for family members',
      'Meals and household help',
      'Overnight presence',
      'Emotional support for your loved one and family',
    ],
    fit: 'A good fit if you want your loved one to be comfortable at home.',
    note: 'Clinical palliative care is provided by qualified health professionals. We work alongside them.',
    image: { src: 'hands-support.jpg', w: 1000, h: 1500, alt: 'Several hands holding one another in support against a dark background' },
  },

  // ---------------------------------------------------------------- Breaks and around-the-clock care
  {
    id: 'respite-care',
    group: 'relief',
    icon: 'coffee',
    name: 'Respite & Family Caregiver Relief',
    short: 'Reliable breaks for family caregivers, from a few hours to a full weekend.',
    description:
      'Caring for someone you love is a gift, and it is also exhausting. We give family caregivers real breaks and keep you informed, so you can rest knowing a trusted person is with your family member.',
    included: [
      'Hourly breaks',
      'Daytime, evening or overnight respite',
      'Weekend respite and vacation cover',
      'Planned, regular relief',
      'Short-notice emergency cover, when staff are available',
      'Showing family members our care routines',
      'Family updates, with your loved one\u2019s consent',
      'Reporting and acting on changes in condition',
    ],
    fit: 'A good fit if you are the main caregiver and running on empty.',
    image: { src: 'photo-album-together.jpg', w: 1400, h: 932, alt: 'A younger woman and an older man laughing together over a photo album on a sofa' },
  },
  {
    id: 'overnight-care',
    group: 'relief',
    icon: 'moon',
    name: 'Overnight & Extended Care',
    short: 'Someone there in the evening, through the night, or for longer shifts.',
    description:
      'Nights can be the hardest time for families. Whether your loved one needs someone awake all night or just a reassuring presence, help is close by when it matters.',
    included: [
      'Evening care',
      'Overnight supervision',
      'An awake overnight caregiver',
      'A sleep-over caregiver, where appropriate',
      'Early-morning help',
      'Extended shifts',
      'Weekend and holiday cover',
    ],
    fit: 'A good fit if your loved one should not be alone at night.',
  },

  // ---------------------------------------------------------------- Staffing services
  {
    id: 'staffing',
    group: 'staffing',
    icon: 'userCheck',
    name: 'Private Caregiver & Healthcare Staffing',
    short: 'Carefully screened caregivers and health care support staff, for families and care organizations.',
    description:
      'Whether you are a family looking for dedicated private care or an organization that needs extra hands, we find, screen and place the right caregivers and support staff, for a few shifts or an ongoing arrangement.',
    includedLabel: 'Staff we can provide',
    included: [
      'Caregivers and companions',
      'Health care aides',
      'Respite workers',
      'Home support workers and homemakers',
      'Private-duty support staff',
      'Overnight caregivers',
      'Live-in arrangements, where appropriate',
    ],
    fit: 'A good fit if your family, or your organization, needs dependable care staff.',
    note: 'We staff private homes, seniors\u2019 residences, assisted-living and supportive-living sites, other home-care providers and community organizations. Contract terms and staff qualifications are agreed with each client.',
  },
];

// The six services shown as cards on the Home page.
export const HOME_SERVICE_IDS = [
  'personal-care',
  'companionship',
  'dementia-care',
  'respite-care',
  'hospital-to-home',
  'overnight-care',
];
