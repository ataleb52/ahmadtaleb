import React from 'react';

type WorkshopToolsProps = {
  onToggleExpand: () => void;
  isExpanded: boolean;
  onMeasure: () => void;
  onZoomPreset: (preset: string) => void;
  activeTool: string | null;
};

export function WorkshopTools({ 
  onToggleExpand, 
  isExpanded, 
  onMeasure, 
  onZoomPreset,
  activeTool 
}: WorkshopToolsProps) {
  return (
    <div className="absolute top-16 left-4 z-10 flex flex-col gap-2">
      <div 
        className={`workshop-tool ${isExpanded ? 'active' : ''}`}
        onClick={onToggleExpand}
        title={isExpanded ? "Collapse components" : "Explode components"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m12 3-4 4h3v14h2V7h3Z" />
          <path d="m2 17 4 4v-3h11v-2H6v-3Z" />
        </svg>
        <span className="text-xs">{isExpanded ? "Collapse" : "Explode"}</span>
      </div>
      
      <div 
        className={`workshop-tool ${activeTool === 'measure' ? 'active' : ''}`}
        onClick={onMeasure}
        title="Measure distances"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12H2" />
          <path d="M4 12v2" />
          <path d="M8 12v2" />
          <path d="M12 12v2" />
          <path d="M16 12v2" />
          <path d="M20 12v2" />
          <path d="M2 16h8v2c0 1.1.9 2 2 2s2-.9 2-2v-2h8" />
        </svg>
        <span className="text-xs">Measure</span>
      </div>
      
      <div 
        className="workshop-tool"
        onClick={() => onZoomPreset('fit')}
        title="Fit view"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z" />
          <path d="m21 15-5-5" />
          <path d="M16 15h5v-5" />
          <path d="m3 9 5 5" />
          <path d="M8 9H3v5" />
        </svg>
        <span className="text-xs">Fit View</span>
      </div>
      
      <div 
        className="workshop-tool"
        onClick={() => onZoomPreset('detail')}
        title="Detail view"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
        <span className="text-xs">Detail</span>
      </div>
    </div>
  );
}
