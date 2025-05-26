import { useState, useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SolutionBlueprintSection } from '@/components/SolutionBlueprintSection';
import { ScrollNavbar } from '@/components/ScrollNavbar';
import { Container } from '@/components/ui/container';
import { AboutMeSection } from '@/components/AboutMeSection';
import { StartupAboutSection } from '@/components/StartupAboutSection';
import { StartupSwissArmySection } from '@/components/StartupSwissArmySection';
import { CorporateDiagnosticSection } from '@/components/CorporateDiagnosticSection';
import { ManifestoSection } from '@/components/ManifestoSection';
import { TerminalBioSection } from '@/components/TerminalBioSection'; // Import the new component
import '@/styles/animations.css'; // Import animations

export default function HomePage() {
  const [heroAnimationsComplete, setHeroAnimationsComplete] = useState(false);
  const [isTerminalBioVisible, setIsTerminalBioVisible] = useState(false); // State for terminal bio visibility
  const heroSectionRef = useRef<HTMLDivElement>(null);
  
  // Navigation links for navbar - updated to match HeroNavigation
  const navigationLinks = [
    { label: 'Who am I', href: '#about' },
    { label: 'What I do', href: '#products' }, // Corrected href to match section ID
    { label: 'What I\'m working on', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];
  
  // This function will be called when hero animations are done
  const handleHeroComplete = () => {
    setHeroAnimationsComplete(true);
  };

  // Function to handle smooth scrolling or opening terminal bio
  const handleNavLinkClick = (href: string) => { 
    if (href === '#about') {
      setIsTerminalBioVisible(true);
    } else {
      const elementId = href.substring(1); // Remove # for getElementById
      const element = document.getElementById(elementId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };
  
  return (
    <main>
      {/* Hero Section */}
      <div ref={heroSectionRef}>
        <HeroSection 
          headerVisible={!heroAnimationsComplete} 
          onAnimationComplete={handleHeroComplete}
          // Pass down the state and handler
          isTerminalBioVisible={isTerminalBioVisible}
          onNavLinkClick={handleNavLinkClick} 
        />
      </div>
      
      <ScrollNavbar 
        links={navigationLinks} 
        navContainerRef={heroSectionRef as React.RefObject<HTMLDivElement>} // Added type assertion
        onLinkClick={handleNavLinkClick} // Updated to use the new handler
      />
      
      {/* Manifesto Section */}
      <section id="manifesto" className="relative">
        <ManifestoSection />
      </section>
      
      {/* Solutions Section */}
      <section id="solutions" className="bg-white">
        <Container>
          <SolutionBlueprintSection isReady={heroAnimationsComplete} />
        </Container>
      </section>
      
      {/* Products Section */}
      <section id="products" className="bg-blue-50">
        <Container padded="lg">
          <h2 className="text-3xl font-bold text-yellow-300 mb-8">What I do</h2>
          {/* Services content */}
        </Container>
      </section>
    
      {/* About Section */}
      <section id="about" className="bg-gray-800">
        <Container padded="lg">
          <h2 className="text-4xl font-bold text-yellow-300 mb-8">Who am I</h2>
          <AboutMeSection />
        </Container>
        
        <Container padded="lg" blueprint>
          <h2 className="text-4xl font-bold text-yellow-300 mb-8">Corporate Diagnostic</h2>
          <CorporateDiagnosticSection />
        </Container>
        
        <Container padded="lg">
          <h2 className="text-4xl font-bold text-yellow-300 mb-8">Startup</h2>
          <StartupAboutSection />
        </Container>
        
        <Container padded="lg" blueprint>
          <h2 className="text-4xl font-bold text-yellow-300 mb-8">Swiss Army Knife</h2>
          <StartupSwissArmySection />
        </Container>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="bg-gray-900">
        <Container padded="lg">
          <h2 className="text-3xl font-bold text-yellow-300 mb-8">What I'm working on</h2>
          {/* Projects content */}
        </Container>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="bg-gray-950">
        <Container padded="lg">
          <h2 className="text-3xl font-bold text-yellow-300 mb-8">Contact</h2>
          {/* Contact content */}
        </Container>
      </section>

      {/* Terminal Bio Section - Rendered conditionally */}
      <TerminalBioSection 
        isVisible={isTerminalBioVisible} 
        onClose={() => setIsTerminalBioVisible(false)} 
      />
    </main>
  );
}