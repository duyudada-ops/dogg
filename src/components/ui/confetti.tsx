import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ConfettiProps {
  trigger?: boolean;
  className?: string;
}

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
  rotation: number;
}

export const Confetti = ({ trigger = false, className }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--success))',
    'hsl(1 100% 73%)',
    'hsl(35 100% 65%)'
  ];

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
      const newPieces: ConfettiPiece[] = [];
      
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          rotation: Math.random() * 360
        });
      }
      
      setPieces(newPieces);
      
      // Clear confetti after animation
      const timer = setTimeout(() => {
        setIsActive(false);
        setPieces([]);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!isActive) return null;

  return (
    <div className={cn('fixed inset-0 pointer-events-none z-50 overflow-hidden', className)}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-[confetti-fall_3s_ease-out_forwards]"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            transform: 'translateY(-100vh)',
          }}
        >
          <div 
            className="rounded-sm opacity-90 animate-spin"
            style={{
              backgroundColor: piece.color,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              transform: `rotate(${piece.rotation}deg)`
            }}
          />
        </div>
      ))}
    </div>
  );
};