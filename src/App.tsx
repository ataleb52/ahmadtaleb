import { useState } from 'react';
import ThemeShowcase from "@/components/ThemeShowcase";
import { LayoutShowcase } from "@/components/LayoutShowcase";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from '@/components/ui/button';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'theme' | 'layout'>('layout');
  
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
                variant={activeTab === 'theme' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('theme')}
              >
                Theme
              </Button>
              <Button 
                variant={activeTab === 'layout' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('layout')}
              >
                Layout
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main>
        {activeTab === 'theme' ? (
          <Section>
            <Container>
              <ThemeShowcase />
            </Container>
          </Section>
        ) : (
          <LayoutShowcase />
        )}
      </main>
    </div>
  );
}

export default App;
