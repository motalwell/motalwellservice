/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { siteContent } from '../content/siteContent';

export default function About() {
  const { about } = siteContent;
  const [imageError, setImageError] = useState(false);

  return (
    <section style={{ background: 'var(--white)' }} id="about">
      <div className="about">
        <div className="about-text">
          <div className="section-eyebrow">{about.eyebrow}</div>
          <h2 className="section-title">{about.title}<br /><span>{about.titleAccent}</span></h2>
          {about.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph.lead && <strong>{paragraph.lead}</strong>}
              {paragraph.text}
            </p>
          ))}
          <div className="assoc-logos">
            {about.badges.map((badge) => <div className="assoc-badge" key={badge}>{badge}</div>)}
          </div>
        </div>

        <div className="about-img-wrap">
          <img
            src={imageError ? undefined : about.image}
            alt={about.imageAlt}
            onError={() => setImageError(true)}
            style={imageError ? { background: 'var(--navy2)' } : undefined}
          />
          <div className="about-years">
            <span className="num">{about.years}</span>
            <span className="lbl">{about.yearsLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
