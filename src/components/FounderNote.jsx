import { FOUNDER } from '../content.js';
import Button from './Button.jsx';
import LogoMark from './LogoMark.jsx';
import Ornament from './Ornament.jsx';

export default function FounderNote() {
  return (
    <section className="section bg-cream" aria-labelledby="founder-title">
      <div className="container founder">
        <div className="founder__media">
          <div className="frame frame--arch">
            <div className="frame__img founder__placeholder" role="img" aria-label="[PLACEHOLDER: founder photo]">
              <LogoMark className="founder__mark" />
              <span aria-hidden="true">[PLACEHOLDER: founder photo]</span>
            </div>
          </div>
        </div>
        <div className="founder__copy">
          <Ornament />
          <h2 id="founder-title">A note from our founder</h2>
          <div className="founder__letter">
            {FOUNDER.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="founder__sign">{FOUNDER.name}</p>
          <p className="founder__role">{FOUNDER.role}</p>
          <div className="actions">
            <Button to="/about" variant="ghost" icon="arrow">Read our story</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
