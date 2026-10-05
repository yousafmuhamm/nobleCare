import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CARE_FOR_OPTIONS, CONTACT_METHODS, LIMITS, SERVICE_IDS, TIMING_OPTIONS, validateContact,
} from '../../shared/contact-schema.js';
import { BUSINESS, PHONE_HREF, PHONE_LABEL, SERVICES } from '../content.js';
import Icon from './Icon.jsx';

const FIELD_ORDER = ['name', 'email', 'contactMethod', 'phone', 'careFor', 'timing', 'services', 'message', 'consent'];
const FIELD_TARGET = {
  contactMethod: 'contactMethod-phone',
  services: `service-${SERVICE_IDS[0]}`,
};

function newSubmissionId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  const b = window.crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function focusField(e, id) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ block: 'center' });
  el.focus({ preventScroll: true });
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="field__error">
      <Icon name="alert" size={18} />
      <span>{message}</span>
    </p>
  );
}

export default function ContactForm() {
  const [params] = useSearchParams();
  const presetFor = CARE_FOR_OPTIONS.some((o) => o.id === params.get('for')) ? params.get('for') : '';
  const presetService = SERVICE_IDS.includes(params.get('service')) ? [params.get('service')] : [];

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'phone',
    careFor: presetFor,
    timing: '',
    services: presetService,
    message: '',
    consent: false,
    company: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const startedAt = useRef(Date.now());
  const submissionId = useRef(newSubmissionId());
  const summaryRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  const set = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const toggleService = (id) => {
    set('services', values.services.includes(id) ? values.services.filter((s) => s !== id) : [...values.services, id]);
  };

  const showErrors = (errs) => {
    setErrors(errs);
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setServerError('');

    const check = validateContact(values);
    if (!check.ok) return showErrors(check.errors);

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          startedAt: startedAt.current,
          submissionId: submissionId.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('sent');
        return;
      }
      setStatus('idle');
      if (res.status === 422 && data.errors) return showErrors(data.errors);
      setServerError(data.error || 'Sorry, we could not send your message.');
    } catch {
      setStatus('idle');
      setServerError('Sorry, we could not send your message. Please check your connection.');
    }
  }

  if (status === 'sent') {
    const first = values.name.trim().split(/\s+/)[0];
    return (
      <div className="form-success" ref={successRef} tabIndex={-1} role="status">
        <span className="icon-badge"><Icon name="check" size={28} /></span>
        <h2>Thank you, {first}.</h2>
        <p>
          We have your message and will be in touch {BUSINESS.responseTime}. If you need help sooner, please call us at{' '}
          <a href={PHONE_HREF}>{PHONE_LABEL}</a>.
        </p>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((f) => errors[f]);
  const describedBy = (field, hint) => [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(' ') || undefined;

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-describedby="form-intro">
      <p id="form-intro" className="contact-form__intro">
        Fields marked <span aria-hidden="true">*</span><span className="visually-hidden">with an asterisk</span> are required.
      </p>

      {errorList.length > 0 && (
        <div className="error-summary" ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="error-summary-title">
          <h2 id="error-summary-title">Please check the following</h2>
          <ul>
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${FIELD_TARGET[f] || f}`} onClick={(e) => focusField(e, FIELD_TARGET[f] || f)}>{errors[f]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {serverError && (
        <div className="error-summary" role="alert">
          <h2>We could not send your message</h2>
          <p>
            {serverError} You can also call us at <a href={PHONE_HREF}>{PHONE_LABEL}</a>.
          </p>
        </div>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Your name <span aria-hidden="true">*</span></label>
          <input
            id="name" name="name" type="text" autoComplete="name" maxLength={LIMITS.name} required
            value={values.name} onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name} aria-describedby={describedBy('name')}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div className="field">
          <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input
            id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={LIMITS.email} required
            value={values.email} onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={describedBy('email')}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <fieldset className="field field--group" aria-describedby={describedBy('contactMethod')}>
        <legend>Best way to reach you <span aria-hidden="true">*</span></legend>
        <div className="choice-row">
          {CONTACT_METHODS.map((m) => (
            <label key={m.id} className="choice" htmlFor={`contactMethod-${m.id}`}>
              <input
                id={`contactMethod-${m.id}`} type="radio" name="contactMethod" value={m.id}
                checked={values.contactMethod === m.id} onChange={() => set('contactMethod', m.id)}
              />
              <span>{m.label}</span>
            </label>
          ))}
        </div>
        <FieldError id="contactMethod-error" message={errors.contactMethod} />
      </fieldset>

      <div className="field">
        <label htmlFor="phone">
          Phone {values.contactMethod === 'phone' ? <span aria-hidden="true">*</span> : <span className="field__optional">(optional)</span>}
        </label>
        <input
          id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={LIMITS.phone}
          value={values.phone} onChange={(e) => set('phone', e.target.value)}
          aria-invalid={!!errors.phone} aria-describedby={describedBy('phone')}
        />
        <FieldError id="phone-error" message={errors.phone} />
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="careFor">Who is the care for? <span aria-hidden="true">*</span></label>
          <select
            id="careFor" name="careFor" required value={values.careFor} onChange={(e) => set('careFor', e.target.value)}
            aria-invalid={!!errors.careFor} aria-describedby={describedBy('careFor')}
          >
            <option value="">Please choose</option>
            {CARE_FOR_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
          <FieldError id="careFor-error" message={errors.careFor} />
        </div>

        <div className="field">
          <label htmlFor="timing">How soon do you need care? <span aria-hidden="true">*</span></label>
          <select
            id="timing" name="timing" required value={values.timing} onChange={(e) => set('timing', e.target.value)}
            aria-invalid={!!errors.timing} aria-describedby={describedBy('timing')}
          >
            <option value="">Please choose</option>
            {TIMING_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
          <FieldError id="timing-error" message={errors.timing} />
        </div>
      </div>

      <fieldset className="field field--group" aria-describedby={describedBy('services')}>
        <legend>Services you are interested in <span className="field__optional">(optional)</span></legend>
        <div className="choice-grid">
          {SERVICES.map((s) => (
            <label key={s.id} className="choice" htmlFor={`service-${s.id}`}>
              <input
                id={`service-${s.id}`} type="checkbox" name="services" value={s.id}
                checked={values.services.includes(s.id)} onChange={() => toggleService(s.id)}
              />
              <span>{s.name}</span>
            </label>
          ))}
        </div>
        <FieldError id="services-error" message={errors.services} />
      </fieldset>

      <div className="field">
        <label htmlFor="message">
          Anything else we should know? <span className="field__optional">(optional)</span>
        </label>
        <textarea
          id="message" name="message" rows={5} maxLength={LIMITS.message}
          value={values.message} onChange={(e) => set('message', e.target.value)}
          aria-invalid={!!errors.message} aria-describedby={describedBy('message', 'message-hint')}
        />
        <p id="message-hint" className="field__hint">
          For example: daily routines, health conditions, or what worries you most. {values.message.length} of {LIMITS.message} characters.
        </p>
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company" name="company" type="text" tabIndex={-1} autoComplete="off"
          value={values.company} onChange={(e) => set('company', e.target.value)}
        />
      </div>

      <div className="field">
        <label className="choice choice--consent" htmlFor="consent">
          <input
            id="consent" type="checkbox" name="consent" checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={!!errors.consent} aria-describedby={describedBy('consent')}
          />
          <span>
            I agree that North &amp; Noble Care can contact me about this request. Read our{' '}
            <Link to="/privacy">privacy policy</Link>. <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <button type="submit" className="btn btn--navy contact-form__submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send my request'}
      </button>
    </form>
  );
}
