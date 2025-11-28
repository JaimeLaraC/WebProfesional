import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minus, X as XIcon, Wifi, Battery } from 'lucide-react';

// --- TYPES ---
interface FileSystemNode {
  type: 'file' | 'dir';
  content?: string;
  children?: { [key: string]: FileSystemNode };
}

interface CommandHistory {
  id: number;
  command: string;
  output: React.ReactNode;
  path: string;
}

// --- INITIAL DATA ---
const INITIAL_FS: FileSystemNode = {
  type: 'dir',
  children: {
    'home': {
      type: 'dir',
      children: {
        'guest': {
          type: 'dir',
          children: {
            'proyectos': {
              type: 'dir',
              children: {
                'diagnostico_ia.txt': { type: 'file', content: 'Proyecto: Diagnóstico IA\nEstado: Completado\nStack: Python, TensorFlow, React\nDescripción: Sistema de detección de fallos en tiempo real.' },
                'auditoria_wifi.py': { type: 'file', content: 'print("Iniciando escaneo de vulnerabilidades WPA2...")' },
              }
            },
            'skills.md': { type: 'file', content: '# Habilidades Técnicas\n\n- Python: Experto\n- React/TS: Avanzado\n- Ciberseguridad: Avanzado\n- Linux: Nativo' },
            'contacto.txt': { type: 'file', content: 'Email: contact@jaime.dev\nLinkedIn: /in/jaime-lara-contento\nGitHub: @jaime-dev' },
            'secret.txt': { type: 'file', content: '¡Felicidades! Has encontrado el archivo secreto. La contraseña es: "MARCO_AURELIO"' }
          }
        }
      }
    },
    'etc': { type: 'dir', children: { 'passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nguest:x:1000:1000:guest:/home/guest:/bin/bash' } } },
    'var': { type: 'dir', children: { 'log': { type: 'dir', children: {} } } }
  }
};

// --- UTILS ---
const resolvePath = (currentPath: string[], targetPath: string): string[] | null => {
  if (targetPath === '/') return [];
  if (targetPath === '~') return ['home', 'guest'];
  
  let newPath = targetPath.startsWith('/') ? [] : [...currentPath];
  const parts = targetPath.split('/').filter(p => p !== '' && p !== '.');

  for (const part of parts) {
    if (part === '..') {
      if (newPath.length > 0) newPath.pop();
    } else {
      newPath.push(part);
    }
  }
  return newPath;
};

const getNodeAt = (fs: FileSystemNode, path: string[]): FileSystemNode | null => {
  let current = fs;
  for (const part of path) {
    if (current.type === 'dir' && current.children && current.children[part]) {
      current = current.children[part];
    } else {
      return null;
    }
  }
  return current;
};

// --- MATRIX EFFECT COMPONENT ---
const MatrixRain: React.FC<{ onStop: () => void }> = ({ onStop }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const letters = '010101ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｸABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(12, 12, 12, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-50 bg-black cursor-pointer font-mono" onClick={onStop}>
      <canvas ref={canvasRef} className="w-full h-full block opacity-80" />
      <div className="absolute top-4 right-4 text-green-500 text-xs bg-black/80 px-2 py-1 rounded border border-green-900/50">
        [ESC] to exit Matrix
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export const TerminalGame: React.FC = () => {
  const [fs, setFs] = useState<FileSystemNode>(INITIAL_FS);
  const [path, setPath] = useState<string[]>(['home', 'guest']);
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPtr, setHistoryPtr] = useState<number | null>(null);
  const [matrixMode, setMatrixMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Boot Sequence Effect
  useEffect(() => {
    const lines = [
      "JaimeOS v2.4.0-generic (tty1)",
      "Estableciendo conexión segura...",
      "Cargando Kernel Linux 5.15.0-91-generic...",
      "[ OK ] Mounted Root Filesystem.",
      "[ OK ] Started Network Manager.",
      "[ OK ] Started User Manager for UID 1000.",
      "[ OK ] Reached target Graphical Interface.",
      "Cargando perfil de usuario: guest...",
      "Inicializando entorno de shell..."
    ];

    let delay = 0;
    lines.forEach((line, i) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
        if (i === lines.length - 1) {
            setTimeout(() => setIsBooting(false), 500);
        }
      }, delay);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootLines, isBooting]);

  // Focus input when clicking terminal
  const focusInput = () => {
    if(!isBooting) inputRef.current?.focus();
  };

  const getPrompt = () => {
    const pathStr = path.length === 0 ? '/' : 
                    (path.length === 2 && path[0] === 'home' && path[1] === 'guest') ? '~' : 
                    '/' + path.join('/');
    return (
      <span className="flex items-center gap-2 flex-wrap">
        <span className="text-green-500 font-bold">guest@jaime</span>
        <span className="text-gray-400">:</span>
        <span className="text-blue-400 font-bold">{pathStr}</span>
        <span className="text-gray-400">$</span>
      </span>
    );
  };

  const handleCommand = (cmdRaw: string) => {
    const cmdTrimmed = cmdRaw.trim();
    if (!cmdTrimmed) return;

    const args = cmdTrimmed.split(' ');
    const cmd = args[0].toLowerCase();
    const param = args[1];
    
    setCmdHistory(prev => [...prev, cmdTrimmed]);
    setHistoryPtr(null);

    let output: React.ReactNode = null;
    const currentPathStr = path.join('/'); // Snapshot path for history

    const currentNode = getNodeAt(fs, path);

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-400 text-sm mt-2">
            <div><span className="text-yellow-300">ls</span> - Listar directorio</div>
            <div><span className="text-yellow-300">cd [dir]</span> - Cambiar directorio</div>
            <div><span className="text-yellow-300">cat [file]</span> - Ver archivo</div>
            <div><span className="text-yellow-300">mkdir [dir]</span> - Crear carpeta</div>
            <div><span className="text-yellow-300">touch [file]</span> - Crear archivo</div>
            <div><span className="text-yellow-300">rm [name]</span> - Borrar</div>
            <div><span className="text-yellow-300">neofetch</span> - Info del sistema</div>
            <div><span className="text-yellow-300">matrix</span> - ???</div>
            <div><span className="text-yellow-300">clear</span> - Limpiar</div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'ls':
        if (currentNode?.type === 'dir' && currentNode.children) {
          output = (
            <div className="flex flex-wrap gap-4 my-1">
              {Object.entries(currentNode.children).map(([name, node]) => (
                <span key={name} className={node.type === 'dir' ? 'text-blue-400 font-bold' : 'text-gray-200'}>
                  {name}{node.type === 'dir' ? '/' : ''}
                </span>
              ))}
            </div>
          );
        }
        break;

      case 'cd':
        if (!param) {
          setPath(['home', 'guest']);
        } else {
          const newPath = resolvePath(path, param);
          if (newPath !== null && getNodeAt(fs, newPath)?.type === 'dir') {
            setPath(newPath);
          } else {
            output = <span className="text-red-400">bash: cd: {param}: No existe el archivo o directorio</span>;
          }
        }
        break;

      case 'cat':
        if (!param) {
          output = <span className="text-red-400">Uso: cat [archivo]</span>;
        } else {
          const targetNode = currentNode?.children?.[param];
          if (targetNode?.type === 'file') {
            output = <div className="whitespace-pre-wrap text-gray-300 my-1">{targetNode.content}</div>;
          } else if (targetNode?.type === 'dir') {
             output = <span className="text-red-400">cat: {param}: Es un directorio</span>;
          } else {
            output = <span className="text-red-400">cat: {param}: No existe el archivo</span>;
          }
        }
        break;

      case 'mkdir':
        if (!param) {
           output = <span className="text-red-400">Uso: mkdir [nombre]</span>;
        } else if (currentNode?.children?.[param]) {
           output = <span className="text-red-400">mkdir: no se puede crear el directorio '{param}': El archivo ya existe</span>;
        } else {
            // Immutable update of FS
            const newFs = JSON.parse(JSON.stringify(fs));
            const node = getNodeAt(newFs, path);
            if (node && node.children) {
                node.children[param] = { type: 'dir', children: {} };
                setFs(newFs);
                output = <span className="text-gray-500">Directorio '{param}' creado.</span>;
            }
        }
        break;

      case 'touch':
        if (!param) {
           output = <span className="text-red-400">Uso: touch [nombre]</span>;
        } else {
            const newFs = JSON.parse(JSON.stringify(fs));
            const node = getNodeAt(newFs, path);
            if (node && node.children) {
                node.children[param] = { type: 'file', content: '' };
                setFs(newFs);
            }
        }
        break;

      case 'rm':
        if (!param) {
            output = <span className="text-red-400">Uso: rm [nombre]</span>;
        } else if (param === '/') {
            output = <span className="text-red-500 bg-red-950/50 px-1">¡Estás loco! No voy a borrar el sistema raíz.</span>;
        } else if (currentNode?.children?.[param]) {
            const newFs = JSON.parse(JSON.stringify(fs));
            const node = getNodeAt(newFs, path);
            if (node && node.children) {
                delete node.children[param];
                setFs(newFs);
                output = <span className="text-gray-500">Eliminado '{param}'.</span>;
            }
        } else {
             output = <span className="text-red-400">rm: no se puede borrar '{param}': No existe el archivo</span>;
        }
        break;
      
      case 'neofetch':
        output = (
            <div className="flex flex-col md:flex-row gap-4 my-2 font-mono text-xs md:text-sm">
                <div className="text-blue-500 whitespace-pre hidden md:block select-none">
{`       .---.
      /     \\
      |  J  |
      \\     /
       '-.-'   `}
                </div>
                <div>
                    <div className="text-blue-400 font-bold">guest@jaime-portfolio</div>
                    <div className="text-gray-500">---------------------</div>
                    <div><span className="text-blue-400">OS</span>: JaimeOS v2.4 (Web)</div>
                    <div><span className="text-blue-400">Host</span>: Portfolio Browser</div>
                    <div><span className="text-blue-400">Kernel</span>: React 19.0.0</div>
                    <div><span className="text-blue-400">Uptime</span>: Forever</div>
                    <div><span className="text-blue-400">Packages</span>: 142 (npm)</div>
                    <div><span className="text-blue-400">Shell</span>: zsh 5.8</div>
                    <div><span className="text-blue-400">CPU</span>: AI Neural Engine</div>
                    <div><span className="text-blue-400">Memory</span>: 128GB / ∞</div>
                    <div className="mt-2 flex gap-1">
                        <div className="w-3 h-3 bg-black"></div>
                        <div className="w-3 h-3 bg-red-500"></div>
                        <div className="w-3 h-3 bg-green-500"></div>
                        <div className="w-3 h-3 bg-yellow-500"></div>
                        <div className="w-3 h-3 bg-blue-500"></div>
                        <div className="w-3 h-3 bg-purple-500"></div>
                        <div className="w-3 h-3 bg-cyan-500"></div>
                        <div className="w-3 h-3 bg-gray-200"></div>
                    </div>
                </div>
            </div>
        );
        break;

      case 'matrix':
        setMatrixMode(true);
        output = <span className="text-green-500">The Matrix has you...</span>;
        break;

      case 'sudo':
        output = <span className="text-yellow-500">jaime is not in the sudoers file. This incident will be reported.</span>;
        break;

      case 'vim':
      case 'vi':
      case 'nano':
      case 'emacs':
        output = <span className="text-gray-300">Entrar es fácil. Salir... esa es otra historia. (Comando simulado)</span>;
        break;
      
      case 'whoami':
        output = "guest";
        break;
        
      case 'pwd':
        output = path.length === 0 ? '/' : '/' + path.join('/');
        break;

      default:
        output = <span className="text-red-400">{cmd}: orden no encontrada</span>;
    }

    setHistory(prev => [...prev, { id: Date.now(), command: cmdRaw, output, path: currentPathStr }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newPtr = historyPtr === null ? cmdHistory.length - 1 : Math.max(0, historyPtr - 1);
        setHistoryPtr(newPtr);
        setInput(cmdHistory[newPtr]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyPtr !== null) {
        const newPtr = Math.min(cmdHistory.length - 1, historyPtr + 1);
        setHistoryPtr(newPtr);
        setInput(cmdHistory[newPtr]);
      } else {
        setHistoryPtr(null);
        setInput('');
      }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        // Simple Autocomplete for current directory children
        const currentNode = getNodeAt(fs, path);
        if (currentNode?.children) {
            const args = input.split(' ');
            const lastArg = args[args.length - 1];
            const matches = Object.keys(currentNode.children).filter(k => k.startsWith(lastArg));
            if (matches.length === 1) {
                args[args.length - 1] = matches[0];
                setInput(args.join(' '));
            }
        }
    }
  };

  return (
    <section className="py-20 bg-[#111111] flex justify-center items-center px-4 relative border-t border-white/5 overflow-hidden" id="terminal">
        
        {/* Background Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-green-900/5 to-black blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10 w-full">
            <div className="flex flex-col items-center mb-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 text-center tracking-tight">
                    Terminal Mode
                </h2>
                <p className="text-gray-500 text-xs md:text-sm font-mono uppercase tracking-[0.2em]">
                    &gt; DEVELOPER ACCESS GRANTED
                </p>
            </div>

            {/* Terminal Window Frame */}
            <div 
                className="w-full bg-[#090909] rounded-xl shadow-[0_0_50px_-15px_rgba(0,0,0,0.7)] overflow-hidden border border-white/10 font-mono text-sm md:text-base relative group"
            >
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] bg-repeat opacity-10"></div>
                
                {/* Matrix */}
                {matrixMode && <MatrixRain onStop={() => setMatrixMode(false)} />}

                {/* Window Bar */}
                <div className="bg-[#1f1f1f] px-4 py-3 flex items-center justify-between border-b border-white/5 select-none z-30 relative">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4035] transition-colors cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffad1e] transition-colors cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#22b336] transition-colors cursor-pointer"></div>
                    </div>
                    <div className="text-gray-500 text-[10px] md:text-xs flex items-center gap-2 font-sans font-medium tracking-wide opacity-50 group-hover:opacity-100 transition-opacity">
                        <TerminalIcon size={10} />
                        <span>guest@jaime-portfolio:~</span>
                    </div>
                    <div className="flex gap-3 text-gray-600">
                         <Minus size={12} className="cursor-pointer hover:text-white transition-colors"/>
                         <Maximize2 size={10} className="cursor-pointer hover:text-white transition-colors"/>
                         <XIcon size={12} className="cursor-pointer hover:text-white transition-colors"/>
                    </div> 
                </div>

                {/* Terminal Content Area */}
                <div 
                    className="p-6 h-[500px] overflow-y-auto text-gray-300 cursor-text custom-scrollbar scroll-smooth relative bg-black/50 backdrop-blur-sm" 
                    onClick={focusInput}
                    ref={containerRef}
                    style={{ textShadow: '0 0 2px rgba(100, 255, 100, 0.1)' }}
                >
                    {isBooting ? (
                         <div className="space-y-1">
                            {bootLines.map((line, i) => (
                                <div key={i} className="text-green-500/80 animate-fade-in">
                                    <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                    {line}
                                </div>
                            ))}
                            <div className="w-2.5 h-5 bg-green-500 animate-pulse mt-2"></div>
                         </div>
                    ) : (
                        <>
                             <div className="mb-6 text-gray-400 leading-relaxed">
                                <p>Bienvenido a <span className="text-green-400 font-bold">JaimeOS</span> v2.4.0 (LTS)</p>
                                <p className="text-xs mt-1 text-gray-600">System load: 0.02, 0.04, 0.00 | Memory usage: 14%</p>
                                <p className="mt-4">Escribe <span className="text-yellow-300 font-bold">'help'</span> para ver la lista de comandos disponibles.</p>
                                <p className="text-sm mt-1 text-gray-500">Prueba: <span className="text-cyan-600">neofetch</span>, <span className="text-cyan-600">ls</span>, <span className="text-cyan-600">cat secret.txt</span></p>
                             </div>

                            {history.map((entry) => (
                                <div key={entry.id} className="mb-3 group/cmd">
                                    <div className="flex gap-2 flex-wrap items-center opacity-90 group-hover/cmd:opacity-100 transition-opacity">
                                        <span className="text-green-500 font-bold select-none">➜</span>
                                        <span className="text-cyan-400 font-bold select-none whitespace-nowrap">
                                            {entry.path === 'home/guest' ? '~' : (entry.path.startsWith('home/guest/') ? '~/' + entry.path.replace('home/guest/', '') : '/' + entry.path)}
                                        </span>
                                        <span className="text-gray-100 font-medium">{entry.command}</span>
                                    </div>
                                    <div className="ml-5 mt-1 text-gray-300 leading-relaxed break-words">
                                        {entry.output}
                                    </div>
                                </div>
                            ))}
                            
                            <div className="flex gap-2 items-center mt-2">
                                {getPrompt()}
                                <div className="relative flex-1 ml-1">
                                    <input 
                                        ref={inputRef}
                                        type="text" 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="bg-transparent border-none outline-none text-gray-100 focus:ring-0 p-0 w-full font-medium caret-transparent"
                                        autoFocus
                                        spellCheck={false}
                                        autoComplete="off"
                                        autoCapitalize="none"
                                    />
                                    {/* Custom Cursor Block */}
                                    <div 
                                        className="absolute top-0 h-5 w-2.5 bg-gray-400/80 animate-pulse pointer-events-none"
                                        style={{ left: `${input.length}ch` }}
                                    ></div>
                                </div>
                            </div>
                            <div ref={bottomRef} className="h-4" />
                        </>
                    )}
                </div>

                {/* Footer Status Bar */}
                <div className="bg-[#1f1f1f] px-4 py-1 border-t border-white/5 text-[10px] text-gray-500 font-mono flex justify-between items-center select-none">
                    <div className="flex gap-4">
                        <span>BASH</span>
                        <span>UTF-8</span>
                        <span className="hidden md:inline">MEM: 14%</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Wifi size={10} className="text-green-500" />
                        <Battery size={10} className="text-green-500" />
                        <div className="flex items-center gap-1.5 text-green-500/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            ONLINE
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Keyboard Shortcuts Hint */}
            <div className="mt-6 flex justify-center gap-6 text-gray-600 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-white/10 rounded text-gray-400 border border-white/5">Tab</span>
                    <span>para autocompletar</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-white/10 rounded text-gray-400 border border-white/5">↑/↓</span>
                    <span>para historial</span>
                </div>
            </div>
        </div>
    </section>
  );
};
