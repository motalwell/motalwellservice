'use client';

import { useState } from 'react';

function formatPhoneNumber(value) {
  let digits = String(value ?? '').replace(/\D/g, '');

  // Accept a pasted US number with a leading country code.
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (digits.length < 4) {
    return digits ? `(${digits}` : '';
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

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
            <input
              type="tel"
              id="field-phone"
              name="phone"
              placeholder={quoteForm.fields.phone}
              inputMode="numeric"
              autoComplete="tel"
              maxLength={14}
              pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
              title="Enter a 10-digit phone number."
              onInput={(event) => {
                event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
              }}
              required
            />
          </div>
          <input
            type="email"
            id="field-email"
            name="email"
            placeholder={`${quoteForm.fields.email} (Optional)`}
            autoComplete="email"
          />
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
