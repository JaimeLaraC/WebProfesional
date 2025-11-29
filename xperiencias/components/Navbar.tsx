import React from 'react';
import { Globe } from 'lucide-react';
import { Language, NavItem } from '../types';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, activeSection, scrollToSection }) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex items-center gap-3">
        <nav className="bg-[#EBEAEA]/80 backdrop-blur-md border border-white/40 shadow-sm rounded-full px-2 py-1.5 flex items-center gap-1 transition-all duration-300 hover:shadow-md hover:bg-[#EBEAEA]/95 overflow-x-auto max-w-[calc(100vw-80px)] md:max-w-none no-scrollbar">
          {NAV_ITEMS.map((item: NavItem) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${activeSection === item.id 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-500 hover:text-black hover:bg-black/5'}
              `}
            >
              {item.label[language]}
            </button>
          ))}
        </nav>
        
        <button 
          onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
          className="bg-black/5 backdrop-blur-md border border-white/20 hover:bg-black text-black hover:text-white rounded-full h-[46px] px-4 flex items-center gap-2 transition-all duration-300 group shadow-sm shrink-0"
          title="Switch Language"
        >
          <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <div className="relative w-6 h-full flex items-center justify-center overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${language === 'ES' ? 'translate-y-0' : '-translate-y-full'}`}>
              <span className="text-sm font-bold tracking-wide mt-[2px]">ES</span>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${language === 'ES' ? 'translate-y-full' : 'translate-y-0'}`}>
              <span className="text-sm font-bold tracking-wide mt-[2px]">EN</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};