import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: 'Is promotion guaranteed?', a: 'While we review every submission, promotion is not guaranteed. Our team selects tracks based on quality, originality, and market potential. We aim to provide honest feedback even if a track isn\'t selected.' },
  { q: 'Is playlist placement guaranteed?', a: 'Playlist placement depends on the quality and fit of your track with our curated playlists. We evaluate each submission individually.' },
  { q: 'Is this free or paid?', a: 'We offer both free and paid services. Demo Review and Playlist Submission have free tiers. The Launch Program and full Promotion Campaigns are paid with transparent pricing.' },
  { q: 'How long does review take?', a: 'Our team typically reviews submissions within 48–72 hours. During high-volume periods, it may take up to 5 business days.' },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.faq-item');
    if (items) {
      gsap.from(items, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">Questions?</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Frequently Asked <span className="text-gradient-purple">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item glass-card rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-display font-semibold text-foreground">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-40 pb-5' : 'max-h-0'
                }`}
              >
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
