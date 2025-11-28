import React, { useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { ChatWidget } from './components/ChatWidget';
import { TerminalGame } from './components/TerminalGame';

const App: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Custom Cursor Logic
    const moveCursor = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }
      
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    window.addEventListener("mousemove", moveCursor);

    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F2F0] font-sans text-text-primary selection:bg-black selection:text-white cursor-none">
      
      {/* Custom Cursor Elements */}
      <div ref={cursorDotRef} className="cursor-dot hidden md:block"></div>
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block"></div>

      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
      </main>
      
      {/* New Terminal Section */}
      <TerminalGame />
      
      <Contact />
      
      {/* AI Assistant */}
      <ChatWidget />
    </div>
  );
};

export default App;