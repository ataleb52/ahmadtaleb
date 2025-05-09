import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { LayerControls } from './LayerControls';

export type Layer = {
  id: string;
  label: string;
  description: string;
  cssProperties: string[];
  zIndex: number;
  preview?: React.ReactNode;
};

export type VariantOption = {
  id: string;
  label: string;
  description?: string;
};

// This type extends NodeProps with our specific data structure
export type BlueprintNodeData = {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  items?: string[];
  layers?: Layer[];
  docLink?: string;
  codeExample?: string;
  related?: string[];
  selected?: boolean;
  isExpanded?: boolean;
  variants?: VariantOption[];
};

export function InteractiveBlueprintNode({ data }: NodeProps) {
  // TypeScript will still warn about unknown type, but we know the structure
  const nodeData = data as unknown as BlueprintNodeData;
  const isExpanded = nodeData.isExpanded || false;
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [layerSpacing, setLayerSpacing] = useState(30); // Default spacing
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    nodeData.variants && nodeData.variants.length > 0 ? nodeData.variants[0].id : undefined
  );
  
  const handleLayerClick = (layerId: string) => {
    setActiveLayer(activeLayer === layerId ? null : layerId);
  };
  
  return (
    <div 
      className={`p-3 rounded-sm bg-slate-800 border ${
        nodeData.selected ? 'border-blue-400 shadow-[0_0_15px_rgba(2,132,199,0.5)]' : 'border-blue-600'
      } min-w-[240px] transition-all duration-300`}
    >
      <div className="bg-slate-900 p-2 rounded-sm">
        <div className="flex items-center gap-2 mb-1">
          {nodeData.icon && <div className="text-blue-400">{nodeData.icon}</div>}
          <div className="font-heading text-slate-50 font-medium">{nodeData.label}</div>
        </div>
        {nodeData.description && (
          <div className="text-xs text-slate-300">{nodeData.description}</div>
        )}
      </div>

      {/* Component variants selection */}
      {isExpanded && nodeData.variants && nodeData.variants.length > 0 && (
        <div className="mt-3">
          <div className="text-xs font-medium text-slate-200 mb-2">Variants</div>
          <div className="flex flex-wrap gap-1">
            {nodeData.variants.map((variant) => (
              <button
                key={variant.id}
                className={`text-xs px-2 py-1 rounded-sm ${
                  selectedVariant === variant.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                } transition-colors`}
                onClick={() => setSelectedVariant(variant.id)}
                title={variant.description}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exploded view of component layers */}
      {isExpanded && nodeData.layers && (
        <div className="mt-4 perspective-[800px] transform-gpu">
          <div className="text-xs font-medium text-slate-200 mb-3">Component Layers</div>
          <div className="relative py-4">
            {nodeData.layers.map((layer, index) => (
              <div 
                key={layer.id}
                className={`absolute left-0 w-full p-2 bg-slate-700/80 backdrop-blur border 
                  ${activeLayer === layer.id 
                    ? 'border-blue-400 shadow-sm' 
                    : 'border-slate-600'} 
                  rounded-sm mb-2 hover:border-blue-300 transition-all duration-200 cursor-pointer`}
                style={{ 
                  zIndex: layer.zIndex,
                  transform: `translateZ(${index * layerSpacing}px) translateY(${-index * (layerSpacing/1.5)}px)`,
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  top: `${index * 16}px`,
                  width: 'calc(100% - 24px)',
                  marginLeft: '12px',
                }}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                onClick={() => handleLayerClick(layer.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-mono text-xs text-blue-300">{layer.label}</div>
                  <div className="text-[10px] text-slate-400 bg-slate-800 px-1 rounded">z-index: {layer.zIndex}</div>
                </div>
                <div className="text-[10px] text-slate-300 mb-2">{layer.description}</div>
                
                {/* Layer preview element */}
                {layer.preview && (
                  <div className="mb-2">{layer.preview}</div>
                )}

                {/* CSS Properties */}
                <div className="flex flex-wrap gap-1">
                  {layer.cssProperties.map((prop, i) => (
                    <div key={i} className="text-[10px] bg-slate-800 text-blue-200 px-1 rounded">
                      {prop}
                    </div>
                  ))}
                </div>
                
                {/* Measurement lines */}
                <div className="absolute -left-2 top-1/2 h-px w-2 bg-blue-400"></div>
                <div className="absolute -right-2 top-1/2 h-px w-2 bg-blue-400"></div>

                {/* Layer dimensions annotation - visible when active */}
                {activeLayer === layer.id && (
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-[10px] font-mono text-blue-300 bg-slate-800 p-1 rounded border border-blue-500">
                    Layer {index + 1}<br/>
                    z-index: {layer.zIndex}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Layer spacing controls */}
          <LayerControls 
            spacing={layerSpacing} 
            onSpacingChange={setLayerSpacing}
          />
        </div>
      )}
      
      {!isExpanded && nodeData.items && (
        <div className="mt-2 border-t border-slate-700 pt-2">
          <ul className="text-xs space-y-1">
            {nodeData.items.map((item, i) => (
              <li key={i} className="text-slate-300 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-blue-400"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Handle type="target" position={Position.Top} className="!bg-blue-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400" />
    </div>
  );
}
