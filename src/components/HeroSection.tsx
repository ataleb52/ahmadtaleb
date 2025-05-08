import { useState, useEffect } from 'react';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="hero-section relative min-h-[90vh] overflow-hidden flex items-center py-12 md:py-16 lg:py-24">
      {/* Animated Blueprint Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.07] animate-blueprint-shift"></div>
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.05] scale-[1.5] animate-blueprint-shift-reverse"></div>
        
        {/* System nodes and connections visualization */}
        <div className="system-nodes absolute inset-0 opacity-[0.15]">
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
              opacity: isVisible ? 0.2 : 0,
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
          {/* Blueprint annotation */}
          <div className="font-mono text-blueprint-annotation text-xs md:text-sm mb-6 md:mb-8 opacity-70">
            // SYSTEM INIT: PERSONAL INTRODUCTION
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium mb-4 md:mb-6 tracking-tight">
            <span className="block mb-2">My name is Ahmad.</span>
            <span className="block text-blueprint">I solve problems.</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-8 md:mb-12">
            Not the kind you diagram on a whiteboard and forget. 
            The kind that make people quietly mutter, "Why is this still broken?"
          </p>
          
          {/* Workshop-style marker */}
          <div className="blueprint-marker w-16 h-1 bg-blueprint mb-12 md:mb-16"></div>
          
          {/* System thinking indicator */}
          <div className={cn(
            "blueprint-annotation inline-flex items-center gap-2 font-mono text-xs opacity-70",
            "transition-all duration-700 delay-500",
            isVisible ? "opacity-70" : "opacity-0"
          )}>
            <span className="inline-block w-3 h-3 rounded-full bg-blueprint animate-pulse"></span>
            SYSTEM STATUS: OPERATIONAL
          </div>
        </div>
      </Container>
    </section>
  );
}