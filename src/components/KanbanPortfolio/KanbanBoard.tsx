import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, Box } from 'lucide-react';
import IdeaCard from './IdeaCard';
import PortfolioCard from './PortfolioCard';
import type { Solution } from './types';

interface KanbanBoardProps {
  blueprintSolutions: Solution[];
  workbenchSolutions: Solution[];
  showcaseSolutions: Solution[];
  onAddSolution?: () => void;
  onUpdateSolution?: (solution: Solution) => void;
  onDeleteSolution?: (id: string) => void;
  setActiveSolution: (solution: Solution) => void;
  setEditingSolution: (solution: Solution) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  blueprintSolutions,
  workbenchSolutions,
  showcaseSolutions,
  onAddSolution,
  onUpdateSolution,
  onDeleteSolution,
  setActiveSolution,
  setEditingSolution,
}) => {
  // The board layout and logic is extracted from the main file
  // Remove previous progress bar logic. We'll add a dedicated 'In Progress' row/column for 'workbench' items.

  return (
    <div className="flex-1 w-full overflow-x-auto overflow-y-hidden">
      {/* Current Initiative Progress Tracker */}
      {workbenchSolutions.length > 0 && (
        <div className="px-6 pt-4 pb-2" style={{ minWidth: 900 }}>
          <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-white/20 rounded">
                  <Clock size={14} className="text-white" />
                </span>
                <span className="font-semibold text-white text-base">Current Initiative</span>
                <span className="text-xs bg-blue-300/30 text-white px-1.5 py-0.5 rounded-full">
                  {workbenchSolutions.length}
                </span>
              </div>
              <div className="text-xs text-blue-100 ml-7 -mt-0.5">In-progress strategic work</div>
            </div>
            <div className="flex-1 px-3 py-3">
              <motion.div
                className="bg-white rounded-lg shadow-sm p-3 border border-blue-100 hover:border-blue-300 transition-all duration-200"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-slate-800 text-base">{workbenchSolutions[0].title}</h3>
                  <div className="flex items-center gap-1">
                    {onUpdateSolution && (
                      <button
                        onClick={() => setEditingSolution(workbenchSolutions[0])}
                        className="p-1 rounded text-blue-500 hover:bg-blue-50"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => setActiveSolution(workbenchSolutions[0])}
                      className="p-1 rounded text-blue-500 hover:bg-blue-50"
                      title="View details"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {workbenchSolutions[0].previewDescription || workbenchSolutions[0].description.substring(0, 100) + (workbenchSolutions[0].description.length > 100 ? '...' : '')}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-slate-500 font-medium">Progress</div>
                  <div className="text-xs text-slate-700">{workbenchSolutions[0].progress || 35}%</div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-blue-500" style={{ width: `${workbenchSolutions[0].progress || 35}%` }}></div>
                </div>
                {workbenchSolutions[0].tags && workbenchSolutions[0].tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {workbenchSolutions[0].tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-blue-50 text-blue-700 border border-blue-100">{tag}</span>
                    ))}
                    {workbenchSolutions[0].tags.length > 2 && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-50 text-blue-700 border border-blue-100">+{workbenchSolutions[0].tags.length - 2}</span>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Board Columns */}
      <div className="flex flex-row gap-6 px-6 py-4 min-h-[400px] h-full" style={{ minWidth: 900 }}>
        {/* Ideas & Backlog Column */}
        <div className="flex flex-col w-1/3 min-w-[300px] max-w-[350px] bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-white/20 rounded">
                <AlertCircle size={14} className="text-white" />
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
        </div>
        
        {/* Portfolio Showcase Column */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col w-full min-w-0 max-w-none bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 border-b border-emerald-200">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-white/20 rounded">
                  <Box size={14} className="text-white" />
                </span>
                <span className="font-semibold text-white text-base">Portfolio Showcase</span>
                <span className="text-xs bg-emerald-300/30 text-white px-1.5 py-0.5 rounded-full">
                  {showcaseSolutions.length}
                </span>
              </div>
              <div className="text-xs text-emerald-100 ml-7 -mt-0.5">Completed Projects & Achievements</div>
            </div>
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
  );
};

export default KanbanBoard;
