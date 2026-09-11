import React from 'react';

interface OrnateDividerProps {
  variant?: 'lotus' | 'star' | 'diya';
  className?: string;
  isRevealed?: boolean;
}

export const OrnateDivider: React.FC<OrnateDividerProps> = ({
  variant = 'lotus',
  className = '',
  isRevealed = true,
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-2 select-none pointer-events-none my-3 transition-all duration-700 ease-out ${
        isRevealed ? 'opacity-90 scale-x-100' : 'opacity-0 scale-x-75'
      } ${className}`}
      style={{ transformOrigin: 'center center' }}
    >
      {/* Left Hairline Gradient Rule */}
      <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#D4942A]/60 to-[#D4942A]" />

      {/* Center Motif */}
      {variant === 'lotus' && (
        <svg width="28" height="14" viewBox="0 0 40 20" fill="none" className="text-[#D4942A]">
          {/* Central Lotus Petals */}
          <path
            d="M20 1 C22 7, 24 13, 20 18 C16 13, 18 7, 20 1 Z"
            fill="#D4942A"
          />
          <path
            d="M20 18 C23 14, 28 10, 31 12 C33 14, 30 18, 20 19 Z"
            fill="#B87B1A"
            opacity="0.85"
          />
          <path
            d="M20 18 C17 14, 12 10, 9 12 C7 14, 10 18, 20 19 Z"
            fill="#B87B1A"
            opacity="0.85"
          />
          <circle cx="20" cy="18" r="1.5" fill="#D4942A" />
        </svg>
      )}

      {variant === 'star' && (
        <div className="flex items-center gap-1 text-[#D4942A]">
          <span className="text-[10px] opacity-60">✦</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z"
              fill="#D4942A"
            />
            <circle cx="8" cy="8" r="2" fill="#FFF8EB" />
          </svg>
          <span className="text-[10px] opacity-60">✦</span>
        </div>
      )}

      {variant === 'diya' && (
        <div className="flex items-center gap-1.5 text-[#D4942A]">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#D4942A]/70 inline-block" />
          <svg width="16" height="12" viewBox="0 0 20 15" fill="none">
            <path
              d="M3 8 C5 12, 15 12, 17 8 C14 7, 6 7, 3 8 Z"
              fill="#C27A1A"
            />
            <path
              d="M10 1 C12 4, 13 6, 12 8 C11 9, 9 9, 8 8 C7 6, 8 4, 10 1 Z"
              fill="#FF9800"
            />
            <circle cx="10" cy="7" r="1.2" fill="#FFF9C4" />
          </svg>
          <span className="w-1.5 h-1.5 rotate-45 bg-[#D4942A]/70 inline-block" />
        </div>
      )}

      {/* Right Hairline Gradient Rule */}
      <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent via-[#D4942A]/60 to-[#D4942A]" />
    </div>
  );
};
