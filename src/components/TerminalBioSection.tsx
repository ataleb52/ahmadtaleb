import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TerminalBioSectionProps {
  isVisible: boolean;
  onClose: () => void;
  // To match HeroNavigation's container style if needed, or for specific card styling
  className?: string; 
}

const bioContentRaw = `I’m a Tucson native, product of the ’90s — a Blink-182-listening, Gameboy-wielding kid who spent his childhood climbing trees, running around playgrounds, and staying out until the streetlights came on.

I grew up in a small business family. Washed vans. Peeled potatoes. Helped customers. Loaded trucks. You get it.

These days, I solve problems for a living.
Sometimes with software. Sometimes with strategy.
Always with initiative, craftsmanship — and above all, integrity.

I’ve spent years in tech learning how systems grow, break, and compound — and how to apply those lessons in places they’re usually ignored. Whether it’s a scrappy business or a complex team, I help build the kind of solutions that hold up over time.

My personal motto? “I’ll figure it out.”
I’ve got a knack for jumping into the deep end and learning how to swim — fast.

The three things I do best:
	1.	Listen.
	2.	Understand the problem — and the people experiencing it.
	3.	Build solutions that give people and businesses control of their experience.

I believe the best solutions leave people better off — not just with something that works, but with something they own.`;

export const TerminalBioSection: React.FC<TerminalBioSectionProps> = ({ 
  isVisible, 
  onClose,
  className 
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setAnimationClass('animate-slide-in-right');
      });
    } else if (shouldRender) {
      setAnimationClass('animate-slide-out-right');
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isVisible, shouldRender]);

  if (!shouldRender && !isVisible) { // Only return null if not visible and not meant to be rendered for exit animation
    return null;
  }

  const paragraphs = bioContentRaw.split('\\n\\n');
  const listSectionIndex = paragraphs.findIndex(p => p.startsWith("The three things I do best:"));
  
  let mainParagraphs = [...paragraphs];
  let listItems: string[] = [];
  let listTitle = "";

  if (listSectionIndex !== -1) {
    const listBlock = paragraphs[listSectionIndex];
    mainParagraphs.splice(listSectionIndex, 1);
    const lines = listBlock.split('\\n');
    listTitle = lines[0];
    listItems = lines.slice(1).map(item => item.replace(/^\\s*\\d+\\.\\s*/, '').trim());
  }

  // Base classes for the card, similar to HeroNavigation cards but adapted
  const baseCardClasses = "bg-gray-900/80 border border-gray-700 rounded-lg p-4 shadow-lg w-full";
  // Height could be tricky. If HeroNavigation's container has a fixed height, we might need to match it.
  // For now, let's make it reasonably tall for content.
  const heightClasses = "min-h-[200px] md:min-h-[240px]"; // Example height, adjust as needed

  return (
    // This div is now the card itself, not a full-screen overlay.
    // It will be positioned by its parent in HeroSection.
    // The animation class controls its slide in/out.
    <div 
      className={cn(
        baseCardClasses,
        heightClasses,
        "text-green-400 font-mono overflow-y-auto relative",
        animationClass, // Apply slide-in/out for the card itself
        !isVisible && !shouldRender ? 'hidden' : 'block', // Hide if not visible and not animating out
        className // Allow parent to pass additional classes
      )}
      // onClick={(e) => e.stopPropagation()} // Stop propagation if needed, but maybe not for a card
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl leading-none z-10"
        aria-label="Close"
      >
        &times;
      </button>
      
      <div className="mb-3 text-sm">
        <span className="text-yellow-400">user@ahmadtaleb.com</span>
        <span className="text-gray-500">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-gray-500">$</span>
        <span className="ml-2 text-gray-300">cat /Users/ahmadtaleb/bio.txt</span>
      </div>
      
      <div className="whitespace-pre-wrap text-gray-300 text-xs sm:text-sm leading-relaxed">
        {mainParagraphs.map((paragraph, index) => (
          <p key={index} className="mb-3">{paragraph}</p>
        ))}
        {listItems.length > 0 && (
          <>
            <p className="mb-1">{listTitle}</p>
            <ul className="list-none pl-0 mb-3">
              {listItems.map((item, index) => (
                <li key={index} className="mb-0.5 ml-3"><span className="text-green-500 mr-1.5">-&gt;</span>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="mt-3 text-sm">
        <span className="text-yellow-400">user@ahmadtaleb.com</span>
        <span className="text-gray-500">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-gray-500">$</span>
        <span className="animate-pulse ml-1 text-green-400">_</span>
      </div>
    </div>
  );
};
