import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import { BioDisplay } from './BioDisplay';
import { BottomSheet } from './ui/bottom-sheet';
import { navCards } from '@/content/navCards';
import { WhatIDoDisplay } from './WhatIDoDisplay';
import { SolutionWorkshop } from './KanbanPortfolio';

export interface HeroNavigationProps {
  isVisible?: boolean;
  delay?: number;
  onNavLinkClick?: (href: string) => void; 
}

const TYPING_SPEED = 75; // ms per character

export function HeroNavigation({ 
  isVisible = false,
  delay = 0, 
  onNavLinkClick = () => {} 
}: HeroNavigationProps) {
  const [showNavigation, setShowNavigation] = useState(false);
  const [isBioPanelOpen, setIsBioPanelOpen] = useState(false);
  const [isWhatIDoPanelOpen, setIsWhatIDoPanelOpen] = useState(false);
  const [isProjectsPanelOpen, setIsProjectsPanelOpen] = useState(false); // New state
  
  const [typedBioTitle, setTypedBioTitle] = useState('');
  const [typedServicesTitle, setTypedServicesTitle] = useState('');
  const [typedProjectsTitle, setTypedProjectsTitle] = useState('');

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowNavigation(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  // Effect for Bio Panel Title Animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBioPanelOpen) {
      const targetTitle = "~/bio.txt";
      let index = 0;
      setTypedBioTitle(''); // Reset before starting
      timer = setInterval(() => {
        setTypedBioTitle(targetTitle.slice(0, index));
        index++;
        if (index > targetTitle.length) {
          clearInterval(timer);
        }
      }, TYPING_SPEED);
    } else {
      setTypedBioTitle(''); // Clear title when panel is closed
    }
    return () => clearInterval(timer);
  }, [isBioPanelOpen]);

  // Effect for What I Do Panel Title Animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWhatIDoPanelOpen) {
      const targetTitle = "Depends, who's asking?"; 
      let index = 0;
      setTypedServicesTitle(''); // Reset before starting
      timer = setInterval(() => {
        setTypedServicesTitle(targetTitle.slice(0, index));
        index++;
        if (index > targetTitle.length) {
          clearInterval(timer);
        }
      }, TYPING_SPEED);
    } else {
      setTypedServicesTitle(''); // Clear title when panel is closed
    }
    return () => clearInterval(timer);
  }, [isWhatIDoPanelOpen]);

  // Effect for Projects Panel Title Animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isProjectsPanelOpen) {
      const targetTitle = "My Workshop";
      let index = 0;
      setTypedProjectsTitle(''); // Reset before starting
      timer = setInterval(() => {
        setTypedProjectsTitle(targetTitle.slice(0, index));
        index++;
        if (index > targetTitle.length) {
          clearInterval(timer);
        }
      }, TYPING_SPEED);
    } else {
      setTypedProjectsTitle(''); // Clear title when panel is closed
    }
    return () => clearInterval(timer);
  }, [isProjectsPanelOpen]);

  const handleCardClick = (key: string, href?: string) => {
    if (key === 'about') {
      setIsBioPanelOpen(prev => !prev);
      setIsWhatIDoPanelOpen(false);
      setIsProjectsPanelOpen(false);
    } else if (key === 'products') {
      setIsWhatIDoPanelOpen(prev => !prev);
      setIsBioPanelOpen(false);
      setIsProjectsPanelOpen(false);
    } else if (key === 'projects') {
      setIsProjectsPanelOpen(prev => !prev);
      setIsBioPanelOpen(false); 
      setIsWhatIDoPanelOpen(false);
    } else if (href && onNavLinkClick) {
      setIsBioPanelOpen(false);
      setIsWhatIDoPanelOpen(false);
      setIsProjectsPanelOpen(false);
      onNavLinkClick(href);
    }
  };

  return (
    <div className={cn(
      "w-full relative",
      "transition-opacity transition-transform duration-700 ease-in-out", 
      showNavigation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    )}>
      {/* Standard Navigation Grid Container */}
      <div className={cn(
        "w-full mb-12 md:mb-16 transition-opacity duration-300 ease-in-out",
      )}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navCards.map((card) => (
            <a 
              key={card.key}
              href={card.href}
              onClick={(e) => {
                e.preventDefault();
                handleCardClick(card.key, card.href);
              }}
              className={cn(
                "group relative bg-gray-900/70 rounded-lg p-4 border border-gray-700 hover:border-blueprint/30 hover:bg-gray-800/70 cursor-pointer overflow-hidden shadow-md h-full flex flex-col",
                "transition-colors",
                "duration-150"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-yellow-300 font-medium">{card.title}</span>
                <span className="text-gray-500 text-xs opacity-60">{card.number}</span>
              </div>
              <p className="text-gray-300 text-xs mb-3 text-left flex-grow">{card.description}</p>
              {card.progressLabel && (
                <div className="mt-1 text-gray-300 text-xs mb-2 text-left">
                  <div className="flex items-center justify-between">
                    <span>{card.progressLabel}</span>
                    <span className="text-amber-400">{card.progress}</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden mt-1">
                    <div className="bg-amber-500 h-full rounded-full" style={{width: card.progress}}></div>
                  </div>
                </div>
              )}
              {card.isContact && (
                <div className="mt-auto w-full">
                  <button className="group-hover:animate-pulse w-full bg-gray-800/80 hover:bg-gray-700 text-blueprint py-1.5 px-2 rounded-sm text-xs font-mono border border-gray-700 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blueprint/5 w-1/3 skew-x-12 transform -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                    <span className="mr-2 text-green-400">{ '>' }</span>
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
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Bio Panel using BottomSheet */}
      <BottomSheet 
        isOpen={isBioPanelOpen}
        onClose={() => setIsBioPanelOpen(false)}
        className="bg-gray-800" 
        showCloseButton={false}
      >
        {/* Terminal-style header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-300 font-mono">
              {typedBioTitle}
              {isBioPanelOpen && typedBioTitle.length < "~/bio.txt".length && <span className="animate-pulse">_</span>}
            </span>
          </div>
          <button
            onClick={() => setIsBioPanelOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close bio"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {/* Terminal Content Body */}
        <BioDisplay />
      </BottomSheet>

      {/* "What I'm Working On" Panel using BottomSheet */}
      <BottomSheet
        isOpen={isProjectsPanelOpen}
        onClose={() => setIsProjectsPanelOpen(false)}
        className="bg-gray-800"
        showCloseButton={false}
      >
        {/* Terminal-style header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-300 font-mono">
              {typedProjectsTitle}
              {isProjectsPanelOpen && typedProjectsTitle.length < "My Workshop".length && <span className="animate-pulse">_</span>}
            </span>
          </div>
          <button
            onClick={() => setIsProjectsPanelOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close workshop"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {/* Workshop Content Body */}
        <div className="p-4">
          <SolutionWorkshop />
        </div>
      </BottomSheet>

      {/* "What I Do" Panel using BottomSheet */}
      <BottomSheet
        isOpen={isWhatIDoPanelOpen}
        onClose={() => setIsWhatIDoPanelOpen(false)}
        className="bg-gray-800" 
        showCloseButton={false}
      >
        {/* Terminal-style header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-300 font-mono">
              {typedServicesTitle}
              {isWhatIDoPanelOpen && typedServicesTitle.length < "Depends, who's asking?".length && <span className="animate-pulse">_</span>}
            </span>
          </div>
          <button
            onClick={() => setIsWhatIDoPanelOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close services"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {/* Interactive Options Content Body */}
        <WhatIDoDisplay />
      </BottomSheet>
    </div> 
  );
}

export default HeroNavigation;