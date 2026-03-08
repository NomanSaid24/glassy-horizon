import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tags = ['Hype Campaigns', 'Playlist Curation', 'Paid Promotion', 'Demo Reviews'];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.gsap-reveal');
    if (els) {
      gsap.from(els, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: 3D-style visual */}
          <div className="gsap-reveal relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glowing orbs */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-primary/20 blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-36 h-36 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-glow-cyan/20 blur-2xl animate-pulse-glow" />
              </div>
              {/* Vinyl record visual */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                <div className="w-full h-full rounded-full border border-primary/30 animate-spin-slow flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-accent/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-glow-cyan/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-background" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="gsap-reveal text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              About Us
            </span>
            <h2 className="gsap-reveal font-display font-bold text-4xl md:text-5xl mb-6">
              We Champion the{' '}
              <span className="text-gradient-purple">Underground</span>
            </h2>
            <p className="gsap-reveal text-muted-foreground text-lg leading-relaxed mb-8">
              Bouut Music is a music promotion platform built for independent and emerging artists. 
              We believe great music deserves to be heard — no matter how many followers you have. 
              From promoting unreleased demos to curating genre-specific playlists and running full-scale 
              paid promotion — we provide the tools and exposure artists need to break through.
            </p>
            <div className="gsap-reveal flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="glass-card px-4 py-2 rounded-full text-sm font-medium text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
