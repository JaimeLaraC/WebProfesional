import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import VSCodeViewer from './VSCodeViewer';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 30; // Increased sensitivity slightly
    const y = (e.clientY - top - height / 2) / 30;
    setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out preserve-3d ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openProject = (project: Project) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setActiveProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-24 bg-[#F3F2F0]">
      <div className="container mx-auto px-6 md:px-12">

        <div className="flex justify-center mb-16 reveal">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-display">
            <TextReveal text={t.titles.projects} /><span className="text-brand-accent">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projects.map((project, index) => (
            <div
              key={project.id}
              className="reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <TiltCard className="bg-[#E5E5E5] rounded-[2.5rem] p-10 relative min-h-[480px] flex flex-col justify-between group hover:shadow-2xl hover:shadow-gray-300/50">

                {/* Header */}
                <div className="flex justify-between items-start transform translate-z-10 group-hover:translate-z-20 transition-transform">
                  <h3 className="text-3xl font-bold max-w-[70%] leading-tight text-gray-800 font-display"><TextReveal text={project.title} /></h3>
                  <button
                    onClick={() => openProject(project)}
                    className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 group-hover:rotate-45 cursor-pointer"
                  >
                    <ArrowUpRight size={22} />
                  </button>
                </div>

                {/* Body */}
                <div className="relative z-10 mt-8 mb-8 transform translate-z-10 group-hover:translate-z-20 transition-transform">
                  <p className="text-gray-600 text-base leading-relaxed font-medium">
                    <TextReveal text={project.description} />
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap gap-2 relative z-10 transform translate-z-10 group-hover:translate-z-20 transition-transform">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-[#D4D4D4] rounded-full text-xs font-bold text-gray-700 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Big Number Background */}
                <div className="absolute bottom-[-30px] right-4 text-[14rem] font-bold text-gray-300/40 select-none pointer-events-none leading-none group-hover:text-gray-300/60 transition-colors font-display">
                  {index + 1}
                </div>

              </TiltCard>
            </div>
          ))}
        </div>

      </div>

      {/* VS Code Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProject}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -20, y: 100 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: 20, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl h-[85vh] relative z-10"
              style={{ perspective: 1000 }}
            >
              <VSCodeViewer
                initialProject={activeProject}
                projects={t.projects}
                onClose={closeProject}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};