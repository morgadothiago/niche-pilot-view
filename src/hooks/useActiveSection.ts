import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionVisibility: Record<string, number> = {};

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            sectionVisibility[id] = entry.intersectionRatio;
            
            // Find the section with highest visibility
            const mostVisible = Object.entries(sectionVisibility).reduce(
              (max, [sectionId, ratio]) => 
                ratio > max.ratio ? { id: sectionId, ratio } : max,
              { id: '', ratio: 0 }
            );
            
            if (mostVisible.ratio > 0) {
              setActiveSection(mostVisible.id);
            }
          });
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-80px 0px -50% 0px', // Account for header
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
