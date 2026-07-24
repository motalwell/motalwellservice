export default function Footer({ company, footer }) {
  return (
    <footer>
      <div className="logo">{company.logoPrimary} <span>&nbsp;{company.logoSecondary}</span></div>
      <div className="footer-copy">{footer.copyright}</div>
      <div className="footer-right"><strong>{footer.license}</strong>{company.phoneDisplay} &nbsp;|&nbsp; {company.serviceAreaShort}</div>
    </footer>
  );
}
