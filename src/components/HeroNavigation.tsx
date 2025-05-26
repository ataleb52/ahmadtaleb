import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Pencil, X } from 'lucide-react';

// Bio content moved from TerminalBioSection.tsx
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

// Helper function to parse bio content (can be defined inside or outside component)
const ParsedBioContent = () => {
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

  return (
    <div className="text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
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
  );
};


export interface HeroNavigationProps {
  isVisible?: boolean;
  delay?: number;
  onNavLinkClick?: (href: string) => void; 
}

export function HeroNavigation({ 
  isVisible = false,
  delay = 0, 
  onNavLinkClick = () => {} 
}: HeroNavigationProps) {
  const [showNavigation, setShowNavigation] = useState(false);
  const [expandedCardKey, setExpandedCardKey] = useState<string | null>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowNavigation(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  // Click outside to close expanded card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedCardRef.current && !expandedCardRef.current.contains(event.target as Node)) {
        setExpandedCardKey(null);
      }
    };

    if (expandedCardKey) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedCardKey]);

  const handleCardClick = (key: string, href?: string) => {
    if (key === 'about') {
      setExpandedCardKey(prevKey => (prevKey === key ? null : key));
    } else if (href && onNavLinkClick) {
      setExpandedCardKey(null); // Close expanded card if navigating elsewhere
      onNavLinkClick(href); 
    }
  };

  const navCards = [
    { key: 'about', title: 'Who am I', description: 'My background, experience, and approach to solving problems.', href: '#about', number: '01' },
    { key: 'products', title: 'What I do', description: 'Product strategy, roadmapping, and helping businesses become more independent.', href: '#products', number: '02' },
    { key: 'projects', title: "What I'm working on", description: 'Making home inspections easy to understand', href: '#projects', number: '03', progressLabel: 'ClearCasa.io MVP', progress: '80%' },
    { key: 'contact', title: 'Contact', description: "Let's discuss your business challenges and how I can help you solve them.", href: '#contact', number: '04', isContact: true },
  ];

  const isAboutCardExpanded = expandedCardKey === 'about';

  return (
    <div className={cn(
      "w-full relative",
      "transition-all duration-700",
      showNavigation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    )}>
      {/* Standard Navigation Grid Container */}
      <div className={cn(
        "w-full mb-12 md:mb-16 transition-opacity duration-300 ease-in-out",
        isAboutCardExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navCards.map((card) => (
            <a 
              key={card.key}
              href={card.href} // href is still useful for context, even if prevented
              onClick={(e) => {
                e.preventDefault();
                handleCardClick(card.key, card.href);
              }}
              className={cn(
                "group relative bg-gray-900/70 rounded-lg p-4 border border-gray-700 hover:border-blueprint/30 hover:bg-gray-800/70 transition-all cursor-pointer overflow-hidden shadow-md h-full flex flex-col" // Added h-full and flex for consistent card height if needed
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-yellow-300 font-medium">{card.title}</span>
                <span className="text-gray-500 text-xs opacity-60">{card.number}</span>
              </div>
              <p className="text-gray-300 text-xs mb-3 text-left flex-grow">{card.description}</p> {/* Added flex-grow to description */}
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

      {/* Expanded "Who I am" card - rendered only when isAboutCardExpanded is true */}
      {isAboutCardExpanded && (
        // const aboutCardData = navCards.find(c => c.key === 'about')!; // Removed as unused, content is static for bio
        <div
          ref={expandedCardRef}
          className={cn(
            "absolute inset-x-0 top-0 z-20",
            "bg-gray-900/95 border border-gray-700 rounded-lg p-4 shadow-xl",
            "w-full max-w-4xl mx-auto", 
            "min-h-[300px] md:min-h-[400px] max-h-[80vh]",
            "text-green-400 font-mono overflow-y-auto",
            "transition-all duration-300 ease-in-out", // Adjusted duration and easing
            isAboutCardExpanded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none" // Should always be visible if rendered here
          )}
          style={{ backdropFilter: 'blur(8px)'}}
        >
          <button
            onClick={() => handleCardClick('about')} // Toggle off
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-30"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          
          <div className="mb-3 text-sm pt-2">
            <span className="text-yellow-400">user@ahmadtaleb.com</span>
            <span className="text-gray-500">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-500">$</span>
            <span className="ml-2 text-gray-300">cat /Users/ahmadtaleb/bio.txt</span>
          </div>
          
          <ParsedBioContent />
          
          <div className="mt-3 text-sm">
            <span className="text-yellow-400">user@ahmadtaleb.com</span>
            <span className="text-gray-500">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-500">$</span>
            <span className="animate-pulse ml-1 text-green-400">_</span>
          </div>
        </div>
      )}
    </div>
  );
}