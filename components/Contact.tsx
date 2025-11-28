import React from 'react';

export const Contact: React.FC = () => {
  return (
    <footer className="py-12 bg-white text-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800 font-display">¿Listo para crear algo increíble?</h2>
          <a 
            href="mailto:contact@jaime.dev" 
            className="px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform"
          >
            Hablemos 👋
          </a>
          <p className="text-gray-400 text-sm mt-8">
            Creado con React & IA por Jaime Lara
          </p>
        </div>
      </div>
    </footer>
  );
};