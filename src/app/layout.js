import './globals.css';

export const metadata = {
  title: 'Motal Well Services – Water Well Drilling | Central Texas',
  description: 'Motal Well Services is a locally owned company serving Central Texas. Professional water well drilling, pump installation, and well services.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
