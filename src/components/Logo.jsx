export default function Logo({ light = false }) {
  const ink = light ? '#FBF8F3' : '#0F2A4A';
  return (
    <span className={`logo${light ? ' logo--light' : ''}`}>
      <svg className="logo__mark" viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
        <path d="M6 30 Q24 46 42 30" stroke={ink} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M11 27v-5M16 29v-6M32 29v-6M37 27v-5" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M24 34C13 25 6 17 6 10.5 6 5 10.2 1.5 15 2.2c3.6.5 7 3.3 9 6.8 2-3.5 5.4-6.3 9-6.8C37.8 1.5 42 5 42 10.5 42 17 35 25 24 34Z" fill="#C9A46A" />
        <path d="M39 3l1.3 3.2 3.2 1.3-3.2 1.3L39 12l-1.3-3.2-3.2-1.3 3.2-1.3Z" fill="#C9A46A" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">North &amp; Noble</span>
        <span className="logo__tag">Care at home</span>
      </span>
    </span>
  );
}
