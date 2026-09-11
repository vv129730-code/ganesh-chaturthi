import React, { useState, useEffect, useRef } from 'react';
import { InvitationData, StyleSettings } from '../types';
import { InvitationCard } from './invitation/InvitationCard';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Download,
  Video,
  Check,
  Loader2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { festiveAudio } from '../utils/audio';
import * as htmlToImage from 'html-to-image';

interface AnimatedInvitationProps {
  data: InvitationData;
  style: StyleSettings;
  onClose: () => void;
}

export const AnimatedInvitation: React.FC<AnimatedInvitationProps> = ({
  data,
  style,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const totalDuration = 12; // 12 seconds animation loop

  // Animation timeline progression
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            return 0; // loop seamlessly
          }
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  // Handle ambient sound with animation
  useEffect(() => {
    if (!isAudioMuted && isPlaying) {
      festiveAudio.start();
    } else {
      festiveAudio.stop();
    }
    return () => {
      festiveAudio.stop();
    };
  }, [isAudioMuted, isPlaying]);

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  // WebM / MP4 video recorder using canvas & MediaRecorder
  const handleRecordVideo = async () => {
    if (!cardRef.current || isRecording) return;
    setIsRecording(true);
    setRecordProgress(0);

    try {
      // Temporarily pause preview while capturing clean 12-second WebM clip
      const canvas = document.createElement('canvas');
      canvas.width = 720;
      canvas.height = 1280;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not create canvas context');

      const stream = canvas.captureStream(30); // 30 FPS
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm',
        videoBitsPerSecond: 4000000,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.mainHeading.replace(/\s+/g, '-')}-Animated-Invitation.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };

      recorder.start();

      // Render frames progressively for 5 seconds
      const cardEl = cardRef.current;
      const totalFrames = 60; // 2-3 sec capture for smooth mobile sharing
      for (let i = 0; i < totalFrames; i++) {
        const dataUrl = await htmlToImage.toPng(cardEl, { pixelRatio: 1.2, cacheBust: true });
        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve();
          };
          img.src = dataUrl;
        });
        setRecordProgress(Math.round(((i + 1) / totalFrames) * 100));
        await new Promise((r) => setTimeout(r, 60));
      }

      recorder.stop();
    } catch (err) {
      console.error('Video recording failed:', err);
      setIsRecording(false);
    }
  };

  // Calculate sequential reveal opacities based on currentTime
  // 0s-2s: Mandala + Frame
  // 2s-4s: Ganesha art reveals
  // 4s-6s: Titles reveal
  // 6s-8s: Date, Time & Venue
  // 8s-12s: Full card with floating flowers
  const isGaneshVisible = currentTime >= 0.5;
  const isTitleVisible = currentTime >= 1.5;
  const isDetailsVisible = currentTime >= 2.8;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-lg flex flex-col items-center justify-center p-4">
      {/* Top Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between pb-3 mb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            Animated Invitation Preview
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h2>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
        >
          Exit Preview
        </button>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-h-[82vh] overflow-hidden">
        {/* Animated Invitation Canvas with subtle sequential transitions */}
        <div className="relative w-full max-w-[340px] sm:max-w-[380px] shadow-2xl rounded-2xl overflow-hidden border border-amber-500/20">
          <div
            className={`transition-all duration-700 ${
              isGaneshVisible ? 'opacity-100 scale-100' : 'opacity-85 scale-[0.99]'
            }`}
          >
            <InvitationCard
              ref={cardRef}
              data={data}
              style={style}
              animated={true}
            />
          </div>
        </div>

        {/* Playback Controls & Info */}
        <div className="w-full max-w-[360px] bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-5 shadow-xl">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Festive Animation Sequence
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              12s Social Story Reel
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Featuring organic marigold swaying, soft pendulum lanterns, glowing diya light,
              and descending sacred petals.
            </p>
          </div>

          {/* Timeline Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-neutral-400 font-mono">
              <span>{currentTime.toFixed(1)}s</span>
              <span>{totalDuration}s</span>
            </div>
            <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-100"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>
          </div>

          {/* Play / Pause / Replay / Sound Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              title="Restart Animation"
              className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-neutral-950" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-neutral-950" />
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              onClick={toggleAudio}
              title={isAudioMuted ? 'Unmute temple bells' : 'Mute temple bells'}
              className={`p-3 rounded-xl border transition-colors ${
                !isAudioMuted
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400'
              }`}
            >
              {!isAudioMuted ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Export Video Button */}
          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <button
              onClick={handleRecordVideo}
              disabled={isRecording}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold text-xs border border-neutral-700 active:scale-98 transition-all disabled:opacity-50"
            >
              {isRecording ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Generating Video ({recordProgress}%)...</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>Export Video Reel (WebM)</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-neutral-400 text-center">
              Ideal for Instagram Stories & WhatsApp Status updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
