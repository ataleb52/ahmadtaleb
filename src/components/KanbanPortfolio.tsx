import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { 
  Lightbulb, 
  Wrench, 
  CheckCircle, 
  ChevronRight, 
  Search,
  X,
  ExternalLink,
  ChevronDown,
  Calendar,
  Tag,
  Info,
  ArrowRight,
  ArrowUpRight,
  Filter,
  Layout,
  Sparkles,
  Workflow
} from 'lucide-react';
import { BlueprintAnnotation } from './ui/blueprint-annotation';

type Problem = {
  id: string;
  title: string;
  description: string;
  impact: string;
  status: 'idea' | 'building' | 'solved';
  progress: number; // 0-100
  date?: string;
  tags: string[];
  link?: string;
  relatedProblems?: string[]; // IDs of related problems
}

export function SolutionBlueprint() {
  const [activeView, setActiveView] = useState<'journey' | 'grid' | 'list'>('journey');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [highlightedStage, setHighlightedStage] = useState<'idea' | 'building' | 'solved' | null>(null);
  const [showConnections, setShowConnections] = useState(false);
  
  const problems: Problem[] = [
    // Ideas/Radar problems
    {
      id: 'idea-1',
      title: 'Legacy System Dependencies',
      description: 'Organizations stuck with 15+ year old infrastructure that slows innovation',
      impact: 'Will enable faster deployments and reduce maintenance costs by 60%',
      status: 'idea',
      progress: 0,
      tags: ['Legacy Systems', 'Architecture'],
      relatedProblems: ['building-2', 'solved-1']
    },
    {
      id: 'idea-2',
      title: 'Customer Behavior Blind Spots',
      description: 'Companies missing key insights into customer decision-making patterns',
      impact: 'Will surface hidden opportunities and reduce customer acquisition costs',
      status: 'idea',
      progress: 0,
      tags: ['Analytics', 'Customer Experience'],
    },
    
    // Building/In-progress problems
    {
      id: 'building-1',
      title: 'Portfolio Communication Clarity',
      description: 'Showcasing problem-solving approach in a memorable, effective way',
      impact: 'This very site—creating a system to demonstrate how I think',
      status: 'building',
      progress: 75,
      tags: ['Personal Brand', 'UX Design'],
      link: '#',
      relatedProblems: ['solved-2']
    },
    {
      id: 'building-2',
      title: 'Cross-Department Data Silos',
      description: 'Isolated systems preventing consolidated business intelligence',
      impact: 'Reducing manual entry by 70% across 5 departments',
      status: 'building',
      progress: 40,
      tags: ['Data Integration', 'Business Intelligence'],
      relatedProblems: ['idea-1', 'solved-1']
    },
    
    // Solved problems
    {
      id: 'solved-1',
      title: 'E-commerce System Fragmentation',
      description: 'Multiple disconnected tools causing order delays and inventory errors',
      impact: 'Reduced operational overhead by 40% and eliminated order delays',
      status: 'solved',
      progress: 100,
      date: 'Q4 2023',
      tags: ['E-commerce', 'Systems Integration'],
      link: '/case-studies/ecommerce',
      relatedProblems: ['building-2', 'idea-1']
    },
    {
      id: 'solved-2',
      title: 'Manual Fulfillment Bottlenecks',
      description: 'Order processing delays impacting customer satisfaction',
      impact: 'Cut processing time from 3 days to 4 hours',
      status: 'solved',
      progress: 100,
      date: 'Q2 2023',
      tags: ['Operations', 'Workflow Automation'],
      link: '/case-studies/fulfillment',
      relatedProblems: ['building-1']
    }
  ];

  // Filter problems based on search and tag
  const filteredProblems = problems.filter(problem => 
    (problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     problem.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterTag || problem.tags.includes(filterTag))
  );

  // Get all unique tags
  const allTags = Array.from(new Set(problems.flatMap(p => p.tags)));
  
  // Group problems by status
  const ideaProblems = filteredProblems.filter(p => p.status === 'idea');
  const buildingProblems = filteredProblems.filter(p => p.status === 'building');
  const solvedProblems = filteredProblems.filter(p => p.status === 'solved');

  // Close detail view when clicking outside
  const detailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
        setSelectedProblem(null);
      }
    }
    
    if (selectedProblem) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [selectedProblem]);

  // Find related problems for the selected problem
  const getRelatedProblems = (problemId: string) => {
    const problem = problems.find(p => p.id === problemId);
    if (!problem?.relatedProblems?.length) return [];
    return problems.filter(p => problem.relatedProblems?.includes(p.id));
  };

  // Onboarding component for first-time visitors
  const Onboarding = () => (
    <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-card rounded-xl border shadow-lg max-w-lg w-full p-6 relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
          <div className="w-12 h-12 rounded-full bg-blueprint flex items-center justify-center shadow-lg">
            <Sparkles className="text-white" size={24} />
          </div>
        </div>
        
        <h3 className="text-xl font-heading mb-4">Welcome to My Solution Blueprint</h3>
        <p className="mb-6 text-muted-foreground">
          This is where I showcase my problem-solving approach. Explore how I identify challenges, 
          build solutions, and drive real impact.
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb size={16} className="text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Ideas</h4>
              <p className="text-xs text-muted-foreground">Problems I've identified that need solving</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ArrowRight size={12} className="text-muted-foreground ml-4" />
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blueprint/20 flex items-center justify-center flex-shrink-0">
              <Wrench size={16} className="text-blueprint" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Building</h4>
              <p className="text-xs text-muted-foreground">Solutions currently in development</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ArrowRight size={12} className="text-muted-foreground ml-4" />
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={16} className="text-emerald-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Solved</h4>
              <p className="text-xs text-muted-foreground">Completed solutions with measurable results</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => setShowOnboarding(false)}>
            Explore Solutions
            <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full relative">
      {/* Onboarding overlay */}
      {showOnboarding && <Onboarding />}

      {/* Controls bar */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-blueprint"
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
        
        <ViewToggle activeView={activeView} setActiveView={setActiveView} />
        
        {/* Tag filter button with dropdown */}
        <div className="relative ml-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {}}
            className="flex items-center gap-1.5"
          >
            <Filter size={14} />
            <span>
              {filterTag ? `Tag: ${filterTag}` : 'Filter by Tag'}
            </span>
            {filterTag && (
              <div 
                className="ml-1 rounded-full w-4 h-4 flex items-center justify-center bg-muted hover:bg-muted/80"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilterTag(null);
                }}
              >
                <X size={10} />
              </div>
            )}
          </Button>
          
          {/* Show selected filter tag with clear option */}
          {filterTag && (
            <BlueprintAnnotation variant="note" size="xs" className="ml-2 animate-in fade-in duration-300">
              Showing only {filterTag} problems
            </BlueprintAnnotation>
          )}
        </div>
        
        {/* Help button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowOnboarding(true)}
          className="w-8 h-8 rounded-full"
          title="How to use this blueprint"
        >
          <Info size={16} />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="relative">
        {/* Problem views */}
        {activeView === 'journey' ? (
          <JourneyView 
            ideaProblems={ideaProblems}
            buildingProblems={buildingProblems}
            solvedProblems={solvedProblems}
            onSelectProblem={setSelectedProblem}
            highlightedStage={highlightedStage}
            setHighlightedStage={setHighlightedStage}
            showConnections={showConnections}
            setShowConnections={setShowConnections}
          />
        ) : activeView === 'grid' ? (
          <GridView 
            ideaProblems={ideaProblems}
            buildingProblems={buildingProblems}
            solvedProblems={solvedProblems}
            onSelectProblem={setSelectedProblem}
          />
        ) : (
          <ListView 
            ideaProblems={ideaProblems}
            buildingProblems={buildingProblems}
            solvedProblems={solvedProblems}
            onSelectProblem={setSelectedProblem}
          />
        )}
      
        {/* Problem detail overlay */}
        {selectedProblem && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <div 
              ref={detailRef}
              className="bg-background rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto animate-in fade-in zoom-in-95 duration-200"
            >
              <ProblemDetail 
                problem={selectedProblem} 
                onClose={() => setSelectedProblem(null)} 
                relatedProblems={getRelatedProblems(selectedProblem.id)}
                onSelectRelated={(problem) => setSelectedProblem(problem)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ViewToggle({ 
  activeView, 
  setActiveView 
}: { 
  activeView: 'journey' | 'grid' | 'list';
  setActiveView: (view: 'journey' | 'grid' | 'list') => void;
}) {
  return (
    <div className="flex rounded-md overflow-hidden border">
      <button
        onClick={() => setActiveView('journey')}
        className={cn(
          "px-3 py-1.5 flex items-center gap-1.5 text-sm",
          activeView === 'journey' 
            ? "bg-blueprint text-white" 
            : "hover:bg-muted"
        )}
      >
        <Workflow size={14} />
        <span className="hidden sm:inline">Journey</span>
      </button>
      <button
        onClick={() => setActiveView('grid')}
        className={cn(
          "px-3 py-1.5 flex items-center gap-1.5 text-sm border-l",
          activeView === 'grid' 
            ? "bg-blueprint text-white" 
            : "hover:bg-muted"
        )}
      >
        <Layout size={14} />
        <span className="hidden sm:inline">Grid</span>
      </button>
      <button
        onClick={() => setActiveView('list')}
        className={cn(
          "px-3 py-1.5 flex items-center gap-1.5 text-sm border-l",
          activeView === 'list' 
            ? "bg-blueprint text-white" 
            : "hover:bg-muted"
        )}
      >
        <ListIcon size={14} />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
}

function JourneyView({ 
  ideaProblems,
  buildingProblems,
  solvedProblems,
  onSelectProblem,
  highlightedStage,
  setHighlightedStage,
  showConnections,
  setShowConnections
}: {
  ideaProblems: Problem[];
  buildingProblems: Problem[];
  solvedProblems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  highlightedStage: 'idea' | 'building' | 'solved' | null;
  setHighlightedStage: (stage: 'idea' | 'building' | 'solved' | null) => void;
  showConnections: boolean;
  setShowConnections: (show: boolean) => void;
}) {
  const hasProblems = ideaProblems.length > 0 || buildingProblems.length > 0 || solvedProblems.length > 0;

  return (
    <div className="relative">
      {/* Journey header with stage names and connection toggle */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm">Solution Journey</h3>
          {hasProblems && (
            <button 
              onClick={() => setShowConnections(!showConnections)}
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                showConnections 
                  ? "bg-blueprint/20 text-blueprint" 
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              )}
            >
              {showConnections ? 'Hide' : 'Show'} connections
            </button>
          )}
        </div>
        
        <BlueprintAnnotation variant="witty" size="xs">
          // from problem to solution
        </BlueprintAnnotation>
      </div>
      
      {/* Visual timeline journey */}
      <div className="relative bg-blueprint-grid bg-[length:20px_20px] bg-opacity-[0.03] border rounded-xl p-6 overflow-hidden">
        {/* Empty state */}
        {!hasProblems && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <div className="mb-4">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                <Search size={24} className="text-muted-foreground/70" />
              </div>
            </div>
            <p className="mb-2">No problems match your search criteria</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your filters</p>
          </div>
        )}
        
        {hasProblems && (
          <div className="flex flex-col md:flex-row md:h-[450px] gap-4 md:gap-0">
            {/* Ideas stage */}
            <div 
              className={cn(
                "md:w-1/3 p-4 flex flex-col relative transition-all duration-300",
                highlightedStage === 'idea' || highlightedStage === null 
                  ? "opacity-100 scale-100" 
                  : "opacity-70 scale-[0.98]"
              )}
              onMouseEnter={() => setHighlightedStage('idea')}
              onMouseLeave={() => setHighlightedStage(null)}
            >
              {/* Stage header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Lightbulb size={16} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Ideas</h4>
                  <div className="text-xs text-muted-foreground">
                    {ideaProblems.length} problems
                  </div>
                </div>
              </div>
              
              {/* Content - scrollable if needed */}
              <div className="flex-grow overflow-auto pr-1 space-y-3">
                {ideaProblems.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    No ideas yet
                  </div>
                ) : (
                  ideaProblems.map(problem => (
                    <JourneyCard 
                      key={problem.id} 
                      problem={problem} 
                      onClick={() => onSelectProblem(problem)}
                      showConnections={showConnections}
                    />
                  ))
                )}
              </div>
              
              {/* Connection line to next stage - only on wider screens */}
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-0">
                <div className="w-6 border-t-2 border-dashed border-blueprint/30 h-px"></div>
              </div>
            </div>
            
            {/* Building stage */}
            <div 
              className={cn(
                "md:w-1/3 p-4 flex flex-col relative transition-all duration-300",
                highlightedStage === 'building' || highlightedStage === null 
                  ? "opacity-100 scale-100"
                  : "opacity-70 scale-[0.98]"
              )}
              onMouseEnter={() => setHighlightedStage('building')}
              onMouseLeave={() => setHighlightedStage(null)}
            >
              {/* Connection lines - mobile only */}
              <div className="flex md:hidden justify-center mb-2">
                <div className="h-6 border-l-2 border-dashed border-blueprint/30 w-px"></div>
              </div>
              
              {/* Stage header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-blueprint/20 flex items-center justify-center">
                  <Wrench size={16} className="text-blueprint" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Building</h4>
                  <div className="text-xs text-muted-foreground">
                    {buildingProblems.length} in progress
                  </div>
                </div>
              </div>
              
              {/* Content - scrollable if needed */}
              <div className="flex-grow overflow-auto pr-1 space-y-3">
                {buildingProblems.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Nothing in progress
                  </div>
                ) : (
                  buildingProblems.map(problem => (
                    <JourneyCard 
                      key={problem.id} 
                      problem={problem} 
                      onClick={() => onSelectProblem(problem)}
                      showConnections={showConnections}
                    />
                  ))
                )}
              </div>
              
              {/* Connection lines */}
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-0">
                <div className="w-4 border-t-2 border-dashed border-blueprint/30 h-px"></div>
              </div>
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-0">
                <div className="w-6 border-t-2 border-dashed border-blueprint/30 h-px"></div>
              </div>
            </div>
            
            {/* Solved stage */}
            <div 
              className={cn(
                "md:w-1/3 p-4 flex flex-col relative transition-all duration-300",
                highlightedStage === 'solved' || highlightedStage === null 
                  ? "opacity-100 scale-100" 
                  : "opacity-70 scale-[0.98]"
              )}
              onMouseEnter={() => setHighlightedStage('solved')}
              onMouseLeave={() => setHighlightedStage(null)}
            >
              {/* Connection lines - mobile only */}
              <div className="flex md:hidden justify-center mb-2">
                <div className="h-6 border-l-2 border-dashed border-blueprint/30 w-px"></div>
              </div>
              
              {/* Stage header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle size={16} className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Solved</h4>
                  <div className="text-xs text-muted-foreground">
                    {solvedProblems.length} completed
                  </div>
                </div>
              </div>
              
              {/* Content - scrollable if needed */}
              <div className="flex-grow overflow-auto pr-1 space-y-3">
                {solvedProblems.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    No solved problems yet
                  </div>
                ) : (
                  solvedProblems.map(problem => (
                    <JourneyCard 
                      key={problem.id} 
                      problem={problem} 
                      onClick={() => onSelectProblem(problem)}
                      showConnections={showConnections}
                    />
                  ))
                )}
              </div>
              
              {/* Connection line from previous stage - only on wider screens */}
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-0">
                <div className="w-4 border-t-2 border-dashed border-blueprint/30 h-px"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function JourneyCard({ 
  problem, 
  onClick,
  showConnections = false 
}: { 
  problem: Problem; 
  onClick: () => void;
  showConnections?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Different card styles based on status
  const cardStyles = {
    idea: "border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10",
    building: "border-blueprint/40 bg-blueprint/5 hover:bg-blueprint/10",
    solved: "border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10"
  };

  return (
    <div 
      className={cn(
        "border rounded-md p-3 cursor-pointer transition-all duration-300 relative",
        cardStyles[problem.status],
        isHovered ? "shadow-md translate-y-[-2px]" : ""
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator */}
      <div className="flex items-center justify-between mb-2">
        <StatusBadge status={problem.status} />
        
        {/* Connection indicator */}
        {showConnections && problem.relatedProblems && problem.relatedProblems.length > 0 && (
          <div className="px-1.5 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-blueprint"></div>
            <span>{problem.relatedProblems.length} connected</span>
          </div>
        )}
      </div>
      
      {/* Title */}
      <h4 className="font-medium text-sm mb-1">{problem.title}</h4>
      
      {/* Description - truncated */}
      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
        {problem.description}
      </p>
      
      {/* Progress bar for building problems */}
      {problem.status === 'building' && (
        <div className="mt-2 mb-2">
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-blueprint relative origin-left"
              style={{ width: `${problem.progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-[10px] text-muted-foreground">{problem.progress}%</span>
          </div>
        </div>
      )}
      
      {/* Footer with date or "View details" */}
      <div className="flex items-center justify-between">
        {problem.date ? (
          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Calendar size={10} />
            {problem.date}
          </div>
        ) : (
          <div></div>
        )}
        
        <div className={cn(
          "text-[10px] flex items-center gap-0.5 transition-all",
          problem.status === 'idea' ? "text-amber-500" : 
          problem.status === 'building' ? "text-blueprint" : "text-emerald-500"
        )}>
          <span className={cn(
            "transition-all",
            isHovered ? "translate-x-[-2px]" : ""
          )}>
            View
          </span>
          <ArrowUpRight size={10} className={cn(
            "transition-all",
            isHovered ? "translate-x-[1px] translate-y-[-1px]" : ""
          )} />
        </div>
      </div>
      
      {/* Glowing border effect on hover */}
      {isHovered && (
        <div className={cn(
          "absolute inset-0 rounded-md pointer-events-none",
          problem.status === 'idea' ? "shadow-glow-amber" : 
          problem.status === 'building' ? "shadow-glow-blueprint" : "shadow-glow-emerald"
        )}></div>
      )}
    </div>
  );
}

function GridView({ 
  ideaProblems,
  buildingProblems,
  solvedProblems,
  onSelectProblem
}: {
  ideaProblems: Problem[];
  buildingProblems: Problem[];
  solvedProblems: Problem[];
  onSelectProblem: (problem: Problem) => void;
}) {
  return (
    <div className="grid gap-6">
      {/* Currently Building Section - Full Width and Highlighted */}
      {buildingProblems.length > 0 && (
        <div className="border-2 border-blueprint/30 rounded-xl overflow-hidden shadow-md">
          <div className="px-4 py-3 border-b bg-blueprint/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-blueprint"><Wrench size={20} /></div>
              <h3 className="font-medium text-lg">Currently Building Solutions</h3>
            </div>
            <div className="bg-blueprint/20 text-blueprint px-2.5 py-1 text-xs rounded-full font-medium">
              {buildingProblems.length} Active
            </div>
          </div>
          
          <div className="p-4 bg-blueprint-grid bg-[length:20px_20px] bg-opacity-[0.05]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {buildingProblems.map((problem) => (
                <Blueprint3DCard 
                  key={problem.id} 
                  problem={problem} 
                  onClick={() => onSelectProblem(problem)}
                  featured
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Ideas and Solved Problems - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ideas Section */}
        <BlueprintSection 
          title="Ideas"
          icon={<Lightbulb size={18} />}
          problems={ideaProblems}
          onSelectProblem={onSelectProblem}
          accentColor="text-amber-500"
        />
        
        {/* Problems Solved Section */}
        <BlueprintSection 
          title="Problems Solved"
          icon={<CheckCircle size={18} />}
          problems={solvedProblems}
          onSelectProblem={onSelectProblem}
          accentColor="text-emerald-500"
        />
      </div>
    </div>
  );
}

function BlueprintSection({
  title,
  icon,
  problems,
  onSelectProblem,
  accentColor,
  highlight = false
}: {
  title: string;
  icon: React.ReactNode;
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  accentColor: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn(
      "border rounded-xl overflow-hidden",
      highlight ? "border-blueprint/30 shadow-sm ring-1 ring-blueprint/10" : ""
    )}>
      {/* Section header */}
      <div className={cn(
        "px-4 py-3 border-b flex items-center justify-between relative",
        highlight ? "bg-blueprint/5" : "bg-muted/30"
      )}>
        <div className="flex items-center gap-2">
          <div className={cn(accentColor, "z-10")}>{icon}</div>
          <h3 className="font-medium z-10">{title}</h3>
          {/* Blueprint grid line decoration */}
          <div className={cn(
            "absolute left-12 right-0 h-px top-1/2 -translate-y-1/2 z-0",
            accentColor === "text-blueprint" ? "bg-blueprint/20" : 
            accentColor === "text-amber-500" ? "bg-amber-500/20" : "bg-emerald-500/20"
          )} style={{ 
            backgroundImage: 'linear-gradient(to right, currentColor 33%, transparent 0%)',
            backgroundSize: '8px 1px',
            backgroundPosition: 'left center',
            backgroundRepeat: 'repeat-x'
          }}></div>
        </div>
        <div className={cn(
          "px-2 py-0.5 text-xs rounded-full z-10",
          highlight ? "bg-blueprint/10 text-blueprint font-medium" : "bg-muted/80"
        )}>
          {problems.length}
        </div>
      </div>
      
      {/* Blueprint style content */}
      <div className="p-3 min-h-[300px] bg-blueprint-grid bg-[length:20px_20px] bg-opacity-[0.03]">
        {problems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            No problems in this category
          </div>
        ) : (
          <div className="space-y-3">
            {problems.map((problem) => (
              <Blueprint3DCard 
                key={problem.id} 
                problem={problem} 
                onClick={() => onSelectProblem(problem)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Blueprint3DCard({ 
  problem, 
  onClick,
  featured = false
}: { 
  problem: Problem; 
  onClick: () => void;
  featured?: boolean;
}) {
  return (
    <div 
      className={cn(
        "border rounded-lg bg-card transition-all cursor-pointer overflow-hidden group",
        problem.status === 'building' ? "border-l-2 border-l-blueprint" : "",
        featured 
          ? "shadow-lg hover:shadow-xl ring-1 ring-blueprint/20 hover:ring-blueprint/30" 
          : "shadow-sm hover:shadow-md"
      )}
      onClick={onClick}
      style={{
        transform: 'perspective(1000px) rotateX(2deg)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg)';
      }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm">{problem.title}</h4>
          <StatusBadge status={problem.status} />
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {problem.description}
        </p>
        
        {/* Progress bar for building problems */}
        {problem.status === 'building' && (
          <div className="mt-3 mb-4">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-blueprint relative origin-left"
                style={{ 
                  width: `${problem.progress}%`,
                  animation: 'pulse-gradient 2s ease-in-out infinite'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] font-medium text-blueprint">In Progress</span>
              <span className="text-[10px] text-muted-foreground font-medium">{problem.progress}%</span>
            </div>
          </div>
        )}
        
        {/* Tags */}
        <div className="flex gap-1 flex-wrap">
          {problem.tags.slice(0, 2).map(tag => (
            <span 
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded bg-muted/70 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {problem.tags.length > 2 && (
            <span className="text-[10px] text-muted-foreground self-center">
              +{problem.tags.length - 2}
            </span>
          )}
        </div>
        
        {/* Footer with date or view details */}
        <div className="mt-3 pt-2 border-t border-border/40 flex justify-between items-center">
          {problem.date && (
            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Calendar size={10} />
              {problem.date}
            </div>
          )}
          
          <div className="text-[10px] text-blueprint flex items-center gap-0.5 transition-all group-hover:translate-x-0.5">
            View details
            <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Problem['status'] }) {
  const statusInfo = {
    idea: {
      icon: <Lightbulb size={12} />,
      label: "Idea",
      color: "text-amber-500 bg-amber-500/10"
    },
    building: {
      icon: <Wrench size={12} />,
      label: "Building",
      color: "text-blueprint bg-blueprint/10"
    },
    solved: {
      icon: <CheckCircle size={12} />,
      label: "Solved",
      color: "text-emerald-500 bg-emerald-500/10"
    }
  };
  
  const info = statusInfo[status];
  
  return (
    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${info.color}`}>
      {info.icon}
      <span>{info.label}</span>
    </div>
  );
}

function ListView({ 
  ideaProblems,
  buildingProblems,
  solvedProblems,
  onSelectProblem
}: {
  ideaProblems: Problem[];
  buildingProblems: Problem[];
  solvedProblems: Problem[];
  onSelectProblem: (problem: Problem) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Active/building problems first */}
      {buildingProblems.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium mb-3 text-blueprint">
            <Wrench size={14} />
            Currently Building Solutions
          </h3>
          <div className="space-y-2">
            {buildingProblems.map(problem => (
              <ListItemCard 
                key={problem.id}
                problem={problem}
                onClick={() => onSelectProblem(problem)}
                highlight
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Solved problems */}
      {solvedProblems.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium mb-3 text-emerald-500">
            <CheckCircle size={14} />
            Problems Solved
          </h3>
          <div className="space-y-2">
            {solvedProblems.map(problem => (
              <ListItemCard 
                key={problem.id}
                problem={problem}
                onClick={() => onSelectProblem(problem)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Ideas */}
      {ideaProblems.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium mb-3 text-amber-500">
            <Lightbulb size={14} />
            Ideas & Future Solutions
          </h3>
          <div className="space-y-2">
            {ideaProblems.map(problem => (
              <ListItemCard 
                key={problem.id}
                problem={problem}
                onClick={() => onSelectProblem(problem)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Empty state */}
      {ideaProblems.length === 0 && buildingProblems.length === 0 && solvedProblems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No problems match your search criteria
        </div>
      )}
    </div>
  );
}

function ListItemCard({ 
  problem, 
  onClick,
  highlight = false
}: { 
  problem: Problem; 
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <div 
      className={cn(
        "flex items-center border rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors",
        highlight ? "border-l-2 border-l-blueprint bg-blueprint/[0.02]" : ""
      )}
      onClick={onClick}
    >
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm">{problem.title}</h4>
          <StatusBadge status={problem.status} />
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {problem.description}
        </p>
      </div>
      
      {/* Building progress */}
      {problem.status === 'building' && (
        <div className="ml-4 flex items-center gap-2">
          <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-blueprint"
              style={{ width: `${problem.progress}%` }}
            ></div>
          </div>
          <span className="text-xs">{problem.progress}%</span>
        </div>
      )}
      
      {/* Date for solved problems */}
      {problem.status === 'solved' && problem.date && (
        <div className="ml-4 text-xs text-muted-foreground flex items-center gap-1">
          <Calendar size={12} />
          {problem.date}
        </div>
      )}
      
      {/* Related problems indicator */}
      {problem.relatedProblems && problem.relatedProblems.length > 0 && (
        <div className="ml-2 px-1.5 py-0.5 rounded-full bg-muted/80 text-[10px] text-muted-foreground">
          {problem.relatedProblems.length} related
        </div>
      )}
      
      {/* View button */}
      <Button variant="ghost" size="sm" className="ml-2">
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}

function ProblemDetail({ 
  problem, 
  onClose,
  relatedProblems = [],
  onSelectRelated
}: { 
  problem: Problem; 
  onClose: () => void;
  relatedProblems?: Problem[];
  onSelectRelated: (problem: Problem) => void;
}) {
  return (
    <div>
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <StatusBadge status={problem.status} />
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted"
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-medium mb-4">{problem.title}</h2>
        
        {/* Problem details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">The Problem</h3>
            <p className="text-base">{problem.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">The Impact</h3>
            <p className="text-base">{problem.impact}</p>
          </div>
          
          {/* Progress section for in-progress problems */}
          {problem.status === 'building' && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Progress</h3>
              <div className="mt-2 space-y-2">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blueprint relative"
                    style={{ width: `${problem.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{problem.progress}%</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Tag size={14} />
                Tags
              </div>
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {problem.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2.5 py-1 rounded bg-muted text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Date */}
          {problem.date && (
            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar size={14} />
                {problem.status === 'solved' ? `Solved in ${problem.date}` : problem.date}
              </div>
            </div>
          )}
          
          {/* Related problems */}
          {relatedProblems.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <Workflow size={14} />
                Related Problems
              </h3>
              <div className="space-y-2 mt-2">
                {relatedProblems.map(related => (
                  <div 
                    key={related.id}
                    className="flex items-center gap-2 p-2 border border-dashed border-muted rounded hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onSelectRelated(related)}
                  >
                    <StatusBadge status={related.status} />
                    <span className="text-sm font-medium">{related.title}</span>
                    <ChevronRight size={14} className="ml-auto text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t flex justify-end">
        {problem.link ? (
          <Button 
            onClick={() => window.open(problem.link, '_blank')} 
            className="flex items-center gap-2"
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

// Simple icons for view toggle
function GridIcon(props: any) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function ListIcon(props: any) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}