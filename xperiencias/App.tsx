import React, { useState } from 'react';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Terminal } from './components/Terminal';
import { Language } from './types';
import { MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ES');
  const [activeSection, setActiveSection] = useState('about');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F2F0] font-sans text-text-primary selection:bg-black selection:text-white">
      <Cursor />
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      
      <main>
        <Hero language={language} />
        <Experience language={language} />
        <Education language={language} />
        <Projects language={language} />
        <Skills language={language} />
        <Terminal language={language} />
      </main>

      <footer className="py-12 bg-white text-center border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold text-gray-800 font-display">
              {language === 'ES' ? '¿Listo para crear algo increíble?' : 'Ready to build something amazing?'}
            </h2>
            <a href="mailto:contact@jaime.dev" className="px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg shadow-black/20">
              {language === 'ES' ? 'Hablemos 👋' : 'Let\'s Talk 👋'}
            </a>
            <p className="text-gray-400 text-sm mt-8">
              {language === 'ES' ? 'Creado con React & IA por Jaime Lara' : 'Built with React & AI by Jaime Lara'}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
        <button className="w-14 h-14 bg-black text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group">
          <MessageCircle className="w-6 h-6 group-hover:text-green-400 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default App;