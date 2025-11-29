import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 30;
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

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-24 bg-[#F3F2F0]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-center mb-24 reveal">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-display">
            <TextReveal text={t.titles.experience} /><span className="text-brand-accent">.</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {t.experience.map((item, index) => (
            <div
              key={item.id}
              className="sticky transition-all duration-500 reveal"
              style={{ top: `${150 + index * 40}px`, marginBottom: '100px', zIndex: index }}
            >
              <TiltCard className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-white/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row justify-between md:items-start mb-8 gap-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 font-display"><TextReveal text={item.role} /></h3>
                    <span className="text-xl text-gray-500 font-medium block"><TextReveal text={item.company} /></span>
                  </div>
                  <div className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold whitespace-nowrap self-start md:self-auto shadow-lg shadow-black/20">
                    <TextReveal text={item.period} />
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                  <TextReveal text={item.description} />
                </p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
