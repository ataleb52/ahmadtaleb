import React from 'react';
import { cn } from '@/lib/utils';
import { Problem } from '@/types/problem';
import { Card } from './ui/Card';
import { BlueprintSection } from './ui/BlueprintSection';
import { Lightbulb, Wrench, CheckCircle } from 'lucide-react';

type ProblemGridProps = {
  ideaProblems: Problem[];
  buildingProblems: Problem[];
  solvedProblems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  highlightedSection: 'idea' | 'building' | 'solved' | null;
  onHighlightSection: (section: 'idea' | 'building' | 'solved' | null) => void;
};

export function ProblemGrid({
  ideaProblems,
  buildingProblems,
  solvedProblems,
  onSelectProblem,
  highlightedSection,
  onHighlightSection
}: ProblemGridProps) {
  return (
    <div className="grid gap-8">
      {/* Currently Building Section - Full Width and Highlighted */}
      <div 
        className={cn(
          "transition-all duration-500 ease-in-out",
          highlightedSection === null || highlightedSection === 'building' 
            ? "opacity-100 scale-100" 
            : "opacity-60 scale-98"
        )}
        onMouseEnter={() => onHighlightSection('building')}
        onMouseLeave={() => onHighlightSection(null)}
      >
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
                  <Card 
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
      </div>
      
      {/* Ideas and Solved Problems - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ideas Section */}
        <div
          className={cn(
            "transition-all duration-500 ease-in-out",
            highlightedSection === null || highlightedSection === 'idea' 
              ? "opacity-100 scale-100" 
              : "opacity-60 scale-98"
          )}
          onMouseEnter={() => onHighlightSection('idea')}
          onMouseLeave={() => onHighlightSection(null)}
        >
          <BlueprintSection 
            title="Ideas & Future Focus"
            icon={<Lightbulb size={18} />}
            problems={ideaProblems}
            onSelectProblem={onSelectProblem}
            accentColor="text-amber-500"
          />
        </div>
        
        {/* Problems Solved Section */}
        <div
          className={cn(
            "transition-all duration-500 ease-in-out",
            highlightedSection === null || highlightedSection === 'solved' 
              ? "opacity-100 scale-100" 
              : "opacity-60 scale-98"
          )}
          onMouseEnter={() => onHighlightSection('solved')}
          onMouseLeave={() => onHighlightSection(null)}
        >
          <BlueprintSection 
            title="Problems Solved"
            icon={<CheckCircle size={18} />}
            problems={solvedProblems}
            onSelectProblem={onSelectProblem}
            accentColor="text-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
