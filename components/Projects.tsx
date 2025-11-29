import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Bot de Telegram IA',
    description: 'Diseñé y programé un bot de Telegram utilizando Python y la API de Telegram. Integra funcionalidades avanzadas como respuestas automáticas y conexión con APIs externas (ChatGPT) para interacciones inteligentes.',
    tags: ['Python', 'Telegram API', 'ChatGPT'],
  },
  {
    id: '2',
    title: 'Cloud con Raspberry Pi',
    description: 'Configuré y gestioné un servidor Nextcloud en una Raspberry Pi para crear una nube privada. Permite almacenar, sincronizar y acceder a archivos de manera segura desde cualquier dispositivo en la red.',
    tags: ['Raspberry Pi', 'Nextcloud', 'Linux'],
  },
  {
    id: '3',
    title: 'Detección con Dron',
    description: 'Sistema de detección de vehículos en tiempo real utilizando YOLOv5 y un dron. Permite identificar y rastrear vehículos en movimiento, optimizando el análisis visual aéreo.',
    tags: ['YOLOv5', 'Python', 'Computer Vision'],
  },
  {
    id: '4',
    title: 'Predicción Deportiva IA',
    description: 'Modelo de IA para predecir resultados de fútbol. Analiza datos históricos y estadísticas clave (goles, posesión, rendimiento) para ofrecer predicciones precisas.',
    tags: ['AI', 'Machine Learning', 'Data Science'],
  },
  {
    id: '5',
    title: 'Diagnóstico IA',
    description: 'Sistema avanzado de diagnóstico para automoción impulsado por inteligencia artificial, mejorando la precisión y rapidez en la detección de fallos mecánicos.',
    tags: ['AI', 'Python', 'Machine Learning'],
  },
  {
    id: '6',
    title: 'Auditoría WiFi',
    description: 'Herramienta de ciberseguridad para auditoría y pentesting de redes inalámbricas, permitiendo identificar vulnerabilidades en protocolos WPA/WPA2.',
    tags: ['Cybersecurity', 'Hacking', 'Python'],
  }
];

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
  return (
    <section id="projects" className="py-24 bg-[#F3F2F0]">
      <div className="container mx-auto px-6 md:px-12">

        <div className="flex justify-center mb-16 reveal">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-display">proyectos<span className="text-brand-accent">.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <TiltCard className="bg-[#E5E5E5] rounded-[2.5rem] p-10 relative min-h-[480px] flex flex-col justify-between group hover:shadow-2xl hover:shadow-gray-300/50">

                {/* Header */}
                <div className="flex justify-between items-start transform translate-z-10 group-hover:translate-z-20 transition-transform">
                  <h3 className="text-3xl font-bold max-w-[70%] leading-tight text-gray-800 font-display">{project.title}</h3>
                  <div className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={22} />
                  </div>
                </div>

                {/* Body */}
                <div className="relative z-10 mt-8 mb-8 transform translate-z-10 group-hover:translate-z-20 transition-transform">
                  <p className="text-gray-600 text-base leading-relaxed font-medium">
                    {project.description}
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
    </section>
  );
};