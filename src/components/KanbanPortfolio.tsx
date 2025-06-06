import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, useMotionValue, AnimatePresence, useMotionTemplate, useSpring } from 'framer-motion';
import { PenTool, Wrench, CheckCircle, Search, Filter, X, Clock, LayoutGrid, ListTodo, ExternalLink, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { cn } from '@/lib/utils';

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

export function SolutionWorkshop() {
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
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

  const solutions: Solution[] = [
    {
      id: 'blueprint-1',
      title: 'Legacy System Dependencies',
      description: 'Organizations stuck with 15+ year old infrastructure that slows innovation',
      impact: 'Will enable faster deployments and reduce maintenance costs by 60%',
      status: 'blueprint',
      progress: 0,
      tags: ['Legacy Systems', 'Architecture'],
      relatedSolutions: ['workbench-2', 'showcase-1'],
      detailComponentId: 'LegacySystemsShowcase',
      thumbnailUrl: '/images/legacy-systems-thumb.jpg',
      previewDescription: 'A systematic approach to modernizing outdated but critical infrastructure while minimizing business disruption'
    },
    {
      id: 'blueprint-2',
      title: 'Customer Behavior Blind Spots',
      description: 'Companies missing key insights into customer decision-making patterns',
      impact: 'Will surface hidden opportunities and reduce customer acquisition costs',
      status: 'blueprint',
      progress: 0,
      tags: ['Analytics', 'Customer Experience'],
      detailComponentId: 'CustomerInsightsShowcase',
      thumbnailUrl: '/images/customer-insights-thumb.jpg',
      previewDescription: 'Uncovering hidden patterns in customer behavior to drive more effective marketing and product decisions'
    },
    {
      id: 'workbench-1',
      title: 'Portfolio Communication Clarity',
      description: 'Showcasing problem-solving approach in a memorable, effective way',
      impact: 'This very site—creating a system to demonstrate how I think',
      status: 'workbench',
      progress: 75,
      tags: ['Personal Brand', 'UX Design'],
      link: '#',
      relatedSolutions: ['showcase-2'],
      detailComponentId: 'PortfolioSystemShowcase',
      thumbnailUrl: '/images/portfolio-system-thumb.jpg',
      previewDescription: 'Meta-project: This very portfolio system that showcases my approach to problem-solving through interactive design'
    },
    {
      id: 'workbench-2',
      title: 'Cross-Department Data Silos',
      description: 'Isolated systems preventing consolidated business intelligence',
      impact: 'Reducing manual entry by 70% across 5 departments',
      status: 'workbench',
      progress: 40,
      tags: ['Data Integration', 'Business Intelligence'],
      relatedSolutions: ['blueprint-1', 'showcase-1'],
      previewDescription: 'Breaking down organizational data barriers to enable unified business intelligence and decision-making'
    },
    {
      id: 'showcase-1',
      title: 'E-commerce System Fragmentation',
      description: 'Multiple disconnected tools causing order delays and inventory errors',
      impact: 'Reduced operational overhead by 40% and eliminated order delays',
      status: 'showcase',
      progress: 100,
      date: 'Q4 2023',
      tags: ['E-commerce', 'Systems Integration'],
      link: '/case-studies/ecommerce',
      relatedSolutions: ['workbench-2', 'blueprint-1'],
      previewDescription: 'An end-to-end e-commerce solution that eliminated inventory discrepancies and streamlined the order process'
    },
    {
      id: 'showcase-2',
      title: 'Manual Fulfillment Bottlenecks',
      description: 'Order processing delays impacting customer satisfaction',
      impact: 'Cut processing time from 3 days to 4 hours',
      status: 'showcase',
      progress: 100,
      date: 'Q2 2023',
      tags: ['Operations', 'Workflow Automation'],
      link: '/case-studies/fulfillment',
      relatedSolutions: ['workbench-1'],
      previewDescription: 'A workflow automation solution that dramatically reduced order fulfillment times and improved customer satisfaction'
    }
  ];

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
            count={solutions.length} 
            onClick={() => { setActiveArea(null); setFilterTag(null); }} 
            ariaLabel="Show all solutions"
            selected={!activeArea && !filterTag}
          />
          <FilterButton 
            label="Blueprint" 
            count={solutions.filter(s=>s.status === 'blueprint').length} 
            onClick={() => { setActiveArea('blueprint'); setFilterTag(null); }} 
            color="amber"
            icon={<PenTool size={12}/>}
            ariaLabel="Show blueprint solutions"
            selected={activeArea === 'blueprint'}
          />
          <FilterButton 
            label="Workbench" 
            count={solutions.filter(s=>s.status === 'workbench').length} 
            onClick={() => { setActiveArea('workbench'); setFilterTag(null); }} 
            color="blueprint"
            icon={<Wrench size={12}/>}
            ariaLabel="Show workbench solutions"
            selected={activeArea === 'workbench'}
          />
          <FilterButton 
            label="Showcase" 
            count={solutions.filter(s=>s.status === 'showcase').length} 
            onClick={() => { setActiveArea('showcase'); setFilterTag(null); }} 
            color="emerald"
            icon={<CheckCircle size={12}/>}
            ariaLabel="Show showcase solutions"
            selected={activeArea === 'showcase'}
          />
        </div>
        <button 
          onClick={toggleViewMode}
          className="px-3 py-1.5 text-xs bg-gray-700/50 hover:bg-gray-700/80 rounded-md flex items-center gap-1.5"
        >
          {viewMode === 'workshop' ? <ListTodo size={14}/> : <LayoutGrid size={14}/>} 
          {viewMode === 'workshop' ? 'List View' : 'Workshop View'}
        </button>
      </div>

      {/* Main Content Area - ensure it's above the gradient */}
      <AnimatePresence mode="wait">
        {viewMode === 'workshop' ? (
          <motion.div 
            key="workshop"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="relative z-10 flex-grow grid grid-cols-3 gap-3 overflow-hidden p-2"
          >
            <div className="bg-gray-800/30 p-2 rounded-lg overflow-y-auto h-full border border-gray-700/50 backdrop-blur-xs">
              <h3 className="text-amber-400 font-semibold mb-2 text-center">Blueprint ({blueprintSolutions.length})</h3>
              {blueprintSolutions.map(s => <SolutionCard key={s.id} solution={s} onClick={() => setActiveSolution(s)} />)}
            </div>
            <div className="bg-gray-800/30 p-2 rounded-lg overflow-y-auto h-full border border-gray-700/50 backdrop-blur-xs">
              <h3 className="text-blueprint font-semibold mb-2 text-center">Workbench ({workbenchSolutions.length})</h3>
              {workbenchSolutions.map(s => <SolutionCard key={s.id} solution={s} onClick={() => setActiveSolution(s)} />)}
            </div>
            <div className="bg-gray-800/30 p-2 rounded-lg overflow-y-auto h-full border border-gray-700/50 backdrop-blur-xs">
              <h3 className="text-emerald-400 font-semibold mb-2 text-center">Showcase ({showcaseSolutions.length})</h3>
              {showcaseSolutions.map(s => <SolutionCard key={s.id} solution={s} onClick={() => setActiveSolution(s)} />)}
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
            <ListView solutions={filteredSolutions} onSelectSolution={setActiveSolution} />
          </motion.div>
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced SolutionCard component with animations and better visuals
function SolutionCard({ 
  solution, 
  onClick 
}: { 
  solution: Solution, 
  onClick: () => void 
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
      onClick={onClick} 
      className={`p-3 mb-3 bg-gray-800/50 hover:bg-gray-800/80 rounded-md border border-gray-700 hover:border-${statusColor}-500/50 cursor-pointer shadow-sm hover:shadow transition-all duration-200 overflow-hidden group`}
    >
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

// Enhanced ListView with better visuals
function ListView({ 
  solutions, 
  onSelectSolution 
}: { 
  solutions: Solution[],
  onSelectSolution: (solution: Solution) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {solutions.map(s => <SolutionCard key={s.id} solution={s} onClick={() => onSelectSolution(s)} />)}
    </div>
  );
}

// Enhanced SolutionDetail Modal with dynamic component loading
function SolutionDetail({
  solution,
  relatedSolutions,
  onClose,
  onSelectRelated
}: {
  solution: Solution;
  relatedSolutions: Solution[];
  onClose: () => void;
  onSelectRelated: (solution: Solution) => void;
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
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{solution.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full bg-${statusColor}-500/20 text-${statusColor}-400 flex items-center gap-1`}>
                {statusIcon} {statusLabel}
              </span>
              {solution.date && (
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" /> {solution.date}
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
          <Suspense fallback={<LoadingSpinner />}>
            <DetailComponent solution={solution} />
          </Suspense>
          
          {/* Related Items */}
          {relatedSolutions.length > 0 && (
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
          <button 
            onClick={onClose}
            className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300"
          >
            Close
          </button>
          
          {solution.link && (
            <a 
              href={solution.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 text-sm bg-${statusColor}-500/20 hover:bg-${statusColor}-500/30 text-${statusColor}-400 hover:text-${statusColor}-300 rounded-md flex items-center`}
            >
              View Case Study <ExternalLink size={14} className="ml-1.5" />
            </a>
          )}
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
  const [activeTab, setActiveTab] = useState<'blueprint' | 'workbench' | 'showcase'>('workbench');
  const [showSearch, setShowSearch] = useState(false);
  const [showTagFilter, setShowTagFilter] = useState(false);

  const tabs = [
    { id: 'blueprint', label: 'Blueprint', count: blueprintSolutions.length, color: 'amber', icon: <PenTool size={16}/> },
    { id: 'workbench', label: 'Workbench', count: workbenchSolutions.length, color: 'blueprint', icon: <Wrench size={16}/> },
    { id: 'showcase', label: 'Showcase', count: showcaseSolutions.length, color: 'emerald', icon: <CheckCircle size={16}/> },
  ] as const;

  let currentSolutionsToDisplay: Solution[] = [];
  if (activeTab === 'blueprint') currentSolutionsToDisplay = blueprintSolutions;
  else if (activeTab === 'workbench') currentSolutionsToDisplay = workbenchSolutions;
  else if (activeTab === 'showcase') currentSolutionsToDisplay = showcaseSolutions;

  if (filterTag) {
    currentSolutionsToDisplay = currentSolutionsToDisplay.filter(s => s.tags.includes(filterTag));
  }
  if (searchQuery) {
    currentSolutionsToDisplay = currentSolutionsToDisplay.filter(s => 
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

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-1 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors 
              ${activeTab === tab.id 
                ? `border-b-2 ${tab.id === 'blueprint' ? 'border-amber-500 text-amber-400' : tab.id === 'workbench' ? 'border-blueprint text-blueprint' : 'border-emerald-500 text-emerald-400'}` 
                : 'text-gray-500 hover:text-gray-300 border-b-2 border-transparent'
              }`}
          >
            {tab.icon} 
            {tab.label} ({tab.id === 'blueprint' ? blueprintSolutions.filter(s => !filterTag || s.tags.includes(filterTag)).filter(s => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())).length :
                         tab.id === 'workbench' ? workbenchSolutions.filter(s => !filterTag || s.tags.includes(filterTag)).filter(s => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())).length :
                         showcaseSolutions.filter(s => !filterTag || s.tags.includes(filterTag)).filter(s => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())).length })
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="flex-grow overflow-y-auto space-y-2 p-1">
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
    </div>
  );
}

// Enhanced Mobile Solution Card
function MobileSolutionCard({ solution, onClick }: { solution: Solution; onClick: () => void }) {
  const statusConfig = {
    blueprint: { icon: <PenTool size={16} className="text-amber-500" />, color: 'amber', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30', progressColor: 'bg-amber-500' },
    workbench: { icon: <Wrench size={16} className="text-blueprint" />, color: 'blueprint', bgColor: 'bg-blueprint/10', borderColor: 'border-blueprint/30', progressColor: 'bg-blueprint' },
    showcase: { icon: <CheckCircle size={16} className="text-emerald-500" />, color: 'emerald', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30', progressColor: 'bg-emerald-500' },
  };
  const config = statusConfig[solution.status];

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
