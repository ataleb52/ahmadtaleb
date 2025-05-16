import React from 'react';
import { cn } from '@/lib/utils';
import { Problem } from '@/types/problem';
import { StatusBadge } from './StatusBadge';
import { StageIndicator } from './StageIndicator';
import { Calendar, ChevronRight } from 'lucide-react';

type CardProps = {
  problem: Problem;
  onClick: () => void;
  featured?: boolean;
};

export function Card({ problem, onClick, featured = false }: CardProps) {
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      className={cn(
        "border rounded-lg bg-card transition-all cursor-pointer overflow-hidden relative group",
        problem.status === 'building' ? "border-l-2 border-l-blueprint" : "",
        featured 
          ? "shadow-lg hover:shadow-xl ring-1 ring-blueprint/20 hover:ring-blueprint/30" 
          : "shadow-sm hover:shadow-md"
      )}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'translateZ(10px)' : ''}`,
        transition: 'all 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
    >
      {/* Light reflection effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none transition-opacity duration-500",
          isHovered ? "opacity-10" : ""
        )} 
      />
      
      <div className="p-4 relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm">{problem.title}</h4>
          <StatusBadge status={problem.status} />
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {problem.description}
        </p>
        
        {/* Stage indicator for building problems */}
        {problem.status === 'building' && (
          <div className="mt-3 mb-4">
            <StageIndicator progress={problem.progress} />
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
          
          <div className={cn(
            "text-[10px] text-blueprint flex items-center gap-0.5 transition-all duration-300",
            isHovered ? "translate-x-1" : ""
          )}>
            View details
            <ChevronRight size={12} className={cn(
              "transition-transform duration-300",
              isHovered ? "translate-x-1" : ""
            )} />
          </div>
        </div>
      </div>
      
      {/* Blueprint corner decoration */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-6 h-6 transform rotate-45 translate-x-3 -translate-y-3 bg-blueprint opacity-10"></div>
      </div>
    </div>
  );
}
