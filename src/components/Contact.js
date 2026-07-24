import QuoteForm from './QuoteForm';
import { siteContent } from '../content/siteContent';

const { company } = siteContent;

function ContactDetail({ item }) {
  if (item.type === 'phone') {
    return <a href={`tel:${company.phoneLink}`}>{company.phoneDisplay}</a>;
  }

  if (item.type === 'email') {
    return <a href={`mailto:${company.email}`}>{company.email}</a>;
  }

  if (item.lines) {
    return <>{item.lines.map((line, index) => <span key={line}>{line}{index < item.lines.length - 1 && <br />}</span>)}</>;
  }

  return item.value;
}

export default function Contact({ onSuccess }) {
  const { contact } = siteContent;

  return (
    <section style={{ background: 'var(--white)' }} id="contact">
      <div className="contact-section">
        <div className="contact-info">
          <div className="section-eyebrow">{contact.eyebrow}</div>
          <h2 className="section-title">{contact.title} <span>{contact.titleAccent}</span></h2>
          <p>{contact.intro}</p>

          {contact.items.map((item) => (
            <div className="contact-item" key={item.label}>
              <div className="contact-icon">{item.icon}</div>
              <div className="contact-detail">
                <strong>{item.label}</strong>
                <ContactDetail item={item} />
              </div>
            </div>
          ))}
        </div>

        <QuoteForm onSuccess={onSuccess} />
      </div>
    </section>
  );
}
