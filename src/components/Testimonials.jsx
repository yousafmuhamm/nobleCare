import { TESTIMONIALS } from '../content.js';
import Ornament from './Ornament.jsx';

export default function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;
  return (
    <section className="section bg-dim" aria-labelledby="testi-title">
      <div className="container">
        <header className="section__head">
          <Ornament />
          <h2 id="testi-title">What families say</h2>
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
