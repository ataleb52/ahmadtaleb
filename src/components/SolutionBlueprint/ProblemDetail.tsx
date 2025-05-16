import React from 'react';
import { Problem } from '@/types/problem';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, ExternalLink, Tag, Calendar, Lightbulb, Wrench } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';
import { cn } from '@/lib/utils';

type ProblemDetailProps = {
  problem: Problem;
  onClose: () => void;
  onSubmitRequest?: () => void;
};

export function ProblemDetail({ 
  problem, 
  onClose,
  onSubmitRequest
}: ProblemDetailProps) {
  // Define stages with their descriptions
  const buildingStages = [
    { name: 'Research', desc: 'Exploring the problem space and gathering insights' },
    { name: 'Planning', desc: 'Developing solution strategies and setting objectives' },
    { name: 'Building', desc: 'Creating and implementing the core solution' },
    { name: 'Testing', desc: 'Validating and refining the solution' }
  ];
  
  // Determine current stage
  const getCurrentStageIndex = (progress: number): number => {
    if (progress <= 25) return 0;
    if (progress <= 50) return 1;
    if (progress <= 75) return 2;
    return 3;
  };

  const currentStageIndex = problem.status === 'building' 
    ? getCurrentStageIndex(problem.progress)
    : -1;

  const statusInfo = {
    idea: {
      title: "On the Radar",
      icon: <Lightbulb className="text-muted-foreground" />,
      color: "text-muted-foreground",
      bgColor: "bg-muted/50",
      description: "This problem has been identified and I'm planning to tackle it soon."
    },
    building: {
      title: "Currently Building",
      icon: <Wrench className="text-blueprint" />,
      color: "text-blueprint",
      bgColor: "bg-blueprint/10",
      description: "This solution is being actively worked on right now."
    },
    solved: {
      title: "Solved & Delivered",
      icon: <CheckCircle className="text-emerald-500" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      description: "This problem has been successfully solved."
    }
  };
  
  const status = statusInfo[problem.status];

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
          
          {/* Progress section for in-progress problems - UPDATED */}
          {problem.status === 'building' && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Solution Progress</h3>
              
              {/* Timeline style progress */}
              <div className="mt-4 space-y-4">
                {buildingStages.map((stage, index) => {
                  const isCompleted = index < currentStageIndex;
                  const isCurrent = index === currentStageIndex;
                  const isUpcoming = index > currentStageIndex;
                  
                  return (
                    <div 
                      key={stage.name}
                      className={cn(
                        "flex items-start gap-3 pb-4",
                        index < buildingStages.length - 1 ? "border-l border-dashed ml-[7px]" : "",
                        isCompleted ? "border-blueprint/50" : "border-muted"
                      )}
                    >
                      <div className={cn(
                        "w-3.5 h-3.5 rounded-full mt-0.5 flex-shrink-0 -ml-[7px]",
                        isCompleted ? "bg-blueprint" : 
                        isCurrent ? "bg-white dark:bg-slate-950 ring-2 ring-blueprint" :
                        "bg-muted"
                      )}></div>
                      
                      <div className={cn(
                        "flex-1",
                        isUpcoming ? "opacity-50" : ""
                      )}>
                        <h4 className={cn(
                          "text-sm font-medium",
                          isCurrent ? "text-blueprint" : ""
                        )}>
                          {stage.name} {isCurrent && <span className="text-xs text-blueprint font-normal italic ml-1">(current)</span>}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t flex justify-between">
        {onSubmitRequest && (
          <Button
            variant="ghost"
            onClick={onSubmitRequest}
            className="text-purple-500 hover:text-purple-600 hover:bg-purple-50"
          >
            Submit a challenge
          </Button>
        )}
        
        <div className="ml-auto">
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
    </div>
  );
}
