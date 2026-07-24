import SiteImage from './SiteImage';

export default function About({ about }) {

  return (
    <section style={{ background: 'var(--white)' }} id="about">
      <div className="about">
        <div className="about-text">
          <div className="section-eyebrow">{about.eyebrow}</div>
          <h2 className="section-title">{about.title}<br /><span>{about.titleAccent}</span></h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.id}>
              {paragraph.lead && <strong>{paragraph.lead}</strong>}
              {paragraph.text}
            </p>
          ))}
          <div className="assoc-logos">
            {about.badges.map((badge) => <div className="assoc-badge" key={badge.id}>{badge.label}</div>)}
          </div>
        </div>

        <div className="about-img-wrap">
          <SiteImage
            src={about.image.url}
            alt={about.image.alt}
            errorStyle={{ background: 'var(--navy2)' }}
          />
          <div className="about-years">
            <span className="num">{about.years}</span>
            <span className="lbl">{about.yearsLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
