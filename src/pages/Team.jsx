import Button from '../components/Button.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Ornament from '../components/Ornament.jsx';
import PageHero from '../components/PageHero.jsx';
import TeamPhoto from '../components/TeamPhoto.jsx';
import { TEAM, TEAM_INTRO } from '../content.js';
import usePageMeta from '../usePageMeta.js';

export default function Team() {
  usePageMeta(
    'Our Team | North & Noble Care',
    `Meet the leadership team behind North & Noble Care: ${TEAM.map((p) => `${p.name}, ${p.role}`).join(' and ')}.`
  );

  return (
    <>
      <PageHero eyebrow="Our team" title={<>The people behind <em>North &amp; Noble Care</em></>} lead={TEAM_INTRO} />

      {TEAM.map((person, i) => (
        <section
          key={person.id}
          id={person.id}
          className={`section ${i % 2 ? 'bg-dim' : 'bg-cream'}`}
          aria-labelledby={`${person.id}-name`}
        >
          <div className={`container member${i % 2 ? ' member--flip' : ''}`}>
            <div className="member__photo">
              <TeamPhoto person={person} />
            </div>
            <div className="member__copy">
              <p className="eyebrow">{person.role}</p>
              <h2 id={`${person.id}-name`}>{person.name}</h2>
              <div className="member__bio">
                {person.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section bg-tint" aria-labelledby="caregivers-title">
        <div className="container team-caregivers">
          <Ornament />
          <h2 id="caregivers-title">And the caregivers who make it all happen</h2>
          <p className="lead">
            Every caregiver we place is interviewed in person, reference checked, police checked and trained before meeting a family.
          </p>
          <div className="actions">
            <Button to="/about#hiring-title" variant="ghost" icon="arrow">How we choose our caregivers</Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
