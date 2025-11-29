import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-24">

          {/* Left: Headline */}
          <div className="flex-1 text-center lg:text-left reveal active">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-text-primary leading-[1.1] font-display">
              <TextReveal text={t.hero.greeting} /><br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10">Jaime</span>
                <span className="text-brand-accent text-6xl md:text-8xl">.</span>
                <svg className="absolute w-full h-4 -bottom-1 left-0 z-0 text-yellow-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-2xl md:text-3xl text-gray-800 font-medium">
              <TextReveal text={t.hero.role} />
            </p>
          </div>

          {/* Right: Bio */}
          <div className="flex-1 max-w-xl reveal" style={{ transitionDelay: '0.2s' }}>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light text-balance mb-6">
              <TextReveal text={t.hero.description_start} /> <strong className="font-semibold text-text-primary"><TextReveal text={t.hero.description_bold_1} /></strong> <TextReveal text={t.hero.description_mid} /> <strong className="font-semibold text-text-primary"><TextReveal text={t.hero.description_bold_2} /></strong><TextReveal text={t.hero.description_end} />
            </p>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light text-balance italic border-l-4 border-gray-300 pl-4">
              <TextReveal text={t.hero.quote} />
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};