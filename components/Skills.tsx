import React, { useState, useRef, useEffect } from 'react';

const skillsData = [
  { name: 'Python', color: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  { name: 'Ciberseguridad', color: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  { name: 'Deep Learning', color: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  { name: 'Machine Learning', color: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
  { name: 'React', color: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  { name: 'APIs', color: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  { name: 'Automatización', color: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
  { name: 'Hacking Ético', color: 'bg-slate-800', text: 'text-white', border: 'border-slate-600' },
  { name: 'Java', color: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  { name: 'C++', color: 'bg-blue-600', text: 'text-white', border: 'border-blue-500' },
  { name: 'Git', color: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  { name: 'Linux', color: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  { name: 'SQL', color: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  { name: 'Docker', color: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
];

interface PhysicsBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  width: number;
  height: number;
  radius: number; // Collision radius approximation
  isDragging: boolean;
}

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<PhysicsBody[]>([]);
  const requestRef = useRef<number>(0);
  const [hasStarted, setHasStarted] = useState(false);
  const dragInfo = useRef<{ id: number; startX: number; startY: number; lastX: number; lastY: number } | null>(null);

  // Physics Constants
  const GRAVITY = 0.4;
  const FRICTION = 0.98; // Air resistance
  const WALL_BOUNCE = 0.7;
  const BODY_BOUNCE = 0.8; // Bounciness between pills
  const FLOOR_OFFSET = 0; 
  
  // Initialize
  useEffect(() => {
    if (!containerRef.current) return;

    const containerW = containerRef.current.clientWidth;
    // const containerH = containerRef.current.clientHeight;
    
    // Estimate width based on characters approx (10px per char + 48px padding)
    // This makes collisions more accurate than fixed width
    bodiesRef.current = skillsData.map((skill, i) => {
      const estimatedWidth = skill.name.length * 10 + 50; 
      const estimatedHeight = 56;
      
      // Random initial scatter position above the view
      const x = Math.random() * (containerW - estimatedWidth);
      const y = -100 - Math.random() * 500; // Start off-screen top

      return {
        x,
        y,
        vx: 0,
        vy: 0,
        rot: (Math.random() - 0.5) * 20,
        vRot: 0,
        width: estimatedWidth,
        height: estimatedHeight,
        radius: estimatedWidth * 0.45, // Slightly smaller than half-width for tighter packing
        isDragging: false
      };
    });

    // Initial render
    updateDOM();

    // Trigger animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          startPhysicsLoop();
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const startPhysicsLoop = () => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      // Delta time calculation for smoother physics on different refresh rates could go here
      // For simplicity we use fixed steps
      
      if (!containerRef.current) return;
      const containerW = containerRef.current.clientWidth;
      const containerH = containerRef.current.clientHeight;

      const bodies = bodiesRef.current;

      // 1. Update Positions & Apply Forces
      bodies.forEach((body) => {
        if (body.isDragging) return;

        body.vy += GRAVITY;
        body.vx *= FRICTION;
        body.vy *= FRICTION;
        body.vRot *= 0.95;

        body.x += body.vx;
        body.y += body.vy;
        body.rot += body.vRot;
      });

      // 2. Resolve Collisions (Iterative constraint solver)
      // We run this multiple times per frame for stability
      const iterations = 4;
      for (let k = 0; k < iterations; k++) {
        
        // Body vs Body
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const b1 = bodies[i];
            const b2 = bodies[j];
            
            // Skip if dragging one of them (optional, but smoother)
            if (b1.isDragging || b2.isDragging) continue;

            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const distSq = dx*dx + dy*dy;
            const minDist = b1.radius + b2.radius; // Use combined radius

            if (distSq < minDist * minDist && distSq > 0) {
               const dist = Math.sqrt(distSq);
               const overlap = minDist - dist;
               const nx = dx / dist;
               const ny = dy / dist;

               // Separate bodies
               const totalMass = 2; // assume equal mass
               const m1Ratio = 0.5;
               const m2Ratio = 0.5;
               
               // Move apart
               b1.x -= nx * overlap * m1Ratio;
               b1.y -= ny * overlap * m1Ratio;
               b2.x += nx * overlap * m2Ratio;
               b2.y += ny * overlap * m2Ratio;

               // Exchange velocities (Elastic collision)
               // Simple impulse method
               const rvx = b2.vx - b1.vx;
               const rvy = b2.vy - b1.vy;
               const velAlongNormal = rvx * nx + rvy * ny;

               if (velAlongNormal < 0) {
                 const restitution = BODY_BOUNCE;
                 const jVal = -(1 + restitution) * velAlongNormal;
                 const impulse = jVal / totalMass; // 1/m1 + 1/m2 = 1/1 + 1/1 = 2

                 b1.vx -= nx * impulse;
                 b1.vy -= ny * impulse;
                 b2.vx += nx * impulse;
                 b2.vy += ny * impulse;

                 // Add spin based on collision
                 b1.vRot -= velAlongNormal * 0.5 * (Math.random() > 0.5 ? 1 : -1);
                 b2.vRot += velAlongNormal * 0.5 * (Math.random() > 0.5 ? 1 : -1);
               }
            }
          }
        }

        // Body vs Walls/Floor
        bodies.forEach(body => {
           if (body.isDragging) return;

           // Floor
           const floorLimit = containerH - body.height / 2 - FLOOR_OFFSET; 
           
           const centerX = body.x + body.width / 2;
           const centerY = body.y + body.height / 2;
           
           // Floor check
           if (centerY + body.height/2 > containerH) {
             body.y = containerH - body.height;
             body.vy *= -WALL_BOUNCE;
             body.vx *= 0.9; // Floor friction
             // Spin on impact
             body.vRot += body.vx * 0.2;
             
             if (Math.abs(body.vy) < GRAVITY * 2) body.vy = 0;
           }

           // Walls
           if (centerX - body.width/2 < 0) {
             body.x = 0;
             body.vx *= -WALL_BOUNCE;
           }
           if (centerX + body.width/2 > containerW) {
             body.x = containerW - body.width;
             body.vx *= -WALL_BOUNCE;
           }
        });
      }

      updateDOM();
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
  };

  const updateDOM = () => {
    bodiesRef.current.forEach((body, i) => {
      const el = elementsRef.current[i];
      if (el) {
        // Since we kept x,y as top-left
        const scale = body.isDragging ? 1.15 : 1;
        const zIndex = body.isDragging ? 100 : 1;
        const shadow = body.isDragging 
          ? '0 25px 50px -12px rgb(0 0 0 / 0.25)' 
          : '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        
        el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rot}deg) scale(${scale})`;
        el.style.zIndex = zIndex.toString();
        el.style.boxShadow = shadow;
      }
    });
  };

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    e.preventDefault();
    const body = bodiesRef.current[index];
    if (!body) return;

    body.isDragging = true;
    body.vx = 0;
    body.vy = 0;
    
    (e.target as Element).setPointerCapture(e.pointerId);

    const rect = elementsRef.current[index]?.getBoundingClientRect();
    if (!rect) return;

    // Offset from the Top-Left of the element
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    dragInfo.current = {
      id: index,
      startX: offsetX,
      startY: offsetY,
      lastX: e.clientX,
      lastY: e.clientY
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragInfo.current || !containerRef.current) return;
    
    e.preventDefault();
    const { id, startX, startY, lastX, lastY } = dragInfo.current;
    const body = bodiesRef.current[id];

    // Velocity for throw
    const vx = e.clientX - lastX;
    const vy = e.clientY - lastY;
    
    body.vx = vx;
    body.vy = vy;
    body.rot = vx * 1.5; // Tilt while dragging

    const containerRect = containerRef.current.getBoundingClientRect();
    // New Position relative to container
    body.x = e.clientX - containerRect.left - startX;
    body.y = e.clientY - containerRect.top - startY;

    dragInfo.current = { ...dragInfo.current, lastX: e.clientX, lastY: e.clientY };
    
    // Immediate update
    updateDOM(); 
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragInfo.current) return;
    const { id } = dragInfo.current;
    const body = bodiesRef.current[id];
    
    body.isDragging = false;
    body.vRot = body.vx * 0.3; // Spin on throw

    (e.target as Element).releasePointerCapture(e.pointerId);
    dragInfo.current = null;
  };

  return (
    <section className="min-h-screen flex flex-col items-center py-24 overflow-hidden relative">
      
      {/* Title / Header */}
      <div className="container mx-auto px-6 text-center z-10 mb-12 pointer-events-none select-none">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 inline-block font-display">
          MIS
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500"> HABILIDADES</span>
        </h2>
        <p className="mt-6 text-gray-400 text-lg">
          {hasStarted ? "¡Lánzalas y juega con ellas!" : "Haz scroll hacia abajo..."}
        </p>
      </div>

      {/* Physics Container - Invisible, integrated into page */}
      <div 
        ref={containerRef}
        className="w-full max-w-[95vw] h-[75vh] relative touch-none z-20"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Floor Line Visual (Optional, helps define the 'ground') */}
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>

        {skillsData.map((skill, index) => (
          <div
            key={index}
            ref={(el) => (elementsRef.current[index] = el)}
            onPointerDown={(e) => handlePointerDown(e, index)}
            className={`
              absolute left-0 top-0
              px-6 py-3
              flex items-center justify-center
              rounded-full
              cursor-grab active:cursor-grabbing
              font-bold text-lg md:text-xl
              border-2
              select-none
              transition-colors duration-300
              ${skill.color} ${skill.text} ${skill.border}
              hover:brightness-95
            `}
            style={{ 
              willChange: 'transform',
              // Initial off-screen is handled by JS, but we hide until JS loads to avoid FOUC
              transform: 'translate3d(0, -200px, 0)'
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>

    </section>
  );
};