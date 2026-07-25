'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './admin.module.css';

const companyFields = [
  ['logoIcon', 'Logo Icon'],
  ['logoPrimary', 'Logo First Word'],
  ['logoSecondary', 'Logo Second Word'],
  ['licenseBadge', 'License Badge'],
  ['phoneDisplay', 'Phone Display'],
  ['phoneLink', 'Phone Link'],
  ['email', 'Email'],
  ['serviceAreaShort', 'Service Area'],
];

export default function AdminContentEditor() {
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState(null);
  const [hero, setHero] = useState(null);
  const [savedCompany, setSavedCompany] = useState('');
  const [savedHero, setSavedHero] = useState('');
  const [heroFile, setHeroFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [working, setWorking] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const companyChanged = useMemo(
    () => company && JSON.stringify(company) !== savedCompany,
    [company, savedCompany]
  );

  const heroChanged = useMemo(
    () => hero && (JSON.stringify(hero) !== savedHero || heroFile),
    [hero, savedHero, heroFile]
  );

  async function openAdmin(event) {
    event.preventDefault();
    setWorking('login');
    setMessage('');

    const response = await fetch('/api/settings', {
      headers: { 'x-admin-password': password },
    });

    if (!response.ok) {
      setMessage('Incorrect password.');
      setWorking('');
      return;
    }

    const data = await response.json();
    setCompany(data.company);
    setHero(data.hero);
    setSavedCompany(JSON.stringify(data.company));
    setSavedHero(JSON.stringify(data.hero));
    setWorking('');
  }

  function updateCompany(key, value) {
    setCompany((current) => ({ ...current, [key]: value }));
    setMessage('');
  }

  function updateHero(key, value) {
    setHero((current) => ({ ...current, [key]: value }));
    setMessage('');
  }

  function updateHeroNested(group, key, value) {
    setHero((current) => ({
      ...current,
      [group]: { ...current[group], [key]: value },
    }));
    setMessage('');
  }

  function updateTitleLine(index, value) {
    setHero((current) => ({
      ...current,
      titleLines: current.titleLines.map((line, lineIndex) =>
        lineIndex === index ? { ...line, text: value } : line
      ),
    }));
    setMessage('');
  }

  function chooseHeroImage(event) {
    const file = event.target.files?.[0] ?? null;
    setHeroFile(file);
    setMessage('');

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : '');
  }

  async function saveSection(section, data) {
    const response = await fetch('/api/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ section, data }),
    });

    return response.ok;
  }

  async function saveCompany(event) {
    event.preventDefault();
    setWorking('company');
    setMessage('');

    const saved = await saveSection('company', company);
    if (saved) {
      setSavedCompany(JSON.stringify(company));
      setMessage('Company information saved.');
    } else {
      setMessage('Unable to save company information.');
    }

    setWorking('');
  }

  async function saveHero(event) {
    event.preventDefault();
    setWorking('hero');
    setMessage('');

    let nextHero = hero;

    if (heroFile) {
      const formData = new FormData();
      formData.append('file', heroFile);

      const uploadResponse = await fetch('/api/blob/hero', {
        method: 'POST',
        headers: { 'x-admin-password': password },
        body: formData,
      });

      if (!uploadResponse.ok) {
        const result = await uploadResponse.json();
        setMessage(result.error ?? 'Unable to upload the image.');
        setWorking('');
        return;
      }

      const { url } = await uploadResponse.json();
      nextHero = {
        ...hero,
        image: { ...hero.image, url },
      };
    }

    const saved = await saveSection('hero', nextHero);
    if (saved) {
      setHero(nextHero);
      setSavedHero(JSON.stringify(nextHero));
      setHeroFile(null);
      setPreviewUrl('');
      setMessage('Hero section saved.');
    } else {
      setMessage('Unable to save the Hero section.');
    }

    setWorking('');
  }

  if (!company || !hero) {
    return (
      <form className={styles.card} onSubmit={openAdmin}>
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
        <button type="submit" disabled={working === 'login'}>
          {working === 'login' ? 'Opening...' : 'Open Admin'}
        </button>
        {message && <p className={styles.error}>{message}</p>}
      </form>
    );
  }

  return (
    <>
      <nav className={styles.sectionNav}>
        <a href="#company">Company</a>
        <a href="#hero">Hero</a>
      </nav>

      {message && <p className={styles.notice}>{message}</p>}

      <form id="company" className={styles.card} onSubmit={saveCompany}>
        <h2>Company</h2>
        <div className={styles.grid}>
          {companyFields.map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                type={key === 'email' ? 'email' : 'text'}
                value={company[key] ?? ''}
                onChange={(event) => updateCompany(key, event.target.value)}
              />
            </label>
          ))}
        </div>
        <button type="submit" disabled={!companyChanged || working === 'company'}>
          {working === 'company' ? 'Saving...' : 'Save Company'}
        </button>
      </form>

      <form id="hero" className={styles.card} onSubmit={saveHero}>
        <h2>Hero</h2>
        <div className={styles.grid}>
          <label>
            Tag
            <input value={hero.tag ?? ''} onChange={(event) => updateHero('tag', event.target.value)} />
          </label>

          {hero.titleLines.map((line, index) => (
            <label key={line.id}>
              Title Line {index + 1}
              <input value={line.text ?? ''} onChange={(event) => updateTitleLine(index, event.target.value)} />
            </label>
          ))}

          <label>
            Emphasized Title
            <input value={hero.emphasizedTitle ?? ''} onChange={(event) => updateHero('emphasizedTitle', event.target.value)} />
          </label>

          <label className={styles.fullWidth}>
            Description
            <textarea value={hero.description ?? ''} onChange={(event) => updateHero('description', event.target.value)} />
          </label>

          <label>
            Primary Button Text
            <input value={hero.primaryButton?.label ?? ''} onChange={(event) => updateHeroNested('primaryButton', 'label', event.target.value)} />
          </label>

          <label>
            Secondary Button Text
            <input value={hero.secondaryButton?.label ?? ''} onChange={(event) => updateHeroNested('secondaryButton', 'label', event.target.value)} />
          </label>

          <label className={styles.fullWidth}>
            Image Description
            <input value={hero.image?.alt ?? ''} onChange={(event) => updateHeroNested('image', 'alt', event.target.value)} />
          </label>
        </div>

        <div className={styles.imageEditor}>
          <div>
            <h3>Current Hero Image</h3>
            <img src={hero.image.url} alt={hero.image.alt || 'Current Hero'} />
          </div>

          <div>
            <h3>{previewUrl ? 'Selected New Image' : 'Replace Hero Image'}</h3>
            {previewUrl && <img src={previewUrl} alt="Selected Hero preview" />}
            <input
              className={styles.fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={chooseHeroImage}
            />
            <p className={styles.help}>JPG, PNG or WEBP. Maximum 4 MB.</p>
          </div>
        </div>

        <button type="submit" disabled={!heroChanged || working === 'hero'}>
          {working === 'hero' ? 'Saving...' : 'Save Hero'}
        </button>
      </form>
    </>
  );
}
