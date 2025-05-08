import React from "react";
import { cn } from "@/lib/utils";

// Types for grid component props
type GridProps = {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gapX?: "none" | "sm" | "md" | "lg";
  gapY?: "none" | "sm" | "md" | "lg";
  blueprint?: boolean;
  className?: string;
};

// Types for auto-grid component props
type AutoGridProps = {
  children: React.ReactNode;
  minItemWidth: string;
  gapX?: "none" | "sm" | "md" | "lg";
  gapY?: "none" | "sm" | "md" | "lg";
  blueprint?: boolean;
  className?: string;
};

// Gap size mappings
const gapSizes = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
};

const gapXSizes = {
  none: "gap-x-0",
  sm: "gap-x-2",
  md: "gap-x-4",
  lg: "gap-x-8",
};

const gapYSizes = {
  none: "gap-y-0",
  sm: "gap-y-2",
  md: "gap-y-4",
  lg: "gap-y-8",
};

// Column mappings for responsive design
// Each entry specifies how many columns to display at different viewport sizes
const colMappings = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

/**
 * Grid component for creating responsive grid layouts
 * 
 * @param children - The grid items to display
 * @param cols - Number of columns (defaults to 2)
 * @param gapX - Horizontal gap size between items (defaults to "md")
 * @param gapY - Vertical gap size between items (defaults to "md")
 * @param blueprint - If true, adds a blueprint-style background
 * @param className - Additional CSS classes
 */
export function Grid({
  children,
  cols = 2,
  gapX = "md",
  gapY = "md",
  blueprint = false,
  className,
  ...props
}: GridProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid",
        colMappings[cols],
        gapX === gapY ? gapSizes[gapX] : `${gapXSizes[gapX]} ${gapYSizes[gapY]}`,
        blueprint &&
          "bg-blueprint-grid bg-blueprint-bg bg-contain p-1 rounded-md border border-blueprint/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * AutoGrid component for creating grids with auto-sizing columns
 * 
 * @param children - The grid items to display
 * @param minItemWidth - Minimum width for each item (e.g., "200px")
 * @param gapX - Horizontal gap size between items (defaults to "md")
 * @param gapY - Vertical gap size between items (defaults to "md")
 * @param blueprint - If true, adds a blueprint-style background
 * @param className - Additional CSS classes
 */
export function AutoGrid({
  children,
  minItemWidth,
  gapX = "md",
  gapY = "md",
  blueprint = false,
  className,
  ...props
}: AutoGridProps & React.HTMLAttributes<HTMLDivElement>) {
  // Convert gap sizes to CSS variables
  const gapXValue = {
    none: "0px",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  }[gapX];

  const gapYValue = {
    none: "0px",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  }[gapY];

  return (
    <div
      className={cn(
        "grid",
        gapX === gapY ? gapSizes[gapX] : `${gapXSizes[gapX]} ${gapYSizes[gapY]}`,
        blueprint &&
          "bg-blueprint-grid bg-blueprint-bg bg-contain p-1 rounded-md border border-blueprint/20",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}, 1fr))`,
        gap: gapX === gapY ? gapXValue : undefined,
        columnGap: gapX !== gapY ? gapXValue : undefined,
        rowGap: gapY !== gapX ? gapYValue : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
}