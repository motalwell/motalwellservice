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
import { getSiteContent } from '../data/getSiteContent';

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main>
      <Header company={content.company} navigation={content.navigation} />
      <Hero hero={content.hero} />
      <Stats stats={content.stats} />
      <Services servicesSection={content.servicesSection} services={content.services} />
      <About about={content.about} />
      <PhotoStrip photoCallout={content.photoCallout} />
      <Process process={content.process} />
      <FAQ faq={content.faq} />
      <Contact
        company={content.company}
        contact={content.contact}
        quoteForm={content.quoteForm}
        successModal={content.successModal}
      />
      <Footer company={content.company} footer={content.footer} />
    </main>
  );
}
