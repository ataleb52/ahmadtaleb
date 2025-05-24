import { useState, useEffect } from 'react';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';
import { SolutionBlueprint } from './KanbanPortfolio';
import { motion } from 'framer-motion';

export function SolutionBlueprintSection({ 
  isReady = false,
  delay = 800
}) {
  const [isVisible, setIsVisible] = useState(false);
  
  // First handle the initial animation based on isReady
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isReady, delay]);

  return (
    <motion.section 
      className="solution-blueprint-section -mt-8 pt-0 pb-12 md:pb-16 lg:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Simple separator/divider */}
          <div className="w-full flex justify-center mb-12">
            <div className="w-16 h-1 bg-blueprint/40 rounded-full"></div>
          </div>
          
          {/* Solution blueprint component with entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20
            }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <SolutionBlueprint />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}