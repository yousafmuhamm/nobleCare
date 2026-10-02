import Button from './Button.jsx';
import LogoMark from './LogoMark.jsx';
import { PHONE_HREF, PHONE_LABEL } from '../content.js';

export default function CtaBand({
  title = 'Let’s talk about care for your loved one',
  text = 'The first conversation is free and there is no pressure. Tell us what is going on and we will help you think it through.',
}) {
  return (
    <section className="cta bg-cream" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__panel">
          <LogoMark className="cta__watermark" ink="#0F2A4A" heart="#0F2A4A" />
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
