import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS, PHONE_HREF, PHONE_LABEL, SERVICES } from '../content.js';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import NoBreak from './NoBreak.jsx';
import Ornament from './Ornament.jsx';

export default function PathPicker() {
  const [selected, setSelected] = useState(PATHS[0].id);
  const current = PATHS.find((p) => p.id === selected);

  return (
    <section className="section bg-cream" aria-labelledby="picker-title">
      <div className="container">
        <header className="section__head">
          <Ornament />
          <h2 id="picker-title">Who are you looking for care for?</h2>
          <p className="lead">Choose the one that fits best. We will show you what usually helps.</p>
        </header>

        <div className="picker">
          <div className="picker__aside">
            <fieldset className="picker__choices">
              <legend className="visually-hidden">Who are you looking for care for?</legend>
              {PATHS.map((p) => (
                <label key={p.id} className="picker__choice">
                  <input
                    type="radio"
                    name="care-for"
                    value={p.id}
                    checked={selected === p.id}
                    onChange={() => setSelected(p.id)}
                  />
                  <span className="picker__label">
                    <span className="picker__icon"><Icon name={p.icon} size={22} /></span>
                    <span className="picker__text">{p.label}</span>
                    <span className="picker__check"><Icon name="check" size={16} /></span>
                  </span>
                </label>
              ))}
            </fieldset>
            <p className="picker__call">
              Prefer to talk it through? <a href={PHONE_HREF}>Call {PHONE_LABEL}</a>
            </p>
          </div>

          <div className="picker__panel" aria-live="polite" key={current.id}>
            <h3 className="picker__title">{current.title}</h3>
            <p>{current.message}</p>
            <p className="picker__services-label">Services that often help</p>
            <ul className="picker__services">
              {current.services.map((id) => {
                const s = SERVICES.find((x) => x.id === id);
                return (
                  <li key={id}>
                    <Link to={`/services#${id}`}>
                      <Icon name={s.icon} size={22} />
                      <span><NoBreak text={s.name} /></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button to={`/contact?for=${current.id}`} icon="arrow">Talk to us about this</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
