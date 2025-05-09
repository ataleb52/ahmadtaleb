import React, { useState } from 'react';

type LayerControlsProps = {
  spacing: number;
  onSpacingChange: (spacing: number) => void;
};

export function LayerControls({ spacing, onSpacingChange }: LayerControlsProps) {
  return (
    <div className="flex items-center gap-2 mt-3 p-2 bg-slate-800 rounded-sm border border-slate-700">
      <div className="text-xs text-slate-300">Layer Spacing</div>
      <input 
        type="range" 
        min="10" 
        max="60" 
        value={spacing} 
        onChange={(e) => onSpacingChange(Number(e.target.value))}
        className="w-full max-w-[100px]"
      />
      <div className="text-xs text-blue-300 font-mono">{spacing}px</div>
    </div>
  );
}
