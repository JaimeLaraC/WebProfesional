import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 bg-[#F3F2F0] dark:bg-[#050505] min-h-screen transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        {/* Header */}
        <div className={`flex flex-col items-center mb-24 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-display text-center dark:text-white">
            <TextReveal text={t.titles.experience} />
            <span className="text-brand-accent dark:text-blue-500">.</span>
          </h2>
        </div>

        <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="max-w-4xl mx-auto relative min-h-[400px]">
            {/* Center Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-800 transform md:-translate-x-1/2"></div>

            {t.experience.map((item, index) => {
              const isRight = index % 2 === 0;
              return (
                <div key={item.id} className={`relative z-10 mb-16 pl-8 md:pl-0 ${isRight ? 'md:ml-auto md:pl-16' : 'md:mr-auto md:pr-16 md:text-right'} md:w-1/2 group`}>
                  {/* Timeline Dot */}
                  <div className={`absolute top-6 w-3 h-3 bg-black dark:bg-blue-500 rounded-full border-4 border-[#F3F2F0] dark:border-[#050505] shadow-[0_0_0_2px_rgba(0,0,0,1)] dark:shadow-[0_0_0_2px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-transform duration-300 ${isRight ? 'left-[-5px] md:left-[-5px]' : 'left-[-5px] md:left-auto md:right-[-5px]'}`} />

                  {/* Content Card */}
                  <div className="group-hover:-translate-y-1 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-black dark:bg-zinc-800 text-white text-xs font-bold rounded-full mb-3 shadow-lg shadow-black/20 dark:shadow-black/50">
                      <TextReveal text={item.year} />
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 dark:text-white">
                      <TextReveal text={item.role} />
                    </h3>
                    <h4 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-4 font-display italic">
                      <TextReveal text={item.company} />
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                      <TextReveal text={item.description} />
                    </p>

                    {/* Tech Stack */}
                    <div className={`flex flex-wrap gap-2 ${!isRight ? 'md:justify-end' : ''}`}>
                      {item.techStack.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded border border-gray-200 dark:border-zinc-800 shadow-sm">
                          <TextReveal text={tag} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
