import React from 'react';
import { ExperienceItem } from '../types';

const experienceData: ExperienceItem[] = [
  {
    id: '1',
    role: 'AI Diagnostic Test Engineer',
    company: 'Cojali S. L.',
    period: '2025',
    description: 'Desarrollo de pruebas de diagnóstico impulsadas por inteligencia artificial. Contrato de formación enfocado en la innovación automotriz y tecnológica en Campo de Criptana.'
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#F3F2F0]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-center mb-24 reveal">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-display">experiencia<span className="text-brand-accent">.</span></h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {experienceData.length === 0 ? (
            <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-white/50 backdrop-blur-sm text-center reveal">
              <p className="text-gray-700 text-xl font-medium">
                Aún no tengo experiencia laboral formal, pero estoy construyendo proyectos y aprendiendo cada día.
              </p>
            </div>
          ) : (
            experienceData.map((item) => (
              <div 
                key={item.id} 
                className="transition-all duration-500 reveal mb-12"
              >
                <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-white/50 backdrop-blur-sm hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="flex flex-col md:flex-row justify-between md:items-start mb-8 gap-4">
                    <div>
                       <h3 className="text-3xl font-bold mb-2 font-display">{item.role}</h3>
                       <span className="text-xl text-gray-500 font-medium block">{item.company}</span>
                    </div>
                    <div className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold whitespace-nowrap self-start md:self-auto shadow-lg shadow-black/20">
                      {item.period}
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
