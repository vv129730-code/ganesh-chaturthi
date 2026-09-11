import React from 'react';
import { Sparkles, Film, Image as ImageIcon, Volume2, VolumeX } from 'lucide-react';
import { festiveAudio } from '../utils/audio';

interface HeaderProps {
  isAnimated: boolean;
  setIsAnimated: (val: boolean) => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAnimated,
  setIsAnimated,
  isAudioPlaying,
  setIsAudioPlaying,
}) => {
  const handleToggleAudio = () => {
    const newState = festiveAudio.togglePlay();
    setIsAudioPlaying(newState);
  };

  return (
    <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Brand & Titles */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-bold">
              ॐ
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2 font-festive-serif">
              Create Your Festive Invitation
            </h1>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Ganesh Utsav 2026
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-0.5 font-sans">
            Design a premium Indian invitation in minutes.
          </p>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Vakratunda Mahakaya Background Mantra Audio Button */}
          <button
            id="header-audio-toggle-btn"
            onClick={handleToggleAudio}
            title={isAudioPlaying ? 'Pause sacred Vakratunda Mahakaya mantra' : 'Play sacred Vakratunda Mahakaya mantra'}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
              isAudioPlaying
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-xs'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline font-festive-serif">॥ वक्रतुण्ड मंत्र ॥</span>
                <span className="sm:hidden font-festive-serif">मंत्र 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-festive-serif">वक्रतुण्ड मंत्र</span>
                <span className="sm:hidden font-festive-serif">मंत्र</span>
              </>
            )}
          </button>

          {/* Mode Switcher: Static vs Animated */}
          <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setIsAnimated(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !isAnimated
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Static Design</span>
            </button>
            <button
              onClick={() => setIsAnimated(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isAnimated
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span className="flex items-center gap-1">
                Animated Mode
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
