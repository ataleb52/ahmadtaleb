import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

interface ScrollNavbarProps {
  links: {
    label: string;
    href: string;
  }[];
  navContainerRef: React.RefObject<HTMLDivElement>;
  onLinkClick: (id: string) => void;
}

export const ScrollNavbar: React.FC<ScrollNavbarProps> = ({ 
  links, 
  navContainerRef,
  onLinkClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navContainerRef.current) {
        const containerRect = navContainerRef.current.getBoundingClientRect();
        // Show the navbar when the user has scrolled 65% through the hero section
        const scrollTriggerPoint = containerRect.height * 0.65;
        
        // When the top of the hero section is at or above this trigger point, show the navbar
        setIsVisible(-containerRect.top >= scrollTriggerPoint);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navContainerRef]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-gray-950/90 backdrop-blur-sm z-50 py-3"
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        {/* Desktop view - grid layout */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-4">
          {links.map((link, index) => (
            <a 
              key={index}
              href={link.href} 
              onClick={(e) => {
                e.preventDefault();
                onLinkClick(link.href); // Pass the full href
              }}
              className="group relative bg-gray-900/70 rounded-lg p-3 border border-gray-700 hover:border-blueprint/30 hover:bg-gray-800/70 transition-all cursor-pointer overflow-hidden shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-yellow-300 font-medium">{link.label}</span>
                <span className="text-gray-500 text-xs opacity-60">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile view - compact terminal style with dropdown */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <div className="text-yellow-300 font-mono text-sm">
              <span className="text-green-400">$</span> navigate<span className="animate-pulse">_</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="bg-gray-800 p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} className="text-yellow-300" />}
            </button>
          </div>

          {/* Mobile dropdown menu */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: mobileMenuOpen ? 'auto' : 0,
              opacity: mobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 px-1">
              {links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick(link.href); // Pass the full href
                    setMobileMenuOpen(false); // Close menu on click
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-yellow-300 transition-colors"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2 text-xs">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-yellow-300 font-medium">{link.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-500" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};