import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import TextReveal from './TextReveal';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-center">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden bg-white/80 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-white/10 text-black dark:text-white rounded-full h-[46px] w-[46px] flex items-center justify-center shadow-sm"
          >
            <Menu size={20} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-black/5 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-full h-[46px] w-[46px] md:w-auto md:px-4 flex items-center justify-center gap-2 transition-all duration-300 group shadow-sm shrink-0"
            title="Switch Theme"
          >
            <div className="relative w-4 h-4">
              <Sun size={16} className={`absolute inset-0 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}`} />
              <Moon size={16} className={`absolute inset-0 transition-all duration-500 ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'}`} />
            </div>

            <div className="relative w-10 h-5 overflow-hidden hidden md:block">
              <div
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${theme === 'light' ? 'translate-y-0' : '-translate-y-full'
                  }`}
              >
                <span className="text-xs font-bold tracking-wide mt-[2px] uppercase">LGT</span>
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${theme === 'light' ? 'translate-y-full' : 'translate-y-0'
                  }`}
              >
                <span className="text-xs font-bold tracking-wide mt-[2px] uppercase">DRK</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex bg-[#EBEAEA]/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm rounded-full px-2 py-1.5 items-center gap-1 transition-all duration-300 hover:shadow-md hover:bg-[#EBEAEA]/95 dark:hover:bg-[#1A1A1A]/95">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeSection === item.id
                    ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}
                `}
              >
                <TextReveal text={item.label} />
              </button>
            ))}
          </nav>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="bg-black/5 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-full h-[46px] w-[46px] md:w-auto md:px-4 flex items-center justify-center gap-2 transition-all duration-300 group shadow-sm shrink-0"
            title="Switch Language"
          >
            <Globe size={16} className="hidden md:block group-hover:rotate-180 transition-transform duration-500" />
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-[#F3F2F0] dark:bg-[#050505] z-[70] md:hidden shadow-2xl border-r border-gray-200 dark:border-white/10 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold font-display dark:text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors dark:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => scrollTo(item.id)}
                    className={`
                      text-left px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300
                      ${activeSection === item.id
                        ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}
                    `}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-gray-200 dark:border-white/10">
                <p className="text-xs text-gray-400 text-center">
                  © {new Date().getFullYear()} Jaime Lara
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};