import { useState, useEffect } from 'react';
import { Container } from './ui/container';
import { cn } from '@/lib/utils';
import { BlueprintAnnotation } from './ui/blueprint-annotation';
import { Button } from './ui/button';
import { SolutionBlueprint } from './KanbanPortfolio';
import { Pencil } from 'lucide-react';

export function HeroSection({ headerVisible = false }) {
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
            
            // First hide annotations, then show content
            setTimeout(() => {
              setShowAnnotations(false);
              
              // Small delay then show main content
              setTimeout(() => {
                setShowContent(true);
                
                // Delay the blueprint appearance
                setTimeout(() => {
                  setShowBlueprint(true);
                }, 800);
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
  }, []);
  
  // Integrated messages array with system init as first message and system ready as last
  const loadingMessages = [
    "// system init: personal introduction",
    "Making ...",
    "Calibrating problem-solving algorithms...",
    "Loading unnecessarily clever metaphors...",
    "// system ready"
  ];
  
  return (
    <>
      {/* Adjust the padding based on whether header is visible */}
      <section className={cn(
        "hero-section relative min-h-[90vh] overflow-hidden flex items-center",
        headerVisible ? "py-12 md:py-16 lg:py-24" : "pt-0 pb-12 md:pb-16 lg:pb-24"
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
                  "transition-all duration-500 text-left", // Added text-left here
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
                  className="transition-all duration-500 mb-3 text-left" // Added text-left here
                >
                  {loadingMessages[loadingStage]}
                </BlueprintAnnotation>
                
                {/* Loading indicators - left aligned */}
                <div className="flex gap-2 justify-start"> {/* Added justify-start */}
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

              {/* Main content - position it at the final location always */}
              <div className={cn(
                "transition-all duration-700",
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                {/* Main headline - remove md:text-center to keep left alignment on all screens */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium mb-6 md:mb-8 tracking-tight text-left">
                  <span className="block mb-3">My name is Ahmad Taleb.</span>
                  <span className="block text-blueprint">I solve problems.</span>
                </h1>
                
                {/* Subheading with increased font size and reduced bottom margin */}
                <p className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 leading-relaxed text-left">
                  The kind that get in the way of letting people and businesses become more independent.
                </p>
                
                {/* Blueprint marker with reduced bottom margin */}
                <div className="blueprint-marker w-24 h-1 bg-blueprint mb-6 md:mb-8 rounded-full 
                                opacity-80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>

                {/* Simplified Navigation Cards - no container */}
                <div className="w-full mb-12 md:mb-16">
                  {/* Grid of terminal-style section cards - directly without container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* About Me */}
                  <a href="#about" className="group relative bg-gray-900/70 rounded-lg p-4 border border-gray-700 hover:border-blueprint/30 hover:bg-gray-800/70 transition-all cursor-pointer overflow-hidden shadow-md">
                  <div className="flex items-center justify-between mb-3">
                  <span className="text-yellow-300 font-medium">Who am I</span>
                  <span className="text-gray-500 text-xs opacity-60">01</span>
                  </div>
                  <p className="text-gray-300 text-xs mb-3 text-left">My background, experience, and approach to solving problems.</p>
                  </a>
                  
                  {/* What I Do */}
                  <a href="#services" className="group relative bg-gray-900/70 rounded-lg p-4 border border-gray-700 hover:border-blueprint/30 hover:bg-gray-800/70 transition-all cursor-pointer overflow-hidden shadow-md">
                  <div className="flex items-center justify-between mb-3">
                  <span className="text-yellow-300 font-medium">What I do</span>
                  <span className="text-gray-500 text-xs opacity-60">02</span>
                  </div>
                  <p className="text-gray-300 text-xs mb-3 text-left">Product strategy, roadmapping, and helping businesses become more independent.</p>
                  </a>
                  
                  {/* Current Projects */}
                  <a href="#projects" className="group relative bg-gray-900/70 rounded-lg p-4 border border-gray-700 hover:border-blueprint/30 hover:bg-gray-800/70 transition-all cursor-pointer overflow-hidden shadow-md">
                  <div className="flex items-center justify-between mb-3">
                  <span className="text-yellow-300 font-medium">What I'm working on</span>
                  <span className="text-gray-500 text-xs opacity-60">03</span>
                  </div>
                  <p className="text-gray-300 text-xs mb-3 text-left">Making home inspections easy to understand</p>
                  
                  <div className="mt-1 text-gray-300 text-xs mb-2 text-left">
                  <div className="flex items-center justify-between">
                    <span>ClearCasa.io MVP</span>
                    <span className="text-amber-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden mt-1">
                    <div className="bg-amber-500 h-full rounded-full" style={{width: '80%'}}></div>
                  </div>
                  </div>
                  </a>
                  
                  {/* Contact - special emphasis */}
                  <a href="#contact" className="group relative bg-gray-900/70 rounded-lg p-4 border border-gray-700 hover:border-blueprint/30 hover:bg-gray-800/70 transition-all cursor-pointer overflow-hidden shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-yellow-300 font-medium">Contact</span>
                      <span className="text-gray-500 text-xs opacity-60">04</span>
                    </div>
                    <p className="text-gray-300 text-xs mb-3 text-left">Let's discuss your business challenges and how I can help you solve them.</p>
                    
                    <div className="mt-auto w-full">
                      <button className="group-hover:animate-pulse w-full bg-gray-800/80 hover:bg-gray-700 text-blueprint py-1.5 px-2 rounded-sm text-xs font-mono border border-gray-700 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-blueprint/5 w-1/3 skew-x-12 transform -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                        <span className="mr-2 text-green-400">{'>'}</span>
                        <span className="group-hover:hidden">connect()</span>
                        <span className="hidden group-hover:inline-flex items-center">
                          initializing
                          <span className="ml-1 inline-flex">
                            <span className="animate-[bounce_1s_infinite_0ms] h-1 w-1 bg-blueprint rounded-full inline-block"></span>
                            <span className="animate-[bounce_1s_infinite_200ms] ml-0.5 h-1 w-1 bg-blueprint rounded-full inline-block"></span>
                            <span className="animate-[bounce_1s_infinite_400ms] ml-0.5 h-1 w-1 bg-blueprint rounded-full inline-block"></span>
                          </span>
                        </span>
                        <Pencil size={12} className="ml-2 opacity-60" />
                      </button>
                    </div>
                  </a>
                  </div>
                </div>
                
                {/* Action buttons - updated with the requested link names */}
                <div className="flex flex-wrap gap-4 mb-12 md:mb-16">
                  <Button size="lg" variant="default">
                    Who am I
                  </Button>
                  <Button size="lg" variant="default">
                    What I do
                  </Button>
                  <Button size="lg" variant="default">
                    What I'm working on
                  </Button>
                  <Button size="lg" variant="outline">
                    Get in Touch
                  </Button>
                </div>
                
                {/* Solution Blueprint Section */}
                <div className={cn(
                  "transition-all duration-1000",
                  showBlueprint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                  {/* Innovative header */}
                  <div className="flex items-center justify-between mb-8 text-left border-b pb-4">
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
          </div>
        </Container>
      </section>
    </>
  );
}