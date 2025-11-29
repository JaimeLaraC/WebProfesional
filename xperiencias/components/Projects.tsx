import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Language } from '../types';
import { PROJECTS_DATA } from '../constants';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
  language: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="py-24 bg-[#F3F2F0]">
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <div className={`flex justify-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-display">
            <span>{language === 'ES' ? 'proyectos' : 'projects'}</span>
            <span className="text-brand-accent">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <div 
              key={project.id} 
              className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="transition-all duration-300 ease-out preserve-3d bg-[#E5E5E5] rounded-[2.5rem] p-10 relative min-h-[480px] flex flex-col justify-between group hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-2">
                <div className="flex justify-between items-start transform translate-z-10 group-hover:translate-z-20 transition-transform">
                  <h3 className="text-3xl font-bold max-w-[70%] leading-tight text-gray-800 font-display">
                    {project.title[language]}
                  </h3>
                  <button className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 group-hover:rotate-45 cursor-pointer">
                    <ArrowUpRight className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="relative z-10 mt-8 mb-8 transform translate-z-10 group-hover:translate-z-20 transition-transform">
                  <p className="text-gray-600 text-base leading-relaxed font-medium">
                    {project.description[language]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10 transform translate-z-10 group-hover:translate-z-20 transition-transform">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-[#D4D4D4] rounded-full text-xs font-bold text-gray-700 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-[-30px] right-4 text-[14rem] font-bold text-gray-300/40 select-none pointer-events-none leading-none group-hover:text-gray-300/60 transition-colors font-display">
                  {project.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};