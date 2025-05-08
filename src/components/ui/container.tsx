import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const containerVariants = cva(
  "mx-auto px-4 md:px-6 lg:px-8 relative w-full",
  {
    variants: {
      size: {
        default: "max-w-7xl", // Standard container (~1280px)
        sm: "max-w-3xl",      // Small container (~768px)
        md: "max-w-5xl",      // Medium container (~1024px)
        lg: "max-w-7xl",      // Large container (~1280px)
        xl: "max-w-[1536px]", // Extra large container
        full: "max-w-none",   // Full-width container
      },
      blueprint: {
        true: "blueprint-container before:absolute before:inset-x-0 before:top-0 before:border-t before:border-blueprint-grid/50"
      },
      centered: {
        true: "flex flex-col items-center"
      },
      padded: {
        default: "py-8 md:py-12",
        sm: "py-4 md:py-6",
        lg: "py-12 md:py-16",
        none: "py-0",
      },
    },
    defaultVariants: {
      size: "default",
      padded: "default",
      blueprint: false,
      centered: false,
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

export function Container({
  className,
  size,
  blueprint,
  centered,
  padded,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ size, blueprint, centered, padded, className }))}
      {...props}
    />
  )
}