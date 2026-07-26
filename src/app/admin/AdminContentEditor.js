'use client';

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { upload } from '@vercel/blob/client';
import styles from './admin.module.css';

const MAX_IMAGE_SIZE = 6 * 1024 * 1024;
const SERVER_UPLOAD_LIMIT = 4 * 1024 * 1024;
// Toggle between direct browser-to-Blob uploads and the preserved server upload fallback.
const USE_DIRECT_BLOB_UPLOAD = true;

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
  const [navigation, setNavigation] = useState(null);
  const [hero, setHero] = useState(null);
  const [stats, setStats] = useState(null);
  const [about, setAbout] = useState(null);
  const [photoCallout, setPhotoCallout] = useState(null);
  const [servicesSection, setServicesSection] = useState(null);
  const [services, setServices] = useState(null);
  const [process, setProcess] = useState(null);
  const [faq, setFaq] = useState(null);
  const [contact, setContact] = useState(null);
  const [quoteForm, setQuoteForm] = useState(null);
  const [successModal, setSuccessModal] = useState(null);
  const [footer, setFooter] = useState(null);
  const [savedCompany, setSavedCompany] = useState('');
  const [savedNavigation, setSavedNavigation] = useState('');
  const [savedHero, setSavedHero] = useState('');
  const [savedStats, setSavedStats] = useState('');
  const [savedAbout, setSavedAbout] = useState('');
  const [savedPhotoCallout, setSavedPhotoCallout] = useState('');
  const [savedServicesSection, setSavedServicesSection] = useState('');
  const [savedServices, setSavedServices] = useState('');
  const [savedProcess, setSavedProcess] = useState('');
  const [savedFaq, setSavedFaq] = useState('');
  const [savedContact, setSavedContact] = useState('');
  const [savedQuoteForm, setSavedQuoteForm] = useState('');
  const [savedSuccessModal, setSavedSuccessModal] = useState('');
  const [savedFooter, setSavedFooter] = useState('');
  const [heroFile, setHeroFile] = useState(null);
  const [aboutFile, setAboutFile] = useState(null);
  const [photoCalloutFile, setPhotoCalloutFile] = useState(null);
  const [serviceFiles, setServiceFiles] = useState({});
  const [heroPreview, setHeroPreview] = useState('');
  const [aboutPreview, setAboutPreview] = useState('');
  const [photoCalloutPreview, setPhotoCalloutPreview] = useState('');
  const [servicePreviews, setServicePreviews] = useState({});
  const [heroInputKey, setHeroInputKey] = useState(0);
  const [aboutInputKey, setAboutInputKey] = useState(0);
  const [photoCalloutInputKey, setPhotoCalloutInputKey] = useState(0);
  const [serviceInputKey, setServiceInputKey] = useState(0);
  const [activeSection, setActiveSection] = useState('company');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState('');
  const [working, setWorking] = useState('');

  useEffect(() => () => {
    if (heroPreview) URL.revokeObjectURL(heroPreview);
    if (aboutPreview) URL.revokeObjectURL(aboutPreview);
    if (photoCalloutPreview) URL.revokeObjectURL(photoCalloutPreview);
  }, [heroPreview, aboutPreview, photoCalloutPreview]);

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

  useEffect(() => {
    const activeLink = document.querySelector(`.${styles.activeNav}`);
    activeLink?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeSection]);

  const companyChanged = useMemo(
    () => JSON.stringify(company) !== savedCompany || JSON.stringify(navigation) !== savedNavigation,
    [company, navigation, savedCompany, savedNavigation]
  );
  const heroChanged = useMemo(
    () => changed(hero, savedHero, heroFile),
    [hero, savedHero, heroFile]
  );
  const aboutChanged = useMemo(
    () => changed(about, savedAbout, aboutFile),
    [about, savedAbout, aboutFile]
  );
  const statsChanged = useMemo(
    () => JSON.stringify(stats) !== savedStats,
    [stats, savedStats]
  );
  const photoCalloutChanged = useMemo(
    () => changed(photoCallout, savedPhotoCallout, photoCalloutFile),
    [photoCallout, savedPhotoCallout, photoCalloutFile]
  );
  const servicesChanged = useMemo(
    () =>
      JSON.stringify(servicesSection) !== savedServicesSection ||
      JSON.stringify(services) !== savedServices ||
      Object.keys(serviceFiles).length > 0,
    [servicesSection, services, savedServicesSection, savedServices, serviceFiles]
  );
  const processChanged = useMemo(
    () => changed(process, savedProcess),
    [process, savedProcess]
  );
  const faqChanged = useMemo(
    () => changed(faq, savedFaq),
    [faq, savedFaq]
  );
  const footerChanged = useMemo(
    () => changed(footer, savedFooter),
    [footer, savedFooter]
  );
  const contactChanged = useMemo(
    () =>
      JSON.stringify(contact) !== savedContact ||
      JSON.stringify(quoteForm) !== savedQuoteForm ||
      JSON.stringify(successModal) !== savedSuccessModal,
    [contact, quoteForm, successModal, savedContact, savedQuoteForm, savedSuccessModal]
  );

  async function openAdmin(event) {
    event.preventDefault();
    setWorking('login');
    setMessage('');

    let data;
    try {
      const response = await fetch('/api/settings', {
        headers: { 'x-admin-password': password },
      });

      if (!response.ok) {
        setMessage(response.status === 401 ? 'Incorrect password.' : 'Unable to open Admin.');
        return;
      }

      data = await response.json();
    } catch {
      setMessage('Unable to open Admin.');
      return;
    } finally {
      setWorking('');
    }
    setCompany(data.company);
    setNavigation(data.navigation);
    setHero(data.hero);
    setStats(data.stats);
    setAbout(data.about);
    setPhotoCallout(data.photoCallout);
    setServicesSection(data.servicesSection);
    setServices(data.services);
    setProcess(data.process);
    setFaq(data.faq);
    setContact(data.contact);
    setQuoteForm(data.quoteForm);
    setSuccessModal(data.successModal);
    setFooter(data.footer);
    setSavedCompany(JSON.stringify(data.company));
    setSavedNavigation(JSON.stringify(data.navigation));
    setSavedHero(JSON.stringify(data.hero));
    setSavedStats(JSON.stringify(data.stats));
    setSavedAbout(JSON.stringify(data.about));
    setSavedPhotoCallout(JSON.stringify(data.photoCallout));
    setSavedServicesSection(JSON.stringify(data.servicesSection));
    setSavedServices(JSON.stringify(data.services));
    setSavedProcess(JSON.stringify(data.process));
    setSavedFaq(JSON.stringify(data.faq));
    setSavedContact(JSON.stringify(data.contact));
    setSavedQuoteForm(JSON.stringify(data.quoteForm));
    setSavedSuccessModal(JSON.stringify(data.successModal));
    setSavedFooter(JSON.stringify(data.footer));
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

  function updateItem(setter, index, key, value) {
    setter((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
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
      setMessage('Image must be 6 MB or smaller.');
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
      setServiceFiles((current) => {
        const next = { ...current };
        delete next[serviceId];
        return next;
      });
      setServicePreviews((current) => {
        const next = { ...current };
        delete next[serviceId];
        return next;
      });
      setMessage('Image must be 6 MB or smaller.');
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

  function removeServiceImageSelection(serviceId) {
    if (servicePreviews[serviceId]) {
      URL.revokeObjectURL(servicePreviews[serviceId]);
    }

    setServiceFiles((current) => {
      const next = { ...current };
      delete next[serviceId];
      return next;
    });
    setServicePreviews((current) => {
      const next = { ...current };
      delete next[serviceId];
      return next;
    });
    setServiceInputKey((current) => current + 1);
    setMessage('');
  }

  async function fetchWithTimeout(url, options, timeoutMs = 90000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }

  async function saveSections(updates) {
    const response = await fetchWithTimeout('/api/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ updates }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      throw new Error(result?.error ?? 'Unable to save changes.');
    }
  }

  async function saveSection(section, data) {
    await saveSections({ [section]: data });
  }

  async function uploadImage(section, file) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const pathname = `${section || 'images'}/${safeName}`;

    try {
      if (USE_DIRECT_BLOB_UPLOAD) {
        // Default path: upload every image directly from the browser to Vercel Blob.
        return await Promise.race([
          upload(pathname, file, {
            access: 'public',
            handleUploadUrl: '/api/blob',
            clientPayload: JSON.stringify({ password }),
            multipart: true,
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('The image upload timed out. Please try again.')), 90000)
          ),
        ]);
      }

      // Preserved fallback: send the image through the Next.js/Vercel Function first.
      // Vercel Functions have a smaller request-body limit, so keep this path at 4 MB.
      if (file.size > SERVER_UPLOAD_LIMIT) {
        throw new Error('Server uploads are limited to 4 MB. Enable direct Blob uploads for larger images.');
      }

      const response = await fetchWithTimeout(`/api/blob?pathname=${encodeURIComponent(pathname)}`, {
        method: 'POST',
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
          'x-admin-password': password,
        },
        body: file,
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || 'Unable to upload the image.');
      }
      return result;
    } catch (error) {
      throw new Error(error?.message || 'Unable to upload the image.');
    }
  }

  async function deleteOldImage(url) {
    if (!url?.includes('.public.blob.vercel-storage.com')) return;

    try {
      await fetchWithTimeout('/api/blob', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ url }),
      });
    } catch (error) {
      console.error('Unable to delete the replaced Blob image:', error);
    }
  }

  async function saveCompany(event) {
    event.preventDefault();
    setWorking('company');
    setMessage('');

    try {
      await saveSections({ company, navigation });
      setSavedCompany(JSON.stringify(company));
      setSavedNavigation(JSON.stringify(navigation));
      setMessage('Company saved.');
    } catch {
      setMessage('Unable to save Company.');
    } finally {
      setWorking('');
    }
  }

  async function saveImageSection(section, data, file, setter, setSaved, clearFile, clearPreview, resetInput) {
    setWorking(section);
    setMessage('');
    setProgress(file ? 'Uploading image...' : 'Saving changes...');

    let uploadedUrl = '';

    try {
      let nextData = data;
      const oldUrl = data.image?.url;

      if (file) {
        const { url } = await uploadImage(section, file);
        uploadedUrl = url;
        nextData = { ...data, image: { ...data.image, url } };
        setProgress('Saving changes...');
      }

      await saveSection(section, nextData);

      setter(nextData);
      setSaved(JSON.stringify(nextData));
      clearFile(null);
      clearPreview('');
      resetInput((current) => current + 1);
      const label = section === 'hero' ? 'Hero' : section === 'about' ? 'About' : 'Photo Callout';
      setMessage(`${label} saved.`);
      setProgress('');
      setWorking('');

      // Cleanup is secondary. Do not make the successful save wait for it.
      if (file && oldUrl !== nextData.image.url) {
        void deleteOldImage(oldUrl);
      }
    } catch (error) {
      setProgress('');
      setWorking('');
      setMessage(error.name === 'AbortError' ? 'The request timed out. Please try again.' : error.message);

      // If the database save failed, remove the unused upload without delaying the error message.
      if (uploadedUrl) void deleteOldImage(uploadedUrl);
    }
  }


  async function saveTextSection(event, section, data, setSaved, label) {
    event.preventDefault();
    setWorking(section);
    setMessage('');

    try {
      await saveSection(section, data);
      setSaved(JSON.stringify(data));
      setMessage(`${label} saved.`);
    } catch {
      setMessage(`Unable to save ${label}.`);
    } finally {
      setWorking('');
    }
  }


  async function saveServices(event) {
    event.preventDefault();
    setWorking('services');
    setMessage('');
    setProgress(Object.keys(serviceFiles).length ? 'Uploading images...' : 'Saving changes...');

    const uploadedUrls = [];

    try {
      let nextServices = services;
      const oldUrls = [];

      for (const [serviceId, file] of Object.entries(serviceFiles)) {
        const index = nextServices.findIndex((service) => String(service.id) === serviceId);
        if (index === -1) continue;

        const { url } = await uploadImage(`services-${serviceId}`, file);
        uploadedUrls.push(url);
        oldUrls.push(nextServices[index].image?.url);
        nextServices = nextServices.map((service, serviceIndex) =>
          serviceIndex === index
            ? { ...service, image: { ...service.image, url } }
            : service
        );
      }

      setProgress('Saving changes...');
      await saveSections({ servicesSection, services: nextServices });

      setServices(nextServices);
      setSavedServicesSection(JSON.stringify(servicesSection));
      setSavedServices(JSON.stringify(nextServices));
      Object.values(servicePreviews).forEach((preview) => URL.revokeObjectURL(preview));
      setServiceFiles({});
      setServicePreviews({});
      setServiceInputKey((current) => current + 1);
      setMessage('Services saved.');
      setProgress('');
      setWorking('');

      // Cleanup is secondary and should never hold the Save button open.
      oldUrls.forEach((url) => void deleteOldImage(url));
    } catch (error) {
      setProgress('');
      setWorking('');
      setMessage(error.name === 'AbortError' ? 'The request timed out. Please try again.' : error.message);
      uploadedUrls.forEach((url) => void deleteOldImage(url));
    }
  }


  async function saveContact(event) {
    event.preventDefault();
    setWorking('contact');
    setMessage('');

    try {
      await saveSections({ contact, quoteForm, successModal });
      setSavedContact(JSON.stringify(contact));
      setSavedQuoteForm(JSON.stringify(quoteForm));
      setSavedSuccessModal(JSON.stringify(successModal));
      setMessage('Contact saved.');
    } catch {
      setMessage('Unable to save Contact.');
    } finally {
      setWorking('');
    }
  }

  if (!company || !navigation || !hero || !stats || !about || !photoCallout || !servicesSection || !services || !process || !faq || !contact || !quoteForm || !successModal || !footer) {
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
        {[
          ['company', 'Company'],
          ['hero', 'Hero'],
          ['stats', 'Stats'],
          ['services', 'Services'],
          ['about', 'About'],
          ['photo-callout', 'Photo Callout'],
          ['process', 'Process'],
          ['faq', 'FAQ'],
          ['contact', 'Contact'],
          ['footer', 'Footer'],
        ].map(([section, label]) => (
          <a
            key={section}
            href={`#${section}`}
            className={activeSection === section ? styles.activeNav : ''}
          >
            {label}
          </a>
        ))}
      </nav>

      {(progress || message) && (
        <p className={`${styles.status} ${message && /^(Unable|Incorrect|Image|Choose|The request|The image)/.test(message) ? styles.error : styles.notice}`}>
          {progress || message}
        </p>
      )}

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
          <div className={styles.fullWidth}>
            <div className={styles.itemEditor}>
              <h3>Header Navigation</h3>
              <div className={styles.grid}>
                {navigation.map((item, index) => (
                  <label key={item.id}>
                    Link {index + 1}
                    <input
                      value={item.label ?? ''}
                      onChange={(event) =>
                        setNavigation((current) =>
                          current.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, label: event.target.value } : entry
                          )
                        )
                      }
                    />
                  </label>
                ))}
              </div>
              <p className={styles.help}>Navigation destinations stay fixed so the links continue scrolling to the correct sections.</p>
            </div>
          </div>
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
          selectedFile={heroFile}
          inputKey={heroInputKey}
          onChange={(event) => chooseImage(event, setHeroFile, heroPreview, setHeroPreview)}
          onRemove={() => {
            if (heroPreview) URL.revokeObjectURL(heroPreview);
            setHeroFile(null);
            setHeroPreview('');
            setHeroInputKey((current) => current + 1);
            setMessage('');
          }}
        />

        <button type="submit" disabled={!heroChanged || working === 'hero'}>
          {working === 'hero' ? progress || 'Saving...' : 'Save Hero'}
        </button>
      </form>

      <form
        id="stats"
        data-admin-section
        className={styles.card}
        onSubmit={(event) => saveTextSection(event, 'stats', stats, setSavedStats, 'Stats')}
      >
        <h2>Stats</h2>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div className={styles.itemEditor} key={stat.id}>
              <h3>Stat {index + 1}</h3>
              <label>
                Number
                <input
                  type="number"
                  value={stat.target ?? ''}
                  onChange={(event) =>
                    setStats((current) =>
                      current.map((entry, entryIndex) =>
                        entryIndex === index ? { ...entry, target: Number(event.target.value) } : entry
                      )
                    )
                  }
                />
              </label>
              <label className={styles.optionField}>
                Label
                <input
                  value={stat.label ?? ''}
                  onChange={(event) =>
                    setStats((current) =>
                      current.map((entry, entryIndex) =>
                        entryIndex === index ? { ...entry, label: event.target.value } : entry
                      )
                    )
                  }
                />
              </label>
            </div>
          ))}
        </div>
        <button type="submit" disabled={!statsChanged || working === 'stats'}>
          {working === 'stats' ? 'Saving...' : 'Save Stats'}
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
              selectedFile={serviceFiles[service.id] ?? null}
              inputKey={`${serviceInputKey}-${service.id}`}
              onChange={(event) => chooseServiceImage(event, service.id)}
              onRemove={() => removeServiceImageSelection(String(service.id))}
            />
          </div>
        ))}

        <button type="submit" disabled={!servicesChanged || working === 'services'}>
          {working === 'services' ? progress || 'Saving...' : 'Save Services'}
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
          selectedFile={aboutFile}
          inputKey={aboutInputKey}
          onChange={(event) => chooseImage(event, setAboutFile, aboutPreview, setAboutPreview)}
          onRemove={() => {
            if (aboutPreview) URL.revokeObjectURL(aboutPreview);
            setAboutFile(null);
            setAboutPreview('');
            setAboutInputKey((current) => current + 1);
            setMessage('');
          }}
        />

        <button type="submit" disabled={!aboutChanged || working === 'about'}>
          {working === 'about' ? progress || 'Saving...' : 'Save About'}
        </button>
      </form>

      <form
        id="photo-callout"
        data-admin-section
        className={styles.card}
        onSubmit={(event) => {
          event.preventDefault();
          saveImageSection(
            'photoCallout',
            photoCallout,
            photoCalloutFile,
            setPhotoCallout,
            setSavedPhotoCallout,
            setPhotoCalloutFile,
            setPhotoCalloutPreview,
            setPhotoCalloutInputKey
          );
        }}
      >
        <h2>Photo Callout</h2>
        <div className={styles.grid}>
          <label>
            Title
            <input value={photoCallout.title ?? ''} onChange={(event) => update(setPhotoCallout, 'title', event.target.value)} />
          </label>
          <label>
            Accent Title
            <input value={photoCallout.titleAccent ?? ''} onChange={(event) => update(setPhotoCallout, 'titleAccent', event.target.value)} />
          </label>
          <label className={styles.fullWidth}>
            Description
            <textarea value={photoCallout.description ?? ''} onChange={(event) => update(setPhotoCallout, 'description', event.target.value)} />
          </label>
          <label>
            Button Text
            <input value={photoCallout.button?.label ?? ''} onChange={(event) => updateNested(setPhotoCallout, 'button', 'label', event.target.value)} />
          </label>
          <label>
            Image Description
            <input value={photoCallout.image?.alt ?? ''} onChange={(event) => updateNested(setPhotoCallout, 'image', 'alt', event.target.value)} />
          </label>
        </div>

        <ImageEditor
          title="Photo Callout"
          image={photoCallout.image}
          preview={photoCalloutPreview}
          selectedFile={photoCalloutFile}
          inputKey={photoCalloutInputKey}
          onChange={(event) => chooseImage(event, setPhotoCalloutFile, photoCalloutPreview, setPhotoCalloutPreview)}
          onRemove={() => {
            if (photoCalloutPreview) URL.revokeObjectURL(photoCalloutPreview);
            setPhotoCalloutFile(null);
            setPhotoCalloutPreview('');
            setPhotoCalloutInputKey((current) => current + 1);
            setMessage('');
          }}
        />

        <button type="submit" disabled={!photoCalloutChanged || working === 'photoCallout'}>
          {working === 'photoCallout' ? progress || 'Saving...' : 'Save Photo Callout'}
        </button>
      </form>

      <form
        id="process"
        data-admin-section
        className={styles.card}
        onSubmit={(event) => saveTextSection(event, 'process', process, setSavedProcess, 'Process')}
      >
        <h2>Process</h2>
        <div className={styles.grid}>
          <label>
            Eyebrow
            <input value={process.eyebrow ?? ''} onChange={(event) => update(setProcess, 'eyebrow', event.target.value)} />
          </label>
          <label>
            Title
            <input value={process.title ?? ''} onChange={(event) => update(setProcess, 'title', event.target.value)} />
          </label>
          <label>
            Accent Title
            <input value={process.titleAccent ?? ''} onChange={(event) => update(setProcess, 'titleAccent', event.target.value)} />
          </label>
          <label className={styles.fullWidth}>
            Introduction
            <textarea value={process.intro ?? ''} onChange={(event) => update(setProcess, 'intro', event.target.value)} />
          </label>
        </div>

        {process.steps.map((step, stepIndex) => (
          <div className={styles.itemEditor} key={step.id}>
            <h3>Step {stepIndex + 1}</h3>
            <div className={styles.grid}>
              <label>
                Number
                <input
                  value={step.number ?? ''}
                  onChange={(event) => updateArray(setProcess, 'steps', stepIndex, 'number', event.target.value)}
                />
              </label>
              <label>
                Title
                <input
                  value={step.title ?? ''}
                  onChange={(event) => updateArray(setProcess, 'steps', stepIndex, 'title', event.target.value)}
                />
              </label>
              <label className={styles.fullWidth}>
                Description
                <textarea
                  value={step.description ?? ''}
                  onChange={(event) => updateArray(setProcess, 'steps', stepIndex, 'description', event.target.value)}
                />
              </label>
            </div>
          </div>
        ))}

        <button type="submit" disabled={!processChanged || working === 'process'}>
          {working === 'process' ? 'Saving...' : 'Save Process'}
        </button>
      </form>

      <form
        id="faq"
        data-admin-section
        className={styles.card}
        onSubmit={(event) => saveTextSection(event, 'faq', faq, setSavedFaq, 'FAQ')}
      >
        <h2>FAQ</h2>
        <div className={styles.grid}>
          <label>
            Eyebrow
            <input value={faq.eyebrow ?? ''} onChange={(event) => update(setFaq, 'eyebrow', event.target.value)} />
          </label>
          <label>
            Title
            <input value={faq.title ?? ''} onChange={(event) => update(setFaq, 'title', event.target.value)} />
          </label>
          <label>
            Accent Title
            <input value={faq.titleAccent ?? ''} onChange={(event) => update(setFaq, 'titleAccent', event.target.value)} />
          </label>
          <label className={styles.fullWidth}>
            Introduction
            <textarea value={faq.intro ?? ''} onChange={(event) => update(setFaq, 'intro', event.target.value)} />
          </label>
        </div>

        {faq.items.map((item, itemIndex) => (
          <div className={styles.itemEditor} key={item.id}>
            <h3>Question {itemIndex + 1}</h3>
            <div className={styles.grid}>
              <label className={styles.fullWidth}>
                Question
                <input
                  value={item.question ?? ''}
                  onChange={(event) => updateArray(setFaq, 'items', itemIndex, 'question', event.target.value)}
                />
              </label>
              <label className={styles.fullWidth}>
                Answer
                <textarea
                  value={item.answer ?? ''}
                  onChange={(event) => updateArray(setFaq, 'items', itemIndex, 'answer', event.target.value)}
                />
              </label>
            </div>
          </div>
        ))}

        <button type="submit" disabled={!faqChanged || working === 'faq'}>
          {working === 'faq' ? 'Saving...' : 'Save FAQ'}
        </button>
      </form>

      <form
        id="contact"
        data-admin-section
        className={styles.card}
        onSubmit={saveContact}
      >
        <h2>Contact</h2>
        <div className={styles.grid}>
          <label>
            Eyebrow
            <input value={contact.eyebrow ?? ''} onChange={(event) => update(setContact, 'eyebrow', event.target.value)} />
          </label>
          <label>
            Title
            <input value={contact.title ?? ''} onChange={(event) => update(setContact, 'title', event.target.value)} />
          </label>
          <label>
            Accent Title
            <input value={contact.titleAccent ?? ''} onChange={(event) => update(setContact, 'titleAccent', event.target.value)} />
          </label>
          <label className={styles.fullWidth}>
            Introduction
            <textarea value={contact.intro ?? ''} onChange={(event) => update(setContact, 'intro', event.target.value)} />
          </label>
        </div>

        {contact.items.map((item, itemIndex) => (
          <div className={styles.itemEditor} key={item.id}>
            <h3>Contact Item {itemIndex + 1}</h3>
            <div className={styles.grid}>
              <label>
                Label
                <input value={item.label ?? ''} onChange={(event) => updateItem(setContact, itemIndex, 'label', event.target.value)} />
              </label>

              {item.lines?.map((line, lineIndex) => (
                <label key={line.id}>
                  Line {lineIndex + 1}
                  <input
                    value={line.text ?? ''}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        items: current.items.map((entry, entryIndex) =>
                          entryIndex === itemIndex
                            ? {
                                ...entry,
                                lines: entry.lines.map((currentLine, currentLineIndex) =>
                                  currentLineIndex === lineIndex
                                    ? { ...currentLine, text: event.target.value }
                                    : currentLine
                                ),
                              }
                            : entry
                        ),
                      }))
                    }
                  />
                </label>
              ))}

              {!item.lines && item.type !== 'phone' && item.type !== 'email' && (
                <label className={styles.fullWidth}>
                  Value
                  <input value={item.value ?? ''} onChange={(event) => updateItem(setContact, itemIndex, 'value', event.target.value)} />
                </label>
              )}

              {(item.type === 'phone' || item.type === 'email') && (
                <p className={`${styles.help} ${styles.fullWidth}`}>
                  This value comes from the Company section above.
                </p>
              )}
            </div>
          </div>
        ))}

        <div className={styles.itemEditor}>
          <h3>Quote Form</h3>
          <div className={styles.grid}>
            <label>
              Title
              <input value={quoteForm.title ?? ''} onChange={(event) => update(setQuoteForm, 'title', event.target.value)} />
            </label>
            <label>
              Subtitle
              <input value={quoteForm.subtitle ?? ''} onChange={(event) => update(setQuoteForm, 'subtitle', event.target.value)} />
            </label>
            {Object.entries(quoteForm.fields ?? {}).map(([key, value]) => (
              <label key={key}>
                {key[0].toUpperCase() + key.slice(1)} Placeholder
                <input value={value ?? ''} onChange={(event) => updateNested(setQuoteForm, 'fields', key, event.target.value)} />
              </label>
            ))}
            <label>
              Submit Button
              <input value={quoteForm.submitLabel ?? ''} onChange={(event) => update(setQuoteForm, 'submitLabel', event.target.value)} />
            </label>
            <label>
              Sending Button
              <input value={quoteForm.sendingLabel ?? ''} onChange={(event) => update(setQuoteForm, 'sendingLabel', event.target.value)} />
            </label>
            <label className={styles.fullWidth}>
              Error Message
              <input value={quoteForm.errorMessage ?? ''} onChange={(event) => update(setQuoteForm, 'errorMessage', event.target.value)} />
            </label>
          </div>

          {(quoteForm.serviceOptions ?? []).map((option, optionIndex) => (
            <label key={option.id} className={styles.optionField}>
              Service Option {optionIndex + 1}
              <input
                value={option.label ?? ''}
                onChange={(event) =>
                  setQuoteForm((current) => ({
                    ...current,
                    serviceOptions: current.serviceOptions.map((entry, entryIndex) =>
                      entryIndex === optionIndex ? { ...entry, label: event.target.value } : entry
                    ),
                  }))
                }
              />
            </label>
          ))}
        </div>

        <div className={styles.itemEditor}>
          <h3>Success Message</h3>
          <div className={styles.grid}>
            <label>
              Title
              <input value={successModal.title ?? ''} onChange={(event) => update(setSuccessModal, 'title', event.target.value)} />
            </label>
            <label>
              Accent Title
              <input value={successModal.titleAccent ?? ''} onChange={(event) => update(setSuccessModal, 'titleAccent', event.target.value)} />
            </label>
            <label className={styles.fullWidth}>
              Message
              <textarea value={successModal.body ?? ''} onChange={(event) => update(setSuccessModal, 'body', event.target.value)} />
            </label>
            <label>
              Close Button
              <input value={successModal.closeLabel ?? ''} onChange={(event) => update(setSuccessModal, 'closeLabel', event.target.value)} />
            </label>
          </div>
        </div>

        <button type="submit" disabled={!contactChanged || working === 'contact'}>
          {working === 'contact' ? 'Saving...' : 'Save Contact'}
        </button>
      </form>

      <form
        id="footer"
        data-admin-section
        className={styles.card}
        onSubmit={(event) => saveTextSection(event, 'footer', footer, setSavedFooter, 'Footer')}
      >
        <h2>Footer</h2>
        <div className={styles.grid}>
          <label className={styles.fullWidth}>
            Copyright Text
            <input
              value={footer.copyright ?? ''}
              onChange={(event) => update(setFooter, 'copyright', event.target.value)}
            />
          </label>
          <label className={styles.fullWidth}>
            License Text
            <input
              value={footer.license ?? ''}
              onChange={(event) => update(setFooter, 'license', event.target.value)}
            />
          </label>
          <p className={`${styles.help} ${styles.fullWidth}`}>
            The logo, phone number, and service area come from the Company section above.
          </p>
        </div>

        <button type="submit" disabled={!footerChanged || working === 'footer'}>
          {working === 'footer' ? 'Saving...' : 'Save Footer'}
        </button>
      </form>
    </>
  );
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ImageEditor({ title, image, preview, selectedFile, inputKey, onChange, onRemove }) {
  const inputId = `image-upload-${String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${inputKey}`;

  return (
    <div className={styles.imageEditor}>
      <div>
        <h3>Current {title} Image</h3>
        <img src={image.url} alt={image.alt || `Current ${title}`} />
      </div>
      <div>
        <h3>{preview ? 'Selected New Image' : `Replace ${title} Image`}</h3>
        <div className={`${styles.uploadPanel} ${preview ? styles.uploadPanelSelected : ''}`}>
          {preview && <img src={preview} alt={`Selected ${title} preview`} />}

          <input
            key={inputKey}
            id={inputId}
            className={styles.visuallyHiddenFileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onChange}
          />

          <label className={styles.filePickerButton} htmlFor={inputId}>
            {preview ? 'Choose Different Image' : 'Choose New Image'}
          </label>

          {selectedFile ? (
            <div className={styles.selectedFileInfo}>
              <span className={styles.selectedFileName}>{selectedFile.name}</span>
              <span className={styles.selectedFileSize}>{formatFileSize(selectedFile.size)}</span>
              <button className={styles.removeFileButton} type="button" onClick={onRemove}>
                Remove selection
              </button>
            </div>
          ) : (
            <p className={styles.noFileSelected}>No image selected</p>
          )}

          <p className={styles.help}>JPG, PNG or WEBP. Maximum 6 MB.</p>
        </div>
      </div>
    </div>
  );
}
