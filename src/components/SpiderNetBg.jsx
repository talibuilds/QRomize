import React, { useEffect, useRef } from 'react';

const SpiderNetBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const maxParticles = 120; // Number of nodes
    
    let mouse = {
      x: null,
      y: null,
      radius: 250 // How far the spidernet reaches from mouse
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseout', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resize);

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        // Only draw the particle itself if it's near the mouse
        let distanceToMouse = Infinity;
        if (mouse.x != null && mouse.y != null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        }
        
        if (distanceToMouse < mouse.radius) {
          const opacity = 1 - (distanceToMouse / mouse.radius);
          ctx.fillStyle = `rgba(197, 160, 89, ${opacity * 0.5})`; // Gold particles
          ctx.fill();
        }
      }

      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        let size = Math.random() * 1.5 + 0.5;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let dx = (Math.random() - 0.5) * 0.8; // Slow drift
        let dy = (Math.random() - 0.5) * 0.8;
        particles.push(new Particle(x, y, dx, dy, size));
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        if (mouse.x != null && mouse.y != null) {
          let dxMouse = particles[a].x - mouse.x;
          let dyMouse = particles[a].y - mouse.y;
          let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distanceMouse < mouse.radius) {
            const mouseOpacity = 1 - (distanceMouse / mouse.radius);
            
            // Connect to mouse
            ctx.beginPath();
            ctx.strokeStyle = `rgba(197, 160, 89, ${mouseOpacity * 0.3})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            
            // Connect to other nearby particles to form the "net"
            for (let b = a + 1; b < particles.length; b++) {
              let dx = particles[a].x - particles[b].x;
              let dy = particles[a].y - particles[b].y;
              let distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 120) {
                 const lineOpacity = 1 - (distance / 120);
                 ctx.beginPath();
                 // Multiply opacities so it fades out near edges of hover radius
                 ctx.strokeStyle = `rgba(197, 160, 89, ${lineOpacity * mouseOpacity * 0.6})`;
                 ctx.lineWidth = 1;
                 ctx.moveTo(particles[a].x, particles[a].y);
                 ctx.lineTo(particles[b].x, particles[b].y);
                 ctx.stroke();
              }
            }
          }
        }
      }
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
};

export default SpiderNetBg;
