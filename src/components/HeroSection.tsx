import { useState, useEffect } from 'react';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';
import { BlueprintAnnotation } from './ui/blueprint-annotation';
import { Button } from './ui/button';
import { CurrentSolvingPill } from './CurrentProblemTrackers';
import { SolutionBlueprint } from './KanbanPortfolio';
import { Pencil } from 'lucide-react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showBlueprint, setShowBlueprint] = useState(false);
  
  useEffect(() => {
    // Trigger initial visibility
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Start the loading sequence
      const loadingTimer = setInterval(() => {
        setLoadingStage(prev => {
          if (prev >= loadingMessages.length - 1) {
            clearInterval(loadingTimer);
            
            // Show main content after final message is shown
            setTimeout(() => {
              setShowContent(true);
              
              // Fade out annotations after content appears
              setTimeout(() => {
                setShowAnnotations(false);
                
                // Delay the blueprint appearance
                setTimeout(() => {
                  setShowBlueprint(true);
                }, 800);
              }, 1000);
            }, 1200);
            
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // Integrated messages array with system init as first message and system ready as last
  const loadingMessages = [
    "// system init: personal introduction",
    "Initializing caffeine levels...",
    "Calibrating problem-solving algorithms...",
    "Loading unnecessarily clever metaphors...",
    "// system ready"
  ];
  
  return (
    <>
      <section className="hero-section relative min-h-[90vh] overflow-hidden flex items-center py-12 md:py-16 lg:py-24">
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
               
            {/* Blueprint annotations section - with fixed positioning to prevent layout shifts */}
            <div className="mb-8 md:mb-10 h-16 text-left" style={{ position: 'relative' }}>
              <div className={cn(
                "transition-all duration-700",
                showAnnotations 
                  ? "opacity-100 visible" 
                  : "opacity-0 invisible"
              )}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
              }}>
                {/* Single loading message component with consistent styling */}
                <BlueprintAnnotation 
                  variant="witty"
                  className="transition-all duration-500 mb-3"
                >
                  {loadingMessages[loadingStage]}
                </BlueprintAnnotation>
                
                {/* Loading indicators */}
                <div className="flex gap-2">
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
            </div>
            
            {/* Main content */}
            <div className={cn(
              "transition-all duration-1000 text-left md:text-center",
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              {/* Current solving pill - appears at the top of content */}
              <div className="mb-8 md:mb-12 flex justify-start md:justify-center">
                <CurrentSolvingPill />
              </div>
              
              {/* Main headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium mb-6 md:mb-8 tracking-tight">
                <span className="block mb-3">My name is Ahmad.</span>
                <span className="block text-blueprint">I solve problems.</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 leading-relaxed">
                The kind that get in the way of letting people and businesses become more independent.
              </p>
              
              {/* Blueprint marker - adjust for responsive alignment */}
              <div className="blueprint-marker w-24 h-1 bg-blueprint mb-12 md:mb-16 rounded-full 
                              opacity-80 relative overflow-hidden md:mx-auto">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mb-12 md:mb-16 md:justify-center">
                <Button size="lg" variant="default">
                  View My Work
                </Button>
                <Button size="lg" variant="outline">
                  Get In Touch
                </Button>
              </div>
              
              {/* Solution Blueprint Section */}
              <div className={cn(
                "transition-all duration-1000",
                showBlueprint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                {/* Innovative header */}
                <div className="flex items-center justify-between mb-8 text-left border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blueprint/10 flex items-center justify-center">
                      <Pencil size={20} className="text-blueprint" />
                    </div>
                    <div>
                      <h2 className="text-xl font-medium">Solution Blueprint</h2>
                      <p className="text-sm text-muted-foreground">See what I've solved, what I'm building, and what's next</p>
                    </div>
                  </div>
                  
                  <BlueprintAnnotation variant="witty">
                    // this is how I think
                  </BlueprintAnnotation>
                </div>
                
                {/* Solution blueprint component */}
                {/* Visual connector between hero and solutions */}
                <div className={cn(
                  "w-full h-16 relative overflow-hidden transition-all duration-500",
                  showBlueprint ? "opacity-100" : "opacity-0 h-0"
                )}>
                  <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-blueprint/30"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-6 border-2 border-blueprint/30 rounded-full flex items-center justify-center bg-background">
                    <div className="w-2 h-2 bg-blueprint rounded-full"></div>
                  </div>
                </div>
                
                {/* Solution blueprint component with entrance animation */}
                <div className={cn(
                  "transition-all duration-700 transform",
                  showBlueprint 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                )}>
                  <SolutionBlueprint />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}