'use client';

import Script from 'next/script';
import { useState } from 'react';
import QuoteForm from './QuoteForm';
import SuccessModal from './SuccessModal';

export default function QuoteRequest({ quoteForm, successModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="afterInteractive"
        onLoad={() => window.emailjs?.init({ publicKey: 'TLG4XlbbLRVHddY_I' })}
      />
      <QuoteForm quoteForm={quoteForm} onSuccess={() => setIsModalOpen(true)} />
      <SuccessModal
        successModal={successModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
