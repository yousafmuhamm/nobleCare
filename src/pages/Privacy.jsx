// SAMPLE: this policy is a starting point, not legal advice. Have it reviewed
// before launch, and keep it in step with how you actually handle information.
import PageHero from '../components/PageHero.jsx';
import { BUSINESS } from '../content.js';
import usePageMeta from '../usePageMeta.js';

const UPDATED = 'October 2026'; // SAMPLE

export default function Privacy() {
  usePageMeta('Privacy Policy | North & Noble Care', 'How North & Noble Care collects, uses and protects your personal information.');

  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy policy" lead={`Last updated ${UPDATED}.`} />
      <section className="section bg-cream">
        <div className="container prose">
          <p>
            {BUSINESS.name} respects your privacy. This policy explains what personal information we collect, why we collect it,
            and how we protect it. We follow Alberta&rsquo;s Personal Information Protection Act (PIPA).
          </p>

          <h2>What we collect</h2>
          <p>When you use the contact form on this website, we collect the details you give us: your name, email address, phone number, who the care is for, the services you are interested in and anything you write in your message.</p>
          <p>If you become a client, we also collect information needed to provide safe care, such as health details, routines and emergency contacts. We only collect this with your consent.</p>

          <h2>How we use it</h2>
          <p>We use your information to respond to your enquiry, arrange a consultation, plan and provide care, schedule caregivers and send invoices. We do not sell your information, and we do not use it for advertising.</p>

          <h2>Who we share it with</h2>
          <p>We share information only with people who need it to care for you, such as your assigned caregivers, and with service providers that help us run our business. Our website is hosted by Vercel and contact form messages are delivered by Resend. These providers may store information on servers in the United States, where it may be subject to the laws of that country.</p>
          <p>We may also share information when the law requires it, or in an emergency to protect someone&rsquo;s health or safety.</p>

          <h2>How we protect it</h2>
          <p>We limit access to staff who need it, use secure, password-protected systems, and send website form data over an encrypted connection.</p>

          <h2>How long we keep it</h2>
          <p>We keep enquiry details for up to two years, and client records for as long as the law requires. After that, we securely delete them.</p>

          <h2>Your choices</h2>
          <p>You can ask to see or correct the personal information we hold about you, or withdraw your consent, at any time. Contact us at <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or {BUSINESS.phoneDisplay}.</p>
          <p>If you have a concern we have not resolved, you can contact the Office of the Information and Privacy Commissioner of Alberta.</p>
        </div>
      </section>
    </>
  );
}
