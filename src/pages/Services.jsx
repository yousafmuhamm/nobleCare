import Button from '../components/Button.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon, { Star } from '../components/Icon.jsx';
import NoBreak from '../components/NoBreak.jsx';
import Ornament from '../components/Ornament.jsx';
import PageHero from '../components/PageHero.jsx';
import PhotoFrame from '../components/PhotoFrame.jsx';
import { SERVICES, SERVICE_GROUPS, img } from '../content.js';
import usePageMeta from '../usePageMeta.js';

const NOT_SURE_AFTER_GROUP = 'everyday';
const servicesIn = (groupId) => SERVICES.filter((s) => s.group === groupId);

function Included({ s }) {
  return (
    <>
      <h4 className="service__sub">{s.includedLabel || 'What’s included'}</h4>
      <ul className="checks">
        {s.included.map((item) => (
          <li key={item}>
            <Icon name="check" size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {s.note && (
        <p className="service__note">
          <Icon name="alert" size={18} />
          <span>{s.note}</span>
        </p>
      )}
    </>
  );
}

function Service({ s, index }) {
  const flip = index % 2 === 1;
  const portrait = s.image && s.image.h > s.image.w;
  const contactHref = s.contactFor ? `/contact?for=${s.contactFor}&service=${s.id}` : `/contact?service=${s.id}`;
  return (
    <article id={s.id} className={`service ${flip ? 'bg-dim' : 'bg-cream'}`} aria-labelledby={`${s.id}-title`}>
      <div className={`container service__grid${flip ? ' service__grid--flip' : ''}`}>
        <div className="service__head">
          <span className="icon-badge"><Icon name={s.icon} size={26} /></span>
          <h3 id={`${s.id}-title`} className="service__title"><NoBreak text={s.name} /></h3>
          <p className="service__desc">{s.description}</p>
          {s.image && <Included s={s} />}
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
          <aside className="service__side service__panel" aria-label={`${s.includedLabel || 'What’s included'}: ${s.name}`}>
            <Included s={s} />
          </aside>
        )}
        <div className="service__foot">
          <p className="service__fit">
            <Star size={14} />
            <span>{s.fit}</span>
          </p>
          <Button to={contactHref} variant="ghost" icon="arrow">
            {s.group === 'staffing' ? 'Talk to us about staffing' : `Ask about ${s.name.toLowerCase()}`}
          </Button>
        </div>
      </div>
    </article>
  );
}

function NotSure() {
  return (
    <section className="section bg-dim" aria-labelledby="notsure-title">
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
    `Personal care, aging-in-place care, companionship, dementia support, respite, hospital-to-home and recovery support, overnight care and caregiver staffing. See all ${SERVICES.length} services from North & Noble Care.`
  );

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={<>Care that fits your family, <em>not the other way around</em></>}
        lead="Every person is different. Start with one service or combine several, and change the plan whenever life changes."
        image={{
          src: img('chess-friends.jpg'),
          width: 1400,
          height: 933,
          alt: 'Two older men enjoying a game of chess together outdoors',
        }}
      >
        <div className="actions">
          <Button to="/contact">Book a Free Consultation</Button>
        </div>
      </PageHero>

      <nav className="jump bg-cream" aria-label="Jump to a service">
        <div className="container">
          <ul className="jump__groups">
            {SERVICE_GROUPS.map((g) => (
              <li key={g.id} className="jump__group">
                <a className="jump__group-link" href={`#${g.id}`}><span><NoBreak text={g.title} /></span></a>
                <ul className="jump__list">
                  {servicesIn(g.id).map((s) => (
                    <li key={s.id}>
                      <a className="jump__link" href={`#${s.id}`}>
                        <span className="jump__icon"><Icon name={s.icon} size={18} /></span>
                        <span><NoBreak text={s.name} /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {SERVICE_GROUPS.map((g) => {
        const list = servicesIn(g.id);
        return (
          <div key={g.id}>
            <section id={g.id} className="service-group" aria-labelledby={`${g.id}-title`}>
              <header className="group-head bg-tint">
                <div className="container">
                  <Ornament />
                  <h2 id={`${g.id}-title`}><NoBreak text={g.title} /></h2>
                  <p className="lead">{g.intro}</p>
                </div>
              </header>
              {list.map((s, i) => (
                <Service key={s.id} s={s} index={i} />
              ))}
            </section>
            {g.id === NOT_SURE_AFTER_GROUP && <NotSure />}
          </div>
        );
      })}

      <CtaBand />
    </>
  );
}
