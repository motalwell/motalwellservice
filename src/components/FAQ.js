export default function FAQ({ faq }) {

  return (
    <section className="faq" id="faq">
      <div className="faq-header">
        <div className="section-eyebrow">{faq.eyebrow}</div>
        <div className="section-title">{faq.title} <span>{faq.titleAccent}</span></div>
        <p className="section-intro" style={{ marginBottom: 0 }}>{faq.intro}</p>
      </div>
      <div className="faq-grid">
        {faq.items.map((item) => (
          <div className="faq-item" key={item.question}>
            <h4>{item.question}</h4>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
