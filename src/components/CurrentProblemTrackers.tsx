import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

// Option 3: Minimalist Blueprint Status Pill
export function CurrentSolvingPill() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative inline-block">
      <div 
        className={cn(
          "bg-background border border-border rounded-full transition-all duration-300 overflow-hidden cursor-pointer",
          isExpanded ? "w-full sm:max-w-md" : "w-auto max-w-[200px] sm:max-w-[240px]"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Collapsed view */}
        <div className="flex items-center p-1.5 pl-2">
          <div className="h-2 w-2 rounded-full bg-blueprint animate-pulse mr-2"></div>
          
          {/* Always visible content */}
          <div className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis mr-1">
            Currently working on: Project title
          </div>
          
          {/* Expanded content */}
          {isExpanded && (
            <div className="flex flex-wrap items-center ml-2 pl-2 border-l border-border">
              <div className="mr-4 mb-1 sm:mb-0">
                <div className="text-xs text-muted-foreground">Context</div>
                <div className="text-xs font-medium">Project context</div>
              </div>
              
              <div className="mr-4 mb-1 sm:mb-0">
                <div className="text-xs text-muted-foreground">Status</div>
                <div className="text-xs font-medium">In progress</div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground">Type</div>
                <div className="text-xs font-medium">Development</div>
              </div>
            </div>
          )}
          
          {/* Expansion toggle */}
          <div className="ml-auto pl-1">
            <svg 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Detail panel that appears below when expanded */}
      {isExpanded && (
        <div className="flex flex-col sm:flex-row justify-between mt-2 text-left">
          <span className="text-xs text-muted-foreground mb-1 sm:mb-0">
            Last updated: Recently
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs h-6 self-start sm:self-auto"
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to project details
            }}
          >
            More details →
          </Button>
        </div>
      )}
    </div>
  );
}

