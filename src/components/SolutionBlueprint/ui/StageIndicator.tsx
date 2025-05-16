import React from 'react';
import { cn } from '@/lib/utils';

type StageIndicatorProps = {
  progress: number;
};

export function StageIndicator({ progress }: StageIndicatorProps) {
  // Define stages
  const stages = [
    { name: 'Research', threshold: 25 },
    { name: 'Planning', threshold: 50 },
    { name: 'Building', threshold: 75 },
    { name: 'Testing', threshold: 100 }
  ];
  
  // Find current stage
  const currentStage = stages.find((stage, index) => {
    return progress <= stage.threshold || index === stages.length - 1;
  }) || stages[2]; // Default to Building if something goes wrong
  
  // Find stage index (0-based)
  const currentIndex = stages.findIndex(stage => stage.name === currentStage?.name);
  const nextStage = currentIndex < stages.length - 1 ? stages[currentIndex + 1].name : null;

  return (
    <>
      {/* Stage progress dots */}
      <div className="flex items-center justify-between mb-2">
        {stages.map((stage, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={cn(
              "w-2.5 h-2.5 rounded-full",
              index <= currentIndex 
                ? "bg-blueprint" 
                : "bg-muted"
            )}></div>
            {index < stages.length - 1 && (
              <div className={cn(
                "h-px w-10 sm:w-14 md:w-16",
                index < currentIndex 
                  ? "bg-blueprint" 
                  : "bg-muted"
              )}></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Current stage label */}
      <div className="flex justify-between items-center text-[10px]">
        <div className="font-medium text-blueprint">
          {currentStage.name} <span className="text-muted-foreground">stage</span>
        </div>
        
        {nextStage && (
          <div className="text-muted-foreground">
            Next: {nextStage}
          </div>
        )}
      </div>
    </>
  );
}
