// import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useMotionValue, AnimatePresence, useMotionTemplate, useSpring } from 'framer-motion';
import { X } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import type { Solution } from './KanbanPortfolio/types';

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

import LoadingSpinner from './KanbanPortfolio/LoadingSpinner';
// Removed unused imports: TrelloCard, SolutionCard, IdeaCard, PortfolioCard, BoardColumn
import EditSolutionModal from './KanbanPortfolio/EditSolutionModal';
import KanbanBoard from './KanbanPortfolio/KanbanBoard';

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
  const [searchQuery] = useState('');
  const [filterTag] = useState<string | null>(null);
  const [activeArea] = useState<'blueprint' | 'workbench' | 'showcase' | null>(null);
  // Removed viewMode and setViewMode (List view is deprecated)
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

  // Removed unused getRelatedSolutions function

  // Removed toggleViewMode (List view is deprecated)

  const isMobile = useMediaQuery('(max-width: 768px)');
  // const allTags = Array.from(new Set(solutions.flatMap(s => s.tags)));

  // Effect to reset mouse position when switching to desktop view if ref is available
  useEffect(() => {
    if (!isMobile && workshopRef.current) {
      mouseX.set(workshopRef.current.offsetWidth / 2);
      mouseY.set(workshopRef.current.offsetHeight / 2);
    }
  }, [isMobile, mouseX, mouseY, workshopRef]);

  if (isMobile) {
    // Optionally, you may want to show a message or fallback for mobile if list view is not supported
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Board view is not available on mobile yet.
      </div>
    );
  }

  // REFINED BOARD LAYOUT FOR PORTFOLIO/WORKBENCH/BLUEPRINT
  // Board header and current focus remain here, board columns are extracted
  return (
    <>
      <div ref={workshopRef} className="relative flex flex-col min-h-0 h-auto max-h-none bg-white font-sans text-sm select-none overflow-visible">
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-30"
          style={{ background: gradientBackground }}
        />
        {/* Board Header, Current Focus, and Board Columns */}
        <KanbanBoard
          blueprintSolutions={blueprintSolutions}
          workbenchSolutions={workbenchSolutions}
          showcaseSolutions={showcaseSolutions}
          onAddSolution={onAddSolution}
          onUpdateSolution={onUpdateSolution}
          onDeleteSolution={onDeleteSolution}
          setActiveSolution={setActiveSolution}
          setEditingSolution={setEditingSolution}
        />
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
            onClose={() => setActiveSolution(null)} 
            onEdit={onUpdateSolution ? () => { setEditingSolution(activeSolution); setActiveSolution(null); } : undefined}
            onDelete={onDeleteSolution ? () => { onDeleteSolution(activeSolution.id); setActiveSolution(null); } : undefined}
            editable={!!onUpdateSolution || !!onDeleteSolution}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ...existing code...

// Enhanced SolutionDetail Modal with edit/delete support
function SolutionDetail({
  solution,
  onClose,
  onEdit,
  onDelete,
  editable
}: {
  solution: Solution;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
}) {
  // Determine which component to render based on detailComponentId
  const DetailComponent = solution.detailComponentId && 
    PortfolioItemComponents[solution.detailComponentId] ? 
    PortfolioItemComponents[solution.detailComponentId] : 
    PortfolioItemComponents.GenericDetailView;

  // (statusColor, statusLabel, statusIcon) are unused, so removed for cleanup.

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

