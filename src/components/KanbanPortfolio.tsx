import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
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
} from 'lucide-react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';

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
          <WorkshopView
            blueprintSolutions={blueprintSolutions}
            workbenchSolutions={workbenchSolutions}
            showcaseSolutions={showcaseSolutions}
            onSelectSolution={setActiveSolution}
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
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-background border rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <SolutionDetail 
                solution={activeSolution}
                relatedSolutions={getRelatedSolutions(activeSolution.id)}
                onClose={() => setActiveSolution(null)}
                onSelectRelated={setActiveSolution}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Workshop view - immersive experience
const WorkshopView = React.forwardRef<
  HTMLDivElement, 
  { 
    blueprintSolutions: Solution[], 
    workbenchSolutions: Solution[],
    showcaseSolutions: Solution[],
    onSelectSolution: (solution: Solution) => void,
    mousePosition: { x: number, y: number }
  }
>(({ blueprintSolutions, workbenchSolutions, showcaseSolutions, onSelectSolution, mousePosition }, ref) => {
  // Use a predefined pattern for the grid lines
  const blueprintPattern = "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232563eb' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z'/%3E%3Cpath d='M0 0h20v20H0V0zm21 0h19v19H21V0z'/%3E%3C/g%3E%3C/svg%3E\")";

  return (
    <motion.div 
      ref={ref}
      className="rounded-xl border overflow-hidden relative w-full bg-muted/20 h-[700px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Workshop background with ambient lighting */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/80"></div>
        
        {/* Dynamic spotlight that follows the cursor */}
        <div 
          className="absolute opacity-70 pointer-events-none"
          style={{
            background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent)`,
            width: '100%',
            height: '100%',
            transition: 'background 0.2s ease'
          }}
        ></div>
      </div>
      
      <div className="relative z-10 grid grid-rows-[auto_1fr] h-full">
        {/* Area labels - top navigation */}
        <div className="grid grid-cols-3 border-b text-center">
          <div className="p-3 border-r">
            <h3 className="font-medium text-amber-500 flex items-center justify-center gap-2">
              <PenTool size={18} />
              <span>Blueprints</span>
            </h3>
            <p className="text-xs text-muted-foreground">Problems I'll tackle</p>
          </div>
          <div className="p-3 border-r bg-blueprint/5">
            <h3 className="font-medium text-blueprint flex items-center justify-center gap-2">
              <Wrench size={18} />
              <span>Workbench</span>
            </h3>
            <p className="text-xs text-muted-foreground">Currently crafting</p>
          </div>
          <div className="p-3">
            <h3 className="font-medium text-emerald-500 flex items-center justify-center gap-2">
              <CheckCircle size={18} />
              <span>Showcase</span>
            </h3>
            <p className="text-xs text-muted-foreground">Finished solutions</p>
          </div>
        </div>
        
        {/* Workshop areas */}
        <div className="grid grid-cols-3 h-full overflow-hidden">
          {/* Blueprint area - draft table with blueprints */}
          <div className="border-r relative p-4 overflow-y-auto">
            <div 
              className="absolute inset-0 opacity-10" 
              style={{ backgroundImage: blueprintPattern }}
            ></div>
            <div className="relative z-10 space-y-3">
              {blueprintSolutions.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">No blueprints yet</p>
                </div>
              ) : (
                blueprintSolutions.map(solution => (
                  <BlueprintItem 
                    key={solution.id} 
                    solution={solution} 
                    onClick={() => onSelectSolution(solution)} 
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Workbench area - active projects with tools */}
          <div className="border-r bg-blueprint/5 relative p-4 overflow-y-auto shadow-inner">
            <div 
              className="absolute inset-0 bg-center bg-repeat-space opacity-5" 
              style={{ 
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" 
              }}
            ></div>
            <div className="relative z-10 space-y-3">
              {workbenchSolutions.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Nothing on the workbench</p>
                </div>
              ) : (
                workbenchSolutions.map(solution => (
                  <WorkbenchItem 
                    key={solution.id} 
                    solution={solution} 
                    onClick={() => onSelectSolution(solution)} 
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Showcase area - finished projects on display */}
          <div className="relative p-4 overflow-y-auto">
            <div 
              className="absolute inset-0 bg-center bg-repeat opacity-5" 
              style={{ 
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23047857' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")" 
              }}
            ></div>
            <div className="relative z-10 space-y-3">
              {showcaseSolutions.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Display case is empty</p>
                </div>
              ) : (
                showcaseSolutions.map(solution => (
                  <ShowcaseItem 
                    key={solution.id} 
                    solution={solution} 
                    onClick={() => onSelectSolution(solution)} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// List view - more traditional grid layout
function ListView({ 
  solutions, 
  onSelectSolution 
}: { 
  solutions: Solution[],
  onSelectSolution: (solution: Solution) => void
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {solutions.map(solution => (
        <SolutionCard 
          key={solution.id}
          solution={solution}
          onClick={() => onSelectSolution(solution)}
        />
      ))}
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
      bgHover: "hover:bg-amber-500/5"
    },
    workbench: {
      icon: <Wrench size={16} className="text-blueprint" />,
      label: "Working On",
      color: "bg-blueprint/10 text-blueprint",
      border: "hover:border-blueprint/30",
      bgHover: "hover:bg-blueprint/5"
    },
    showcase: {
      icon: <CheckCircle size={16} className="text-emerald-500" />,
      label: "Solved",
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
      border: "hover:border-emerald-500/30",
      bgHover: "hover:bg-emerald-500/5"
    }
  };

  const config = statusConfig[solution.status];

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "rounded-lg border bg-card p-5 cursor-pointer transition-all",
        config.border,
        config.bgHover
      )}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full text-xs", config.color)}>
          {config.icon}
          <span>{config.label}</span>
        </span>
      </div>
      
      <h4 className="font-medium mb-2">{solution.title}</h4>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {solution.description}
      </p>
      
      {/* Progress bar for workbench solutions */}
      {solution.status === 'workbench' && (
        <div className="mt-2 mb-4">
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blueprint"
              initial={{ width: 0 }}
              animate={{ width: `${solution.progress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-muted-foreground">In progress</span>
            <span className="text-xs font-medium">{solution.progress}%</span>
          </div>
        </div>
      )}
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-4">
        {solution.tags.map(tag => (
          <span 
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Footer with date/impact */}
      <div className="mt-4 pt-3 border-t flex items-center justify-between">
        {solution.date ? (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar size={12} />
            {solution.date}
          </div>
        ) : (
          <div></div>
        )}
        
        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
          Details
          <ArrowRight size={12} />
        </Button>
      </div>
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
      color: "text-amber-500 bg-amber-500/10",
      description: "A problem I've identified and plan to solve in the future."
    },
    workbench: {
      icon: <Wrench size={18} />,
      label: "Working On",
      color: "text-blueprint bg-blueprint/10",
      description: "A solution I'm actively developing right now."
    },
    showcase: {
      icon: <CheckCircle size={18} />,
      label: "Solved",
      color: "text-emerald-500 bg-emerald-500/10",
      description: "A completed solution with measurable results."
    }
  };

  const config = statusConfig[solution.status];

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="border-b p-6 flex justify-between items-center">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.color}`}>
          {config.icon}
          <span className="font-medium">{config.label}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="rounded-full"
        >
          <X size={18} />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="p-6">
        <h2 className="text-2xl font-heading mb-1">{solution.title}</h2>
        <p className="text-sm text-muted-foreground mb-6">{config.description}</p>
        
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-muted/30 rounded-lg p-5 border">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" />
              The Challenge
            </h3>
            <p>{solution.description}</p>
          </div>
          
          {/* Impact */}
          <div className="bg-muted/30 rounded-lg p-5 border">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Gauge size={16} className="text-emerald-500" />
              The Impact
            </h3>
            <p>{solution.impact}</p>
          </div>
          
          {/* Progress for in-progress solutions */}
          {solution.status === 'workbench' && (
            <div className="bg-muted/30 rounded-lg p-5 border">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Hammer size={16} className="text-blueprint" />
                Current Progress
              </h3>
              
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-3">
                <motion.div 
                  className="h-full bg-blueprint"
                  initial={{ width: 0 }}
                  animate={{ width: `${solution.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">In progress</span>
                <span className="text-sm font-medium">{solution.progress}% complete</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Tags and metadata */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-muted-foreground">
              <Tag size={14} />
              Categories
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {solution.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-muted text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Date/Timeline */}
          {solution.date && (
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-muted-foreground">
                <Calendar size={14} />
                {solution.status === 'showcase' ? 'Completed' : 'Timeline'}
              </h3>
              <p className="text-sm bg-muted px-3 py-1.5 inline-block rounded-full">{solution.date}</p>
            </div>
          )}
        </div>
        
        {/* Related solutions */}
        {relatedSolutions.length > 0 && (
          <div className="mt-8">
            <h3 className="font-medium mb-3 flex items-center gap-1.5">
              <Workflow size={16} className="text-muted-foreground" />
              Connected Solutions
            </h3>
            
            <div className="space-y-2">
              {relatedSolutions.map(related => (
                <button
                  key={related.id}
                  className="w-full flex items-center gap-3 p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors text-left"
                  onClick={() => onSelectRelated(related)}
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
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with action buttons */}
      <div className="p-6 border-t flex justify-end">
        {solution.link ? (
          <Button 
            onClick={() => window.open(solution.link, '_blank')}
            className="gap-1.5"
          >
            <span>View Case Study</span>
            <ExternalLink size={14} />
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
}

// Filter button component
function FilterButton({
  label,
  count,
  active = false,
  color = "default",
  icon,
  onClick
}: {
  label: string;
  count: number;
  active?: boolean;
  color?: "default" | "amber" | "blueprint" | "emerald";
  icon?: React.ReactNode;
  onClick: () => void;
}) {
  const baseClasses = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all";
  
  const colorClasses = {
    default: active 
      ? "bg-primary text-primary-foreground" 
      : "bg-muted hover:bg-muted/80 text-muted-foreground",
    amber: active 
      ? "bg-amber-500 text-white" 
      : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400",
    blueprint: active 
      ? "bg-blueprint text-white" 
      : "bg-blueprint/10 hover:bg-blueprint/20 text-blueprint",
    emerald: active 
      ? "bg-emerald-500 text-white" 
      : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[color]}`}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{label}</span>
      <span className={cn(
        "inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-medium",
        active ? "bg-white/20" : "bg-background"
      )}>
        {count}
      </span>
    </button>
  );
}

// Export for use in page
export const SolutionBlueprint = SolutionWorkshop;