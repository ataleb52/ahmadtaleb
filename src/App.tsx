import { useState } from 'react';
import ThemeShowcase from "@/components/ThemeShowcase";
import { LayoutShowcase } from "@/components/LayoutShowcase";
import { HeroSection } from "@/components/HeroSection";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from '@/components/ui/button';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState<'hero' | 'theme' | 'layout'>('hero');
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 border-b border-border">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-heading">Ahmad Taleb</h1>
              <p className="text-muted-foreground">Workshop/Blueprint Implementation</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={activeView === 'hero' ? 'default' : 'outline'} 
                onClick={() => setActiveView('hero')}
              >
                Hero
              </Button>
              <Button 
                variant={activeView === 'theme' ? 'default' : 'outline'} 
                onClick={() => setActiveView('theme')}
              >
                Theme
              </Button>
              <Button 
                variant={activeView === 'layout' ? 'default' : 'outline'} 
                onClick={() => setActiveView('layout')}
              >
                Layout
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main>
        {activeView === 'hero' && <HeroSection />}
        
        {activeView === 'theme' && (
          <Section>
            <Container>
              <ThemeShowcase />
            </Container>
          </Section>
        )}
        
        {activeView === 'layout' && <LayoutShowcase />}
      </main>
    </div>
  );
}

export default App;
