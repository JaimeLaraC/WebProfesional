import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, GitBranch, Calendar, User, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TextReveal from './TextReveal';

const EducationGit: React.FC = () => {
    const { t } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Helper to generate consistent hex colors for hashes
    const getHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash).toString(16).substring(0, 7);
    };

    return (
        <div className="w-full max-w-5xl mx-auto font-mono text-sm">
            {/* Mock Git GUI Toolbar */}
            <div className="bg-[#1e1e1e] rounded-t-xl border border-[#333] border-b-0 p-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    </div>
                    <div className="h-4 w-[1px] bg-[#444] mx-2"></div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#252526] rounded text-xs border border-[#333] text-white">
                        <GitBranch size={12} className="text-blue-400" />
                        <span>main</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#252526] rounded text-xs border border-[#333] hover:bg-[#2a2d2e] cursor-pointer transition-colors">
                        <GitCommit size={12} />
                        <span>History</span>
                    </div>
                </div>
                <div className="text-xs text-gray-500 hidden md:block">
                    jaime-portfolio/education.git
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-[#1e1e1e] border border-[#333] rounded-b-xl shadow-2xl overflow-hidden relative min-h-[500px]">

                {/* Background Grid Lines for Commit Graph */}
                <div className="absolute top-0 left-8 bottom-0 w-px bg-[#333] z-0"></div>

                {/* Header Row */}
                <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#333] text-gray-500 text-xs font-bold uppercase tracking-wider sticky top-0 z-20">
                    <div className="w-16 text-center">Graph</div>
                    <div className="w-24">Hash</div>
                    <div className="flex-1">Message / Degree</div>
                    <div className="w-40 hidden md:block">Author / School</div>
                    <div className="w-24 text-right">Date</div>
                </div>

                {/* HEAD Pointer */}
                <div className="relative z-10 flex items-center px-4 py-3 hover:bg-[#2a2d2e] transition-colors group">
                    <div className="w-16 flex justify-center items-center relative">
                        <div className="w-3 h-3 rounded-full border-2 border-blue-400 bg-[#1e1e1e] z-10"></div>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold flex items-center gap-1">
                            <GitBranch size={10} /> HEAD
                        </span>
                        <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold">
                            main
                        </span>
                    </div>
                </div>

                {/* Commits */}
                {t.education.map((edu, index) => {
                    const isMerge = edu.type === 'degree';
                    const hash = getHash(edu.degree);

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Row Container */}
                            <div
                                className={`flex items-center px-4 py-3 border-b border-[#2a2d2e] transition-colors cursor-pointer group ${hoveredIndex === index ? 'bg-[#2a2d2e]' : ''}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Graph Column */}
                                <div className="w-16 flex justify-center items-center relative shrink-0">
                                    {/* Vertical Line Segment */}
                                    <div className="absolute top-[-50%] bottom-[-50%] w-0.5 bg-gray-600 group-hover:bg-gray-500 transition-colors"></div>

                                    {/* Commit Dot */}
                                    <div className={`
                    w-3 h-3 rounded-full border-2 z-10 transition-transform duration-300
                    ${isMerge ? 'bg-purple-500 border-purple-300 w-4 h-4' : 'bg-[#1e1e1e] border-gray-400'}
                    ${hoveredIndex === index ? 'scale-125 border-white bg-blue-500' : ''}
                  `}></div>

                                    {/* Merge curve simulation for degrees */}
                                    {isMerge && (
                                        <svg className="absolute left-[50%] top-[50%] w-8 h-8 pointer-events-none" style={{ transform: 'translate(-12px, -4px)' }}>
                                            <path d="M 6 0 Q 14 10 24 10" fill="none" stroke="#a855f7" strokeWidth="2" />
                                        </svg>
                                    )}
                                </div>

                                {/* Hash */}
                                <div className="w-24 text-blue-400 shrink-0 opacity-80 group-hover:opacity-100 group-hover:underline">
                                    {hash}
                                </div>

                                {/* Message */}
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-medium truncate ${isMerge ? 'text-purple-300 text-base' : 'text-gray-300'}`}>
                                            <TextReveal text={edu.degree} />
                                        </span>
                                        {isMerge && <span className="px-1.5 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold">MERGE</span>}
                                        {edu.type === 'certification' && <Tag size={12} className="text-gray-500" />}
                                    </div>
                                </div>

                                {/* Author */}
                                <div className="w-40 hidden md:flex items-center gap-2 text-gray-400 shrink-0">
                                    <User size={12} />
                                    <span className="truncate"><TextReveal text={edu.school} /></span>
                                </div>

                                {/* Date */}
                                <div className="w-24 text-right text-gray-500 shrink-0 flex items-center justify-end gap-2">
                                    <Calendar size={12} />
                                    <span><TextReveal text={edu.year || ''} /></span>
                                </div>
                            </div>

                            {/* Diff View (Expanded on Hover) */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-[#0d0d0d] border-b border-[#333]"
                                    >
                                        <div className="pl-[4.5rem] pr-4 py-3">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2 border-b border-[#333] pb-1">
                                                <span>CHANGES</span>
                                                <span>{edu.skills?.length || 0} additions (+)</span>
                                            </div>

                                            <div className="font-mono text-xs">
                                                {edu.skills?.map((skill, i) => (
                                                    <div key={i} className="flex group/line">
                                                        <div className="w-8 text-gray-700 text-right mr-3 select-none">{i + 1}</div>
                                                        <div className="flex-1 bg-green-900/10 text-green-400/90 pl-1 border-l-2 border-green-700/50 flex items-center gap-2">
                                                            <span className="select-none opacity-50">+</span>
                                                            <span>import</span>
                                                            <span className="text-yellow-300/90 font-bold">{skill.replace(/ /g, '_')}</span>
                                                            <span>from</span>
                                                            <span className="text-orange-300/90">'<TextReveal text={edu.school} />'</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}

                {/* Initial Commit */}
                <div className="flex items-center px-4 py-3 text-gray-600 opacity-50">
                    <div className="w-16 flex justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                    </div>
                    <div className="text-xs italic">Initial commit</div>
                </div>

            </div>
        </div>
    );
};

export default EducationGit;
