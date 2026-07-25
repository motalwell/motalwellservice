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
  const [servicesSection, setServicesSection] = useState(null);
  const [services, setServices] = useState(null);
  const [savedCompany, setSavedCompany] = useState('');
  const [savedHero, setSavedHero] = useState('');
  const [savedAbout, setSavedAbout] = useState('');
  const [savedServicesSection, setSavedServicesSection] = useState('');
  const [savedServices, setSavedServices] = useState('');
  const [heroFile, setHeroFile] = useState(null);
  const [aboutFile, setAboutFile] = useState(null);
  const [serviceFiles, setServiceFiles] = useState({});
  const [heroPreview, setHeroPreview] = useState('');
  const [aboutPreview, setAboutPreview] = useState('');
  const [servicePreviews, setServicePreviews] = useState({});
  const [heroInputKey, setHeroInputKey] = useState(0);
  const [aboutInputKey, setAboutInputKey] = useState(0);
  const [serviceInputKey, setServiceInputKey] = useState(0);
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
  const servicesChanged = useMemo(
    () =>
      JSON.stringify(servicesSection) !== savedServicesSection ||
      JSON.stringify(services) !== savedServices ||
      Object.keys(serviceFiles).length > 0,
    [servicesSection, services, savedServicesSection, savedServices, serviceFiles]
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
    setServicesSection(data.servicesSection);
    setServices(data.services);
    setSavedCompany(JSON.stringify(data.company));
    setSavedHero(JSON.stringify(data.hero));
    setSavedAbout(JSON.stringify(data.about));
    setSavedServicesSection(JSON.stringify(data.servicesSection));
    setSavedServices(JSON.stringify(data.services));
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

  function chooseServiceImage(event, serviceId) {
    const file = event.target.files?.[0] ?? null;
    setMessage('');

    if (servicePreviews[serviceId]) {
      URL.revokeObjectURL(servicePreviews[serviceId]);
    }

    if (file && file.size > MAX_IMAGE_SIZE) {
      event.target.value = '';
      setMessage('Image must be 4 MB or smaller.');
      return;
    }

    setServiceFiles((current) => {
      const next = { ...current };
      if (file) next[serviceId] = file;
      else delete next[serviceId];
      return next;
    });

    setServicePreviews((current) => {
      const next = { ...current };
      if (file) next[serviceId] = URL.createObjectURL(file);
      else delete next[serviceId];
      return next;
    });
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


  async function saveServices(event) {
    event.preventDefault();
    setWorking('services');
    setMessage('');

    try {
      let nextServices = services;
      const oldUrls = [];

      for (const [serviceId, file] of Object.entries(serviceFiles)) {
        const index = nextServices.findIndex((service) => String(service.id) === serviceId);
        if (index === -1) continue;

        const { url } = await uploadImage(`services-${serviceId}`, file);
        oldUrls.push(nextServices[index].image?.url);
        nextServices = nextServices.map((service, serviceIndex) =>
          serviceIndex === index
            ? { ...service, image: { ...service.image, url } }
            : service
        );
      }

      const sectionSaved = await saveSection('servicesSection', servicesSection);
      const servicesSaved = await saveSection('services', nextServices);
      if (!sectionSaved || !servicesSaved) throw new Error('Unable to save Services.');

      setServices(nextServices);
      setSavedServicesSection(JSON.stringify(servicesSection));
      setSavedServices(JSON.stringify(nextServices));
      setServiceFiles({});
      setServicePreviews({});
      setServiceInputKey((current) => current + 1);
      setMessage('Services saved.');

      for (const url of oldUrls) {
        await deleteOldImage(url);
      }
    } catch (error) {
      setMessage(error.message);
    }

    setWorking('');
  }

  if (!company || !hero || !about || !servicesSection || !services) {
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
        {['company', 'hero', 'about', 'services'].map((section) => (
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

      <form
        id="services"
        data-admin-section
        className={styles.card}
        onSubmit={saveServices}
      >
        <h2>Services</h2>

        <div className={styles.grid}>
          <label>
            Eyebrow
            <input
              value={servicesSection.eyebrow ?? ''}
              onChange={(event) => update(setServicesSection, 'eyebrow', event.target.value)}
            />
          </label>
          <label>
            Title
            <input
              value={servicesSection.title ?? ''}
              onChange={(event) => update(setServicesSection, 'title', event.target.value)}
            />
          </label>
          <label>
            Accent Title
            <input
              value={servicesSection.titleAccent ?? ''}
              onChange={(event) => update(setServicesSection, 'titleAccent', event.target.value)}
            />
          </label>
          <label>
            Link Text
            <input
              value={servicesSection.linkLabel ?? ''}
              onChange={(event) => update(setServicesSection, 'linkLabel', event.target.value)}
            />
          </label>
          <label className={styles.fullWidth}>
            Introduction
            <textarea
              value={servicesSection.intro ?? ''}
              onChange={(event) => update(setServicesSection, 'intro', event.target.value)}
            />
          </label>
        </div>

        {services.map((service, serviceIndex) => (
          <div className={styles.itemEditor} key={service.id}>
            <h3>Service {serviceIndex + 1}</h3>
            <div className={styles.grid}>
              <label>
                Title
                <input
                  value={service.title ?? ''}
                  onChange={(event) =>
                    setServices((current) =>
                      current.map((item, index) =>
                        index === serviceIndex ? { ...item, title: event.target.value } : item
                      )
                    )
                  }
                />
              </label>
              <label>
                Image Description
                <input
                  value={service.image?.alt ?? ''}
                  onChange={(event) =>
                    setServices((current) =>
                      current.map((item, index) =>
                        index === serviceIndex
                          ? { ...item, image: { ...item.image, alt: event.target.value } }
                          : item
                      )
                    )
                  }
                />
              </label>
              <label className={styles.fullWidth}>
                Description
                <textarea
                  value={service.description ?? ''}
                  onChange={(event) =>
                    setServices((current) =>
                      current.map((item, index) =>
                        index === serviceIndex ? { ...item, description: event.target.value } : item
                      )
                    )
                  }
                />
              </label>

              {service.features.map((feature, featureIndex) => (
                <label key={feature.id}>
                  Feature {featureIndex + 1}
                  <input
                    value={feature.label ?? ''}
                    onChange={(event) =>
                      setServices((current) =>
                        current.map((item, index) =>
                          index === serviceIndex
                            ? {
                                ...item,
                                features: item.features.map((entry, entryIndex) =>
                                  entryIndex === featureIndex
                                    ? { ...entry, label: event.target.value }
                                    : entry
                                ),
                              }
                            : item
                        )
                      )
                    }
                  />
                </label>
              ))}
            </div>

            <ImageEditor
              title={`Service ${serviceIndex + 1}`}
              image={service.image}
              preview={servicePreviews[service.id] ?? ''}
              inputKey={`${serviceInputKey}-${service.id}`}
              onChange={(event) => chooseServiceImage(event, service.id)}
            />
          </div>
        ))}

        <button type="submit" disabled={!servicesChanged || working === 'services'}>
          {working === 'services' ? 'Saving...' : 'Save Services'}
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
