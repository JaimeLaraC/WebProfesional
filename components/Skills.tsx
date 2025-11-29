import React from 'react';
import { Code2, Terminal, Database, Globe, Cpu, Shield, Layers, GitBranch, Box, FileJson, Server, Coffee, Braces, Command } from 'lucide-react';

// Helper components for icons not directly in lucide-react (simulated or replaced)
const BrainCircuitIcon = ({ size }: { size: number }) => <Cpu size={size} />; // Fallback
const AtomIcon = ({ size }: { size: number }) => <Code2 size={size} />; // Fallback
const SettingsIcon = ({ size }: { size: number }) => <Layers size={size} />; // Fallback

const skillsData = [
  { name: 'Python', icon: <Code2 size={24} />, color: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', shadow: 'shadow-yellow-500/10' },
  { name: 'Ciberseguridad', icon: <Shield size={24} />, color: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', shadow: 'shadow-red-500/10' },
  { name: 'Deep Learning', icon: <BrainCircuitIcon size={24} />, color: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', shadow: 'shadow-blue-500/10' },
  { name: 'Machine Learning', icon: <Cpu size={24} />, color: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', shadow: 'shadow-indigo-500/10' },
  { name: 'React', icon: <AtomIcon size={24} />, color: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', shadow: 'shadow-cyan-500/10' },
  { name: 'APIs', icon: <Globe size={24} />, color: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', shadow: 'shadow-green-500/10' },
  { name: 'Automatización', icon: <SettingsIcon size={24} />, color: 'bg-gray-500/10', text: 'text-gray-300', border: 'border-gray-500/20', shadow: 'shadow-gray-500/10' },
  { name: 'Hacking Ético', icon: <Terminal size={24} />, color: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', shadow: 'shadow-emerald-500/10' },
  { name: 'Java', icon: <Coffee size={24} />, color: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', shadow: 'shadow-orange-500/10' },
  { name: 'C++', icon: <Braces size={24} />, color: 'bg-blue-600/10', text: 'text-blue-300', border: 'border-blue-600/20', shadow: 'shadow-blue-600/10' },
  { name: 'Git', icon: <GitBranch size={24} />, color: 'bg-red-600/10', text: 'text-red-500', border: 'border-red-600/20', shadow: 'shadow-red-600/10' },
  { name: 'Linux', icon: <Command size={24} />, color: 'bg-yellow-600/10', text: 'text-yellow-500', border: 'border-yellow-600/20', shadow: 'shadow-yellow-600/10' },
  { name: 'SQL', icon: <Database size={24} />, color: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', shadow: 'shadow-purple-500/10' },
  { name: 'Docker', icon: <Box size={24} />, color: 'bg-blue-400/10', text: 'text-blue-500', border: 'border-blue-400/20', shadow: 'shadow-blue-400/10' },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center py-24 relative overflow-hidden bg-[#F3F2F0]">

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 z-10">

        {/* Header */}
        <div className="flex justify-center mb-20 reveal">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-display text-black">habilidades<span className="text-black">.</span></h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="reveal group"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div
                className={`
                  relative overflow-hidden
                  p-6 h-full
                  bg-white/60 backdrop-blur-xl
                  border border-white/60
                  rounded-2xl
                  transition-all duration-500 ease-out
                  hover:-translate-y-2 hover:shadow-xl
                  ${skill.shadow}
                  flex flex-col items-center justify-center gap-4 text-center
                `}
              >
                {/* Icon Container */}
                <div className={`
                  p-4 rounded-full
                  ${skill.color} ${skill.text}
                  transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
                `}>
                  {skill.icon}
                </div>

                {/* Skill Name */}
                <div className={`
                  font-display font-bold text-lg tracking-wide text-gray-800
                  group-hover:text-black transition-colors
                `}>
                  {skill.name}
                </div>

                {/* Hover Border Gradient */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:${skill.border.replace('border-', 'border-')} transition-colors duration-500 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};