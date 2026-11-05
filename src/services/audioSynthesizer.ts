/**
 * Authentic Indian Classical Travel Soundscape Synthesizer
 * Uses Web Audio API to synthesize:
 * 1. Tanpura Drone (Sa - Pa - Sa - Sa low with authentic micro-resonances)
 * 2. Bansuri (Bamboo Flute) Melodic Alaap with gentle meend (pitch glides) and breath vibrato
 * 3. Temple Bell / Manjira chimes for scene transitions
 * 4. Automatic speech-ducking so AI narration is crystal clear over the Indian tunes
 */

export type IndianRaag = 'yaman' | 'desh' | 'bhairavi';

interface RaagConfig {
  name: string;
  notesHz: number[]; // Frequencies for flute alaap
  rootHz: number;
}

// Indian scale tunings in Key of D (standard concert pitch for bansuri)
const RAAG_CONFIGS: Record<IndianRaag, RaagConfig> = {
  // Raag Yaman (Kalyan Thaat): Sa, Re, Ga, Tivra Ma, Pa, Dha, Ni
  yaman: {
    name: 'Raag Yaman (Sunset Heritage)',
    rootHz: 146.83, // D3
    notesHz: [
      220.0, // A3 (Pa lower)
      246.94, // B3 (Dha lower)
      277.18, // C#4 (Ni lower)
      293.66, // D4 (Sa)
      329.63, // E4 (Re)
      369.99, // F#4 (Ga)
      415.3,  // G#4 (Tivra Ma)
      440.0,  // Pa
      493.88, // Dha
      554.37, // Ni
      587.33, // High Sa
      659.25, // High Re
    ],
  },
  // Raag Desh: Sa, Re, Ma, Pa, Ni, Sa (Soulful countryside)
  desh: {
    name: 'Raag Desh (Soulful Heritage)',
    rootHz: 146.83,
    notesHz: [
      220.0,  // Pa
      277.18, // Ni
      293.66, // Sa
      329.63, // Re
      392.0,  // Shuddha Ma
      440.0,  // Pa
      493.88, // Dha
      554.37, // Shuddha Ni
      587.33, // High Sa
      659.25, // High Re
    ],
  },
  // Raag Bhairavi: Sa, Komal Re, Komal Ga, Ma, Pa, Komal Dha, Komal Ni (Devotional sacred ghats)
  bhairavi: {
    name: 'Raag Bhairavi (Sacred Waters)',
    rootHz: 146.83,
    notesHz: [
      220.0,  // Pa
      261.63, // Komal Ni
      293.66, // Sa
      311.13, // Komal Re
      349.23, // Komal Ga
      392.0,  // Shuddha Ma
      440.0,  // Pa
      466.16, // Komal Dha
      523.25, // Komal Ni
      587.33, // High Sa
    ],
  },
};

class IndianCinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private fluteGain: GainNode | null = null;

  private tanpuraOscs: OscillatorNode[] = [];
  private isPlaying: boolean = false;
  private currentRaag: IndianRaag = 'yaman';
  private fluteInterval: number | null = null;
  private tanpuraCycleInterval: number | null = null;
  private volume: number = 0.35;
  private isDucked: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Music sub-mix gain
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // Separate sub gains
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.droneGain.connect(this.musicGain);

      this.fluteGain = this.ctx.createGain();
      this.fluteGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.fluteGain.connect(this.musicGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Play authentic temple bell chime for scene transitions
   */
  public playTempleBell() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      // High harmonic frequencies mimicking bronze Indian temple bell / manjira
      const bellFreqs = [1174.66, 1760.0, 2349.32, 3520.0];

      bellFreqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (idx * 3.5), now);

        const bellGain = (0.04 / (idx + 1));
        gain.gain.setValueAtTime(bellGain, now);
        // Exponential ringing decay
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch (e) {
      console.warn('Bell chime error:', e);
    }
  }

  /**
   * Tanpura String Drone: Creates the continuous acoustic Sa-Pa-Sa-Sa bed
   */
  private startTanpura() {
    if (!this.ctx || !this.droneGain) return;
    const now = this.ctx.currentTime;

    // Frequencies: Pa (220), Sa (293.66), Sa (293.66), Low Sa (146.83)
    const strings = [220.0, 293.66, 293.66 * 1.002, 146.83];

    this.tanpuraOscs = strings.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Slow acoustic chorus shimmer
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.setValueAtTime(0.12 + idx * 0.04, now);
      lfoGain.gain.setValueAtTime(1.2, now);
      lfo.connect(osc.frequency);
      lfo.start(now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(680 + idx * 60, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12 / (idx === 3 ? 1.2 : 2.0), now + 3.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.droneGain!);

      osc.start(now);
      return osc;
    });

    // Cyclic plucked string envelope simulation every 2.4s
    let stringIdx = 0;
    this.tanpuraCycleInterval = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) return;
      const t = this.ctx.currentTime;
      const targetOsc = this.tanpuraOscs[stringIdx % this.tanpuraOscs.length];
      if (targetOsc) {
        // Subtle acoustic pluck accent
        const pluckOsc = this.ctx.createOscillator();
        const pluckGain = this.ctx.createGain();
        pluckOsc.type = 'triangle';
        pluckOsc.frequency.setValueAtTime(targetOsc.frequency.value, t);

        pluckGain.gain.setValueAtTime(0.03, t);
        pluckGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

        pluckOsc.connect(pluckGain);
        pluckGain.connect(this.droneGain!);
        pluckOsc.start(t);
        pluckOsc.stop(t + 2.0);
      }
      stringIdx++;
    }, 2400);
  }

  /**
   * Bansuri Flute Melodic Engine: Plays expressive Indian melodies with pitch glides (meend)
   */
  private startFluteMelodies() {
    if (!this.ctx || !this.fluteGain) return;

    const playFlutePhrase = () => {
      if (!this.ctx || !this.isPlaying || !this.fluteGain) return;

      const raag = RAAG_CONFIGS[this.currentRaag];
      const notes = raag.notesHz;

      // Select 3 to 5 notes for a classical Indian alaap motif
      const phraseLength = Math.floor(Math.random() * 3) + 3;
      let currentNoteIdx = Math.floor(Math.random() * (notes.length - 4)) + 2;

      let timeOffset = this.ctx.currentTime + 0.2;

      for (let i = 0; i < phraseLength; i++) {
        const noteFreq = notes[currentNoteIdx];
        const noteDuration = 1.2 + Math.random() * 1.5;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Warm bamboo flute sound: sine wave + soft vibrato
        osc.type = 'sine';
        osc.frequency.setValueAtTime(noteFreq, timeOffset);

        // Meend / gentle pitch glide to next note
        if (i < phraseLength - 1) {
          const nextStep = Math.random() > 0.4 ? 1 : -1;
          const nextIdx = Math.max(0, Math.min(notes.length - 1, currentNoteIdx + nextStep));
          const nextFreq = notes[nextIdx];
          osc.frequency.setTargetAtTime(nextFreq, timeOffset + noteDuration * 0.65, 0.25);
          currentNoteIdx = nextIdx;
        }

        // Natural breath vibrato
        const vibrato = this.ctx.createOscillator();
        const vibratoGain = this.ctx.createGain();
        vibrato.frequency.setValueAtTime(4.8, timeOffset); // ~5Hz flute vibrato
        vibratoGain.gain.setValueAtTime(2.2, timeOffset);
        vibrato.connect(osc.frequency);
        vibrato.start(timeOffset);
        vibrato.stop(timeOffset + noteDuration);

        // Flute resonance
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(noteFreq * 1.2, timeOffset);
        filter.Q.setValueAtTime(1.8, timeOffset);

        // Soft breath attack & gentle decay
        gain.gain.setValueAtTime(0.0001, timeOffset);
        gain.gain.linearRampToValueAtTime(0.09, timeOffset + 0.3);
        gain.gain.setValueAtTime(0.08, timeOffset + noteDuration - 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, timeOffset + noteDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.fluteGain);

        osc.start(timeOffset);
        osc.stop(timeOffset + noteDuration + 0.1);

        timeOffset += noteDuration * 0.85; // slight overlap for legato feel
      }
    };

    // Play initial phrase shortly after starting
    setTimeout(playFlutePhrase, 800);

    // Schedule regular gentle phrases every 6-8 seconds
    this.fluteInterval = window.setInterval(playFlutePhrase, 7000);
  }

  /**
   * Start the complete Indian cinematic soundtrack
   */
  public playIndianScore(raag: IndianRaag = 'yaman') {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      if (this.isPlaying) return;

      this.stop(); // reset any ongoing sound
      this.currentRaag = raag;
      this.isPlaying = true;

      // Play introductory bell chime
      this.playTempleBell();

      // Start Tanpura drone & flute melodies
      this.startTanpura();
      this.startFluteMelodies();
    } catch (e) {
      console.warn('Indian audio synthesis could not start automatically:', e);
    }
  }

  /**
   * Smooth Audio Ducking: lowers music volume when AI speech is active,
   * swells gently back up during pauses and between scenes.
   */
  public duckForSpeech(isSpeaking: boolean) {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    this.isDucked = isSpeaking;

    if (isSpeaking) {
      // Lower music smoothly so AI narration is loud and clear
      this.musicGain.gain.cancelScheduledValues(now);
      this.musicGain.gain.linearRampToValueAtTime(0.32, now + 0.4);
    } else {
      // Swell music back up for rich cinematic presence between speech
      this.musicGain.gain.cancelScheduledValues(now);
      this.musicGain.gain.linearRampToValueAtTime(1.0, now + 0.8);
    }
  }

  public setRaag(raag: IndianRaag) {
    this.currentRaag = raag;
    if (this.isPlaying) {
      this.playTempleBell();
    }
  }

  public getRaagName(raag: IndianRaag): string {
    return RAAG_CONFIGS[raag]?.name || 'Raag Yaman';
  }

  public pause() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.5);
    setTimeout(() => {
      this.stop();
    }, 600);
  }

  public stop() {
    this.tanpuraOscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignored
      }
    });
    this.tanpuraOscs = [];

    if (this.fluteInterval) {
      clearInterval(this.fluteInterval);
      this.fluteInterval = null;
    }
    if (this.tanpuraCycleInterval) {
      clearInterval(this.tanpuraCycleInterval);
      this.tanpuraCycleInterval = null;
    }

    this.isPlaying = false;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentRaag(): IndianRaag {
    return this.currentRaag;
  }
}

export const indianAudioEngine = new IndianCinematicAudioEngine();
