import { useEffect, useRef } from 'react';

export default function RotorAngleStability() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    
    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // State
    let t = 0;
    const points: number[] = [];
    const MAX_POINTS = 300;
    
    // Disturbance trigger
    let disturbanceTime = -1000;
    
    let animationId: number;
    const draw = () => {
      // Check for periodic disturbance
      if (t - disturbanceTime > 300) {
        if (Math.random() > 0.99) {
          disturbanceTime = t;
        }
      }
      
      // Dampened sine wave
      // delta = delta0 + A * e^(-zeta * wn * t) * sin(wd * t)
      let val = 0;
      const timeSinceDisturbance = t - disturbanceTime;
      if (timeSinceDisturbance >= 0) {
        const A = 60; // amplitude
        const zeta = 0.05; // damping ratio
        const wn = 0.1; // natural frequency
        const wd = wn * Math.sqrt(1 - zeta * zeta);
        val = A * Math.exp(-zeta * wn * timeSinceDisturbance) * Math.sin(wd * timeSinceDisturbance);
      }
      
      points.push(val);
      if (points.length > MAX_POINTS) points.shift();

      ctx.clearRect(0, 0, width, height);

      // Draw Grid
      ctx.strokeStyle = '#1b1b1b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i=0; i<height; i+=20) { ctx.moveTo(0, i); ctx.lineTo(width, i); }
      for(let i=0; i<width; i+=20) { ctx.moveTo(i, 0); ctx.lineTo(i, height); }
      ctx.stroke();

      // Centerline
      ctx.strokeStyle = '#3b4b37';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Stability boundaries
      ctx.strokeStyle = '#ffb4ab'; // error
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2 - 70);
      ctx.lineTo(width, height / 2 - 70);
      ctx.moveTo(0, height / 2 + 70);
      ctx.lineTo(width, height / 2 + 70);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw curve
      ctx.strokeStyle = '#00fbfb'; // neon cyan
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      const step = width / MAX_POINTS;
      for (let i = 0; i < points.length; i++) {
        const x = i * step;
        const y = height / 2 - points[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw current value head
      if (points.length > 0) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc((points.length - 1) * step, height / 2 - points[points.length - 1], 4, 0, Math.PI * 2);
        ctx.fill();
      }

      t += 1;
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
      <div className="absolute top-2 left-2 text-[#00fbfb] font-mono text-[10px] opacity-70 z-10">
        δ (DEG) | DAMPING RATIO: 0.05
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
