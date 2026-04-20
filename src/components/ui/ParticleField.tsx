import React, { useRef, useEffect } from 'react';

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; radius: number; opacity: number; speed: number; drift: number }[] = [];
    let particleRgb = '138 170 224';
    let particleLayerOpacity = '0.6';
    let particleDensityMultiplier = 1;
    let particleRadiusMultiplier = 1;
    let particleHaloOpacity = 0.14;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const syncThemeTokens = () => {
      particleRgb =
        getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb').trim() ||
        '138 170 224';
      particleLayerOpacity =
        getComputedStyle(document.documentElement).getPropertyValue('--particle-layer-opacity').trim() ||
        '0.6';
      particleDensityMultiplier = Number.parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--particle-density-multiplier')
          .trim() || '1'
      );
      particleRadiusMultiplier = Number.parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--particle-radius-multiplier')
          .trim() || '1'
      );
      particleHaloOpacity = Number.parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--particle-halo-opacity')
          .trim() || '0.14'
      );
      canvas.style.opacity = particleLayerOpacity;
    };

    const init = () => {
      syncThemeTokens();
      resize();
      const count = Math.floor(((canvas.width * canvas.height) / 18000) * particleDensityMultiplier);
      particles = Array.from({ length: Math.min(count, 120) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: (Math.random() * 1.2 + 0.3) * particleRadiusMultiplier,
        opacity: Math.random() * 0.36 + 0.12,
        speed: Math.random() * 0.15 + 0.02,
        drift: (Math.random() - 0.5) * 0.08,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${particleRgb} / ${p.opacity * particleHaloOpacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${particleRgb} / ${p.opacity})`;
        ctx.fill();

        p.y -= p.speed;
        p.x += p.drift;

        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
      }
      animationId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    const observer = new MutationObserver(init);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', init);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 'var(--particle-layer-opacity, 0.6)' }}
      aria-hidden="true"
    />
  );
};

export default ParticleField;
