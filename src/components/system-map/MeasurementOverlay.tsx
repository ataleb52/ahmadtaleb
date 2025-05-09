import React from 'react';

type MeasurementPoint = [number, number];

type MeasurementOverlayProps = {
  points: MeasurementPoint[];
  onReset: () => void;
};

export function MeasurementOverlay({ points, onReset }: MeasurementOverlayProps) {
  // If we don't have 2 points yet, show instruction
  if (points.length < 2) {
    return (
      <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur p-2 rounded text-xs text-slate-200">
        Click to place {points.length === 0 ? 'first' : 'second'} measurement point
      </div>
    );
  }
  
  const [p1, p2] = points;
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  return (
    <>
      {/* Points */}
      <div 
        className="measurement-point" 
        style={{ left: p1[0], top: p1[1] }}
      />
      <div 
        className="measurement-point" 
        style={{ left: p2[0], top: p2[1] }}
      />
      
      {/* Line between points */}
      <div 
        className="absolute border-t border-dashed border-blue-400 pointer-events-none"
        style={{
          left: Math.min(p1[0], p2[0]),
          top: p1[1],
          width: Math.abs(dx),
          height: 0,
          transform: `rotate(${angle}deg)`,
          transformOrigin: `${p1[0] < p2[0] ? '0' : '100%'} 50%`,
        }}
      />
      
      {/* Horizontal and vertical guides */}
      <div 
        className="measurement-guide measurement-guide-horizontal"
        style={{ top: p1[1] }}
      />
      <div 
        className="measurement-guide measurement-guide-vertical"
        style={{ left: p1[0] }}
      />
      <div 
        className="measurement-guide measurement-guide-horizontal"
        style={{ top: p2[1] }}
      />
      <div 
        className="measurement-guide measurement-guide-vertical"
        style={{ left: p2[0] }}
      />
      
      {/* Distance annotation */}
      <div 
        className="dimension-label"
        style={{
          left: p1[0] + dx/2,
          top: p1[1] + dy/2,
        }}
      >
        {Math.round(distance)}px
      </div>
      
      {/* X-distance annotation */}
      <div 
        className="dimension-label"
        style={{
          left: p1[0] + dx/2,
          top: p1[1] - 15,
        }}
      >
        X: {Math.abs(Math.round(dx))}px
      </div>
      
      {/* Y-distance annotation */}
      <div 
        className="dimension-label"
        style={{
          left: p2[0] + 15,
          top: p1[1] + dy/2,
        }}
      >
        Y: {Math.abs(Math.round(dy))}px
      </div>
      
      {/* Reset button */}
      <button
        className="absolute top-4 right-4 bg-slate-800 p-2 rounded text-xs text-slate-200 hover:bg-slate-700"
        onClick={onReset}
      >
        Reset Measurement
      </button>
    </>
  );
}
