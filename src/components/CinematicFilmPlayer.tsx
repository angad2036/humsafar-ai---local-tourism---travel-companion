import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FileText,
  X,
  Compass,
  Film,
  Music,
  Eye,
  EyeOff,
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { fetchTravelFilmScript } from '../services/api';
import { FilmScript, FilmScene } from '../types/travel';
import { indianAudioEngine, IndianRaag } from '../services/audioSynthesizer';

interface CinematicFilmPlayerProps {
  initialDestinationId?: string;
  onClose?: () => void;
}

export const CinematicFilmPlayer: React.FC<CinematicFilmPlayerProps> = ({
  initialDestinationId = 'kurukshetra',
  onClose,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(initialDestinationId);
  const [script, setScript] = useState<FilmScript | null>(null);
  const [loadingScript, setLoadingScript] = useState<boolean>(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [musicVolume, setMusicVolume] = useState<number>(0.35);
  const [selectedRaag, setSelectedRaag] = useState<IndianRaag>('yaman');
  const [narrationMuted, setNarrationMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [showScriptDrawer, setShowScriptDrawer] = useState<boolean>(false);
  const [showRaagMenu, setShowRaagMenu] = useState<boolean>(false);
  const [sceneProgress, setSceneProgress] = useState<number>(0); // 0 to 100%

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<number | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load script when selected destination changes
  useEffect(() => {
    let isMounted = true;
    setLoadingScript(true);
    stopNarration();
    indianAudioEngine.stop();
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    setIsPlaying(false);

    const dest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

    fetchTravelFilmScript(dest.id, dest.name, dest.region).then((data) => {
      if (isMounted) {
        setScript(data);
        setLoadingScript(false);
      }
    });

    return () => {
      isMounted = false;
      stopNarration();
      indianAudioEngine.stop();
    };
  }, [selectedDestId]);

  // Handle SpeechSynthesis narration for current scene
  const playCurrentSceneNarration = (scene: FilmScene) => {
    stopNarration();

    if (narrationMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // If voice muted, swell Indian music to full richness
      indianAudioEngine.duckForSpeech(false);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(scene.narration);
      utterance.rate = 0.95; // Gentle cinematic documentary cadence
      utterance.pitch = 1.0;

      // Select an expressive English voice (prefer Indian/UK/natural accents if available)
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => v.lang.includes('en-IN')) ||
        voices.find((v) => v.lang.includes('en-GB')) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        // While AI speaks, gracefully duck Indian music
        indianAudioEngine.duckForSpeech(true);
      };

      utterance.onend = () => {
        // After AI finishes speaking, swell the rich Indian flute and tanpura tunes!
        indianAudioEngine.duckForSpeech(false);

        // When speech finishes, advance to next scene if still playing
        if (isPlaying) {
          handleNextScene();
        }
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        indianAudioEngine.duckForSpeech(false);
      };

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis playback failed:', err);
      indianAudioEngine.duckForSpeech(false);
    }
  };

  const stopNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    speechUtteranceRef.current = null;
    indianAudioEngine.duckForSpeech(false);
  };

  // Scene Progress Timer
  useEffect(() => {
    if (!isPlaying || !script) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const currentScene = script.scenes[currentSceneIndex];
    const durationMs = (currentScene?.estimatedDurationSeconds || 14) * 1000;
    const intervalMs = 100;
    const step = (intervalMs / durationMs) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setSceneProgress((prev) => {
        if (prev >= 100) {
          handleNextScene();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, currentSceneIndex, script]);

  // Start or pause playback
  const togglePlayPause = () => {
    if (!script) return;

    if (isPlaying) {
      setIsPlaying(false);
      stopNarration();
      indianAudioEngine.pause();
    } else {
      setIsPlaying(true);
      if (musicEnabled) {
        indianAudioEngine.setVolume(musicVolume);
        indianAudioEngine.playIndianScore(selectedRaag);
      }
      playCurrentSceneNarration(script.scenes[currentSceneIndex]);
    }
  };

  const handleNextScene = () => {
    if (!script) return;
    setSceneProgress(0);
    if (currentSceneIndex < script.scenes.length - 1) {
      const nextIdx = currentSceneIndex + 1;
      setCurrentSceneIndex(nextIdx);
      // Play authentic Indian temple bell chime at transition
      indianAudioEngine.playTempleBell();
      if (isPlaying) {
        playCurrentSceneNarration(script.scenes[nextIdx]);
      }
    } else {
      // Reached the end
      setIsPlaying(false);
      stopNarration();
      indianAudioEngine.pause();
    }
  };

  const handlePrevScene = () => {
    if (!script) return;
    setSceneProgress(0);
    const prevIdx = Math.max(0, currentSceneIndex - 1);
    setCurrentSceneIndex(prevIdx);
    indianAudioEngine.playTempleBell();
    if (isPlaying) {
      playCurrentSceneNarration(script.scenes[prevIdx]);
    }
  };

  const handleRestart = () => {
    if (!script) return;
    setSceneProgress(0);
    setCurrentSceneIndex(0);
    indianAudioEngine.playTempleBell();
    if (isPlaying) {
      playCurrentSceneNarration(script.scenes[0]);
    }
  };

  const jumpToScene = (index: number) => {
    if (!script) return;
    setSceneProgress(0);
    setCurrentSceneIndex(index);
    indianAudioEngine.playTempleBell();
    if (isPlaying) {
      playCurrentSceneNarration(script.scenes[index]);
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const toggleMusic = () => {
    const nextState = !musicEnabled;
    setMusicEnabled(nextState);
    if (nextState) {
      indianAudioEngine.setVolume(musicVolume);
      if (isPlaying) indianAudioEngine.playIndianScore(selectedRaag);
    } else {
      indianAudioEngine.pause();
    }
  };

  const changeRaag = (raag: IndianRaag) => {
    setSelectedRaag(raag);
    indianAudioEngine.setRaag(raag);
    setShowRaagMenu(false);
  };

  const currentScene = script?.scenes[currentSceneIndex];

  // Generate a short, non-intrusive subtitle line
  // If narration is long, get the current compact sentence so video is NOT blocked!
  const getShortSubtitle = (narration: string = ''): string => {
    const sentences = narration.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
    if (sentences.length === 0) return narration;
    // Rotate through sentences based on sceneProgress so it reads like movie subtitles
    const progressFraction = Math.min(0.99, sceneProgress / 100);
    const sentenceIndex = Math.floor(progressFraction * sentences.length);
    return sentences[sentenceIndex] || sentences[0];
  };

  return (
    <div className="py-8 bg-[#0B192C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header & Destination Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Film className="w-3.5 h-3.5" />
              <span>Signature Experience</span>
              <span aria-hidden="true">·</span>
              <span>AI Cinematic Travel Film</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-white mt-1">
              {script?.title || 'Cinematic Travel Film'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              {script?.tagline || 'Every journey has a story. Listen and immerse.'}
            </p>
          </div>

          {/* Destination Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs text-stone-400 whitespace-nowrap font-medium pr-1">
              Select Film:
            </span>
            {DESTINATIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDestId(d.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedDestId === d.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                {d.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Film Viewport Container */}
        <div
          ref={playerContainerRef}
          className={`relative rounded-3xl overflow-hidden bg-black shadow-2xl transition-all ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : 'aspect-[16/9] w-full max-h-[640px]'
          }`}
        >
          {loadingScript ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 text-white space-y-4">
              <div className="w-10 h-10 border-3 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold tracking-wide font-['Outfit']">
                  Directing Cinematic Travel Film...
                </p>
                <p className="text-xs text-stone-400">
                  Synthesizing 6-scene documentary script & authentic Indian score
                </p>
              </div>
            </div>
          ) : currentScene ? (
            <>
              {/* Dynamic Ken Burns Cinematic Image - Full Unobstructed View */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  key={currentScene.sceneNumber}
                  src={currentScene.image}
                  alt={currentScene.title}
                  className={`w-full h-full object-cover transition-opacity duration-1000 ${
                    currentSceneIndex % 2 === 0 ? 'animate-kenburns-1' : 'animate-kenburns-2'
                  }`}
                  referrerPolicy="no-referrer"
                />
                {/* Minimal translucent scrim so video is completely bright & visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Watermark / HUMSAFAR AI Film Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
                <div className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-lg border border-white/15 text-[11px] font-bold tracking-wider text-amber-300 flex items-center gap-1.5 shadow-sm">
                  <Compass className="w-3.5 h-3.5" />
                  HUMSAFAR CINEMA
                </div>
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-[11px] text-stone-200">
                  <span>Scene {currentScene.sceneNumber}/6</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold">{currentScene.title}</span>
                </div>
              </div>

              {/* Top Right Controls (Raag Indian Tunes Selector, Screenplay, Fullscreen) */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
                {/* Indian Melody Raag Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowRaagMenu(!showRaagMenu)}
                    className="px-2.5 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-lg border border-amber-400/40 text-xs text-amber-300 flex items-center gap-1.5 transition-colors shadow-sm"
                    title="Select Indian Classical Tune / Raag"
                  >
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline font-medium">
                      {selectedRaag === 'yaman' ? 'Raag Yaman' : selectedRaag === 'desh' ? 'Raag Desh' : 'Raag Bhairavi'}
                    </span>
                  </button>

                  {showRaagMenu && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-slate-900 border border-stone-700 rounded-xl shadow-2xl py-1 z-50 text-left text-xs divide-y divide-stone-800">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        Indian Classical Score
                      </div>
                      <button
                        onClick={() => changeRaag('yaman')}
                        className={`w-full px-3 py-2 text-left hover:bg-stone-800 transition-colors flex items-center justify-between ${
                          selectedRaag === 'yaman' ? 'text-amber-300 font-bold bg-stone-800/60' : 'text-stone-300'
                        }`}
                      >
                        <span>Raag Yaman (Sunset)</span>
                        <span className="text-[10px] text-stone-500">Bansuri</span>
                      </button>
                      <button
                        onClick={() => changeRaag('desh')}
                        className={`w-full px-3 py-2 text-left hover:bg-stone-800 transition-colors flex items-center justify-between ${
                          selectedRaag === 'desh' ? 'text-amber-300 font-bold bg-stone-800/60' : 'text-stone-300'
                        }`}
                      >
                        <span>Raag Desh (Monsoon)</span>
                        <span className="text-[10px] text-stone-500">Heritage</span>
                      </button>
                      <button
                        onClick={() => changeRaag('bhairavi')}
                        className={`w-full px-3 py-2 text-left hover:bg-stone-800 transition-colors flex items-center justify-between ${
                          selectedRaag === 'bhairavi' ? 'text-amber-300 font-bold bg-stone-800/60' : 'text-stone-300'
                        }`}
                      >
                        <span>Raag Bhairavi (Sacred)</span>
                        <span className="text-[10px] text-stone-500">Ghats</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtitle Toggle (CC) */}
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                    showSubtitles
                      ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                      : 'bg-black/60 border-white/15 text-stone-400 hover:text-white'
                  }`}
                  title={showSubtitles ? 'Hide subtitles (unobstructed video view)' : 'Show subtitles'}
                >
                  {showSubtitles ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span className="font-mono font-bold text-[11px]">CC</span>
                </button>

                <button
                  onClick={() => setShowScriptDrawer(true)}
                  className="px-2.5 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-lg border border-white/15 text-xs text-white flex items-center gap-1.5 transition-colors"
                  title="View full film script"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Script</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-lg border border-white/15 text-white transition-colors"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Short, Non-Intrusive Movie-Style Subtitles (Slim pill at bottom, does NOT block video) */}
              {showSubtitles && (
                <div className="absolute bottom-16 sm:bottom-18 left-4 right-4 z-20 flex justify-center pointer-events-none transition-all duration-300">
                  <div className="max-w-2xl bg-black/65 backdrop-blur-sm rounded-full px-4 py-1.5 sm:px-5 sm:py-2 border border-white/15 shadow-xl text-center">
                    <p className="text-xs sm:text-sm font-medium text-stone-100 tracking-wide leading-snug drop-shadow-md">
                      "{getShortSubtitle(currentScene.narration)}"
                    </p>
                  </div>
                </div>
              )}

              {/* Film Player Bottom Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                {/* 6-Scene Interactive Progress Segments */}
                <div className="grid grid-cols-6 gap-1.5 mb-2.5">
                  {script.scenes.map((scene, idx) => {
                    const isPast = idx < currentSceneIndex;
                    const isCurrent = idx === currentSceneIndex;

                    return (
                      <button
                        key={scene.sceneNumber}
                        onClick={() => jumpToScene(idx)}
                        className="group flex flex-col text-left focus:outline-none"
                      >
                        <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/20">
                          <div
                            className={`h-full transition-all duration-200 ${
                              isPast
                                ? 'bg-amber-400 w-full'
                                : isCurrent
                                ? 'bg-amber-400'
                                : 'w-0'
                            }`}
                            style={{
                              width: isPast ? '100%' : isCurrent ? `${sceneProgress}%` : '0%',
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-stone-400 truncate mt-0.5 hidden sm:block group-hover:text-amber-300 transition-colors">
                          {scene.sceneNumber}. {scene.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Primary Player Controls */}
                <div className="flex items-center justify-between">
                  {/* Left: Previous / Play / Next */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <button
                      onClick={handlePrevScene}
                      disabled={currentSceneIndex === 0}
                      className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      aria-label="Previous scene"
                    >
                      <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                      onClick={togglePlayPause}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                      aria-label={isPlaying ? 'Pause film' : 'Play film'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={handleNextScene}
                      disabled={currentSceneIndex === script.scenes.length - 1}
                      className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      aria-label="Next scene"
                    >
                      <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                      onClick={handleRestart}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-white/10 transition-colors"
                      title="Restart film"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Center: Current Status & Active Tune Info */}
                  <div className="hidden md:flex items-center gap-2.5 text-xs text-stone-300">
                    <span className="text-amber-400 font-semibold font-mono">
                      Scene {currentScene.sceneNumber}: {currentScene.title}
                    </span>
                    <span className="text-stone-500">·</span>
                    <span className="text-stone-300 flex items-center gap-1 text-[11px]">
                      <Music className="w-3 h-3 text-amber-400" />
                      Indian Bansuri & Tanpura Score
                    </span>
                  </div>

                  {/* Right: Audio Controls (Voice Narration + Indian Music Toggle) */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Narration voice toggle */}
                    <button
                      onClick={() => {
                        const next = !narrationMuted;
                        setNarrationMuted(next);
                        if (next) stopNarration();
                        else if (isPlaying && currentScene) playCurrentSceneNarration(currentScene);
                      }}
                      className={`text-xs px-2 py-1 rounded-md border flex items-center gap-1 transition-colors ${
                        !narrationMuted
                          ? 'bg-white/15 border-white/20 text-white'
                          : 'bg-red-500/20 border-red-500/30 text-red-300'
                      }`}
                      title={narrationMuted ? 'Unmute speech narration' : 'Mute speech narration'}
                    >
                      {narrationMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                      <span className="hidden sm:inline">Voice</span>
                    </button>

                    {/* Ambient Indian Soundscape Music Toggle */}
                    <button
                      onClick={toggleMusic}
                      className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1 transition-colors ${
                        musicEnabled
                          ? 'bg-amber-400/20 border-amber-400/40 text-amber-300 font-medium'
                          : 'bg-white/10 border-white/15 text-stone-400'
                      }`}
                      title={musicEnabled ? 'Pause Indian background tunes' : 'Play Indian background tunes'}
                    >
                      <Music className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Indian Tune</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Full Screenplay Drawer / Modal */}
        {showScriptDrawer && script && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0f172a] text-white border border-stone-700 max-w-3xl w-full max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
              <div className="p-6 border-b border-stone-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-amber-400">
                    {script.title}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Complete 6-Scene Documentary Screenplay & Cultural Details
                  </p>
                </div>
                <button
                  onClick={() => setShowScriptDrawer(false)}
                  className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 divide-y divide-stone-800">
                {script.scenes.map((scene) => (
                  <div key={scene.sceneNumber} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-300 font-mono">
                      <span>SCENE {scene.sceneNumber} — {scene.title.toUpperCase()} ({scene.subtitle})</span>
                      <span>~{scene.estimatedDurationSeconds}s</span>
                    </div>
                    <p className="text-xs text-stone-400 italic">
                      [Cinematography: {scene.visualDescription}]
                    </p>
                    <p className="text-sm text-stone-200 leading-relaxed font-serif">
                      "{scene.narration}"
                    </p>
                    {scene.highlightPoints && scene.highlightPoints.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {scene.highlightPoints.map((pt, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded-md"
                          >
                            • {pt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  Documentary script synchronized with Indian classical score.
                </span>
                <button
                  onClick={() => setShowScriptDrawer(false)}
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs hover:bg-amber-300 transition-colors"
                >
                  Return to Film
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
