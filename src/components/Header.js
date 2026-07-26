'use client';

import { Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

function Logo({ company }) {
  return (
    <div className="logo">
      <div className="logo-icon">{company.logoIcon}</div>
      {company.logoPrimary} <span>&nbsp;{company.logoSecondary}</span>
    </div>
  );
}

export default function Header({ company, navigation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="topbar">
        <span className="license-badge">{company.licenseBadge}</span>
        <div className="topbar-contact">
          <a href={`tel:${company.phoneLink}`} aria-label={`Call ${company.phoneDisplay}` }>
            <Phone size={15} strokeWidth={2} aria-hidden="true" />
            <span className="topbar-phone-text">{company.phoneDisplay}</span>
          </a>
          <a href={`mailto:${company.email}`} aria-label={`Email ${company.email}` }>
            <Mail size={15} strokeWidth={2} aria-hidden="true" />
            <span className="topbar-email-text">{company.email}</span>
          </a>
        </div>
      </div>

      <nav className="main-nav">
        <Logo company={company} />
        <button
          type="button"
          className="mobile-menu-button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
        <ul id="primary-navigation" className={isMenuOpen ? 'is-open' : undefined}>
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={item.isCta ? 'nav-cta' : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
