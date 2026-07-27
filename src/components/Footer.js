import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Image
        src="/icons/logoNav.png"
        alt="Motal Well Drilling Services"
        width={420}
        height={150}
        className="footer-logo-image"
      />
    </footer>
  );
}
