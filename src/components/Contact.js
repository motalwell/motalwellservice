import Image from 'next/image';
import QuoteRequest from './QuoteRequest';

const CONTACT_ICONS = {
  phone: '/icons/phone.png',
  email: '/icons/email.png',
  servicearea: '/icons/service-area.png',
  hours: '/icons/hours.png',
};

function getContactIcon(item) {
  const key = `${item.type || ''}${item.id || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (key.includes('servicearea') || key.includes('location')) return CONTACT_ICONS.servicearea;
  if (key.includes('phone')) return CONTACT_ICONS.phone;
  if (key.includes('email')) return CONTACT_ICONS.email;
  if (key.includes('hours') || key.includes('clock')) return CONTACT_ICONS.hours;

  return null;
}

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

          {contact.items.map((item) => {
            const iconSrc = getContactIcon(item);

            return (
              <div className="contact-item" key={item.id}>
                <div className="contact-icon">
                  {iconSrc && <Image src={iconSrc} alt="" width={56} height={56} aria-hidden="true" />}
                </div>
                <div className="contact-detail">
                  <strong>{item.label}</strong>
                  <ContactDetail company={company} item={item} />
                </div>
              </div>
            );
          })}
        </div>

        <QuoteRequest quoteForm={quoteForm} successModal={successModal} />
      </div>
    </section>
  );
}
