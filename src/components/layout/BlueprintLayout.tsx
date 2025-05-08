import React from "react";
import { cn } from "@/lib/utils";

interface BlueprintLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  gridSize?: "sm" | "md" | "lg";
  showAxis?: boolean;
  showMeasurements?: boolean;
  children: React.ReactNode;
}

export function BlueprintLayout({
  className,
  gridSize = "md",
  showAxis = true,
  showMeasurements = true,
  children,
  ...props
}: BlueprintLayoutProps) {
  // Grid size translations to pixel values
  const gridSizeMap = {
    sm: "10px",
    md: "20px",
    lg: "40px",
  };
  
  const gridSizePx = gridSizeMap[gridSize];
  
  return (
    <div
      className={cn(
        "relative w-full min-h-[400px] overflow-hidden",
        "border border-border bg-card",
        className
      )}
      {...props}
    >
      {/* Blueprint grid background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{ 
          backgroundImage: 'var(--bg-blueprint-grid)',
          backgroundSize: gridSizePx
        }}
      />
      
      {/* Measurement markings along edges */}
      {showMeasurements && (
        <>
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-between px-6 z-10 pointer-events-none">
            <div className="font-mono text-xs text-blueprint-annotation">0,0</div>
            <div className="font-mono text-xs text-blueprint-annotation">SCALE: 1:1</div>
          </div>
          <div className="absolute left-0 bottom-0 top-6 w-6 flex flex-col justify-between items-center pb-6 z-10 pointer-events-none">
            <div className="font-mono text-xs text-blueprint-annotation rotate-270">WORKSHOP SYSTEM</div>
          </div>
        </>
      )}
      
      {/* X and Y axis if enabled */}
      {showAxis && (
        <>
          {/* X-axis */}
          <div className="absolute left-0 right-0 top-[50%] border-t border-dashed border-blueprint-grid/30 z-0 pointer-events-none" />
          {/* Y-axis */}
          <div className="absolute bottom-0 top-0 left-[50%] border-l border-dashed border-blueprint-grid/30 z-0 pointer-events-none" />
        </>
      )}
      
      {/* Main content with padding to account for measurements */}
      <div className={cn(
        "relative z-1 p-2",
        showMeasurements && "pt-8 pl-8"
      )}>
        {children}
      </div>
    </div>
  );
}