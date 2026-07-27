import Image from 'next/image';

export default function Footer({ company, footer }) {
  return (
    <footer>
      <div className="footer-brand">
        <Image src="/icons/logoBlock.png" alt="Motal Well Drilling Services" width={180} height={220} className="footer-logo-image" />
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
