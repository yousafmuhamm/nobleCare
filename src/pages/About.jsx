import Button from '../components/Button.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon, { Star } from '../components/Icon.jsx';
import Ornament from '../components/Ornament.jsx';
import PageHero from '../components/PageHero.jsx';
import PhotoFrame from '../components/PhotoFrame.jsx';
import {
  ABOUT_STORY, CAREGIVER_STEPS, CITY, COMMUNITIES, FOUNDER, VALUES, img,
} from '../content.js';
import usePageMeta from '../usePageMeta.js';

export default function About() {
  usePageMeta(
    'About Us | North & Noble Care',
    `Meet North & Noble Care, a local in-home care team serving ${CITY} and surrounding areas. Learn how we choose, train and match our caregivers.`
  );

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>A local team that treats your family <em>like our own</em></>}
        lead="We help older adults stay safe, comfortable and independent at home, and we help their families breathe a little easier."
        image={{
          src: img('photo-album-together.jpg'),
          width: 1400,
          height: 932,
          alt: 'A younger woman and an older man laughing together over a photo album on a sofa',
        }}
      >
        <div className="actions">
          <Button to="/contact">Book a Free Consultation</Button>
        </div>
      </PageHero>

      <section className="section bg-cream" aria-labelledby="story-title">
        <div className="container story">
          <div className="story__copy">
            <Ornament />
            <h2 id="story-title">Our story</h2>
            {ABOUT_STORY.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="founder__sign">{FOUNDER.name}</p>
            {FOUNDER.role && <p className="founder__role">{FOUNDER.role}, North &amp; Noble Care</p>}
            <div className="actions">
              <Button to="/team" variant="ghost" icon="arrow">Meet our team</Button>
            </div>
          </div>
          <div className="story__media">
            <PhotoFrame
              shape="arch"
              className="frame--portrait"
              src={img('couple-laughing-outdoors.jpg')}
              width="1000"
              height="1500"
              alt="An older couple laughing together outside a brick home, she uses a walker"
            />
          </div>
        </div>
      </section>

      <section className="section bg-dim" aria-labelledby="values-title">
        <div className="container">
          <header className="section__head">
            <h2 id="values-title">What we believe</h2>
            <p className="lead">Four promises that shape every visit.</p>
          </header>
          <ul className="values">
            {VALUES.map((v) => (
              <li key={v.title} className="value">
                <span className="icon-badge"><Icon name={v.icon} size={26} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-cream" aria-labelledby="hiring-title">
        <div className="container">
          <header className="section__head">
            <Ornament />
            <h2 id="hiring-title">How we choose our caregivers</h2>
            <p className="lead">The person who walks through your door matters more than anything else we do.</p>
          </header>
          <ol className="steps steps--five">
            {CAREGIVER_STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-dim" aria-labelledby="local-title">
        <div className="container local">
          <div className="local__media">
            <PhotoFrame
              shape="soft"
              className="frame--landscape"
              src={img('wheelchair-sunset-walk.jpg')}
              width="1400"
              height="933"
              alt="A person pushing someone in a wheelchair across a park at golden hour"
            />
          </div>
          <div className="local__copy">
            <h2 id="local-title">Proudly local</h2>
            <p className="lead">
              We are based in {CITY} and visit families across the city and nearby communities. Not sure if we cover your area? Just ask.
            </p>
            <ul className="communities">
              {COMMUNITIES.map((c) => (
                <li key={c}>
                  <Star size={12} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
