import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS, SERVICES } from '../content.js';
import Button from './Button.jsx';
import Icon from './Icon.jsx';

export default function PathPicker() {
  const [selected, setSelected] = useState(PATHS[0].id);
  const current = PATHS.find((p) => p.id === selected);

  return (
    <section className="section section--tint" aria-labelledby="picker-title">
      <div className="container">
        <header className="section__head">
          <h2 id="picker-title">Who are you looking for care for?</h2>
          <p className="lead">Choose the one that fits best. We will show you what usually helps.</p>
        </header>

        <div className="picker">
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
                <span className="picker__label">{p.label}</span>
              </label>
            ))}
          </fieldset>

          <div className="picker__panel" aria-live="polite" key={current.id}>
            <h3>{current.title}</h3>
            <p>{current.message}</p>
            <p className="picker__services-label">Services that often help</p>
            <ul className="picker__services">
              {current.services.map((id) => {
                const s = SERVICES.find((x) => x.id === id);
                return (
                  <li key={id}>
                    <Link to={`/services#${id}`}>
                      <Icon name={s.icon} size={22} />
                      <span>{s.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button to="/contact" icon="arrow">Talk to us about this</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
