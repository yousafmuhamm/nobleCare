import { Fragment } from 'react';
import Button from '../components/Button.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon, { Star } from '../components/Icon.jsx';
import NoBreak from '../components/NoBreak.jsx';
import PhotoFrame from '../components/PhotoFrame.jsx';
import { SERVICES, img } from '../content.js';
import usePageMeta from '../usePageMeta.js';

const NOT_SURE_AFTER = 'recovery-care';

function Included({ items }) {
  return (
    <>
      <h3 className="service__sub">What&rsquo;s included</h3>
      <ul className="checks">
        {items.map((item) => (
          <li key={item}>
            <Icon name="check" size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Service({ s, index }) {
  const flip = index % 2 === 1;
  const portrait = s.image && s.image.h > s.image.w;
  return (
    <section
      id={s.id}
      className={`service ${flip ? 'bg-dim' : 'bg-cream'}`}
      aria-labelledby={`${s.id}-title`}
    >
      <div className={`container service__grid${flip ? ' service__grid--flip' : ''}`}>
        <div className="service__head">
          <span className="icon-badge"><Icon name={s.icon} size={26} /></span>
          <h2 id={`${s.id}-title`}><NoBreak text={s.name} /></h2>
          <p className="service__desc">{s.description}</p>
          {s.image && <Included items={s.included} />}
        </div>
        {s.image ? (
          <div className="service__side">
            <PhotoFrame
              shape={portrait ? 'arch' : 'soft'}
              className={portrait ? 'frame--portrait' : 'frame--landscape'}
              src={img(s.image.src)}
              width={s.image.w}
              height={s.image.h}
              alt={s.image.alt}
            />
          </div>
        ) : (
          <aside className="service__side service__panel" aria-label={`What’s included in ${s.name}`}>
            <Included items={s.included} />
          </aside>
        )}
        <div className="service__foot">
          <p className="service__fit">
            <Star size={14} />
            <span>{s.fit}</span>
          </p>
          <Button to="/contact" variant="ghost" icon="arrow">Ask about {s.name.toLowerCase().replace('alzheimer', 'Alzheimer')}</Button>
        </div>
      </div>
    </section>
  );
}

function NotSure() {
  return (
    <section className="section bg-tint" aria-labelledby="notsure-title">
      <div className="container notsure">
        <div className="notsure__media">
          <PhotoFrame
            shape="arch"
            src={img('garden-walk.jpg')}
            width="1000"
            height="1500"
            alt="An older couple walking away from the camera down a leafy garden path"
          />
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
  );
}

export default function Services() {
  usePageMeta(
    'Home Care Services | North & Noble Care',
    'Personal care, companionship, respite, dementia care, recovery support, live-in care and more. See all 10 in-home care services from North & Noble Care.'
  );

  return (
    <>
      <section className="page-hero bg-tint">
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow">Our services</p>
            <h1>Care that fits your family, <em>not the other way around</em></h1>
            <p className="lead">
              Every person is different. Start with one service or combine several, and change the plan whenever life changes.
            </p>
            <div className="actions">
              <Button to="/contact">Book a Free Consultation</Button>
            </div>
          </div>
          <div className="page-hero__media">
            <PhotoFrame
              shape="arch"
              priority
              src={img('chess-friends.jpg')}
              width="1400"
              height="933"
              alt="Two older men enjoying a game of chess together outdoors"
            />
          </div>
        </div>
      </section>

      <nav className="jump bg-cream" aria-label="Jump to a service">
        <div className="container">
          <ul className="jump__list">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a className="jump__link" href={`#${s.id}`}>
                  <span className="jump__icon"><Icon name={s.icon} size={18} /></span>
                  <span><NoBreak text={s.name} /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {SERVICES.map((s, i) => (
        <Fragment key={s.id}>
          <Service s={s} index={i} />
          {s.id === NOT_SURE_AFTER && <NotSure />}
        </Fragment>
      ))}

      <CtaBand />
    </>
  );
}
