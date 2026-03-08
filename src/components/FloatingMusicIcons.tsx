import { useEffect, useRef } from 'react';
import { Music, Music2, Headphones, Mic, Radio, Disc3 } from 'lucide-react';

interface FloatingIcon {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  iconIndex: number;
  delay: number;
}

const iconComponents = [Music, Music2, Headphones, Mic, Radio, Disc3];

function generateIcons(count: number): FloatingIcon[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 16 + Math.random() * 24,
    speed: 0.15 + Math.random() * 0.3,
    opacity: 0.03 + Math.random() * 0.06,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 0.5,
    iconIndex: Math.floor(Math.random() * iconComponents.length),
    delay: Math.random() * 10,
  }));
}

export default function FloatingMusicIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<FloatingIcon[]>(generateIcons(25));
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const icons = iconsRef.current;
    const elements = containerRef.current?.querySelectorAll<HTMLDivElement>('.floating-icon');
    if (!elements) return;

    const animate = () => {
      const time = performance.now() / 1000;

      elements.forEach((el, i) => {
        const icon = icons[i];
        const t = time * icon.speed + icon.delay;

        // Gentle floating motion
        const offsetX = Math.sin(t * 0.7) * 20;
        const offsetY = Math.cos(t * 0.5) * 30 - (t * 3 % (window.innerHeight + 200));
        const rot = icon.rotation + time * icon.rotationSpeed * 20;

        // Wrap vertically
        let yPos = icon.y * window.innerHeight / 100 + offsetY;
        if (yPos < -50) yPos += window.innerHeight + 100;

        el.style.transform = `translate(${icon.x * window.innerWidth / 100 + offsetX}px, ${yPos}px) rotate(${rot}deg)`;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {iconsRef.current.map((icon, i) => {
        const IconComponent = iconComponents[icon.iconIndex];
        return (
          <div
            key={i}
            className="floating-icon absolute"
            style={{ opacity: icon.opacity }}
          >
            <IconComponent
              size={icon.size}
              className="text-primary"
              strokeWidth={1}
            />
          </div>
        );
      })}
    </div>
  );
}
