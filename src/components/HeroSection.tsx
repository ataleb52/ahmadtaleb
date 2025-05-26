import { useState, useEffect } from 'react';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';
import { BlueprintAnnotation } from './ui/blueprint-annotation';
import { HeroNavigation } from './HeroNavigation';
import { TerminalBioSection } from './TerminalBioSection'; // Import TerminalBioSection

export interface HeroSectionProps {
  headerVisible?: boolean;
  onAnimationComplete?: () => void;
  isTerminalBioVisible?: boolean; // Add this prop
  onNavLinkClick?: (href: string) => void; // Add this prop
}

export function HeroSection({ 
  headerVisible = false,
  onAnimationComplete = () => {},
  isTerminalBioVisible = false, // Add default value
  onNavLinkClick = () => {} // Add default value
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  
  // Define loadingMessages BEFORE the useEffect that uses it
  const loadingMessages = [
    "// system init: personal introduction",
    "Making ...",
    "Calibrating problem-solving algorithms...",
    "Loading unnecessarily clever metaphors...",
    "// system ready"
  ];
  
  useEffect(() => {
    // Trigger initial visibility
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Start the loading sequence
      const loadingTimer = setInterval(() => {
        setLoadingStage(prev => {
          if (prev >= loadingMessages.length - 1) {
            clearInterval(loadingTimer);
            
            // First hide annotations, then show content
            setTimeout(() => {
              setShowAnnotations(false);
              
              // Small delay then show main content
              setTimeout(() => {
                setShowContent(true);
                
                // Notify parent when animations are complete
                setTimeout(() => {
                  onAnimationComplete();
                }, 800); // Same delay that was used for blueprint
                
              }, 300); // Reduced delay
            }, 800);
            
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [loadingMessages.length, onAnimationComplete]);
  
  return (
    <>
      {/* Adjust the padding based on whether header is visible */}
      <section className={cn(
        "hero-section relative min-h-[90vh] overflow-hidden flex items-center",
        headerVisible 
          ? "py-12 md:py-16 lg:py-24" 
          : "pt-0 pb-6 md:pb-8 lg:pb-12" // Reduced bottom padding
      )}>
        {/* Background elements remain unchanged */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-blueprint-grid opacity-[0.1] animate-blueprint-shift"></div>
          <div className="absolute inset-0 bg-blueprint-grid opacity-[0.07] scale-[1.5] animate-blueprint-shift-reverse"></div>
          
          {/* System nodes and connections visualization */}
          <div className="system-nodes absolute inset-0 opacity-[0.2]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-blueprint"
                style={{
                  width: `${Math.random() * 2 + 1}rem`,
                  height: `${Math.random() * 2 + 1}rem`,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                  transform: `scale(${isVisible ? 1 : 0})`,
                  transition: `transform 1s ease-out ${i * 0.2}s, opacity 1s ease-out ${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto transition-all duration-1000 opacity-0 translate-y-8"
               style={{
                 opacity: isVisible ? 1 : 0,
                 transform: isVisible ? 'translateY(0)' : 'translateY(2rem)'
               }}>
               
            <div className="relative">
              {/* Blueprint annotations section - ensure left alignment */}
              <div 
                className={cn(
                  "transition-all duration-500 text-left",
                  showAnnotations ? "opacity-100 mb-8 md:mb-10" : "opacity-0 mb-0"
                )}
                style={{
                  height: showAnnotations ? "4rem" : "0",
                  overflow: "hidden",
                  position: showAnnotations ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  width: "100%"
                }}
              >
                <BlueprintAnnotation 
                  variant="witty"
                  className="transition-all duration-500 mb-3 text-left"
                >
                  {loadingMessages[loadingStage]}
                </BlueprintAnnotation>
                
                {/* Loading indicators - left aligned */}
                <div className="flex gap-2 justify-start">
                  {Array.from({ length: loadingMessages.length }).map((_, i) => (
                    <span 
                      key={i} 
                      className={cn(
                        "inline-block w-2 h-2 rounded-full",
                        loadingStage >= i 
                          ? "bg-blueprint animate-pulse" 
                          : "bg-blueprint/30"
                      )}
                    ></span>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className={cn(
                "transition-all duration-700",
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                {/* Main headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium mb-6 md:mb-8 tracking-tight text-left">
                  <span className="block mb-3">My name is Ahmad Taleb.</span>
                </h1>
                
                {/* Subheading with increased font size and reduced bottom margin */}
                <p className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 leading-relaxed text-left">
                    <span 
                    className="block text-blueprint relative group cursor-help border-l-2 border-blueprint/60 pl-3 transition-all duration-300 hover:border-l-4 hover:text-white hover:bg-blueprint/10 hover:pl-4"
                    >
                    I solve problems using software, data analysis, and product management principles for people, organizations, and businesses that want solutions with <span className="font-bold relative inline-block"></span>
                        <span className="font-semibold relative inline-block text-red-500 dark:text-red-400 transform hover:rotate-1 hover:scale-105 transition-all">independence</span> <span className="font-semibold relative inline-block text-red-500 dark:text-red-400 transform hover:rotate-1 hover:scale-105 transition-all">built</span> <span className="font-semibold relative inline-block text-red-500 dark:text-red-400 transform hover:rotate-1 hover:scale-105 transition-all">by</span> <span className="font-semibold relative inline-block text-red-500 dark:text-red-400 transform hover:rotate-1 hover:scale-105 transition-all">DESIGN</span>.
                        {/* Tooltip positioned below the phrase instead of above */}
                        <span className="absolute opacity-0 group-hover:opacity-100 bg-gray-900/95 text-white text-sm rounded pointer-events-none z-10 transition-opacity duration-300 border border-blueprint/30 shadow-lg p-3 w-[300px] left-1/2 -translate-x-1/2 top-full mt-2">
                          "Independence built by design" means I don't just solve the problem — I help you own the solution.
                        </span>
                    </span>

                </p>

                
                {/* Blueprint marker with reduced bottom margin */}
                <div className="blueprint-marker w-24 h-1 bg-blueprint mb-4 md:mb-6 lg:mb-8 rounded-full 
                        opacity-80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>

                {/* Container for HeroNavigation and TerminalBioSection */}
                <div className="relative w-full min-h-[260px] md:min-h-[200px]"> 
                  {/* Adjust min-h based on HeroNavigation's typical height */}
                  <HeroNavigation 
                    isVisible={showContent && !isTerminalBioVisible}
                    delay={500} 
                    isTerminalBioVisible={isTerminalBioVisible}
                    onNavLinkClick={onNavLinkClick}
                  />
                  
                  {isTerminalBioVisible && (
                    <TerminalBioSection 
                      isVisible={isTerminalBioVisible}
                      onClose={() => onNavLinkClick('')} // Or a specific href that means close
                      className="absolute top-0 left-0 w-full h-full" // Position to overlay
                    />
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}