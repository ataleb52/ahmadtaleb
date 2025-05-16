import React from 'react';
import { cn } from '@/lib/utils';
import { Problem } from '@/types/problem';
import { Button } from '@/components/ui/button';
import { Lightbulb, Wrench, CheckCircle, ChevronRight, Calendar } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';

type ProblemListProps = {
  ideaProblems: Problem[];
  buildingProblems: Problem[];
  solvedProblems: Problem[];
  onSelectProblem: (problem: Problem) => void;
};

export function ProblemList({
  ideaProblems,
  buildingProblems,
  solvedProblems,
  onSelectProblem
}: ProblemListProps) {
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
  // Get stage info for building problems
  const getStage = (progress: number): string => {
    if (progress <= 25) return 'Research';
    if (progress <= 50) return 'Planning';
    if (progress <= 75) return 'Building';
    return 'Testing';
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={cn(
        "flex items-center border rounded-lg p-3 cursor-pointer hover:bg-muted/30 transition-colors",
        highlight ? "border-l-2 border-l-blueprint bg-blueprint/[0.02]" : ""
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      
      {/* Building stage indicator */}
      {problem.status === 'building' && (
        <div className="ml-4 flex items-center gap-1">
          <div className="px-1.5 py-0.5 bg-blueprint/10 text-blueprint rounded-md text-xs">
            {getStage(problem.progress)}
          </div>
        </div>
      )}
      
      {/* Date for solved problems */}
      {problem.status === 'solved' && problem.date && (
        <div className="ml-4 text-xs text-muted-foreground flex items-center gap-1">
          <Calendar size={12} />
          {problem.date}
        </div>
      )}
      
      {/* View button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className={cn(
          "ml-4 transition-transform duration-300",
          isHovered ? "translate-x-1" : ""
        )}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
