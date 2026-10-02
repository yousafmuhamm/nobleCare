import { Star } from './Icon.jsx';

export default function Ornament() {
  return (
    <span className="ornament" aria-hidden="true">
      <span className="ornament__line" />
      <Star size={12} />
      <span className="ornament__line" />
    </span>
  );
}
