import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        12: "grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
        none: "grid-cols-none",
      },
      gapX: {
        default: "gap-x-4 md:gap-x-6",
        sm: "gap-x-2 md:gap-x-3",
        md: "gap-x-6 md:gap-x-8",
        lg: "gap-x-8 md:gap-x-12",
        xl: "gap-x-12 md:gap-x-16",
        none: "gap-x-0",
      },
      gapY: {
        default: "gap-y-4 md:gap-y-6",
        sm: "gap-y-2 md:gap-y-3",
        md: "gap-y-6 md:gap-y-8",
        lg: "gap-y-8 md:gap-y-12",
        xl: "gap-y-12 md:gap-y-16",
        none: "gap-y-0",
      },
      blueprint: {
        true: "blueprint-grid relative before:absolute before:inset-0 before:bg-blueprint-grid before:opacity-[0.03] before:z-[-1] before:pointer-events-none",
      }
    },
    defaultVariants: {
      cols: 2,
      gapX: "default",
      gapY: "default",
      blueprint: false,
    },
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export function Grid({
  className,
  cols,
  gapX,
  gapY,
  blueprint,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(gridVariants({ cols, gapX, gapY, blueprint, className }))}
      {...props}
    />
  )
}

// For auto-grid (auto-fit) with minimum item width
export interface AutoGridProps extends Omit<GridProps, 'cols'> {
  minItemWidth?: string;
}

export function AutoGrid({
  className,
  minItemWidth = "250px",
  gapX = "default",
  gapY = "default",
  blueprint,
  ...props
}: AutoGridProps) {
  const gridTemplateColumns = `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`;
  
  return (
    <div
      className={cn(gridVariants({ cols: "none", gapX, gapY, blueprint }), className)}
      style={{ gridTemplateColumns }}
      {...props}
    />
  )
}