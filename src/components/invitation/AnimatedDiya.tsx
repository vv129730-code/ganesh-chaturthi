import React from 'react';

interface AnimatedDiyaProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const AnimatedDiya: React.FC<AnimatedDiyaProps> = ({
  size = 40,
  className = '',
  glow = true,
}) => {
  return (
    <div
      className={`relative inline-flex flex-col items-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size * 0.95 }}
    >
      {/* Ambient Pulsing Warm Diya Glow */}
      {glow && (
        <div
          className="absolute top-1 w-[75%] h-[75%] rounded-full bg-amber-400/25 blur-sm pointer-events-none animate-flicker-subtle"
          style={{ transformOrigin: 'center center' }}
        />
      )}

      <svg
        width={size}
        height={size * 0.95}
        viewBox="0 0 60 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-xs overflow-visible"
      >
        <defs>
          {/* Terracotta / Brass Gradient for Diya Bowl */}
          <linearGradient id="diyaBrassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4942A" />
            <stop offset="45%" stopColor="#C27A1A" />
            <stop offset="85%" stopColor="#8C4E0A" />
            <stop offset="100%" stopColor="#5E3004" />
          </linearGradient>

          {/* Diya Rim Highlight */}
          <linearGradient id="diyaRimHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5D076" />
            <stop offset="50%" stopColor="#FFE8A3" />
            <stop offset="100%" stopColor="#D4942A" />
          </linearGradient>

          {/* Flame Outer Gradient */}
          <linearGradient id="flameOuterGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#D84315" />
            <stop offset="35%" stopColor="#FF6D00" />
            <stop offset="70%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FFF176" />
          </linearGradient>

          {/* Flame Core Glow */}
          <linearGradient id="flameInnerGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFB300" />
            <stop offset="50%" stopColor="#FFF9C4" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* FLAME (With subtle flicker) */}
        <g
          className="animate-diya-flame origin-bottom"
          style={{ transformOrigin: '30px 27px' }}
        >
          {/* Flame Aura */}
          <ellipse cx="30" cy="18" rx="8" ry="12" fill="#FFA000" opacity="0.25" />

          {/* Outer Teardrop Flame */}
          <path
            d="M30 4 C34 11, 38 18, 36 24 C34 29, 26 29, 24 24 C22 18, 26 11, 30 4 Z"
            fill="url(#flameOuterGrad)"
          />

          {/* Inner Radiant Core */}
          <path
            d="M30 10 C32.5 15, 34.5 19, 33.5 23 C32.5 26.5, 27.5 26.5, 26.5 23 C25.5 19, 27.5 15, 30 10 Z"
            fill="url(#flameInnerGrad)"
            opacity="0.9"
          />

          {/* White-Hot Flame Center */}
          <ellipse cx="30" cy="22" rx="1.8" ry="3" fill="#FFFFFF" />
        </g>

        {/* Cotton Wick / Baati tip */}
        <path
          d="M29 27 C29.5 25, 30.5 25, 31 27"
          stroke="#422006"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* DIYA BOWL BASE (Traditional Mitti/Brass Deepak) */}
        {/* Base shadow ellipse */}
        <ellipse cx="30" cy="50" rx="18" ry="3" fill="#5A2E05" opacity="0.2" />

        {/* Diya Body */}
        <path
          d="M10 32 C12 43, 20 49, 30 49 C40 49, 48 43, 50 32 C43 30, 37 31, 30 31 C23 31, 17 30, 10 32 Z"
          fill="url(#diyaBrassGrad)"
          stroke="#683305"
          strokeWidth="1"
        />

        {/* Diya Rim Upper Lip */}
        <path
          d="M10 32 C17 30, 23 31, 30 31 C37 31, 43 30, 50 32 C43 34, 37 33, 30 33 C23 33, 17 34, 10 32 Z"
          fill="url(#diyaRimHighlight)"
        />

        {/* Traditional Engraved Filigree Dots / Arches */}
        <circle cx="20" cy="38" r="1.2" fill="#FCE5A2" opacity="0.75" />
        <circle cx="25" cy="41" r="1.4" fill="#FCE5A2" opacity="0.85" />
        <circle cx="30" cy="42" r="1.6" fill="#FCE5A2" opacity="0.9" />
        <circle cx="35" cy="41" r="1.4" fill="#FCE5A2" opacity="0.85" />
        <circle cx="40" cy="38" r="1.2" fill="#FCE5A2" opacity="0.75" />

        {/* Small Pedestal Foot */}
        <path
          d="M23 49 C25 51, 35 51, 37 49 H23 Z"
          fill="#5E3004"
        />
      </svg>
    </div>
  );
};
