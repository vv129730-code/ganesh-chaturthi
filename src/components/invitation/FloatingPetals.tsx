import React, { useMemo } from 'react';

interface FloatingPetalsProps {
  visible?: boolean;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ visible = true }) => {
  // A few tiny, delicate marigold petals gently drifting downward
  const petals = useMemo(() => {
    return [
      { id: 1, left: '12%', delay: '0.2s', duration: '12s', size: 10, color: '#FFA726', drift: '30px' },
      { id: 2, left: '28%', delay: '3.5s', duration: '14s', size: 12, color: '#FF7A00', drift: '-25px' },
      { id: 3, left: '46%', delay: '1.8s', duration: '16s', size: 9,  color: '#FFB300', drift: '20px' },
      { id: 4, left: '68%', delay: '5.0s', duration: '13s', size: 11, color: '#FF7A00', drift: '-35px' },
      { id: 5, left: '84%', delay: '2.4s', duration: '15s', size: 10, color: '#FFA726', drift: '25px' },
      { id: 6, left: '20%', delay: '7.2s', duration: '14s', size: 8,  color: '#FFB300', drift: '-20px' },
      { id: 7, left: '76%', delay: '8.6s', duration: '16s', size: 12, color: '#FF7A00', drift: '30px' },
    ];
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30 transition-opacity duration-1000">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: petal.left,
            top: '-24px',
            animation: `floatPetal ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            className="drop-shadow-xs"
          >
            <path
              d="M10 0 C16 6, 20 14, 16 22 C12 26, 8 26, 4 22 C0 14, 4 6, 10 0 Z"
              fill={petal.color}
              opacity="0.65"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
