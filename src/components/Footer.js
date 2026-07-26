export default function Footer({ company, footer }) {
  return (
    <footer>
      <div className="footer-brand">
        <div className="logo">
          <div className="logo-icon">{company.logoIcon}</div>
          {company.logoPrimary} <span>&nbsp;{company.logoSecondary}</span>
        </div>
        <div className="footer-copy">{footer.copyright}</div>
      </div>
      <div className="footer-right">
        <strong>{footer.license}</strong>
        <span>{company.phoneDisplay}</span>
        <span className="footer-divider" aria-hidden="true">|</span>
        <span>{company.serviceAreaShort}</span>
      </div>
    </footer>
  );
}
