import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientBorder from './GradientBorder';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.cta-reveal');
    if (els) {
      gsap.from(els, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="section-padding relative">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        
        <GradientBorder borderRadius={24} borderWidth={2} colors={['#a855f7', '#ec4899', '#06b6d4', '#f97316', '#a855f7']}>
          <div className="relative z-10 glass-strong rounded-[22px] p-12 md:p-16 border-transparent">
            <h2 className="cta-reveal font-display font-black text-4xl md:text-6xl mb-6">
              Ready to Get{' '}
              <span className="glow-text">Discovered?</span>
            </h2>
            <p className="cta-reveal text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Join hundreds of independent artists who trust Bouut Music to amplify their sound. Your next big break starts here.
            </p>
            <button className="cta-reveal btn-glow px-10 py-4 rounded-full font-display font-bold text-lg text-primary-foreground">
              Submit Your Music
            </button>
          </div>
        </GradientBorder>
      </div>
    </section>
  );
}
