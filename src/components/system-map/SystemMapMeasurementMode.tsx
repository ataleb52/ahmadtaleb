import React, { useState, useCallback } from 'react';

type Point = [number, number];

type SystemMapMeasurementModeProps = {
  active: boolean;
  onReset: () => void;
};

export function SystemMapMeasurementMode({ active, onReset }: SystemMapMeasurementModeProps) {
  const [measurementPoints, setMeasurementPoints] = useState<Point[]>([]);
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!active) return;
    
    // Get click coordinates relative to container
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    
    // Add point or reset if we already have 2
    setMeasurementPoints(points => {
      if (points.length >= 2) return [[x, y]];
      return [...points, [x, y]];
    });
  }, [active]);
  
  const resetMeasurement = useCallback(() => {
    setMeasurementPoints([]);
    onReset();
  }, [onReset]);
  
  if (!active) return null;
  
  return (
    <div 
      className="absolute inset-0 z-10 cursor-crosshair"
      onClick={handleClick}
    >
      {/* Point markers */}
      {measurementPoints.map((point, index) => (
        <div 
          key={index}
          className="measurement-point"
          style={{ left: point[0], top: point[1] }}
        />
      ))}
      
      {/* Measurement line and label */}
      {measurementPoints.length === 2 && (
        <>
          <MeasurementLine points={measurementPoints} />
          <MeasurementLabel points={measurementPoints} onReset={resetMeasurement} />
        </>
      )}
      
      {/* Instructions */}
      {measurementPoints.length < 2 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur p-2 rounded text-xs text-slate-200 whitespace-nowrap">
          {measurementPoints.length === 0 ? 
            'Click to place first measurement point' : 
            'Click to place second measurement point'
          }
        </div>
      )}
      
      {/* Guide lines */}
      {measurementPoints.length === 1 && (
        <>
          <div 
            className="measurement-guide measurement-guide-horizontal" 
            style={{ top: measurementPoints[0][1] }}
          />
          <div 
            className="measurement-guide measurement-guide-vertical" 
            style={{ left: measurementPoints[0][0] }}
          />
        </>
      )}
    </div>
  );
}

function MeasurementLine({ points }: { points: Point[] }) {
  const [p1, p2] = points;
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  return (
    <div 
      className="absolute border-t border-dashed border-blue-400 pointer-events-none"
      style={{
        left: Math.min(p1[0], p2[0]),
        top: Math.min(p1[1], p2[1]) + (Math.min(p1[1], p2[1]) === p1[1] ? dy/2 : -dy/2),
        width: Math.abs(dx),
        height: 0,
        transform: `rotate(${angle}deg)`,
        transformOrigin: `${p1[0] < p2[0] ? '0' : '100%'} 50%`,
      }}
    />
  );
}

function MeasurementLabel({ points, onReset }: { points: Point[], onReset: () => void }) {
  const [p1, p2] = points;
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  return (
    <>
      {/* Distance label */}
      <div 
        className="dimension-label"
        style={{
          left: p1[0] + dx/2,
          top: p1[1] + dy/2,
        }}
      >
        {Math.round(distance)}px
      </div>
      
      {/* Reset button */}
      <button
        className="absolute top-4 right-4 bg-slate-800 p-2 rounded text-xs text-slate-200 hover:bg-slate-700 transition-colors"
        onClick={onReset}
      >
        Reset Measurement
      </button>
    </>
  );
}
