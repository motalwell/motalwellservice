'use client';

import { useState } from 'react';

export default function QuoteForm({ quoteForm, onSuccess }) {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSending(true);

    try {
      const formData = new FormData(form);
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name') || '',
          phone: formData.get('phone') || '',
          email: formData.get('email') || '',
          location: formData.get('location') || '',
          service: formData.get('service') || '',
          message: formData.get('message') || '',
          website: formData.get('website') || '',
        }),
      });

      if (!response.ok) {
        throw new Error(`Quote request failed with status ${response.status}.`);
      }

      form.reset();
      onSuccess();
    } catch (error) {
      window.alert(quoteForm.errorMessage);
      console.error('Quote request error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="quoteForm2">
      <br />
      <div className="quote-form">
        <h3>{quoteForm.title}</h3>
        <p className="form-sub">{quoteForm.subtitle}</p>
        <form id="quoteForm" onSubmit={handleSubmit}>
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            <label htmlFor="field-website">Website</label>
            <input
              type="text"
              id="field-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="form-row">
            <input type="text" id="field-name" name="name" placeholder={quoteForm.fields.name} required />
            <input type="tel" id="field-phone" name="phone" placeholder={quoteForm.fields.phone} required />
          </div>
          <input type="email" id="field-email" name="email" placeholder={quoteForm.fields.email} />
          <input type="text" id="field-location" name="location" placeholder={quoteForm.fields.location} />
          <select id="field-service" name="service" defaultValue="">
            <option value="" disabled>{quoteForm.fields.service}</option>
            {quoteForm.serviceOptions.map((option) => <option key={option.id} value={option.label}>{option.label}</option>)}
          </select>
          <textarea id="field-message" name="message" placeholder={quoteForm.fields.message} />
          <button type="submit" className="form-submit" disabled={isSending}>
            {isSending ? quoteForm.sendingLabel : quoteForm.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
