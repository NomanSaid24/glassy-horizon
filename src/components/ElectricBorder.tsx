// ElectricBorder - SVG animated electric border effect
// Inspired by react-bits by David Haz (MIT License)
import { useRef, useEffect, type ReactNode } from 'react';

interface ElectricBorderProps {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
}

export default function ElectricBorder({
  children,
  color = '#a855f7',
  speed = 1,
  chaos = 0.12,
  borderRadius = 16,
  className = '',
}: ElectricBorderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let seed = Math.random() * 100;
    const animate = () => {
      seed += 0.02 * speed;
      if (turbRef.current) {
        turbRef.current.setAttribute('seed', String(Math.floor(seed)));
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [speed]);

  const filterId = `electric-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={`relative ${className}`} style={{ borderRadius }}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ borderRadius }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency={chaos}
              numOctaves="3"
              result="turbulence"
              seed="1"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          filter={`url(#${filterId})`}
          style={{
            filter: `url(#${filterId}) drop-shadow(0 0 4px ${color}) drop-shadow(0 0 8px ${color}40)`,
          }}
        />
        {/* Second layer for extra glow */}
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.6"
          filter={`url(#${filterId})`}
        />
      </svg>
      {children}
    </div>
  );
}
