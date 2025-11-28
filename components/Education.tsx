import React from 'react';
import { EducationItem } from '../types';

const educationData: EducationItem[] = [
  {
    id: '1',
    school: 'Universidad de Castilla-La Mancha',
    degree: 'Grado en Ingeniería de Software',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    school: 'Udemy',
    degree: 'Certificación: Deep Learning y AI con Python',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    school: 'Mastermind',
    degree: 'Certificación: Hacking de Redes Inalámbricas (WiFi)',
    imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=800&auto=format&fit=crop'
  }
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-[#F3F2F0]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex justify-center mb-16 reveal">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-display">educación<span className="text-brand-accent">.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationData.map((item, index) => (
            <div 
                key={item.id} 
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 reveal"
                style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img 
                    src={item.imageUrl} 
                    alt={item.school} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-3xl font-bold leading-tight mb-3 font-display">{item.school}</h3>
                <p className="text-gray-300 text-sm font-medium uppercase tracking-wider">{item.degree}</p>
                <div className="h-1 w-0 bg-white mt-4 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};