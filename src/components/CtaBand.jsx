import Button from './Button.jsx';
import { PHONE_HREF, PHONE_LABEL } from '../content.js';

export default function CtaBand({
  title = 'Let’s talk about care for your loved one',
  text = 'The first conversation is free and there is no pressure. Tell us what is going on and we will help you think it through.',
}) {
  return (
    <section className="cta bg-cream" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__panel">
          <img className="cta__watermark" src="/images/logo-mark-mono.png" width="456" height="480" alt="" />
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
          <div className="actions actions--center">
            <Button to="/contact" variant="navy">Book a Free Consultation</Button>
            <Button href={PHONE_HREF} variant="ghost" icon="phone">{PHONE_LABEL}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
