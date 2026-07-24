/* eslint-disable @next/next/no-img-element */

import { siteContent } from '../content/siteContent';

export default function PhotoStrip() {
  const { photoCallout } = siteContent;

  return (
    <div className="photo-strip">
      <img src={photoCallout.image} alt={photoCallout.imageAlt} />
      <div className="photo-strip-overlay">
        <h2>{photoCallout.title} <span>{photoCallout.titleAccent}</span></h2>
        <p>{photoCallout.description}</p>
        <a href={photoCallout.button.href} className="btn-primary">{photoCallout.button.label}</a>
      </div>
    </div>
  );
}
