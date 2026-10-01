# Design B refinement: more elegant, warmer

Status: approved in brainstorming on 2026-10-01. Builds on the Warm Hearth spec (`2026-10-01-warm-hearth-redesign-design.md`); everything there still applies unless this file changes it.

## Goal

The user picked Design B. It currently reads as a tidy template. This pass makes it feel like an elegant, warm local family business, keeps the brand colours exactly as they are, and adds the sections that carry warmth (founder's note, featured testimonial). Scope: Home and Services pages plus the shared layout. About, FAQ and Contact stay as stubs.

## Part 1: Foundation

### One design
- Remove Design A entirely: `src/design.jsx`, the `DesignProvider` in `main.jsx`, the `DesignSwitcher` preview bar in `Layout.jsx`, and every `[data-design='b']` override in `styles.css`.
- B's values become the base tokens in `:root`. No `data-design` attribute remains anywhere.
- This also fixes the current bug where the "Proudly serving" section sits flush to the left edge (a B override set `margin-inline: 0` on a `.container`).

### Type
- Google Fonts link loads only: Libre Caslon Display (400), Libre Caslon Text (400, 400 italic, 700), Lato (400, 700, 900). Cormorant Garamond and Nunito Sans are removed.
- `h1` and section `h2`: Libre Caslon Display 400.
- `h3`, card titles, labels, logo wordmark: Libre Caslon Text 700.
- Italic accents: Libre Caslon Text 400 italic, navy, via an `<em>` inside headings. Used sparingly: hero h1 ("you love most"), the picker panel title, the founder signature, the featured quote. Never gold text on cream.
- Body: Lato 400, 18px, line-height 1.7. Unchanged.
- Fix awkward heading breaks: use `hyphens: manual` and non-breaking hyphens in compound names (e.g. "End&#8209;of&#8209;Life"), and keep `text-wrap: balance` only on h1/h2.

### Photo frames
- New `PhotoFrame` component replaces the ad-hoc `.mask` markup. Props: `src`, `width`, `height`, `alt`, `shape` (`arch` | `soft`), `priority` (eager vs lazy).
- `arch`: `border-radius: 999px 999px 24px 24px`, used for portrait crops (hero, why-us, founder, services hero, portrait service photos).
- `soft`: `border-radius: 24px`, used for landscape service photos.
- Every frame gets a thin gold keyline: a 1.5px `--gold` border on a pseudo-element offset 12px down and 12px right, sitting behind the photo. The frame wrapper reserves that 12px with padding so nothing overflows at 390px.
- Remove the gold blob behind the hero image and the asymmetric "leaf" radius.

### Motifs
- New `Ornament` component: hairline, 4-point star, hairline, in `--gold`, decorative (`aria-hidden`). Used above exactly four headings: picker, how it works, founder's note, featured testimonial.
- The closing CTA panel shows the hands-and-heart mark large and faint (navy at about 6% opacity) as a background watermark.

### Calmer surfaces
- Only clickable things are cards: the Home service preview cards and the Services jump links.
- Remove every gold top border (cards, steps, quotes).
- Section backgrounds alternate `--cream` and `--cream-dim`. `--gold-tint` is reserved for the hero bands, the picker's selected state and the "What's included" panels. `--gold-light` is used for the closing CTA panel and icon badges.
- Colours: no token values change.

## Part 2: Home page

1. **Hero.** Display h1 with "*you love most*" in italic. Trust badges: one row with thin vertical dividers at 960px and up, a plain vertical list below. Arch `PhotoFrame` with keyline. Below 960px the photo moves above the headline at a shorter crop (aspect ratio 4/3, still arch). The floating "Call Now" button stays on phones.
2. **Path picker.**
   - Choices become soft cards with an icon each: parent (home with heart), partner (two hearts), myself (person), caregiver (cup). Native radio inputs stay for keyboard and screen readers; the visual radio circle is replaced by a check mark shown on the selected card.
   - Selected card: `--gold-tint` fill, `--gold` 2px border, navy text. Unselected: cream fill, `--line` border.
   - Answer panel: thin `--line` border, no shadow, title in italic.
   - At 960px and up, under the choices: "Prefer to talk it through? Call [PLACEHOLDER: phone]" with a `tel:` link.
3. **Services preview.** Six cards remain, no gold top border. Icons: dementia uses a photo-frame icon (memories) instead of the lightbulb; recovery uses a sunrise icon instead of the medical cross.
4. **How it works.** No cards. Four steps in a row at 1000px and up, each with a large italic Display numeral and a thin gold line joining the numerals. Below 1000px the steps stack with the gold line running down the left side.
5. **Why families choose us.** Same content and arch photo; thin `--line` dividers between points; star bullets stay.
6. **Founder's note (new).** Sits between "Why families choose us" and testimonials.
   - Left (top on phones): arch placeholder frame in `--gold-light` with the hands-and-heart mark centred and a visible caption "[PLACEHOLDER: founder photo]" (the frame has `role="img"` and that caption as its accessible name). No stock photo stands in for a real person.
   - Right: Ornament, h2 "A note from our founder", a letter of about 120 words in the first person, opening "When my own mother needed care…", with the personal story details wrapped in `[PLACEHOLDER: ...]`. Signature line in italic: "[PLACEHOLDER: founder name]", then "[PLACEHOLDER: role], North & Noble Care". Link "Read our story" to `/about`.
7. **Testimonials.** Ornament and heading, then one featured quote: large decorative serif quotation mark (`aria-hidden`), the quote in Display italic at about 1.75rem, name below. The other two quotes sit beneath in two columns (one on phones) in regular body size, separated by a thin rule. All quote text stays `[PLACEHOLDER]`.
8. **Service area.** Correct container alignment. Community names render as an inline list separated by small gold stars, not pills.
9. **Closing CTA.** A rounded (`--radius-card`) `--gold-light` panel inset on the cream page, with the watermark. Primary button uses a new `navy` variant (navy fill, cream text); phone is a `ghost` button. The navy footer stands alone below it.

## Part 3: Services page

1. **Page hero.** Two columns at 960px and up: text left, `chess-friends.jpg` in an arch `PhotoFrame` right. Stacked on phones (photo below the text).
2. **Jump links.** At 700px and up: a grid of link cards (icon plus name): 2 columns from 700px to 1099px, 5 columns at 1100px and up. Below 700px: the existing single horizontal scroll row.
3. **Service sections.** Every service is two columns at 960px and up, alternating sides as now.
   - With a photo: description, "What's included" list, fit line and button on one side; photo on the other.
   - Without a photo: description, fit line and button on one side; "What's included" in a `--gold-tint` rounded panel on the other.
   - "A good fit if…" becomes an italic line with a small gold star, no box.
4. **"Not sure what you need?"** Moves to sit after the fifth service (`recovery-care`), per the original spec's "mid-page" requirement.
5. **Closing CTA.** Same gold-light panel as Home.

## Code structure

- New: `src/components/PhotoFrame.jsx`, `src/components/Ornament.jsx`, `src/components/FounderNote.jsx`, `src/components/Testimonials.jsx`.
- Changed: `Layout.jsx` (no preview bar), `main.jsx` (no provider), `Button.jsx` (`navy` variant), `Icon.jsx` (new icons: frame, sunrise, home-heart, hearts, person), `PathPicker.jsx`, `CtaBand.jsx`, `pages/Home.jsx`, `pages/Services.jsx`, `content.js` (founder letter copy, picker icons, icon swaps), `styles.css`, `index.html` (font link).
- Deleted: `src/design.jsx`.
- `styles.css` keeps one token block at the top; no inline `style=""` attributes.

## Verification

- Automated Chrome run at 390, 768, 1024, 1200 and 1440px on `/` and `/services`: no horizontal overflow, no broken images, no console errors, header on one line.
- Interaction run: mobile menu (open, Escape, scrim, focus return, scroll lock), picker by mouse and arrow keys, picker service links landing on the right `#id`.
- Contrast: confirm WCAG AA for every new text and background pairing (navy button on gold-light, italic navy on gold-tint, footer text).
- Screenshot review at every width before calling it done; fix anything that looks off.
