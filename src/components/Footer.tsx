import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Bouut" className="h-8 w-8" />
          <span className="font-display font-bold text-foreground">
            Bou<span className="text-gradient-purple">ut</span> Music
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          © 2026 Bouut Music. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
