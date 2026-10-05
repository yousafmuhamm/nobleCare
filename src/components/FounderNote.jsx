import { FOUNDER, img } from '../content.js';
import Button from './Button.jsx';
import LogoMark from './LogoMark.jsx';
import Ornament from './Ornament.jsx';
import PhotoFrame from './PhotoFrame.jsx';

export default function FounderNote() {
  return (
    <section className="section bg-cream" aria-labelledby="founder-title">
      <div className="container founder">
        <div className="founder__media">
          {FOUNDER.photo ? (
            <PhotoFrame
              shape="arch"
              src={img(FOUNDER.photo.src)}
              width={FOUNDER.photo.w}
              height={FOUNDER.photo.h}
              alt={`${FOUNDER.name}, ${FOUNDER.role}`}
            />
          ) : (
            <div className="frame frame--arch">
              <div className="frame__img founder__placeholder">
                <LogoMark className="founder__mark" />
              </div>
            </div>
          )}
        </div>
        <div className="founder__copy">
          <Ornament />
          <h2 id="founder-title">A note from our founder</h2>
          <div className="founder__letter">
            {FOUNDER.note.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="founder__sign">{FOUNDER.name}</p>
          <p className="founder__role">{FOUNDER.role}, North &amp; Noble Care</p>
          <div className="actions">
            <Button to="/about" variant="ghost" icon="arrow">Read our story</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
