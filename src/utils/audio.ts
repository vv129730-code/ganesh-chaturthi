import { loadSavedAudioBlob, saveAudioBlob } from './audioStorage';

// Festive Devotional Background Audio Controller
// Plays the authentic "Vakratunda Mahakaya" sacred chant or user's permanently uploaded audio
class FestiveAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private audioSrc: string = '/audio/vakratunda.mp3';
  private hasCustomAudio: boolean = false;
  private isPlaying: boolean = false;
  private isManuallyMuted: boolean = false;
  private volume: number = 0.95;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private objectUrlToRevoke: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
      this.loadSavedCustomAudio();
      this.setupAutoPlayAndUnlock();
    }
  }

  private async loadSavedCustomAudio() {
    try {
      const savedBlob = await loadSavedAudioBlob();
      if (savedBlob && savedBlob.size > 0) {
        if (this.objectUrlToRevoke) {
          try {
            URL.revokeObjectURL(this.objectUrlToRevoke);
          } catch {
            // Ignore
          }
        }
        const url = URL.createObjectURL(savedBlob);
        this.objectUrlToRevoke = url;
        this.audioSrc = url;
        this.hasCustomAudio = true;
        if (this.audioElement) {
          this.audioElement.src = url;
          this.audioElement.load();
          if (!this.isManuallyMuted) {
            this.playAudioDirect();
          }
        }
      }
    } catch (err) {
      console.warn('Failed to load saved custom audio:', err);
    }
  }

  private initAudioElement() {
    try {
      if (!this.audioElement) {
        this.audioElement = new Audio();
      }
      this.audioElement.src = this.audioSrc;
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;
      this.audioElement.preload = 'auto';

      this.audioElement.onplay = () => {
        this.isPlaying = true;
        this.notify();
      };

      this.audioElement.onpause = () => {
        if (!this.audioElement?.seeking) {
          this.isPlaying = false;
          this.notify();
        }
      };

      this.audioElement.onended = () => {
        if (!this.isManuallyMuted && this.audioElement) {
          this.audioElement.currentTime = 0;
          this.playAudioDirect();
        } else {
          this.isPlaying = false;
          this.notify();
        }
      };

      this.audioElement.onerror = (e) => {
        console.warn('Audio file playback failed:', e);
      };
    } catch (err) {
      console.warn('Audio element initialization error:', err);
    }
  }

  private playAudioDirect(): Promise<void> {
    if (!this.audioElement) {
      this.initAudioElement();
    }
    if (!this.audioElement) return Promise.resolve();

    if (!this.audioElement.src || this.audioElement.src === window.location.href) {
      this.audioElement.src = this.audioSrc;
    }
    this.audioElement.volume = this.volume;

    return this.audioElement.play().then(() => {
      this.isPlaying = true;
      this.notify();
    }).catch((err) => {
      console.warn('Playback waiting for user gesture:', err);
    });
  }

  // Setup auto-play on load with immediate user-interaction unlock
  private setupAutoPlayAndUnlock() {
    if (typeof window === 'undefined') return;

    // Try direct play immediately
    const tryPlay = () => {
      if (!this.isManuallyMuted && !this.isPlaying) {
        this.playAudioDirect();
      }
    };

    tryPlay();
    if (document.readyState !== 'complete') {
      window.addEventListener('load', tryPlay, { once: true });
    }

    // Browsers require a user gesture (tap, touch, click, scroll, key) to allow unmuted audio
    const unlockHandler = () => {
      if (!this.isManuallyMuted && !this.isPlaying) {
        this.playAudioDirect();
      }
    };

    ['click', 'touchstart', 'touchend', 'scroll', 'keydown', 'pointerdown', 'mousedown'].forEach((evt) => {
      window.addEventListener(evt, unlockHandler, { passive: true });
    });
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getAudioSrc(): string {
    return this.audioSrc;
  }

  public getHasCustomAudio(): boolean {
    return this.hasCustomAudio;
  }

  public async saveAndSetCustomAudio(fileOrBlob: Blob): Promise<void> {
    try {
      await saveAudioBlob(fileOrBlob);

      if (this.objectUrlToRevoke) {
        URL.revokeObjectURL(this.objectUrlToRevoke);
      }

      const url = URL.createObjectURL(fileOrBlob);
      this.objectUrlToRevoke = url;
      this.audioSrc = url;
      this.hasCustomAudio = true;
      this.isManuallyMuted = false;

      if (!this.audioElement) {
        this.initAudioElement();
      }

      if (this.audioElement) {
        this.audioElement.src = url;
        this.audioElement.load();
        this.playAudioDirect();
      }
    } catch (err) {
      console.error('Failed to save and set custom audio:', err);
    }
  }

  public setCustomAudio(url: string) {
    this.audioSrc = url;
    if (!this.audioElement) {
      this.initAudioElement();
    }
    if (this.audioElement) {
      this.audioElement.src = url;
      this.audioElement.load();
      if (!this.isManuallyMuted) {
        this.playAudioDirect();
      }
    }
  }

  public togglePlay(): boolean {
    if (!this.audioElement) {
      this.initAudioElement();
    }

    if (this.isPlaying) {
      this.isManuallyMuted = true;
      this.stop();
      return false;
    } else {
      this.isManuallyMuted = false;
      this.playAudioDirect();
      return true;
    }
  }

  public start(): boolean {
    if (typeof window === 'undefined') return false;
    this.isManuallyMuted = false;
    this.playAudioDirect();
    return true;
  }

  public stop() {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch {
        // Safe ignore
      }
    }
    this.isPlaying = false;
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }
}

export const festiveAudio = new FestiveAudioController();
