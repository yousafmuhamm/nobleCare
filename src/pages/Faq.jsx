import { useEffect } from 'react';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import { FAQS, PHONE_HREF, PHONE_LABEL } from '../content.js';
import usePageMeta from '../usePageMeta.js';

export default function Faq() {
  usePageMeta(
    'Frequently Asked Questions | North & Noble Care',
    'Answers to common questions about in-home care: getting started, our caregivers, cost, safety and how we keep families informed.'
  );

  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.flatMap((group) =>
        group.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        }))
      ),
    });
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Questions & answers"
        title={<>Questions families <em>often ask us</em></>}
        lead="If you do not see your question here, call us. We are always happy to talk it through."
      >
        <nav className="faq-jump" aria-label="FAQ topics">
          <ul>
            {FAQS.map((g) => (
              <li key={g.id}><a href={`#${g.id}`}>{g.title}</a></li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="section bg-cream">
        <div className="container faq">
          {FAQS.map((group) => (
            <section key={group.id} id={group.id} className="faq__group" aria-labelledby={`${group.id}-title`}>
              <h2 id={`${group.id}-title`}>{group.title}</h2>
              <div className="faq__list">
                {group.items.map((item) => (
                  <details key={item.q} className="faq__item">
                    <summary>
                      <span>{item.q}</span>
                      <Icon name="plus" size={22} className="faq__icon" />
                    </summary>
                    <div className="faq__answer">
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <p className="faq__more">
            Still have a question? <a href={PHONE_HREF}>Call us at {PHONE_LABEL}</a>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
