import { Navigation } from '@/comps/nav/nav';
import './globals.css';

export const metadata = {
 title: 'Motal Well Services',
 description: 'Motal Well Services is a locally owned company serving Central Texas. We are committed to providing professional water well drilling, pump installation, and well services for every customer',
};

export const viewport = {
 width: 'device-width',
 initialScale: 1,
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body>
    <Navigation />
    {children}
   </body>
  </html>
 );
}
