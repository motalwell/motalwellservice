/* eslint-disable @next/next/no-img-element */
'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { target: 25, label: 'Years of Experience' },
  { target: 1200, label: 'Wells Drilled' },
  { target: 98, label: '% Success Rate' },
  { target: 24, label: 'Hr Emergency Response' },
];

const services = [
  {
    title: 'Domestic & Residential Water Wells',
    description:
      'Clean, reliable water for your home. We site, drill, and case residential water wells to deliver consistent water pressure and quality for your household.',
    image: '/assets/img/rig-desert.jpg',
    alt: 'Residential water well drilling',
    fallback: '🏡',
    features: ['New Well Drilling', 'Well Deepening', 'Well Rehabilitation', 'Decommissioning'],
  },
  {
    title: 'Agricultural & Irrigation Wells',
    description:
      'High-yield irrigation wells engineered for livestock operations, row crops, and large-scale Texas farming. We understand the water demands of working land.',
    image: '/assets/img/rig-field.jpg',
    alt: 'Agricultural water well drilling',
    fallback: '🌾',
    features: ['New High-Capacity Wells', 'Well Deepening & Cleanouts', 'Pump & Motor Upgrades', 'Decommissioning'],
  },
  {
    title: 'Commercial & Industrial Wells',
    description:
      'Reliable water supply for commercial developments, municipalities, and industrial operations. We bring the right equipment and experience for large-scale projects.',
    image: '/assets/img/rig-field.jpg',
    alt: 'Commercial water well drilling rig',
    fallback: '🏗',
    features: ['New Commercial Wells', 'Municipal Supply Wells', 'Well Deepening', 'Flow & Quality Testing'],
  },
  {
    title: 'Pump Installation & Well Repair',
    description:
      'Low flow, sediment, or equipment failure? We diagnose and restore your existing well. Submersible and jet pump systems installed right and built to last.',
    image: '/assets/img/rig-truck.jpg',
    alt: 'Well pump installation and repair',
    fallback: '🔧',
    features: ['Submersible Pump Installation', 'Pressure Tank Systems', 'Water Quality Testing', 'Permits & State Compliance'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Site Assessment',
    description:
      'We evaluate your land, pull geological data, and identify the optimal drill location before any equipment is mobilized.',
  },
  {
    number: '02',
    title: 'Permitting',
    description:
      'Every Texas permit, state filing, and required inspection is handled by our team. You stay focused on your property.',
  },
  {
    number: '03',
    title: 'Drilling',
    description:
      'We bring modern rigs, experienced operators, and real-time formation logging to reach the best aquifer for your land.',
  },
  {
    number: '04',
    title: 'Testing & Handoff',
    description:
      'Full yield and water quality testing, pump installation, and a reliable water source handed to you — ready to use.',
  },
];

const faqs = [
  {
    question: 'How deep does the well need to be?',
    answer:
      'Well depth varies based on your specific location, local geology, and how much water you need. Central Texas wells typically range from 200 to 600+ feet depending on the aquifer. We assess your land and geological data to recommend the right depth before drilling begins.',
  },
  {
    question: 'How much does a new well cost?',
    answer:
      "Costs depend on depth, soil and rock conditions, location, and any additional services like pump installation or water testing. We provide transparent, no-surprise quotes after evaluating your property. Every site is unique — we'll give you a fair price based on your actual conditions.",
  },
  {
    question: 'Is well water safe to drink?',
    answer:
      'Properly drilled and cased wells in Central Texas can provide clean, safe drinking water. We perform water quality testing after every new well to verify safety. Periodic re-testing is recommended, as groundwater quality can change over time.',
  },
  {
    question: 'What equipment do you use?',
    answer:
      "We operate modern rotary drill rigs capable of handling Texas's varied geology — from soft clay and caliche to hard limestone and granite. Our equipment is maintained to industry standards and operated by experienced, licensed Texas drillers.",
  },
  {
    question: 'How long does it take to drill a well?',
    answer:
      "Most residential wells can be drilled in 1–3 days, depending on depth and conditions. Agricultural and commercial projects may take longer. We'll give you a realistic timeline upfront and keep you updated throughout the job.",
  },
  {
    question: 'Do you handle permits and inspections?',
    answer:
      "Yes — we take care of all required Texas Water Well permits, groundwater conservation district filings, and any required inspections. You don't have to navigate state bureaucracy on your own.",
  },
];

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

function Header() {
  return (
    <>
      <div className="topbar">
        <span className="license-badge">Licensed &amp; Insured · Central Texas</span>
        <div>
          <a href="tel:5123508061">📞 (512) 350-8061</a>
          <a href="mailto:info@motalwellservices.com">✉ info@motalwellservices.com</a>
        </div>
      </div>

      <nav>
        <div className="logo">
          <div className="logo-icon">⛏</div>
          Motal <span>&nbsp;Well Services</span>
        </div>
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#quoteForm2" className="nav-cta">Quote</a></li>
        </ul>
      </nav>
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-tag">Residential · Agricultural · Commercial</div>
        <h1>
          Professional.<br />Experienced.<br /><em>Knowledgeable.</em>
        </h1>
        <p>
          Motal Well Services is a locally owned company serving Central Texas. We are committed to providing professional
          water well drilling, pump installation, and well services for every customer.
        </p>
        <div className="hero-btns">
          <a href="#services" className="btn-primary">Our Drilling Services</a>
          <a href="#contact" className="btn-outline">Get a Free Quote</a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
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
  }, []);

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
  return (
    <section className="services" id="services">
      <div className="section-eyebrow">What We Do</div>
      <div className="section-title">Your Trusted Central Texas <span>Well Drilling Partner</span></div>
      <p className="section-intro">
        We provide complete water well solutions for homeowners, farmers, and commercial operations across Central Texas.
        Every job is handled with the experience and care your property deserves.
      </p>

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
              <a href="#contact" className="service-link">Request a Quote →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const [imageError, setImageError] = useState(false);

  return (
    <section style={{ background: 'var(--white)' }} id="about">
      <div className="about">
        <div className="about-text">
          <div className="section-eyebrow">About Our Company</div>
          <h2 className="section-title">Locally Owned.<br /><span>Texas Proud.</span></h2>
          <p><strong>Motal Well Services</strong> is a locally owned company serving Central Texas and surrounding areas. We are committed to providing a quality product and professional service for every customer — from small residential wells to large commercial projects.</p>
          <p>Our team of experienced drillers brings deep knowledge of Texas geology and groundwater. We take pride in protecting your water resource while delivering personalized, professional service from the first call to final handoff.</p>
          <p>We handle all permits, filings, and inspections so you can stay focused on what matters most — your home, your farm, your business.</p>
          <div className="assoc-logos">
            <div className="assoc-badge">Texas LIC. Well Driller</div>
            <div className="assoc-badge">Bonded &amp; Insured</div>
            <div className="assoc-badge">TGPC Member</div>
          </div>
        </div>

        <div className="about-img-wrap">
          <img
            src={imageError ? undefined : '/assets/img/rig-truck.jpg'}
            alt="Motal Well Services drilling rig at work"
            onError={() => setImageError(true)}
            style={imageError ? { background: 'var(--navy2)' } : undefined}
          />
          <div className="about-years">
            <span className="num">25+</span>
            <span className="lbl">Years of Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoStrip() {
  return (
    <div className="photo-strip">
      <img src="/assets/img/rig-tower.jpg" alt="Water well drilling rig in Texas" />
      <div className="photo-strip-overlay">
        <h2>Ready to Find <span>Your Water?</span></h2>
        <p>Get straight answers and a fair price. No runaround — just results.</p>
        <a href="#contact" className="btn-primary">Get a Free Quote Today</a>
      </div>
    </div>
  );
}

function Process() {
  return (
    <section className="process" id="process">
      <div className="section-eyebrow">How It Works</div>
      <div className="section-title" style={{ color: 'white' }}>From First Call to <span>Flowing Water.</span></div>
      <p className="section-intro">Our streamlined process takes the stress out of getting a new well. Here&apos;s what to expect from start to finish.</p>
      <div className="process-grid">
        {processSteps.map((step) => (
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
  return (
    <section className="faq" id="faq">
      <div className="faq-header">
        <div className="section-eyebrow">FAQ&apos;s</div>
        <div className="section-title">Let&apos;s Talk About <span>Drilling</span></div>
        <p className="section-intro" style={{ marginBottom: 0 }}>Over the years we&apos;ve been asked a lot of questions. Here are the most common ones about water well drilling in Central Texas.</p>
      </div>
      <div className="faq-grid">
        {faqs.map((faq) => (
          <div className="faq-item" key={faq.question}>
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuoteForm({ onSuccess }) {
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
      window.alert('There was an issue sending your request. Please call us directly at (512) 350-8061.');
      console.error('EmailJS error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="quoteForm2">
      <br />
      <div className="quote-form">
        <h3>Free Quote Request</h3>
        <p className="form-sub">Fill out the form below and we&apos;ll respond as quickly as possible.</p>
        <form id="quoteForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" id="field-name" name="name" placeholder="Full Name *" required />
            <input type="tel" id="field-phone" name="phone" placeholder="Phone Number *" required />
          </div>
          <input type="email" id="field-email" name="email" placeholder="Email Address" />
          <input type="text" id="field-location" name="location" placeholder="Property Location / County" />
          <select id="field-service" name="service" defaultValue="">
            <option value="" disabled>Type of Service Needed</option>
            <option>New Residential Well</option>
            <option>New Agricultural / Irrigation Well</option>
            <option>New Commercial Well</option>
            <option>Well Deepening</option>
            <option>Well Repair / Rehabilitation</option>
            <option>Pump Installation</option>
            <option>Water Testing</option>
            <option>Well Decommissioning</option>
            <option>Not Sure / Need Advice</option>
          </select>
          <textarea id="field-message" name="message" placeholder="Questions or additional details about your project..." />
          <button type="submit" className="form-submit" disabled={isSending}>
            {isSending ? 'Sending…' : 'Submit Request →'}
          </button>
        </form>
      </div>
    </section>
  );
}

function Contact({ onSuccess }) {
  return (
    <section style={{ background: 'var(--white)' }} id="contact">
      <div className="contact-section">
        <div className="contact-info">
          <div className="section-eyebrow">Get in Touch</div>
          <h2 className="section-title">Ready to Get <span>Started?</span></h2>
          <p>If you&apos;re considering a new well or need help with an existing one, we&apos;re here to help. Fill out the form and our team will get back to you with a quote and answers to your questions.</p>

          <div className="contact-item">
            <div className="contact-icon">📞</div>
            <div className="contact-detail"><strong>Phone</strong><a href="tel:5123508061">(512) 350-8061</a></div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">✉</div>
            <div className="contact-detail"><strong>Email</strong><a href="mailto:info@motalwellservices.com">info@motalwellservices.com</a></div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div className="contact-detail"><strong>Service Area</strong>Central Texas &amp; Surrounding Counties</div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">🕐</div>
            <div className="contact-detail"><strong>Hours</strong>Mon–Fri 7am–6pm · Sat 8am–2pm<br />Emergency Service Available 24/7</div>
          </div>
        </div>

        <QuoteForm onSuccess={onSuccess} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="logo">Motal <span>&nbsp;Well Services</span></div>
      <div className="footer-copy">© 2025 Motal Well Services — All Rights Reserved</div>
      <div className="footer-right"><strong>Licensed Well Driller — Texas</strong>(512) 350-8061 &nbsp;|&nbsp; Central Texas</div>
    </footer>
  );
}

function SuccessModal({ isOpen, onClose }) {
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
        <div className="modal-title">Request <span>Sent!</span></div>
        <div className="modal-body">Thanks for reaching out. Your request was received successfully. We&apos;ll review the details and get back to you as soon as possible.</div>
        <button className="modal-close" type="button" id="successModalClose" onClick={onClose}>Close</button>
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
