import { useState } from 'react';
import ThemeShowcase from "@/components/ThemeShowcase";
import { LayoutShowcase } from "@/components/LayoutShowcase";
import { BlueprintAnnotationShowcase } from "@/components/BlueprintAnnotationShowcase";
import { CardShowcase } from "@/components/CardShowcase";
import { GridShowcase } from "@/components/GridShowcase";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from '@/components/ui/button';

export default function DevPage() {
  const [activeView, setActiveView] = useState<'theme' | 'layout' | 'components'>('theme');
  const [activeComponent, setActiveComponent] = useState<'annotations' | 'cards' | 'grid' | 'buttons' | 'nodes'>('annotations');

  return (
    <div>
      <Section className="bg-muted/30">
        <Container>
          <div className="mb-6">
            <h2 className="font-heading text-2xl mb-2">Development Components</h2>
            <p className="text-muted-foreground">These components are only visible in development mode.</p>
          </div>

          <div className="flex gap-2 mb-6">
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
            <Button 
              variant={activeView === 'components' ? 'default' : 'outline'} 
              onClick={() => setActiveView('components')}
            >
              Components
            </Button>
          </div>
        </Container>
      </Section>

      {activeView === 'theme' && (
        <Section>
          <Container>
            <ThemeShowcase />
          </Container>
        </Section>
      )}
      
      {activeView === 'layout' && <LayoutShowcase />}
      
      {activeView === 'components' && (
        <>
          <div className="border-b border-border">
            <Container>
              <div className="flex gap-2 py-2 overflow-x-auto">
                <Button 
                  variant={activeComponent === 'annotations' ? 'default' : 'outline'} 
                  onClick={() => setActiveComponent('annotations')}
                  size="sm"
                >
                  Blueprint Annotations
                </Button>
                <Button 
                  variant={activeComponent === 'cards' ? 'default' : 'outline'} 
                  onClick={() => setActiveComponent('cards')}
                  size="sm"
                >
                  Cards
                </Button>
                <Button 
                  variant={activeComponent === 'grid' ? 'default' : 'outline'} 
                  onClick={() => setActiveComponent('grid')}
                  size="sm"
                >
                  Grid
                </Button>
                <Button 
                  variant={activeComponent === 'buttons' ? 'default' : 'outline'} 
                  onClick={() => setActiveComponent('buttons')}
                  size="sm"
                  disabled
                >
                  Buttons
                </Button>
                <Button 
                  variant={activeComponent === 'nodes' ? 'default' : 'outline'} 
                  onClick={() => setActiveComponent('nodes')}
                  size="sm"
                  disabled
                >
                  Nodes
                </Button>
              </div>
            </Container>
          </div>
          
          {activeComponent === 'annotations' && <BlueprintAnnotationShowcase />}
          {activeComponent === 'cards' && <CardShowcase />}
          {activeComponent === 'grid' && <GridShowcase />}
        </>
      )}
    </div>
  );
}