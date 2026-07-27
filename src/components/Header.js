'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function ResponsiveLogo() {
  return (
    <a href="#top" className="header-logo-link" aria-label="Motal Well Drilling Services home">
      <Image
        src="/icons/logoBlock.png"
        alt="Motal Well Drilling Services"
        width={260}
        height={260}
        className="header-logo-image header-logo-desktop"
        priority
      />
      <Image
        src="/icons/logoNav.png"
        alt="Motal Well Drilling Services"
        width={420}
        height={150}
        className="header-logo-image header-logo-mobile"
        priority
      />
    </a>
  );
}

export default function Header({ navigation }) {
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
    <nav id="top" className="main-nav">
      <ResponsiveLogo />
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
  );
}
