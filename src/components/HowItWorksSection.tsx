import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Submit Your Track', desc: 'Fill out our submission form with your track link, artist info, and preferred service.' },
  { num: '02', title: 'Our Team Reviews', desc: 'Our A&R team carefully listens and evaluates every submission within 48–72 hours.' },
  { num: '03', title: 'We Promote You', desc: 'Selected artists receive promotion across our channels, playlists, and partner networks.' },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.step-item');
    if (items) {
      gsap.from(items, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        x: -60, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Simple Process
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            How It <span className="text-gradient-purple">Works</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="step-item relative">
              <div className="glass-card rounded-2xl p-8 h-full relative overflow-hidden">
                {/* Big number background */}
                <span className="absolute -top-4 -right-2 font-display font-black text-8xl text-primary/5">
                  {step.num}
                </span>
                <div className="relative z-10">
                  <span className="inline-block font-display font-bold text-sm text-primary bg-primary/10 rounded-full px-4 py-1.5 mb-6">
                    Step {step.num}
                  </span>
                  <h3 className="font-display font-bold text-xl mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
              {/* Connector line */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
