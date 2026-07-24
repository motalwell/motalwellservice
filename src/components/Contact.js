import QuoteRequest from './QuoteRequest';

function ContactDetail({ company, item }) {
  if (item.type === 'phone') {
    return <a href={`tel:${company.phoneLink}`}>{company.phoneDisplay}</a>;
  }

  if (item.type === 'email') {
    return <a href={`mailto:${company.email}`}>{company.email}</a>;
  }

  if (item.lines) {
    return <>{item.lines.map((line, index) => <span key={line.id}>{line.text}{index < item.lines.length - 1 && <br />}</span>)}</>;
  }

  return item.value;
}

export default function Contact({ company, contact, quoteForm, successModal }) {
  return (
    <section style={{ background: 'var(--white)' }} id="contact">
      <div className="contact-section">
        <div className="contact-info">
          <div className="section-eyebrow">{contact.eyebrow}</div>
          <h2 className="section-title">{contact.title} <span>{contact.titleAccent}</span></h2>
          <p>{contact.intro}</p>

          {contact.items.map((item) => (
            <div className="contact-item" key={item.id}>
              <div className="contact-icon">{item.icon}</div>
              <div className="contact-detail">
                <strong>{item.label}</strong>
                <ContactDetail company={company} item={item} />
              </div>
            </div>
          ))}
        </div>

        <QuoteRequest quoteForm={quoteForm} successModal={successModal} />
      </div>
    </section>
  );
}
