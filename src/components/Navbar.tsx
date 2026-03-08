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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Bouut" className="h-10 w-10" />
          <span className="font-display font-bold text-xl text-foreground">
            Bou<span className="text-gradient-purple">ut</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo('cta')}
          className="btn-glow px-6 py-2.5 rounded-full text-sm font-semibold text-primary-foreground"
        >
          Submit Music
        </button>
      </div>
    </nav>
  );
}
