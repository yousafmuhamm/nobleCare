// The real North & Noble Care logo, in a horizontal layout for the header,
// menu and footer. `light` is the version for dark backgrounds.
// Pass alt="" when the logo sits inside a link that already has a label.
export default function Logo({ light = false, alt = 'North & Noble Care' }) {
  return (
    <img
      className={`logo${light ? ' logo--light' : ''}`}
      src={light ? '/images/logo-horizontal-light.png' : '/images/logo-horizontal.png'}
      width="646"
      height="168"
      alt={alt}
    />
  );
}
