/* eslint-disable @next/next/no-img-element */
'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { siteContent } from '../content/siteContent';

const { company } = siteContent;

function SiteImage({ src, alt, className, fallback }) {
  const [hasError, setHasError] = useState(false);

  if (hasError && fallback) {
    return (
      <div className="service-img-placeholder" style={{ display: 'flex' }}>
        {fallback}
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} onError={() => setHasError(true)} />;
}

function Logo() {
  return (
    <div className="logo">
      <div className="logo-icon">{company.logoIcon}</div>
      {company.logoPrimary} <span>&nbsp;{company.logoSecondary}</span>
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="topbar">
        <span className="license-badge">{company.licenseBadge}</span>
        <div>
          <a href={`tel:${company.phoneLink}`}>📞 {company.phoneDisplay}</a>
          <a href={`mailto:${company.email}`}>✉ {company.email}</a>
        </div>
      </div>

      <nav>
        <Logo />
        <ul>
          {siteContent.navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={item.isCta ? 'nav-cta' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function Hero() {
  const { hero } = siteContent;

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

function Stats() {
  const { stats } = siteContent;
  const containerRef = useRef(null);
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const container = containerRef.current;
    const animationFrames = [];

    const animate = () => {
      const duration = 1000;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) * (1 - progress);
        setValues(stats.map((stat) => Math.floor(stat.target * eased)));

        if (progress < 1) animationFrames.push(requestAnimationFrame(tick));
      };

      animationFrames.push(requestAnimationFrame(tick));
    };

    let observer;
    if (container && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) animate();
      }, { threshold: 0.5 });
      observer.observe(container);
    } else {
      animate();
    }

    return () => {
      observer?.disconnect();
      animationFrames.forEach(cancelAnimationFrame);
    };
  }, [stats]);

  return (
    <div className="stats" ref={containerRef}>
      {stats.map((stat, index) => (
        <div className="stat" key={stat.label}>
          <span className="stat-num" data-target={stat.target}>{values[index]}</span>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function Services() {
  const { servicesSection, services } = siteContent;

  return (
    <section className="services" id="services">
      <div className="section-eyebrow">{servicesSection.eyebrow}</div>
      <div className="section-title">{servicesSection.title} <span>{servicesSection.titleAccent}</span></div>
      <p className="section-intro">{servicesSection.intro}</p>

      <div className="service-grid">
        {services.map((service) => (
          <div className="service-card" key={service.title}>
            <SiteImage src={service.image} alt={service.alt} className="service-img" fallback={service.fallback} />
            <div className="service-body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a href={servicesSection.linkHref} className="service-link">{servicesSection.linkLabel}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const { about } = siteContent;
  const [imageError, setImageError] = useState(false);

  return (
    <section style={{ background: 'var(--white)' }} id="about">
      <div className="about">
        <div className="about-text">
          <div className="section-eyebrow">{about.eyebrow}</div>
          <h2 className="section-title">{about.title}<br /><span>{about.titleAccent}</span></h2>
          {about.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph.lead && <strong>{paragraph.lead}</strong>}
              {paragraph.text}
            </p>
          ))}
          <div className="assoc-logos">
            {about.badges.map((badge) => <div className="assoc-badge" key={badge}>{badge}</div>)}
          </div>
        </div>

        <div className="about-img-wrap">
          <img
            src={imageError ? undefined : about.image}
            alt={about.imageAlt}
            onError={() => setImageError(true)}
            style={imageError ? { background: 'var(--navy2)' } : undefined}
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

function PhotoStrip() {
  const { photoCallout } = siteContent;

  return (
    <div className="photo-strip">
      <img src={photoCallout.image} alt={photoCallout.imageAlt} />
      <div className="photo-strip-overlay">
        <h2>{photoCallout.title} <span>{photoCallout.titleAccent}</span></h2>
        <p>{photoCallout.description}</p>
        <a href={photoCallout.button.href} className="btn-primary">{photoCallout.button.label}</a>
      </div>
    </div>
  );
}

function Process() {
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

function FAQ() {
  const { faq } = siteContent;

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

function QuoteForm({ onSuccess }) {
  const { quoteForm } = siteContent;
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSending(true);

    try {
      if (!window.emailjs) throw new Error('EmailJS is not available.');
      const formData = new FormData(form);
      await window.emailjs.send('service_6lrjbde', 'template_4yxabjd', {
        from_name: formData.get('name') || '',
        phone: formData.get('phone') || '',
        reply_to: formData.get('email') || '',
        location: formData.get('location') || '',
        message: formData.get('message') || '',
      });
      form.reset();
      onSuccess();
    } catch (error) {
      window.alert(quoteForm.errorMessage);
      console.error('EmailJS error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="quoteForm2">
      <br />
      <div className="quote-form">
        <h3>{quoteForm.title}</h3>
        <p className="form-sub">{quoteForm.subtitle}</p>
        <form id="quoteForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" id="field-name" name="name" placeholder={quoteForm.fields.name} required />
            <input type="tel" id="field-phone" name="phone" placeholder={quoteForm.fields.phone} required />
          </div>
          <input type="email" id="field-email" name="email" placeholder={quoteForm.fields.email} />
          <input type="text" id="field-location" name="location" placeholder={quoteForm.fields.location} />
          <select id="field-service" name="service" defaultValue="">
            <option value="" disabled>{quoteForm.fields.service}</option>
            {quoteForm.serviceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
          <textarea id="field-message" name="message" placeholder={quoteForm.fields.message} />
          <button type="submit" className="form-submit" disabled={isSending}>
            {isSending ? quoteForm.sendingLabel : quoteForm.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

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

function Contact({ onSuccess }) {
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

function Footer() {
  const { footer } = siteContent;

  return (
    <footer>
      <div className="logo">{company.logoPrimary} <span>&nbsp;{company.logoSecondary}</span></div>
      <div className="footer-copy">{footer.copyright}</div>
      <div className="footer-right"><strong>{footer.license}</strong>{company.phoneDisplay} &nbsp;|&nbsp; {company.serviceAreaShort}</div>
    </footer>
  );
}

function SuccessModal({ isOpen, onClose }) {
  const { successModal } = siteContent;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`modal-backdrop${isOpen ? ' is-open' : ''}`}
      id="successModal"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-title">{successModal.title} <span>{successModal.titleAccent}</span></div>
        <div className="modal-body">{successModal.body}</div>
        <button className="modal-close" type="button" id="successModalClose" onClick={onClose}>{successModal.closeLabel}</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="afterInteractive"
        onLoad={() => window.emailjs?.init({ publicKey: 'TLG4XlbbLRVHddY_I' })}
      />
      <main>
        <Header />
        <Hero />
        <Stats />
        <Services />
        <About />
        <PhotoStrip />
        <Process />
        <FAQ />
        <Contact onSuccess={() => setIsModalOpen(true)} />
        <Footer />
        <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </>
  );
}
