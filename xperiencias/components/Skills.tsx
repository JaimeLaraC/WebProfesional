import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Language, SkillFile, SkillFolder } from '../types';
import { SKILLS_DATA } from '../constants';
import { ChevronRight, ChevronDown, Folder, FileJson, X } from 'lucide-react';

interface SkillsProps {
  language: Language;
}

export const Skills: React.FC<SkillsProps> = ({ language }) => {
  const { ref, isVisible } = useScrollReveal();
  const [folders, setFolders] = useState<SkillFolder[]>(SKILLS_DATA);
  const [activeFile, setActiveFile] = useState<SkillFile | null>(SKILLS_DATA[0].files[0]);

  const toggleFolder = (folderName: string) => {
    setFolders(folders.map(f => f.name === folderName ? { ...f, isOpen: !f.isOpen } : f));
  };

  const selectFile = (file: SkillFile) => {
    setActiveFile(file);
  };

  return (
    <section id="skills" className="min-h-screen py-24 relative bg-[#F3F2F0]">
      <div className="container mx-auto px-6 z-10 w-full" ref={ref}>
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-display text-black mb-4">
              <span>{language === 'ES' ? 'habilidades' : 'skills'}</span>
              <span className="text-brand-accent">.</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg">
              {language === 'ES' ? 'Selecciona un archivo para explorar mi stack tecnológico.' : 'Select a file to explore my tech stack.'}
            </p>
          </div>
        </div>

        <div className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform min-h-[600px] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="w-full max-w-5xl mx-auto h-[600px] bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#333] font-mono text-sm">
            
            {/* Sidebar Explorer */}
            <div className="w-full md:w-64 bg-[#252526] flex flex-col border-r border-[#333]">
              <div className="p-3 text-gray-400 text-xs uppercase tracking-wider font-bold">Explorer</div>
              <div className="flex-1 overflow-y-auto">
                {folders.map(folder => (
                  <div key={folder.name} className="mb-1">
                    <div 
                      className="flex items-center px-2 py-1 text-gray-300 hover:bg-[#2a2d2e] cursor-pointer gap-1 select-none"
                      onClick={() => toggleFolder(folder.name)}
                    >
                      {folder.isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      <Folder className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-bold">{folder.name}</span>
                    </div>
                    {folder.isOpen && (
                      <div className="ml-4 border-l border-[#444]">
                        {folder.files.map(file => (
                          <div 
                            key={file.name}
                            className={`flex items-center px-3 py-1 cursor-pointer gap-2 transition-colors select-none
                              ${activeFile?.name === file.name ? 'bg-[#37373d] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2a2d2e]'}
                            `}
                            onClick={() => selectFile(file)}
                          >
                            <FileJson className={`w-3.5 h-3.5 ${file.color}`} />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Viewer */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
              {/* Tabs */}
              <div className="flex bg-[#252526] overflow-x-auto no-scrollbar">
                {activeFile && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-400 text-white min-w-[120px] select-none">
                    <FileJson className={`w-3.5 h-3.5 ${activeFile.color}`} />
                    <span>{activeFile.name}</span>
                    <X className="w-3.5 h-3.5 ml-auto text-gray-500 hover:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); setActiveFile(null); }} />
                  </div>
                )}
              </div>

              {/* Breadcrumbs */}
              <div className="px-4 py-1 text-gray-500 text-xs flex items-center gap-1 border-b border-[#333] select-none">
                <span>src</span> <span>&gt;</span> 
                {activeFile && (
                  <>
                    <span>{folders.find(f => f.files.includes(activeFile))?.name}</span> <span>&gt;</span> <span>{activeFile.name}</span>
                  </>
                )}
              </div>

              {/* Editor Content */}
              <div className="flex-1 p-6 overflow-auto custom-scrollbar">
                {activeFile ? (
                   <div className="flex gap-4">
                     <div className="flex flex-col text-right text-gray-600 select-none pr-4 border-r border-[#333]">
                       {Array.from({length: activeFile.content.split('\n').length}).map((_, i) => (
                         <span key={i}>{i + 1}</span>
                       ))}
                     </div>
                     <pre className="font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
                       {activeFile.content}
                     </pre>
                   </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                       <div className="mb-2 text-6xl opacity-20">⌘</div>
                       <p>Select a file to view content</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Bar */}
              <div className="bg-blue-600 text-white text-xs px-3 py-1 flex justify-between items-center select-none">
                <div className="flex gap-3">
                  <span>main*</span>
                  <span>0 errors</span>
                </div>
                <div className="flex gap-3">
                  <span>Ln {activeFile ? activeFile.content.split('\n').length : 0}, Col 1</span>
                  <span>UTF-8</span>
                  <span>JSON</span>
                  <span>Prettier</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};