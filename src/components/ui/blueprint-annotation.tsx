import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const blueprintAnnotationVariants = cva(
  "font-mono text-blueprint-annotation relative inline-block",
  {
    variants: {
      variant: {
        default: "opacity-80",
        comment: "opacity-80 before:content-['//'] before:mr-1.5",
        witty: "opacity-90 italic",
        note: "opacity-80 tracking-tight",
        measurement: "opacity-75 tracking-wide",
      },
      size: {
        default: "text-xs md:text-sm",
        sm: "text-xs",
        lg: "text-sm md:text-base",
      },
      animation: {
        none: "",
        typing: "typing-effect",
        drawing: "drawing-in",
        bounce: "bounce-in",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

export interface BlueprintAnnotationProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof blueprintAnnotationVariants> {
  as?: React.ElementType;
  withLineDraw?: boolean;
  linePosition?: "top" | "bottom" | "left" | "right";
  lineLength?: "sm" | "md" | "lg" | "full";
  uppercase?: boolean;
}

export function BlueprintAnnotation({
  className,
  variant,
  size,
  animation,
  as: Component = "span",
  withLineDraw = false,
  linePosition = "bottom",
  lineLength = "md",
  uppercase = false,
  ...props
}: BlueprintAnnotationProps) {
  // Calculate line length class
  const lineLengthClass = {
    sm: "before:w-8 before:h-8",
    md: "before:w-12 before:h-12",
    lg: "before:w-16 before:h-16",
    full: "before:w-full before:h-full",
  }[lineLength];

  // Calculate line position class
  const linePositionClass = {
    top: "before:top-0 before:-translate-y-full before:border-b",
    bottom: "before:bottom-0 before:translate-y-full before:border-t",
    left: "before:left-0 before:-translate-x-full before:border-r",
    right: "before:right-0 before:translate-x-full before:border-l",
  }[linePosition];

  const lineDrawClass = withLineDraw
    ? cn(
        "relative",
        "before:absolute before:content-[''] before:border-blueprint-grid/40 before:border-dashed",
        linePositionClass,
        lineLengthClass,
        animation === "drawing" && "before:animate-line-draw"
      )
    : "";

  return (
    <Component
      className={cn(
        blueprintAnnotationVariants({ variant, size, animation }),
        uppercase && "uppercase",
        lineDrawClass,
        className
      )}
      {...props}
    />
  );
}