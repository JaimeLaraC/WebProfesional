import React from 'react';
import EducationGit from './EducationGit';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';
import ScrollReveal3D from './ScrollReveal3D';

export const Education: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-24 bg-[#E5E5E5] dark:bg-[#0e0e0e] transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">

        <ScrollReveal3D variant="fadeUp" className="flex justify-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight font-display dark:text-white">
            <TextReveal text={t.titles.education} /><span className="text-brand-accent dark:text-blue-500">.</span>
          </h2>
        </ScrollReveal3D>

        <ScrollReveal3D variant="zoomIn" delay={0.2}>
          <EducationGit />
        </ScrollReveal3D>

      </div>
    </section>
  );
};