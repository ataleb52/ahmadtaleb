import React from 'react';
import { cn } from '@/lib/utils';
import { Problem } from '@/types/problem';
import {
  Lightbulb,
  Wrench,
  CheckCircle,
  PlusCircle,
  ArrowRight,
  CornerDownRight
} from 'lucide-react';

type ProblemJourneyProps = {
  buildingProblems: Problem[];
  hasAnimated: boolean;
  onSubmitRequest: () => void;
  highlightedSection: 'idea' | 'building' | 'solved' | null;
  onHighlightSection: (section: 'idea' | 'building' | 'solved' | null) => void;
};

export function ProblemJourney({
  buildingProblems,
  hasAnimated,
  onSubmitRequest,
  highlightedSection,
  onHighlightSection
}: ProblemJourneyProps) {
  // Get the most advanced problem in progress
  const activeProblem = buildingProblems.length > 0
    ? buildingProblems.reduce((prev, current) => 
        prev.progress > current.progress ? prev : current, buildingProblems[0])
    : null;
    
  const progressPercent = activeProblem ? activeProblem.progress : 33;
  
  // Animation delay classes
  const getAnimationClass = (index: number) => {
    if (!hasAnimated) return "opacity-0";
    return `animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both delay-${index * 200}`;
  };
  
  return (
    <div className="pb-8">
      <h2 className={cn(
        "text-xl md:text-2xl font-semibold mb-8 text-center",
        getAnimationClass(1)
      )}>
        The Journey from Problems to Solutions
      </h2>
      
      {/* Visual journey path with focused problem highlight */}
      <div className={cn("relative mb-12", getAnimationClass(2))}>
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 h-24 w-px border-l-2 border-dashed border-blueprint/30"></div>
        
        {/* Main horizontal timeline */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative h-2 w-4/5 max-w-4xl bg-muted rounded-full overflow-hidden">
            {/* Completed progress fill */}
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-500 via-blueprint to-emerald-500 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
            
            {/* Journey markers */}
            <button
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-950 rounded-full z-10 transform -translate-x-1/2 border-2 transition-all duration-200",
                highlightedSection === 'idea' ? "border-amber-500 ring-4 ring-amber-200/30 scale-110" : "border-amber-500"
              )}
              onClick={() => onHighlightSection(highlightedSection === 'idea' ? null : 'idea')}
              onMouseEnter={() => onHighlightSection('idea')}
              onMouseLeave={() => onHighlightSection(null)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Lightbulb size={16} className="text-amber-500" />
              </div>
              <div className="absolute top-10 whitespace-nowrap text-xs font-medium text-amber-600 dark:text-amber-400">
                Problem Identification
              </div>
            </button>
            
            <button
              className={cn(
                "absolute left-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-950 rounded-full z-10 transform -translate-x-1/2 border-2 transition-all duration-200",
                highlightedSection === 'building' ? "border-blueprint ring-4 ring-blueprint/30 scale-110" : "border-blueprint"
              )}
              onClick={() => onHighlightSection(highlightedSection === 'building' ? null : 'building')}
              onMouseEnter={() => onHighlightSection('building')}
              onMouseLeave={() => onHighlightSection(null)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Wrench size={16} className="text-blueprint" />
              </div>
              <div className="absolute top-10 whitespace-nowrap text-xs font-medium text-blueprint">
                Building Solutions
              </div>
            </button>
            
            <button
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-950 rounded-full z-10 transform translate-x-1/2 border-2 transition-all duration-200",
                highlightedSection === 'solved' ? "border-emerald-500 ring-4 ring-emerald-200/30 scale-110" : "border-emerald-500"
              )}
              onClick={() => onHighlightSection(highlightedSection === 'solved' ? null : 'solved')}
              onMouseEnter={() => onHighlightSection('solved')}
              onMouseLeave={() => onHighlightSection(null)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle size={16} className="text-emerald-500" />
              </div>
              <div className="absolute top-10 whitespace-nowrap text-xs font-medium text-emerald-500">
                Solutions Delivered
              </div>
            </button>
          </div>
        </div>
        
        {/* Current focus callout */}
        {activeProblem && (
          <div className={cn(
            "bg-white dark:bg-slate-900 border border-blueprint/20 rounded-lg p-4 max-w-lg mx-auto shadow-md relative z-10",
            getAnimationClass(3)
          )}>
            <div className="flex items-start gap-4">
              <div className="bg-blueprint/10 p-2 rounded-full">
                <Wrench size={20} className="text-blueprint" />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-medium text-lg mb-1">Currently Working On</h3>
                <p className="text-sm text-muted-foreground">{activeProblem.title}</p>
                
                {/* Stage indicator */}
                <div className="mt-3">
                  {activeProblem.progress <= 25 ? (
                    <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">Research</span>
                  ) : activeProblem.progress <= 50 ? (
                    <span className="text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded">Planning</span>
                  ) : activeProblem.progress <= 75 ? (
                    <span className="text-xs font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-1 rounded">Building</span>
                  ) : (
                    <span className="text-xs font-medium bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-300 px-2 py-1 rounded">Testing</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Submit your own problem prompt */}
      <div className={cn(
        "text-center max-w-lg mx-auto",
        getAnimationClass(4)
      )}>
        <p className="text-sm text-muted-foreground">
          <span className="inline-block animation-float">👋</span> This is my solution blueprint—see what I'm tackling and what's been solved.
          <button 
            onClick={onSubmitRequest}
            className="text-purple-500 hover:text-purple-700 font-medium transition-colors ml-1 inline-flex items-center gap-1 group"
          >
            Got a challenge for me?
            <CornerDownRight size={14} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </button>
        </p>
      </div>
    </div>
  );
}
