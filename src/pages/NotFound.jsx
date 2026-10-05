import Button from '../components/Button.jsx';
import usePageMeta from '../usePageMeta.js';
import { PHONE_HREF, PHONE_LABEL } from '../content.js';

export default function NotFound() {
  usePageMeta('Page not found | North & Noble Care', 'We could not find that page.');
  return (
    <section className="section">
      <div className="container stub">
        <h1>We could not find that page</h1>
        <p className="lead">The link may be old or mistyped. Let us help you get where you were going.</p>
        <div className="actions">
          <Button to="/">Back to Home</Button>
          <Button href={PHONE_HREF} variant="ghost" icon="phone">{PHONE_LABEL}</Button>
        </div>
      </div>
    </section>
  );
}
