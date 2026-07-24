'use client';

import Script from 'next/script';
import { useState } from 'react';
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
import SuccessModal from '../components/SuccessModal';


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="afterInteractive"
        onLoad={() => window.emailjs?.init({ publicKey: 'TLG4XlbbLRVHddY_I' })}
      />
      <main>
        <Header />
        <Hero />
        <Stats />
        <Services />
        <About />
        <PhotoStrip />
        <Process />
        <FAQ />
        <Contact onSuccess={() => setIsModalOpen(true)} />
        <Footer />
        <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </>
  );
}
