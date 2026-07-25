'use client';

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import styles from './admin.module.css';

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

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

function changed(current, saved, file) {
  return current && (JSON.stringify(current) !== saved || file);
}

export default function AdminContentEditor() {
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState(null);
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [savedCompany, setSavedCompany] = useState('');
  const [savedHero, setSavedHero] = useState('');
  const [savedAbout, setSavedAbout] = useState('');
  const [heroFile, setHeroFile] = useState(null);
  const [aboutFile, setAboutFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState('');
  const [aboutPreview, setAboutPreview] = useState('');
  const [heroInputKey, setHeroInputKey] = useState(0);
  const [aboutInputKey, setAboutInputKey] = useState(0);
  const [activeSection, setActiveSection] = useState('company');
  const [message, setMessage] = useState('');
  const [working, setWorking] = useState('');

  useEffect(() => () => {
    if (heroPreview) URL.revokeObjectURL(heroPreview);
    if (aboutPreview) URL.revokeObjectURL(aboutPreview);
  }, [heroPreview, aboutPreview]);

  useEffect(() => {
    if (!company) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );

    document.querySelectorAll('[data-admin-section]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [company]);

  const companyChanged = useMemo(
    () => changed(company, savedCompany),
    [company, savedCompany]
  );
  const heroChanged = useMemo(
    () => changed(hero, savedHero, heroFile),
    [hero, savedHero, heroFile]
  );
  const aboutChanged = useMemo(
    () => changed(about, savedAbout, aboutFile),
    [about, savedAbout, aboutFile]
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
    setAbout(data.about);
    setSavedCompany(JSON.stringify(data.company));
    setSavedHero(JSON.stringify(data.hero));
    setSavedAbout(JSON.stringify(data.about));
    setWorking('');
  }

  function update(setter, key, value) {
    setter((current) => ({ ...current, [key]: value }));
    setMessage('');
  }

  function updateNested(setter, group, key, value) {
    setter((current) => ({
      ...current,
      [group]: { ...current[group], [key]: value },
    }));
    setMessage('');
  }

  function updateArray(setter, group, index, key, value) {
    setter((current) => ({
      ...current,
      [group]: current[group].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      ),
    }));
    setMessage('');
  }

  function chooseImage(event, setFile, preview, setPreview) {
    const file = event.target.files?.[0] ?? null;
    setMessage('');
    if (preview) URL.revokeObjectURL(preview);

    if (file && file.size > MAX_IMAGE_SIZE) {
      event.target.value = '';
      setFile(null);
      setPreview('');
      setMessage('Image must be 4 MB or smaller.');
      return;
    }

    setFile(file);
    setPreview(file ? URL.createObjectURL(file) : '');
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

  async function uploadImage(section, file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('section', section);

    const response = await fetch('/api/blob', {
      method: 'POST',
      headers: { 'x-admin-password': password },
      body: formData,
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      throw new Error(result?.error ?? 'Unable to upload the image.');
    }

    return response.json();
  }

  async function deleteOldImage(url) {
    if (!url?.includes('.public.blob.vercel-storage.com')) return;

    await fetch('/api/blob', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ url }),
    });
  }

  async function saveCompany(event) {
    event.preventDefault();
    setWorking('company');
    setMessage('');

    const saved = await saveSection('company', company);
    if (saved) {
      setSavedCompany(JSON.stringify(company));
      setMessage('Company saved.');
    } else {
      setMessage('Unable to save Company.');
    }
    setWorking('');
  }

  async function saveImageSection(section, data, file, setter, setSaved, clearFile, clearPreview, resetInput) {
    setWorking(section);
    setMessage('');

    try {
      let nextData = data;
      const oldUrl = data.image?.url;

      if (file) {
        const { url } = await uploadImage(section, file);
        nextData = { ...data, image: { ...data.image, url } };
      }

      const saved = await saveSection(section, nextData);
      if (!saved) throw new Error(`Unable to save ${section}.`);

      setter(nextData);
      setSaved(JSON.stringify(nextData));
      clearFile(null);
      clearPreview('');
      resetInput((current) => current + 1);
      setMessage(`${section === 'hero' ? 'Hero' : 'About'} saved.`);

      if (file && oldUrl !== nextData.image.url) {
        await deleteOldImage(oldUrl);
      }
    } catch (error) {
      setMessage(error.message);
    }

    setWorking('');
  }

  if (!company || !hero || !about) {
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
        {['company', 'hero', 'about'].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={activeSection === section ? styles.activeNav : ''}
          >
            {section[0].toUpperCase() + section.slice(1)}
          </a>
        ))}
      </nav>

      {message && <p className={styles.notice}>{message}</p>}

      <form id="company" data-admin-section className={styles.card} onSubmit={saveCompany}>
        <h2>Company</h2>
        <div className={styles.grid}>
          {companyFields.map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                type={key === 'email' ? 'email' : 'text'}
                value={company[key] ?? ''}
                onChange={(event) => update(setCompany, key, event.target.value)}
              />
            </label>
          ))}
        </div>
        <button type="submit" disabled={!companyChanged || working === 'company'}>
          {working === 'company' ? 'Saving...' : 'Save Company'}
        </button>
      </form>

      <form
        id="hero"
        data-admin-section
        className={styles.card}
        onSubmit={(event) => {
          event.preventDefault();
          saveImageSection('hero', hero, heroFile, setHero, setSavedHero, setHeroFile, setHeroPreview, setHeroInputKey);
        }}
      >
        <h2>Hero</h2>
        <div className={styles.grid}>
          <label>
            Tag
            <input value={hero.tag ?? ''} onChange={(event) => update(setHero, 'tag', event.target.value)} />
          </label>

          {hero.titleLines.map((line, index) => (
            <label key={line.id}>
              Title Line {index + 1}
              <input value={line.text ?? ''} onChange={(event) => updateArray(setHero, 'titleLines', index, 'text', event.target.value)} />
            </label>
          ))}

          <label>
            Emphasized Title
            <input value={hero.emphasizedTitle ?? ''} onChange={(event) => update(setHero, 'emphasizedTitle', event.target.value)} />
          </label>

          <label className={styles.fullWidth}>
            Description
            <textarea value={hero.description ?? ''} onChange={(event) => update(setHero, 'description', event.target.value)} />
          </label>

          <label>
            Primary Button Text
            <input value={hero.primaryButton?.label ?? ''} onChange={(event) => updateNested(setHero, 'primaryButton', 'label', event.target.value)} />
          </label>

          <label>
            Secondary Button Text
            <input value={hero.secondaryButton?.label ?? ''} onChange={(event) => updateNested(setHero, 'secondaryButton', 'label', event.target.value)} />
          </label>

          <label className={styles.fullWidth}>
            Image Description
            <input value={hero.image?.alt ?? ''} onChange={(event) => updateNested(setHero, 'image', 'alt', event.target.value)} />
          </label>
        </div>

        <ImageEditor
          title="Hero"
          image={hero.image}
          preview={heroPreview}
          inputKey={heroInputKey}
          onChange={(event) => chooseImage(event, setHeroFile, heroPreview, setHeroPreview)}
        />

        <button type="submit" disabled={!heroChanged || working === 'hero'}>
          {working === 'hero' ? 'Saving...' : 'Save Hero'}
        </button>
      </form>

      <form
        id="about"
        data-admin-section
        className={styles.card}
        onSubmit={(event) => {
          event.preventDefault();
          saveImageSection('about', about, aboutFile, setAbout, setSavedAbout, setAboutFile, setAboutPreview, setAboutInputKey);
        }}
      >
        <h2>About</h2>
        <div className={styles.grid}>
          <label>
            Eyebrow
            <input value={about.eyebrow ?? ''} onChange={(event) => update(setAbout, 'eyebrow', event.target.value)} />
          </label>
          <label>
            Title
            <input value={about.title ?? ''} onChange={(event) => update(setAbout, 'title', event.target.value)} />
          </label>
          <label>
            Accent Title
            <input value={about.titleAccent ?? ''} onChange={(event) => update(setAbout, 'titleAccent', event.target.value)} />
          </label>
          <label>
            Years
            <input value={about.years ?? ''} onChange={(event) => update(setAbout, 'years', event.target.value)} />
          </label>
          <label>
            Years Label
            <input value={about.yearsLabel ?? ''} onChange={(event) => update(setAbout, 'yearsLabel', event.target.value)} />
          </label>
          <label>
            Image Description
            <input value={about.image?.alt ?? ''} onChange={(event) => updateNested(setAbout, 'image', 'alt', event.target.value)} />
          </label>

          {about.paragraphs.map((paragraph, index) => (
            <div className={styles.fullWidth} key={paragraph.id}>
              <h3>Paragraph {index + 1}</h3>
              <div className={styles.grid}>
                <label>
                  Bold Beginning
                  <input value={paragraph.lead ?? ''} onChange={(event) => updateArray(setAbout, 'paragraphs', index, 'lead', event.target.value)} />
                </label>
                <label>
                  Paragraph Text
                  <textarea value={paragraph.text ?? ''} onChange={(event) => updateArray(setAbout, 'paragraphs', index, 'text', event.target.value)} />
                </label>
              </div>
            </div>
          ))}

          {about.badges.map((badge, index) => (
            <label key={badge.id}>
              Badge {index + 1}
              <input value={badge.label ?? ''} onChange={(event) => updateArray(setAbout, 'badges', index, 'label', event.target.value)} />
            </label>
          ))}
        </div>

        <ImageEditor
          title="About"
          image={about.image}
          preview={aboutPreview}
          inputKey={aboutInputKey}
          onChange={(event) => chooseImage(event, setAboutFile, aboutPreview, setAboutPreview)}
        />

        <button type="submit" disabled={!aboutChanged || working === 'about'}>
          {working === 'about' ? 'Saving...' : 'Save About'}
        </button>
      </form>
    </>
  );
}

function ImageEditor({ title, image, preview, inputKey, onChange }) {
  return (
    <div className={styles.imageEditor}>
      <div>
        <h3>Current {title} Image</h3>
        <img src={image.url} alt={image.alt || `Current ${title}`} />
      </div>
      <div>
        <h3>{preview ? 'Selected New Image' : `Replace ${title} Image`}</h3>
        {preview && <img src={preview} alt={`Selected ${title} preview`} />}
        <input
          key={inputKey}
          className={styles.fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onChange}
        />
        <p className={styles.help}>JPG, PNG or WEBP. Maximum 4 MB.</p>
      </div>
    </div>
  );
}
