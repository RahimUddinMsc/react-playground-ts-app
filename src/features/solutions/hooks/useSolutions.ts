import { useState, useEffect } from 'react';

export const useSolutions = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      });
    });

    const cards = document.querySelectorAll('.solution-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return { inView };
};
