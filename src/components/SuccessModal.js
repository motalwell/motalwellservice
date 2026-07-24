'use client';

import { useEffect } from 'react';

export default function SuccessModal({ successModal, isOpen, onClose }) {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`modal-backdrop${isOpen ? ' is-open' : ''}`}
      id="successModal"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-title">{successModal.title} <span>{successModal.titleAccent}</span></div>
        <div className="modal-body">{successModal.body}</div>
        <button className="modal-close" type="button" id="successModalClose" onClick={onClose}>{successModal.closeLabel}</button>
      </div>
    </div>
  );
}
