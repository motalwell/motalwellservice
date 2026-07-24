'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const pageMarkup = '<!-- TOP UTILITY BAR -->\n  <div class="topbar">\n    <span class="license-badge">Licensed &amp; Insured · Central Texas2</span>\n    <div>\n      <a href="tel:5123508061">📞 (512) 350-8061</a>\n      <a href="mailto:info@motalwellservices.com">✉ info@motalwellservices.com</a>\n    </div>\n  </div>\n\n  <!-- MAIN NAV -->\n  <nav>\n    <div class="logo">\n      <div class="logo-icon">⛏</div>\n      Motal <span>&nbsp;Well Services</span>\n    </div>\n    <ul>\n      <li><a href="#services">Services</a></li>\n      <li><a href="#about">About</a></li>\n      <li><a href="#process">Process</a></li>\n      <li><a href="#faq">FAQ</a></li>\n      <li><a href="#contact">Contact</a></li>\n      <li><a href="#quoteForm2" class="nav-cta">Quote</a></li>\n    </ul>\n  </nav>\n\n  <!-- HERO -->\n  <section class="hero">\n    <div class="hero-bg"></div>\n    <div class="hero-overlay"></div>\n    <div class="hero-content">\n      <div class="hero-tag">Residential · Agricultural · Commercial</div>\n      <h1>Professional.<br>Experienced.<br><em>Knowledgeable.</em></h1>\n      <p>Motal Well Services is a locally owned company serving Central Texas. We are committed to providing professional water well drilling, pump installation, and well services for every customer.</p>\n      <div class="hero-btns">\n        <a href="#services" class="btn-primary">Our Drilling Services</a>\n        <a href="#contact" class="btn-outline">Get a Free Quote</a>\n      </div>\n    </div>\n  </section>\n\n  <!-- STATS BAR -->\n  <div class="stats">\n    <div class="stat">\n      <span class="stat-num" data-target="25">0</span>\n      <div class="stat-label">Years of Experience</div>\n    </div>\n    <div class="stat">\n      <span class="stat-num" data-target="1200">0</span>\n      <div class="stat-label">Wells Drilled</div>\n    </div>\n    <div class="stat">\n      <span class="stat-num" data-target="98">0</span>\n      <div class="stat-label">% Success Rate</div>\n    </div>\n    <div class="stat">\n      <span class="stat-num" data-target="24">0</span>\n      <div class="stat-label">Hr Emergency Response</div>\n    </div>\n  </div>\n\n  <!-- SERVICES -->\n  <section class="services" id="services">\n    <div class="section-eyebrow">What We Do</div>\n    <div class="section-title">Your Trusted Central Texas <span>Well Drilling Partner</span></div>\n    <p class="section-intro">We provide complete water well solutions for homeowners, farmers, and commercial operations across Central Texas. Every job is handled with the experience and care your property deserves.</p>\n\n    <div class="service-grid">\n\n      <!-- Residential -->\n      <div class="service-card">\n        <img class="service-img"\n          src="/assets/img/rig-desert.jpg"\n          alt="Residential water well drilling"\n          onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">\n        <div class="service-img-placeholder" style="display:none;">🏡</div>\n        <div class="service-body">\n          <h3>Domestic &amp; Residential Water Wells</h3>\n          <p>Clean, reliable water for your home. We site, drill, and case residential water wells to deliver consistent water pressure and quality for your household.</p>\n          <ul>\n            <li>New Well Drilling</li>\n            <li>Well Deepening</li>\n            <li>Well Rehabilitation</li>\n            <li>Decommissioning</li>\n          </ul>\n          <a href="#contact" class="service-link">Request a Quote →</a>\n        </div>\n      </div>\n\n      <!-- Agricultural -->\n      <div class="service-card">\n        <img class="service-img"\n          src="/assets/img/rig-field.jpg"\n          alt="Agricultural water well drilling"\n          onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">\n        <div class="service-img-placeholder" style="display:none;">🌾</div>\n        <div class="service-body">\n          <h3>Agricultural &amp; Irrigation Wells</h3>\n          <p>High-yield irrigation wells engineered for livestock operations, row crops, and large-scale Texas farming. We understand the water demands of working land.</p>\n          <ul>\n            <li>New High-Capacity Wells</li>\n            <li>Well Deepening &amp; Cleanouts</li>\n            <li>Pump &amp; Motor Upgrades</li>\n            <li>Decommissioning</li>\n          </ul>\n          <a href="#contact" class="service-link">Request a Quote →</a>\n        </div>\n      </div>\n\n      <!-- Commercial -->\n      <div class="service-card">\n        <img class="service-img"\n          src="/assets/img/rig-field.jpg"\n          alt="Commercial water well drilling rig"\n          onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">\n        <div class="service-img-placeholder" style="display:none;">🏗</div>\n        <div class="service-body">\n          <h3>Commercial &amp; Industrial Wells</h3>\n          <p>Reliable water supply for commercial developments, municipalities, and industrial operations. We bring the right equipment and experience for large-scale projects.</p>\n          <ul>\n            <li>New Commercial Wells</li>\n            <li>Municipal Supply Wells</li>\n            <li>Well Deepening</li>\n            <li>Flow &amp; Quality Testing</li>\n          </ul>\n          <a href="#contact" class="service-link">Request a Quote →</a>\n        </div>\n      </div>\n\n      <!-- Pump & Repair -->\n      <div class="service-card">\n        <img class="service-img"\n          src="/assets/img/rig-truck.jpg"\n          alt="Well pump installation and repair"\n          onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">\n        <div class="service-img-placeholder" style="display:none;">🔧</div>\n        <div class="service-body">\n          <h3>Pump Installation &amp; Well Repair</h3>\n          <p>Low flow, sediment, or equipment failure? We diagnose and restore your existing well. Submersible and jet pump systems installed right and built to last.</p>\n          <ul>\n            <li>Submersible Pump Installation</li>\n            <li>Pressure Tank Systems</li>\n            <li>Water Quality Testing</li>\n            <li>Permits &amp; State Compliance</li>\n          </ul>\n          <a href="#contact" class="service-link">Request a Quote →</a>\n        </div>\n      </div>\n\n    </div>\n  </section>\n\n  <!-- ABOUT -->\n  <section style="background: var(--white);" id="about">\n    <div class="about">\n\n      <div class="about-text">\n        <div class="section-eyebrow">About Our Company</div>\n        <h2 class="section-title">Locally Owned.<br><span>Texas Proud.</span></h2>\n        <p><strong>Motal Well Services</strong> is a locally owned company serving Central Texas and surrounding areas. We are committed to providing a quality product and professional service for every customer — from small residential wells to large commercial projects.</p>\n        <p>Our team of experienced drillers brings deep knowledge of Texas geology and groundwater. We take pride in protecting your water resource while delivering personalized, professional service from the first call to final handoff.</p>\n        <p>We handle all permits, filings, and inspections so you can stay focused on what matters most — your home, your farm, your business.</p>\n        <div class="assoc-logos">\n          <div class="assoc-badge">Texas LIC. Well Driller</div>\n          <div class="assoc-badge">Bonded &amp; Insured</div>\n          <div class="assoc-badge">TGPC Member</div>\n        </div>\n      </div>     \n     \n\n      <div class="about-img-wrap">\n        <img src="/assets/img/rig-truck.jpg" alt="Motal Well Services drilling rig at work" onerror="this.src=\'\'; this.style.background=\'var(--navy2)\';">\n        <div class="about-years">\n          <span class="num">25+</span>\n          <span class="lbl">Years of Experience</span>\n        </div>\n\n        \n\n      </div>\n\n\n\n\n\n    </div>\n  </section>\n\n  <!-- PHOTO STRIP -->\n  <div class="photo-strip">\n    <img src="/assets/img/rig-tower.jpg" alt="Water well drilling rig in Texas">\n    <div class="photo-strip-overlay">\n      <h2>Ready to Find <span>Your Water?</span></h2>\n      <p>Get straight answers and a fair price. No runaround — just results.</p>\n      <a href="#contact" class="btn-primary">Get a Free Quote Today</a>\n    </div>\n  </div>\n\n  <!-- PROCESS -->\n  <section class="process" id="process">\n    <div class="section-eyebrow">How It Works</div>\n    <div class="section-title" style="color:white;">From First Call to <span>Flowing Water.</span></div>\n    <p class="section-intro">Our streamlined process takes the stress out of getting a new well. Here\'s what to expect from start to finish.</p>\n    <div class="process-grid">\n      <div class="process-step">\n        <div class="process-num">01</div>\n        <h4>Site Assessment</h4>\n        <p>We evaluate your land, pull geological data, and identify the optimal drill location before any equipment is mobilized.</p>\n      </div>\n      <div class="process-step">\n        <div class="process-num">02</div>\n        <h4>Permitting</h4>\n        <p>Every Texas permit, state filing, and required inspection is handled by our team. You stay focused on your property.</p>\n      </div>\n      <div class="process-step">\n        <div class="process-num">03</div>\n        <h4>Drilling</h4>\n        <p>We bring modern rigs, experienced operators, and real-time formation logging to reach the best aquifer for your land.</p>\n      </div>\n      <div class="process-step">\n        <div class="process-num">04</div>\n        <h4>Testing &amp; Handoff</h4>\n        <p>Full yield and water quality testing, pump installation, and a reliable water source handed to you — ready to use.</p>\n      </div>\n    </div>\n  </section>\n\n  <!-- FAQ -->\n  <section class="faq" id="faq">\n    <div class="faq-header">\n      <div class="section-eyebrow">FAQ\'s</div>\n      <div class="section-title">Let\'s Talk About <span>Drilling</span></div>\n      <p class="section-intro" style="margin-bottom:0;">Over the years we\'ve been asked a lot of questions. Here are the most common ones about water well drilling in Central Texas.</p>\n    </div>\n    <div class="faq-grid">\n      <div class="faq-item">\n        <h4>How deep does the well need to be?</h4>\n        <p>Well depth varies based on your specific location, local geology, and how much water you need. Central Texas wells typically range from 200 to 600+ feet depending on the aquifer. We assess your land and geological data to recommend the right depth before drilling begins.</p>\n      </div>\n      <div class="faq-item">\n        <h4>How much does a new well cost?</h4>\n        <p>Costs depend on depth, soil and rock conditions, location, and any additional services like pump installation or water testing. We provide transparent, no-surprise quotes after evaluating your property. Every site is unique — we\'ll give you a fair price based on your actual conditions.</p>\n      </div>\n      <div class="faq-item">\n        <h4>Is well water safe to drink?</h4>\n        <p>Properly drilled and cased wells in Central Texas can provide clean, safe drinking water. We perform water quality testing after every new well to verify safety. Periodic re-testing is recommended, as groundwater quality can change over time.</p>\n      </div>\n      <div class="faq-item">\n        <h4>What equipment do you use?</h4>\n        <p>We operate modern rotary drill rigs capable of handling Texas\'s varied geology — from soft clay and caliche to hard limestone and granite. Our equipment is maintained to industry standards and operated by experienced, licensed Texas drillers.</p>\n      </div>\n      <div class="faq-item">\n        <h4>How long does it take to drill a well?</h4>\n        <p>Most residential wells can be drilled in 1–3 days, depending on depth and conditions. Agricultural and commercial projects may take longer. We\'ll give you a realistic timeline upfront and keep you updated throughout the job.</p>\n      </div>\n      <div class="faq-item">\n        <h4>Do you handle permits and inspections?</h4>\n        <p>Yes — we take care of all required Texas Water Well permits, groundwater conservation district filings, and any required inspections. You don\'t have to navigate state bureaucracy on your own.</p>\n      </div>\n    </div>\n  </section>\n\n  <!-- CONTACT -->\n  <section style="background: var(--white);" id="contact">\n    <div class="contact-section">\n      <div class="contact-info">\n        <div class="section-eyebrow">Get in Touch</div>\n        <h2 class="section-title">Ready to Get <span>Started?</span></h2>\n        <p>If you\'re considering a new well or need help with an existing one, we\'re here to help. Fill out the form and our team will get back to you with a quote and answers to your questions.</p>\n\n        <div class="contact-item">\n          <div class="contact-icon">📞</div>\n          <div class="contact-detail">\n            <strong>Phone</strong>\n            <a href="tel:5123508061">(512) 350-8061</a>\n          </div>\n        </div>\n        <div class="contact-item">\n          <div class="contact-icon">✉</div>\n          <div class="contact-detail">\n            <strong>Email</strong>\n            <a href="mailto:info@motalwellservices.com">info@motalwellservices.com</a>\n          </div>\n        </div>\n        <div class="contact-item">\n          <div class="contact-icon">📍</div>\n          <div class="contact-detail">\n            <strong>Service Area</strong>\n            Central Texas &amp; Surrounding Counties\n          </div>\n        </div>\n        <div class="contact-item">\n          <div class="contact-icon">🕐</div>\n          <div class="contact-detail">\n            <strong>Hours</strong>\n            Mon–Fri 7am–6pm · Sat 8am–2pm<br>Emergency Service Available 24/7\n          </div>\n        </div>\n      </div>\n\n      <section id="quoteForm2">\n<br/>\n      <div class="quote-form" >\n        <h3>Free Quote Request</h3>\n        <p class="form-sub">Fill out the form below and we\'ll respond as quickly as possible.</p>\n        <form id="quoteForm">\n          <div class="form-row">\n            <input type="text" id="field-name" name="name" placeholder="Full Name *" required>\n            <input type="tel" id="field-phone" name="phone" placeholder="Phone Number *" required>\n          </div>\n          <input type="email" id="field-email" name="email" placeholder="Email Address">\n          <input type="text" id="field-location" name="location" placeholder="Property Location / County">\n          <select id="field-service" name="service">\n            <option value="" disabled selected>Type of Service Needed</option>\n            <option>New Residential Well</option>\n            <option>New Agricultural / Irrigation Well</option>\n            <option>New Commercial Well</option>\n            <option>Well Deepening</option>\n            <option>Well Repair / Rehabilitation</option>\n            <option>Pump Installation</option>\n            <option>Water Testing</option>\n            <option>Well Decommissioning</option>\n            <option>Not Sure / Need Advice</option>\n          </select>\n          <textarea id="field-message" name="message" placeholder="Questions or additional details about your project..."></textarea>\n          <button type="submit" class="form-submit">Submit Request →</button>\n        </form>\n      </div>\n\n</section>\n\n    </div>\n  </section>\n\n  <!-- FOOTER -->\n  <footer>\n    <div class="logo">Motal <span>&nbsp;Well Services</span></div>\n    <div class="footer-copy">© 2025 Motal Well Services — All Rights Reserved</div>\n    <div class="footer-right">\n      <strong>Licensed Well Driller — Texas</strong>\n      (512) 350-8061 &nbsp;|&nbsp; Central Texas\n    </div>\n  </footer>\n\n  <!-- SUCCESS MODAL -->\n  <div class="modal-backdrop" id="successModal" role="dialog" aria-modal="true" aria-hidden="true">\n    <div class="modal">\n      <div class="modal-title">Request <span>Sent!</span></div>\n      <div class="modal-body">\n        Thanks for reaching out. Your request was received successfully. We\'ll review the details and get back to you as soon as possible.\n      </div>\n      <button class="modal-close" type="button" id="successModalClose">Close</button>\n    </div>\n  </div>';

export default function Home() {
  useEffect(() => {
    const cleanups = [];
    const statEls = document.querySelectorAll('.stat-num');
    const animationFrames = new Map();

    const animateStat = (el) => {
      const priorFrame = animationFrames.get(el);
      if (priorFrame) cancelAnimationFrame(priorFrame);

      const target = Number.parseInt(el.dataset.target || '0', 10);
      const duration = 1000;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) * (1 - progress);
        el.textContent = String(Math.floor(target * eased));

        if (progress < 1) {
          animationFrames.set(el, requestAnimationFrame(tick));
        } else {
          el.textContent = String(target);
        }
      };

      animationFrames.set(el, requestAnimationFrame(tick));
    };

    const stats = document.querySelector('.stats');
    let statsObserver;
    if (stats && 'IntersectionObserver' in window) {
      statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) statEls.forEach(animateStat);
        });
      }, { threshold: 0.5 });
      statsObserver.observe(stats);
    } else {
      statEls.forEach(animateStat);
    }

    const modal = document.getElementById('successModal');
    const closeButton = document.getElementById('successModalClose');
    const openModal = () => {
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    };
    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    };
    const handleModalClick = (event) => {
      if (event.target === modal) closeModal();
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };

    closeButton?.addEventListener('click', closeModal);
    modal?.addEventListener('click', handleModalClick);
    document.addEventListener('keydown', handleKeyDown);
    cleanups.push(() => closeButton?.removeEventListener('click', closeModal));
    cleanups.push(() => modal?.removeEventListener('click', handleModalClick));
    cleanups.push(() => document.removeEventListener('keydown', handleKeyDown));

    const form = document.getElementById('quoteForm');
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!(form instanceof HTMLFormElement)) return;

      const button = form.querySelector('button[type="submit"]');
      const originalText = button?.textContent || 'Submit';
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }

      try {
        if (!window.emailjs) throw new Error('EmailJS is not available.');
        await window.emailjs.send('service_6lrjbde', 'template_4yxabjd', {
          from_name: document.getElementById('field-name')?.value || '',
          phone: document.getElementById('field-phone')?.value || '',
          reply_to: document.getElementById('field-email')?.value || '',
          location: document.getElementById('field-location')?.value || '',
          message: document.getElementById('field-message')?.value || '',
        });
        form.reset();
        openModal();
      } catch (error) {
        window.alert('There was an issue sending your request. Please call us directly at (512) 350-8061.');
        console.error('EmailJS error:', error);
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalText;
        }
      }
    };

    form?.addEventListener('submit', handleSubmit);
    cleanups.push(() => form?.removeEventListener('submit', handleSubmit));

    return () => {
      statsObserver?.disconnect();
      animationFrames.forEach(cancelAnimationFrame);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="afterInteractive"
        onLoad={() => window.emailjs?.init({ publicKey: 'TLG4XlbbLRVHddY_I' })}
      />
      <main dangerouslySetInnerHTML={{ __html: pageMarkup }} />
    </>
  );
}
