import React from 'react';
import { cn } from '@/lib/utils';
import { Problem } from '@/types/problem';
import { Card } from './Card';

type BlueprintSectionProps = {
  title: string;
  icon: React.ReactNode;
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  accentColor: string;
  highlight?: boolean;
};

export function BlueprintSection({
  title,
  icon,
  problems,
  onSelectProblem,
  accentColor,
  highlight = false
}: BlueprintSectionProps) {
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
              <Card 
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
