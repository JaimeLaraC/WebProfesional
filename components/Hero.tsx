import React, { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { User, Code, Cpu, Sparkles, X, GitBranch, Check, Circle, Maximize2, Minimize2 } from 'lucide-react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&*";

const ScrambleText: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  }, [text]);

  const prevTextRef = React.useRef(text);

  useEffect(() => {
    if (prevTextRef.current !== text) {
      prevTextRef.current = text;
      scramble();
    }
  }, [text, scramble]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [activeTab, setActiveTab] = useState<'bio' | 'stack' | 'status' | 'mindset'>('bio');
  const [isMaximized, setIsMaximized] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMaximized(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const tabs = {
    bio: {
      icon: <User size={13} />,
      filename: 'bio.txt',
      language: 'Plain Text',
      lines: 4,
      content: (
        <>
          <span className="text-gray-400 italic"><ScrambleText text={t.hero.ide.bio.comment} /></span><br />
          <span className="text-blue-600 dark:text-blue-400 font-bold">const</span> <span className="text-orange-600 dark:text-orange-400"><ScrambleText text={t.hero.ide.bio.variable} /></span> = <span className="text-green-600 dark:text-green-400">"<ScrambleText text={t.hero.ide.bio.value} />"</span>;<br />
          <span className="text-purple-600 dark:text-purple-400 font-bold">function</span> <span className="text-yellow-600 dark:text-yellow-400"><ScrambleText text={t.hero.ide.bio.function} /></span>() {'{'}<br />
          &nbsp;&nbsp;<span className="text-gray-800 dark:text-gray-300">return</span> <span className="text-green-600 dark:text-green-400">"<ScrambleText text={t.hero.ide.bio.return} />"</span>;<br />
          {'}'}
        </>
      )
    },
    stack: {
      icon: <Code size={13} />,
      filename: 'stack.json',
      language: 'JSON',
      lines: 6,
      content: (
        <>
          <span className="text-yellow-600 dark:text-yellow-400">{'{'}</span><br />
          &nbsp;&nbsp;<span className="text-blue-600 dark:text-blue-400">"<ScrambleText text={t.hero.ide.stack.frontend} />"</span>: <span className="text-green-600 dark:text-green-400">["React", "Next.js", "Tailwind"]</span>,<br />
          &nbsp;&nbsp;<span className="text-blue-600 dark:text-blue-400">"<ScrambleText text={t.hero.ide.stack.backend} />"</span>: <span className="text-green-600 dark:text-green-400">["Python", "Node", "FastAPI"]</span>,<br />
          &nbsp;&nbsp;<span className="text-blue-600 dark:text-blue-400">"<ScrambleText text={t.hero.ide.stack.ai} />"</span>: <span className="text-green-600 dark:text-green-400">["Gemini", "TensorFlow", "OpenAI"]</span>,<br />
          &nbsp;&nbsp;<span className="text-blue-600 dark:text-blue-400">"<ScrambleText text={t.hero.ide.stack.status} />"</span>: <span className="text-purple-600 dark:text-purple-400">true</span><br />
          <span className="text-yellow-600 dark:text-yellow-400">{'}'}</span>
        </>
      )
    },
    mindset: {
      icon: <Sparkles size={13} />,
      filename: 'mindset.md',
      language: 'Markdown',
      lines: 5,
      content: (
        <>
          <span className="text-blue-600 dark:text-blue-400 font-bold"><ScrambleText text={t.hero.ide.mindset.title} /></span><br />
          <span className="text-gray-500"><ScrambleText text={t.hero.ide.mindset.p1} /></span><br />
          <span className="text-gray-500"><ScrambleText text={t.hero.ide.mindset.p2} /></span><br /><br />
          <span className="text-purple-600 dark:text-purple-400 font-bold"><ScrambleText text={t.hero.ide.mindset.mantra_title} /></span><br />
          <span className="text-gray-800 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-1 rounded"><ScrambleText text={t.hero.ide.mindset.mantra} /></span><br />
        </>
      )
    },
    status: {
      icon: <Cpu size={13} />,
      filename: 'sys_log.log',
      language: 'Log',
      lines: 4,
      content: (
        <>
          <span className="text-gray-400">[10:42:01]</span> <span className="text-blue-500 font-bold">INFO</span>  <ScrambleText text={t.hero.ide.status.info_loc} /><br />
          <span className="text-gray-400">[10:42:05]</span> <span className="text-blue-500 font-bold">INFO</span>  <ScrambleText text={t.hero.ide.status.info_energy} /><br />
          <span className="text-gray-400">[10:42:12]</span> <span className="text-yellow-500 font-bold">WARN</span>  <ScrambleText text={t.hero.ide.status.warn} /><br />
          <span className="text-gray-400">[10:42:15]</span> <span className="text-green-600 dark:text-green-400 font-bold">OK</span>    <ScrambleText text={t.hero.ide.status.ok} />
        </>
      )
    }
  };

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-12 relative overflow-hidden bg-[#F3F2F0] dark:bg-[#050505] transition-colors duration-500">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>

        <div className={`relative max-w-6xl mx-auto border-x border-gray-200 dark:border-white/5 min-h-[500px] flex flex-col justify-center px-8 md:px-16 py-12 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black dark:border-white transition-all duration-500 group-hover:w-8 group-hover:h-8" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-black dark:border-white transition-all duration-500 group-hover:w-8 group-hover:h-8" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black dark:border-white transition-all duration-500 group-hover:w-8 group-hover:h-8" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black dark:border-white transition-all duration-500 group-hover:w-8 group-hover:h-8" />

          {/* Header ID */}
          <div className="flex items-center gap-2 mb-8 text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span><ScrambleText text={t.hero.system_status} /></span>
            <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
            ID: <ScrambleText text={t.hero.user_id} />
          </div>

          {/* Main Title with Scramble Effect */}
          <div className="mb-12 cursor-default">
            <h1 className="text-6xl md:text-8xl font-bold font-mono tracking-tighter text-black dark:text-white mb-2">
              <ScrambleText text={t.hero.greeting} />
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter text-gray-400 dark:text-gray-500">
              <span className="text-gray-300 dark:text-gray-600 mr-4">&gt;</span>
              <ScrambleText text={t.hero.subtitle} />
            </h2>
          </div>

          {/* Grid Layout for Stats & Interactive Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-gray-200 dark:border-white/10 pt-12 font-mono">

            {/* Left Column: Stats */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-8">
              {t.hero.stats.map((stat, idx) => (
                <div key={idx} className="group/stat">
                  <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full group-hover/stat:bg-black dark:group-hover/stat:bg-white transition-colors"></span>
                    <ScrambleText text={stat.label} />
                  </h3>
                  <p className="text-lg text-black dark:text-gray-200 font-medium group-hover/stat:translate-x-2 transition-transform duration-300">
                    <ScrambleText text={stat.value} />
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Modern IDE Window */}
            <div className={`lg:col-span-8 relative transition-all duration-500 ${isMaximized ? 'z-[100]' : 'z-10'}`}>

              {/* Backdrop Overlay */}
              <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 z-[-1] ${isMaximized ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                onClick={() => setIsMaximized(false)}
              />

              {/* The Window Itself */}
              <div
                className={`
                  bg-white dark:bg-[#1e1e1e] rounded-xl shadow-xl overflow-hidden border border-gray-200/60 dark:border-white/10 flex flex-col 
                  transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                  ${isMaximized
                    ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[85vh] shadow-2xl scale-100'
                    : 'relative w-full h-full min-h-[280px] hover:-translate-y-1 hover:shadow-2xl'
                  }
                `}
              >

                {/* Title Bar / Tabs */}
                <div
                  className="bg-gray-100/50 dark:bg-[#252526] border-b border-gray-200 dark:border-white/5 flex items-center pt-2 px-2 gap-2 select-none"
                  onDoubleClick={() => setIsMaximized(!isMaximized)}
                >
                  {/* Window Controls */}
                  <div className="flex gap-1.5 px-3 mr-2 mb-1 group/controls">
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsMaximized(false); }}
                      className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 hover:bg-[#e0443e] transition-colors flex items-center justify-center"
                    >
                      <X size={8} className="text-black/50 opacity-0 group-hover/controls:opacity-100" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsMaximized(false); }}
                      className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 hover:bg-[#dea123] transition-colors flex items-center justify-center"
                    >
                      <Minimize2 size={8} className="text-black/50 opacity-0 group-hover/controls:opacity-100" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                      className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 hover:bg-[#1aab29] transition-colors flex items-center justify-center"
                    >
                      <Maximize2 size={8} className="text-black/50 opacity-0 group-hover/controls:opacity-100" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 overflow-x-auto scrollbar-hide flex-1">
                    {(Object.keys(tabs) as Array<keyof typeof tabs>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`
                          group relative px-4 py-2 rounded-t-lg text-xs font-medium flex items-center gap-2 transition-all duration-200 min-w-fit
                          ${activeTab === key
                            ? 'bg-white dark:bg-[#1e1e1e] text-black dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-white/5 hover:text-gray-700 dark:hover:text-gray-200'}
                        `}
                      >
                        {activeTab === key && (
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
                        )}

                        <span className={`${activeTab === key ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}>
                          {tabs[key].icon}
                        </span>
                        <span>{tabs[key].filename}</span>
                        {activeTab === key && (
                          <X size={10} className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-white/10 p-0.5 box-content" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor Area */}
                <div className="flex flex-1 bg-white dark:bg-[#1e1e1e] font-mono text-sm transition-colors duration-300">
                  {/* Line Numbers */}
                  <div className="w-12 bg-gray-50/50 dark:bg-[#1e1e1e] border-r border-gray-100 dark:border-white/5 flex flex-col items-center pr-3 pt-6 text-gray-300 dark:text-gray-600 select-none text-xs leading-relaxed">
                    {Array.from({ length: isMaximized ? 20 : 8 }).map((_, i) => (
                      <div key={i} className="h-6">{i + 1}</div>
                    ))}
                  </div>

                  {/* Code Content */}
                  <div className="flex-1 p-6 overflow-auto">
                    <div key={activeTab} className="animate-fade-in leading-relaxed text-base">
                      {tabs[activeTab].content}
                      {/* Blinking Block Cursor */}
                      <span className="inline-block w-2.5 h-5 bg-blue-400/50 ml-1 align-sub animate-blink"></span>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="bg-blue-600 text-white text-[10px] py-1 px-3 flex justify-between items-center font-sans tracking-wide">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 hover:bg-blue-700 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
                      <GitBranch size={10} />
                      <span className="font-bold">main</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-80">
                      <Circle size={8} className="fill-current text-white" />
                      <span>0 errors</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 opacity-90">
                    <div className="flex items-center gap-1">
                      <span>Ln {tabs[activeTab].lines}, Col 1</span>
                    </div>
                    <div>UTF-8</div>
                    <div className="font-bold uppercase">{tabs[activeTab].language}</div>
                    <div className="hover:bg-blue-700 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
                      <Check size={10} /> Prettier
                    </div>
                  </div>
                </div>

              </div>

              {/* Invisible placeholder to keep layout shape when fixed */}
              {isMaximized && <div className="w-full h-[280px]" />}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};