export default function PhotoFrame({ src, width, height, alt, shape = 'soft', priority = false, className = '' }) {
  return (
    <div className={`frame frame--${shape} ${className}`.trim()}>
      <div className="frame__img">
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          {...(priority ? { fetchpriority: 'high' } : {})}
        />
      </div>
    </div>
  );
}
