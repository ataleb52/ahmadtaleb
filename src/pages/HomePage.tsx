import { useState, useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SolutionBlueprintSection } from '@/components/SolutionBlueprintSection';
import { ScrollNavbar } from '@/components/ScrollNavbar';
import { AboutMeSection } from '@/components/AboutMeSection';
import { StartupAboutSection } from '@/components/StartupAboutSection';

export default function HomePage() {
  const [heroAnimationsComplete, setHeroAnimationsComplete] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  
  // Navigation links for navbar - updated to match HeroNavigation
  const navigationLinks = [
    { label: 'Who am I', href: '#about' },
    { label: 'What I do', href: '#services' },
    { label: 'What I\'m working on', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];
  
  // This function will be called when hero animations are done
  const handleHeroComplete = () => {
    setHeroAnimationsComplete(true);
  };

  // Function to handle smooth scrolling
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <main className="relative">
      {/* Hero Section with ref for tracking */}
      <div ref={heroSectionRef}>
        <HeroSection 
          headerVisible={!heroAnimationsComplete} 
          onAnimationComplete={handleHeroComplete} 
        />
      </div>
      
      {/* Navbar that appears on scroll - now tracks the hero section */}
      <ScrollNavbar 
        links={navigationLinks} 
        navContainerRef={heroSectionRef as React.RefObject<HTMLDivElement>}
        onLinkClick={scrollToElement}
      />
      
      {/* Content sections with IDs that match navigation links */}
      <section id="solutions">
        <SolutionBlueprintSection isReady={heroAnimationsComplete} />
      </section>
      
      <section id="products" className="min-h-screen py-16 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-yellow-300 mb-8">What I do</h2>
          {/* Services content */}
        </div>
      </section>
    
      <section id="about" className="min-h-screen py-16 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-yellow-300 mb-8">Who am I</h2>
          <AboutMeSection />
        </div>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-yellow-300 mb-8">Startup</h2>
          <StartupAboutSection />
        </div>
      </section>
      
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-16 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-yellow-300 mb-8">What I'm working on</h2>
          {/* Projects content */}
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-16 bg-gray-950">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-yellow-300 mb-8">Contact</h2>
          {/* Contact content */}
        </div>
      </section>
    </main>
  );
}