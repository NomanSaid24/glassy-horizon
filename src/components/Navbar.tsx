import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '@/assets/logo.png';

const navItems = ['About', 'Services', 'How It Works', 'FAQ'];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, { y: -80, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled ? 'pt-3' : 'pt-5'
      }`}
    >
      <div
        className={`flex items-center gap-8 px-6 py-3 rounded-full border border-border/60 bg-card/80 backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-500 ${
          scrolled ? 'scale-[0.97]' : ''
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Bouut" className="h-8 w-8" />
          <span className="font-display font-bold text-lg text-foreground">
            Bou<span className="text-gradient-purple">ut</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo('cta')}
          className="btn-glow px-5 py-2 rounded-full text-sm font-semibold text-primary-foreground"
        >
          Submit Music
        </button>
      </div>
    </nav>
  );
}
