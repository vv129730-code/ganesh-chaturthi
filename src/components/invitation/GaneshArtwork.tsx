import React from 'react';
import { GaneshArtStyle } from '../../types';

interface GaneshArtworkProps {
  style: GaneshArtStyle;
  color?: string;
  size?: number;
  className?: string;
}

export const GaneshArtwork: React.FC<GaneshArtworkProps> = ({
  style,
  color = '#741124',
  size = 140,
  className = '',
}) => {
  if (style === 'minimal-elegant') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-sm ${className}`}
      >
        {/* Minimal Calligraphic Ganesha */}
        <path
          d="M100 28 C92 28, 86 34, 86 42 C86 52, 94 58, 100 64 C106 58, 114 52, 114 42 C114 34, 108 28, 100 28 Z"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Sacred Tilak / Trishul */}
        <path
          d="M100 36 V52 M95 40 C95 48, 105 48, 105 40"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Head & Ear Contour Left */}
        <path
          d="M84 48 C60 50, 48 68, 54 88 C60 106, 76 112, 88 114"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Head & Ear Contour Right */}
        <path
          d="M116 48 C140 50, 152 68, 146 88 C140 106, 124 112, 112 114"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Trunk graceful sweep */}
        <path
          d="M96 74 C96 98, 102 118, 92 136 C84 150, 68 154, 64 142 C60 130, 72 122, 80 126"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Modak on trunk tip */}
        <circle cx="82" cy="126" r="4.5" fill={color} />
        {/* Tusk */}
        <path
          d="M88 102 L76 104"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M112 102 L118 103"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Sacred Eye & Forehead dot */}
        <circle cx="100" cy="62" r="3" fill={color} />
        <ellipse cx="88" cy="74" rx="3.5" ry="2" fill={color} />
        <ellipse cx="112" cy="74" rx="3.5" ry="2" fill={color} />
        {/* Subtle base aura */}
        <path
          d="M60 168 C72 176, 128 176, 140 168"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (style === 'ornamental-royal') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-sm ${className}`}
      >
        {/* Sacred Radial Halo */}
        <circle cx="120" cy="120" r="105" stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="120" cy="120" r="92" stroke={color} strokeWidth="1.5" opacity="0.6" />
        {/* Halo sun rays */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <line
              key={i}
              x1="120"
              y1="22"
              x2="120"
              y2="14"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${angle} 120 120)`}
              opacity="0.5"
            />
          );
        })}

        {/* Ornate Royal Crown (Mukut) */}
        <path
          d="M120 28 L130 52 L144 44 L138 66 L152 70 L136 82 L120 80 L104 82 L88 70 L102 66 L96 44 L110 52 Z"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="120" cy="40" r="3" fill={color} />
        <circle cx="120" cy="58" r="3.5" fill={color} />

        {/* Forehead & Sacred Tilak */}
        <path
          d="M120 84 V110 M113 90 C113 104, 127 104, 127 90"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="120" cy="100" r="2.5" fill={color} />

        {/* Left Royal Ear with Ornaments */}
        <path
          d="M102 84 C76 84, 52 100, 56 126 C60 144, 78 152, 98 150"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Inner ear curve & earring */}
        <path
          d="M80 108 C74 116, 76 128, 86 132"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="68" cy="146" r="4" stroke={color} strokeWidth="1.5" />
        <circle cx="68" cy="146" r="2" fill={color} />

        {/* Right Royal Ear with Ornaments */}
        <path
          d="M138 84 C164 84, 188 100, 184 126 C180 144, 162 152, 142 150"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M160 108 C166 116, 164 128, 154 132"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="172" cy="146" r="4" stroke={color} strokeWidth="1.5" />
        <circle cx="172" cy="146" r="2" fill={color} />

        {/* Eyes with Devotional Serenity */}
        <path
          d="M104 114 Q111 110 115 115"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="110" cy="116" r="1.5" fill={color} />
        <path
          d="M136 114 Q129 110 125 115"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="130" cy="116" r="1.5" fill={color} />

        {/* Royal Trunk with ornaments */}
        <path
          d="M116 122 C116 150, 126 172, 110 192 C98 206, 78 208, 74 190 C70 174, 86 166, 96 172"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Trunk ridges / Bell ornaments */}
        <path d="M114 138 C118 140, 122 140, 124 138" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M112 150 C118 152, 122 152, 124 150" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M106 164 C112 166, 118 166, 120 164" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

        {/* Golden Ladoo / Modak */}
        <circle cx="98" cy="172" r="6" fill={color} />
        <path d="M98 164 L98 168" stroke="#FFF" strokeWidth="1" strokeLinecap="round" />

        {/* Left Full Tusk & Right Broken Tusk */}
        <path d="M102 144 L90 148" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M138 144 L144 146" stroke={color} strokeWidth="3" strokeLinecap="round" />

        {/* Lotus base petals */}
        <path
          d="M70 216 C90 206, 150 206, 170 216 C150 226, 90 226, 70 216 Z"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    );
  }

  if (style === 'mandala-ganesh') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-sm ${className}`}
      >
        {/* Sacred Geometry Lotus Mandala */}
        <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="100" cy="100" r="76" stroke={color} strokeWidth="1.5" opacity="0.8" />
        {/* 12-pointed petal ring */}
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={i}
            d="M100 24 C106 34, 106 42, 100 48 C94 42, 94 34, 100 24 Z"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            transform={`rotate(${(i * 360) / 12} 100 100)`}
            opacity="0.7"
          />
        ))}

        {/* Central Ganesha */}
        <path
          d="M100 54 C94 54, 90 58, 90 64 C90 72, 96 76, 100 80 C104 76, 110 72, 110 64 C110 58, 106 54, 100 54 Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Crown accent */}
        <path d="M100 46 L103 54 H97 Z" fill={color} />
        {/* Tilak */}
        <path d="M100 60 V70 M96 64 C96 69, 104 69, 104 64" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        {/* Ears */}
        <path
          d="M88 68 C74 70, 64 82, 68 96 C72 108, 84 112, 92 112"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M112 68 C126 70, 136 82, 132 96 C128 108, 116 112, 108 112"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Trunk */}
        <path
          d="M98 88 C98 108, 104 120, 96 132 C88 142, 74 142, 72 132 C70 122, 80 118, 86 122"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="88" cy="122" r="3.5" fill={color} />
        {/* Eyes */}
        <ellipse cx="92" cy="84" rx="2" ry="1.2" fill={color} />
        <ellipse cx="108" cy="84" rx="2" ry="1.2" fill={color} />
      </svg>
    );
  }

  // DEFAULT: 'traditional-line-art' - The authentic luxury invitation Ganesha illustration
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-sm ${className}`}
    >
      {/* Traditional Crown / Mukut with Pagdi flourishes */}
      <path
        d="M110 24 C104 24, 101 28, 101 32 C101 38, 105 42, 110 46 C115 42, 119 38, 119 32 C119 28, 116 24, 110 24 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top sacred flame kalash on crown */}
      <path
        d="M110 16 C107 19, 107 23, 110 24 C113 23, 113 19, 110 16 Z"
        fill={color}
      />
      {/* Crown tier arches */}
      <path
        d="M98 44 C104 40, 116 40, 122 44 M92 56 C102 50, 118 50, 128 56"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="110" cy="34" r="2" fill={color} />

      {/* Sacred Tripundra / Tilak on Forehead */}
      <path
        d="M110 58 V78 M102 65 C102 74, 118 74, 118 65"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Vermilion Bindi */}
      <circle cx="110" cy="70" r="2.8" fill={color} />

      {/* Symmetrical Graceful Left Ear with auspicious curl */}
      <path
        d="M94 58 C68 60, 48 76, 52 102 C56 122, 74 132, 92 130"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Inner ear line & decorative leaf swirl */}
      <path
        d="M72 88 C68 96, 70 108, 80 112"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="62" cy="116" r="3" stroke={color} strokeWidth="1.5" />

      {/* Symmetrical Graceful Right Ear with auspicious curl */}
      <path
        d="M126 58 C152 60, 172 76, 168 102 C164 122, 146 132, 128 130"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M148 88 C152 96, 150 108, 140 112"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="158" cy="116" r="3" stroke={color} strokeWidth="1.5" />

      {/* Devotional Eyes (Gentle half-closed meditative eyes) */}
      <path
        d="M96 90 Q103 86 107 92"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="102" cy="93" r="1.5" fill={color} />

      <path
        d="M124 90 Q117 86 113 92"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="118" cy="93" r="1.5" fill={color} />

      {/* Elegant Sacred Trunk with Modak */}
      <path
        d="M106 98 C106 126, 114 148, 102 168 C92 184, 72 184, 68 168 C64 154, 78 146, 86 150"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Decorative horizontal lines on trunk */}
      <path d="M105 116 C109 118, 113 118, 116 116" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M104 128 C108 130, 112 130, 114 128" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M100 142 C104 144, 108 144, 110 142" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Sweet Golden Modak on trunk tip */}
      <circle cx="88" cy="150" r="5" fill={color} />
      <path d="M88 143 L88 146" stroke="#FFF" strokeWidth="1" strokeLinecap="round" />

      {/* Tusks: Left intact tusk, right broken auspicious tusk (Ekadanta) */}
      <path d="M94 122 L82 126" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M126 122 L132 124" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Sacred Om / Auspicious Blessing Mark below trunk */}
      <path
        d="M96 196 C104 192, 116 192, 124 196"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="110" cy="192" r="2" fill={color} />
    </svg>
  );
};
