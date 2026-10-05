// ---------------------------------------------------------------------------
// Business details. This is the main file to edit before launch.
//
// Every line tagged `// SAMPLE` is made-up example content. Replace it with the
// real detail, then delete the tag. Run `npm run check:samples` to list any
// that are left.
// ---------------------------------------------------------------------------

export const BUSINESS = {
  name: 'North & Noble Care',
  website: 'https://www.northandnoblecare.ca', // SAMPLE
  phoneDisplay: '(403) 555-0142', // SAMPLE (555-01xx numbers are reserved for fiction)
  phoneHref: 'tel:+14035550142', // SAMPLE
  email: 'hello@northandnoblecare.ca', // SAMPLE
  address: {
    street: 'Suite 210, 123 Sample Avenue SW', // SAMPLE
    city: 'Calgary', // SAMPLE
    region: 'AB', // SAMPLE
    postalCode: 'T2P 0A1', // SAMPLE
  },
  officeHours: 'Monday to Friday, 8 a.m. to 6 p.m.', // SAMPLE
  careHours: 'Care is available 24 hours a day, 7 days a week', // SAMPLE
  responseTime: 'within one business day', // SAMPLE
  legalLine: 'Insured and bonded. All caregivers pass a police information check.', // SAMPLE
};

export const CITY = BUSINESS.address.city;
export const PHONE_LABEL = BUSINESS.phoneDisplay;
export const PHONE_HREF = BUSINESS.phoneHref;

// SAMPLE: confirm which communities you actually serve.
export const COMMUNITIES = [
  'Airdrie',
  'Cochrane',
  'Chestermere',
  'Okotoks',
  'Strathmore',
  'High River',
  'Bragg Creek',
  'Langdon',
];

export const FOUNDER = {
  name: 'Margaret Ellis', // SAMPLE
  role: 'Founder & Care Director', // SAMPLE
  // Add a real photo (portrait, at least 800px wide) to public/images and set
  // e.g. photo: { src: 'founder.jpg', w: 1000, h: 1250 }. Until then, the logo shows.
  photo: null,
  // SAMPLE: rewrite in the founder's own words.
  note: [
    'Choosing care for someone you love is one of the hardest decisions a family makes. You want them safe. You want them to still feel like themselves. And you want to trust the person walking through their front door.',
    'That is why I started North & Noble Care. We hire caregivers we would welcome into our own homes, we take the time to match them well, and we keep you in the loop every step of the way.',
    'If you are worried about someone right now, I hope you will call us. Even if we are not the right fit, we will help you find your next step.',
  ],
};

// Testimonials must be real, from real clients, used with their permission.
// While `TESTIMONIALS_ARE_SAMPLES` is true, the site shows a visible "sample" note
// next to them so example quotes can never pass as real reviews.
export const TESTIMONIALS_ARE_SAMPLES = true; // SAMPLE: set to false once these are real
export const TESTIMONIALS = [
  {
    quote: 'Mom was nervous about having someone new in the house. By the second week she was asking when Grace was coming back. For the first time in months, I can go to work without worrying all day.', // SAMPLE
    name: 'Linda M., daughter', // SAMPLE
  },
  {
    quote: 'They call when something changes and they always pick up when I call. That alone has taken so much weight off our family.', // SAMPLE
    name: 'David R., son', // SAMPLE
  },
  {
    quote: 'Our caregiver feels like part of the family now. My husband looks forward to their walks every afternoon.', // SAMPLE
    name: 'Joan T., wife', // SAMPLE
  },
];
