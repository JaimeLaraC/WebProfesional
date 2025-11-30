import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';
import ScrollReveal3D from './ScrollReveal3D';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-white dark:bg-black text-center transition-colors duration-500">
      <div className="container mx-auto px-6">
        <ScrollReveal3D variant="zoomIn" className="flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-display">
            <TextReveal text={t.titles.ready} />
          </h2>
          <a
            href="mailto:contact@jaime.dev"
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform"
          >
            <TextReveal text={t.titles.talk} />
          </a>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-8">
            <TextReveal text={t.titles.footer} />
          </p>
        </ScrollReveal3D>
      </div>
    </footer>
  );
};