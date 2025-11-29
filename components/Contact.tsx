import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-white text-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800 font-display">
            <TextReveal text={t.titles.ready} />
          </h2>
          <a
            href="mailto:contact@jaime.dev"
            className="px-8 py-4 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform"
          >
            <TextReveal text={t.titles.talk} />
          </a>
          <p className="text-gray-400 text-sm mt-8">
            <TextReveal text={t.titles.footer} />
          </p>
        </div>
      </div>
    </footer>
  );
};