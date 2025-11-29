import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import TextReveal from './TextReveal';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const { t, language, toggleLanguage } = useLanguage();

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'education', label: t.nav.education },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
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
  }, [navItems]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex items-center gap-3">
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
              <TextReveal text={item.label} />
            </button>
          ))}
        </nav>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="bg-black/5 backdrop-blur-md border border-white/20 hover:bg-black text-black hover:text-white rounded-full h-[46px] px-4 flex items-center gap-2 transition-all duration-300 group shadow-sm"
          title="Switch Language"
        >
          <Globe size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          <div className="relative w-8 h-full flex items-center justify-center overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${language === 'es' ? 'translate-y-0' : '-translate-y-full'}`}>
              <span className="text-sm font-bold tracking-wide mt-[2px]">ES</span>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${language === 'en' ? 'translate-y-0' : 'translate-y-full'}`}>
              <span className="text-sm font-bold tracking-wide mt-[2px]">EN</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};