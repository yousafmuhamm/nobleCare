import Button from '../components/Button.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import { SERVICES, img } from '../content.js';
import usePageMeta from '../usePageMeta.js';

export default function Services() {
  usePageMeta(
    'Home Care Services | North & Noble Care',
    'Personal care, companionship, respite, dementia care, recovery support, live-in care and more. See all 10 in-home care services from North & Noble Care.'
  );

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Our services</p>
          <h1>Care that fits your family, not the other way around</h1>
          <p className="lead">
            Every person is different. Start with one service or combine several, and change the plan whenever life changes.
          </p>
          <div className="actions">
            <Button to="/contact">Book a Free Consultation</Button>
          </div>
        </div>
      </section>

      <nav className="jump" aria-label="Jump to a service">
        <div className="container">
          <ul className="chips chips--links">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a className="chip chip--link" href={`#${s.id}`}>{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="services">
        {SERVICES.map((s, i) => (
          <section key={s.id} id={s.id} className={`service${i % 2 ? ' service--alt' : ''}`} aria-labelledby={`${s.id}-title`}>
            <div className={`container service__grid${s.image ? ' service__grid--media' : ''}`}>
              <div className="service__body">
                <span className="icon-badge"><Icon name={s.icon} size={28} /></span>
                <h2 id={`${s.id}-title`}>{s.name}</h2>
                <p className="service__desc">{s.description}</p>
                <h3 className="service__sub">What&rsquo;s included</h3>
                <ul className="checks">
                  {s.included.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="service__fit">{s.fit}</p>
                <Button to="/contact" variant="ghost" icon="arrow">Ask about {s.name.toLowerCase()}</Button>
              </div>
              {s.image && (
                <figure className={`service__media${s.image.h > s.image.w ? ' is-portrait' : ''}`}>
                  <div className="mask mask--soft">
                    <img src={img(s.image.src)} width={s.image.w} height={s.image.h} alt={s.image.alt} loading="lazy" />
                  </div>
                </figure>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="section section--tint" aria-labelledby="notsure-title">
        <div className="container notsure">
          <div className="notsure__media">
            <div className="mask mask--soft">
              <img
                src={img('garden-walk.jpg')}
                width="1000"
                height="1500"
                alt="An older couple walking away from the camera down a leafy garden path"
                loading="lazy"
              />
            </div>
          </div>
          <div className="notsure__copy">
            <h2 id="notsure-title">Not sure what you need?</h2>
            <p className="lead">
              That is very common, and you do not have to work it out alone. Tell us a little about your situation and we will help you figure out what would make the biggest difference. There is no cost and no pressure.
            </p>
            <div className="actions">
              <Button to="/contact">Book a Free Consultation</Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
