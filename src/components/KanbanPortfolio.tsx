// import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useMotionValue, AnimatePresence, useMotionTemplate, useSpring } from 'framer-motion';
import { PenTool, Wrench, CheckCircle, Search, Filter, X, Clock, LayoutGrid, ListTodo, ExternalLink, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '@/lib/utils';

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
// Solution type definition with new fields
export type Solution = {
  id: string;
  title: string;
  description: string;
  impact: string;
  status: 'blueprint' | 'workbench' | 'showcase';
  progress: number; // 0-100
  date?: string;
  tags: string[];
  link?: string;
  relatedSolutions?: string[]; // IDs of related solutions
  detailComponentId?: string; // Reference to the component for detailed content
  thumbnailUrl?: string; // Optional thumbnail image for the card
  previewDescription?: string; // Short teaser text that hints at the content
};

// Lazily load the portfolio item components
const LegacySystemsShowcase = lazy(() => import('./portfolio-items/LegacySystemsShowcase'));
const CustomerInsightsShowcase = lazy(() => import('./portfolio-items/CustomerInsightsShowcase'));
const PortfolioSystemShowcase = lazy(() => import('./portfolio-items/PortfolioSystemShowcase'));
const GenericDetailView = lazy(() => import('./portfolio-items/GenericDetailView'));

// Component mapping for dynamic loading
const PortfolioItemComponents: Record<string, React.ComponentType<{solution: Solution}>> = {
  'LegacySystemsShowcase': LegacySystemsShowcase,
  'CustomerInsightsShowcase': CustomerInsightsShowcase, 
  'PortfolioSystemShowcase': PortfolioSystemShowcase,
  'GenericDetailView': GenericDetailView
};

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blueprint"></div>
    </div>
  );
}

export function SolutionWorkshop({
  solutions = [],
  onAddSolution,
  onUpdateSolution,
  onDeleteSolution
}: {
  solutions?: Solution[];
  onAddSolution?: () => void;
  onUpdateSolution?: (solution: Solution) => void;
  onDeleteSolution?: (id: string) => void;
}) {
  if (!Array.isArray(solutions)) {
    return <div className="text-red-500 p-4">No solutions provided to SolutionWorkshop.</div>;
  }

  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [activeArea, setActiveArea] = useState<'blueprint' | 'workbench' | 'showcase' | null>(null);
  const [viewMode, setViewMode] = useState<'workshop' | 'list'>('workshop');
  const workshopRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.7 };
  const animatedMouseX = useSpring(mouseX, springConfig);
  const animatedMouseY = useSpring(mouseY, springConfig);

  // Moved useMotionTemplate to be unconditional
  const gradientBackground = useMotionTemplate`radial-gradient(500px circle at ${animatedMouseX}px ${animatedMouseY}px, rgba(0, 128, 255, 0.1), transparent 70%)`;

  useEffect(() => {
    const currentWorkshopRef = workshopRef.current;

    const handleMouseMove = (event: MouseEvent) => {
      if (currentWorkshopRef) {
        const rect = currentWorkshopRef.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }
    };

    const handleMouseLeave = () => {
      if (currentWorkshopRef) {
        mouseX.set(currentWorkshopRef.offsetWidth / 2);
        mouseY.set(currentWorkshopRef.offsetHeight / 2);
      }
    };

    if (currentWorkshopRef) {
      currentWorkshopRef.addEventListener('mousemove', handleMouseMove);
      currentWorkshopRef.addEventListener('mouseleave', handleMouseLeave);
      // Set initial position on mount if desktop
      mouseX.set(currentWorkshopRef.offsetWidth / 2);
      mouseY.set(currentWorkshopRef.offsetHeight / 2);
    }

    return () => {
      if (currentWorkshopRef) {
        currentWorkshopRef.removeEventListener('mousemove', handleMouseMove);
        currentWorkshopRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY, workshopRef]); // Added workshopRef to dependencies, as its current value affects effect setup.


  const filteredSolutions = solutions.filter(solution => 
    (solution.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     solution.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterTag || solution.tags.includes(filterTag)) &&
    (!activeArea || solution.status === activeArea)
  );
  
  const blueprintSolutions = filteredSolutions.filter(s => s.status === 'blueprint');
  const workbenchSolutions = filteredSolutions.filter(s => s.status === 'workbench');
  const showcaseSolutions = filteredSolutions.filter(s => s.status === 'showcase');

  const getRelatedSolutions = (solutionId: string) => {
    const currentSolution = solutions.find(s => s.id === solutionId);
    if (!currentSolution || !currentSolution.relatedSolutions) return [];
    return solutions.filter(s => currentSolution.relatedSolutions!.includes(s.id));
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'workshop' ? 'list' : 'workshop');
  };

  const isMobile = useMediaQuery('(max-width: 768px)');
  const allTags = Array.from(new Set(solutions.flatMap(s => s.tags)));

  // Effect to reset mouse position when switching to desktop view if ref is available
  useEffect(() => {
    if (!isMobile && workshopRef.current) {
      mouseX.set(workshopRef.current.offsetWidth / 2);
      mouseY.set(workshopRef.current.offsetHeight / 2);
    }
  }, [isMobile, mouseX, mouseY, workshopRef]);

  if (isMobile) {
    return (
      <SolutionWorkshopMobileView 
        solutions={filteredSolutions}
        blueprintSolutions={blueprintSolutions}
        workbenchSolutions={workbenchSolutions}
        showcaseSolutions={showcaseSolutions}
        onSelectSolution={setActiveSolution} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        filterTag={filterTag} 
        setFilterTag={setFilterTag} 
        allTags={allTags}
      />
    );
  }

  // REFINED BOARD LAYOUT FOR PORTFOLIO/WORKBENCH/BLUEPRINT
  return (
    <div ref={workshopRef} className="relative flex flex-col h-[calc(100vh-120px)] max-h-[700px] bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-sm select-none overflow-hidden">
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{ background: gradientBackground }}
      />
      
      {/* Board Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/90 z-10 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Portfolio Journey</h2>
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-50 via-blue-50 to-emerald-50 rounded-full border border-slate-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="text-xs text-slate-600 font-medium px-1">Ideas</span>
            <span className="text-xs text-slate-400">→</span>
            <span className="text-xs text-slate-600 font-medium px-1">Focus</span>
            <span className="text-xs text-slate-400">→</span>
            <span className="text-xs text-slate-600 font-medium px-1">Portfolio</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 py-2 w-56 text-sm bg-white border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          {filterTag && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm"
            >
              <span className="text-xs text-blue-700 font-medium">Tag:</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{filterTag}</span>
              <button
                onClick={() => setFilterTag(null)}
                className="ml-1 text-blue-500 hover:text-blue-700 transition-colors"
                title="Clear filter"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
          
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => {}}
              className="px-3 py-2 text-sm rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-200 flex items-center gap-2"
              title="Filter by tags"
            >
              <Filter size={14} className="text-slate-500" />
              <span className="hidden md:inline text-slate-600 font-medium">Filter</span>
            </button>
            {/* Tag filter dropdown would go here */}
          </motion.div>
          
          {onAddSolution && (
            <motion.button
              onClick={onAddSolution}
              className="ml-2 px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold">+</span> New Item
            </motion.button>
          )}
        </div>
      </div>

      {/* Current Focus - Shows the active work in progress */}
      {workbenchSolutions.length > 0 && (
        <div className="mx-6 mt-4 mb-2">
          <div className="mb-3">
            <div className="flex items-center">
              <div className="w-1.5 h-6 rounded-full bg-blue-500 mr-2.5"></div>
              <h3 className="text-slate-700 font-semibold text-sm">Current Focus</h3>
              <div className="relative ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-md font-medium">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                In Progress
              </div>
            </div>
          </div>
          
          {/* Display only the first workbench solution */}
          {workbenchSolutions.slice(0, 1).map(solution => (
            <motion.div 
              key={solution.id}
              className="flex items-center bg-white border-l-4 border-l-blue-500 border border-blue-100 rounded-lg p-3 shadow-md hover:shadow-lg hover:bg-blue-50 transition-all cursor-pointer group"
              onClick={() => setActiveSolution(solution)}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mr-4">
                <Clock size={18} className="text-blue-600" />
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-800 text-base truncate">{solution.title}</h3>
                  <div className="px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded-md font-medium">{solution.progress}%</div>
                </div>
                
                <p className="text-xs text-slate-500 mb-2 line-clamp-1">
                  {solution.previewDescription || solution.description.substring(0, 100)}
                </p>
                
                {/* Tags */}
                {solution.tags && solution.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-1">
                    {solution.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-blue-50 text-blue-600 border border-blue-200">{tag}</span>
                    ))}
                    {solution.tags.length > 2 && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-50 text-blue-600 border border-blue-200">+{solution.tags.length - 2}</span>
                    )}
                  </div>
                )}
                
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
                  <motion.div 
                    className="bg-blue-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${solution.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-1.5 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {onUpdateSolution && (
                  <motion.button
                    className="p-1.5 rounded-full hover:bg-blue-100 text-blue-600"
                    onClick={e => { e.stopPropagation(); setEditingSolution(solution); }}
                    title="Edit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                      <path d="m15 5 4 4"></path>
                    </svg>
                  </motion.button>
                )}
                {onDeleteSolution && (
                  <motion.button
                    className="p-1.5 rounded-full hover:bg-red-100 text-red-600"
                    onClick={e => { e.stopPropagation(); onDeleteSolution(solution.id); }}
                    title="Delete"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Show empty state if no current focus */}
          {workbenchSolutions.length === 0 && (
            <motion.div 
              className="flex flex-col items-center justify-center bg-white/80 border border-dashed border-blue-200 rounded-lg p-5 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 mb-2 rounded-full bg-blue-50 flex items-center justify-center">
                <Clock size={20} className="text-blue-400" />
              </div>
              <h3 className="text-slate-700 font-medium mb-1">No Current Focus</h3>
              <p className="text-xs text-slate-500 max-w-xs">Move an item from your ideas backlog to start working on it</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Board Columns - Showcase (Portfolio) is visually emphasized */}
      <div className="flex-1 w-full overflow-x-auto overflow-y-hidden">
        <div className="flex flex-row gap-6 px-6 py-4 min-h-[400px] h-full" style={{ minWidth: 900 }}>
          {/* Ideas & Backlog Column - minimal cards */}
          <div className="flex flex-col w-64 min-w-[240px] max-w-[280px] bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-white/20 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </span>
                <span className="font-semibold text-white text-base">Ideas & Backlog</span>
                <span className="text-xs bg-amber-300/30 text-white px-1.5 py-0.5 rounded-full">
                  {blueprintSolutions.length}
                </span>
              </div>
              <div className="text-xs text-amber-100 ml-7 -mt-0.5">Future concepts to explore</div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
              {blueprintSolutions.length === 0 ? (
                <div className="text-center p-5 text-slate-400 bg-amber-50/30 rounded-lg border border-dashed border-amber-200 mx-2">
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300 mb-2">
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                      <path d="M12 7c1-.56 2.78-2 5-2 .97 0 1.94.29 2.75.83"></path>
                    </svg>
                    <p className="text-sm">Capture your ideas here</p>
                  </div>
                </div>
              ) : (
                blueprintSolutions.map(s => (
                  <IdeaCard
                    key={s.id}
                    solution={s}
                    onClick={() => setActiveSolution(s)}
                    onEdit={onUpdateSolution ? () => setEditingSolution(s) : undefined}
                    onDelete={onDeleteSolution ? () => onDeleteSolution(s.id) : undefined}
                    editable={!!onUpdateSolution || !!onDeleteSolution}
                  />
                ))
              )}
            </div>
            
            {onAddSolution && (
              <motion.button
                onClick={onAddSolution}
                className="mx-3 mb-3 mt-1 px-3 py-2 w-auto bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm border border-amber-200 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14"></path>
                  <path d="M5 12h14"></path>
                </svg>
                Add new idea
              </motion.button>
            )}
          {/* Portfolio Showcase - visually emphasized and expanded with 3-column grid */}
          </div> {/* <-- Close Ideas & Backlog column */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col w-full min-w-0 max-w-none bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-white/20 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                      <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                      <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </span>
                  <span className="font-semibold text-white text-base">Portfolio Showcase</span>
                  <span className="text-xs bg-emerald-300/30 text-white px-1.5 py-0.5 rounded-full">
                    {showcaseSolutions.length}
                  </span>
                </div>
                <div className="text-xs text-emerald-100 ml-7 -mt-0.5">Completed Projects & Achievements</div>
              </div>
              
              {/* Grid layout for portfolio items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {showcaseSolutions.length === 0 ? (
                    <div className="col-span-full text-center p-8 text-slate-500 bg-emerald-50/30 rounded-lg border border-dashed border-emerald-200">
                      <motion.div 
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="w-16 h-16 mb-3 rounded-full bg-emerald-50 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300">
                            <path d="M8.4 10.6a6 6 0 1 1 0 2.8"></path>
                            <path d="M2 18a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"></path>
                            <path d="M12 22a10 10 0 0 0 10-10c0-1.1-1.1-2-2-2a2 2 0 0 0-2 2"></path>
                          </svg>
                        </div>
                        <h3 className="text-slate-700 font-medium text-lg mb-2">Build Your Portfolio</h3>
                        <p className="text-sm max-w-md mb-4">Showcase your completed work and achievements here</p>
                        {onAddSolution && (
                          <motion.button
                            onClick={onAddSolution}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg font-medium shadow-sm flex items-center gap-2 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 5v14"></path>
                              <path d="M5 12h14"></path>
                            </svg>
                            Add First Portfolio Item
                          </motion.button>
                        )}
                      </motion.div>
                    </div>
                  ) : (
                    showcaseSolutions.map((solution, index) => (
                      <PortfolioCard
                        key={solution.id}
                        solution={solution}
                        onClick={() => setActiveSolution(solution)}
                        onEdit={onUpdateSolution ? () => setEditingSolution(solution) : undefined}
                        onDelete={onDeleteSolution ? () => onDeleteSolution(solution.id) : undefined}
                        editable={!!onUpdateSolution || !!onDeleteSolution}
                        index={index}
                      />
                    ))
                  )}
                </div>
              </div>
              
              {onAddSolution && showcaseSolutions.length > 0 && (
                <motion.button
                  onClick={onAddSolution}
                  className="mx-3 mb-3 mt-1 px-3 py-2 w-auto bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm border border-emerald-200 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                  Add portfolio item
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingSolution && (
          <EditSolutionModal 
            solution={editingSolution}
            onSave={updated => {
              onUpdateSolution && onUpdateSolution(updated);
              setEditingSolution(null);
            }}
            onCancel={() => setEditingSolution(null)}
          />
        )}
      </AnimatePresence>

      {/* Modal - ensure it's above everything */}
      <AnimatePresence>
        {activeSolution && (
          <SolutionDetail 
            solution={activeSolution} 
            relatedSolutions={getRelatedSolutions(activeSolution.id)}
            onClose={() => setActiveSolution(null)} 
            onSelectRelated={setActiveSolution}
            onEdit={onUpdateSolution ? () => { setEditingSolution(activeSolution); setActiveSolution(null); } : undefined}
            onDelete={onDeleteSolution ? () => { onDeleteSolution(activeSolution.id); setActiveSolution(null); } : undefined}
            editable={!!onUpdateSolution || !!onDeleteSolution}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// BoardColumn with cardType and widthClass for custom layouts

// BoardColumn with cardType and widthClass for custom layouts
interface BoardColumnProps {
  title: string;
  subtitle?: string;
  color: 'amber' | 'blueprint' | 'emerald';
  count: number;
  solutions: Solution[];
  onCardClick: (solution: Solution) => void;
  onEdit?: (solution: Solution) => void;
  onDelete?: (id: string) => void;
  editable?: boolean;
  onAddSolution?: () => void;
  cardType?: 'minimal' | 'medium' | 'portfolio';
  widthClass?: string;
  maxCards?: number;
}

function BoardColumn({
  title,
  subtitle,
  color,
  count,
  solutions,
  onCardClick,
  onEdit,
  onDelete,
  editable,
  onAddSolution,
  cardType = 'medium',
  widthClass = '',
  maxCards
}: BoardColumnProps) {
  // Color classes for column accent
  const colorMap = {
    amber: 'bg-amber-400',
    blueprint: 'bg-blue-500',
    emerald: 'bg-emerald-400',
  };
  const borderColorMap = {
    amber: 'border-amber-300',
    blueprint: 'border-blue-300',
    emerald: 'border-emerald-300',
  };
  // Limit cards if maxCards is set
  const visibleSolutions = typeof maxCards === 'number' ? solutions.slice(0, maxCards) : solutions;
  return (
    <div className={`flex flex-col ${widthClass || 'w-80 min-w-[320px] max-w-[340px]'} bg-white rounded-xl shadow-md border-t-4 ${colorMap[color]} ${borderColorMap[color]} border p-0`}>
      <div className="flex flex-col gap-0.5 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${colorMap[color]}`}></span>
          <span className="font-semibold text-gray-800 text-base">{title}</span>
          <span className="text-xs text-gray-400">({count})</span>
        </div>
        {subtitle && <span className="text-xs text-gray-400 ml-5 -mt-1">{subtitle}</span>}
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        {visibleSolutions.map(s => (
          <TrelloCard
            key={s.id}
            solution={s}
            onClick={() => onCardClick(s)}
            onEdit={onEdit ? () => onEdit(s) : undefined}
            onDelete={onDelete ? () => onDelete(s.id) : undefined}
            editable={editable}
            cardType={cardType}
          />
        ))}
        {/* If maxCards is set and there are more, show a subtle fade or warning */}
        {typeof maxCards === 'number' && solutions.length > maxCards && (
          <div className="text-xs text-gray-400 text-center mt-2">Only showing the first {maxCards} items</div>
        )}
      </div>
      {onAddSolution && (
        <button
          onClick={onAddSolution}
          className="mx-3 mb-3 mt-1 px-3 py-2 w-auto bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm border border-amber-200"
        >
          + Add new idea
        </button>
      )}
    </div>
  );
}

// TrelloCard with cardType for Blueprint/Workbench/Showcase
function TrelloCard({ solution, onClick, onEdit, onDelete, editable, cardType = 'medium' }: {
  solution: Solution;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
  cardType?: 'minimal' | 'medium' | 'portfolio';
}) {
  // Card hover color
  // Minimal: Blueprint (title, tags)
  // Medium: Workbench (title, desc, progress, tags)
  // Portfolio: Showcase (title, desc, thumbnail, tags, date, link)
  if (cardType === 'minimal') {
    return (
      <motion.div
        whileHover={{ y: -1, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-white rounded-md shadow-sm group border border-gray-200 hover:border-amber-400 transition-all duration-150 cursor-pointer px-3 py-2 flex flex-col gap-1 min-h-[48px]"
        onClick={onClick}
      >
        {editable && (
          <div className="absolute top-1 right-1 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                className="p-0.5 rounded hover:bg-blue-100 text-xs text-blue-600 bg-white border border-blue-200"
                onClick={e => { e.stopPropagation(); onEdit(); }}
                title="Edit"
              >✎</button>
            )}
            {onDelete && (
              <button
                className="p-0.5 rounded hover:bg-red-100 text-xs text-red-600 bg-white border border-red-200"
                onClick={e => { e.stopPropagation(); onDelete(); }}
                title="Delete"
              >🗑</button>
            )}
          </div>
        )}
        <div className="flex items-center gap-1 mb-1">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="font-semibold text-gray-800 text-sm truncate">{solution.title}</div>
        </div>
        <div className="text-[10px] text-gray-500 line-clamp-1 ml-3">
          {solution.previewDescription || solution.description.substring(0, 60) + (solution.description.length > 60 ? '...' : '')}
        </div>
        {solution.tags && solution.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {solution.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-amber-50 text-amber-700 border border-amber-200">{tag}</span>
            ))}
            {solution.tags.length > 2 && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-50 text-amber-700 border border-amber-200">+{solution.tags.length - 2}</span>
            )}
          </div>
        )}
      </motion.div>
    );
  }
  if (cardType === 'portfolio') {
    return (
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-white rounded-xl shadow-lg group border border-emerald-200 hover:border-emerald-400 transition-all duration-150 cursor-pointer p-4 flex flex-col gap-2 h-full overflow-hidden"
        onClick={onClick}
      >
        {editable && (
          <div className="absolute top-2 right-2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                className="p-1 rounded hover:bg-blue-100 text-xs text-blue-600 bg-white border border-blue-200"
                onClick={e => { e.stopPropagation(); onEdit(); }}
                title="Edit"
              >✎</button>
            )}
            {onDelete && (
              <button
                className="p-1 rounded hover:bg-red-100 text-xs text-red-600 bg-white border border-red-200"
                onClick={e => { e.stopPropagation(); onDelete(); }}
                title="Delete"
              >🗑</button>
            )}
          </div>
        )}
        
        {/* Completed Status Badge */}
        <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
          <span>Completed</span>
        </div>
        
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          {/* Default visual if no thumbnail */}
          {!solution.thumbnailUrl && (
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <div className="text-white text-opacity-90 text-3xl font-bold">{solution.title.substring(0, 2).toUpperCase()}</div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            </div>
          )}
          
          {/* Thumbnail image if available */}
          {solution.thumbnailUrl && (
            <img 
              src={solution.thumbnailUrl} 
              alt={solution.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-slate-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors duration-200">{solution.title}</h3>
          
          <div className="text-sm text-slate-600 mb-3 line-clamp-3 flex-grow">
            {solution.previewDescription || solution.description.substring(0, 160) + (solution.description.length > 160 ? '...' : '')}
          </div>
          
          {solution.date && (
            <div className="flex items-center text-xs text-slate-500 mb-2">
              <Clock size={12} className="mr-1" />
              {solution.date}
            </div>
          )}
          
          {solution.tags && solution.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {solution.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{tag}</span>
              ))}
              {solution.tags.length > 3 && (
                <span className="px-2 py-0.5 text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">+{solution.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Bottom action bar */}
        <div className="px-4 py-3 border-t border-emerald-100 bg-emerald-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
              </svg>
              <span>View showcase</span>
            </div>
            
            {solution.link && (
              <a
                href={solution.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={12} />
                Open
              </a>
            )}
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
      </motion.div>
    );
  }
  // Default/medium: Workbench
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-lg shadow group border border-blue-200 hover:border-blue-400 transition-all duration-150 cursor-pointer px-4 py-3 flex flex-col gap-1 min-h-[72px]"
      onClick={onClick}
    >
      {editable && (
        <div className="absolute top-2 right-2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              className="p-1 rounded hover:bg-blue-100 text-xs text-blue-600 bg-white border border-blue-200"
              onClick={e => { e.stopPropagation(); onEdit(); }}
              title="Edit"
            >✎</button>
          )}
          {onDelete && (
            <button
              className="p-1 rounded hover:bg-red-100 text-xs text-red-600 bg-white border border-red-200"
              onClick={e => { e.stopPropagation(); onDelete(); }}
              title="Delete"
            >🗑</button>
          )}
        </div>
      )}
      <div className="font-semibold text-gray-800 text-base mb-0.5 truncate">{solution.title}</div>
      <div className="text-xs text-gray-500 mb-1 line-clamp-2">{solution.previewDescription || solution.description.substring(0, 100) + (solution.description.length > 100 ? '...' : '')}</div>
      {solution.status === 'workbench' && (
        <div className="mb-1">
          <div className="flex justify-between text-[11px] text-gray-400 mb-0.5">
            <span>Progress</span>
            <span>{solution.progress}%</span>
          </div>
          <div className="w-full bg-blue-100 h-1 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full transition-all duration-500" style={{ width: `${solution.progress}%` }}></div>
          </div>
        </div>
      )}
      {solution.tags && solution.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {solution.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[11px] rounded-full bg-blue-50 text-blue-700 border border-blue-200">{tag}</span>
          ))}
          {solution.tags.length > 2 && (
            <span className="px-2 py-0.5 text-[11px] rounded-full bg-blue-50 text-blue-700 border border-blue-200">+{solution.tags.length - 2} more</span>
          )}
        </div>
      )}
    </motion.div>
  );
}

// Enhanced SolutionCard component with animations and better visuals
function SolutionCard({ 
  solution, 
  onClick,
  onEdit,
  onDelete,
  editable
}: { 
  solution: Solution, 
  onClick: () => void,
  onEdit?: () => void,
  onDelete?: () => void,
  editable?: boolean
}) {
  const statusColorMap = {
    blueprint: 'amber',
    workbench: 'blueprint',
    showcase: 'emerald'
  };
  const statusColor = statusColorMap[solution.status];
  
  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-3 mb-3 bg-gray-800/50 hover:bg-gray-800/80 rounded-md border border-gray-700 hover:border-${statusColor}-500/50 cursor-pointer shadow-sm hover:shadow transition-all duration-200 overflow-hidden group relative`}
      onClick={onClick}
    >
      {/* Edit/Delete buttons */}
      {editable && (
        <div className="absolute top-2 right-2 flex gap-1 z-20">
          {onEdit && (
            <button
              className="p-1 rounded hover:bg-blue-600/80 text-xs text-blue-200 bg-gray-800/80"
              onClick={e => { e.stopPropagation(); onEdit(); }}
              title="Edit"
            >
              ✎
            </button>
          )}
          {onDelete && (
            <button
              className="p-1 rounded hover:bg-red-600/80 text-xs text-red-200 bg-gray-800/80"
              onClick={e => { e.stopPropagation(); onDelete(); }}
              title="Delete"
            >
              🗑
            </button>
          )}
        </div>
      )}
      {/* Title and Status Indicator */}
      <div className="flex items-start justify-between mb-1">
        <h4 className="font-semibold text-white group-hover:text-white transition-colors duration-200">{solution.title}</h4>
        <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-${statusColor}-500 mt-1.5`}></div>
      </div>
      {/* Description or Preview Description */}
      <p className="text-xs text-gray-400 mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors duration-200">
        {solution.previewDescription || solution.description.substring(0, 100) + (solution.description.length > 100 ? '...' : '')}
      </p>
      {/* Thumbnail if available */}
      {solution.thumbnailUrl && (
        <div className="mb-2 h-24 overflow-hidden rounded bg-gray-900 relative">
          <img src={solution.thumbnailUrl} alt={solution.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      )}
      {/* Progress for workbench items */}
      {solution.status === 'workbench' && (
        <div className="mb-2">
          <div className="flex justify-between text-[11px] text-gray-500 mb-0.5">
            <span>Progress</span>
            <span>{solution.progress}%</span>
          </div>
          <div className="w-full bg-gray-700/70 h-1 rounded-full overflow-hidden">
            <div className={`bg-${statusColor}-500 h-full transition-all duration-500`} style={{ width: `${solution.progress}%` }}></div>
          </div>
        </div>
      )}
      {/* Tags */}
      {solution.tags && solution.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {solution.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700/80 text-gray-400">{tag}</span>
          ))}
          {solution.tags.length > 2 && (
             <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700/80 text-gray-400">+{solution.tags.length - 2} more</span>
          )}
        </div>
      )}
      {/* Call to Action */}
      <div className={`mt-2 text-xs text-${statusColor}-400 font-medium flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
        View details <ChevronRight size={14} className="ml-1" />
      </div>
    </motion.div>
  );
}

// Enhanced ListView with edit/delete support
function ListView({ 
  solutions, 
  onSelectSolution,
  onEdit,
  onDelete,
  editable
}: { 
  solutions: Solution[],
  onSelectSolution: (solution: Solution) => void,
  onEdit?: (solution: Solution) => void,
  onDelete?: (id: string) => void,
  editable?: boolean
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {solutions.map(s => (
        <SolutionCard 
          key={s.id} 
          solution={s} 
          onClick={() => onSelectSolution(s)}
          onEdit={onEdit ? () => onEdit(s) : undefined}
          onDelete={onDelete ? () => onDelete(s.id) : undefined}
          editable={editable}
        />
      ))}
    </div>
  );
}

// Enhanced SolutionDetail Modal with edit/delete support
function SolutionDetail({
  solution,
  relatedSolutions,
  onClose,
  onSelectRelated,
  onEdit,
  onDelete,
  editable
}: {
  solution: Solution;
  relatedSolutions: Solution[];
  onClose: () => void;
  onSelectRelated: (solution: Solution) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
}) {
  // Determine which component to render based on detailComponentId
  const DetailComponent = solution.detailComponentId && 
    PortfolioItemComponents[solution.detailComponentId] ? 
    PortfolioItemComponents[solution.detailComponentId] : 
    PortfolioItemComponents.GenericDetailView;

  // Get status-based styling
  const getStatusColor = (status: Solution['status']) => {
    const colorMap: Record<string, string> = {
      blueprint: 'amber',
      workbench: 'blueprint',
      showcase: 'emerald'
    };
    return colorMap[status];
  };
  
  const statusColor = getStatusColor(solution.status);
  const statusLabel = solution.status.charAt(0).toUpperCase() + solution.status.slice(1);
  const statusIcon = solution.status === 'blueprint' ? <PenTool size={16} /> : 
                     solution.status === 'workbench' ? <Wrench size={16} /> : 
                     <CheckCircle size={16} />;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-start">
          <div className="flex gap-2">
            {editable && onEdit && (
              <button
                onClick={onEdit}
                className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                Edit
              </button>
            )}
            {editable && onDelete && (
              <button
                onClick={onDelete}
                className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-md text-white"
              >
                Delete
              </button>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-300 bg-gray-800/50 hover:bg-gray-800 rounded-full"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-5">
          <Suspense fallback={<LoadingSpinner />}>
            <DetailComponent solution={solution} />
          </Suspense>
        </div>
        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300"
          >
            Close
          </button>
          {solution.link && (
            <a href={solution.link} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-sm bg-blue-700 hover:bg-blue-800 rounded-md text-white ml-2">View Link</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Edit Solution Modal (basic form)
function EditSolutionModal({
  solution,
  onSave,
  onCancel
}: {
  solution: Solution;
  onSave: (updated: Solution) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Solution>({ ...solution });
  // List of available detail components
  const detailComponentOptions = [
    { value: '', label: 'Generic (Default)' },
    { value: 'GenericDetailView', label: 'GenericDetailView' },
    { value: 'CustomerInsightsShowcase', label: 'CustomerInsightsShowcase' },
    { value: 'LegacySystemsShowcase', label: 'LegacySystemsShowcase' },
    { value: 'PortfolioSystemShowcase', label: 'PortfolioSystemShowcase' },
    // Add more as you create new detail components
  ];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.form 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-gray-900 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col p-6 gap-3"
        onClick={e => e.stopPropagation()}
        onSubmit={e => { e.preventDefault(); onSave(form); }}
      >
        <h2 className="text-lg font-semibold mb-2">Edit Solution</h2>
        <label className="text-xs font-semibold">Title
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Description
          <textarea className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Impact
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.impact} onChange={e => setForm(f => ({ ...f, impact: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Status
          <select className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Solution['status'] }))}>
            <option value="blueprint">Blueprint</option>
            <option value="workbench">Workbench</option>
            <option value="showcase">Showcase</option>
          </select>
        </label>
        <label className="text-xs font-semibold">Progress
          <input type="number" min={0} max={100} className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.progress} onChange={e => setForm(f => ({ ...f, progress: Number(e.target.value) }))} />
        </label>
        <label className="text-xs font-semibold">Tags (comma separated)
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.tags.join(', ')} onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} />
        </label>
        <label className="text-xs font-semibold">Thumbnail URL
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.thumbnailUrl || ''} onChange={e => setForm(f => ({ ...f, thumbnailUrl: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Preview Description
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.previewDescription || ''} onChange={e => setForm(f => ({ ...f, previewDescription: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Detail View Layout
          <select
            className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
            value={form.detailComponentId || ''}
            onChange={e => setForm(f => ({ ...f, detailComponentId: e.target.value || undefined }))}
          >
            {detailComponentOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 justify-end mt-2">
          <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200">Cancel</button>
          <button type="submit" className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white">Save</button>
        </div>
      </motion.form>
    </motion.div>
  );
}

// IdeaCard component for the Ideas & Backlog section
function IdeaCard({ solution, onClick, onEdit, onDelete, editable }: {
  solution: Solution;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-lg shadow-sm group border border-amber-100 hover:border-amber-300 transition-all duration-150 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="px-3 py-2.5 flex flex-col gap-1 min-h-[60px]">
        {editable && (
          <div className="absolute top-1 right-1 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <motion.button
                className="p-1 rounded-full hover:bg-amber-100 text-amber-600 bg-white/80 backdrop-blur-sm"
                onClick={e => { e.stopPropagation(); onEdit(); }}
                title="Edit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                  <path d="m15 5 4 4"></path>
                </svg>
              </motion.button>
            )}
            {onDelete && (
              <motion.button
                className="p-1 rounded-full hover:bg-red-100 text-red-600 bg-white/80 backdrop-blur-sm"
                onClick={e => { e.stopPropagation(); onDelete(); }}
                title="Delete"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </motion.button>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
            <div className="font-medium text-slate-800 text-sm line-clamp-1">{solution.title}</div>
          </div>
          <div className="bg-amber-50 rounded-full w-5 h-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
              <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
              <path d="M12 7c1-.56 2.78-2 5-2 .97 0 1.94.29 2.75.83"></path>
            </svg>
          </div>
        </div>
        
        <div className="text-xs text-slate-500 line-clamp-2 mb-1.5">
          {solution.previewDescription || solution.description.substring(0, 100) + (solution.description.length > 100 ? '...' : '')}
        </div>
        
        {solution.tags && solution.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {solution.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-amber-50 text-amber-700 border border-amber-100">{tag}</span>
            ))}
            {solution.tags.length > 2 && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-50 text-amber-700 border border-amber-100">+{solution.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-amber-200 to-amber-400 opacity-70"></div>
    </motion.div>
  );
}

// PortfolioCard component for the Portfolio Showcase section with rich visual presentation
function PortfolioCard({ solution, onClick, onEdit, onDelete, editable, index = 0 }: {
  solution: Solution;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
  index?: number;
}) {
  // Staggered animation delay based on index
  const staggerDelay = index * 0.05;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: staggerDelay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-xl shadow-md group border border-emerald-100 hover:border-emerald-300 transition-all duration-200 cursor-pointer overflow-hidden h-full flex flex-col"
      onClick={onClick}
    >
      {editable && (
        <div className="absolute top-2 right-2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <motion.button
              className="p-1.5 rounded-full hover:bg-emerald-100 text-emerald-600 bg-white/90 backdrop-blur-sm shadow-sm"
              onClick={e => { e.stopPropagation(); onEdit(); }}
              title="Edit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            </motion.button>
          )}
          {onDelete && (
            <motion.button
              className="p-1.5 rounded-full hover:bg-red-100 text-red-600 bg-white/90 backdrop-blur-sm shadow-sm"
              onClick={e => { e.stopPropagation(); onDelete(); }}
              title="Delete"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </motion.button>
          )}
        </div>
      )}
      
      {/* Completed Status Badge */}
      <div className="absolute top-3 left-3 z-10 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
        <span>Completed</span>
      </div>
      
      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        {/* Default visual if no thumbnail */}
        {!solution.thumbnailUrl && (
          <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <div className="text-white text-opacity-90 text-3xl font-bold">{solution.title.substring(0, 2).toUpperCase()}</div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>
        )}
        
        {/* Thumbnail image if available */}
        {solution.thumbnailUrl && (
          <img 
            src={solution.thumbnailUrl} 
            alt={solution.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors duration-200">{solution.title}</h3>
        
        <div className="text-sm text-slate-600 mb-3 line-clamp-3 flex-grow">
          {solution.previewDescription || solution.description.substring(0, 160) + (solution.description.length > 160 ? '...' : '')}
        </div>
        
        {solution.date && (
          <div className="flex items-center text-xs text-slate-500 mb-2">
            <Clock size={12} className="mr-1" />
            {solution.date}
          </div>
        )}
        
        {solution.tags && solution.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {solution.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{tag}</span>
            ))}
            {solution.tags.length > 3 && (
              <span className="px-2 py-0.5 text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">+{solution.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
      
      {/* Bottom action bar */}
      <div className="px-4 py-3 border-t border-emerald-100 bg-emerald-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-emerald-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            </svg>
            <span>View showcase</span>
          </div>
          
          {solution.link && (
            <a
              href={solution.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={12} />
              Open
            </a>
          )}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
    </motion.div>
  );
}
