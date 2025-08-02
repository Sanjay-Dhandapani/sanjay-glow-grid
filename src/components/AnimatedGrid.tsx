import { useEffect, useState } from 'react';

const AnimatedGrid = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsBlurred(true);
    const handleMouseLeave = () => setIsBlurred(false);

    // Add listeners to cards and interactive elements
    const cards = document.querySelectorAll('[data-grid-blur]');
    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[-1] transition-all duration-300 ${
        isBlurred ? 'opacity-20 blur-sm' : 'opacity-50'
      }`}
      style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'grid-pulse 8s ease-in-out infinite alternate'
      }}
    />
  );
};

export default AnimatedGrid;