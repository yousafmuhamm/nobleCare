import PhotoFrame from './PhotoFrame.jsx';

export default function PageHero({ eyebrow, title, lead, image, children }) {
  return (
    <section className={`page-hero bg-tint${image ? '' : ' page-hero--text'}`}>
      <div className="container page-hero__grid">
        <div className="page-hero__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {image && (
          <div className="page-hero__media">
            <PhotoFrame shape="arch" priority {...image} />
          </div>
        )}
      </div>
    </section>
  );
}
