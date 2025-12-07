import React, { useState, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Project } from '../types';
import {
    FileCode,
    Search,
    GitBranch,
    Settings,
    MoreHorizontal,
    X,
    Play,
    Terminal,
    Folder,
    ChevronRight,
    ChevronDown,
    Blocks,
    Copy,
    Check,
    Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VSCodeViewerProps {
    initialProject: Project;
    projects: Project[];
    onClose?: () => void;
}

type SidebarView = 'explorer' | 'search' | 'extensions' | 'git';

const VSCodeViewer: React.FC<VSCodeViewerProps> = ({
    initialProject,
    projects,
    onClose
}) => {
    // State for Tabs
    const [openProjects, setOpenProjects] = useState<Project[]>([initialProject]);
    const [activeProjectId, setActiveProjectId] = useState<string>(initialProject.id);

    // Layout State
    const [activeSidebarView, setActiveSidebarView] = useState<SidebarView>('explorer');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [folderCollapsed, setFolderCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Terminal State
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [isRunLoading, setIsRunLoading] = useState(false);

    // Other
    const [copied, setCopied] = useState(false);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile && !isSidebarOpen) {
                setIsSidebarOpen(true); // Open sidebar on desktop
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Derived
    const activeProject = openProjects.find(p => p.id === activeProjectId) || initialProject;

    // Effects
    useEffect(() => {
        // If the initial project passed in isn't in open tabs, add it
        if (!openProjects.find(p => p.id === initialProject.id)) {
            setOpenProjects(prev => [...prev, initialProject]);
        }
        setActiveProjectId(initialProject.id);
        setTerminalOutput([]); // Clear terminal on new initial project
        setIsTerminalOpen(false);
    }, [initialProject]);

    const handleProjectClick = (project: Project) => {
        if (!openProjects.find(p => p.id === project.id)) {
            setOpenProjects(prev => [...prev, project]);
        }
        setActiveProjectId(project.id);
    };

    const closeTab = (e: React.MouseEvent, projectId: string) => {
        e.stopPropagation();
        const newOpen = openProjects.filter(p => p.id !== projectId);
        setOpenProjects(newOpen);

        if (activeProjectId === projectId) {
            if (newOpen.length > 0) {
                setActiveProjectId(newOpen[newOpen.length - 1].id);
            } else {
                // Keep at least one tab or show empty state? Let's re-open initial for safety in this demo
                setOpenProjects([projects[0]]);
                setActiveProjectId(projects[0].id);
            }
        }
    };

    const toggleSidebar = (view: SidebarView) => {
        if (activeSidebarView === view && isSidebarOpen) {
            setIsSidebarOpen(false);
        } else {
            setActiveSidebarView(view);
            setIsSidebarOpen(true);
        }
    };

    const runCode = () => {
        setIsTerminalOpen(true);
        setIsRunLoading(true);
        setTerminalOutput(['Compiling/Interpreting...', '']);

        setTimeout(() => {
            setIsRunLoading(false);
            const output = activeProject.runOutput
                ? activeProject.runOutput.split('\n')
                : ['> Executing script...', '[SUCCESS] Script finished with exit code 0'];
            setTerminalOutput(output);
        }, 800);
    };

    const copyCode = () => {
        if (activeProject.code) {
            navigator.clipboard.writeText(activeProject.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Custom Monaco Theme
    const handleEditorWillMount = (monaco: Monaco) => {
        monaco.editor.defineTheme('vs-dark-modern', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955' },
                { token: 'keyword', foreground: '569CD6' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'function', foreground: 'DCDCAA' },
            ],
            colors: {
                'editor.background': '#1e1e1e',
                'editor.lineHighlightBackground': '#2F3337',
                'scrollbarSlider.background': '#424242',
                'scrollbarSlider.hoverBackground': '#4F4F4F',
                'scrollbarSlider.activeBackground': '#BFBFBF',
            }
        });
    };

    // Render Helpers
    const renderSidebarContent = () => {
        switch (activeSidebarView) {
            case 'search':
                return (
                    <div className="p-4">
                        <span className="text-xs font-bold text-[#BBBBBB] block mb-2">SEARCH</span>
                        <div className="bg-[#3c3c3c] border border-[#3c3c3c] rounded-sm p-1 flex items-center">
                            <input
                                placeholder="Search"
                                className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-[#858585]"
                            />
                        </div>
                    </div>
                );
            case 'extensions':
                return (
                    <div className="p-0">
                        <div className="px-4 py-2 text-xs font-bold text-[#BBBBBB]">EXTENSIONS</div>
                        {['Python', 'ESLint', 'Prettier', 'Docker', 'GitLens'].map(ext => (
                            <div key={ext} className="px-4 py-2 hover:bg-[#2a2d2e] cursor-pointer flex gap-3">
                                <div className="w-8 h-8 bg-[#3c3c3c] flex items-center justify-center text-xs text-blue-400 font-bold">
                                    {ext.substring(0, 2)}
                                </div>
                                <div>
                                    <div className="text-xs text-white font-bold">{ext}</div>
                                    <div className="text-[10px] text-[#858585]">Installed</div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'git':
                return (
                    <div className="p-4 text-center text-[#858585] text-xs mt-10">
                        No source control providers registered.
                    </div>
                );
            case 'explorer':
            default:
                return (
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div
                            className="px-2 py-1 flex items-center gap-1 text-[#CCCCCC] font-bold cursor-pointer text-xs hover:bg-[#2a2d2e]"
                            onClick={() => setFolderCollapsed(!folderCollapsed)}
                        >
                            {folderCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                            <span className="ml-1 uppercase tracking-wide text-[11px]">JAIME-PORTFOLIO</span>
                        </div>

                        {!folderCollapsed && (
                            <div className="mt-0">
                                {/* Simulated Folders */}
                                <div className="pl-4 py-1 flex items-center gap-1.5 text-[#CCCCCC] cursor-pointer hover:bg-[#2a2d2e] text-xs">
                                    <ChevronRight size={14} className="text-[#858585]" />
                                    <Folder size={14} className="text-[#dcb67b]" />
                                    <span>.vscode</span>
                                </div>
                                <div className="pl-4 py-1 flex items-center gap-1.5 text-[#CCCCCC] cursor-pointer hover:bg-[#2a2d2e] text-xs">
                                    <ChevronDown size={14} className="text-[#858585]" />
                                    <Folder size={14} className="text-[#dcb67b]" />
                                    <span>projects</span>
                                </div>

                                {/* Project Files */}
                                <div className="ml-2 border-l border-[#404040]">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            onClick={() => handleProjectClick(project)}
                                            className={`
                        flex items-center gap-2 pl-6 py-1 cursor-pointer text-[#CCCCCC] hover:bg-[#2a2d2e] transition-colors mb-0
                        ${activeProjectId === project.id ? 'bg-[#37373d] text-white' : ''}
                      `}
                                        >
                                            {project.language === 'python' && <span className="text-[#3776AB] text-[10px] font-bold">PY</span>}
                                            {project.language === 'shell' && <span className="text-[#4EAA25] text-[10px] font-bold">SH</span>}
                                            {(project.language === 'javascript' || project.language === 'typescript') && <span className="text-[#3178C6] text-[10px] font-bold">TS</span>}
                                            <span className="truncate text-xs">{project.fileName}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pl-4 py-1 flex items-center gap-1.5 text-[#CCCCCC] cursor-pointer hover:bg-[#2a2d2e] text-xs">
                                    <ChevronRight size={14} className="text-[#858585]" />
                                    <Folder size={14} className="text-[#dcb67b]" />
                                    <span>node_modules</span>
                                </div>
                                <div className="pl-5 py-1 flex items-center gap-1.5 text-[#CCCCCC] cursor-pointer hover:bg-[#2a2d2e] text-xs">
                                    <span className="text-yellow-400 text-[10px] font-bold ml-0.5">{ }</span>
                                    <span>package.json</span>
                                </div>
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-full flex flex-col font-sans text-sm bg-[#1e1e1e] text-[#cccccc] overflow-hidden rounded-xl shadow-2xl border border-[#333] relative">

            {/* Title Bar (Mac Style) */}
            <div className="h-9 bg-[#323233] flex items-center justify-between px-2 md:px-4 select-none shrink-0 border-b border-[#111]">
                <div className="flex gap-2 items-center">
                    {onClose && (
                        <div
                            onClick={onClose}
                            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4035] transition-colors cursor-pointer flex items-center justify-center group"
                        >
                            <X size={8} className="text-[#3e0e0e] opacity-0 group-hover:opacity-100" />
                        </div>
                    )}
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffad1e] transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#22b336] transition-colors cursor-pointer"></div>

                    {/* Mobile sidebar toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden ml-2 p-1 rounded hover:bg-[#4a4a4a] text-gray-400 hover:text-white transition-colors"
                    >
                        <Menu size={16} />
                    </button>
                </div>
                <div className="text-[10px] md:text-xs text-[#999999] font-medium flex items-center gap-2 truncate max-w-[50%]">
                    <span className="truncate">{activeProject.fileName}</span>
                    <span className="hidden sm:inline">— jaime-portfolio</span>
                </div>
                <div className="w-6 md:w-14"></div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row min-h-0">

                {/* Activity Bar */}
                <div className="hidden md:flex w-12 bg-[#333333] flex-col items-center py-2 gap-2 text-[#858585] shrink-0 z-20 border-r border-[#1e1e1e]">
                    {[
                        { id: 'explorer', icon: FileCode },
                        { id: 'search', icon: Search },
                        { id: 'git', icon: GitBranch },
                        { id: 'extensions', icon: Blocks }
                    ].map(item => (
                        <div
                            key={item.id}
                            onClick={() => toggleSidebar(item.id as SidebarView)}
                            className={`w-full py-3 flex justify-center cursor-pointer border-l-2 transition-colors ${activeSidebarView === item.id && isSidebarOpen ? 'border-white text-white' : 'border-transparent hover:text-white'}`}
                        >
                            {/* @ts-ignore */}
                            <item.icon size={24} strokeWidth={1.5} />
                        </div>
                    ))}
                    <div className="flex-1" />
                    <div className="w-full py-3 flex justify-center cursor-pointer hover:text-white">
                        <Settings size={24} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Sidebar */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: isMobile ? '100%' : 240, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#252526] flex flex-col border-b md:border-b-0 md:border-r border-[#111] shrink-0 overflow-hidden absolute md:relative z-30 h-[200px] md:h-auto"
                        >
                            <div className="h-9 px-4 flex items-center justify-between text-[#BBBBBB] text-[11px] font-bold tracking-wide shrink-0">
                                <span>{activeSidebarView.toUpperCase()}</span>
                                <div className="flex items-center gap-2">
                                    <MoreHorizontal size={16} className="cursor-pointer" />
                                    <X size={14} className="cursor-pointer md:hidden hover:text-white" onClick={() => setIsSidebarOpen(false)} />
                                </div>
                            </div>
                            {renderSidebarContent()}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Editor Group */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0 relative">

                    {/* Tabs */}
                    <div className="h-9 bg-[#252526] flex items-center overflow-x-auto no-scrollbar border-b border-[#1e1e1e]">
                        {openProjects.map(project => (
                            <div
                                key={project.id}
                                onClick={() => setActiveProjectId(project.id)}
                                className={`
                  flex items-center gap-2 px-3 h-full min-w-fit cursor-pointer pr-8 relative border-r border-[#1e1e1e] select-none text-xs
                  ${activeProjectId === project.id ? 'bg-[#1e1e1e] text-white border-t border-t-blue-400' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2d2e]'}
                `}
                            >
                                <span className={`${project.language === 'python' ? 'text-[#3776AB]' : project.language === 'shell' ? 'text-[#4EAA25]' : 'text-[#3178C6]'}`}>
                                    {project.language === 'python' ? 'J' : '#'}
                                </span>
                                <span>{project.fileName}</span>
                                <X
                                    size={14}
                                    onClick={(e) => closeTab(e, project.id)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md hover:bg-[#4b4b4b] text-[#cccccc] opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Breadcrumbs & Toolbar */}
                    <div className="h-8 flex items-center px-4 bg-[#1e1e1e] text-[#a9a9a9] text-xs gap-1 shadow-sm z-10 shrink-0">
                        <span>jaime-portfolio</span>
                        <ChevronRight size={12} />
                        <span>projects</span>
                        <ChevronRight size={12} />
                        <span className="text-white ml-1">{activeProject.fileName}</span>

                        <div className="flex-1" />

                        <div className="flex gap-2">
                            <button
                                onClick={copyCode}
                                className="p-1 rounded hover:bg-[#333] transition-colors text-gray-400 hover:text-white"
                                title="Copy Code"
                            >
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                            <button
                                onClick={runCode}
                                className="p-1 rounded hover:bg-[#333] transition-colors text-green-500 hover:text-green-400 flex items-center gap-1"
                                title="Run Code"
                            >
                                <Play size={14} />
                            </button>
                            <button
                                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                                className={`p-1 rounded hover:bg-[#333] transition-colors ${isTerminalOpen ? 'text-white' : 'text-gray-400'}`}
                                title="Toggle Terminal"
                            >
                                <Terminal size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Monaco Editor Container */}
                    <div className={`flex-1 relative bg-[#1e1e1e] min-h-0 ${isMobile && isSidebarOpen ? 'mt-[200px]' : ''}`}>
                        <Editor
                            height="100%"
                            language={activeProject.language}
                            value={activeProject.code}
                            theme="vs-dark-modern"
                            beforeMount={handleEditorWillMount}
                            options={{
                                readOnly: true,
                                minimap: { enabled: !isMobile, scale: 0.75 },
                                fontSize: isMobile ? 12 : 14,
                                fontFamily: "'JetBrains Mono', monospace",
                                lineNumbers: isMobile ? 'off' : 'on',
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 12 },
                                cursorStyle: 'line',
                                renderLineHighlight: 'all',
                                wordWrap: isMobile ? 'on' : 'off',
                            }}
                        />
                    </div>

                    {/* Integrated Terminal Panel */}
                    <AnimatePresence>
                        {isTerminalOpen && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 180 }}
                                exit={{ height: 0 }}
                                className="bg-[#1e1e1e] border-t border-[#414141] flex flex-col shrink-0"
                            >
                                <div className="flex items-center gap-6 px-4 py-2 text-[11px] font-bold text-[#969696] border-b border-[#414141] select-none">
                                    <span className="text-white border-b border-white pb-2 -mb-2.5 cursor-pointer">TERMINAL</span>
                                    <span className="hover:text-white cursor-pointer">OUTPUT</span>
                                    <span className="hover:text-white cursor-pointer">DEBUG CONSOLE</span>
                                    <div className="flex-1" />
                                    <X size={14} className="cursor-pointer hover:text-white" onClick={() => setIsTerminalOpen(false)} />
                                </div>
                                <div className="flex-1 p-4 font-mono text-xs overflow-y-auto custom-scrollbar">
                                    {isRunLoading ? (
                                        <div className="text-yellow-400 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                            Executing...
                                        </div>
                                    ) : (
                                        terminalOutput.length > 0 ? (
                                            terminalOutput.map((line, idx) => (
                                                <div key={idx} className={`${line.includes('[SUCCESS]') ? 'text-green-400' : line.startsWith('>') ? 'text-yellow-300' : 'text-[#cccccc]'}`}>
                                                    {line}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-[#666]">Ready. Click the 'Run' button to execute code.</div>
                                        )
                                    )}
                                    <div className="mt-2 flex items-center gap-1 text-[#cccccc]">
                                        <span className="text-green-400 font-bold">➜</span>
                                        <span className="text-blue-400 font-bold">{activeProject.fileName?.split('.')[0] || 'script'}</span>
                                        <span className="w-2 h-4 bg-[#cccccc] animate-pulse"></span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Status Bar */}
                    <div className="h-6 bg-[#007acc] flex items-center justify-between px-2 md:px-3 text-white text-[9px] md:text-[10px] select-none shrink-0 z-20">
                        <div className="flex gap-2 md:gap-4">
                            <span className="flex items-center gap-1 cursor-pointer hover:bg-[#1f8ad2] px-1 rounded"><GitBranch size={10} /> main*</span>
                            <span className="cursor-pointer hover:bg-[#1f8ad2] px-1 rounded hidden sm:flex items-center gap-1"><X size={10} className="rounded-full bg-transparent" /> 0</span>
                            <span className="cursor-pointer hover:bg-[#1f8ad2] px-1 rounded hidden sm:flex items-center gap-1">⚠ 0</span>
                        </div>
                        <div className="flex gap-2 md:gap-4">
                            <span className="cursor-pointer hover:bg-[#1f8ad2] px-1 rounded hidden md:block">Ln {activeProject.code?.split('\n').length || 0}, Col 1</span>
                            <span className="cursor-pointer hover:bg-[#1f8ad2] px-1 rounded hidden sm:block">UTF-8</span>
                            <span className="cursor-pointer hover:bg-[#1f8ad2] px-1 rounded">{activeProject.language?.toUpperCase() || 'TXT'}</span>
                            <span className="cursor-pointer hover:bg-[#1f8ad2] px-1 rounded hidden md:block">Prettier</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VSCodeViewer;
