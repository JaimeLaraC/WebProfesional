import React from 'react';
import { Terminal, Cpu, Globe, Lock, Layers, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';

export const Services: React.FC = () => {
  const { t } = useLanguage();

  // Map icons to service IDs since they can't be stored in JSON/translation files easily
  const getIcon = (id: string) => {
    switch (id) {
      case '1': return <Globe />;
      case '2': return <Cpu />;
      case '3': return <Layers />;
      case '4': return <Lock />;
      case '5': return <Terminal />;
      case '6': return <Zap />;
      default: return <Globe />;
    }
  };

  return (
    <section id="services" className="py-32 bg-[#1C1D20]">
      <div className="container mx-auto px-6 md:px-12">

        <div className="border-t border-white/10 pt-8 mb-20 flex flex-col md:flex-row justify-between items-start gap-8">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-white">
            <TextReveal text={t.services_section.title} />
          </h2>
          <p className="max-w-xl text-gray-400 text-lg">
            <TextReveal text={t.services_section.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.map((service, index) => (
            <div
              key={service.id}
              className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-accent/10"
            >
              <div className="mb-6 w-12 h-12 flex items-center justify-center bg-black/30 rounded-lg text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {React.cloneElement(getIcon(service.id) as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-xl font-display font-medium mb-3 group-hover:translate-x-1 transition-transform duration-300 text-white">
                <TextReveal text={service.title} />
              </h3>
              <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                <TextReveal text={service.description} />
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};