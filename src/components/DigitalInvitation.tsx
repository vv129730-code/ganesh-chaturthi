import React, { useState, useEffect, useRef } from 'react';
import { GaneshArtwork } from './invitation/GaneshArtwork';
import { FloralCanopy } from './invitation/FloralCanopy';
import { SideGarlands } from './invitation/SideGarlands';
import { HangingLanterns } from './invitation/HangingLanterns';
import { MandalaBackground } from './invitation/MandalaBackground';
import { BottomBorder } from './invitation/BottomBorder';
import { FloatingPetals } from './invitation/FloatingPetals';
import { AnimatedDiya } from './invitation/AnimatedDiya';
import { OrnateDivider } from './invitation/OrnateDivider';
import { festiveAudio } from '../utils/audio';

// Custom hook for scroll-triggered reveal animations via IntersectionObserver
function useScrollReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.12,
  rootMargin = '0px 0px -35px 0px'
) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (isRevealed) return;
    const el = ref.current;
    if (!el) return;

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setIsRevealed(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isRevealed, threshold, rootMargin]);

  return { ref, isRevealed };
}

export const DigitalInvitation: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [initialEntrance, setInitialEntrance] = useState<boolean>(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Subscribe to audio playback state updates
  useEffect(() => {
    const unsubscribe = festiveAudio.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [hasCustomAudio, setHasCustomAudio] = useState(false);
  const [audioUploadSuccess, setAudioUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if custom audio is already saved in persistent storage
    import('../utils/audioStorage').then(({ loadSavedAudioBlob }) => {
      loadSavedAudioBlob().then((blob) => {
        if (blob && blob.size > 0) {
          setHasCustomAudio(true);
        }
      });
    });

    // Default audio should start playing immediately
    festiveAudio.start();
  }, []);

  const handleCustomAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await festiveAudio.saveAndSetCustomAudio(file);
      setHasCustomAudio(true);
      setAudioUploadSuccess(true);
      festiveAudio.start();
      setTimeout(() => setAudioUploadSuccess(false), 4000);
    }
  };

  // Subtle scroll listener for smooth parallax layers
  useEffect(() => {
    setInitialEntrance(true);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax offsets (very gentle, subtle depth)
  const mandalaOffset = prefersReducedMotion ? 0 : scrollY * 0.04;
  const mandalaRotate = prefersReducedMotion ? 0 : scrollY * 0.012;
  const canopyOffset = prefersReducedMotion ? 0 : scrollY * 0.035;
  const lanternsOffset = prefersReducedMotion ? 0 : scrollY * 0.07;
  const garlandsOffset = prefersReducedMotion ? 0 : scrollY * 0.025;

  const handleAudioToggle = () => {
    const isNowPlaying = festiveAudio.togglePlay();
    setIsPlayingAudio(isNowPlaying);
  };

  const handleScrollToExplore = () => {
    const target = document.getElementById('section-shlok');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Ganpati cha Raja - Ganesh Utsav 2026 Invitation',
      text: `॥ श्री गणेशाय नमः ॥\n\nवक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥\n\nGanpati cha Raja\nGANESH UTSAV 2026\n\nआप सादर आमंत्रित हैं\n\nWe are celebrating Ganesh Utsav at our place. Please grace this auspicious occasion with your presence and blessings.\n\n📅 DATE: 14 SEPTEMBER 2026 (Auspicious Ganesh Chaturthi Day)\n⏰ TIME: AT 7:00 PM (Evening Grand Aarti & Darshan)\n📍 VENUE: 33 Cantt Kanpur Club\n🚪 LOCATION: Campus Gate No. 3\n🛕 Ganesh Utsav celebrated near Shidd Peeth Durga Dham Mandir\n🗺️ MAP: https://maps.app.goo.gl/hRqRtN8v1yEMVtu87\n\n“आप सभी सपरिवार सादर आमंत्रित हैं।”\n\n“Your gracious presence will make this auspicious celebration even more special.”\n\nWith warm regards,\nFamily & Friends\n\nगणपति बप्पा मोरया 🙏`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.text}\n\nDigital Invitation: ${shareData.url}`
        );
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 3000);
      } catch {
        // Clipboard fallback
      }
    }
  };

  const googleMapsUrl = 'https://maps.app.goo.gl/hRqRtN8v1yEMVtu87';

  // Section reveal observers for progressive staggered entrance via IntersectionObserver
  const openingSection = useScrollReveal<HTMLElement>(0.05, '0px 0px 0px 0px');
  const shlokSection = useScrollReveal<HTMLElement>(0.12);
  const invitationSection = useScrollReveal<HTMLElement>(0.12);
  const dateSection = useScrollReveal<HTMLElement>(0.12);
  const timeSection = useScrollReveal<HTMLElement>(0.12);
  const venueSection = useScrollReveal<HTMLElement>(0.12);
  const locationSection = useScrollReveal<HTMLElement>(0.12);
  const closingSection = useScrollReveal<HTMLElement>(0.1);
  const finalMomentSection = useScrollReveal<HTMLElement>(0.1);

  // Helper for scroll reveal animation classes (fade and slight translateY)
  const getSectionRevealClass = (isRevealed: boolean, extraClasses = '') => {
    if (prefersReducedMotion) {
      return `opacity-100 translate-y-0 ${extraClasses}`;
    }
    return `transition-all duration-700 ease-out will-change-transform ${
      isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    } ${extraClasses}`;
  };

  return (
    <main
      id="invitation-page-container"
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-900"
      style={{
        backgroundColor: '#F8F4EC',
        backgroundImage:
          'radial-gradient(ellipse at 50% 30%, #FFFDF8 0%, #FAF5EB 45%, #F0E8D6 100%)',
      }}
    >
      {/* Background warm golden radiance */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(212,148,42,0.06)_0%,transparent_70%)]" />

      {/* Floating Petals across the viewport (3–8 gentle petals) */}
      <FloatingPetals visible={true} />

      {/* Floating Vakratunda Mahakaya devotional background music control (top-right) */}
      <aside
        aria-label="Background devotional mantra audio"
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-1.5"
      >
        <button
          id="audio-toggle-btn"
          type="button"
          onClick={handleAudioToggle}
          aria-label={isPlayingAudio ? 'Pause Vakratunda Mahakaya mantra' : 'Play Vakratunda Mahakaya mantra'}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer select-none border ${
            isPlayingAudio
              ? 'bg-[#5B101E] border-[#F3C068]/70 text-[#FFF5E0] shadow-[#5B101E]/40 animate-none'
              : 'bg-[#FAF5EB]/95 hover:bg-[#F4ECE0] border-[#D4942A]/60 text-[#6D2836] ring-2 ring-[#D4942A]/20'
          }`}
          title={isPlayingAudio ? 'Pause Vakratunda Mahakaya Mantra' : 'Play Sacred Vakratunda Mahakaya Mantra'}
        >
          {isPlayingAudio ? (
            <>
              {/* Animated Sound Equalizer Bars */}
              <span className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
                <span className="w-0.5 bg-[#F3C068] h-full animate-[pulse_0.7s_ease-in-out_infinite] rounded-full" />
                <span className="w-0.5 bg-[#F3C068] h-2/3 animate-[pulse_0.5s_ease-in-out_infinite_0.2s] rounded-full" />
                <span className="w-0.5 bg-[#F3C068] h-4/5 animate-[pulse_0.9s_ease-in-out_infinite_0.4s] rounded-full" />
              </span>
              <span className="font-festive-serif tracking-wider font-semibold text-[11px] sm:text-xs">
                ॥ वक्रतुण्ड महाकाय ॥
              </span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5 text-[#B87B1A] animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-festive-serif tracking-wider text-[11px] sm:text-xs text-[#7A2A38] font-semibold">
                ▶ मंत्र बजाएं
              </span>
            </>
          )}
        </button>

        {/* Audio File Input for Custom Upload: shown only if not yet uploaded */}
        {!hasCustomAudio && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              aria-label="Upload custom audio file"
              className="hidden"
              onChange={handleCustomAudioUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload custom background audio (Permanently saved)"
              aria-label="Upload custom background audio"
              className="flex items-center gap-1 py-1.5 px-2.5 rounded-full bg-[#FAF5EB]/95 hover:bg-[#F4ECE0] border border-[#D4942A]/50 text-[#7A2A38] hover:text-[#52121E] shadow-xs transition-all active:scale-95 cursor-pointer text-[10px] font-festive-serif"
            >
              <svg className="w-3 h-3 text-[#B87B1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Set Audio</span>
            </button>
          </>
        )}
      </aside>

      {/* Audio Saved Notification */}
      {audioUploadSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-14 z-50 px-4 py-2 bg-[#FFF8ED] border border-[#D4942A]/60 text-[#741124] text-xs font-festive-serif tracking-wider rounded-full shadow-lg transition-all animate-fade-in"
        >
          🎵 Audio permanently set & saved! Upload button removed.
        </div>
      )}

      {/* Clipboard copied toast feedback */}
      {copiedNotification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-14 z-50 px-4 py-2 bg-[#FFF8ED] border border-[#D4942A]/60 text-[#741124] text-xs font-festive-serif tracking-wider rounded-full shadow-lg transition-all animate-fade-in"
        >
          ✨ Invitation details copied to clipboard
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTINUOUS SCROLLABLE INVITATION CARD (MOBILE-FIRST: FULL PHONE SCREEN)   */}
      {/* ========================================================================= */}
      <div
        id="digital-invitation-card"
        className="relative w-full max-w-[500px] mx-auto overflow-hidden select-none bg-[#FFF8EB] text-[#741124] sm:my-3 sm:rounded-sm shadow-[0_20px_60px_-15px_rgba(150,85,20,0.22),0_4px_20px_-2px_rgba(110,50,10,0.08),0_0_0_1px_rgba(212,148,42,0.35)]"
      >
        {/* Authentic paper grain texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#8A5812_0.75px,transparent_0.75px)] [background-size:10px_10px]" />

        {/* Continuous Inset Double Hairline Gold Border */}
        <div className="absolute inset-2 sm:inset-3 border border-[#D4942A]/60 pointer-events-none z-20">
          <div className="absolute inset-[3px] border border-[#D4942A]/35" />

          {/* Traditional Corner Flourishes */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#D4942A]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#D4942A]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#D4942A]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#D4942A]" />
        </div>

        {/* PARALLAX LAYER 1: Top Marigold Floral Canopy */}
        <div
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${canopyOffset}px)`,
          }}
        >
          <FloralCanopy palette="orange-yellow" animated={!prefersReducedMotion} />
        </div>

        {/* PARALLAX LAYER 2: Side Floral Garlands */}
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${garlandsOffset}px)`,
          }}
        >
          <SideGarlands palette="orange-yellow" animated={!prefersReducedMotion} />
        </div>

        {/* PARALLAX LAYER 3: Hanging Lanterns */}
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${lanternsOffset}px)`,
          }}
        >
          <HangingLanterns animated={!prefersReducedMotion} />
        </div>

        {/* PARALLAX LAYER 4: Sacred Mandala Background Watermark */}
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-60 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(-50%, calc(-50% + ${mandalaOffset}px)) rotate(${mandalaRotate}deg)`,
          }}
        >
          <MandalaBackground color="#D4942A" animated={false} />
        </div>

        {/* ========================================================================= */}
        {/* 1. DEVOTIONAL OPENING (Spacious initial landing hero with Ganesh title)   */}
        {/* ========================================================================= */}
        <section
          id="section-opening"
          ref={openingSection.ref}
          className={getSectionRevealClass(
            openingSection.isRevealed || initialEntrance,
            'relative z-10 w-full min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-between items-center text-center px-6 sm:px-10 pt-[20%] pb-6'
          )}
        >
          {/* Top Mantra & Ganesh Artwork */}
          <div
            className={`flex flex-col items-center w-full transition-all duration-1000 ease-out ${
              initialEntrance ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
            }`}
          >
            {/* Mantra: ॥ श्री गणेशाय नमः ॥ */}
            <div className="flex items-center justify-center gap-2 mb-2 opacity-95">
              <span className="text-[#D4942A] text-xs select-none">✦</span>
              <p className="font-devanagari text-base sm:text-lg font-bold tracking-[0.16em] text-[#741124] select-text">
                ॥ श्री गणेशाय नमः ॥
              </p>
              <span className="text-[#D4942A] text-xs select-none">✦</span>
            </div>

            {/* Traditional Lord Ganesha Line Artwork */}
            <div
              id="invitation-ganesh-artwork"
              className="relative flex items-center justify-center my-2"
            >
              {/* Sacred halo glow */}
              <div className="absolute inset-0 bg-[#FFA726]/20 rounded-full blur-md pointer-events-none scale-105" />
              <GaneshArtwork
                style="traditional-line-art"
                color="#741124"
                size={88}
                className="relative z-10 mx-auto transition-transform hover:scale-102"
              />
            </div>
          </div>

          {/* Main Title Group */}
          <div
            className={`flex flex-col items-center w-full my-auto py-2 transition-all duration-1000 delay-200 ease-out ${
              initialEntrance ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.98]'
            }`}
          >
            {/* "Ganpati cha Raja" */}
            <p className="font-script-small text-3xl sm:text-4xl text-[#741124] tracking-wide leading-none -mb-1 select-text">
              Ganpati cha Raja
            </p>

            {/* "Ganesh Utsav" */}
            <h1 className="font-marathi-brush text-4xl sm:text-5xl md:text-6xl font-bold text-[#741124] uppercase tracking-tight leading-[1.06] my-1 drop-shadow-2xs select-text">
              Ganesh Utsav
            </h1>

            {/* "2026" with Fine Golden Accent Rules */}
            <div className="flex items-center justify-center gap-3 w-full max-w-[220px] my-1">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4942A] to-[#D4942A]" />
              <span className="font-festive-display text-lg sm:text-xl font-bold tracking-[0.25em] text-[#B87B1A] select-text">
                2026
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4942A] to-[#D4942A]" />
            </div>
          </div>

          {/* Bottom "Scroll to explore ↓" Animated Indicator */}
          <button
            type="button"
            onClick={handleScrollToExplore}
            aria-label="Scroll to explore invitation"
            className="group flex flex-col items-center gap-1 mt-auto pt-2 pb-1 text-[#741124] select-none cursor-pointer focus:outline-hidden"
          >
            <span className="font-festive-serif text-xs tracking-[0.24em] uppercase font-semibold text-[#8C3A48] group-hover:text-[#741124] transition-colors">
              Scroll to explore
            </span>
            <svg
              className="w-4 h-4 text-[#B87B1A] animate-bounce-subtle"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* ========================================================================= */}
        {/* 2. DEVOTIONAL SHLOK & BHAVARTH SECTION (Compact, Rich, Devotional)        */}
        {/* ========================================================================= */}
        <section
          id="section-shlok"
          ref={shlokSection.ref}
          className={getSectionRevealClass(
            shlokSection.isRevealed,
            'relative z-10 w-full px-6 sm:px-10 py-6 sm:py-8 flex flex-col items-center text-center'
          )}
        >
          <div className="w-full max-w-[380px] flex flex-col items-center">
            {/* Top Ornamental Divider */}
            <OrnateDivider variant="diya" isRevealed={shlokSection.isRevealed} />

            {/* Sacred Sanskrit Shlok with Two Flanking Diyas */}
            <div
              className={`relative w-full flex items-center justify-center gap-3 my-2 transition-all duration-800 ease-out ${
                shlokSection.isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-5 scale-[0.98]'
              }`}
            >
              {/* Left Diya */}
              <AnimatedDiya size={32} className="hidden sm:inline-flex opacity-85" />

              {/* Shlok Verses */}
              <div className="flex-1 bg-[#FAF4E6]/60 rounded-lg p-3 border border-[#D4942A]/25 shadow-2xs">
                <p className="font-devanagari text-base sm:text-lg font-bold text-[#741124] leading-relaxed tracking-wide select-text">
                  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।
                  <br />
                  निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                </p>
              </div>

              {/* Right Diya */}
              <AnimatedDiya size={32} className="hidden sm:inline-flex opacity-85" />
            </div>

            {/* Mobile Single Centered Diya */}
            <div className="sm:hidden my-1">
              <AnimatedDiya size={28} />
            </div>

            {/* BHAVARTH (Devotional Detail) */}
            <div
              className={`w-full bg-[#FAF5EB]/90 rounded-md p-3 mt-2 border border-[#D4942A]/20 transition-all duration-800 delay-200 ease-out ${
                shlokSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Small "भावार्थ" badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF8ED] border border-[#D4942A]/30 mb-1.5">
                <span className="w-1 h-1 rounded-full bg-[#D4942A]" />
                <span className="font-devanagari text-[11px] font-bold tracking-wider text-[#8A4A28] uppercase">
                  भावार्थ
                </span>
                <span className="w-1 h-1 rounded-full bg-[#D4942A]" />
              </div>

              <p className="font-festive-serif italic text-xs sm:text-sm text-[#632014] leading-relaxed select-text font-medium">
                “हे गणेश जी, आप विशाल शरीर और करोड़ों सूर्यों के समान तेजस्वी हैं। मेरे सभी शुभ कार्यों को बिना किसी विघ्न के पूर्ण करें।”
              </p>
            </div>

            <OrnateDivider variant="lotus" isRevealed={shlokSection.isRevealed} className="mt-4" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INVITATION INTRO & DEVOTIONAL CHANT (Seamlessly continuous flow)       */}
        {/* ========================================================================= */}
        <section
          id="section-invitation-intro"
          ref={invitationSection.ref}
          className={getSectionRevealClass(
            invitationSection.isRevealed,
            'relative z-10 w-full px-6 sm:px-10 py-6 sm:py-8 flex flex-col items-center text-center'
          )}
        >
          <div className="w-full max-w-[380px] flex flex-col items-center">
            {/* Welcoming Line: "आप सादर आमंत्रित हैं" */}
            <h2
              className={`font-devanagari text-xl sm:text-2xl font-bold tracking-wide text-[#741124] transition-all duration-700 ease-out ${
                invitationSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              आप सादर आमंत्रित हैं
            </h2>

            {/* Fine accent line */}
            <div className="w-10 h-[1.5px] bg-[#D4942A]/70 my-2" />

            {/* English Invitation Message */}
            <p
              className={`font-festive-serif italic text-base sm:text-lg leading-relaxed text-[#5A1620] font-medium my-1 select-text transition-all duration-800 delay-150 ease-out ${
                invitationSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              We are celebrating Ganesh Utsav at our place.
              <br />
              Please grace this auspicious occasion with your
              <br />
              presence and blessings.
            </p>

            {/* DEVOTIONAL INTERLUDE: "गणपति बप्पा मोरया 🙏" */}
            <div
              className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0D8]/70 border border-[#D4942A]/40 shadow-2xs transition-all duration-800 delay-300 ease-out ${
                invitationSection.isRevealed
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            >
              <span className="text-xs text-[#D4942A]">✦</span>
              <p className="font-devanagari text-sm sm:text-base font-bold text-[#741124] tracking-wider select-text">
                गणपति बप्पा मोरया 🙏
              </p>
              <span className="text-xs text-[#D4942A]">✦</span>
            </div>

            <OrnateDivider variant="star" isRevealed={invitationSection.isRevealed} className="mt-5" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. EVENT DETAILS: DATE (With Circular Mandala & Gold Particle Aura)       */}
        {/* ========================================================================= */}
        <section
          id="section-date"
          ref={dateSection.ref}
          className={getSectionRevealClass(
            dateSection.isRevealed,
            'relative z-10 w-full px-6 sm:px-10 py-5 sm:py-7 flex flex-col items-center text-center'
          )}
        >
          <div className="relative w-full max-w-[360px] flex flex-col items-center py-2">
            {/* Circular Decorative Mandala Watermark behind the Date */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-20 transition-all duration-1000 ${
                dateSection.isRevealed ? 'scale-100 rotate-45' : 'scale-75 rotate-0'
              }`}
            >
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#D4942A]">
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 4" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <path
                    key={`d-mandala-${i}`}
                    d="M100 15 C105 35, 110 50, 100 65 C90 50, 95 35, 100 15 Z"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    transform={`rotate(${(i * 360) / 12} 100 100)`}
                  />
                ))}
              </svg>
            </div>

            {/* DATE Label */}
            <span
              className={`relative z-10 font-sans-ui text-xs tracking-[0.28em] text-[#B87B1A] uppercase font-bold transition-all duration-700 ease-out ${
                dateSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              DATE
            </span>

            {/* Date Value: 14 SEPTEMBER 2026 */}
            <p
              className={`relative z-10 font-festive-heading text-2xl sm:text-3xl font-bold tracking-[0.14em] text-[#741124] uppercase leading-tight mt-1.5 select-text transition-all duration-800 delay-150 ease-out ${
                dateSection.isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-[0.96]'
              }`}
            >
              14 SEPTEMBER 2026
            </p>

            {/* "AUSPICIOUS GANESH CHATURTHI DAY" */}
            <div
              className={`relative z-10 flex items-center justify-center gap-1.5 mt-1.5 transition-all duration-800 delay-300 ease-out ${
                dateSection.isRevealed ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <span className="w-1 h-1 rounded-full bg-[#D4942A]" />
              <p className="font-festive-serif text-xs font-semibold text-[#8A4A28] tracking-[0.2em] uppercase select-text">
                AUSPICIOUS GANESH CHATURTHI DAY
              </p>
              <span className="w-1 h-1 rounded-full bg-[#D4942A]" />
            </div>

            <OrnateDivider variant="diya" isRevealed={dateSection.isRevealed} className="mt-4" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. EVENT DETAILS: TIME (With Aarti Glow & Animated Diya)                  */}
        {/* ========================================================================= */}
        <section
          id="section-time"
          ref={timeSection.ref}
          className={getSectionRevealClass(
            timeSection.isRevealed,
            'relative z-10 w-full px-6 sm:px-10 py-5 sm:py-7 flex flex-col items-center text-center'
          )}
        >
          <div className="relative w-full max-w-[360px] flex flex-col items-center py-2">
            {/* Soft Warm Golden Glow behind the time */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-16 bg-amber-400/20 rounded-full blur-lg pointer-events-none transition-opacity duration-1000 ${
                timeSection.isRevealed ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* TIME Label */}
            <span
              className={`relative z-10 font-sans-ui text-xs tracking-[0.28em] text-[#B87B1A] uppercase font-bold transition-all duration-700 ease-out ${
                timeSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              TIME
            </span>

            {/* Time Value: AT 7:00 PM */}
            <p
              className={`relative z-10 font-festive-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#741124] uppercase mt-1.5 select-text transition-all duration-800 delay-150 ease-out ${
                timeSection.isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-[0.96]'
              }`}
            >
              AT 7:00 PM
            </p>

            {/* "EVENING GRAND AARTI & DARSHAN" Flanked by Aarti Diya */}
            <div
              className={`relative z-10 flex items-center justify-center gap-2 mt-2 transition-all duration-800 delay-300 ease-out ${
                timeSection.isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <AnimatedDiya size={26} glow={true} />
              <p className="font-festive-serif text-xs font-semibold text-[#8A4A28] tracking-[0.2em] uppercase select-text">
                EVENING GRAND AARTI &amp; DARSHAN
              </p>
              <AnimatedDiya size={26} glow={true} />
            </div>

            <OrnateDivider variant="lotus" isRevealed={timeSection.isRevealed} className="mt-4" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. EVENT DETAILS: VENUE (With Ornate Illustrated Gate / Club Icon)        */}
        {/* ========================================================================= */}
        <section
          id="section-venue"
          ref={venueSection.ref}
          className={getSectionRevealClass(
            venueSection.isRevealed,
            'relative z-10 w-full px-6 sm:px-10 py-6 sm:py-8 flex flex-col items-center text-center'
          )}
        >
          <div className="w-full max-w-[380px] flex flex-col items-center">
            {/* Illustrated Royal Gate / Venue Arch Icon */}
            <div
              className={`w-12 h-12 rounded-full bg-[#FAF2DC] border border-[#D4942A]/45 flex items-center justify-center shadow-xs mb-2 transition-all duration-700 ease-out ${
                venueSection.isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-[#8C4E0A]">
                {/* Royal Toran Arch */}
                <path d="M4 25 V9 C4 6, 8 4, 14 4 C20 4, 24 6, 24 9 V25" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7 25 V12 C7 9, 10 7, 14 7 C18 7, 21 9, 21 12 V25" stroke="#D4942A" strokeWidth="1.2" />
                {/* Gate Pillars & Finials */}
                <circle cx="14" cy="2.5" r="1.5" fill="#D4942A" />
                <line x1="2" y1="25" x2="26" y2="25" stroke="currentColor" strokeWidth="1.8" />
                {/* Hanging Lantern motif */}
                <path d="M14 8 V13" stroke="#D4942A" strokeWidth="1.2" />
                <circle cx="14" cy="14" r="1.5" fill="#C27A1A" />
              </svg>
            </div>

            {/* VENUE Label */}
            <span
              className={`font-sans-ui text-xs tracking-[0.28em] text-[#B87B1A] uppercase font-bold transition-all duration-700 delay-100 ease-out ${
                venueSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              VENUE
            </span>

            {/* Venue Name: 33 Cantt Kanpur Club */}
            <p
              className={`font-festive-heading text-2xl sm:text-3xl font-bold text-[#741124] tracking-wide leading-tight mt-1 select-text transition-all duration-800 delay-200 ease-out ${
                venueSection.isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-[0.98]'
              }`}
            >
              33 Cantt Kanpur Club
            </p>

            {/* Campus Gate No. 3 */}
            <p
              className={`font-festive-serif text-base sm:text-lg font-semibold text-[#5A1620] tracking-wider mt-1 select-text transition-all duration-800 delay-350 ease-out ${
                venueSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              Campus Gate No. 3
            </p>

            <OrnateDivider variant="star" isRevealed={venueSection.isRevealed} className="mt-4" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. LOCATION & MANDIR DARSHAN (With Mandir landmark & Family invite)       */}
        {/* ========================================================================= */}
        <section
          id="section-location"
          ref={locationSection.ref}
          className={getSectionRevealClass(
            locationSection.isRevealed,
            'relative z-10 w-full px-6 sm:px-10 py-6 sm:py-8 flex flex-col items-center text-center'
          )}
        >
          <div className="w-full max-w-[380px] flex flex-col items-center">
            {/* Golden Temple / Location Pin Badge */}
            <div
              className={`w-10 h-10 rounded-full bg-[#FAF0D8] border border-[#D4942A]/50 flex items-center justify-center shadow-xs mb-2 transition-all duration-700 ease-out ${
                locationSection.isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <svg
                className="w-5 h-5 text-[#B87B1A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {/* Landmark Context */}
            <p
              className={`font-festive-serif text-sm sm:text-base text-[#7A3A28] font-medium tracking-wide transition-all duration-800 delay-100 ease-out ${
                locationSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              Ganesh Utsav celebrated near
            </p>

            {/* Mandir Name: Shidd Peeth Durga Dham Mandir */}
            <p
              className={`font-festive-heading text-xl sm:text-2xl font-bold text-[#741124] tracking-wide leading-snug mt-1 max-w-[310px] select-text transition-all duration-800 delay-250 ease-out ${
                locationSection.isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-[0.98]'
              }`}
            >
              Shidd Peeth Durga Dham
              <br />
              Mandir
            </p>

            {/* DEVOTIONAL INVITATION BLESSING: "आप सभी सपरिवार सादर आमंत्रित हैं।" */}
            <div
              className={`w-full bg-[#FAF3E3]/80 rounded-md py-2 px-3 mt-3 border border-[#D4942A]/30 transition-all duration-800 delay-350 ease-out ${
                locationSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              <p className="font-devanagari text-base sm:text-lg font-bold text-[#741124] tracking-wide select-text">
                आप सभी सपरिवार सादर आमंत्रित हैं।
              </p>
            </div>

            {/* Minimal "View Location" Button */}
            <div
              className={`mt-4 transition-all duration-800 delay-450 ease-out ${
                locationSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                id="view-location-btn"
                href="https://maps.app.goo.gl/hRqRtN8v1yEMVtu87"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-[#FAF5EB] hover:bg-[#F3EAD8] border border-[#D4942A]/45 hover:border-[#D4942A]/70 text-[#6D2836] hover:text-[#52121E] text-xs sm:text-sm font-festive-serif tracking-wider shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <span className="text-xs">📍</span>
                <span className="font-semibold">View Location</span>
              </a>
            </div>

            {/* DEVOTIONAL LINE: "सुखकर्ता दुःखहर्ता, वार्ता विघ्नाची…" */}
            <p
              className={`font-devanagari text-xs sm:text-sm text-[#8C4E0A] tracking-wider mt-4 opacity-80 select-text transition-all duration-800 delay-550 ease-out ${
                locationSection.isRevealed ? 'opacity-85 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              “ सुखकर्ता दुःखहर्ता, वार्ता विघ्नाची… ”
            </p>

            <OrnateDivider variant="diya" isRevealed={locationSection.isRevealed} className="mt-4" />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. FINAL BLESSINGS & WARM REGARDS                                         */}
        {/* ========================================================================= */}
        <section
          id="section-final-blessing"
          ref={closingSection.ref}
          className={getSectionRevealClass(
            closingSection.isRevealed,
            'relative z-10 w-full px-6 sm:px-10 py-6 sm:py-8 flex flex-col items-center text-center'
          )}
        >
          <div className="w-full max-w-[380px] flex flex-col items-center">
            {/* Devotional Line 1: "गणपति बप्पा मोरया" */}
            <p
              className={`font-devanagari text-lg sm:text-xl font-bold text-[#741124] tracking-widest transition-all duration-700 ease-out ${
                closingSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              गणपति बप्पा मोरया
            </p>

            {/* Fine Golden Divider */}
            <div className="w-8 h-[1px] bg-[#D4942A]/60 my-2" />

            {/* Closing Sentiment */}
            <p
              className={`font-festive-serif italic text-base sm:text-lg leading-relaxed text-[#5A1620] font-medium max-w-[330px] select-text transition-all duration-800 delay-150 ease-out ${
                closingSection.isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-[0.98]'
              }`}
            >
              “Your gracious presence will make this
              <br />
              auspicious celebration even more special.”
            </p>

            {/* Fine Golden Star */}
            <div
              className={`w-1.5 h-1.5 rounded-full bg-[#D4942A]/70 my-3 transition-opacity duration-700 delay-250 ${
                closingSection.isRevealed ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* "With warm regards" */}
            <p
              className={`font-festive-serif italic text-sm sm:text-base text-[#7A3620] select-text transition-all duration-800 delay-350 ease-out ${
                closingSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              With warm regards
            </p>

            {/* "Family & Friends" */}
            <p
              className={`font-festive-heading text-xl sm:text-2xl font-bold tracking-wider text-[#741124] mt-0.5 select-text transition-all duration-800 delay-450 ease-out ${
                closingSection.isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-[0.98]'
              }`}
            >
              Family &amp; Friends
            </p>

            {/* Minimal Share Button */}
            <div
              className={`mt-5 transition-all duration-800 delay-600 ease-out ${
                closingSection.isRevealed
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                id="share-invitation-btn"
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-[#FAF5EB] hover:bg-[#F3EAD8] border border-[#D4942A]/45 hover:border-[#D4942A]/70 text-[#6D2836] hover:text-[#52121E] text-xs sm:text-sm font-festive-serif tracking-wider shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5 text-[#B87B1A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span className="font-semibold">Share Invitation</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FINAL SACRED DIYA & GANESH CLOSING SCENE (Peaceful, Sacred Conclusion) */}
        {/* ========================================================================= */}
        <section
          id="section-final-moment"
          ref={finalMomentSection.ref}
          className={getSectionRevealClass(
            finalMomentSection.isRevealed,
            'relative z-10 w-full px-6 sm:px-10 pt-4 pb-8 flex flex-col items-center text-center'
          )}
        >
          <div
            className={`w-full max-w-[340px] flex flex-col items-center transition-all duration-1000 ease-out ${
              finalMomentSection.isRevealed
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-6 scale-[0.98]'
            }`}
          >
            {/* Sacred Center Piece: Lord Ganesh Symbol Flanked by Two Glowing Diyas */}
            <div className="relative flex items-center justify-center gap-4 my-2">
              {/* Left Diya */}
              <AnimatedDiya size={36} glow={true} />

              {/* Center Small Sacred Ganesh Symbol with Warm Radial Glow */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 w-12 h-12 bg-amber-400/25 rounded-full blur-md pointer-events-none" />
                <GaneshArtwork
                  style="traditional-line-art"
                  color="#741124"
                  size={48}
                  className="relative z-10"
                />
              </div>

              {/* Right Diya */}
              <AnimatedDiya size={36} glow={true} />
            </div>

            {/* Sacred Closing Blessing: "॥ मंगलमूर्ति मोरया ॥" */}
            <p className="font-devanagari text-lg sm:text-xl font-bold tracking-[0.16em] text-[#741124] mt-2 select-text">
              ॥ मंगलमूर्ति मोरया ॥
            </p>

            <p className="font-festive-serif text-xs text-[#965A28] tracking-widest uppercase mt-1">
              May Lord Ganesha Bless You With Peace, Prosperity &amp; Joy
            </p>
          </div>

          {/* Bottom Traditional Golden Lotus Rangoli Border */}
          <div className="w-full pointer-events-none mt-6 select-none">
            <BottomBorder palette="orange-yellow" accentGold="#D4942A" />
          </div>
        </section>
      </div>
    </main>
  );
};
