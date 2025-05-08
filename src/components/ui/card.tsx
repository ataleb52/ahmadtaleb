import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-card/90",
        blueprint: "border-blueprint-grid/30 bg-card/80 relative before:absolute before:inset-0 before:bg-blueprint-grid before:opacity-[0.025] before:rounded-[inherit] before:z-0 before:pointer-events-none",
        workshop: "border-border bg-background shadow-md backdrop-blur-sm",
        wood: "border-border bg-muted/20 relative overflow-hidden",
      },
      elevation: {
        flat: "shadow-sm",
        raised: "shadow-md hover:shadow-lg transition-shadow",
        floating: "shadow-lg hover:shadow-xl transition-all hover:-translate-y-1",
      },
      radius: {
        default: "rounded-xl",
        full: "rounded-3xl",
        none: "rounded-none",
      }
    },
    defaultVariants: {
      variant: "default",
      elevation: "raised",
      radius: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, elevation, radius, ...props }, ref) => {
    // Check if it's the wood variant to add wood texture
    const isWoodVariant = variant === 'wood';

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, elevation, radius }), className)}
        {...props}
      >
        {isWoodVariant && (
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none z-0" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v50H0z\' fill=\'%23d9b38c\' fill-opacity=\'0.1\'/%3E%3Cpath d=\'M0 50h100v50H0z\' fill=\'%23d9b38c\' fill-opacity=\'0.15\'/%3E%3Cpath d=\'M25 0h2v100h-2zM50 0h2v100h-2zM75 0h2v100h-2z\' fill=\'%23d9b38c\' fill-opacity=\'0.1\'/%3E%3Cpath d=\'M0 25h100v2H0zM0 50h100v2H0zM0 75h100v2H0z\' fill=\'%23d9b38c\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
              backgroundSize: '100px 100px' 
            }}
            aria-hidden="true"
          />
        )}
        <div className="relative z-1">{props.children}</div>
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }
>(({ className, as: Component = "h3", ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      "text-2xl font-heading leading-tight tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Blueprint-specific card components
const BlueprintCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6 border-b border-blueprint-grid/20",
      className
    )}
    {...props}
  />
))
BlueprintCardHeader.displayName = "BlueprintCardHeader"

const BlueprintCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0 border-t border-blueprint-grid/20 mt-4",
      className
    )}
    {...props}
  />
))
BlueprintCardFooter.displayName = "BlueprintCardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  BlueprintCardHeader,
  BlueprintCardFooter
}