import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { id: 'about', label: 'Sobre mí' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'education', label: 'Educación' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Habilidades' },
  ];

  const handleScroll = () => {
    const sections = navItems.map(item => document.getElementById(item.id));
    const scrollPosition = window.scrollY + 200;

    for (const section of sections) {
      if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
        setActiveSection(section.id);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-[#EBEAEA]/80 backdrop-blur-md border border-white/40 shadow-sm rounded-full px-2 py-1.5 flex items-center gap-1 transition-all duration-300 hover:shadow-md hover:bg-[#EBEAEA]/95">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${activeSection === item.id 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-500 hover:text-black hover:bg-black/5'}
            `}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};