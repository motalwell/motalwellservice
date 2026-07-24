/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

export default function SiteImage({ src, alt, className, fallback, errorStyle }) {
  const [hasError, setHasError] = useState(false);

  if (hasError && fallback) {
    return (
      <div className="service-img-placeholder" style={{ display: 'flex' }}>
        {fallback}
      </div>
    );
  }

  if (hasError) {
    return <img className={className} alt={alt} style={errorStyle} />;
  }

  return <img className={className} src={src} alt={alt} onError={() => setHasError(true)} />;
}
