import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon, { Star } from '../components/Icon.jsx';
import PathPicker from '../components/PathPicker.jsx';
import {
  CITY, COMMUNITIES, HOME_SERVICE_IDS, PHONE_HREF, PHONE_LABEL, SERVICES, STEPS, TESTIMONIALS, TRUST, WHY, img,
} from '../content.js';
import usePageMeta from '../usePageMeta.js';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'North & Noble Care',
  description: 'In-home senior care for families in [PLACEHOLDER: Calgary] and surrounding areas.',
  telephone: '[PLACEHOLDER: phone]',
  email: '[PLACEHOLDER: email]',
  address: { '@type': 'PostalAddress', streetAddress: '[PLACEHOLDER: address]', addressLocality: '[PLACEHOLDER: Calgary]' },
  areaServed: '[PLACEHOLDER: Calgary]',
  openingHours: '[PLACEHOLDER: hours]',
  url: '[PLACEHOLDER: website URL]',
};

export default function Home() {
  usePageMeta(
    'North & Noble Care | Gentle In-Home Senior Care',
    'Compassionate in-home care for seniors in [PLACEHOLDER: Calgary] and surrounding areas. Book a free consultation with North & Noble Care.'
  );

  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify(JSON_LD);
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  const preview = HOME_SERVICE_IDS.map((id) => SERVICES.find((s) => s.id === id));

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">In-home care for seniors</p>
            <h1>Care that feels like home, for the people you love most.</h1>
            <p className="lead">
              You are worried about someone you love, and you are not sure where to start. We will listen first, then help you find the right kind of care at home.
            </p>
            <div className="actions">
              <Button to="/contact">Book a Free Consultation</Button>
              <Button href={PHONE_HREF} variant="ghost" icon="phone">Call {PHONE_LABEL}</Button>
            </div>
            <ul className="trust">
              {TRUST.map((t) => (
                <li key={t.label}>
                  <Icon name={t.icon} size={22} />
                  <span>{t.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero__media">
            <div className="mask">
              <img
                src={img('hero-caregiver-laughing.jpg')}
                width="1600"
                height="1131"
                alt="A caregiver in lilac scrubs laughing with an older woman in a green sweatshirt at home"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <PathPicker />

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <header className="section__head">
            <h2 id="services-title">Support for the way life really is</h2>
            <p className="lead">From a few hours of company to round-the-clock care. Here are some of the ways we help.</p>
          </header>
          <ul className="grid grid--3 cards">
            {preview.map((s) => (
              <li key={s.id} className="card">
                <span className="icon-badge"><Icon name={s.icon} size={28} /></span>
                <h3><Link to={`/services#${s.id}`}>{s.name}</Link></h3>
                <p>{s.short}</p>
              </li>
            ))}
          </ul>
          <div className="section__foot">
            <Button to="/services" variant="ghost" icon="arrow">See all {SERVICES.length} services</Button>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="steps-title">
        <div className="container">
          <header className="section__head">
            <h2 id="steps-title">How it works</h2>
            <p className="lead">Four simple steps. You are in charge the whole way.</p>
          </header>
          <ol className="grid grid--4 steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="container why">
          <div className="why__media">
            <div className="mask mask--soft">
              <img
                src={img('activity-coloring.jpg')}
                width="1400"
                height="990"
                alt="A caregiver helping an older man and woman with a colouring activity at a table"
                loading="lazy"
              />
            </div>
          </div>
          <div className="why__copy">
            <h2 id="why-title">Why families choose us</h2>
            <ul className="why__list">
              {WHY.map((w) => (
                <li key={w.title}>
                  <Star className="why__star" size={18} />
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="testi-title">
        <div className="container">
          <header className="section__head">
            <h2 id="testi-title">What families say</h2>
          </header>
          <ul className="grid grid--3 testimonials">
            {TESTIMONIALS.map((t, i) => (
              <li key={i} className="quote">
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <p className="quote__name">{t.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="area-title">
        <div className="container area">
          <h2 id="area-title">Proudly serving {CITY} and surrounding areas</h2>
          <p className="lead">We are your neighbours. Here are a few of the communities we visit.</p>
          <ul className="chips">
            {COMMUNITIES.map((c) => (
              <li key={c} className="chip">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
