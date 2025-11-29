import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, Minus, X, Terminal as TerminalIcon, Battery, Wifi } from 'lucide-react';
import { Language } from '../types';

interface TerminalProps {
  language: Language;
}

type Theme = 'matrix' | 'cyberpunk' | 'dracula' | 'retro';

export const Terminal: React.FC<TerminalProps> = ({ language }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<React.ReactNode[]>([
    <div key="init" className="mb-6 opacity-80 leading-relaxed">
      <p>Welcome to <span className="text-green-300 font-bold">JaimeOS</span> v3.0.0</p>
      <p className="text-xs mt-1 opacity-60">System load: 0.02, 0.04, 0.00 | Interactive Mode: ON</p>
      <p className="mt-4">Type <span className="text-green-300 font-bold">'help'</span> to see commands.</p>
    </div>
  ]);
  const [theme, setTheme] = useState<Theme>('matrix');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const themeColors = {
    matrix: 'text-green-500',
    cyberpunk: 'text-yellow-400',
    dracula: 'text-purple-400',
    retro: 'text-orange-500'
  };

  const themeBg = {
     matrix: 'bg-black/90',
     cyberpunk: 'bg-slate-900/95',
     dracula: 'bg-[#282a36]/95',
     retro: 'bg-[#2b2118]/95'
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(' ');
    const command = args[0];

    let response: React.ReactNode;

    switch (command) {
      case 'help':
        response = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2 opacity-90">
             <div className="col-span-full mb-2 font-bold border-b border-white/10 pb-1">SYSTEM COMMANDS</div>
             <div><span className="font-bold">ls</span> - List directory</div>
             <div><span className="font-bold">whoami</span> - User info</div>
             <div><span className="font-bold">clear</span> - Clear screen</div>
             <div><span className="font-bold">date</span> - Show date</div>
             <div className="col-span-full mt-3 mb-2 font-bold border-b border-white/10 pb-1">FUN</div>
             <div><span className="font-bold">joke</span> - Tell a joke</div>
             <div><span className="font-bold">fact</span> - Random fact</div>
             <div className="col-span-full mt-3 mb-2 font-bold border-b border-white/10 pb-1">CONFIG</div>
             <div><span className="font-bold">theme [name]</span> - Change theme</div>
             <div className="col-span-full text-xs opacity-60 mt-1">Themes: matrix, cyberpunk, dracula, retro</div>
          </div>
        );
        break;
      case 'clear':
        setOutput([]);
        return;
      case 'ls':
        response = <div className="mt-1">about.txt  experience.md  projects/  skills.json  contact.sh</div>;
        break;
      case 'whoami':
        response = <div className="mt-1">guest@jaime-portfolio (Level 1 User)</div>;
        break;
      case 'date':
        response = <div className="mt-1">{new Date().toLocaleString()}</div>;
        break;
      case 'theme':
        if (args[1] && ['matrix', 'cyberpunk', 'dracula', 'retro'].includes(args[1])) {
            setTheme(args[1] as Theme);
            response = <div className="mt-1 text-white">Theme changed to '{args[1]}'.</div>;
        } else {
            response = <div className="mt-1 text-red-400">Invalid theme. Try: matrix, cyberpunk, dracula, retro</div>;
        }
        break;
      case 'joke':
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs.",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
            "I would tell you a UDP joke, but you might not get it."
        ];
        response = <div className="mt-1 italic">"{jokes[Math.floor(Math.random() * jokes.length)]}"</div>;
        break;
      case 'fact':
         response = <div className="mt-1">Did you know? The first computer bug was an actual moth found in the Harvard Mark II computer in 1947.</div>;
         break;
      case 'rm':
        if (args[1] === '-rf' && args[2] === '/') {
            response = <div className="text-red-500 animate-pulse font-bold">SYSTEM FAILURE... DELETING ROOT... JK 😉</div>;
        } else {
            response = <div className="mt-1 text-red-400">Permission denied.</div>;
        }
        break;
      case '':
        response = null;
        break;
      default:
        response = <div className="mt-1 text-red-400">Command not found: {command}. Type 'help'.</div>;
    }

    if (command) {
        setOutput(prev => [
            ...prev,
            <div key={Date.now()} className="mb-3 group/cmd">
                <div className="flex gap-2 flex-wrap items-center opacity-90">
                    <span className="font-bold select-none">➜</span>
                    <span className="select-none whitespace-nowrap">~</span>
                    <span className="font-medium opacity-90">{cmd}</span>
                </div>
                {response && <div className="ml-5 mt-1 opacity-80 leading-relaxed break-words">{response}</div>}
            </div>
        ]);
    } else {
         setOutput(prev => [
            ...prev,
            <div key={Date.now()} className="mb-3 group/cmd">
                <div className="flex gap-2 flex-wrap items-center opacity-90">
                    <span className="font-bold select-none">➜</span>
                    <span className="select-none whitespace-nowrap">~</span>
                </div>
            </div>
        ]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <section className="py-20 bg-[#111111] flex justify-center items-center px-4 relative border-t border-white/5 overflow-hidden" id="terminal">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[100px] pointer-events-none transition-colors duration-1000 bg-green-900/5"></div>
      
      <div className="container mx-auto max-w-5xl relative w-full z-10">
        <div className="flex flex-col items-center mb-10 relative z-0">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 text-center tracking-tight">Terminal Mode</h2>
          <div className="flex gap-4 text-xs md:text-sm font-mono uppercase tracking-widest text-gray-500">
             <span className="flex items-center gap-1"><TerminalIcon className="w-3 h-3" /> Interactive</span>
             <span className="flex items-center gap-1">Themeable</span>
          </div>
        </div>

        <div className={`
            rounded-xl overflow-hidden border border-white/10 font-mono text-sm md:text-base group flex flex-col
            transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
            w-full h-[500px] relative shadow-2xl z-10
            ${themeBg[theme]}
          `}>
            
            {/* Terminal Header */}
            <div className="bg-[#1f1f1f] px-4 py-3 flex items-center justify-between border-b border-white/5 select-none z-30 relative shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4035] transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffad1e] transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#22b336] transition-colors cursor-pointer"></div>
              </div>
              <div className={`text-[10px] md:text-xs flex items-center gap-2 font-sans font-medium tracking-wide opacity-50 ${themeColors[theme]}`}>
                <TerminalIcon className="w-3 h-3" />
                <span>guest@jaime-portfolio:~</span>
              </div>
              <div className="flex gap-3 opacity-50 text-white">
                <Minus className="w-3 h-3 cursor-pointer hover:text-white transition-colors" />
                <Maximize2 className="w-3 h-3 cursor-pointer hover:text-white transition-colors" />
                <X className="w-3 h-3 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Terminal Body */}
            <div 
                className={`p-6 flex-1 overflow-y-auto cursor-text custom-scrollbar relative transition-colors duration-500 ${themeColors[theme]}`}
                onClick={() => inputRef.current?.focus()}
                style={{ textShadow: theme === 'matrix' ? 'rgba(100, 255, 100, 0.1) 0px 0px 2px' : 'none' }}
            >
                {output}
                
                <div className="flex gap-2 items-center mt-2">
                    <span className="flex items-center gap-2 flex-wrap whitespace-nowrap">
                        <span className="font-bold">guest@jaime</span>
                        <span className="opacity-40">:</span>
                        <span className="font-bold">~</span>
                        <span className="opacity-40">$</span>
                    </span>
                    <div className="relative flex-1 ml-1">
                        <input 
                            ref={inputRef}
                            className={`bg-transparent border-none outline-none text-inherit focus:ring-0 p-0 w-full font-medium caret-transparent`}
                            spellCheck={false}
                            autoComplete="off"
                            autoCapitalize="none"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            autoFocus
                        />
                        {/* Custom Caret */}
                        <div 
                            className={`absolute top-0 h-5 w-2.5 bg-current opacity-50 animate-pulse pointer-events-none`} 
                            style={{ left: `${input.length}ch` }}
                        ></div>
                    </div>
                </div>
                <div ref={bottomRef} />
            </div>

            {/* Terminal Footer */}
            <div className="bg-[#1f1f1f] px-4 py-1 border-t border-white/5 text-[10px] opacity-60 font-mono flex justify-between items-center select-none shrink-0">
               <div className={`flex gap-4 ${themeColors[theme]}`}>
                  <span>BASH</span>
                  <span>UTF-8</span>
                  <span className="hidden md:inline">MEM: 14%</span>
               </div>
               <div className="flex items-center gap-3 text-white">
                  <Wifi className={`w-3 h-3 ${themeColors[theme]}`} />
                  <Battery className={`w-3 h-3 ${themeColors[theme]}`} />
                  <div className={`flex items-center gap-1.5 ${themeColors[theme]}`}>
                     <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                     ONLINE
                  </div>
               </div>
            </div>
        </div>
      </div>
    </section>
  );
};