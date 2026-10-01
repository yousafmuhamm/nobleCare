# North & Noble Care — "Warm Hearth" multi-page redesign

Status: approved direction (C. Warm Hearth), 5-page structure approved by the user. This file is the shared brief for every arena candidate.

## 1. The job

North & Noble Care is a local in-home care company for seniors in [PLACEHOLDER: Calgary] and surrounding areas. The site's single job: make a stressed adult child (45-65, often reading on a phone at night, worried about a parent) feel calm, understood and safe, then get them to book a free consultation or call.

Older adults (75+) also read the site themselves, so it must be easy to read for them too.

**The #1 requirement: the site must feel WARM, safe, trustworthy and human.** It should calm people down, not sell at them.

The first version failed because it looked broken: misaligned margins, wonky buttons, overflow on phones. **Polish is non-negotiable.** A plainer design that is pixel-clean beats an ambitious one with a single broken edge.

## 2. Direction: Warm Hearth (soft and guided)

The most approachable, home-like expression of the brand:

- **Soft and rounded, but not childish.** Gold-tinted panels (`--gold-light` #E8D9BC and lighter tints) set off key sections against the cream page. Generous radii, gentle shadows used sparingly, by role, not on everything.
- **Photos masked in soft organic shapes** (asymmetric border-radius blobs, arches, or similar), never hard rectangles in the hero. Keep faces uncropped.
- **Signature interaction: the "Who are you looking for care for?" path picker** on the Home page. Four choices:
  1. My mom or dad
  2. My husband, wife or partner
  3. Myself
  4. I'm a family caregiver and I need a break
  Choosing one reveals a short, empathetic message written for that person, 3 recommended services (links to `services.html#<id>`) and a consultation CTA. It must work with keyboard and screen readers (radio group or tabs with correct ARIA). A sensible default is pre-selected so the panel is never empty at rest.
- **Conversion-focused but gentle.** The free consultation CTA and the phone number are always easy to find. Don't be pushy.
- **Brand motifs used subtly:** the heart cradled by hands and the 4-point star from the logo, used as small accents (dividers, bullets, icon details). Don't plaster them everywhere.

## 3. Brand (fixed by the client, do not change)

| Token | Value | Use |
|---|---|---|
| Navy | `#0F2A4A` | headings, primary text accents, dark sections |
| Gold | `#C9A46A` | CTAs (with navy text), accents. **Never gold text on cream** (fails contrast). |
| Gold light | `#E8D9BC` | tinted panels, icon backgrounds |
| Cream | `#FBF8F3` | page background. Never pure white or cold grey as the page ground. |

You may derive tints/shades (for example a deeper gold for hover, a softer navy, a cream-dim panel colour), defined as CSS custom properties.

- **Headings:** Cormorant Garamond OR Libre Caslon (Display/Text), Google Fonts. Cormorant is thin at small sizes; use weight 600-700 and don't set it below ~22px.
- **Body:** Nunito Sans OR Lato, Google Fonts. **Body text 18px minimum** (17px absolute floor for secondary text), line-height 1.6-1.7, lines at most ~70 characters.
- Single light theme on purpose: this is a branded business site. Set `color-scheme: light` and an explicit `body` background.

Logo: no real logo file has been supplied yet. Use the stand-in mark at `images/logo-mark.svg` (heart cradled by hands plus a 4-point star). Inline it in the header and footer so it can be recoloured (for example light strokes on the navy footer), next to a serif wordmark "North & Noble" with a small "CARE AT HOME" tag. The wordmark must never wrap onto multiple lines.

## 4. Pages

The full site has 5 pages. **Candidates build only Home and Services** (the two hardest pages); About, FAQ and Contact are built later on the winning system, so make the shared CSS genuinely reusable.

All pages share identical header and footer markup. Nav, in order: **Home, Services, About, FAQ, Contact** (`index.html`, `services.html`, `about.html`, `faq.html`, `contact.html`). The current page's nav item is visibly marked with `aria-current="page"`. Header also has the phone number (`tel:` link) and a gold **"Free Consultation"** button linking to `contact.html`.

### Home (`index.html`)
1. Hero: warm headline, subheadline speaking to the adult child, two CTAs ("Book a Free Consultation" -> contact.html, "Call [PLACEHOLDER: phone]"), the hero photo in an organic mask, and trust badges (Licensed & Insured, Vetted Caregivers, Available 24/7).
2. Path picker ("Who are you looking for care for?"): see section 2.
3. Services preview: 6 of the 10 services as cards (icon, name, one or two sentences) plus "See all 10 services" -> services.html.
4. How it works: 4 steps (Free consultation -> Personalized care plan -> Caregiver matching -> Ongoing check-ins). A real sequence, so numbering is appropriate here.
5. Why families choose us: 5-6 points (screened & trained caregivers, consistent caregiver matching, flexible scheduling, open family communication, local team, no long-term contracts).
6. Testimonials: 3 family testimonials, each clearly marked [PLACEHOLDER].
7. Service area: "Proudly serving [PLACEHOLDER: Calgary] and surrounding areas" with 6-8 [PLACEHOLDER] community names.
8. Final CTA band: "Let's talk about care for your loved one" + consultation button + phone.
9. Footer.

### Services (`services.html`)
1. Page hero: title, short intro, CTA.
2. Quick jump navigation to all 10 services (chips/pills or similar; must wrap or scroll inside its own container, never overflow the page).
3. All 10 services, each with a stable anchor id, icon, name, 2-3 sentence description, a "What's included" list (5-7 bullets), a one-line "A good fit if..." and a link to contact.html. Use photos for some services (see image list) to break the rhythm; not every service needs one.
   - `personal-care` Personal Care (bathing, grooming, dressing, mobility)
   - `companionship` Companionship Care
   - `respite-care` Respite Care (relief for family caregivers)
   - `dementia-care` Dementia & Alzheimer's Care
   - `recovery-care` Post-Hospital / Recovery Care
   - `palliative-care` Palliative & End-of-Life Support
   - `live-in-care` Overnight & 24-Hour Live-In Care
   - `housekeeping-meals` Light Housekeeping, Meal Preparation & Errands
   - `medication-reminders` Medication Reminders
   - `transportation` Transportation & Appointment Escort
4. A mid-page "Not sure what you need?" band pointing to the consultation.
5. Final CTA band, footer.

## 5. Copy rules

- Write ORIGINAL copy: warm, plain-spoken, compassionate, talking to the adult child or family member. A kind, competent local team; no corporate jargon, no hype.
- Short, direct sentences. Avoid em-dash asides, "not X, but Y" constructions and stock phrases.
- Wrap everything that needs client confirmation in `[PLACEHOLDER: ...]`: phone, email, address, hours, stats, testimonials and their names, team names, pricing, community names, licence details. Use `+10000000000` in `tel:` hrefs.
- Do not copy text, images or branding from heartnestcare.ca (layout/tone reference only).

## 6. Images

Real Unsplash photos are already downloaded to `images/` (the Unsplash license allows free commercial use). Reference them with relative paths like `images/hero-caregiver-laughing.jpg`. Give every `<img>` meaningful alt text, `width`/`height` (or an aspect-ratio box) to prevent layout shift, `loading="lazy"` below the fold, and `object-fit: cover` inside masks.

| File | Size | Content |
|---|---|---|
| hero-caregiver-laughing.jpg | 1600x1131 landscape | caregiver in lilac scrubs laughing with an older woman in a green sweatshirt, indoors. Best hero. |
| photo-album-together.jpg | 1400x932 landscape | younger woman and older man laughing over a photo album on a floral sofa at home |
| hands-holding.jpg | 1400x933 landscape | close-up of a younger hand holding an older hand, warm light |
| activity-coloring.jpg | 1400x990 landscape | caregiver in blue helping an older man and woman with a colouring/craft activity at a table |
| knitting-companions.jpg | 1400x990 landscape | caregiver sitting with older women who are knitting and doing crafts |
| couple-laughing-outdoors.jpg | 1000x1500 portrait | older couple laughing outside a brick home, she has a walker |
| garden-walk.jpg | 1000x1500 portrait | older couple walking away down a leafy garden path |
| wheelchair-sunset-walk.jpg | 1400x933 landscape | person pushing someone in a wheelchair across a park at golden hour |
| chess-friends.jpg | 1400x933 landscape | older men playing chess outdoors |
| hands-support.jpg | 1000x1500 portrait | several hands holding one another supportively, dark background |

## 7. Technical requirements

- Plain HTML + one shared `css/styles.css` + one shared `js/main.js`. No frameworks, no build step, no external JS. Google Fonts is the only external resource.
- CSS custom properties at the top of `styles.css` (colours, fonts, spacing scale, radii, shadows) so the site can be rebranded in one place. Use an 8px-based spacing scale and one section-padding scale used everywhere. No inline `style=""` attributes.
- Mobile-first. Must be flawless at **390px, 768px and 1440px** and everything between (check 1024px mentally: the header must not wrap).
- Hamburger menu below the desktop breakpoint: accessible (`aria-expanded`, `aria-controls`, Escape closes it, focus is managed sensibly, scrim click closes it, body scroll locked while open).
- Floating "Call Now" button on phones only (<=600px). It must not cover content at the bottom of the page (reserve space for it).
- Semantic HTML (header/nav/main/section/footer, one h1 per page, sequential headings). Unique `<title>` and meta description per page, Open Graph tags, LocalBusiness JSON-LD on Home with [PLACEHOLDER] values.
- Accessibility: WCAG AA contrast, visible `:focus-visible` states, skip link, tap targets >= 48px, labelled controls, `prefers-reduced-motion` respected, alt text.
- Motion: subtle and meaningful only (hover lifts, the path-picker panel transition, gentle reveal). **Content must be fully visible without JS and without scrolling-triggered animation**; never leave anything at `opacity: 0` waiting for an observer.

### Known failures from v1 (must not happen again)
1. A mobile-only element (a second "Free Consultation" button inside the nav list) showed on desktop, so the header had two gold buttons and overflowed. Every breakpoint-specific element must be hidden at the other breakpoints.
2. `backdrop-filter` on the sticky header made the `position: fixed` mobile drawer position relative to the header, stretching the page to 710px wide on a phone. Don't put `backdrop-filter`, `transform` or `filter` on an ancestor of a fixed drawer (or put the drawer outside the header).
3. `white-space: nowrap` buttons with long labels overflowed on phones. Buttons may wrap their text or go full width on mobile. All buttons share one height, padding and radius system.
4. A grid stayed at 2 columns on a 390px phone, squashing cards. Grids must collapse to 1 column on phones.
5. A media column with `max-width` wider than the phone forced the grid track wider than the viewport (`1fr` min-content). Use `minmax(0, 1fr)` and `min-width: 0` where needed.
6. The logo wordmark and nav labels ("Why Us") wrapped onto several lines because the header was too crowded.
7. A floating card offset with negative `left` pushed past the viewport edge.

## 8. QA loop (mandatory before you finish)

Run the QA script against your candidate folder:

```
node /private/tmp/claude-501/-Users-muhammadyousaf/6072624c-83cf-4d1e-998b-7692858e6a54/scratchpad/qa/qa.mjs <your-candidate-dir> <your-candidate-dir>/qa
```

It takes real full-page screenshots in Chrome at 390, 768 and 1440px (plus readable `-partNN` slices) and prints FAIL for horizontal overflow, broken images or JS errors. **It must report no problems.** Then Read the `-partNN` slice PNGs, look at them critically as a demanding art director (spacing rhythm, alignment, button consistency, text wrapping, image cropping, awkward empty space, anything that looks off) and fix what you see. Repeat until it's clean. Test the mobile menu and the path picker logic by reading your JS carefully.

## 9. Judging rubric (used to pick the winner; scored 1-10 each)

1. **Calm & trust:** in the first 5 seconds, does a worried family member feel warmth, safety and competence?
2. **Craft & polish:** spacing rhythm, alignment, consistent buttons/cards, clean wrapping, no overflow at 390/768/1440.
3. **Readability for older adults:** type size, contrast, tap targets, plain language, clear hierarchy.
4. **Guided conversion:** path picker quality (useful, accessible, never empty), clarity of the consultation CTA and phone.
5. **Distinctiveness:** feels made for this brand (motifs, photo treatment, type) rather than a generic template.
6. **Extensibility:** how cleanly the shared CSS/JS and header/footer would extend to About, FAQ and Contact.
