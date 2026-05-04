import { useEffect, useRef } from 'react';

export default function LiveGridTransient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    
    // Resize handler
    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Grid data
    const history: number[] = new Array(200).fill(0);
    let offset = 0;
    
    // Animation loop
    let animationId: number;
    const draw = () => {
      // Create noisy transient
      offset += 0.1;
      const noise = Math.sin(offset) * 10 + (Math.random() - 0.5) * 40;
      
      // Every so often, create a large spike (transient)
      const spike = Math.random() > 0.95 ? (Math.random() > 0.5 ? 80 : -80) : 0;
      
      history.push(noise + spike);
      history.shift();

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = '#1b1b1b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i=0; i<height; i+=20) { ctx.moveTo(0, i); ctx.lineTo(width, i); }
      for(let i=0; i<width; i+=20) { ctx.moveTo(i, 0); ctx.lineTo(i, height); }
      ctx.stroke();

      // Draw center line
      ctx.strokeStyle = '#3b4b37';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw signal
      ctx.strokeStyle = '#00ff41';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      const step = width / history.length;
      for (let i = 0; i < history.length; i++) {
        const x = i * step;
        const y = height / 2 - history[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      // Draw scanline
      ctx.fillStyle = 'rgba(0, 255, 65, 0.1)';
      const scanX = (Date.now() / 10) % width;
      ctx.fillRect(scanX, 0, 2, height);

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full h-full bg-[#0e0e0e] relative overflow-hidden">
      <div className="absolute top-2 left-2 text-[#00ff41] font-mono text-[10px] opacity-70 z-10">
        FREQ: 50.01Hz | NOISE: 4.2%
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
