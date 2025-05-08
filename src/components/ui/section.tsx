import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva(
  "relative w-full",
  {
    variants: {
      variant: {
        default: "",
        blueprint: "bg-card/50 border border-border",
        workshop: "bg-muted/20",
        wood: "relative overflow-hidden",
      },
      padding: {
        default: "py-8 md:py-12",
        sm: "py-4 md:py-6",
        lg: "py-12 md:py-16 lg:py-24",
        xl: "py-16 md:py-24 lg:py-32",
        none: "py-0",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-3xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      rounded: "default",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export function Section({
  className,
  variant,
  padding,
  rounded,
  as: Component = "section",
  ...props
}: SectionProps) {
  const isWoodVariant = variant === 'wood';

  return (
    <Component
      className={cn(sectionVariants({ variant, padding, rounded, className }))}
      {...props}
    >
      {isWoodVariant && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none z-0" 
          style={{ backgroundImage: 'var(--bg-wood-texture)', backgroundSize: '100px 100px' }}
          aria-hidden="true"
        />
      )}
      {props.children}
    </Component>
  )
}