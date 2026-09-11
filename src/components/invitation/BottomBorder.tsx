import React from 'react';
import { FloralPalette } from '../../types';

interface BottomBorderProps {
  palette: FloralPalette;
  accentGold?: string;
}

export const BottomBorder: React.FC<BottomBorderProps> = ({
  palette = 'orange-yellow',
  accentGold = '#D4942A',
}) => {
  const flowerColor = {
    'orange-yellow': { orange: '#FF7A00', yellow: '#FFB300' },
    'pink-orange': { orange: '#FF5722', yellow: '#FF8A65' },
    'red-gold': { orange: '#D32F2F', yellow: '#FFB300' },
    'royal-marigold': { orange: '#FF6F00', yellow: '#FFD54F' },
  }[palette];

  return (
    <div className="relative w-full overflow-hidden pointer-events-none select-none">
      <svg
        viewBox="0 0 1080 140"
        className="w-full h-auto block drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Repeating Golden Floral Motifs (Paisley / Lotus / Floral Arch) */}
          <g id="bottomLotusMotif">
            {/* Lotus Petals Arch */}
            <path
              d="M0 0 C-10 -15 -25 -22 -35 -15 C-42 -10 -40 5 -20 18 C-5 24 0 28 0 32 C0 28 5 24 20 18 C40 5 42 -10 35 -15 C25 -22 10 -15 0 0 Z"
              stroke={accentGold}
              strokeWidth="2"
              fill="none"
            />
            {/* Inner Petal */}
            <path
              d="M0 5 C-6 -8 -15 -12 -20 -8 C-24 -4 -22 4 -12 12 C-3 17 0 20 0 24 C0 20 3 17 12 12 C22 4 24 -4 20 -8 C15 -12 6 -8 0 5 Z"
              fill={accentGold}
              opacity="0.25"
            />
            {/* Center Bud */}
            <circle cx="0" cy="8" r="3.5" fill={accentGold} />
          </g>

          {/* Marigold cluster accent */}
          <g id="miniMarigold">
            <circle cx="0" cy="0" r="10" fill={flowerColor.orange} />
            <circle cx="0" cy="0" r="6" fill={flowerColor.yellow} />
            <circle cx="0" cy="0" r="2.5" fill="#BF360C" />
          </g>
        </defs>

        {/* Decorative Top Scalloped Line */}
        <path
          d="M 0 50 Q 27 38 54 50 Q 81 38 108 50 Q 135 38 162 50 Q 189 38 216 50 Q 243 38 270 50 Q 297 38 324 50 Q 351 38 378 50 Q 405 38 432 50 Q 459 38 486 50 Q 513 38 540 50 Q 567 38 594 50 Q 621 38 648 50 Q 675 38 702 50 Q 729 38 756 50 Q 783 38 810 50 Q 837 38 864 50 Q 891 38 918 50 Q 945 38 972 50 Q 999 38 1026 50 Q 1053 38 1080 50"
          stroke={accentGold}
          strokeWidth="1.5"
          fill="none"
          opacity="0.75"
        />

        {/* Repeating Golden Floral / Lotus Rangoli Motifs */}
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 54 + i * 97.2;
          return (
            <use
              key={`lotus-${i}`}
              href="#bottomLotusMotif"
              x={x}
              y="52"
              transform="scale(0.85)"
            />
          );
        })}

        {/* Center Marigold Blossoms on the peaks */}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 108 + i * 97.2;
          return (
            <use
              key={`flower-${i}`}
              href="#miniMarigold"
              x={x}
              y="40"
              transform="scale(0.9)"
            />
          );
        })}

        {/* Bottom Double Gold Finish Line */}
        <line x1="40" y1="110" x2="1040" y2="110" stroke={accentGold} strokeWidth="1.5" opacity="0.8" />
        <line x1="80" y1="116" x2="1000" y2="116" stroke={accentGold} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

        {/* Center Auspicious Floral Crest */}
        <circle cx="540" cy="110" r="5" fill={accentGold} />
        <circle cx="530" cy="110" r="2.5" fill={accentGold} />
        <circle cx="550" cy="110" r="2.5" fill={accentGold} />
      </svg>
    </div>
  );
};
