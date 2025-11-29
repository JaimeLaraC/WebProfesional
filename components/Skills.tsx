import React, { useState, useRef } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';
import {
  CodeXml, Shield, Globe, Terminal, Coffee,
  Braces, GitBranch, Database, Box, User, Brain,
  Cloud, Server, FileJson, Folder, ChevronRight, X
} from 'lucide-react';

// --- DATA TYPES & SOURCE ---

type ViewMode = 'constellation' | 'ide';

interface SkillNode {
  id: string;
  // label and description will be fetched from translations
  icon: React.ReactNode;
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Core'; // For IDE folders
  codeSnippet?: string; // For IDE

  // Constellation specific
  x: number;
  y: number;
  color: string;
  bg: string;
  ring: string;
}

const nodes: SkillNode[] = [
  // --- CORE / BACKEND ---
  {
    id: 'python',
    category: 'Backend',
    icon: <CodeXml size={24} />, x: 50, y: 25,
    color: 'text-yellow-400', bg: 'bg-yellow-900/20', ring: 'ring-yellow-500/50',
    codeSnippet: `{\n  "skill": "Python",\n  "level": "Expert",\n  "uses": ["AI", "Data", "Scripts"],\n  "coffee_needed": true\n}`
  },
  {
    id: 'java',
    category: 'Backend',
    icon: <Coffee size={24} />, x: 35, y: 78,
    color: 'text-orange-400', bg: 'bg-orange-900/20', ring: 'ring-orange-500/50',
    codeSnippet: `public class JavaSkill {\n  void execute() {\n    System.out.println("Enterprise Grade");\n  }\n}`
  },
  {
    id: 'cpp',
    category: 'Backend',
    icon: <Braces size={24} />, x: 25, y: 45,
    color: 'text-blue-400', bg: 'bg-blue-900/20', ring: 'ring-blue-500/50',
    codeSnippet: `#include <iostream>\n\nint main() {\n  // Optimized for speed\n  return 0;\n}`
  },
  {
    id: 'sql',
    category: 'Backend',
    icon: <Database size={24} />, x: 65, y: 78,
    color: 'text-purple-400', bg: 'bg-purple-900/20', ring: 'ring-purple-500/50',
    codeSnippet: `SELECT * FROM skills\nWHERE type = 'Relational'\nORDER BY performance DESC;`
  },

  // --- FRONTEND ---
  {
    id: 'js',
    category: 'Frontend',
    icon: <CodeXml size={24} />, x: 75, y: 45,
    color: 'text-yellow-300', bg: 'bg-yellow-900/20', ring: 'ring-yellow-400/50',
    codeSnippet: `const js = () => {\n  return "Interactive & Dynamic";\n};`
  },
  {
    id: 'react',
    category: 'Frontend',
    icon: <Globe size={24} />, x: 92, y: 35,
    color: 'text-cyan-400', bg: 'bg-cyan-900/20', ring: 'ring-cyan-500/50',
    codeSnippet: `<Skill name="React">\n  <Components />\n  <Hooks />\n</Skill>`
  },

  // --- TOOLS / DEVOPS ---
  {
    id: 'docker',
    category: 'DevOps',
    icon: <Box size={24} />, x: 50, y: 95,
    color: 'text-blue-400', bg: 'bg-blue-900/20', ring: 'ring-blue-400/50',
    codeSnippet: `FROM engineer:latest\nRUN apt-get install efficiency\nCMD ["deploy"]`
  },
  {
    id: 'linux',
    category: 'DevOps',
    icon: <Terminal size={24} />, x: 12, y: 70,
    color: 'text-yellow-600', bg: 'bg-yellow-900/20', ring: 'ring-yellow-600/50',
    codeSnippet: `#!/bin/bash\necho "Power user access granted"`
  },
  {
    id: 'git',
    category: 'DevOps',
    icon: <GitBranch size={24} />, x: 85, y: 15,
    color: 'text-orange-400', bg: 'bg-orange-900/20', ring: 'ring-orange-500/50',
    codeSnippet: `git commit -m "Version control mastered"`
  },
  {
    id: 'cloud',
    category: 'DevOps',
    icon: <Cloud size={24} />, x: 15, y: 15,
    color: 'text-sky-400', bg: 'bg-sky-900/20', ring: 'ring-sky-500/50',
    codeSnippet: `// IoT Device Config\nconst connect = true;\nconst latency = "low";`
  },

  // --- CORE CONCEPTS ---
  {
    id: 'ai',
    category: 'Core',
    icon: <Brain size={24} />, x: 50, y: 5,
    color: 'text-indigo-400', bg: 'bg-indigo-900/20', ring: 'ring-indigo-500/50',
    codeSnippet: `import torch\nmodel = NeuralNet()\nmodel.train(data)`
  },
  {
    id: 'cyber',
    category: 'Core',
    icon: <Shield size={24} />, x: 8, y: 35,
    color: 'text-red-400', bg: 'bg-red-900/20', ring: 'ring-red-500/50',
    codeSnippet: `def scan_network():\n  target = "secure"\n  return vulnerabilities`
  },
  {
    id: 'apis',
    category: 'Backend',
    icon: <Server size={24} />, x: 88, y: 70,
    color: 'text-green-400', bg: 'bg-green-900/20', ring: 'ring-green-500/50',
    codeSnippet: `GET /api/v1/skills\n200 OK\n{ "connected": true }`
  },
];

// --- 1. CONSTELLATION VIEW COMPONENT ---
const ConstellationView: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  const coreNode = {
    id: 'core', label: 'Jaime', description: t.hero.role,
    icon: <User size={32} />, x: 50, y: 50,
    color: 'text-white', bg: 'bg-black', ring: 'ring-white/50', type: 'core'
  };

  const connections = [
    { from: 'core', to: 'python' }, { from: 'core', to: 'js' }, { from: 'core', to: 'sql' }, { from: 'core', to: 'java' }, { from: 'core', to: 'cpp' },
    { from: 'python', to: 'ai' }, { from: 'python', to: 'cyber' }, { from: 'python', to: 'cloud' }, { from: 'python', to: 'apis' },
    { from: 'js', to: 'react' }, { from: 'js', to: 'apis' },
    { from: 'cpp', to: 'linux' }, { from: 'cpp', to: 'cyber' }, { from: 'cpp', to: 'cloud' },
    { from: 'java', to: 'sql' }, { from: 'java', to: 'apis' },
    { from: 'linux', to: 'docker' }, { from: 'linux', to: 'git' }, { from: 'linux', to: 'cyber' },
    { from: 'sql', to: 'docker' }, { from: 'git', to: 'react' }, { from: 'git', to: 'python' },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    setMousePos({ x: (e.clientX - left) / width - 0.5, y: (e.clientY - top) / height - 0.5 });
  };

  const isConnectionActive = (conn: any) => hoveredNode && (conn.from === hoveredNode || conn.to === hoveredNode);
  const activeNodeData = nodes.find(n => n.id === hoveredNode);
  const activeNodeTranslation = activeNodeData ? t.skills_section.skills[activeNodeData.id] : null;

  return (
    <div
      className="relative w-full aspect-[16/9] max-w-5xl mx-auto items-center justify-center select-none perspective-1000 hidden md:flex"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setMousePos({ x: 0, y: 0 }); setHoveredNode(null); }}
      ref={containerRef}
    >
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out"
        style={{ transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)` }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#999" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#000" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#999" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {connections.map((conn, idx) => {
            const fromNode = conn.from === 'core' ? coreNode : nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            const active = isConnectionActive(conn);
            return (
              <g key={idx}>
                <line x1={`${fromNode.x}%`} y1={`${fromNode.y}%`} x2={`${toNode.x}%`} y2={`${toNode.y}%`} className="stroke-gray-300 stroke-[1px] opacity-20" />
                <line x1={`${fromNode.x}%`} y1={`${fromNode.y}%`} x2={`${toNode.x}%`} y2={`${toNode.y}%`} className={`transition-all duration-300 ease-out ${active ? 'opacity-100 stroke-[2px]' : 'opacity-0 stroke-[0px]'}`} stroke="url(#gradient-line)" strokeDasharray="10, 10" style={{ animation: active ? 'dash 1s linear infinite' : 'none' }} />
              </g>
            );
          })}
        </svg>

        {/* Center Node */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: '50%', top: '50%' }}
          onMouseEnter={() => setHoveredNode('core')}
        >
          <div className="relative w-24 h-24 bg-black rounded-full flex items-center justify-center text-white shadow-2xl ring-4 ring-white/50 animate-pulse">
            <User size={32} />
          </div>
        </div>

        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const parallaxX = mousePos.x * 30;
          const parallaxY = mousePos.y * 30;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-500 ease-out cursor-pointer z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: `translate(-50%, -50%) translate(${parallaxX}px, ${parallaxY}px)`, zIndex: isHovered ? 50 : 10 }}
            >
              <div className={`relative rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/20 w-14 h-14 shadow-lg ${node.bg} ${node.color} ${isHovered ? `scale-110 ${node.ring} ring-4 ring-offset-2 ring-offset-[#F3F2F0]` : 'scale-100 grayscale-[0.5] opacity-80'}`}>
                {node.icon}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      <div className={`absolute bottom-8 right-8 z-50 pointer-events-none transition-all duration-300 ease-out transform ${hoveredNode && hoveredNode !== 'core' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {activeNodeData && activeNodeTranslation && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-2xl w-80 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${activeNodeData.bg.replace('/20', '')}`}></div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${activeNodeData.bg} ${activeNodeData.color}`}>{activeNodeData.icon}</div>
              <h3 className="text-xl font-bold font-display text-gray-900">
                <TextReveal text={activeNodeTranslation.label} />
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              <TextReveal text={activeNodeTranslation.description} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


// --- 2. IDE VIEW COMPONENT ---
const IDEView: React.FC = () => {
  const [openFile, setOpenFile] = useState<string>('python');
  const { t } = useLanguage();

  const activeNode = nodes.find(n => n.id === openFile) || nodes[0];
  const activeNodeTranslation = t.skills_section.skills[activeNode.id];

  // Group by folders
  const categories = ['Backend', 'Frontend', 'DevOps', 'Core'];

  return (
    <div className="w-full max-w-5xl mx-auto h-[600px] bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#333] font-mono text-sm">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#252526] flex flex-col border-r border-[#333]">
        <div className="p-3 text-gray-400 text-xs uppercase tracking-wider font-bold">Explorer</div>
        <div className="flex-1 overflow-y-auto">
          {categories.map(cat => (
            <div key={cat} className="mb-2">
              <div className="flex items-center px-2 py-1 text-gray-300 hover:bg-[#2a2d2e] cursor-pointer gap-1">
                <ChevronRight size={14} />
                <Folder size={14} className="text-blue-400" />
                <span className="font-bold">{cat}</span>
              </div>
              <div className="ml-4 border-l border-[#444]">
                {nodes.filter(n => n.category === cat).map(node => (
                  <div
                    key={node.id}
                    onClick={() => setOpenFile(node.id)}
                    className={`flex items-center px-3 py-1 cursor-pointer gap-2 transition-colors
                       ${openFile === node.id ? 'bg-[#37373d] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2a2d2e]'}
                     `}
                  >
                    <FileJson size={14} className={node.color} />
                    <span>{node.id}.json</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e]">
        {/* Tabs */}
        <div className="flex bg-[#252526] overflow-x-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-400 text-white min-w-[120px]">
            <FileJson size={14} className={activeNode.color} />
            <span>{activeNode.id}.json</span>
            <X size={14} className="ml-auto text-gray-500 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="px-4 py-1 text-gray-500 text-xs flex items-center gap-1 border-b border-[#333]">
          <span>src</span> <span>&gt;</span> <span>{activeNode.category}</span> <span>&gt;</span> <span>{activeNode.id}.json</span>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex gap-4">
            {/* Line Numbers */}
            <div className="flex flex-col text-right text-gray-600 select-none pr-4 border-r border-[#333]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <span key={n}>{n}</span>)}
            </div>

            {/* Syntax Highlighting (Simulated) */}
            <pre className="font-mono text-gray-300 leading-relaxed">
              <span className="text-yellow-400">{`{`}</span>
              {'\n'}
              <span className="text-blue-400">  "id"</span>: <span className="text-orange-400">"{activeNode.id}"</span>,
              {'\n'}
              <span className="text-blue-400">  "name"</span>: <span className="text-green-400">"{activeNodeTranslation?.label}"</span>,
              {'\n'}
              <span className="text-blue-400">  "description"</span>: <span className="text-orange-400">"{activeNodeTranslation?.description}"</span>,
              {'\n'}
              <span className="text-blue-400">  "config"</span>: <span className="text-yellow-400">{activeNode.codeSnippet || '"standard config"'}</span>,
              {'\n'}
              <span className="text-yellow-400">{`}`}</span>
            </pre>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-blue-600 text-white text-xs px-3 py-1 flex justify-between items-center">
          <div className="flex gap-3">
            <span>main*</span>
            <span>0 errors</span>
          </div>
          <div className="flex gap-3">
            <span>Ln 6, Col 12</span>
            <span>UTF-8</span>
            <span>JSON</span>
            <span>Prettier</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PARENT COMPONENT ---
export const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('ide');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();

  const handleViewChange = (mode: ViewMode) => {
    if (mode === viewMode) return;

    // Start exit animation
    setIsTransitioning(true);

    // Wait for exit animation to finish before changing state
    setTimeout(() => {
      setViewMode(mode);
      // Small delay to let the DOM update before starting enter animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  return (
    <section id="skills" className="min-h-screen py-24 relative bg-[#F3F2F0]">

      <div className="container mx-auto px-6 z-10 w-full">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-display text-black mb-4">
              <TextReveal text={t.skills_section.title} /><span className="text-brand-accent">.</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg">
              <TextReveal text={t.skills_section.subtitle} />
            </p>

            {/* View Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2 bg-white/50 p-2 rounded-full backdrop-blur-md shadow-sm border border-white/60 mb-12">
              {[
                { id: 'ide', label: t.skills_section.tabs.ide },
                { id: 'constellation', label: t.skills_section.tabs.constellation },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleViewChange(mode.id as ViewMode)}
                  className={`
                     px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                     ${viewMode === mode.id
                      ? 'bg-black text-white shadow-md'
                      : 'text-gray-500 hover:bg-black/5 hover:text-black'
                    }
                   `}
                >
                  <TextReveal text={mode.label} />
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* View Rendering */}
        <div className={`
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform min-h-[600px]
            ${isTransitioning ? 'opacity-0 scale-95 blur-md translate-y-4' : 'opacity-100 scale-100 blur-0 translate-y-0'}
        `}>
          {viewMode === 'constellation' && <ConstellationView />}
          {viewMode === 'ide' && <IDEView />}
        </div>

        {/* --- MOBILE FALLBACK --- */}
        <div className="md:hidden mt-12 grid grid-cols-2 gap-4">
          {/* Only show this generic grid if we are in constellation mode on mobile */}
          {viewMode === 'constellation' && nodes.filter(n => n.id !== 'core').map((node, index) => (
            <ScrollReveal key={node.id} delay={index * 50}>
              <div className={`relative p-4 rounded-xl border border-white/50 bg-white/60 backdrop-blur-sm flex flex-col items-center gap-3 text-center`}>
                <div className={`relative p-3 rounded-full ${node.bg} ${node.color} ring-1 ${node.ring}`}>
                  {node.icon}
                </div>
                <span className="font-bold text-sm text-gray-900">
                  <TextReveal text={t.skills_section.skills[node.id]?.label || ''} />
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </section>
  );
};