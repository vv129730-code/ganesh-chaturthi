import React from 'react';
import { FloralPalette } from '../../types';

interface SideGarlandsProps {
  palette: FloralPalette;
  animated?: boolean;
}

export const SideGarlands: React.FC<SideGarlandsProps> = ({
  palette = 'orange-yellow',
  animated = false,
}) => {
  const colors = {
    'orange-yellow': {
      orange: '#FF7A00',
      yellow: '#FFB300',
      dark: '#BF360C',
      leaf: '#2E7D32',
      pink: '#D81B60',
    },
    'pink-orange': {
      orange: '#FF5722',
      yellow: '#FF8A65',
      dark: '#C2185B',
      leaf: '#2E7D32',
      pink: '#E91E63',
    },
    'red-gold': {
      orange: '#D32F2F',
      yellow: '#FFA000',
      dark: '#8E0000',
      leaf: '#1B5E20',
      pink: '#C2185B',
    },
    'royal-marigold': {
      orange: '#FF6F00',
      yellow: '#FFD54F',
      dark: '#E65100',
      leaf: '#33691E',
      pink: '#AD1457',
    },
  }[palette];

  // Number of flower nodes down the vertical card
  const garlandNodes = [
    { type: 'orange', size: 28 },
    { type: 'leaf', size: 16 },
    { type: 'yellow', size: 26 },
    { type: 'pink', size: 18 },
    { type: 'orange', size: 28 },
    { type: 'leaf', size: 16 },
    { type: 'yellow', size: 26 },
    { type: 'orange', size: 28 },
    { type: 'leaf', size: 16 },
    { type: 'pink', size: 18 },
    { type: 'yellow', size: 26 },
    { type: 'orange', size: 28 },
    { type: 'leaf', size: 16 },
    { type: 'yellow', size: 24 },
    { type: 'orange', size: 24 },
    { type: 'tassel', size: 20 },
  ];

  const renderGarlandColumn = (side: 'left' | 'right') => {
    return (
      <div
        className={`relative flex flex-col items-center select-none pointer-events-none ${
          animated ? (side === 'left' ? 'animate-sway-left' : 'animate-sway-right') : ''
        }`}
        style={{
          transformOrigin: 'top center',
        }}
      >
        {/* Subtle hanging string line */}
        <div className="absolute top-0 bottom-6 w-[2px] bg-amber-700/30" />

        {garlandNodes.map((node, idx) => {
          if (node.type === 'orange') {
            return (
              <div key={idx} className="my-[3px] relative z-10 transition-transform hover:scale-105">
                <svg width={node.size} height={node.size} viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" fill={colors.dark} opacity="0.4" />
                  {/* Marigold flower floret petals */}
                  <path
                    d="M20 2 C23 2 26 5 28 8 C31 6 34 8 35 11 C38 12 39 15 38 18 C40 21 39 24 37 26 C38 29 36 32 33 34 C33 37 30 39 27 38 C25 40 22 40 20 38 C18 40 15 40 13 38 C10 39 7 37 7 34 C4 32 2 29 3 26 C1 24 0 21 2 18 C1 15 2 12 5 11 C6 8 9 6 12 8 C14 5 17 2 20 2 Z"
                    fill={colors.orange}
                  />
                  <circle cx="20" cy="20" r="11" fill={colors.yellow} />
                  <circle cx="20" cy="20" r="5" fill={colors.dark} />
                </svg>
              </div>
            );
          }
          if (node.type === 'yellow') {
            return (
              <div key={idx} className="my-[3px] relative z-10">
                <svg width={node.size} height={node.size} viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill={colors.dark} opacity="0.3" />
                  <path
                    d="M18 2 C21 2 23 5 25 7 C28 6 30 8 31 11 C33 12 34 15 33 17 C35 20 34 22 32 24 C33 27 31 29 28 30 C28 33 26 34 23 34 C21 35 19 35 18 34 C17 35 15 35 13 34 C10 34 8 33 8 30 C5 29 3 27 4 24 C2 22 1 20 3 17 C2 15 3 12 5 11 C6 8 8 6 11 7 C13 5 15 2 18 2 Z"
                    fill={colors.yellow}
                  />
                  <circle cx="18" cy="18" r="9" fill={colors.orange} />
                  <circle cx="18" cy="18" r="4" fill={colors.dark} />
                </svg>
              </div>
            );
          }
          if (node.type === 'pink') {
            return (
              <div key={idx} className="my-[2px] relative z-10">
                <svg width={node.size} height={node.size} viewBox="0 0 30 30">
                  <circle cx="15" cy="15" r="13" fill={colors.pink} />
                  <circle cx="15" cy="15" r="9" fill="#F06292" />
                  <circle cx="15" cy="15" r="4" fill="#FFF" />
                </svg>
              </div>
            );
          }
          if (node.type === 'leaf') {
            return (
              <div key={idx} className="my-[1px] relative z-10">
                <svg width={node.size} height={node.size} viewBox="0 0 24 24">
                  {/* Pair of Mango/Ashoka leaves */}
                  <path
                    d="M12 2 C8 6 5 12 12 22 C19 12 16 6 12 2 Z"
                    fill={colors.leaf}
                    transform={side === 'left' ? 'rotate(-25 12 12)' : 'rotate(25 12 12)'}
                  />
                </svg>
              </div>
            );
          }
          if (node.type === 'tassel') {
            return (
              <div key={idx} className="mt-1 relative z-10 flex flex-col items-center">
                {/* Golden brass bell / ghungroo */}
                <svg width="22" height="28" viewBox="0 0 24 30">
                  <path
                    d="M12 2 C7 2 6 8 6 14 C6 18 4 20 3 22 H21 C20 20 18 18 18 14 C18 8 17 2 12 2 Z"
                    fill="#D4942A"
                  />
                  <circle cx="12" cy="24" r="3" fill="#B37D1E" />
                  <circle cx="12" cy="28" r="2" fill="#8C5C0F" />
                </svg>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Left Garland Column */}
      <div className="absolute top-[85px] left-3 sm:left-4 z-20 pointer-events-none">
        {renderGarlandColumn('left')}
      </div>

      {/* Right Garland Column */}
      <div className="absolute top-[85px] right-3 sm:right-4 z-20 pointer-events-none">
        {renderGarlandColumn('right')}
      </div>
    </>
  );
};
