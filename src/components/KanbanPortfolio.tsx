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
import { motion, AnimatePresence } from 'framer-motion';

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
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeStage, setActiveStage] = useState<'idea' | 'building' | 'solved' | null>(null);
  
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
  const allTags = Array.from(new Set(problems.flatMap(p => p.tags))).sort();
  
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

  return (
    <div className="w-full relative">
      {/* Simplified onboarding overlay - now more story-driven */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div 
            className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-card rounded-xl border shadow-xl max-w-lg w-full p-8 relative"
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blueprint to-blue-500 flex items-center justify-center shadow-lg shadow-blueprint/20">
                  <Sparkles className="text-white" size={32} />
                </div>
              </div>
              
              <h3 className="text-2xl font-heading text-center mb-6 mt-4">How I Solve Problems</h3>
              
              <p className="text-center text-muted-foreground mb-8">
                Take a journey through my problem-solving process — from ideas to finished solutions.
              </p>
              
              <div className="flex flex-col items-center justify-center space-y-3 mb-8">
                <div className="flex items-center justify-center w-full">
                  <div className="w-full max-w-[280px] bg-card border border-dashed rounded-xl p-3 flex flex-col items-center">
                    <div className="mt-2 mb-3 space-y-4 w-full">
                      {/* The visual journey map */}
                      <div className="flex items-center justify-between w-full px-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <Lightbulb size={18} className="text-amber-500" />
                          </div>
                          <span className="text-xs font-medium mt-1">Ideas</span>
                        </div>
                        
                        <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500/50 to-blueprint/50"></div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-blueprint/20 flex items-center justify-center">
                            <Wrench size={18} className="text-blueprint" />
                          </div>
                          <span className="text-xs font-medium mt-1">Building</span>
                        </div>
                        
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blueprint/50 to-emerald-500/50"></div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle size={18} className="text-emerald-500" />
                          </div>
                          <span className="text-xs font-medium mt-1">Solved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <Button 
                  size="lg"
                  onClick={() => setShowOnboarding(false)}
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10">Explore My Solutions</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blueprint to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplified search and filter bar */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex-grow max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-blueprint/50"
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
        </div>
        
        {/* Filter tags dropdown */}
        <div className="relative ml-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Tag size={14} />
            <span>
              {filterTag ? filterTag : 'All solutions'}
            </span>
            <ChevronDown size={14} className="ml-1" />
          </Button>
          
          {/* Show filter indicator */}
          {filterTag && (
            <button
              onClick={() => setFilterTag(null)}
              className="ml-2 text-xs text-blueprint flex items-center gap-1 hover:underline"
            >
              <X size={10} />
              Clear filter
            </button>
          )}
        </div>
        
        {/* Help button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowOnboarding(true)}
          className="w-8 h-8 rounded-full"
          aria-label="How to use this blueprint"
        >
          <Info size={16} />
        </Button>
      </div>
      
      {/* Simplified, story-driven solution journey */}
      <div className="relative bg-blueprint-grid bg-[length:30px_30px] bg-opacity-[0.02] border rounded-xl p-5 md:p-8 overflow-hidden">
        {/* Story header with a clear explanation */}
        <div className="mb-8">
          <h3 className="text-xl font-heading mb-2">Solution Blueprint</h3>
          <p className="text-muted-foreground">
            My approach to solving complex problems, from initial ideas to complete solutions.
          </p>
        </div>
        
        {/* Visual journey map */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center justify-between w-full max-w-2xl">
            <StageButton 
              icon={<Lightbulb size={24} />}
              label="Ideas"
              color="amber"
              count={ideaProblems.length}
              active={activeStage === 'idea'}
              onClick={() => setActiveStage(activeStage === 'idea' ? null : 'idea')}
            />
            
            <div className="w-full max-w-[100px] h-0.5 bg-gradient-to-r from-amber-500/30 to-blueprint/30"></div>
            
            <StageButton 
              icon={<Wrench size={24} />}
              label="Building"
              color="blueprint"
              count={buildingProblems.length}
              active={activeStage === 'building'}
              onClick={() => setActiveStage(activeStage === 'building' ? null : 'building')}
            />
            
            <div className="w-full max-w-[100px] h-0.5 bg-gradient-to-r from-blueprint/30 to-emerald-500/30"></div>
            
            <StageButton 
              icon={<CheckCircle size={24} />}
              label="Solved"
              color="emerald"
              count={solvedProblems.length}
              active={activeStage === 'solved'}
              onClick={() => setActiveStage(activeStage === 'solved' ? null : 'solved')}
            />
          </div>
        </div>
        
        {/* Problem cards section */}
        <AnimatePresence mode="wait">
          {activeStage === null ? (
            // Show all problems grouped by stage when no stage is selected
            <motion.div
              key="all-stages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <StageColumn 
                title="Ideas"
                icon={<Lightbulb size={18} className="text-amber-500" />}
                color="amber"
                problems={ideaProblems}
                onSelectProblem={setSelectedProblem}
                emptyStageLine="Problems I'm thinking about"
              />
              
              <StageColumn 
                title="Building"
                icon={<Wrench size={18} className="text-blueprint" />}
                color="blueprint"
                problems={buildingProblems}
                onSelectProblem={setSelectedProblem}
                emptyStageLine="Solutions in progress"
              />
              
              <StageColumn 
                title="Solved"
                icon={<CheckCircle size={18} className="text-emerald-500" />}
                color="emerald"
                problems={solvedProblems}
                onSelectProblem={setSelectedProblem}
                emptyStageLine="Problems I've solved"
              />
            </motion.div>
          ) : (
            // Show only the selected stage with more details
            <motion.div
              key={`stage-${activeStage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <ExpandedStage 
                stage={activeStage}
                problems={
                  activeStage === 'idea' ? ideaProblems : 
                  activeStage === 'building' ? buildingProblems : solvedProblems
                }
                onSelectProblem={setSelectedProblem}
                onBack={() => setActiveStage(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      
        {/* Empty state */}
        {filteredProblems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-muted-foreground/70" />
            </div>
            <p className="mb-2">No solutions match your search</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your filters</p>
            {searchQuery && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Problem detail overlay */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              ref={detailRef}
              className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <ProblemDetail 
                problem={selectedProblem} 
                onClose={() => setSelectedProblem(null)} 
                relatedProblems={getRelatedProblems(selectedProblem.id)}
                onSelectRelated={(problem) => setSelectedProblem(problem)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Button to toggle between stages
function StageButton({ 
  icon, 
  label, 
  color, 
  count, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  color: 'amber' | 'blueprint' | 'emerald'; 
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  const bgColor = {
    amber: active ? 'bg-amber-500' : 'bg-amber-500/20',
    blueprint: active ? 'bg-blueprint' : 'bg-blueprint/20',
    emerald: active ? 'bg-emerald-500' : 'bg-emerald-500/20'
  }[color];
  
  const textColor = {
    amber: active ? 'text-white' : 'text-amber-500',
    blueprint: active ? 'text-white' : 'text-blueprint',
    emerald: active ? 'text-white' : 'text-emerald-500'
  }[color];
  
  const borderColor = {
    amber: active ? 'border-amber-500' : 'border-transparent',
    blueprint: active ? 'border-blueprint' : 'border-transparent',
    emerald: active ? 'border-emerald-500' : 'border-transparent'
  }[color];

  return (
    <motion.button
      className={cn(
        "flex flex-col items-center p-3 md:p-4 rounded-xl transition-all border-2",
        bgColor,
        textColor,
        borderColor,
        "hover:scale-105",
        active ? "shadow-lg" : ""
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon}
      <span className="font-medium text-sm mt-1">{label}</span>
      <span className={cn(
        "text-xs px-2 py-0.5 rounded-full mt-1",
        active ? "bg-white/20" : "bg-background"
      )}>
        {count}
      </span>
    </motion.button>
  );
}

// Column for each problem stage
function StageColumn({ 
  title,
  icon,
  color,
  problems,
  onSelectProblem,
  emptyStageLine
}: { 
  title: string;
  icon: React.ReactNode;
  color: 'amber' | 'blueprint' | 'emerald';
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  emptyStageLine: string;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      
      <div className={cn(
        "flex-grow bg-card rounded-lg border border-dashed p-3 overflow-y-auto",
        color === 'amber' ? "border-amber-500/30" :
        color === 'blueprint' ? "border-blueprint/30" : "border-emerald-500/30"
      )}>
        {problems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-center p-4">
            <p className="text-sm">{emptyStageLine}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {problems.map(problem => (
              <SolutionCard 
                key={problem.id}
                problem={problem}
                color={color}
                onClick={() => onSelectProblem(problem)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Expanded view when a stage is selected
function ExpandedStage({ 
  stage,
  problems,
  onSelectProblem,
  onBack
}: { 
  stage: 'idea' | 'building' | 'solved';
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  onBack: () => void;
}) {
  const stageInfo = {
    idea: {
      title: "Ideas & Insights",
      description: "Problems I've identified that need solutions.",
      icon: <Lightbulb size={24} className="text-amber-500" />,
      color: "amber",
      emptyMessage: "I'm currently exploring new problem spaces."
    },
    building: {
      title: "Currently Building",
      description: "Solutions I'm actively working on.",
      icon: <Wrench size={24} className="text-blueprint" />,
      color: "blueprint",
      emptyMessage: "No solutions in progress right now."
    },
    solved: {
      title: "Problems Solved",
      description: "Completed solutions with measurable results.",
      icon: <CheckCircle size={24} className="text-emerald-500" />,
      color: "emerald",
      emptyMessage: "Check back soon for solved problems."
    }
  }[stage];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-background flex items-center justify-center border shadow-sm hover:bg-muted"
        >
          <ArrowRight size={16} className="rotate-180" />
        </button>
        
        <div>
          <div className="flex items-center gap-2">
            {stageInfo.icon}
            <h3 className="text-xl font-medium">{stageInfo.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{stageInfo.description}</p>
        </div>
      </div>
      
      {problems.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-muted-foreground bg-card rounded-lg border p-8">
          <p>{stageInfo.emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map(problem => (
            <DetailedSolutionCard 
              key={problem.id}
              problem={problem}
              color={stageInfo.color as 'amber' | 'blueprint' | 'emerald'}
              onClick={() => onSelectProblem(problem)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Simple card for the solutions in the stage columns
function SolutionCard({ 
  problem, 
  color,
  onClick,
}: { 
  problem: Problem; 
  color: 'amber' | 'blueprint' | 'emerald';
  onClick: () => void;
}) {
  return (
    <motion.div 
      className={cn(
        "border bg-card rounded-md p-3 cursor-pointer hover:shadow-md transition-all",
        color === 'amber' ? "hover:border-amber-500/40" :
        color === 'blueprint' ? "hover:border-blueprint/40" : "hover:border-emerald-500/40"
      )}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <h4 className="font-medium text-sm mb-1">{problem.title}</h4>
      
      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
        {problem.description}
      </p>
      
      {/* Progress bar for building problems */}
      {color === 'blueprint' && (
        <div className="h-1 w-full bg-muted rounded-full overflow-hidden mb-2">
          <motion.div 
            className="h-full bg-blueprint"
            style={{ width: `${problem.progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${problem.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        {/* For solved problems, show the date */}
        {problem.date && (
          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Calendar size={10} />
            {problem.date}
          </div>
        )}
        
        <div className={cn(
          "ml-auto text-[10px] flex items-center gap-0.5",
          color === 'amber' ? "text-amber-500" :
          color === 'blueprint' ? "text-blueprint" : "text-emerald-500"
        )}>
          Details
          <ChevronRight size={10} />
        </div>
      </div>
    </motion.div>
  );
}

// More detailed card for the expanded stage view
function DetailedSolutionCard({ 
  problem, 
  color,
  onClick,
}: { 
  problem: Problem; 
  color: 'amber' | 'blueprint' | 'emerald';
  onClick: () => void;
}) {
  const gradientBg = {
    amber: "bg-gradient-to-br from-amber-50 to-transparent",
    blueprint: "bg-gradient-to-br from-blueprint/5 to-transparent",
    emerald: "bg-gradient-to-br from-emerald-50 to-transparent"
  }[color];

  return (
    <motion.div 
      className={cn(
        "border bg-card rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all overflow-hidden relative",
        gradientBg
      )}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        color === 'amber' ? "bg-amber-500" :
        color === 'blueprint' ? "bg-blueprint" : "bg-emerald-500"
      )} />
      
      <div className="mb-3">
        <h4 className="font-medium mb-2">{problem.title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {problem.description}
        </p>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {problem.tags.map(tag => (
          <span 
            key={tag} 
            className="text-[10px] px-2 py-1 rounded-full bg-muted text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Progress bar for building problems */}
      {color === 'blueprint' && (
        <div className="mb-3">
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blueprint relative"
              style={{ width: `${problem.progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${problem.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[pulse_2s_ease-in-out_infinite]"></div>
            </motion.div>
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-muted-foreground">In Progress</span>
            <span className="text-xs font-medium">{problem.progress}%</span>
          </div>
        </div>
      )}
      
      {/* Impact preview */}
      <div className="text-xs border-t pt-2 mt-2">
        <span className="text-muted-foreground">Impact: </span>
        <span className="line-clamp-1">{problem.impact}</span>
      </div>
      
      {/* Footer with date or link */}
      <div className="flex justify-between items-center mt-3">
        {problem.date && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar size={12} />
            {problem.date}
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "p-0 h-auto text-xs gap-1",
            color === 'amber' ? "text-amber-500 hover:text-amber-600" :
            color === 'blueprint' ? "text-blueprint hover:text-blueprint/80" : 
            "text-emerald-500 hover:text-emerald-600"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View details
          <ArrowRight size={12} />
        </Button>
      </div>
    </motion.div>
  );
}

// Problem detail modal - more story-driven
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
  const statusInfo = {
    idea: {
      icon: <Lightbulb size={18} />,
      color: "text-amber-500 bg-amber-500/10",
      label: "Idea",
      description: "A problem I've identified that needs a solution."
    },
    building: {
      icon: <Wrench size={18} />,
      color: "text-blueprint bg-blueprint/10",
      label: "Building",
      description: "A solution I'm actively developing."
    },
    solved: {
      icon: <CheckCircle size={18} />,
      color: "text-emerald-500 bg-emerald-500/10",
      label: "Solved",
      description: "A completed solution with measurable results."
    }
  }[problem.status];

  return (
    <div>
      {/* Header with status and close button */}
      <div className="flex justify-between items-center p-6 border-b">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${statusInfo.color}`}>
          {statusInfo.icon}
          <span>{statusInfo.label}</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="p-6">
        <h2 className="text-2xl font-heading mb-1">{problem.title}</h2>
        <p className="text-sm text-muted-foreground mb-6">{statusInfo.description}</p>
        
        {/* Problem explanation */}
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-4 border">
            <h3 className="font-medium mb-2">The Problem</h3>
            <p>{problem.description}</p>
          </div>
          
          <div className="bg-blueprint/5 rounded-lg p-4 border">
            <h3 className="font-medium mb-2">The Impact</h3>
            <p>{problem.impact}</p>
          </div>
          
          {/* Progress visualization for in-progress problems */}
          {problem.status === 'building' && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Current Progress</h3>
              <div className="bg-card rounded-lg border p-4">
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blueprint relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${problem.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </motion.div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Status: In progress</span>
                  <span className="text-sm font-medium">{problem.progress}% complete</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Additional details section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tags */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <Tag size={14} />
              Related Categories
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {problem.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-muted text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Date or completion */}
          <div>
            {problem.date && (
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <Calendar size={14} />
                  {problem.status === 'solved' ? 'Completed' : 'Timeframe'}
                </h3>
                <p className="text-sm">{problem.date}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Related problems */}
        {relatedProblems.length > 0 && (
          <div className="mt-8">
            <h3 className="font-medium mb-3 flex items-center gap-1.5">
              <Workflow size={16} />
              Connected Solutions
            </h3>
            <div className="space-y-2">
              {relatedProblems.map(related => (
                <motion.button
                  key={related.id}
                  className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors text-left"
                  onClick={() => onSelectRelated(related)}
                  whileHover={{ x: 3 }}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    related.status === 'idea' ? "bg-amber-500/20" :
                    related.status === 'building' ? "bg-blueprint/20" : "bg-emerald-500/20"
                  )}>
                    {related.status === 'idea' ? <Lightbulb size={16} className="text-amber-500" /> :
                     related.status === 'building' ? <Wrench size={16} className="text-blueprint" /> : 
                     <CheckCircle size={16} className="text-emerald-500" />}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-sm">{related.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{related.description}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with action button */}
      <div className="p-6 border-t flex justify-end">
        {problem.link ? (
          <Button 
            onClick={() => window.open(problem.link, '_blank')} 
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