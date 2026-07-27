import Image from 'next/image';

export default function Footer({ company, footer }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-mark">
          <Image
            src="/icons/logoNav.png"
            alt="Motal Well Drilling Services"
            width={890}
            height={230}
            className="footer-logo-image"
          />
        </div>

        <div className="footer-contact-block">
          <div className="footer-contact-line">
            <a href={`tel:${company.phoneLink}`}>{company.phoneDisplay}</a>
            <span className="footer-contact-separator" aria-hidden="true">|</span>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          {footer?.copyright ? <div className="footer-copyright">{footer.copyright}</div> : null}
        </div>
      </div>
    </footer>
  );
}
