import React from 'react';

interface MandalaBackgroundProps {
  color?: string;
  animated?: boolean;
}

export const MandalaBackground: React.FC<MandalaBackgroundProps> = ({
  color = '#ECCB8A',
  animated = false,
}) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-25`}
    >
      {/* Central Large Sacred Mandala Watermark */}
      <svg
        viewBox="0 0 600 600"
        className={`w-[480px] h-[480px] max-w-none ${animated ? 'animate-spin-extremely-slow' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric rings */}
        <circle cx="300" cy="300" r="280" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="300" cy="300" r="260" stroke={color} strokeWidth="1.5" />
        <circle cx="300" cy="300" r="240" stroke={color} strokeWidth="0.8" strokeDasharray="2 4" />
        <circle cx="300" cy="300" r="200" stroke={color} strokeWidth="1.2" />
        <circle cx="300" cy="300" r="160" stroke={color} strokeWidth="1.5" />
        <circle cx="300" cy="300" r="120" stroke={color} strokeWidth="1" />
        <circle cx="300" cy="300" r="70" stroke={color} strokeWidth="1.2" />

        {/* Outer 24 Petal Lotus Ring */}
        {Array.from({ length: 24 }).map((_, i) => (
          <path
            key={`outer-${i}`}
            d="M300 40 C310 70, 315 100, 300 120 C285 100, 290 70, 300 40 Z"
            stroke={color}
            strokeWidth="1"
            fill="none"
            transform={`rotate(${(i * 360) / 24} 300 300)`}
          />
        ))}

        {/* Intermediate 16 Pointed Star Motifs */}
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={`star-${i}`} transform={`rotate(${(i * 360) / 16} 300 300)`}>
            <path
              d="M300 100 L308 140 L300 160 L292 140 Z"
              stroke={color}
              strokeWidth="0.9"
              fill="none"
            />
            <circle cx="300" cy="115" r="3" fill={color} />
          </g>
        ))}

        {/* Inner 12 Lotus Petals */}
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`inner-${i}`}
            d="M300 180 C312 210, 312 230, 300 240 C288 230, 288 210, 300 180 Z"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
            transform={`rotate(${(i * 360) / 12} 300 300)`}
          />
        ))}

        {/* Central 8-spoke floral core */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={`core-${i}`}
            cx="300"
            cy="245"
            r="4"
            fill={color}
            transform={`rotate(${(i * 360) / 8} 300 300)`}
          />
        ))}
      </svg>
    </div>
  );
};
