'use client';

import { useState } from 'react';

export default function QuoteForm({ quoteForm, onSuccess }) {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSending(true);

    try {
      if (!window.emailjs) throw new Error('EmailJS is not available.');
      const formData = new FormData(form);
      await window.emailjs.send('service_6lrjbde', 'template_4yxabjd', {
        from_name: formData.get('name') || '',
        phone: formData.get('phone') || '',
        reply_to: formData.get('email') || '',
        location: formData.get('location') || '',
        message: formData.get('message') || '',
      });
      form.reset();
      onSuccess();
    } catch (error) {
      window.alert(quoteForm.errorMessage);
      console.error('EmailJS error:', error);
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
          <div className="form-row">
            <input type="text" id="field-name" name="name" placeholder={quoteForm.fields.name} required />
            <input type="tel" id="field-phone" name="phone" placeholder={quoteForm.fields.phone} required />
          </div>
          <input type="email" id="field-email" name="email" placeholder={quoteForm.fields.email} />
          <input type="text" id="field-location" name="location" placeholder={quoteForm.fields.location} />
          <select id="field-service" name="service" defaultValue="">
            <option value="" disabled>{quoteForm.fields.service}</option>
            {quoteForm.serviceOptions.map((option) => <option key={option}>{option}</option>)}
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
