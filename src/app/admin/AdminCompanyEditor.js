'use client';

import { useState } from 'react';
import styles from './admin.module.css';

const fields = [
  ['logoIcon', 'Logo Icon'],
  ['logoPrimary', 'Logo First Word'],
  ['logoSecondary', 'Logo Second Word'],
  ['licenseBadge', 'License Badge'],
  ['phoneDisplay', 'Phone Display'],
  ['phoneLink', 'Phone Link'],
  ['email', 'Email'],
  ['serviceAreaShort', 'Service Area'],
];

export default function AdminCompanyEditor() {
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState(null);
  const [message, setMessage] = useState('');
  const [working, setWorking] = useState(false);

  async function loadCompany(event) {
    event.preventDefault();
    setWorking(true);
    setMessage('');

    const response = await fetch('/api/settings', {
      headers: { 'x-admin-password': password },
    });

    if (!response.ok) {
      setMessage('Incorrect password.');
      setWorking(false);
      return;
    }

    const data = await response.json();
    setCompany(data.company);
    setWorking(false);
  }

  function updateField(key, value) {
    setCompany((current) => ({ ...current, [key]: value }));
  }

  async function saveCompany(event) {
    event.preventDefault();
    setWorking(true);
    setMessage('');

    const response = await fetch('/api/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ company }),
    });

    setMessage(response.ok ? 'Company information saved.' : 'Unable to save.');
    setWorking(false);
  }

  if (!company) {
    return (
      <form className={styles.card} onSubmit={loadCompany}>
        <h2>Admin Password</h2>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
        </label>
        <button type="submit" disabled={working}>
          {working ? 'Opening...' : 'Open Admin'}
        </button>
        {message && <p className={styles.error}>{message}</p>}
      </form>
    );
  }

  return (
    <form className={styles.card} onSubmit={saveCompany}>
      <h2>Company</h2>
      <div className={styles.grid}>
        {fields.map(([key, label]) => (
          <label key={key}>
            {label}
            <input
              type={key === 'email' ? 'email' : 'text'}
              value={company[key] ?? ''}
              onChange={(event) => updateField(key, event.target.value)}
            />
          </label>
        ))}
      </div>
      <div className={styles.actions}>
        <button type="submit" disabled={working}>
          {working ? 'Saving...' : 'Save'}
        </button>
        {message && <p className={styles.success}>{message}</p>}
      </div>
    </form>
  );
}
