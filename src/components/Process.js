import { siteContent } from '../content/siteContent';

export default function Process() {
  const { process } = siteContent;

  return (
    <section className="process" id="process">
      <div className="section-eyebrow">{process.eyebrow}</div>
      <div className="section-title" style={{ color: 'white' }}>{process.title} <span>{process.titleAccent}</span></div>
      <p className="section-intro">{process.intro}</p>
      <div className="process-grid">
        {process.steps.map((step) => (
          <div className="process-step" key={step.number}>
            <div className="process-num">{step.number}</div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
