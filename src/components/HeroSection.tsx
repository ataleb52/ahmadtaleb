import { useState, useEffect } from 'react';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';
import { BlueprintAnnotation } from './ui/blueprint-annotation';
import { Button } from './ui/button';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Progressive loading stages
    const loadingTimer = setInterval(() => {
      setLoadingStage(prev => {
        if (prev >= 3) {
          clearInterval(loadingTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    
    return () => {
      clearTimeout(timer);
      clearInterval(loadingTimer);
    };
  }, []);
  
  const loadingMessages = [
    "Initializing caffeine levels...",
    "Calibrating problem-solving algorithms...",
    "Loading unnecessarily clever metaphors...",
    "Ready. Coffee supply: optimal"
  ];
  
  return (
    <section className="hero-section relative min-h-[90vh] overflow-hidden flex items-center py-12 md:py-16 lg:py-24">
      {/* Animated Blueprint Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
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
          
          {/* SVG system connections */}
          <svg 
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            style={{
              opacity: isVisible ? 0.25 : 0,
              transition: 'opacity 1.5s ease-out 0.5s'
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const x1 = `${Math.random() * 100}%`;
              const y1 = `${Math.random() * 100}%`;
              const x2 = `${Math.random() * 100}%`;
              const y2 = `${Math.random() * 100}%`;
              return (
                <line 
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="var(--blueprint)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  strokeOpacity="0.6"
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      <Container className="relative z-10">
        <div className={cn(
          "max-w-4xl mx-auto transition-all duration-1000",
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}>
          {/* Blueprint annotation - more approachable */}
          <BlueprintAnnotation 
            variant="comment"
            className="mb-6 md:mb-8"
            animation="typing"
          >
            // system init: personal introduction
          </BlueprintAnnotation>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium mb-6 md:mb-8 tracking-tight">
            <span className="block mb-3">My name is Ahmad.</span>
            <span className="block text-blueprint">I solve problems.</span>
          </h1>
          
          {/* Subheading with sardonic touch */}
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-8 md:mb-12 leading-relaxed">
            Not the kind you diagram on a whiteboard and forget. 
            The kind that make people quietly mutter, 
            <span className="italic text-muted-foreground"> "Why is this still broken?"</span>
          </p>
          
          {/* Workshop-style marker with refined appearance */}
          <div className="blueprint-marker w-24 h-1 bg-blueprint mb-12 md:mb-16 rounded-full 
                          opacity-80 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-12 md:mb-16">
            <Button size="lg" variant="default">
              View My Work
            </Button>
            <Button size="lg" variant="outline">
              Get In Touch
            </Button>
          </div>
          
          {/* System loading indicator with witty messages */}
          <div className="relative">
            <BlueprintAnnotation 
              variant="witty" 
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100" : "opacity-0"
              )}
            >
              {loadingMessages[loadingStage]}
            </BlueprintAnnotation>
            
            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
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
              
              <div className={cn(
                "text-sm text-muted-foreground transition-all duration-300",
                loadingStage === 3 ? "opacity-100" : "opacity-0"
              )}>
                System ready
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}