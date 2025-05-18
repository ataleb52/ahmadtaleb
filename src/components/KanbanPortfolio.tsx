import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import '../styles/animations.css';
import { 
  Wrench, 
  CheckCircle,
  Search,
  X,
  ExternalLink,
  Calendar,
  Tag,
  ArrowRight,
  Workflow,
  ChevronRight,
  Clock,
  ListTodo,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Pin,
  Eye,
  Gauge,
  PenTool,
  Table,
  Hammer,
  Info,
  MoveHorizontal,
  Keyboard,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, animate, useSpring, useTransform, MotionValue } from 'framer-motion';
import { EnhancedWorkshopView } from './EnhancedWorkshopView';

type Solution = {
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
}

export function SolutionWorkshop() {
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [activeArea, setActiveArea] = useState<'blueprint' | 'workbench' | 'showcase' | null>(null);
  const [viewMode, setViewMode] = useState<'workshop' | 'list'>('workshop');
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const workshopRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Solutions data
  const solutions: Solution[] = [
    // Blueprint solutions (Will Tackle)
    {
      id: 'blueprint-1',
      title: 'Legacy System Dependencies',
      description: 'Organizations stuck with 15+ year old infrastructure that slows innovation',
      impact: 'Will enable faster deployments and reduce maintenance costs by 60%',
      status: 'blueprint',
      progress: 0,
      tags: ['Legacy Systems', 'Architecture'],
      relatedSolutions: ['workbench-2', 'showcase-1']
    },
    {
      id: 'blueprint-2',
      title: 'Customer Behavior Blind Spots',
      description: 'Companies missing key insights into customer decision-making patterns',
      impact: 'Will surface hidden opportunities and reduce customer acquisition costs',
      status: 'blueprint',
      progress: 0,
      tags: ['Analytics', 'Customer Experience'],
    },
    
    // Workbench solutions (Working On)
    {
      id: 'workbench-1',
      title: 'Portfolio Communication Clarity',
      description: 'Showcasing problem-solving approach in a memorable, effective way',
      impact: 'This very site—creating a system to demonstrate how I think',
      status: 'workbench',
      progress: 75,
      tags: ['Personal Brand', 'UX Design'],
      link: '#',
      relatedSolutions: ['showcase-2']
    },
    {
      id: 'workbench-2',
      title: 'Cross-Department Data Silos',
      description: 'Isolated systems preventing consolidated business intelligence',
      impact: 'Reducing manual entry by 70% across 5 departments',
      status: 'workbench',
      progress: 40,
      tags: ['Data Integration', 'Business Intelligence'],
      relatedSolutions: ['blueprint-1', 'showcase-1']
    },
    
    // Showcase solutions (Solved)
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
      relatedSolutions: ['workbench-2', 'blueprint-1']
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
      relatedSolutions: ['workbench-1']
    }
  ];

  // Filter solutions based on search and tag
  const filteredSolutions = solutions.filter(solution => 
    (solution.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     solution.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterTag || solution.tags.includes(filterTag)) &&
    (!activeArea || solution.status === activeArea)
  );
  
  // Group solutions by status
  const blueprintSolutions = filteredSolutions.filter(s => s.status === 'blueprint');
  const workbenchSolutions = filteredSolutions.filter(s => s.status === 'workbench');
  const showcaseSolutions = filteredSolutions.filter(s => s.status === 'showcase');

  // Track mouse position for effects
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (workshopRef.current) {
        const rect = workshopRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Find related solutions
  const getRelatedSolutions = (solutionId: string) => {
    const solution = solutions.find(s => s.id === solutionId);
    if (!solution?.relatedSolutions?.length) return [];
    return solutions.filter(s => solution.relatedSolutions?.includes(s.id));
  };

  // Toggle view mode between workshop and list
  const toggleViewMode = () => {
    setViewMode(viewMode === 'workshop' ? 'list' : 'workshop');
  };

  // Update solution status - this will be used by EnhancedWorkshopView for drag-and-drop
  const updateSolutionStatus = useCallback((solutionId: string, newStatus: 'blueprint' | 'workbench' | 'showcase') => {
    // Find the solution to update
    const solutionIndex = solutions.findIndex(s => s.id === solutionId);
    
    if (solutionIndex === -1) return;
    
    // Create a new array with the updated solution
    const updatedSolutions = [...solutions];
    
    // Special handling for solutions moving to showcase (mark as complete)
    if (newStatus === 'showcase' && updatedSolutions[solutionIndex].status !== 'showcase') {
      updatedSolutions[solutionIndex] = {
        ...updatedSolutions[solutionIndex],
        status: newStatus,
        progress: 100,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric',
          month: 'short'
        })
      };
    } else if (newStatus === 'workbench' && updatedSolutions[solutionIndex].status === 'blueprint') {
      // When moving from blueprint to workbench, set initial progress
      updatedSolutions[solutionIndex] = {
        ...updatedSolutions[solutionIndex],
        status: newStatus,
        progress: 10 // Start with 10% progress
      };
    } else if (newStatus === 'blueprint' && updatedSolutions[solutionIndex].status === 'workbench') {
      // When moving from workbench back to blueprint, reset progress
      updatedSolutions[solutionIndex] = {
        ...updatedSolutions[solutionIndex],
        status: newStatus,
        progress: 0
      };
    } else {
      // Default update just changes the status
      updatedSolutions[solutionIndex] = {
        ...updatedSolutions[solutionIndex],
        status: newStatus
      };
    }
    
    // Replace the solutions array with the updated one
    // In a real app, this would likely be a state update with a database call
    for (let i = 0; i < updatedSolutions.length; i++) {
      solutions[i] = updatedSolutions[i];
    }
    
    // Refilter solutions to update the UI
    const newFilteredSolutions = solutions.filter(solution => 
      (solution.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       solution.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!filterTag || solution.tags.includes(filterTag)) &&
      (!activeArea || solution.status === activeArea)
    );
    
    // Force a re-render by toggling and immediately toggling back a state value
    setIsDragging(true);
    setTimeout(() => setIsDragging(false), 10);
  }, [solutions, searchQuery, filterTag, activeArea]);

  return (
    <div className="w-full space-y-6">
      {/* Header section with controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-heading mb-1 flex items-center gap-2">
            <span className="text-blueprint">
              <Hammer className="inline h-6 w-6" />
            </span>
            Solution Workshop
          </h2>
          <p className="text-muted-foreground">
            Where I craft solutions to meaningful problems
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Find solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-background border focus:outline-none focus:ring-1 focus:ring-blueprint/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          {/* View toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleViewMode}
            className="h-10"
          >
            {viewMode === 'workshop' ? (
              <>
                <Table size={16} className="mr-2" />
                List View
              </>
            ) : (
              <>
                <Hammer size={16} className="mr-2" />
                Workshop View
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Filter quick-access */}
      <div className="flex flex-wrap gap-2">
        <FilterButton
          label="All Areas"
          count={solutions.length}
          active={activeArea === null}
          onClick={() => setActiveArea(null)}
        />
        <FilterButton
          label="Working On"
          count={solutions.filter(s => s.status === 'workbench').length}
          active={activeArea === 'workbench'}
          color="blueprint"
          icon={<Wrench size={14} />}
          onClick={() => setActiveArea(activeArea === 'workbench' ? null : 'workbench')}
        />
        <FilterButton
          label="Will Tackle"
          count={solutions.filter(s => s.status === 'blueprint').length}
          active={activeArea === 'blueprint'}
          color="amber"
          icon={<PenTool size={14} />}
          onClick={() => setActiveArea(activeArea === 'blueprint' ? null : 'blueprint')}
        />
        <FilterButton
          label="Solved"
          count={solutions.filter(s => s.status === 'showcase').length}
          active={activeArea === 'showcase'}
          color="emerald"
          icon={<CheckCircle size={14} />}
          onClick={() => setActiveArea(activeArea === 'showcase' ? null : 'showcase')}
        />
      </div>
      
      {/* Empty state */}
      {filteredSolutions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No matching solutions</h3>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your search or filter criteria.
          </p>
          {(searchQuery || filterTag || activeArea) && (
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setFilterTag(null);
                setActiveArea(null);
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
      
      {/* Main content area - changes based on view mode */}
      {filteredSolutions.length > 0 && (
        viewMode === 'workshop' ? (
          <EnhancedWorkshopView
            blueprintSolutions={blueprintSolutions}
            workbenchSolutions={workbenchSolutions}
            showcaseSolutions={showcaseSolutions}
            onSelectSolution={setActiveSolution}
            onUpdateSolutionStatus={updateSolutionStatus}
            mousePosition={mousePosition}
            ref={workshopRef}
          />
        ) : (
          <ListView
            solutions={filteredSolutions}
            onSelectSolution={setActiveSolution}
          />
        )
      )}
      
      {/* Solution detail modal */}
      <AnimatePresence>
        {activeSolution && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
            onClick={() => setActiveSolution(null)} // Close when clicking the backdrop
          >
            <motion.div 
              className="bg-background border rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto relative"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div 
                  className="absolute inset-0 opacity-5" 
                  style={{ 
                    backgroundImage: activeSolution.status === 'blueprint' ? 
                      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0h2v20H1V0zm0 0h20v2H0V0z' fill='%23F59E0B' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")" :
                      activeSolution.status === 'workbench' ?
                      "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")" :
                      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23047857' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                    backgroundSize: activeSolution.status === 'blueprint' ? "10px 10px" : "auto"
                  }}
                ></div>
                
                {/* Status-specific ambient lighting effect */}
                {activeSolution.status === 'blueprint' && (
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                )}
                {activeSolution.status === 'workbench' && (
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-blueprint/10 rounded-full blur-3xl"></div>
                )}
                {activeSolution.status === 'showcase' && (
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
                )}
              </div>
              
              <SolutionDetail 
                solution={activeSolution}
                relatedSolutions={getRelatedSolutions(activeSolution.id)}
                onClose={() => setActiveSolution(null)}
                onSelectRelated={setActiveSolution}
              />
              
              {/* Close button - outside the main content for better visibility */}
              <motion.button
                className="absolute top-4 right-4 p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground border shadow-sm z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSolution(null)}
                aria-label="Close dialog"
              >
                <X size={16} />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}



// List view - more traditional grid layout with workshop aesthetic
function ListView({ 
  solutions, 
  onSelectSolution 
}: { 
  solutions: Solution[],
  onSelectSolution: (solution: Solution) => void
}) {
  return (
    <div className="relative">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" 
        }}
      ></div>
      
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        aria-label="Solutions list view"
      >
        {solutions.map((solution, index) => (
          <motion.div 
            key={solution.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <SolutionCard 
              solution={solution}
              onClick={() => onSelectSolution(solution)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Blueprint item - future projects
function BlueprintItem({ 
  solution, 
  onClick 
}: { 
  solution: Solution, 
  onClick: () => void 
}) {
  return (
    <motion.div
      onClick={onClick}
      className="rounded-md border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm p-4 cursor-pointer"
      whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-sm">{solution.title}</h4>
        <span className="text-amber-500 flex-shrink-0">
          <PenTool size={14} />
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
        {solution.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1">
          {solution.tags.slice(0, 1).map(tag => (
            <span key={tag} className="text-xs px-1.5 py-0.5 bg-background rounded-sm">
              {tag}
            </span>
          ))}
          {solution.tags.length > 1 && (
            <span className="text-xs px-1.5 py-0.5 bg-background rounded-sm">
              +{solution.tags.length - 1}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">Will tackle</span>
      </div>
    </motion.div>
  );
}

// Blueprint item - compact version for side section
function BlueprintItemCompact({ 
  solution, 
  onClick 
}: { 
  solution: Solution, 
  onClick: () => void 
}) {
  return (
    <motion.div
      onClick={onClick}
      className="rounded-md border border-amber-500/30 bg-amber-500/5 p-3 cursor-pointer group relative"
      whileHover={{ 
        y: -2, 
        x: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderColor: "rgba(245, 158, 11, 0.5)"
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      role="button"
      aria-label={`View blueprint details for ${solution.title}`}
    >
      {/* Blueprint corner fold effect */}
      <div className="absolute top-0 right-0 w-6 h-6 bg-amber-500/10 rounded-bl-lg">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-amber-500/40 border-r-amber-500/40"></div>
      </div>
      
      {/* Blueprint grid lines - only visible on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0h2v20H1V0zm0 0h20v2H0V0z' fill='%23F59E0B' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "8px 8px" 
        }}
      ></div>
      
      <div className="flex items-center gap-2">
        <span className="text-amber-500 flex-shrink-0 bg-amber-500/10 p-1 rounded-full">
          <PenTool size={12} />
        </span>
        <h4 className="font-medium text-sm truncate group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
          {solution.title}
        </h4>
      </div>
      
      <p className="mt-2 text-xs text-muted-foreground line-clamp-2 pl-7">
        {solution.description}
      </p>
      
      {/* Tags */}
      <div className="mt-2 pl-7 flex flex-wrap gap-1">
        {solution.tags.slice(0, 1).map(tag => (
          <span 
            key={tag} 
            className="text-[10px] px-1.5 rounded-sm bg-amber-500/10 text-amber-700 dark:text-amber-300"
          >
            {tag}
          </span>
        ))}
        {solution.tags.length > 1 && (
          <span className="text-[10px] px-1.5 rounded-sm text-muted-foreground">
            +{solution.tags.length - 1}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// Workbench item - active projects
function WorkbenchItem({ 
  solution, 
  onClick 
}: { 
  solution: Solution, 
  onClick: () => void 
}) {
  return (
    <motion.div
      onClick={onClick}
      className="rounded-md border border-blueprint/30 bg-white/5 backdrop-blur-sm p-4 cursor-pointer shadow-sm"
      whileHover={{ y: -3, boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-sm">{solution.title}</h4>
        <span className="text-blueprint flex-shrink-0">
          <Wrench size={14} />
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
        {solution.description}
      </p>
      
      {/* Progress indicator */}
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1 text-xs">
          <span>Progress</span>
          <span className="font-medium">{solution.progress}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blueprint"
            initial={{ width: 0 }}
            animate={{ width: `${solution.progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1">
          {solution.tags.slice(0, 1).map(tag => (
            <span key={tag} className="text-xs px-1.5 py-0.5 bg-background rounded-sm">
              {tag}
            </span>
          ))}
          {solution.tags.length > 1 && (
            <span className="text-xs px-1.5 py-0.5 bg-background rounded-sm">
              +{solution.tags.length - 1}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" className="p-0 h-6">
          <span className="sr-only">View details</span>
          <ChevronRight size={14} className="text-muted-foreground" />
        </Button>
      </div>
    </motion.div>
  );
}

// Enhanced workbench item - more prominent version for central section
function WorkbenchItemEnhanced({ 
  solution, 
  onClick,
  delay = 0 
}: { 
  solution: Solution, 
  onClick: () => void,
  delay?: number
}) {
  const progressValue = useMotionValue(0);
  const progressWidth = useMotionTemplate`${progressValue}%`;
  
  useEffect(() => {
    const controls = animate(progressValue, solution.progress, {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.3 + delay
    });
    
    return controls.stop;
  }, [progressValue, solution.progress, delay]);

  return (
    <motion.div
      onClick={onClick}
      className="rounded-lg border border-blueprint/40 bg-white/10 backdrop-blur-sm p-5 cursor-pointer shadow-md relative group overflow-hidden"
      whileHover={{ 
        y: -4, 
        boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(37, 99, 235, 0.15)",
        borderColor: "rgba(37, 99, 235, 0.5)"
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 20,
        delay: delay 
      }}
      role="button"
      aria-label={`View workbench details for ${solution.title}, ${solution.progress}% complete`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-1 w-24 bg-gradient-to-l from-blueprint to-blueprint/20 rounded-bl-full rounded-tr-lg"></div>
      
      {/* Workbench texture overlay - subtle wood grain */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      ></div>
      
      {/* Tool marks - become visible on hover */}
      <div className="absolute -left-2 top-1/3 w-4 h-1 bg-blueprint/0 group-hover:bg-blueprint/20 transition-colors rounded-full transform rotate-45"></div>
      <div className="absolute right-4 bottom-3 w-8 h-0.5 bg-blueprint/0 group-hover:bg-blueprint/10 transition-colors rounded-full"></div>
      
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-base group-hover:text-blueprint transition-colors">
          {solution.title}
        </h4>
        <div className="bg-blueprint/20 text-blueprint p-1.5 rounded-full flex-shrink-0 shadow-sm group-hover:bg-blueprint/30 transition-colors">
          <Wrench size={16} className="group-hover:rotate-[15deg] transition-transform" />
        </div>
      </div>
      
      <p className="mt-2.5 text-sm text-muted-foreground line-clamp-2">
        {solution.description}
      </p>
      
      {/* Progress indicator with animated value */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium flex items-center gap-1.5">
            <Clock size={12} className="text-muted-foreground" />
            <span>Progress</span>
          </span>
          <motion.span 
            className="text-sm font-medium text-blueprint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + delay }}
          >
            <motion.span>{solution.progress}</motion.span>%
          </motion.span>
        </div>
        
        <div className="h-2.5 bg-muted rounded-full overflow-hidden shadow-inner relative">
          {/* Track marks */}
          <div className="absolute inset-0 flex justify-between px-1 items-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px h-1.5 bg-muted-foreground/20"></div>
            ))}
          </div>
          
          {/* Progress fill */}
          <motion.div 
            className="h-full bg-gradient-to-r from-blueprint/80 to-blueprint"
            style={{ width: progressWidth }}
          />
          
          {/* Progress highlight */}
          <motion.div 
            className="absolute h-px top-0.5 left-0 bg-white/40"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {solution.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 rounded-full bg-background/80 group-hover:bg-blueprint/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <motion.div
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-xs gap-1 hover:bg-blueprint/20 hover:text-blueprint group-hover:bg-blueprint/10 transition-colors"
          >
            Details
            <ChevronRight size={12} />
          </Button>
        </motion.div>
      </div>
      
      {/* "In progress" banner in corner */}
      <div className="absolute -right-8 top-3 bg-blueprint/20 text-[10px] text-blueprint py-0.5 px-6 transform rotate-45 font-medium">
        Active
      </div>
    </motion.div>
  );
}

// Showcase item - completed projects
function ShowcaseItem({ 
  solution, 
  onClick 
}: { 
  solution: Solution, 
  onClick: () => void 
}) {
  return (
    <motion.div
      onClick={onClick}
      className="rounded-md border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm p-4 cursor-pointer"
      whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-sm">{solution.title}</h4>
        <div className="bg-emerald-500/10 text-emerald-500 rounded-full p-0.5 flex-shrink-0">
          <CheckCircle size={14} />
        </div>
      </div>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
        {solution.description}
      </p>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar size={12} />
          <span>{solution.date}</span>
        </div>
        
        {solution.link && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-6 text-xs gap-1 text-emerald-600 hover:text-emerald-700"
          >
            <span>Case Study</span>
            <ExternalLink size={10} />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

// Showcase item - compact version for side section
function ShowcaseItemCompact({ 
  solution, 
  onClick,
  delay = 0
}: { 
  solution: Solution, 
  onClick: () => void,
  delay?: number 
}) {
  return (
    <motion.div
      onClick={onClick}
      className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3.5 cursor-pointer group relative"
      whileHover={{ 
        y: -2, 
        x: -2,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08), 0 2px 6px rgba(16, 185, 129, 0.1)",
        borderColor: "rgba(16, 185, 129, 0.5)"
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 20,
        delay: delay
      }}
      role="button"
      aria-label={`View case study for ${solution.title}, completed ${solution.date}`}
    >
      {/* Showcase glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Completion badge */}
      <div className="absolute -left-1.5 -top-1.5">
        <div className="relative">
          <motion.div 
            className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15,
              delay: delay + 0.2
            }}
          >
            <CheckCircle size={14} className="text-emerald-500" />
          </motion.div>
          
          {/* Badge shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100"
            style={{ 
              rotate: -30,
              translateX: "-100%"
            }}
            animate={{ 
              translateX: ["100%", "-100%"]
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
              repeat: 0,
              repeatType: "reverse",
              repeatDelay: 5
            }}
          />
        </div>
      </div>
      
      <div className="ml-5 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {solution.title}
          </h4>
          <span className="text-xs text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <Calendar size={10} />
            <span>{solution.date}</span>
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-1 pr-2">
          {solution.description}
        </p>
        
        {/* Tags and link hint */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {solution.tags.slice(0, 1).map(tag => (
              <span 
                key={tag} 
                className="text-[10px] px-1.5 rounded-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              >
                {tag}
              </span>
            ))}
            {solution.tags.length > 1 && (
              <span className="text-[10px] px-1.5 rounded-sm text-muted-foreground">
                +{solution.tags.length - 1}
              </span>
            )}
          </div>
          
          {solution.link && (
            <motion.div
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-[10px] gap-0.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 p-0"
              >
                <span>Case Study</span>
                <ExternalLink size={8} />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Standard solution card for list view
function SolutionCard({ 
  solution, 
  onClick 
}: { 
  solution: Solution, 
  onClick: () => void 
}) {
  const statusConfig = {
    blueprint: {
      icon: <PenTool size={16} className="text-amber-500" />,
      label: "Will Tackle",
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
      border: "hover:border-amber-500/30",
      bgHover: "hover:bg-amber-500/5",
      texture: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0h2v20H1V0zm0 0h20v2H0V0z' fill='%23F59E0B' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      decoration: <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/5 rounded-bl-xl"></div>,
      glow: "after:absolute after:-top-4 after:left-1/2 after:-translate-x-1/2 after:w-32 after:h-32 after:bg-amber-500/5 after:rounded-full after:blur-xl after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500"
    },
    workbench: {
      icon: <Wrench size={16} className="text-blueprint" />,
      label: "Working On",
      color: "bg-blueprint/10 text-blueprint",
      border: "hover:border-blueprint/30",
      bgHover: "hover:bg-blueprint/5",
      texture: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      decoration: <div className="absolute -bottom-1 -right-1 w-10 h-1 bg-blueprint/10 rounded-full transform rotate-12"></div>,
      glow: "after:absolute after:-top-4 after:right-1/3 after:w-32 after:h-32 after:bg-blueprint/5 after:rounded-full after:blur-xl after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500"
    },
    showcase: {
      icon: <CheckCircle size={16} className="text-emerald-500" />,
      label: "Solved",
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
      border: "hover:border-emerald-500/30",
      bgHover: "hover:bg-emerald-500/5",
      texture: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23047857' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E\")",
      decoration: <div className="absolute top-5 right-1 w-1 h-8 bg-emerald-500/10 rounded-full"></div>,
      glow: "after:absolute after:-top-4 after:right-1/3 after:w-32 after:h-32 after:bg-emerald-500/5 after:rounded-full after:blur-xl after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-500"
    }
  };

  const config = statusConfig[solution.status];

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "rounded-lg border bg-card p-5 cursor-pointer transition-all relative overflow-hidden group",
        config.border,
        config.bgHover,
        config.glow
      )}
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.98 }}
      role="button"
      aria-label={`View details for ${solution.title}`}
    >
      {/* Status-specific texture and decorative elements */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        style={{ backgroundImage: config.texture }}
      ></div>
      
      {config.decoration}
      
      <div className="flex items-center gap-2 mb-3 relative">
        <span className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full text-xs", config.color)}>
          {config.icon}
          <span>{config.label}</span>
        </span>
        
        {/* Workshop tool mark */}
        {solution.status === 'workbench' && (
          <motion.div 
            className="absolute -right-1 -top-1 w-6 h-1 bg-blueprint/10 rounded-full opacity-0 group-hover:opacity-100"
            initial={{ rotate: -45 }}
            whileHover={{ rotate: -30 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        )}
      </div>
      
      <h4 className="font-medium mb-2 relative">{solution.title}</h4>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 relative">
        {solution.description}
      </p>
      
      {/* Progress bar for workbench solutions */}
      {solution.status === 'workbench' && (
        <div className="mt-2 mb-4 relative">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-blueprint/80 to-blueprint relative"
              initial={{ width: 0 }}
              animate={{ width: `${solution.progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            >
              {/* Progress highlight */}
              <div className="absolute h-px top-0.5 left-0 right-0 bg-white/40"></div>
            </motion.div>
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={10} />
              In progress
            </span>
            <span className="text-xs font-medium">{solution.progress}%</span>
          </div>
        </div>
      )}
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-4 relative">
        {solution.tags.map(tag => (
          <motion.span 
            key={tag}
            className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              solution.status === 'blueprint' ? "bg-amber-500/10 text-amber-700 dark:text-amber-300" :
              solution.status === 'workbench' ? "bg-blueprint/10 text-blueprint" :
              "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            )}
            whileHover={{ scale: 1.05 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
      
      {/* Footer with date/impact */}
      <div className="mt-4 pt-3 border-t flex items-center justify-between relative">
        {solution.date ? (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar size={12} />
            {solution.date}
          </div>
        ) : (
          <div></div>
        )}
        
        <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-8 text-xs gap-1",
              solution.status === 'blueprint' ? "hover:text-amber-600 hover:bg-amber-500/10" :
              solution.status === 'workbench' ? "hover:text-blueprint hover:bg-blueprint/10" :
              "hover:text-emerald-600 hover:bg-emerald-500/10"
            )}
          >
            Details
            <ArrowRight size={12} />
          </Button>
        </motion.div>
      </div>
      
      {/* Conditional completion badge for showcase solutions */}
      {solution.status === 'showcase' && (
        <div className="absolute top-3 right-3">
          <motion.div
            className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <CheckCircle size={12} className="text-emerald-500" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// Detail view modal
function SolutionDetail({
  solution,
  relatedSolutions = [],
  onClose,
  onSelectRelated
}: {
  solution: Solution;
  relatedSolutions: Solution[];
  onClose: () => void;
  onSelectRelated: (solution: Solution) => void;
}) {
  const statusConfig = {
    blueprint: {
      icon: <PenTool size={18} />,
      label: "Will Tackle",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      description: "A problem I've identified and plan to solve in the future.",
      accent: "border-amber-500/30 bg-amber-500/5"
    },
    workbench: {
      icon: <Wrench size={18} />,
      label: "Working On",
      color: "text-blueprint bg-blueprint/10 border-blueprint/30",
      description: "A solution I'm actively developing right now.",
      accent: "border-blueprint/30 bg-blueprint/5"
    },
    showcase: {
      icon: <CheckCircle size={18} />,
      label: "Solved",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      description: "A completed solution with measurable results.",
      accent: "border-emerald-500/30 bg-emerald-500/5"
    }
  };

  const config = statusConfig[solution.status];

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="border-b p-5 flex justify-between items-center relative">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.color} border`}>
          {config.icon}
          <span className="font-medium">{config.label}</span>
        </div>
        
        <h2 id="modal-title" className="text-xl font-heading absolute left-1/2 transform -translate-x-1/2 truncate max-w-[50%]">
          {solution.title}
        </h2>
      </div>
      
      {/* Main content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.color}`}>
            {config.icon}
          </div>
          <div>
            <h2 className="text-2xl font-heading">{solution.title}</h2>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Description */}
          <motion.div 
            className={`rounded-lg p-5 border ${config.accent} relative overflow-hidden`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" />
              The Challenge
            </h3>
            <p>{solution.description}</p>
            
            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 border-t-8 border-r-8 border-t-transparent border-r-transparent opacity-20"></div>
          </motion.div>
          
          {/* Impact */}
          <motion.div 
            className={`rounded-lg p-5 border ${config.accent} relative overflow-hidden`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Gauge size={16} className="text-emerald-500" />
              The Impact
            </h3>
            <p>{solution.impact}</p>
            
            {/* Decorative corner element */}
            <div className="absolute bottom-0 left-0 border-b-8 border-l-8 border-b-transparent border-l-transparent opacity-20"></div>
          </motion.div>
          
          {/* Progress for in-progress solutions */}
          {solution.status === 'workbench' && (
            <motion.div 
              className="rounded-lg p-5 border border-blueprint/30 bg-blueprint/5 relative overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Hammer size={16} className="text-blueprint" />
                Current Progress
              </h3>
              
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden mb-3 shadow-inner">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blueprint/80 to-blueprint relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${solution.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {/* Progress highlight */}
                  <div className="absolute h-px top-0.5 left-0 right-0 bg-white/40"></div>
                </motion.div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock size={14} className="text-blueprint/70" />
                  In progress
                </span>
                <span className="text-sm font-medium">{solution.progress}% complete</span>
              </div>
              
              {/* Work elements - decorative */}
              <div className="absolute -bottom-2 right-10 w-16 h-1 bg-blueprint/10 rounded-full transform rotate-12"></div>
              <div className="absolute top-8 right-4 w-1 h-8 bg-blueprint/10 rounded-full"></div>
            </motion.div>
          )}
        </div>
        
        {/* Tags and metadata */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-muted-foreground">
              <Tag size={14} />
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {solution.tags.map(tag => (
                <motion.span 
                  key={tag}
                  className={`px-2.5 py-1 rounded-full text-sm ${
                    solution.status === 'blueprint' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300' :
                    solution.status === 'workbench' ? 'bg-blueprint/10 text-blueprint' :
                    'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          {/* Date/Timeline */}
          {solution.date && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-muted-foreground">
                <Calendar size={14} />
                {solution.status === 'showcase' ? 'Completed' : 'Timeline'}
              </h3>
              <p className={`text-sm px-3 py-1.5 inline-block rounded-full ${
                solution.status === 'blueprint' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300' :
                solution.status === 'workbench' ? 'bg-blueprint/10 text-blueprint' :
                'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
              }`}>
                {solution.date}
              </p>
            </motion.div>
          )}
        </div>
        
        {/* Related solutions */}
        {relatedSolutions.length > 0 && (
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="font-medium mb-3 flex items-center gap-1.5">
              <Workflow size={16} className="text-muted-foreground" />
              Connected Solutions
            </h3>
            
            <div className="space-y-2">
              {relatedSolutions.map((related, index) => (
                <motion.button
                  key={related.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg hover:shadow-md transition-all ${
                    related.status === 'blueprint' ? 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/30' : 
                    related.status === 'workbench' ? 'border-blueprint/20 bg-blueprint/5 hover:border-blueprint/30' : 
                    'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30'
                  } border`}
                  onClick={() => onSelectRelated(related)}
                  whileHover={{ 
                    y: -1, 
                    x: related.status === 'blueprint' ? 1 : related.status === 'workbench' ? 0 : -1 
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: related.status === 'blueprint' ? -5 : related.status === 'workbench' ? 0 : 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  role="button"
                  aria-label={`View related solution: ${related.title}`}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    related.status === 'blueprint' ? "bg-amber-500/20" : 
                    related.status === 'workbench' ? "bg-blueprint/20" : 
                    "bg-emerald-500/20"
                  )}>
                    {related.status === 'blueprint' ? <PenTool size={16} className="text-amber-500" /> : 
                     related.status === 'workbench' ? <Wrench size={16} className="text-blueprint" /> : 
                     <CheckCircle size={16} className="text-emerald-500" />}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-sm">{related.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{related.description}</p>
                  </div>
                  <ChevronRight size={16} className={`
                    ${related.status === 'blueprint' ? "text-amber-500/50" : 
                    related.status === 'workbench' ? "text-blueprint/50" : 
                    "text-emerald-500/50"}
                  `} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Footer with action buttons */}
      <motion.div 
        className="p-6 border-t flex justify-between items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-sm text-muted-foreground max-w-[60%]">
          {solution.status === 'blueprint' ? 'This solution is in the planning stage.' : 
           solution.status === 'workbench' ? `This solution is currently ${solution.progress}% complete.` : 
           'This solution has been successfully implemented.'}
        </p>
        
        <div className="flex gap-2">
          {solution.link ? (
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button 
                onClick={() => window.open(solution.link, '_blank')}
                className="gap-1.5"
              >
                <span>View Case Study</span>
                <ExternalLink size={14} />
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button 
                variant="outline" 
                onClick={onClose}
              >
                Close
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Filter button component with enhanced accessibility
function FilterButton({
  label,
  count,
  active = false,
  color = "default",
  icon,
  onClick,
  ariaLabel,
  selected
}: {
  label: string;
  count: number;
  active?: boolean;
  color?: "default" | "amber" | "blueprint" | "emerald";
  icon?: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  selected?: boolean;
}) {
  const baseClasses = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all relative";
  
  const colorClasses = {
    default: active 
      ? "bg-primary text-primary-foreground" 
      : "bg-muted hover:bg-muted/80 text-muted-foreground",
    amber: active 
      ? "bg-amber-500 text-white shadow-sm shadow-amber-500/20" 
      : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400",
    blueprint: active 
      ? "bg-blueprint text-white shadow-sm shadow-blueprint/20" 
      : "bg-blueprint/10 hover:bg-blueprint/20 text-blueprint",
    emerald: active 
      ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20" 
      : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[color]}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      aria-label={ariaLabel || `Filter by ${label}`}
      role="radio"
      aria-checked={selected}
    >
      {/* Workshop aesthetic - tiny decorative elements */}
      {active && (
        <>
          <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 rounded-full bg-white/30"></div>
          <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 rounded-full bg-white/20"></div>
        </>
      )}
      
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{label}</span>
      <span className={cn(
        "inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-medium",
        active ? "bg-white/20" : "bg-background"
      )}>
        {count}
      </span>
    </motion.button>
  );
}

// Export for use in page
export const SolutionBlueprint = SolutionWorkshop;