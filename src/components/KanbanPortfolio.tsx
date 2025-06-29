import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useMotionValue, AnimatePresence, useMotionTemplate, useSpring } from 'framer-motion';
import { PenTool, Wrench, CheckCircle, Search, Filter, X, Clock, LayoutGrid, ListTodo, ExternalLink } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import type { Solution } from '@/types/solution';

// Lazily load the portfolio item components
const PortfolioItemComponents: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
  'LegacySystemsShowcase': React.lazy(() => import('@/components/portfolio-items/LegacySystemsShowcase')),
  'CustomerInsightsShowcase': React.lazy(() => import('@/components/portfolio-items/CustomerInsightsShowcase')),
  'PortfolioSystemShowcase': React.lazy(() => import('@/components/portfolio-items/PortfolioSystemShowcase')),
  'GenericDetailView': React.lazy(() => import('@/components/portfolio-items/GenericDetailView')),
};

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blueprint"></div>
    </div>
  );
}

const statusConfigGlobal = { // Renamed to avoid conflicts and indicate global scope for this file
  blueprint: { icon: <PenTool size={16} />, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30', progressColor: 'bg-blue-500' },
  workbench: { icon: <Wrench size={16} />, color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30', progressColor: 'bg-amber-500' },
  showcase: { icon: <CheckCircle size={16} />, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30', progressColor: 'bg-emerald-500' },
  draft: { icon: <PenTool size={16} />, color: 'text-gray-400', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/30', progressColor: 'bg-gray-500' },
  published: { icon: <CheckCircle size={16} />, color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30', progressColor: 'bg-green-500' },
  archived: { icon: <Clock size={16} />, color: 'text-slate-400', bgColor: 'bg-slate-500/10', borderColor: 'border-slate-500/30', progressColor: 'bg-slate-500' },
};

interface SolutionWorkshopProps {
  solutions?: Solution[]; // Make the prop optional
  onAddSolution?: () => void;
  onUpdateSolution?: (solution: Solution) => void;
  onDeleteSolution?: (id: string) => void;
}

export function SolutionWorkshop({ 
  solutions = [], // Provide an empty array as default value
  onAddSolution,
  onUpdateSolution,
  onDeleteSolution 
}: SolutionWorkshopProps) {
  const [solutionsData, setSolutionsData] = useState<Solution[]>(solutions);
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null); // For modal editing
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
    const localHandleMouseLeave = () => { // Renamed to avoid conflict if any outer scope variable exists
      if (currentWorkshopRef) {
        mouseX.set(currentWorkshopRef.offsetWidth / 2);
        mouseY.set(currentWorkshopRef.offsetHeight / 2);
      }
    };
    if (currentWorkshopRef) {
      currentWorkshopRef.addEventListener('mousemove', handleMouseMove);
      currentWorkshopRef.addEventListener('mouseleave', localHandleMouseLeave);
      mouseX.set(currentWorkshopRef.offsetWidth / 2);
      mouseY.set(currentWorkshopRef.offsetHeight / 2);
    }
    return () => {
      if (currentWorkshopRef) {
        currentWorkshopRef.removeEventListener('mousemove', handleMouseMove);
        currentWorkshopRef.removeEventListener('mouseleave', localHandleMouseLeave);
      }
    };
  }, [mouseX, mouseY, workshopRef]);

  // Update solutionsData when initialSolutions prop changes
  useEffect(() => {
    setSolutionsData(solutions);
  }, [solutions]);

  const handleEditSolution = (solution: Solution) => {
    setEditingSolution(solution);
    setActiveSolution(solution); // Open the modal with the solution to edit
  };

  const handleSaveEdit = (updatedSolution: Solution) => {
    onUpdateSolution(updatedSolution);
    setEditingSolution(null);
    setActiveSolution(null); // Close modal after save
  };

  const handleDeleteSolutionCard = (solutionId: string) => {
    onDeleteSolution(solutionId);
    if (activeSolution && activeSolution.id === solutionId) {
      setActiveSolution(null); // Close modal if the active solution is deleted
    }
    if (editingSolution && editingSolution.id === solutionId) {
      setEditingSolution(null); // Close edit mode if the editing solution is deleted
    }
  };


  // Update filtering logic to use solutionsData
  const filteredSolutions = solutionsData.filter(solution => 
    (solution.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (solution.description && solution.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
     (solution.previewDescription && solution.previewDescription.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (!filterTag || solution.tags.includes(filterTag)) &&
    (!activeArea || solution.status === activeArea)
  );
  
  const blueprintSolutions = filteredSolutions.filter(s => s.status === 'blueprint');
  const workbenchSolutions = filteredSolutions.filter(s => s.status === 'workbench');
  const showcaseSolutions = filteredSolutions.filter(s => s.status === 'showcase');

  const getRelatedSolutions = (solutionId: string) => {
    const currentSolution = solutionsData.find(s => s.id === solutionId);
    if (!currentSolution || !currentSolution.relatedSolutions) return [];
    return solutionsData.filter(s => currentSolution.relatedSolutions!.includes(s.id));
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'workshop' ? 'list' : 'workshop');
  };

  const isMobile = useMediaQuery('(max-width: 768px)');
  // Update allTags to use solutionsData
  const allTags = Array.from(new Set(solutionsData.flatMap(s => s.tags)));

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

  // DESKTOP VIEW JSX 
  return (
    <div ref={workshopRef} className="p-1 bg-gray-950 relative overflow-hidden font-mono text-sm text-gray-300 h-[calc(100vh-200px)] max-h-[700px] flex flex-col select-none">
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: gradientBackground, // Use the unconditionally defined MotionValue
        }}
      />
      {/* Header - ensure it's above the gradient */}
      <div className="relative z-10 flex items-center justify-between p-3 border-b border-gray-700/50 mb-2 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-2 py-1.5 text-xs bg-gray-800/70 border border-gray-700 rounded-md focus:ring-1 focus:ring-blueprint focus:border-blueprint w-48"
            />
          </div>
          <FilterButton 
            label="All" 
            count={solutionsData.length} 
            onClick={() => { setActiveArea(null); setFilterTag(null); }} 
            ariaLabel="Show all solutions"
            selected={!activeArea && !filterTag}
          />
          <FilterButton 
            label="Blueprint" 
            count={solutionsData.filter(s=>s.status === 'blueprint').length} 
            onClick={() => { setActiveArea('blueprint'); setFilterTag(null); }} 
            color="amber"
            icon={<PenTool size={12}/>}
            ariaLabel="Show blueprint solutions"
            selected={activeArea === 'blueprint'}
          />
          <FilterButton 
            label="Workbench" 
            count={solutionsData.filter(s=>s.status === 'workbench').length} 
            onClick={() => { setActiveArea('workbench'); setFilterTag(null); }} 
            color="blueprint"
            icon={<Wrench size={12}/>}
            ariaLabel="Show workbench solutions"
            selected={activeArea === 'workbench'}
          />
          <FilterButton 
            label="Showcase" 
            count={solutionsData.filter(s=>s.status === 'showcase').length} 
            onClick={() => { setActiveArea('showcase'); setFilterTag(null); }} 
            color="emerald"
            icon={<CheckCircle size={12}/>}
            ariaLabel="Show showcase solutions"
            selected={activeArea === 'showcase'}
          />
        </div>
        <div className="flex items-center gap-2"> {/* Container for view mode and add button */}
          <button
            onClick={onAddSolution}
            className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-1.5"
            aria-label="Add new solution"
          >
            <LayoutGrid size={14}/> {/* Using LayoutGrid as a placeholder, consider a Plus icon */}
            Add Solution
          </button>
          <button 
            onClick={toggleViewMode}
            className="px-3 py-1.5 text-xs bg-gray-700/50 hover:bg-gray-700/80 rounded-md flex items-center gap-1.5"
          >
            {viewMode === 'workshop' ? <ListTodo size={14}/> : <LayoutGrid size={14}/>} 
            {viewMode === 'workshop' ? 'List View' : 'Workshop View'}
          </button>
        </div>
      </div>

      {/* Main Content Area - ensure it's above the gradient */}
      <AnimatePresence mode="wait">
        {viewMode === 'workshop' ? (
          <motion.div 
            key="workshop"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="relative z-10 flex-grow flex flex-col gap-3 overflow-hidden p-2"
          >
            {/* Top section: Blueprint and Workbench side by side */}
            <div className="grid grid-cols-2 gap-3 h-[45%]">
              {/* Blueprint Column */}
              <div className="bg-gray-800/30 p-2 rounded-lg overflow-y-auto h-full border border-gray-700/50 backdrop-blur-xs">
                <h3 className="text-amber-400 font-semibold mb-2 text-center">Blueprint ({blueprintSolutions.length})</h3>
                {blueprintSolutions.map(s => <SolutionCard key={s.id} solution={s} onClick={() => setActiveSolution(s)} onEdit={() => handleEditSolution(s)} onDelete={() => handleDeleteSolutionCard(s.id)} />)}
              </div>
              {/* Workbench Column */}
              <div className="bg-gray-800/30 p-2 rounded-lg overflow-y-auto h-full border border-gray-700/50 backdrop-blur-xs">
                <h3 className="text-blueprint font-semibold mb-2 text-center">Workbench ({workbenchSolutions.length})</h3>
                {workbenchSolutions.map(s => <SolutionCard key={s.id} solution={s} onClick={() => setActiveSolution(s)} onEdit={() => handleEditSolution(s)} onDelete={() => handleDeleteSolutionCard(s.id)} />)}
              </div>
            </div>
            
            {/* Bottom section: Showcase as a full-width section */}
            <div className="bg-gray-800/30 p-2 rounded-lg overflow-y-auto h-[55%] border border-gray-700/50 backdrop-blur-xs">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-emerald-400 font-semibold text-center">Showcase - Portfolio History ({showcaseSolutions.length})</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {showcaseSolutions.map(s => <SolutionCard key={s.id} solution={s} onClick={() => setActiveSolution(s)} onEdit={() => handleEditSolution(s)} onDelete={() => handleDeleteSolutionCard(s.id)} />)}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="relative z-10 flex-grow overflow-y-auto p-2 bg-gray-900/30 backdrop-blur-xs rounded-lg border border-gray-700/50"
          >
            <ListView solutions={filteredSolutions} onSelectSolution={setActiveSolution} onEditSolution={handleEditSolution} onDeleteSolution={handleDeleteSolutionCard} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal - ensure it's above everything */}
      <AnimatePresence>
        {activeSolution && (
          <SolutionDetail 
            solution={editingSolution || activeSolution} // If editing, show editingSolution, else activeSolution
            isEditing={!!editingSolution} // Pass isEditing flag
            relatedSolutions={getRelatedSolutions(activeSolution.id)}
            onClose={() => { setActiveSolution(null); setEditingSolution(null); }} 
            onSave={handleSaveEdit} // Pass save handler
            onSelectRelated={setActiveSolution}
            onDelete={handleDeleteSolutionCard} // Pass delete handler to modal as well
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced SolutionCard component with animations and better visuals
function SolutionCard({ 
  solution, 
  onClick,
  onEdit,
  onDelete
}: { 
  solution: Solution, 
  onClick: () => void,
  onEdit: () => void,
  onDelete: () => void
}) {
  const statusColorMap: Record<string, string> = {
    blueprint: 'amber',
    workbench: 'blueprint',
    showcase: 'emerald',
    draft: 'gray', 
    published: 'green',
    archived: 'slate',
  };
  const statusColor = statusColorMap[solution.status] || 'gray'; // Default to gray
  
  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      // onClick={onClick} // We'll use the main area for onClick, buttons for edit/delete
      className={`p-3 mb-3 bg-gray-800/50 hover:bg-gray-800/80 rounded-md border border-gray-700 hover:border-${statusColor}-500/50 cursor-pointer shadow-sm hover:shadow transition-all duration-200 overflow-hidden group relative`}
    >
      <div onClick={onClick} className="cursor-pointer"> {/* Main clickable area */}
        {/* Title and Status Indicator */}
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-semibold text-white group-hover:text-white transition-colors duration-200">{solution.title}</h4>
          <div className={`flex-shrink-0 w-2 h-2 rounded-full bg-${statusColor}-500 mt-1.5`}></div>
        </div>
        
        {/* Description or Preview Description */}
        <p className="text-xs text-gray-400 mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors duration-200">
          {solution.previewDescription || (solution.description ? solution.description.substring(0, 100) + (solution.description.length > 100 ? '...' : '') : 'No description')}
        </p>
        
        {/* Thumbnail if available */}
        {solution.thumbnailUrl && (
          <div className="mb-2 h-24 overflow-hidden rounded bg-gray-900 relative">
            <img src={solution.thumbnailUrl} alt={solution.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        )}
      </div>
      
      {/* Action buttons - absolutely positioned or flex at bottom */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(); }} 
          className="p-1 bg-gray-700/70 hover:bg-blue-500/70 rounded text-gray-300 hover:text-white"
          aria-label="Edit solution"
        >
          <PenTool size={12} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }} 
          className="p-1 bg-gray-700/70 hover:bg-red-500/70 rounded text-gray-300 hover:text-white"
          aria-label="Delete solution"
        >
          <X size={12} /> {/* Consider Trash2 icon */}
        </button>
      </div>

      {(solution.status === 'workbench' || typeof solution.progress === 'number') && solution.progress !== undefined && ( // Ensure progress is defined
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
      
      {solution.tags && solution.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {solution.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700/80 text-gray-400">{tag}</span>
          ))}
          {solution.tags.length > 2 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-600 text-gray-300">+{solution.tags.length - 2}</span>
          )}
        </div>
      )}

      {solution.link && (
        <a 
          href={solution.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={(e) => e.stopPropagation()} // Prevent card click when link is clicked
          className="text-xs text-blueprint hover:underline flex items-center gap-1 group-hover:text-blueprint-300 transition-colors duration-200"
        >
          View Details <ExternalLink size={10} />
        </a>
      )}
    </motion.div>
  );
}

// Enhanced ListView with better visuals
function ListView({ 
  solutions, 
  onSelectSolution,
  onEditSolution,
  onDeleteSolution
}: { 
  solutions: Solution[],
  onSelectSolution: (solution: Solution) => void,
  onEditSolution: (solution: Solution) => void, // Added for consistency
  onDeleteSolution: (solutionId: string) => void // Added for consistency
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {solutions.map(s => 
        <SolutionCard 
          key={s.id} 
          solution={s} 
          onClick={() => onSelectSolution(s)} 
          onEdit={() => onEditSolution(s)} 
          onDelete={() => onDeleteSolution(s.id)}
        />
      )}
    </div>
  );
}

// Enhanced SolutionDetail Modal with dynamic component loading
function SolutionDetail({
  solution: initialSolution, // Renamed to avoid conflict with internal state
  isEditing,
  relatedSolutions,
  onClose,
  onSave, // Added for saving edits
  onSelectRelated,
  onDelete // Added for deleting from modal
}: {
  solution: Solution;
  isEditing?: boolean;
  relatedSolutions: Solution[];
  onClose: () => void;
  onSave?: (solution: Solution) => void; // Optional save handler
  onSelectRelated: (solution: Solution) => void;
  onDelete?: (solutionId: string) => void; // Optional delete handler
}) {
  const [editableSolution, setEditableSolution] = useState<Solution>(initialSolution);

  useEffect(() => {
    setEditableSolution(initialSolution); // Sync with prop changes, e.g., when opening for a new solution
  }, [initialSolution]);

  const DetailComponent = editableSolution.detailComponentId && 
    PortfolioItemComponents[editableSolution.detailComponentId] ? 
    PortfolioItemComponents[editableSolution.detailComponentId] : 
    PortfolioItemComponents.GenericDetailView;

  const getStatusColor = (status: Solution['status']) => {
    const colorName = statusConfigGlobal[status]?.color.replace('text-', '').replace('-400', ''); // Extract base color name
    return colorName || 'gray'; // default color if not found
  };
  
  const statusColor = statusConfigGlobal[editableSolution.status]?.color || 'text-gray-400';
  const StatusIcon = statusConfigGlobal[editableSolution.status]?.icon || <PenTool size={16} />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditableSolution(prev => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value, 10) : value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableSolution(prev => ({
      ...prev,
      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    }));
  };

  const handleSaveChanges = () => {
    if (onSave) {
      onSave(editableSolution);
    }
  };

  const handleDeleteConfirm = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this solution?')) {
      onDelete(editableSolution.id);
      onClose(); // Close modal after delete
    }
  };

  if (!editableSolution) return null; // Should not happen if modal is open

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
          <div>
            {isEditing ? (
              <input 
                type="text"
                name="title"
                value={editableSolution.title}
                onChange={handleInputChange}
                className="text-xl font-semibold text-white bg-transparent border-b border-gray-700 focus:border-blue-500 outline-none mb-1 w-full"
              />
            ) : (
              <h3 className="text-xl font-semibold text-white mb-1">{editableSolution.title}</h3>
            )}
            <div className="flex items-center gap-2">
              {isEditing ? (
                <select 
                  name="status"
                  value={editableSolution.status}
                  onChange={handleInputChange}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {Object.keys(statusConfigGlobal).map(statusKey => (
                    <option key={statusKey} value={statusKey}>
                      {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <span className={`text-xs px-2 py-0.5 rounded-full bg-${statusColor.replace('text-', '').replace('-400', '')}-500/20 ${statusColor} flex items-center gap-1`}>
                  {StatusIcon} {editableSolution.status.charAt(0).toUpperCase() + editableSolution.status.slice(1)}
                </span>
              )}
              {isEditing ? (
                <input 
                  type="date"
                  name="date"
                  value={editableSolution.date}
                  onChange={handleInputChange}
                  className="text-xs text-gray-300 bg-gray-700 rounded px-1 py-0.5 border border-transparent focus:border-blue-500 outline-none"
                />
              ) : editableSolution.date && (
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" /> {editableSolution.date}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-300 bg-gray-800/50 hover:bg-gray-800 rounded-full"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-5">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea 
                  id="description" 
                  name="description"
                  rows={4}
                  value={editableSolution.description}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="previewDescription" className="block text-sm font-medium text-gray-400 mb-1">Preview Description (for card)</label>
                <textarea 
                  id="previewDescription" 
                  name="previewDescription"
                  rows={2}
                  value={editableSolution.previewDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="impact" className="block text-sm font-medium text-gray-400 mb-1">Impact</label>
                <textarea 
                  id="impact" 
                  name="impact"
                  rows={3}
                  value={editableSolution.impact}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="progress" className="block text-sm font-medium text-gray-400 mb-1">Progress (0-100)</label>
                <input 
                  type="number"
                  id="progress"
                  name="progress"
                  min="0"
                  max="100"
                  value={editableSolution.progress}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-400 mb-1">Tags (comma-separated)</label>
                <input 
                  type="text"
                  id="tags"
                  name="tags"
                  value={editableSolution.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-400 mb-1">Thumbnail URL</label>
                <input 
                  type="url"
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={editableSolution.thumbnailUrl}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-400 mb-1">Case Study/Details Link</label>
                <input 
                  type="url"
                  id="link"
                  name="link"
                  value={editableSolution.link}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
               <div>
                <label htmlFor="detailComponentId" className="block text-sm font-medium text-gray-400 mb-1">Detail Component ID (Optional)</label>
                <select 
                  id="detailComponentId" 
                  name="detailComponentId"
                  value={editableSolution.detailComponentId || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="">GenericDetailView (Default)</option>
                  {Object.keys(PortfolioItemComponents).map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <Suspense fallback={<LoadingSpinner />}>
              <DetailComponent solution={editableSolution} />
            </Suspense>
          )}
          
          {/* Related Items - only show in non-editing mode for now */}
          {!isEditing && relatedSolutions.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <h4 className="text-md font-semibold mb-3 text-gray-300">Related Solutions:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedSolutions.map(rs => (
                  <div 
                    key={rs.id}
                    onClick={() => onSelectRelated(rs)}
                    className={`p-3 rounded-md border border-gray-700 bg-gray-800/30 hover:bg-gray-800/80 cursor-pointer hover:border-${getStatusColor(rs.status)}-500/50 transition-colors`}
                  >
                    <div className="flex items-start">
                      <div className={`mr-2 mt-1 w-2 h-2 rounded-full bg-${getStatusColor(rs.status)}-500 flex-shrink-0`}></div>
                      <div>
                        <h5 className="font-medium text-sm text-gray-200">{rs.title}</h5>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{rs.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer with actions */}
        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <div> {/* Left aligned buttons */} 
            {isEditing && onDelete && (
                <button 
                  onClick={handleDeleteConfirm}
                  className="px-3 py-1.5 text-sm bg-red-700 hover:bg-red-800 rounded-md text-gray-200 mr-2"
                >
                  Delete Solution
                </button>
            )}
          </div>
          <div> {/* Right aligned buttons */} 
            <button 
              onClick={onClose}
              className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 mr-2"
            >
              {isEditing ? 'Cancel' : 'Close'}
            </button>
            
            {isEditing && onSave && (
              <button 
                onClick={handleSaveChanges}
                className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >
                Save Changes
              </button>
            )}

            {!isEditing && editableSolution.link && (
              <a 
                href={editableSolution.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 text-sm bg-${statusColor.replace('text-', '').replace('-400', '')}-500/20 hover:bg-${statusColor.replace('text-', '').replace('-400', '')}-500/30 ${statusColor} hover:${statusColor.replace('400', '300')} rounded-md flex items-center`}
              >
                View Case Study <ExternalLink size={14} className="ml-1.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Filter button component 
function FilterButton({
  label,
  count,
  color = "default",
  icon,
  onClick,
  ariaLabel,
  selected
}: {
  label: string;
  count: number;
  active?: boolean; // Kept for type consistency if used elsewhere, though not directly in this logic
  color?: "default" | "amber" | "blueprint" | "emerald";
  icon?: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  selected?: boolean;
}) {
  const baseClasses = "px-2.5 py-1.5 text-xs rounded-md flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2";
  let colorClasses = "bg-gray-700/50 hover:bg-gray-700/80 focus:ring-gray-500";
  if (selected) {
    if (color === 'amber') colorClasses = "bg-amber-500/80 text-white focus:ring-amber-400 hover:bg-amber-500";
    else if (color === 'blueprint') colorClasses = "bg-blueprint/80 text-white focus:ring-blueprint hover:bg-blueprint";
    else if (color === 'emerald') colorClasses = "bg-emerald-500/80 text-white focus:ring-emerald-400 hover:bg-emerald-500";
    else colorClasses = "bg-gray-600 text-white focus:ring-gray-400 hover:bg-gray-500"; // Default selected
  }
  return (
    <button onClick={onClick} className={cn(baseClasses, colorClasses)} aria-label={ariaLabel}>
      {icon}{label} ({count})
    </button>
  );
}

export const SolutionBlueprint = SolutionWorkshop;

// Mobile View Components

interface SolutionWorkshopMobileViewProps {
  solutions: Solution[];
  blueprintSolutions: Solution[];
  workbenchSolutions: Solution[];
  showcaseSolutions: Solution[];
  onSelectSolution: (solution: Solution) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterTag: string | null;
  setFilterTag: (tag: string | null) => void;
  allTags: string[];
}

function SolutionWorkshopMobileView({
  blueprintSolutions,
  workbenchSolutions,
  showcaseSolutions,
  onSelectSolution,
  searchQuery,
  setSearchQuery,
  filterTag,
  setFilterTag,
  allTags
}: SolutionWorkshopMobileViewProps) {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'workbench'>('workbench');
  const [showSearch, setShowSearch] = useState(false);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);

  const tabs = [
    { id: 'blueprint', label: 'Blueprint', count: blueprintSolutions.length, color: 'amber', icon: <PenTool size={16}/> },
    { id: 'workbench', label: 'Workbench', count: workbenchSolutions.length, color: 'blueprint', icon: <Wrench size={16}/> },
  ] as const;

  let currentSolutionsToDisplay: Solution[] = [];
  if (activeTab === 'blueprint') currentSolutionsToDisplay = blueprintSolutions;
  else if (activeTab === 'workbench') currentSolutionsToDisplay = workbenchSolutions;

  // Filter active tab solutions
  if (filterTag) {
    currentSolutionsToDisplay = currentSolutionsToDisplay.filter(s => s.tags.includes(filterTag));
  }
  if (searchQuery) {
    currentSolutionsToDisplay = currentSolutionsToDisplay.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter showcase solutions
  let filteredShowcaseSolutions = showcaseSolutions;
  if (filterTag) {
    filteredShowcaseSolutions = filteredShowcaseSolutions.filter(s => s.tags.includes(filterTag));
  }
  if (searchQuery) {
    filteredShowcaseSolutions = filteredShowcaseSolutions.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="p-2 bg-gray-900 text-gray-100 flex flex-col h-full font-mono text-sm">
      {/* Header with Search/Filter Toggles */}
      <div className="flex justify-between items-center p-2 mb-2">
        <h2 className="text-lg font-semibold">Solution Workshop</h2>
        <div className="flex gap-2">
          <button onClick={() => setShowSearch(!showSearch)} className="p-1.5 rounded-md hover:bg-gray-700">
            {showSearch ? <X size={18} /> : <Search size={18} />}
          </button>
          <button onClick={() => setShowTagFilter(!showTagFilter)} className="p-1.5 rounded-md hover:bg-gray-700">
            {showTagFilter ? <X size={18} /> : <Filter size={18} />}
          </button>
        </div>
      </div>

      {/* Search Input */}
      <AnimatePresence>
        {showSearch && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="mb-2 px-1"
          >
            <input 
              type="text"
              placeholder="Search all solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 text-xs rounded-md bg-gray-800 border border-gray-700 focus:ring-1 focus:ring-blueprint focus:border-blueprint"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tag Filter Dropdown */}
      <AnimatePresence>
        {showTagFilter && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 p-2 bg-gray-800 rounded-md mx-1"
          >
            <h3 className="text-xs font-semibold mb-1.5 text-gray-400">Filter by Tag:</h3>
            <div className="flex flex-wrap gap-1.5">
              <button 
                onClick={() => setFilterTag(null)} 
                className={cn(
                  'px-2 py-1 text-xs rounded-full',
                  !filterTag ? 'bg-blueprint text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                )}
              >
                All Tags
              </button>
              {allTags.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => setFilterTag(tag)} 
                  className={cn(
                    'px-2 py-1 text-xs rounded-full',
                    filterTag === tag ? 'bg-blueprint text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Work Tabs - Blueprint and Workbench */}
      <div className="flex border-b border-gray-700 mb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-1 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors 
              ${activeTab === tab.id 
                ? `border-b-2 ${tab.id === 'blueprint' ? 'border-amber-500 text-amber-400' : 'border-blueprint text-blueprint'}` 
                : 'text-gray-500 hover:text-gray-300 border-b-2 border-transparent'
              }`}
          >
            {tab.icon} 
            {tab.label} ({
              tab.id === 'blueprint' 
                ? blueprintSolutions.filter(s => !filterTag || s.tags.includes(filterTag))
                    .filter(s => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 s.description.toLowerCase().includes(searchQuery.toLowerCase())).length
                : workbenchSolutions.filter(s => !filterTag || s.tags.includes(filterTag))
                    .filter(s => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 s.description.toLowerCase().includes(searchQuery.toLowerCase())).length
            })
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="flex-grow overflow-y-auto space-y-2 p-1 mb-3">
        <AnimatePresence>
          {currentSolutionsToDisplay.length > 0 ? (
            currentSolutionsToDisplay.map(solution => (
              <MobileSolutionCard key={solution.id} solution={solution} onClick={() => onSelectSolution(solution)} />
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center text-gray-500 py-6 text-xs"
            >
              No solutions match your criteria.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Showcase Section - Collapsible */}
      <div className="border-t border-gray-700 pt-2">
        <button 
          onClick={() => setShowShowcase(!showShowcase)}
          className="w-full flex items-center justify-between py-2 px-1 text-emerald-400"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle size={16}/>
            <span className="font-semibold text-sm">Showcase - Portfolio History ({filteredShowcaseSolutions.length})</span>
          </div>
          <span className="text-gray-400">
            {showShowcase ? '↑' : '↓'}
          </span>
        </button>
        
        <AnimatePresence>
          {showShowcase && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden space-y-2 p-1"
            >
              {filteredShowcaseSolutions.length > 0 ? (
                filteredShowcaseSolutions.map(solution => (
                  <MobileSolutionCard key={solution.id} solution={solution} onClick={() => onSelectSolution(solution)} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-3 text-xs">
                  No showcase solutions match your criteria.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Enhanced Mobile Solution Card
function MobileSolutionCard({ solution, onClick }: { solution: Solution; onClick: () => void }) {
  const config = statusConfigGlobal[solution.status]; // Use the global config

  const getTextColorClass = (colorName: string) => {
    const colorMap: Record<string, string> = {
      amber: 'text-amber-400',
      blueprint: 'text-blueprint',
      emerald: 'text-emerald-400',
    };
    return colorMap[colorName] || 'text-gray-300';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={cn(
        'w-full p-2.5 rounded-lg border',
        config.borderColor, 
        config.bgColor, 
        `hover:border-${config.color}-500/60 hover:shadow-sm`,
        'cursor-pointer'
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex-shrink-0 pt-0.5">{config.icon}</div>
        <div className="flex-grow min-w-0">
          <h3 className={cn('font-semibold text-xs mb-0.5 truncate', getTextColorClass(config.color))}>{solution.title}</h3>
          <p className="text-xs text-gray-400 line-clamp-2 mb-1.5">
            {solution.previewDescription || solution.description}
          </p>
          
          {/* Thumbnail image if available */}
          {solution.thumbnailUrl && (
            <div className="mb-1.5 h-16 overflow-hidden rounded bg-gray-900 relative">
              <img src={solution.thumbnailUrl} alt={solution.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          {solution.status === 'workbench' && solution.progress > 0 && (
            <div className="mb-1.5">
              <div className="flex justify-between text-[11px] text-gray-500 mb-0.5">
                <span>Progress</span>
                <span>{solution.progress}%</span>
              </div>
              <div className="w-full bg-gray-700/70 h-1 rounded-full overflow-hidden">
                <div className={cn(config.progressColor, 'h-full')} style={{ width: `${solution.progress}%` }}></div>
              </div>
            </div>
          )}
          {solution.status === 'showcase' && solution.date && (
            <p className="text-[11px] text-gray-500 mb-1.5 flex items-center"><Clock size={11} className="inline mr-1"/>{solution.date}</p>
          )}

          {solution.tags && solution.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {solution.tags.slice(0, 2).map(tag => (
                <span key={tag} className={`px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700/80 text-gray-400`}>{tag}</span>
              ))}
              {solution.tags.length > 2 && (
                 <span className={`px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700/80 text-gray-400`}>+{solution.tags.length - 2} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
