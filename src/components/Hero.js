export default function Hero({ hero }) {

  return (
    <section className="hero" style={{ '--hero-image': `url("${hero.image}")` }}>
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tag">{hero.tag}</div>
        <h1>
          {hero.titleLines.map((line) => (
            <span key={line}>{line}<br /></span>
          ))}
          <em>{hero.emphasizedTitle}</em>
        </h1>
        <p>{hero.description}</p>
        <div className="hero-btns">
          <a href={hero.primaryButton.href} className="btn-primary">{hero.primaryButton.label}</a>
          <a href={hero.secondaryButton.href} className="btn-outline">{hero.secondaryButton.label}</a>
        </div>
      </div>
    </section>
  );
}
