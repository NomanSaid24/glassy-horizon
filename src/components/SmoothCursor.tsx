// SmoothCursor - smooth trailing cursor with sound on movement
import { useEffect, useRef, useCallback } from 'react';

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSoundTime = useRef(0);
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });

  const playTone = useCallback(() => {
    const now = performance.now();
    if (now - lastSoundTime.current < 80) return; // throttle
    lastSoundTime.current = now;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Musical note based on cursor speed
    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    const baseFreq = 300 + Math.min(speed * 2, 500);
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  }, []);

  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      velocity.current.x = e.clientX - mousePos.current.x;
      velocity.current.y = e.clientY - mousePos.current.y;
      mousePos.current = { x: e.clientX, y: e.clientY };

      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      if (speed > 3) playTone();
    };

    const animate = () => {
      // Smooth interpolation - dot follows fast, ring follows slow
      const dotLerp = 0.35;
      const ringLerp = 0.12;

      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotLerp;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotLerp;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringLerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringLerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
        const scale = 1 + Math.min(speed * 0.015, 0.5);
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${scale})`;
      }

      // Decay velocity
      velocity.current.x *= 0.9;
      velocity.current.y *= 0.9;

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      audioCtxRef.current?.close();
    };
  }, [playTone]);

  // Only show on non-touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'hsl(var(--primary))',
          boxShadow: '0 0 12px 2px hsla(var(--primary) / 0.5)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid hsla(var(--primary) / 0.4)',
          background: 'hsla(var(--primary) / 0.03)',
          transition: 'border-color 0.3s',
        }}
      />
    </>
  );
}
