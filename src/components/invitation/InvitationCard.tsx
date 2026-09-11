import React, { forwardRef } from 'react';
import { InvitationData, StyleSettings } from '../../types';
import { BACKGROUND_STYLES } from '../../data/defaults';
import { GaneshArtwork } from './GaneshArtwork';
import { FloralCanopy } from './FloralCanopy';
import { SideGarlands } from './SideGarlands';
import { HangingLanterns } from './HangingLanterns';
import { MandalaBackground } from './MandalaBackground';
import { BottomBorder } from './BottomBorder';
import { FloatingPetals } from './FloatingPetals';

interface InvitationCardProps {
  data: InvitationData;
  style: StyleSettings;
  animated?: boolean;
  scale?: number;
}

export const InvitationCard = forwardRef<HTMLDivElement, InvitationCardProps>(
  ({ data, style, animated = false }, ref) => {
    const currentBg =
      BACKGROUND_STYLES.find((b) => b.id === style.bgStyle) || BACKGROUND_STYLES[1];
    const bgColor = style.customBgColor || currentBg.color;

    // Font selection based on style settings
    const getMainFontClass = () => {
      switch (style.mainFontFamily) {
        case 'yatra':
          return 'font-marathi-brush';
        case 'rozha':
          return 'font-festive-display';
        case 'cinzel':
          return 'font-[Cinzel_Decorative]';
        default:
          return 'font-festive-heading';
      }
    };

    const getScriptFontClass = () => {
      switch (style.scriptFontFamily) {
        case 'great-vibes':
          return 'font-[Great_Vibes]';
        case 'kalam':
          return 'font-[Kalam]';
        default:
          return 'font-script-small';
      }
    };

    return (
      <div
        ref={ref}
        id="invitation-card-canvas"
        className="relative w-full aspect-[9/16] select-none overflow-hidden shadow-2xl transition-all duration-300 paper-texture"
        style={{
          backgroundColor: bgColor,
          color: style.primaryTextColor,
        }}
      >
        {/* Subtle Decorative Golden Outer Frame / Inset Border */}
        <div
          className="absolute inset-4 sm:inset-6 border border-amber-600/35 pointer-events-none z-10 rounded-sm"
          style={{
            borderColor: `${style.accentGoldColor}45`,
          }}
        >
          {/* Subtle Inset hairline border */}
          <div
            className="absolute inset-1 border border-amber-600/20"
            style={{ borderColor: `${style.accentGoldColor}25` }}
          />
          {/* Corner Floral Ornaments */}
          {style.decorations.showCornerOrnaments && (
            <>
              {/* Top Left */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-amber-600/60" />
              {/* Top Right */}
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-amber-600/60" />
              {/* Bottom Left */}
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-amber-600/60" />
              {/* Bottom Right */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-amber-600/60" />
            </>
          )}
        </div>

        {/* 1. Subtle Background Mandala Watermark */}
        {style.decorations.showMandalaBg && (
          <MandalaBackground color={currentBg.patternColor} animated={animated} />
        )}

        {/* 2. Top Floral Canopy */}
        {style.decorations.showTopFlowers && (
          <div className="absolute top-0 left-0 right-0 z-20">
            <FloralCanopy palette={style.floralPalette} animated={animated} />
          </div>
        )}

        {/* 3. Hanging Lanterns */}
        {style.decorations.showHangingLanterns && (
          <HangingLanterns animated={animated} />
        )}

        {/* 4. Side Garlands */}
        {style.decorations.showSideGarlands && (
          <SideGarlands palette={style.floralPalette} animated={animated} />
        )}

        {/* 5. Animated Floating Petals in Animated Mode */}
        {animated && <FloatingPetals />}

        {/* 6. Central Content Container (Strict Visual Hierarchy, Symmetrical, High Legibility) */}
        <div className="relative z-20 h-full flex flex-col justify-between items-center text-center px-9 sm:px-14 md:px-16 pt-28 sm:pt-32 pb-14 overflow-hidden">
          {/* Top Section: Ganesh Artwork & Titles */}
          <div className="flex flex-col items-center w-full max-w-[480px]">
            {/* Lord Ganesha Line Art Artwork */}
            {style.decorations.showGaneshArt && (
              <div
                className={`mb-2 transition-transform duration-500 ${
                  animated ? 'animate-pulse-slow hover:scale-105' : ''
                }`}
              >
                <GaneshArtwork
                  style={style.ganeshStyle}
                  color={style.primaryTextColor}
                  size={104}
                />
              </div>
            )}

            {/* Small Script Heading (e.g. "Can’t cha Raja") */}
            {data.smallHeading && (
              <div
                className={`text-2xl sm:text-3xl text-amber-800/90 leading-tight mb-1 tracking-wide ${getScriptFontClass()}`}
                style={{
                  color: style.secondaryTextColor,
                }}
              >
                {data.smallHeading}
              </div>
            )}

            {/* VERY LARGE MAIN TITLE (e.g. "Ganesh Utsav") */}
            <h1
              className={`text-4xl sm:text-5xl md:text-[54px] font-bold tracking-normal leading-[1.1] my-1 uppercase drop-shadow-xs ${getMainFontClass()}`}
              style={{
                color: style.primaryTextColor,
              }}
            >
              {data.mainHeading}
            </h1>

            {/* YEAR (e.g. "2026") */}
            {data.year && (
              <div className="flex items-center justify-center gap-3 my-1">
                <span className="w-6 sm:w-10 h-[1px] bg-amber-700/40" />
                <span
                  className="font-festive-serif font-bold text-lg sm:text-xl tracking-[0.25em]"
                  style={{ color: style.accentGoldColor }}
                >
                  {data.year}
                </span>
                <span className="w-6 sm:w-10 h-[1px] bg-amber-700/40" />
              </div>
            )}

            {/* Description Text */}
            {data.description && (
              <p className="font-festive-serif italic text-sm sm:text-base md:text-[17px] leading-relaxed text-neutral-800/90 max-w-[340px] my-2 sm:my-2.5 px-2">
                {data.description}
              </p>
            )}
          </div>

          {/* Middle-Bottom Section: Date, Time, Venue, Location */}
          <div className="flex flex-col items-center w-full max-w-[420px] my-auto">
            {/* Elegant Floral Motif Divider */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-600/60" />
              <svg width="20" height="12" viewBox="0 0 24 14" fill="none">
                <path
                  d="M12 0 C14 4, 18 6, 24 7 C18 8, 14 10, 12 14 C10 10, 6 8, 0 7 C6 6, 10 4, 12 0 Z"
                  fill={style.accentGoldColor}
                />
              </svg>
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-600/60" />
            </div>

            {/* DATE (Emphasized, Uppercase) */}
            <div
              className="font-festive-heading font-extrabold text-xl sm:text-2xl tracking-[0.14em] leading-tight"
              style={{ color: style.primaryTextColor }}
            >
              {data.date}
            </div>

            {/* TIME */}
            <div
              className="font-festive-serif font-semibold text-base sm:text-lg tracking-[0.18em] my-1"
              style={{ color: style.secondaryTextColor }}
            >
              {data.time}
            </div>

            {/* Thin Divider */}
            <div
              className="w-14 h-[1.5px] my-2"
              style={{ backgroundColor: `${style.accentGoldColor}80` }}
            />

            {/* VENUE (Bold, Noticeable Immediately) */}
            <div
              className="font-festive-heading font-bold text-lg sm:text-xl md:text-2xl leading-snug"
              style={{ color: style.primaryTextColor }}
            >
              {data.venue}
            </div>

            {/* Additional Location (e.g. "Campus Gate No.3") */}
            {data.additionalLocation && (
              <div className="font-festive-serif font-medium text-sm sm:text-base text-neutral-800/90 mt-0.5">
                {data.additionalLocation}
              </div>
            )}

            {/* Location Description (e.g. Near Mandir) */}
            {data.locationDescription && (
              <div className="font-festive-serif text-xs sm:text-sm text-neutral-700/85 mt-1.5 whitespace-pre-line leading-snug">
                {data.locationDescription}
              </div>
            )}

            {/* Optional Details (Host, Family, Phone, RSVP) */}
            {(data.hostName || data.familyName || data.phoneNumber || data.rsvpText) && (
              <div className="mt-3 pt-2 border-t border-amber-800/15 w-full flex flex-col items-center gap-0.5 text-xs sm:text-sm font-festive-serif text-neutral-800">
                {(data.hostName || data.familyName) && (
                  <div className="font-semibold" style={{ color: style.secondaryTextColor }}>
                    {data.hostName && <span>Host: {data.hostName}</span>}
                    {data.hostName && data.familyName && <span> • </span>}
                    {data.familyName && <span>{data.familyName}</span>}
                  </div>
                )}
                {data.rsvpText && <div className="italic text-neutral-700">{data.rsvpText}</div>}
                {data.phoneNumber && (
                  <div className="text-neutral-600">Contact: {data.phoneNumber}</div>
                )}
              </div>
            )}

            {data.customMessage && (
              <div className="mt-2 text-xs italic text-neutral-600 max-w-[280px]">
                {data.customMessage}
              </div>
            )}
          </div>

          {/* Bottom Area Spacer so text sits naturally above bottom floral rangoli border */}
          <div className="h-6 sm:h-8" />
        </div>

        {/* 7. Bottom Decorative Floral / Rangoli Border */}
        {style.decorations.showBottomBorder && (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <BottomBorder
              palette={style.floralPalette}
              accentGold={style.accentGoldColor}
            />
          </div>
        )}
      </div>
    );
  }
);

InvitationCard.displayName = 'InvitationCard';
