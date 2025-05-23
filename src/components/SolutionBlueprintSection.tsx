import { useState, useEffect, useRef } from 'react';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';
import { SolutionBlueprint } from './KanbanPortfolio';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

export function SolutionBlueprintSection({ 
  isReady = false,
  delay = 800
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const connectorRef = useRef(null);
  const pathRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // First handle the initial animation based on isReady
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isReady, delay]);
  
  // Setup scroll-based animation using Framer Motion
  const { scrollYProgress } = useScroll({
    target: connectorRef,
    offset: ["start end", "end start"]
  });
  
  // Create a smoother animation with spring physics
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Path length animation based on scroll
  const pathLength = useTransform(smoothProgress, [0, 0.8], [0, 1]);
  
  // Circle position along the path
  const circlePosition = useTransform(smoothProgress, [0, 0.8], [0, 100]);
  
  // Final element opacity and y position
  const finalElementOpacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);
  const finalElementY = useTransform(smoothProgress, [0.7, 0.9], [20, 0]);
  
  // Content reveal
  const contentOpacity = useTransform(smoothProgress, [0.8, 0.95], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.8, 0.95], [50, 0]);

  return (
    <motion.section 
      ref={sectionRef}
      className="solution-blueprint-section -mt-8 pt-0 pb-12 md:pb-16 lg:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Animated scroll path connector */}
          <div 
            ref={connectorRef}
            className="w-full h-48 relative mb-12"
          >
            {/* SVG path for line animation */}
            <svg 
              className="absolute left-1/2 -translate-x-1/2 w-4 h-full overflow-visible"
              viewBox="0 0 4 100"
              fill="none"
              preserveAspectRatio="xMidYMax meet"
            >
              {/* Background track */}
              <path
                d="M2 0L2 100"
                stroke="rgba(100, 116, 139, 0.3)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              
              {/* Animated path that grows with scroll */}
              <motion.path
                ref={pathRef}
                d="M2 0L2 100"
                stroke="rgb(92, 124, 250)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ 
                  pathLength,
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  filter: "drop-shadow(0 0 3px rgba(92, 124, 250, 0.5))"
                }}
                initial={{ pathLength: 0 }}
              />
            </svg>
            
            {/* Starting point indicator */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-8 border-[3px] border-blueprint
                       rounded-full flex items-center justify-center bg-gray-900 z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: inView ? 1 : 0, opacity: inView ? 0.9 : 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.div 
                className="w-3 h-3 bg-blueprint rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Moving circle that follows the path */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-10 h-10 border-[3px] border-blueprint
                        rounded-full flex items-center justify-center bg-gray-900 z-10"
              style={{ 
                top: `${circlePosition}%`,
                boxShadow: "0 0 10px rgba(92, 124, 250, 0.6)",
                opacity: useTransform(circlePosition, [0, 5], [0, 1])
              }}
            >
              <motion.div 
                className="w-4 h-4 bg-blueprint rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Blueprint element that appears at the end */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 bottom-0"
              style={{ 
                opacity: finalElementOpacity,
                y: finalElementY
              }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blueprint/20 border-2 border-blueprint/70">
                <motion.div 
                  className="w-2 h-10 bg-blueprint/60 rounded-full"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <motion.div 
                  className="w-10 h-2 bg-blueprint/60 rounded-full absolute"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Solution blueprint with entrance animation */}
          <motion.div
            style={{ 
              opacity: contentOpacity,
              y: contentY
            }}
          >
            <SolutionBlueprint />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}