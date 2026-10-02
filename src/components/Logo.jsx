import LogoMark from './LogoMark.jsx';

export default function Logo({ light = false }) {
  return (
    <span className={`logo${light ? ' logo--light' : ''}`}>
      <LogoMark className="logo__mark" ink={light ? '#FBF8F3' : '#0F2A4A'} />
      <span className="logo__text">
        <span className="logo__name">North &amp; Noble</span>
        <span className="logo__tag">Care at home</span>
      </span>
    </span>
  );
}
