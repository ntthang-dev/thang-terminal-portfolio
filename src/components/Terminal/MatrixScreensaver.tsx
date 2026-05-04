import { useEffect, useRef } from 'react';

interface MatrixScreensaverProps {
  onExit: () => void;
}

export default function MatrixScreensaver({ onExit }: MatrixScreensaverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let intervalId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // SCADA & Power System terms mixed with Matrix characters
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZSCADAPMUGRIDVOLTAGEFREQ'.split('');
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height;
    }

    const draw = () => {
      // Black background with slight opacity to create trails
      ctx.fillStyle = 'rgba(14, 14, 14, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41'; // Terminal green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Send drop to top randomly when it hits the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    intervalId = window.setInterval(draw, 50);

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(intervalId);
    };
  }, []);

  // Listen to any keypress to exit
  useEffect(() => {
    const handleKeyDown = () => onExit();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  return (
    <div
      onClick={onExit}
      className="fixed inset-0 z-[9999] cursor-pointer bg-[#0e0e0e]"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-[#00ff41] bg-[#0e0e0e] px-4 py-2 border border-[#00ff41] animate-pulse select-none text-center"
      >
        [ SYSTEM IDLE — PRESS ANY KEY TO RESUME ]
      </div>
    </div>
  );
}
