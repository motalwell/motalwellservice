'use client';

import { useEffect, useRef, useState } from 'react';

export default function Stats({ stats }) {
  const containerRef = useRef(null);
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const container = containerRef.current;
    const animationFrames = [];

    const animate = () => {
      const duration = 1000;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) * (1 - progress);
        setValues(stats.map((stat) => Math.floor(stat.target * eased)));

        if (progress < 1) animationFrames.push(requestAnimationFrame(tick));
      };

      animationFrames.push(requestAnimationFrame(tick));
    };

    let observer;
    if (container && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) animate();
      }, { threshold: 0.5 });
      observer.observe(container);
    } else {
      animate();
    }

    return () => {
      observer?.disconnect();
      animationFrames.forEach(cancelAnimationFrame);
    };
  }, [stats]);

  return (
    <div className="stats" ref={containerRef}>
      {stats.map((stat, index) => (
        <div className="stat" key={stat.label}>
          <span className="stat-num" data-target={stat.target}>{values[index]}</span>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
