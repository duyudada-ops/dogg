import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const Confetti = ({ isActive, onComplete }: ConfettiProps) => {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (isActive) {
      const colors = [
        'hsl(1 100% 73%)',   // primary
        'hsl(35 100% 65%)',  // warm
        'hsl(197 71% 73%)',  // secondary
        'hsl(120 61% 50%)',  // success
        'hsl(45 90% 55%)',   // training
      ];

      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2000,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));

      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive || pieces.length === 0) return null;

  return createPortal(
    <div className="confetti">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}ms`,
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>,
    document.body
  );
};

export { Confetti };