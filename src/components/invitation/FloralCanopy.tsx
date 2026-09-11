import React from 'react';
import { FloralPalette } from '../../types';

interface FloralCanopyProps {
  palette: FloralPalette;
  animated?: boolean;
}

export const FloralCanopy: React.FC<FloralCanopyProps> = ({
  palette = 'orange-yellow',
  animated = false,
}) => {
  // Palettes for Marigold Flowers
  const colors = {
    'orange-yellow': {
      p1: '#FF7A00', // vibrant orange
      p2: '#FFA726', // warm marigold yellow
      p3: '#D84315', // deep burnt orange
      p4: '#FFD54F', // golden yellow tip
      c1: '#BF360C', // deep center
      leaf: '#2E7D32',
      leafAccent: '#43A047',
    },
    'pink-orange': {
      p1: '#E64A19',
      p2: '#FF7043',
      p3: '#C2185B',
      p4: '#FF8A80',
      c1: '#880E4F',
      leaf: '#2E7D32',
      leafAccent: '#388E3C',
    },
    'red-gold': {
      p1: '#C62828',
      p2: '#E53935',
      p3: '#FFB300',
      p4: '#FFD54F',
      c1: '#8E0000',
      leaf: '#1B5E20',
      leafAccent: '#2E7D32',
    },
    'royal-marigold': {
      p1: '#FF6F00',
      p2: '#FFA000',
      p3: '#E65100',
      p4: '#FFE082',
      c1: '#B23A00',
      leaf: '#33691E',
      leafAccent: '#558B2F',
    },
  }[palette];

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none ${animated ? 'animate-sway-subtle' : ''}`}>
      <svg
        viewBox="0 0 1080 260"
        className="w-full h-auto block drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial Gradients for Marigold Petal Layers */}
          <radialGradient id="canopyOrangeG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.c1} />
            <stop offset="55%" stopColor={colors.p1} />
            <stop offset="100%" stopColor={colors.p4} />
          </radialGradient>
          <radialGradient id="canopyYellowG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.p3} />
            <stop offset="60%" stopColor={colors.p2} />
            <stop offset="100%" stopColor={colors.p4} />
          </radialGradient>
          <radialGradient id="canopyRedG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.c1} />
            <stop offset="65%" stopColor={colors.p3} />
            <stop offset="100%" stopColor={colors.p2} />
          </radialGradient>

          {/* Leaf Definition */}
          <g id="canopyLeaf">
            <path
              d="M0 0 C15 -25 35 -30 65 -20 C45 0 35 15 0 0 Z"
              fill={colors.leaf}
              opacity="0.9"
            />
            <path
              d="M0 0 C25 -10 45 -12 65 -20"
              stroke={colors.leafAccent}
              strokeWidth="1.5"
              fill="none"
              opacity="0.8"
            />
          </g>

          {/* Detailed Illustrated Marigold Flower (Genda Phool) */}
          <g id="marigoldLarge">
            {/* Outer Petal Ring (18 scallops) */}
            <circle cx="0" cy="0" r="54" fill={colors.p3} opacity="0.6" />
            <path
              d="M0 -52 C8 -52 14 -46 16 -40 C24 -46 32 -42 36 -34 C44 -38 50 -32 50 -24 C56 -24 60 -16 56 -8 C60 0 58 8 52 14 C56 22 50 30 42 34 C42 42 34 48 26 48 C20 54 10 54 4 50 C-4 54 -14 54 -20 48 C-28 48 -36 42 -36 34 C-44 30 -50 22 -46 14 C-52 8 -54 0 -50 -8 C-54 -16 -50 -24 -44 -24 C-44 -32 -38 -38 -30 -34 C-26 -42 -18 -46 -10 -40 C-8 -46 -2 -52 0 -52 Z"
              fill="url(#canopyOrangeG)"
            />
            {/* Middle Petal Ring (14 scallops) */}
            <path
              d="M0 -40 C6 -40 10 -34 12 -30 C18 -34 24 -30 26 -24 C32 -26 36 -22 36 -16 C40 -16 42 -10 38 -4 C40 2 38 8 34 12 C36 18 32 22 26 24 C24 30 18 34 12 34 C8 38 2 38 -2 36 C-8 38 -14 38 -18 34 C-24 34 -28 30 -28 24 C-34 22 -38 18 -36 12 C-40 8 -42 2 -38 -4 C-42 -10 -40 -16 -34 -16 C-34 -22 -30 -26 -24 -24 C-22 -30 -16 -34 -10 -30 C-6 -34 -2 -40 0 -40 Z"
              fill="url(#canopyYellowG)"
            />
            {/* Inner Tight Petal Cluster */}
            <circle cx="0" cy="0" r="26" fill={colors.p1} />
            <circle cx="0" cy="0" r="18" fill="url(#canopyOrangeG)" />
            {/* Center pistil node */}
            <circle cx="0" cy="0" r="8" fill={colors.c1} />
            <circle cx="-2" cy="-2" r="2" fill={colors.p4} opacity="0.8" />
          </g>

          <g id="marigoldSmall">
            <circle cx="0" cy="0" r="36" fill={colors.p3} opacity="0.6" />
            <path
              d="M0 -34 C5 -34 9 -30 10 -26 C15 -30 20 -27 22 -22 C27 -24 31 -20 31 -15 C34 -15 36 -10 33 -5 C35 0 33 5 30 8 C32 13 28 17 23 18 C21 23 16 26 10 26 C7 29 2 29 -2 27 C-7 29 -12 29 -15 26 C-21 26 -24 23 -24 18 C-29 17 -33 13 -31 8 C-34 5 -36 0 -33 -5 C-36 -10 -34 -15 -29 -15 C-29 -20 -25 -24 -20 -22 C-18 -27 -13 -30 -8 -26 C-5 -30 -2 -34 0 -34 Z"
              fill="url(#canopyYellowG)"
            />
            <circle cx="0" cy="0" r="18" fill={colors.p1} />
            <circle cx="0" cy="0" r="7" fill={colors.c1} />
          </g>

          {/* Red/Pink Accent Flower */}
          <g id="accentRose">
            <circle cx="0" cy="0" r="22" fill="#C2185B" />
            <circle cx="0" cy="0" r="16" fill="#E91E63" />
            <circle cx="0" cy="0" r="10" fill="#F06292" />
            <circle cx="0" cy="0" r="5" fill="#FFF0F5" />
          </g>
        </defs>

        {/* Top Edge Foliage / Mango leaves layer framing the header */}
        <g opacity="0.95">
          <use href="#canopyLeaf" x="20" y="45" transform="rotate(-30 20 45) scale(1.3)" />
          <use href="#canopyLeaf" x="60" y="60" transform="rotate(-15 60 60) scale(1.2)" />
          <use href="#canopyLeaf" x="120" y="70" transform="rotate(10 120 70) scale(1.2)" />
          <use href="#canopyLeaf" x="180" y="65" transform="rotate(25 180 65) scale(1.1)" />

          <use href="#canopyLeaf" x="900" y="65" transform="rotate(-25 900 65) scale(-1.1, 1.1)" />
          <use href="#canopyLeaf" x="960" y="70" transform="rotate(-10 960 70) scale(-1.2, 1.2)" />
          <use href="#canopyLeaf" x="1020" y="60" transform="rotate(15 1020 60) scale(-1.2, 1.2)" />
          <use href="#canopyLeaf" x="1060" y="45" transform="rotate(30 1060 45) scale(-1.3, 1.3)" />
        </g>

        {/* Dense First Row of Hanging Foliage sprigs across center */}
        {Array.from({ length: 13 }).map((_, i) => {
          const x = 80 + i * 78;
          const y = 30 + Math.sin((i / 12) * Math.PI) * 20;
          const rot = (i % 2 === 0 ? 1 : -1) * (15 + (i % 3) * 10);
          return (
            <use
              key={`foliage-${i}`}
              href="#canopyLeaf"
              x={x}
              y={y}
              transform={`rotate(${rot} ${x} ${y}) scale(0.9)`}
              opacity="0.85"
            />
          );
        })}

        {/* Top Canopy Marigold Base Layer (Layer 1 - Deep Orange & Warm Yellow) */}
        {Array.from({ length: 17 }).map((_, i) => {
          const x = 30 + i * 65;
          // Gentle curved festoon arch drooping slightly in middle
          const y = 50 + Math.sin((i / 16) * Math.PI) * 35;
          const isLarge = i % 2 === 0;
          return (
            <use
              key={`marigold-base-${i}`}
              href={isLarge ? '#marigoldLarge' : '#marigoldSmall'}
              x={x}
              y={y}
              transform={`scale(${isLarge ? 0.95 : 1.05})`}
            />
          );
        })}

        {/* Layer 2 - Foreground Overlapping Marigold Crests for Lush Indian Festive Garland Feel */}
        {Array.from({ length: 13 }).map((_, i) => {
          const x = 60 + i * 82;
          const y = 90 + Math.sin((i / 12) * Math.PI) * 45;
          const isYellow = i % 3 === 0;
          return (
            <g key={`marigold-fore-${i}`}>
              <use
                href="#marigoldLarge"
                x={x}
                y={y}
                transform={`rotate(${i * 24} ${x} ${y}) scale(${isYellow ? 0.9 : 0.85})`}
              />
              {/* Occasional sweet pink/red rose buds nestled inside marigold crest */}
              {i % 4 === 1 && (
                <use href="#accentRose" x={x + 12} y={y + 14} transform="scale(0.85)" />
              )}
            </g>
          );
        })}

        {/* Layer 3 - Gentle droplet dips at corners for traditional toran / bandhanwar shape */}
        <use href="#marigoldSmall" x="25" y="115" transform="scale(0.85)" />
        <use href="#marigoldSmall" x="18" y="150" transform="scale(0.75)" />
        <use href="#accentRose" x="15" y="175" transform="scale(0.75)" />

        <use href="#marigoldSmall" x="1055" y="115" transform="scale(0.85)" />
        <use href="#marigoldSmall" x="1062" y="150" transform="scale(0.75)" />
        <use href="#accentRose" x="1065" y="175" transform="scale(0.75)" />

        {/* Central Festoon Droplet / Toran Centerpiece */}
        <g transform="translate(540, 155)">
          <use href="#marigoldSmall" x="0" y="0" transform="scale(0.95)" />
          <use href="#accentRose" x="0" y="24" transform="scale(0.85)" />
          {/* Hanging golden pearl tassel */}
          <circle cx="0" cy="40" r="3" fill="#D4942A" />
          <circle cx="0" cy="48" r="2" fill="#D4942A" />
        </g>
      </svg>
    </div>
  );
};
