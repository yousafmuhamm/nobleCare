import ContactForm from '../components/ContactForm.jsx';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import { BUSINESS, CITY, PHONE_HREF, PHONE_LABEL } from '../content.js';
import usePageMeta from '../usePageMeta.js';

const NEXT_STEPS = [
  `We call or email you ${BUSINESS.responseTime} to hear more.`,
  'We arrange a free consultation, at home or by phone.',
  'You get a clear care plan and quote. No pressure, no obligation.',
];

export default function Contact() {
  usePageMeta(
    'Contact Us | North & Noble Care',
    `Book a free in-home care consultation in ${CITY}. Call ${PHONE_LABEL} or send us a message and we will be in touch ${BUSINESS.responseTime}.`
  );

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={<>Let&rsquo;s talk about care for <em>your loved one</em></>}
        lead={`Tell us a little about what is going on. There is no cost and no pressure, and we will get back to you ${BUSINESS.responseTime}.`}
      />

      <section className="section bg-cream" aria-label="Contact form and details">
        <div className="container contact">
          <div className="contact__form">
            <ContactForm />
          </div>

          <aside className="contact__aside" aria-label="Other ways to reach us">
            <div className="contact-card contact-card--call">
              <h2>Prefer to talk?</h2>
              <p>Call us and a real person will answer.</p>
              <a className="btn btn--gold contact-card__phone" href={PHONE_HREF}>
                <Icon name="phone" size={20} />
                <span>{PHONE_LABEL}</span>
              </a>
            </div>

            <div className="contact-card">
              <ul className="contact-details">
                <li>
                  <Icon name="mail" size={22} />
                  <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                </li>
                <li>
                  <Icon name="pin" size={22} />
                  <span>
                    {BUSINESS.address.street}
                    <br />
                    {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
                  </span>
                </li>
                <li>
                  <Icon name="clock" size={22} />
                  <span>
                    Office: {BUSINESS.officeHours}
                    <br />
                    {BUSINESS.careHours}
                  </span>
                </li>
              </ul>
            </div>

            <div className="contact-card">
              <h2>What happens next</h2>
              <ol className="next-steps">
                {NEXT_STEPS.map((s, i) => (
                  <li key={s}>
                    <span className="next-steps__num" aria-hidden="true">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
