// Web Audio API procedural Swiss mechanical escapement sound generator

class HorologyAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.bpm = 360; // 360 ticks per minute = 21,600 vph (6 Hz / 6 beats per second)
    this.volume = 0.15;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Generate an authentic high-frequency pallet fork / jewel strike click
  playTick(isTock = false) {
    if (!this.audioCtx) return;

    try {
      const t = this.audioCtx.currentTime;

      // 1. High-frequency click impulse (pallet jewel strike)
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isTock ? 3400 : 4200, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.015);

      gain.gain.setValueAtTime(this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + 0.025);

      // 2. Subtle metallic casing resonance (reverberation inside gold case)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(isTock ? 1200 : 1450, t);
      osc2.frequency.exponentialRampToValueAtTime(400, t + 0.03);

      gain2.gain.setValueAtTime(this.volume * 0.4, t);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);

      osc2.start(t);
      osc2.stop(t + 0.04);
    } catch (e) {
      // Audio node error gracefully ignored
    }
  }

  // Play a single UI interaction click sound
  playClick() {
    this.initContext();
    this.playTick(false);
  }

  setFrequency(vph = 21600) {
    // 21,600 vph = 360 ticks/min (6 Hz); 28,800 vph = 480 ticks/min (8 Hz); 36,000 vph = 600 ticks/min (10 Hz)
    this.bpm = Math.round((vph / 60));
    if (this.isPlaying) {
      this.stopEscapement();
      this.startEscapement();
    }
  }

  // Start continuous rhythmic mechanical movement (360 vpm escapement)
  startEscapement() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    let isTock = false;
    const intervalMs = (60 / this.bpm) * 1000; // ~166ms per tick (6 bps)

    this.timerId = window.setInterval(() => {
      this.playTick(isTock);
      isTock = !isTock;
    }, intervalMs);
  }

  stopEscapement() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  stop() {
    this.stopEscapement();
  }

  toggle() {
    if (this.isPlaying) {
      this.stopEscapement();
      return false;
    } else {
      this.startEscapement();
      return true;
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

export const horologyAudio = new HorologyAudioEngine();

