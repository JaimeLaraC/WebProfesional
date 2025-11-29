import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minus, X as XIcon, Wifi, Battery, Gamepad2, Palette, BrainCircuit, Cpu, Activity } from 'lucide-react';

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

type Theme = 'matrix' | 'cyberpunk' | 'dracula' | 'retro';

interface ThemeConfig {
  bg: string;
  text: string;
  promptUser: string;
  promptPath: string;
  accent: string;
  windowBg: string;
  windowHeader: string;
}

// --- THEMES ---
const THEMES: Record<Theme, ThemeConfig> = {
  matrix: {
    bg: 'bg-black/90',
    text: 'text-green-500',
    promptUser: 'text-green-400',
    promptPath: 'text-green-600',
    accent: 'text-green-300',
    windowBg: 'bg-[#090909]',
    windowHeader: 'bg-[#1f1f1f]'
  },
  cyberpunk: {
    bg: 'bg-[#0b0014]/90',
    text: 'text-[#00ff9f]',
    promptUser: 'text-[#ff0055]',
    promptPath: 'text-[#00e1ff]',
    accent: 'text-[#f7ff00]',
    windowBg: 'bg-[#12051b]',
    windowHeader: 'bg-[#2d0a42]'
  },
  dracula: {
    bg: 'bg-[#282a36]/95',
    text: 'text-[#f8f8f2]',
    promptUser: 'text-[#ff79c6]',
    promptPath: 'text-[#bd93f9]',
    accent: 'text-[#50fa7b]',
    windowBg: 'bg-[#282a36]',
    windowHeader: 'bg-[#44475a]'
  },
  retro: {
    bg: 'bg-[#1a1a1a]/95',
    text: 'text-[#ffb000]',
    promptUser: 'text-[#ffb000]',
    promptPath: 'text-[#cc8800]',
    accent: 'text-[#ffcc00]',
    windowBg: 'bg-[#1a1a1a]',
    windowHeader: 'bg-[#333333]'
  }
};

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
            'contacto.txt': { type: 'file', content: 'Email: jaime.lara@alu.uclm.es\nLinkedIn: /in/jaime-lara-contento\nGitHub: @JaimeLaraC' },
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

// --- SNAKE GAME ---
const SnakeGame: React.FC<{ onExit: () => void, theme: ThemeConfig }> = ({ onExit, theme }) => {
  const [snake, setSnake] = useState<[number, number][]>([[10, 10]]);
  const [food, setFood] = useState<[number, number]>([15, 15]);
  const [dir, setDir] = useState<[number, number]>([1, 0]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gridW = 30;
  const gridH = 15;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.key === 'Enter') onExit();
        return;
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp': if (dir[1] !== 1) setDir([0, -1]); break;
        case 'ArrowDown': if (dir[1] !== -1) setDir([0, 1]); break;
        case 'ArrowLeft': if (dir[0] !== 1) setDir([-1, 0]); break;
        case 'ArrowRight': if (dir[0] !== -1) setDir([1, 0]); break;
        case 'Escape': onExit(); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dir, gameOver, onExit]);

  useEffect(() => {
    if (gameOver) return;
    const move = setInterval(() => {
      setSnake(prev => {
        const head = prev[prev.length - 1];
        const newHead: [number, number] = [head[0] + dir[0], head[1] + dir[1]];

        // Wall Collision
        if (newHead[0] < 0 || newHead[0] >= gridW || newHead[1] < 0 || newHead[1] >= gridH) {
          setGameOver(true);
          return prev;
        }
        // Self Collision
        if (prev.some(p => p[0] === newHead[0] && p[1] === newHead[1])) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [...prev, newHead];
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(s => s + 1);
          setFood([Math.floor(Math.random() * gridW), Math.floor(Math.random() * gridH)]);
        } else {
          newSnake.shift();
        }
        return newSnake;
      });
    }, 100);
    return () => clearInterval(move);
  }, [dir, food, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center font-mono my-4 select-none">
      <div className={`border-2 p-1 ${theme.text} border-current`}>
        {Array.from({ length: gridH }).map((_, y) => (
          <div key={y} className="flex leading-none">
            {Array.from({ length: gridW }).map((_, x) => {
              const isSnake = snake.some(p => p[0] === x && p[1] === y);
              const isFood = food[0] === x && food[1] === y;
              return (
                <div key={x} className="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center">
                  {isSnake && <div className={`w-full h-full ${theme.bg === 'bg-black/90' ? 'bg-green-500' : 'bg-current'}`}></div>}
                  {isFood && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
                  {!isSnake && !isFood && <div className="w-0.5 h-0.5 bg-gray-800"></div>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-4">
        <span>SCORE: {score}</span>
        {gameOver && <span className="text-red-500 font-bold animate-pulse">GAME OVER - PRESS ENTER</span>}
        {!gameOver && <span className="text-gray-500 text-xs">[ARROWS] Move • [ESC] Exit</span>}
      </div>
    </div>
  );
};

// --- AI TRAINING SIMULATION ---
const AITraining: React.FC<{ onExit: () => void, theme: ThemeConfig }> = ({ onExit, theme }) => {
  const gridW = 30;
  const gridH = 15;
  const [snake, setSnake] = useState<[number, number][]>([[10, 10]]);
  const [food, setFood] = useState<[number, number]>([15, 15]);
  const [generation, setGeneration] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [epsilon, setEpsilon] = useState(1.0); // Exploration rate
  const [status, setStatus] = useState("Initializing Neural Network...");

  // AI Logic Helpers
  const getManhattanDist = (p1: [number, number], p2: [number, number]) => Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);

  const getBFSPath = (start: [number, number], target: [number, number], obstacles: [number, number][]) => {
    const queue: [number, number, [number, number][]][] = [[...start, []]];
    const visited = new Set<string>();
    visited.add(start.toString());

    while (queue.length > 0) {
      const [x, y, path] = queue.shift()!;
      if (x === target[0] && y === target[1]) return path;

      const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dx, dy] of neighbors) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < gridW && ny >= 0 && ny < gridH && !obstacles.some(o => o[0] === nx && o[1] === ny) && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);
          queue.push([nx, ny, [...path, [dx, dy]]]);
        }
      }
    }
    return null;
  };

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood([Math.floor(Math.random() * gridW), Math.floor(Math.random() * gridH)]);
    setCurrentScore(0);
    setGeneration(g => g + 1);
  };

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = prev[prev.length - 1];
        let move: [number, number] = [0, 0];

        // AI DECISION LOGIC
        // Phase 1: Random Exploration (Gen 1-3)
        // Phase 2: Greedy Heuristic (Gen 4-7)
        // Phase 3: Optimal Pathfinding (Gen 8+)

        let strategy = "Random";
        if (generation > 7) strategy = "BFS (Optimal)";
        else if (generation > 3) strategy = "Heuristic (Greedy)";

        setStatus(`Training Gen ${generation} | Strategy: ${strategy} | ε: ${epsilon.toFixed(2)}`);

        // Update Epsilon
        if (generation <= 3) setEpsilon(0.8);
        else if (generation <= 7) setEpsilon(0.3);
        else setEpsilon(0.05);

        // Decide Move
        if (Math.random() < epsilon) {
          // Random valid move
          const moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
          move = moves[Math.floor(Math.random() * moves.length)] as [number, number];
        } else {
          if (generation > 7) {
            // BFS
            const path = getBFSPath(head, food, prev);
            if (path && path.length > 0) move = path[0];
            else {
              // Fallback if no path (trapped)
              const moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
              move = moves[Math.floor(Math.random() * moves.length)] as [number, number];
            }
          } else {
            // Greedy
            const moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            let bestMove = moves[0];
            let minDist = Infinity;

            for (const m of moves) {
              const nx = head[0] + m[0];
              const ny = head[1] + m[1];
              // Avoid immediate death
              if (nx >= 0 && nx < gridW && ny >= 0 && ny < gridH && !prev.some(p => p[0] === nx && p[1] === ny)) {
                const dist = getManhattanDist([nx, ny], food);
                if (dist < minDist) {
                  minDist = dist;
                  bestMove = m;
                }
              }
            }
            move = bestMove as [number, number];
          }
        }

        const newHead: [number, number] = [head[0] + move[0], head[1] + move[1]];

        // Collision Check
        if (newHead[0] < 0 || newHead[0] >= gridW || newHead[1] < 0 || newHead[1] >= gridH || prev.some(p => p[0] === newHead[0] && p[1] === newHead[1])) {
          if (currentScore > bestScore) setBestScore(currentScore);
          resetGame();
          return [[10, 10]];
        }

        const newSnake = [...prev, newHead];
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setCurrentScore(s => s + 1);
          setFood([Math.floor(Math.random() * gridW), Math.floor(Math.random() * gridH)]);
        } else {
          newSnake.shift();
        }
        return newSnake;
      });
    }, 50); // Fast speed for simulation

    return () => clearInterval(interval);
  }, [generation, food, bestScore, currentScore, epsilon]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start justify-center font-mono my-4 select-none w-full max-w-4xl">

      {/* Game View */}
      <div className="flex flex-col items-center">
        <div className={`border-2 p-1 ${theme.text} border-current relative`}>
          {/* Scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-4 w-full animate-scan pointer-events-none"></div>

          {Array.from({ length: gridH }).map((_, y) => (
            <div key={y} className="flex leading-none">
              {Array.from({ length: gridW }).map((_, x) => {
                const isSnake = snake.some(p => p[0] === x && p[1] === y);
                const isFood = food[0] === x && food[1] === y;
                return (
                  <div key={x} className="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center">
                    {isSnake && <div className={`w-full h-full ${theme.bg === 'bg-black/90' ? 'bg-green-500' : 'bg-current'} opacity-80`}></div>}
                    {isFood && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>}
                    {!isSnake && !isFood && <div className="w-0.5 h-0.5 bg-gray-800/50"></div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500 w-full text-center">
          <button onClick={onExit} className="hover:text-white transition-colors">[ESC] Terminate Simulation</button>
        </div>
      </div>

      {/* Dashboard */}
      <div className={`flex-1 w-full border border-white/10 p-4 rounded bg-black/20 backdrop-blur-sm ${theme.text}`}>
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <Cpu size={16} className="animate-pulse" />
          <h3 className="font-bold">NEURAL NETWORK TRAINING</h3>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-1">STATUS</div>
            <div className="font-bold animate-pulse">{status}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-2 rounded">
              <div className="text-gray-500 text-xs">GENERATION</div>
              <div className="text-xl font-bold">{generation}</div>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <div className="text-gray-500 text-xs">BEST SCORE</div>
              <div className="text-xl font-bold text-yellow-500">{bestScore}</div>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <div className="text-gray-500 text-xs">CURRENT SCORE</div>
              <div className="text-xl font-bold">{currentScore}</div>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <div className="text-gray-500 text-xs">EPSILON (Randomness)</div>
              <div className="text-xl font-bold text-blue-400">{epsilon.toFixed(3)}</div>
            </div>
          </div>

          <div>
            <div className="text-gray-500 text-xs mb-1">LOSS METRIC</div>
            <div className="h-16 flex items-end gap-1 border-b border-l border-gray-700 p-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-red-500/50 transition-all duration-300"
                  style={{ height: `${Math.max(5, Math.random() * 100 * (1 - generation / 20))}%` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-4 font-mono">
            <div>&gt; Initializing weights... OK</div>
            <div>&gt; Loading heuristic model... OK</div>
            {generation > 3 && <div>&gt; Optimizing pathfinding... OK</div>}
            {generation > 7 && <div className="text-green-500">&gt; Convergence reached.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- QUIZ GAME ---
const QuizGame: React.FC<{ onExit: () => void, theme: ThemeConfig }> = ({ onExit, theme }) => {
  const questions = [
    { q: "¿Cuál es mi lenguaje de programación principal?", a: "python", options: ["Java", "Python", "C++", "Ruby"] },
    { q: "¿Qué framework de frontend uso en este portfolio?", a: "react", options: ["Vue", "Angular", "React", "Svelte"] },
    { q: "¿En qué empresa estoy trabajando actualmente?", a: "cojali", options: ["Google", "Cojali", "Microsoft", "Amazon"] },
    { q: "¿Qué herramienta uso para contenedores?", a: "docker", options: ["Kubernetes", "Docker", "Podman", "LXC"] }
  ];
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (ans: string) => {
    if (ans.toLowerCase().includes(questions[currentQ].a)) {
      setScore(s => s + 1);
    }
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="my-4 p-4 border border-dashed border-current rounded text-center">
        <h3 className={`text-xl font-bold ${theme.accent}`}>QUIZ COMPLETADO</h3>
        <p className="my-2">Puntuación Final: {score} / {questions.length}</p>
        <p className="text-sm text-gray-500 mb-4">
          {score === questions.length ? "¡Perfecto! Me conoces bien." : "¡Buen intento!"}
        </p>
        <button
          onClick={onExit}
          className={`px-4 py-2 ${theme.text} border border-current hover:bg-white/10 transition-colors`}
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <div className="my-4 max-w-md">
      <div className="flex justify-between text-xs mb-2 opacity-50">
        <span>PREGUNTA {currentQ + 1}/{questions.length}</span>
        <span>SCORE: {score}</span>
      </div>
      <h3 className={`text-lg font-bold mb-4 ${theme.accent}`}>{questions[currentQ].q}</h3>
      <div className="grid grid-cols-2 gap-2">
        {questions[currentQ].options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className={`text-left px-3 py-2 border border-white/10 hover:border-current hover:bg-white/5 transition-all rounded text-sm`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        <button onClick={onExit} className="hover:underline">[ESC] Cancelar</button>
      </div>
    </div>
  );
};

// --- MATRIX RAIN EFFECT ---
const MatrixRain: React.FC<{ onStop: () => void }> = ({ onStop }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);
    const chars = "0123456789ABCDEF";

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none opacity-50" onClick={onStop}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

import { useLanguage } from '../context/LanguageContext';

// ... (previous imports)

// ... (previous code)

// --- MAIN COMPONENT ---
export const TerminalGame: React.FC = () => {
  const { t } = useLanguage();
  const [fs, setFs] = useState<FileSystemNode>(INITIAL_FS);
  const [path, setPath] = useState<string[]>(['home', 'guest']);
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPtr, setHistoryPtr] = useState<number | null>(null);
  const [matrixMode, setMatrixMode] = useState(false);
  const [activeProcess, setActiveProcess] = useState<'snake' | 'quiz' | 'ai' | null>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>('matrix');
  const [isMaximized, setIsMaximized] = useState(false);
  const [systemCrash, setSystemCrash] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = THEMES[currentTheme];
  const ALL_COMMANDS = ['help', 'ls', 'cd', 'cat', 'clear', 'snake', 'quiz', 'ai', 'calc', 'theme', 'neofetch', 'whoami', 'rm'];

  // Boot Sequence
  useEffect(() => {
    const lines = [
      t.terminal.welcome,
      t.terminal.system,
      t.terminal.help_prompt,
      t.terminal.try,
      t.terminal.processing,
      "[ OK ] Loaded 'Snake' Module.",
      "[ OK ] Loaded 'Quiz' Module.",
      "[ OK ] Loaded 'AI-Trainer' Module.",
      "Bienvenido, usuario."
    ];
    let delay = 0;
    lines.forEach((line, i) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
        if (i === lines.length - 1) setTimeout(() => setIsBooting(false), 500);
      }, delay);
    });
  }, [t]);

  // System Crash Effect
  useEffect(() => {
    if (systemCrash) {
      const timer = setTimeout(() => {
        setSystemCrash(false);
        setHistory(prev => [...prev, { id: Date.now(), command: '', output: <span className="text-green-500 font-bold">Es broma, tengo backups 😉</span>, path: ['home', 'guest'].join('/') }]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [systemCrash]);

  // Auto-scroll fix
  useEffect(() => {
    if (containerRef.current) {
      // Use setTimeout to ensure DOM is fully updated before scrolling
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 10);
    }
  }, [history, bootLines, isBooting, activeProcess, isMaximized, input]); // Added input to keep view at bottom while typing if needed

  const focusInput = () => {
    if (!isBooting && !activeProcess) inputRef.current?.focus();
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
    const currentPathStr = path.join('/');
    const currentNode = getNodeAt(fs, path);

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2 opacity-90">
            <div className="col-span-full mb-2 font-bold border-b border-white/10 pb-1">COMANDOS DEL SISTEMA</div>
            <div><span className={theme.accent}>ls</span> - Listar directorio</div>
            <div><span className={theme.accent}>cd [dir]</span> - Navegar</div>
            <div><span className={theme.accent}>cat [file]</span> - Leer archivo</div>
            <div><span className={theme.accent}>clear</span> - Limpiar pantalla</div>

            <div className="col-span-full mt-3 mb-2 font-bold border-b border-white/10 pb-1">APPS & JUEGOS</div>
            <div><span className={theme.accent}>snake</span> - Jugar Snake 🐍</div>
            <div><span className={theme.accent}>quiz</span> - Trivia sobre mí 🧠</div>
            <div><span className={theme.accent}>ai</span> - Simulación IA 🤖</div>
            <div><span className={theme.accent}>calc [expr]</span> - Calculadora 🧮</div>

            <div className="col-span-full mt-3 mb-2 font-bold border-b border-white/10 pb-1">CONFIGURACIÓN</div>
            <div><span className={theme.accent}>theme [name]</span> - Cambiar tema</div>
            <div className="col-span-full text-xs text-gray-500 mt-1">Temas: matrix, cyberpunk, dracula, retro</div>
          </div>
        );
        break;

      case 'clear': setHistory([]); return;

      case 'snake': setActiveProcess('snake'); break;
      case 'quiz': setActiveProcess('quiz'); break;
      case 'ai': setActiveProcess('ai'); break;

      case 'whoami':
        output = (
          <div className="my-2">
            <div className="text-yellow-400">Visitante curioso con IP 192.168.1.42</div>
            <div className="text-xs opacity-50">(No te preocupes, no guardo logs 😉)</div>
          </div>
        );
        break;

      case 'rm':
        if (args[1] === '-rf' && args[2] === '/') {
          setSystemCrash(true);
          output = <span className="text-red-500 animate-pulse">SYSTEM FAILURE... DELETING ROOT...</span>;
        } else {
          output = <span className="text-red-400">Permiso denegado. Intenta ser más destructivo.</span>;
        }
        break;

      case 'theme':
        if (THEMES[param as Theme]) {
          setCurrentTheme(param as Theme);
          output = <span className="text-green-500">Tema cambiado a '{param}'.</span>;
        } else {
          output = <span className="text-red-400">Tema no encontrado. Prueba: matrix, cyberpunk, dracula, retro.</span>;
        }
        break;

      case 'calc':
        try {
          // eslint-disable-next-line no-eval
          const res = eval(args.slice(1).join(' '));
          output = <span className={theme.accent}>= {res}</span>;
        } catch {
          output = <span className="text-red-400">Error en la expresión.</span>;
        }
        break;

      case 'ls':
        if (currentNode?.type === 'dir' && currentNode.children) {
          output = (
            <div className="flex flex-wrap gap-4 my-1">
              {Object.entries(currentNode.children).map(([name, node]) => (
                <span key={name} className={node.type === 'dir' ? `${theme.accent} font-bold` : 'opacity-80'}>
                  {name}{node.type === 'dir' ? '/' : ''}
                </span>
              ))}
            </div>
          );
        }
        break;

      case 'cd':
        if (!param) setPath(['home', 'guest']);
        else {
          const newPath = resolvePath(path, param);
          if (newPath !== null && getNodeAt(fs, newPath)?.type === 'dir') setPath(newPath);
          else output = <span className="text-red-400">Directorio no encontrado: {param}</span>;
        }
        break;

      case 'cat':
        if (!param) output = <span className="text-red-400">Uso: cat [archivo]</span>;
        else {
          const targetNode = currentNode?.children?.[param];
          if (targetNode?.type === 'file') output = <div className="whitespace-pre-wrap opacity-90 my-1">{targetNode.content}</div>;
          else output = <span className="text-red-400">Archivo no encontrado: {param}</span>;
        }
        break;

      case 'neofetch':
        output = (
          <div className="flex flex-col md:flex-row gap-4 my-2 font-mono text-xs md:text-sm">
            <div className={`${theme.accent} whitespace-pre hidden md:block select-none`}>
              {`       .---.
      /     \\
      |  J  |
      \\     /
       '-.-'   `}
            </div>
            <div>
              <div className={`${theme.promptUser} font-bold`}>guest@jaime-portfolio</div>
              <div className="opacity-50">---------------------</div>
              <div><span className={theme.accent}>OS</span>: JaimeOS v3.0 (Web)</div>
              <div><span className={theme.accent}>Theme</span>: {currentTheme}</div>
              <div><span className={theme.accent}>Uptime</span>: Forever</div>
              <div><span className={theme.accent}>Shell</span>: Interactive React Shell</div>
              <div className="mt-2 flex gap-1">
                <div className="w-3 h-3 bg-black"></div>
                <div className="w-3 h-3 bg-red-500"></div>
                <div className="w-3 h-3 bg-green-500"></div>
                <div className="w-3 h-3 bg-yellow-500"></div>
                <div className="w-3 h-3 bg-blue-500"></div>
                <div className="w-3 h-3 bg-purple-500"></div>
              </div>
            </div>
          </div>
        );
        break;

      default:
        output = <span className="text-red-400">{cmd}: orden no encontrada. Escribe 'help'.</span>;
    }

    setHistory(prev => [...prev, { id: Date.now(), command: cmdRaw, output, path: currentPathStr }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (activeProcess) return; // Disable input when a game is active

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
      const args = input.split(' ');

      // Command Autocomplete
      if (args.length === 1) {
        const partialCmd = args[0].toLowerCase();
        const matches = ALL_COMMANDS.filter(c => c.startsWith(partialCmd));
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        }
      }
      // File/Dir Autocomplete
      else {
        const partialArg = args[args.length - 1];
        const currentNode = getNodeAt(fs, path);
        if (currentNode?.children) {
          const matches = Object.keys(currentNode.children).filter(k => k.startsWith(partialArg));
          if (matches.length === 1) {
            args[args.length - 1] = matches[0];
            setInput(args.join(' '));
          }
        }
      }
    }
  };

  return (
    <section className="py-20 bg-[#111111] flex justify-center items-center px-4 relative border-t border-white/5 overflow-hidden" id="terminal">

      {/* Background Ambience */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[100px] pointer-events-none transition-colors duration-1000 ${currentTheme === 'cyberpunk' ? 'bg-purple-900/20' : 'bg-green-900/5'}`}></div>

      {/* System Crash Effect */}
      {systemCrash && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono text-red-500 text-2xl font-bold animate-pulse">
          <div className="text-center">
            <div className="text-6xl mb-4">FATAL ERROR</div>
            <div>DELETING SYSTEM32...</div>
            <div>[====================] 99%</div>
          </div>
        </div>
      )}

      {/* Maximized/Quake Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-500 ${isMaximized ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMaximized(false)}
      />

      <div className={`container mx-auto max-w-5xl relative w-full transition-all duration-0 ${isMaximized ? 'z-[100]' : 'z-10'}`}>

        {/* Header */}
        <div className="flex flex-col items-center mb-10 relative z-0">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 text-center tracking-tight">
            Terminal Mode
          </h2>
          <div className="flex gap-4 text-xs md:text-sm font-mono uppercase tracking-widest text-gray-500">
            <span className="flex items-center gap-1"><Gamepad2 size={14} /> Interactive</span>
            <span className="flex items-center gap-1"><Palette size={14} /> Themed</span>
            <span className="flex items-center gap-1"><BrainCircuit size={14} /> AI Ready</span>
          </div>
        </div>

        {/* Placeholder to prevent layout shift */}
        {isMaximized && <div className="w-full h-[500px]" />}

        {/* Terminal Window Frame */}
        <div
          className={`
            ${theme.windowBg} rounded-xl overflow-hidden border border-white/10 font-mono text-sm md:text-base group flex flex-col
            transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
            ${isMaximized
              ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[85vh] z-50 shadow-[0_0_50px_rgba(0,0,0,0.5)] scale-100 border-white/20'
              : 'w-full h-[500px] relative shadow-2xl scale-100 z-10'
            }
          `}
        >
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] bg-repeat opacity-10"></div>

          {/* Matrix */}
          {matrixMode && <MatrixRain onStop={() => setMatrixMode(false)} />}

          {/* Window Bar */}
          <div className={`${theme.windowHeader} px-4 py-3 flex items-center justify-between border-b border-white/5 select-none z-30 relative transition-colors duration-500 shrink-0`}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4035] transition-colors cursor-pointer" onClick={() => setIsMaximized(false)}></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffad1e] transition-colors cursor-pointer" onClick={() => setIsMaximized(false)}></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#22b336] transition-colors cursor-pointer" onClick={() => setIsMaximized(!isMaximized)}></div>
            </div>
            <div className={`text-[10px] md:text-xs flex items-center gap-2 font-sans font-medium tracking-wide opacity-50 ${theme.text}`}>
              <TerminalIcon size={10} />
              <span>guest@jaime-portfolio:~</span>
            </div>
            <div className="flex gap-3 opacity-50">
              <Minus size={12} className="cursor-pointer hover:text-white transition-colors" onClick={() => setIsMaximized(false)} />
              <Maximize2 size={10} className="cursor-pointer hover:text-white transition-colors" onClick={() => setIsMaximized(!isMaximized)} />
              <XIcon size={12} className="cursor-pointer hover:text-white transition-colors" onClick={() => setIsMaximized(false)} />
            </div>
          </div>

          {/* Terminal Content Area */}
          <div
            className={`p-6 flex-1 overflow-y-auto ${theme.text} ${theme.bg} cursor-text custom-scrollbar relative transition-colors duration-500`}
            onClick={focusInput}
            ref={containerRef}
            style={{ textShadow: '0 0 2px rgba(100, 255, 100, 0.1)' }}
          >
            {isBooting ? (
              <div className="space-y-1">
                {bootLines.map((line, i) => (
                  <div key={i} className="animate-fade-in opacity-80">
                    <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {line}
                  </div>
                ))}
                <div className={`w-2.5 h-5 ${theme.accent.replace('text-', 'bg-')} animate-pulse mt-2`}></div>
              </div>
            ) : activeProcess ? (
              // Active Process View
              <div className="h-full flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center">
                  {activeProcess === 'snake' && <SnakeGame onExit={() => setActiveProcess(null)} theme={theme} />}
                  {activeProcess === 'quiz' && <QuizGame onExit={() => setActiveProcess(null)} theme={theme} />}
                  {activeProcess === 'ai' && <AITraining onExit={() => setActiveProcess(null)} theme={theme} />}
                </div>
                <div className="text-center text-xs opacity-50 mt-4">
                  Proceso activo: {activeProcess.toUpperCase()} (PID: {Math.floor(Math.random() * 9000) + 1000})
                </div>
              </div>
            ) : (
              // Standard Shell View
              <>
                <div className="mb-6 opacity-80 leading-relaxed">
                  <p>Bienvenido a <span className={`${theme.accent} font-bold`}>JaimeOS</span> v3.0.0</p>
                  <p className="text-xs mt-1 opacity-60">System load: 0.02, 0.04, 0.00 | Interactive Mode: ON</p>
                  <p className="mt-4">Escribe <span className={`${theme.accent} font-bold`}>'help'</span> para ver la lista de comandos.</p>
                  <p className="text-sm mt-1 opacity-60">Prueba: <span className="underline decoration-dashed">ai</span>, <span className="underline decoration-dashed">theme cyberpunk</span>, <span className="underline decoration-dashed">quiz</span></p>
                </div>

                {history.map((entry) => (
                  <div key={entry.id} className="mb-3 group/cmd">
                    <div className="flex gap-2 flex-wrap items-center opacity-90">
                      <span className={`${theme.accent} font-bold select-none`}>➜</span>
                      <span className={`${theme.promptPath} font-bold select-none whitespace-nowrap`}>
                        {entry.path === 'home/guest' ? '~' : (entry.path.startsWith('home/guest/') ? '~/' + entry.path.replace('home/guest/', '') : '/' + entry.path)}
                      </span>
                      <span className="font-medium opacity-90">{entry.command}</span>
                    </div>
                    <div className="ml-5 mt-1 opacity-80 leading-relaxed break-words">
                      {entry.output}
                    </div>
                  </div>
                ))}

                <div className="flex gap-2 items-center mt-2">
                  <span className="flex items-center gap-2 flex-wrap">
                    <span className={`${theme.promptUser} font-bold`}>guest@jaime</span>
                    <span className="opacity-40">:</span>
                    <span className={`${theme.promptPath} font-bold`}>
                      {path.length === 0 ? '/' : (path.length === 2 && path[0] === 'home' && path[1] === 'guest') ? '~' : '/' + path.join('/')}
                    </span>
                    <span className="opacity-40">$</span>
                  </span>
                  <div className="relative flex-1 ml-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-none outline-none text-inherit focus:ring-0 p-0 w-full font-medium caret-transparent"
                      spellCheck={false}
                      autoComplete="off"
                      autoCapitalize="none"
                    />
                    <div
                      className={`absolute top-0 h-5 w-2.5 ${theme.accent.replace('text-', 'bg-')} animate-pulse pointer-events-none`}
                      style={{ left: `${input.length}ch` }}
                    ></div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Status Bar */}
          <div className={`${theme.windowHeader} px-4 py-1 border-t border-white/5 text-[10px] opacity-60 font-mono flex justify-between items-center select-none transition-colors duration-500 shrink-0`}>
            <div className={`flex gap-4 ${theme.text}`}>
              <span>BASH</span>
              <span>UTF-8</span>
              <span className="hidden md:inline">MEM: 14%</span>
            </div>
            <div className="flex items-center gap-3">
              <Wifi size={10} className={theme.accent} />
              <Battery size={10} className={theme.accent} />
              <div className={`flex items-center gap-1.5 ${theme.accent}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${theme.accent.replace('text-', 'bg-')} animate-pulse`}></span>
                ONLINE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
