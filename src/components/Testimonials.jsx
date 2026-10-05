import { TESTIMONIALS, TESTIMONIALS_ARE_SAMPLES } from '../content.js';
import Ornament from './Ornament.jsx';

export default function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;
  return (
    <section className="section bg-dim" aria-labelledby="testi-title">
      <div className="container">
        <header className="section__head">
          <Ornament />
          <h2 id="testi-title">What families say</h2>
          {TESTIMONIALS_ARE_SAMPLES && (
            <p className="sample-note">
              Sample testimonials shown for layout only. Replace with real client quotes, used with permission, before launch.
            </p>
          )}
        </header>
        <figure className="featured-quote">
          <span className="featured-quote__mark" aria-hidden="true">&ldquo;</span>
          <blockquote>
            <p>{featured.quote}</p>
          </blockquote>
          <figcaption>{featured.name}</figcaption>
        </figure>
        <ul className="more-quotes">
          {rest.map((t) => (
            <li key={t.name}>
              <figure>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>{t.name}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
