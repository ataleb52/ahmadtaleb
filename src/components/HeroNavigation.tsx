import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react';

export function HeroNavigation({ 
  isVisible = false,
  delay = 0 // Delay in ms before starting animation
}) {
  const [showNavigation, setShowNavigation] = useState(false);
  
  useEffect(() => {
    // Only start animation when parent component signals visibility
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowNavigation(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);
  
  return (
    <div className={cn(
      "transition-all duration-700",
      showNavigation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      {/* Simplified Navigation Cards */}
      <div className="w-full mb-12 md:mb-16">
        {/* Grid of terminal-style section cards */}
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
    </div>
  );
}