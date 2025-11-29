import React from 'react';
import EducationGit from './EducationGit';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';

export const Education: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-24 bg-[#E5E5E5] dark:bg-[#0e0e0e] transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">

        <div className="flex justify-center mb-16 reveal">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-display dark:text-white">
            <TextReveal text={t.titles.education} /><span className="text-brand-accent dark:text-blue-500">.</span>
          </h2>
        </div>

        <div className="reveal">
          <EducationGit />
        </div>

      </div>
    </section>
  );
};