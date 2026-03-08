import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music2 } from 'lucide-react';
import GradientBorder from './GradientBorder';

const tracks = [
  { title: 'Neon Dreams', artist: 'Bouut Featured', duration: 187 },
  { title: 'Midnight Frequency', artist: 'Luna Vex', duration: 214 },
  { title: 'Underground Rise', artist: 'Jaylen Carter', duration: 198 },
  { title: 'Electric Pulse', artist: 'Marcus Dean', duration: 226 },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [bars, setBars] = useState<number[]>(Array(16).fill(4));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Simulate audio visualizer bars
  useEffect(() => {
    const updateBars = () => {
      if (isPlaying) {
        setBars(prev => prev.map(() => 4 + Math.random() * 28));
      } else {
        setBars(prev => prev.map((v) => Math.max(4, v * 0.85)));
      }
    };
    const id = setInterval(updateBars, 100);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Progress simulation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextTrack();
            return 0;
          }
          return prev + (100 / (tracks[currentTrack].duration * 10));
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, currentTrack]);

  // Simple ambient tone generation
  const startAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    // Create a pleasant ambient tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220 + currentTrack * 55, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    gain.gain.setValueAtTime(muted ? 0 : 0.03, ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscillatorRef.current = osc;
    gainRef.current = gain;
  }, [currentTrack, muted]);

  const stopAudio = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) startAudio();
    else stopAudio();
    return () => stopAudio();
  }, [isPlaying, startAudio, stopAudio]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.setValueAtTime(muted ? 0 : 0.03, audioCtxRef.current?.currentTime || 0);
    }
  }, [muted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    stopAudio();
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    stopAudio();
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const track = tracks[currentTrack];
  const elapsed = (progress / 100) * track.duration;

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full btn-glow flex items-center justify-center text-primary-foreground shadow-2xl"
        aria-label="Open music player"
      >
        <Music2 size={22} />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-pulse" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-80">
      <GradientBorder borderRadius={20} borderWidth={1.5} colors={['#a855f7', '#ec4899', '#06b6d4', '#a855f7']}>
        <div className="glass-strong rounded-[18px] p-5 relative overflow-hidden">
          {/* Minimize button */}
          <button
            onClick={() => setMinimized(true)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors text-xs"
            aria-label="Minimize player"
          >
            ✕
          </button>

          {/* Visualizer bars */}
          <div className="flex items-end justify-center gap-[3px] h-10 mb-4">
            {bars.map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full transition-all duration-100"
                style={{
                  height: `${h}px`,
                  background: `linear-gradient(to top, hsl(var(--primary)), hsl(var(--accent)))`,
                  opacity: isPlaying ? 0.8 : 0.2,
                }}
              />
            ))}
          </div>

          {/* Track info */}
          <div className="text-center mb-3">
            <p className="font-display font-semibold text-foreground text-sm truncate">{track.title}</p>
            <p className="text-muted-foreground text-xs">{track.artist}</p>
          </div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="w-full h-1 rounded-full bg-muted overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">{formatTime(elapsed)}</span>
              <span className="text-[10px] text-muted-foreground">{formatTime(track.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setMuted(!muted)} className="text-muted-foreground hover:text-foreground transition-colors">
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button onClick={prevTrack} className="text-foreground hover:text-primary transition-colors">
              <SkipBack size={18} />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full btn-glow flex items-center justify-center text-primary-foreground"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <button onClick={nextTrack} className="text-foreground hover:text-primary transition-colors">
              <SkipForward size={18} />
            </button>
            <div className="w-4" /> {/* Spacer for balance */}
          </div>
        </div>
      </GradientBorder>
    </div>
  );
}
