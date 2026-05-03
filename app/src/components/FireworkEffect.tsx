import { useEffect, useRef } from 'react';

interface Firework {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
}

export function FireworkEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#FFD700', '#FFA000', '#FF8F00', '#FF5252', '#FFECB3', '#FFFFFF'];

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const vx = (Math.random() - 0.5) * 4;
      const vy = -(Math.random() * 5 + 8);
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        x,
        y,
        vx,
        vy,
        color,
        life: 0,
        maxLife: 100,
        size: Math.random() * 3 + 2,
      };
    };

    const explode = (firework: Firework) => {
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 4 + 2;
        fireworksRef.current.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: firework.color,
          life: 0,
          maxLife: 60,
          size: Math.random() * 2 + 1,
        });
      }
    };

    // Create initial fireworks
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        fireworksRef.current.push(createFirework());
      }, i * 500);
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Randomly create new fireworks
      if (Math.random() < 0.02) {
        fireworksRef.current.push(createFirework());
      }

      fireworksRef.current = fireworksRef.current.filter((firework) => {
        firework.x += firework.vx;
        firework.y += firework.vy;
        firework.vy += 0.15; // gravity
        firework.life++;

        // Draw firework
        ctx.save();
        ctx.globalAlpha = 1 - firework.life / firework.maxLife;
        ctx.fillStyle = firework.color;
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = firework.color;
        ctx.fill();
        ctx.restore();

        // Explode when reaching peak or life ends
        if (firework.vy > 0 && firework.life < 20) {
          explode(firework);
          return false;
        }

        return firework.life < firework.maxLife;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
