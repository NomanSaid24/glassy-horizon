import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroImg from '@/assets/hero-studio.jpg';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(badgeRef.current, { y: 30, opacity: 0, duration: 0.8, delay: 0.5 })
      .from(titleRef.current, { y: 60, opacity: 0, duration: 1 }, '-=0.4')
      .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.4');
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">
        <div ref={badgeRef} className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Music Promotion Platform
          </span>
        </div>

        <h1 ref={titleRef} className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
          Empowering{' '}
          <span className="glow-text">Underrated Artists</span>{' '}
          Worldwide
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Get your music heard. Get discovered. Get promoted.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glow px-8 py-4 rounded-full font-display font-bold text-lg text-primary-foreground flex items-center gap-2 justify-center"
          >
            Submit Your Music
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass px-8 py-4 rounded-full font-display font-semibold text-foreground hover:bg-muted/30 transition-all"
          >
            Learn More
          </button>
        </div>

        {/* Animated equalizer bars */}
        <div className="flex items-end justify-center gap-1 mt-20 opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full"
              style={{
                height: `${20 + Math.sin(i * 0.5) * 15}px`,
                animation: `pulse-glow ${1.5 + i * 0.1}s ease-in-out infinite`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
