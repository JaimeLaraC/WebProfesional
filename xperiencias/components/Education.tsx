import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Language } from '../types';
import { EDUCATION_DATA } from '../constants';
import { GitBranch, GitCommitHorizontal, User, Calendar, Tag } from 'lucide-react';

interface EducationProps {
  language: Language;
}

export const Education: React.FC<EducationProps> = ({ language }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="education" className="py-24 bg-[#E5E5E5]">
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <div className={`flex justify-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-display">
            <span>{language === 'ES' ? 'educación' : 'education'}</span>
            <span className="text-brand-accent">.</span>
          </h2>
        </div>

        <div className={`transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="w-full max-w-5xl mx-auto font-mono text-sm">
            {/* Git Header */}
            <div className="bg-[#1e1e1e] rounded-t-xl border border-[#333] border-b-0 p-3 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>
                <div className="h-4 w-[1px] bg-[#444] mx-2"></div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#252526] rounded text-xs border border-[#333] text-white">
                  <GitBranch className="w-3 h-3 text-blue-400" />
                  <span>main</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#252526] rounded text-xs border border-[#333] hover:bg-[#2a2d2e] cursor-pointer transition-colors">
                  <GitCommitHorizontal className="w-3 h-3" />
                  <span>History</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 hidden md:block">jaime-portfolio/education.git</div>
            </div>

            {/* Git Graph Content */}
            <div className="bg-[#1e1e1e] border border-[#333] rounded-b-xl shadow-2xl overflow-hidden relative min-h-[500px]">
              <div className="absolute top-0 left-8 bottom-0 w-px bg-[#333] z-0"></div>
              
              {/* Columns Header */}
              <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#333] text-gray-500 text-xs font-bold uppercase tracking-wider sticky top-0 z-20">
                <div className="w-16 text-center">Graph</div>
                <div className="w-24">Hash</div>
                <div className="flex-1">Message / Degree</div>
                <div className="w-40 hidden md:block">Author / School</div>
                <div className="w-24 text-right">Date</div>
              </div>

              {/* HEAD item */}
              <div className="relative z-10 flex items-center px-4 py-3 hover:bg-[#2a2d2e] transition-colors group">
                <div className="w-16 flex justify-center items-center relative">
                  <div className="w-3 h-3 rounded-full border-2 border-blue-400 bg-[#1e1e1e] z-10"></div>
                </div>
                <div className="flex-1 flex items-center gap-2">
                   <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold flex items-center gap-1">
                     <GitBranch className="w-2.5 h-2.5" /> HEAD
                   </span>
                   <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold">
                     main
                   </span>
                </div>
              </div>

              {/* Education Items */}
              {EDUCATION_DATA.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center px-4 py-3 border-b border-[#2a2d2e] transition-colors cursor-pointer group hover:bg-[#262626]">
                    <div className="w-16 flex justify-center items-center relative shrink-0">
                      <div className="absolute top-[-50%] bottom-[-50%] w-0.5 bg-gray-600 group-hover:bg-gray-500 transition-colors"></div>
                      <div className={`
                        w-3 h-3 rounded-full border-2 z-10 transition-transform duration-300
                        ${item.type === 'merge' ? 'bg-purple-500 border-purple-300 w-4 h-4' : 'bg-[#1e1e1e] border-gray-400'}
                        ${item.type === 'merge' ? 'group-hover:scale-110' : ''}
                      `}></div>
                      {item.type === 'merge' && (
                         <svg className="absolute left-[50%] top-[50%] w-8 h-8 pointer-events-none" style={{ transform: 'translate(-12px, -4px)' }}>
                           <path d="M 6 0 Q 14 10 24 10" fill="none" stroke="#a855f7" strokeWidth="2" />
                         </svg>
                      )}
                    </div>
                    <div className="w-24 text-blue-400 shrink-0 opacity-80 group-hover:opacity-100 group-hover:underline font-mono">
                      {item.hash}
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium truncate ${item.type === 'merge' ? 'text-purple-300' : 'text-gray-300'} text-base`}>
                          {item.title[language]}
                        </span>
                        {item.tags?.map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold">
                            {tag}
                          </span>
                        ))}
                        {item.type !== 'merge' && (
                          <Tag className="w-3 h-3 text-gray-500" />
                        )}
                      </div>
                    </div>
                    <div className="w-40 hidden md:flex items-center gap-2 text-gray-400 shrink-0">
                      <User className="w-3 h-3" />
                      <span className="truncate">{item.institution}</span>
                    </div>
                    <div className="w-24 text-right text-gray-500 shrink-0 flex items-center justify-end gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center px-4 py-3 text-gray-600 opacity-50">
                 <div className="w-16 flex justify-center">
                   <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                 </div>
                 <div className="text-xs italic">Initial commit</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};