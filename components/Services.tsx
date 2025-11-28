import React from 'react';
import { Terminal, Cpu, Globe, Lock, Layers, Zap } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Full Stack Engineering',
    description: 'Scalable web architectures built with React, Node.js, and modern cloud infrastructure.',
    icon: <Globe />
  },
  {
    id: '2',
    title: 'Artificial Intelligence',
    description: 'Integration of LLMs, predictive models, and custom AI agents for business automation.',
    icon: <Cpu />
  },
  {
    id: '3',
    title: 'System Architecture',
    description: 'Designing robust, high-availability systems capable of handling millions of requests.',
    icon: <Layers />
  },
  {
    id: '4',
    title: 'Cybersecurity',
    description: 'Implementing security-first practices to protect data and infrastructure from threats.',
    icon: <Lock />
  },
  {
    id: '5',
    title: 'DevOps & Cloud',
    description: 'Automated CI/CD pipelines and cloud-native deployments on AWS and GCP.',
    icon: <Terminal />
  },
  {
    id: '6',
    title: 'Performance',
    description: 'Optimization of existing systems for maximum speed and resource efficiency.',
    icon: <Zap />
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#1C1D20]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="border-t border-white/10 pt-8 mb-20 flex flex-col md:flex-row justify-between items-start gap-8">
          <h2 className="text-3xl md:text-4xl font-display font-semibold">
            Technical <br/> Expertise
          </h2>
          <p className="max-w-xl text-gray-400 text-lg">
            I combine engineering precision with creative problem solving to deliver software that drives business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-accent/10"
            >
              <div className="mb-6 w-12 h-12 flex items-center justify-center bg-black/30 rounded-lg text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {React.cloneElement(service.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-xl font-display font-medium mb-3 group-hover:translate-x-1 transition-transform duration-300">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};