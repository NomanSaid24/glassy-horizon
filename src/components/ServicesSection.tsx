import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientBorder from './GradientBorder';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: '🎧',
    title: 'Demo Review',
    desc: 'Submit your unreleased music for professional feedback. Our A&R team listens to every submission and provides actionable insights.',
    cta: 'Apply Now',
    colors: ['#a855f7', '#ec4899', '#06b6d4', '#a855f7'],
  },
  {
    icon: '🚀',
    title: 'Bouut Launch Program',
    desc: 'Pre-release Instagram hype campaigns designed to build anticipation. We create buzz before your track drops.',
    colors: ['#d946ef', '#f97316', '#a855f7', '#d946ef'],
    cta: 'Learn More',
  },
  {
    icon: '🎶',
    title: 'Playlist Submission',
    desc: 'Get placed on our weekly curated playlists reaching thousands of active listeners. Genre-specific curation for maximum impact.',
    colors: ['#06b6d4', '#a855f7', '#22c55e', '#06b6d4'],
    cta: 'Submit Track',
  },
  {
    icon: '📢',
    title: 'Promotion Campaign',
    desc: 'Full-scale paid promotion across Instagram, TikTok, and streaming platforms. Targeted campaigns for the right audience.',
    colors: ['#ec4899', '#a855f7', '#06b6d4', '#ec4899'],
    cta: 'Get Started',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.service-card');
    if (cards) {
      gsap.set(cards, { y: 80, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(cards, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' });
        },
        once: true,
      });
    }
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Our <span className="text-gradient-purple">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to launch, promote, and grow your music career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <GradientBorder key={i} colors={s.colors} borderRadius={16}>
              <div className="service-card glass-card rounded-[14px] p-8 group cursor-pointer border-transparent">
                <div className="text-5xl mb-6">{s.icon}</div>
                <h3 className="font-display font-bold text-2xl mb-3 text-foreground group-hover:text-gradient-purple transition-all">
                  {s.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  {s.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </GradientBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
