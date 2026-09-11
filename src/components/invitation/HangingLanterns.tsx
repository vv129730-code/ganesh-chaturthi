import React from 'react';

interface HangingLanternsProps {
  animated?: boolean;
}

export const HangingLanterns: React.FC<HangingLanternsProps> = ({ animated = true }) => {
  return (
    <>
      {/* Left Hanging Lantern 1 (Higher, closer to side garland) */}
      <div
        className={`absolute top-0 left-[3.5%] z-20 pointer-events-none ${
          animated ? 'animate-sway-lantern-1' : ''
        }`}
        style={{ transformOrigin: 'top center' }}
      >
        {/* Golden chain */}
        <div className="w-[1.2px] h-18 sm:h-24 bg-gradient-to-b from-amber-700/60 via-amber-500/80 to-amber-600 mx-auto" />
        <TraditionalLantern size={30} animated={animated} flickerDelay="0s" />
      </div>

      {/* Left Hanging Lantern 2 (Lower, cascading) */}
      <div
        className={`absolute top-0 left-[8.5%] z-20 pointer-events-none ${
          animated ? 'animate-sway-lantern-2' : ''
        }`}
        style={{ transformOrigin: 'top center', animationDelay: '0.8s' }}
      >
        <div className="w-[1.2px] h-28 sm:h-36 bg-gradient-to-b from-amber-700/60 via-amber-500/80 to-amber-600 mx-auto" />
        <TraditionalLantern size={26} animated={animated} flickerDelay="1.2s" />
      </div>

      {/* Right Hanging Lantern 1 (Higher, closer to side garland) */}
      <div
        className={`absolute top-0 right-[3.5%] z-20 pointer-events-none ${
          animated ? 'animate-sway-lantern-1' : ''
        }`}
        style={{ transformOrigin: 'top center', animationDelay: '1.4s' }}
      >
        <div className="w-[1.2px] h-18 sm:h-24 bg-gradient-to-b from-amber-700/60 via-amber-500/80 to-amber-600 mx-auto" />
        <TraditionalLantern size={30} animated={animated} flickerDelay="0.5s" />
      </div>

      {/* Right Hanging Lantern 2 (Lower, cascading) */}
      <div
        className={`absolute top-0 right-[8.5%] z-20 pointer-events-none ${
          animated ? 'animate-sway-lantern-2' : ''
        }`}
        style={{ transformOrigin: 'top center', animationDelay: '2.1s' }}
      >
        <div className="w-[1.2px] h-28 sm:h-36 bg-gradient-to-b from-amber-700/60 via-amber-500/80 to-amber-600 mx-auto" />
        <TraditionalLantern size={26} animated={animated} flickerDelay="1.8s" />
      </div>
    </>
  );
};

interface TraditionalLanternProps {
  size?: number;
  animated?: boolean;
  flickerDelay?: string;
}

const TraditionalLantern: React.FC<TraditionalLanternProps> = ({
  size = 32,
  animated = true,
  flickerDelay = '0s',
}) => {
  return (
    <div className="relative -mt-1 flex flex-col items-center">
      {/* Warm Ambient Glow behind lantern */}
      <div
        className={`absolute top-1.5 w-10 h-12 bg-amber-400/35 rounded-full blur-md pointer-events-none ${
          animated ? 'animate-flicker-subtle' : ''
        }`}
        style={{ animationDelay: flickerDelay }}
      />

      <svg
        width={size}
        height={size * 1.5}
        viewBox="0 0 50 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md relative z-10"
      >
        <defs>
          {/* Radial warm diya flame glow */}
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="35%" stopColor="#FFE082" />
            <stop offset="70%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#F57C00" />
          </radialGradient>
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C48820" />
            <stop offset="40%" stopColor="#F2D179" />
            <stop offset="75%" stopColor="#D4942A" />
            <stop offset="100%" stopColor="#966010" />
          </linearGradient>
        </defs>

        {/* Top Suspension Loop & Dome (Chhatri) */}
        <circle cx="25" cy="4" r="3" stroke="url(#goldMetallic)" strokeWidth="1.8" fill="none" />
        <path
          d="M25 7 L27 12 H23 Z"
          fill="url(#goldMetallic)"
        />
        {/* Tiered pagoda roof */}
        <path
          d="M15 17 C17 13 33 13 35 17 L38 20 H12 L15 17 Z"
          fill="url(#goldMetallic)"
          stroke="#8A5812"
          strokeWidth="0.8"
        />

        {/* Glowing Interior Glass Chamber */}
        <path
          d="M14 20 L10 38 L16 52 H34 L40 38 L36 20 Z"
          fill="url(#lanternGlow)"
          opacity="0.95"
        />

        {/* Inner Diya / Candle Flame */}
        <ellipse cx="25" cy="38" rx="4" ry="7" fill="#FFF" />
        <ellipse cx="25" cy="39" rx="2" ry="4" fill="#FFEB3B" />

        {/* Ornate Lattice / Cutout Filigree Lines (Jali work) */}
        <path
          d="M14 20 L10 38 L16 52 H34 L40 38 L36 20 Z"
          stroke="url(#goldMetallic)"
          strokeWidth="1.8"
          fill="none"
        />
        {/* Diamond Jali Grate */}
        <path
          d="M25 20 L10 38 L25 52 L40 38 Z"
          stroke="#B0761B"
          strokeWidth="1.2"
          fill="none"
        />
        <line x1="25" y1="20" x2="25" y2="52" stroke="#B0761B" strokeWidth="1.2" />
        <line x1="10" y1="38" x2="40" y2="38" stroke="#B0761B" strokeWidth="1.2" />

        {/* Bottom Ornament Rim & Hanging Bell/Ghungroo */}
        <path
          d="M16 52 H34 L31 58 H19 Z"
          fill="url(#goldMetallic)"
          stroke="#8A5812"
          strokeWidth="0.8"
        />
        {/* Dangling Brass Bell drops */}
        <line x1="25" y1="58" x2="25" y2="65" stroke="url(#goldMetallic)" strokeWidth="1.2" />
        <circle cx="25" cy="67" r="2.5" fill="url(#goldMetallic)" />

        <line x1="19" y1="58" x2="19" y2="63" stroke="url(#goldMetallic)" strokeWidth="1" />
        <circle cx="19" cy="65" r="1.8" fill="url(#goldMetallic)" />

        <line x1="31" y1="58" x2="31" y2="63" stroke="url(#goldMetallic)" strokeWidth="1" />
        <circle cx="31" cy="65" r="1.8" fill="url(#goldMetallic)" />
      </svg>
    </div>
  );
};
