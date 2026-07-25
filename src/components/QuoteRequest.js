'use client';

import { useState } from 'react';
import QuoteForm from './QuoteForm';
import SuccessModal from './SuccessModal';

export default function QuoteRequest({ quoteForm, successModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <QuoteForm quoteForm={quoteForm} onSuccess={() => setIsModalOpen(true)} />
      <SuccessModal
        successModal={successModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
