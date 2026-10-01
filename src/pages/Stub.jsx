import Button from '../components/Button.jsx';
import usePageMeta from '../usePageMeta.js';
import { PHONE_HREF, PHONE_LABEL } from '../content.js';

export default function Stub({ title }) {
  usePageMeta(`${title} | North & Noble Care`, `${title} page for North & Noble Care. Coming soon.`);
  return (
    <section className="section">
      <div className="container stub">
        <h1>{title}</h1>
        <p className="lead">This page is coming soon. In the meantime, we are happy to talk by phone.</p>
        <div className="actions">
          <Button href={PHONE_HREF} icon="phone">{PHONE_LABEL}</Button>
          <Button to="/" variant="ghost">Back to Home</Button>
        </div>
      </div>
    </section>
  );
}
