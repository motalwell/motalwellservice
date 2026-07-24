import About from '../components/About';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PhotoStrip from '../components/PhotoStrip';
import Process from '../components/Process';
import Services from '../components/Services';
import Stats from '../components/Stats';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Stats />
      <Services />
      <About />
      <PhotoStrip />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
