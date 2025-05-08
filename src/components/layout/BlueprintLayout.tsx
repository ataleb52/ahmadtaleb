import React from "react";
import { cn } from "@/lib/utils";
import { BlueprintAnnotation } from "../ui/blueprint-annotation";

interface BlueprintLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  gridSize?: "sm" | "md" | "lg";
  showAxis?: boolean;
  showMeasurements?: boolean;
  variant?: "standard" | "detailed" | "minimal";
  children: React.ReactNode;
}

export function BlueprintLayout({
  className,
  gridSize = "md",
  showAxis = true,
  showMeasurements = true,
  variant = "standard",
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
        "relative w-full min-h-[400px] overflow-hidden rounded-md",
        "border border-border bg-card transition-all duration-300",
        variant === "detailed" && "shadow-md",
        variant === "minimal" && "border-dashed",
        className
      )}
      {...props}
    >
      {/* Blueprint grid background with lighter opacity */}
      <div 
        className={cn(
          "absolute inset-0 z-0 pointer-events-none",
          variant === "standard" && "opacity-[0.06]",
          variant === "detailed" && "opacity-[0.08]",
          variant === "minimal" && "opacity-[0.04]"
        )}
        style={{ 
          backgroundImage: 'var(--bg-blueprint-grid)',
          backgroundSize: gridSizePx
        }}
      />
      
      {/* Measurement markings along edges with refined styling */}
      {showMeasurements && (
        <>
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-between px-6 z-10 pointer-events-none">
            <BlueprintAnnotation variant="technical" className="text-xs opacity-70">
              origin: (0,0)
            </BlueprintAnnotation>
            <BlueprintAnnotation variant="technical" className="text-xs opacity-70">
              scale: 1:1
            </BlueprintAnnotation>
          </div>
          <div className="absolute left-0 bottom-0 top-6 w-6 flex flex-col justify-between items-center pb-6 z-10 pointer-events-none">
            <BlueprintAnnotation variant="technical" className="text-xs opacity-70 -rotate-90 whitespace-nowrap">
              workshop system
            </BlueprintAnnotation>
          </div>
        </>
      )}
      
      {/* X and Y axis with refined styling if enabled */}
      {showAxis && (
        <>
          {/* X-axis */}
          <div className="absolute left-0 right-0 top-[50%] border-t border-dashed border-blueprint-grid/40 z-0 pointer-events-none" />
          {/* Y-axis */}
          <div className="absolute bottom-0 top-0 left-[50%] border-l border-dashed border-blueprint-grid/40 z-0 pointer-events-none" />
          
          {/* Axis labels with refined styling */}
          {variant === "detailed" && (
            <>
              <BlueprintAnnotation 
                variant="technical" 
                className="absolute right-2 top-[50%] translate-y-[-50%] text-xs opacity-60"
              >
                x
              </BlueprintAnnotation>
              <BlueprintAnnotation 
                variant="technical" 
                className="absolute bottom-2 left-[50%] translate-x-[-50%] text-xs opacity-60"
              >
                y
              </BlueprintAnnotation>
            </>
          )}
        </>
      )}
      
      {/* Main content with padding to account for measurements */}
      <div className={cn(
        "relative z-1 p-4",
        showMeasurements && "pt-8 pl-8"
      )}>
        {children}
      </div>
    </div>
  );
}