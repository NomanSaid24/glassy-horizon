// GradientBorder - Google-style animated gradient border
import { type ReactNode } from 'react';

interface GradientBorderProps {
  children: ReactNode;
  borderRadius?: number;
  className?: string;
  colors?: string[];
  borderWidth?: number;
}

export default function GradientBorder({
  children,
  borderRadius = 16,
  className = '',
  colors = ['#a855f7', '#d946ef', '#06b6d4', '#a855f7'],
  borderWidth = 1.5,
}: GradientBorderProps) {
  const gradient = `conic-gradient(from var(--gradient-angle, 0deg), ${colors.join(', ')})`;

  return (
    <div
      className={`relative ${className}`}
      style={{
        borderRadius,
        padding: borderWidth,
        background: gradient,
        animation: 'gradient-rotate 4s linear infinite',
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          borderRadius: borderRadius - borderWidth,
          background: 'hsl(var(--background))',
        }}
      >
        {children}
      </div>
    </div>
  );
}
