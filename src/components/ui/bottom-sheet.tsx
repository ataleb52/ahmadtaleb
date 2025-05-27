import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showHandle?: boolean;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  className,
  showHandle = true,
  showCloseButton = true,
  closeOnBackdropClick = true,
}: BottomSheetProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeOnBackdropClick && onClose()}
          />
          
          {/* Sheet */}
          <motion.div
            className={cn(
              "fixed left-0 right-0 bottom-0 z-50 bg-background rounded-t-2xl",
              "shadow-2xl border-t border-border w-full min-w-[100vw] min-h-[70vh]",
              className
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            {/* Handle bar */}
            {showHandle && (
              <div className="w-full flex justify-center p-4">
                <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
              </div>
            )}

            {/* Close button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted/80 text-muted-foreground"
                aria-label="Close sheet"
              >
                <X size={20} />
              </button>
            )}

            {/* Content */}
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
