import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import concertImg from '@/assets/concert-crowd.jpg';
import ElectricBorder from './ElectricBorder';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Bouut Music helped me get my first 10K streams in a week. Their playlist placement is legit and the team genuinely cares about independent artists.',
    name: 'Jaylen Carter',
    role: 'R&B Artist',
  },
  {
    quote: 'The Launch Program was a game-changer. My pre-release campaign built so much hype that my track charted on day one. Highly recommend!',
    name: 'Luna Vex',
    role: 'Electronic Producer',
  },
  {
    quote: 'Professional, responsive, and results-driven. Bouut Music is the real deal for any emerging artist looking to break through the noise.',
    name: 'Marcus Dean',
    role: 'Hip-Hop Artist',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.testimonial-card');
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={concertImg} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Artist Love
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            What Artists <span className="text-gradient-purple">Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ElectricBorder key={i} color={['#a855f7', '#d946ef', '#06b6d4'][i]} speed={0.6} chaos={0.08} borderRadius={16}>
              <div className="testimonial-card glass-card rounded-2xl p-8 border-transparent">
                <span className="text-4xl text-primary/30 font-serif leading-none">"</span>
                <p className="text-foreground/90 leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </ElectricBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
