import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { SolutionBlueprintSection } from '@/components/SolutionBlueprintSection';

export default function HomePage() {
  const [heroAnimationsComplete, setHeroAnimationsComplete] = useState(false);
  
  // This function will be called when hero animations are done
  const handleHeroComplete = () => {
    setHeroAnimationsComplete(true);
  };
  
  return (
    <main>
      <HeroSection 
        headerVisible={false} 
        onAnimationComplete={handleHeroComplete} 
      />
      <SolutionBlueprintSection isReady={heroAnimationsComplete} />
      {/* Other page sections */}
    </main>
  );
}