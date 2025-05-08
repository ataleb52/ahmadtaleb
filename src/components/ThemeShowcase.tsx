import { Button } from './ui/button';
import { BlueprintAnnotation } from './ui/blueprint-annotation';
import { useState } from 'react';

export const ThemeShowcase = () => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components' | 'patterns'>('colors');
  
  return (
    <div className="p-8 space-y-8">
      <section>
        <BlueprintAnnotation variant="comment" className="mb-2">
          // theme system initialization
        </BlueprintAnnotation>
        <h2 className="text-3xl font-heading mb-4">Workshop/Blueprint Theme</h2>
        <p className="text-lg mb-6">
          A carefully crafted theme that balances technical precision with approachable wit.
          <span className="text-muted-foreground italic"> The rarest of combinations.</span>
        </p>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          <TabButton 
            active={activeTab === 'colors'} 
            onClick={() => setActiveTab('colors')}
            label="Colors"
          />
          <TabButton 
            active={activeTab === 'typography'} 
            onClick={() => setActiveTab('typography')}
            label="Typography" 
          />
          <TabButton 
            active={activeTab === 'components'} 
            onClick={() => setActiveTab('components')}
            label="Components" 
          />
          <TabButton 
            active={activeTab === 'patterns'} 
            onClick={() => setActiveTab('patterns')}
            label="Patterns" 
          />
        </div>
        
        {/* Colors Tab Content */}
        {activeTab === 'colors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-heading">Color Palette</h3>
                <BlueprintAnnotation variant="witty" className="text-xs">
                  not your average blues and grays
                </BlueprintAnnotation>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl">Primary Colors</h4>
                <div className="grid grid-cols-2 gap-2">
                  <ColorSwatch name="Background" color="bg-background" textColor="text-foreground" />
                  <ColorSwatch name="Foreground" color="bg-foreground" textColor="text-background" />
                  <ColorSwatch name="Blueprint" color="bg-blueprint" textColor="text-white" />
                  <ColorSwatch name="Workshop Wood" color="bg-workshop-wood" textColor="text-white" />
                </div>
                
                <h4 className="text-xl">UI Colors</h4>
                <div className="grid grid-cols-2 gap-2">
                  <ColorSwatch name="Primary" color="bg-primary" textColor="text-primary-foreground" />
                  <ColorSwatch name="Secondary" color="bg-secondary" textColor="text-secondary-foreground" />
                  <ColorSwatch name="Accent" color="bg-accent" textColor="text-accent-foreground" />
                  <ColorSwatch name="Muted" color="bg-muted" textColor="text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-heading">Component Colors</h3>
                <BlueprintAnnotation variant="technical" className="text-xs">
                  system/theme/components
                </BlueprintAnnotation>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <ColorSwatch name="Card" color="bg-card" textColor="text-card-foreground" />
                  <ColorSwatch name="Border" color="border border-4 border-border bg-background" textColor="text-foreground" />
                  <ColorSwatch name="Destructive" color="bg-destructive" textColor="text-white" />
                  <ColorSwatch name="Blueprint Grid" color="bg-blueprint-grid" textColor="text-foreground" />
                </div>
                
                <div className="p-4 border border-dashed border-border rounded-md">
                  <p className="text-sm">
                    Colors are carefully selected to maintain contrast and accessibility while preserving the workshop aesthetic.
                    <span className="block mt-2 text-muted-foreground italic text-xs">
                      Because being able to read the text is somewhat important.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Typography Tab Content */}
        {activeTab === 'typography' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-heading">Typography</h3>
                <BlueprintAnnotation variant="witty" className="text-xs">
                  fonts with personality, just like me
                </BlueprintAnnotation>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xl">Heading Font</h4>
                  <div className="space-y-2 font-heading">
                    <p className="text-4xl">The Workshop Blueprint</p>
                    <p className="text-3xl">Systems Thinking</p>
                    <p className="text-2xl">Problem Solving</p>
                    <p className="text-xl">Direct Approach</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl">Body Font</h4>
                  <div className="space-y-2">
                    <p className="text-base">
                      Primary text demonstrates clean and efficient typography for improved readability.
                    </p>
                    <p className="text-sm">
                      Smaller text size maintains legibility while saving space.
                    </p>
                    <p className="text-xs">
                      Fine print and micro text for supplementary information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-heading">Blueprint Annotations</h3>
                <BlueprintAnnotation variant="technical" className="text-xs">
                  documentation/notes
                </BlueprintAnnotation>
              </div>
              
              <div className="space-y-4 p-4 border border-border rounded-md bg-card/50">
                <BlueprintAnnotation variant="comment">
                  // standard comment annotation for code-like references
                </BlueprintAnnotation>
                
                <BlueprintAnnotation variant="technical">
                  system: initializing framework components
                </BlueprintAnnotation>
                
                <BlueprintAnnotation variant="witty">
                  caffeine levels: optimal for problem solving
                </BlueprintAnnotation>
                
                <BlueprintAnnotation variant="handwritten">
                  Remember to fix that thing later
                </BlueprintAnnotation>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>Annotations add personality and technical details without overwhelming the interface.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Components Tab Content */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-heading">Component Examples</h3>
              <BlueprintAnnotation variant="witty" className="text-xs">
                buttons that actually do things
              </BlueprintAnnotation>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 border border-border rounded-md">
                <h4 className="text-xl">Button Variants</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button variant="default" size="sm">Small</Button>
                  <Button variant="default" size="default">Default</Button>
                  <Button variant="default" size="lg">Large</Button>
                </div>
              </div>
              
              <div className="space-y-4 p-4 border border-border rounded-md">
                <h4 className="text-xl">Workshop Panel</h4>
                <div className="workshop-panel p-4 rounded-md">
                  <h5 className="font-heading text-lg">Blueprint Section</h5>
                  <p className="text-sm mb-2">This panel demonstrates the blueprint grid background.</p>
                  <BlueprintAnnotation variant="technical" className="text-sm">
                    integration: system framework
                  </BlueprintAnnotation>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Background Patterns Tab Content */}
        {activeTab === 'patterns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-heading">Background Patterns</h3>
              <BlueprintAnnotation variant="technical" className="text-xs">
                system/textures
              </BlueprintAnnotation>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-36 bg-blueprint-grid rounded-md flex items-center justify-center">
                <span className="font-medium bg-background/90 px-2 py-1 rounded">Blueprint Grid</span>
              </div>
              
              <div className="h-36 rounded-md flex items-center justify-center" 
                  style={{ backgroundImage: 'var(--bg-wood-texture)', backgroundSize: '20px 20px' }}>
                <span className="font-medium bg-background/90 px-2 py-1 rounded">Wood Texture</span>
              </div>
              
              <div className="h-36 rounded-md flex items-center justify-center" 
                  style={{ backgroundImage: 'var(--bg-graph-paper)', backgroundSize: '10px 10px' }}>
                <span className="font-medium bg-background/90 px-2 py-1 rounded">Graph Paper</span>
              </div>
            </div>
            
            <div className="p-4 rounded-md border border-dashed border-border">
              <p className="text-sm">
                These textures create depth and character while maintaining readability.
                <span className="block mt-2 text-muted-foreground italic text-xs">
                  Like a well-designed workshop that's both functional and has personality.
                </span>
              </p>
            </div>
          </div>
        )}
      </section>
      
      {/* Theme Toggle Section */}
      <section className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-heading">Theme Toggle</h3>
          <BlueprintAnnotation variant="witty" className="text-xs">
            light/dark - choose your adventure
          </BlueprintAnnotation>
        </div>
        
        <p>Toggle between light mode (day shift) and dark mode (night shift):</p>
        
        <Button 
          onClick={() => document.documentElement.classList.toggle('dark')}
          variant="outline"
          className="group relative overflow-hidden"
        >
          <span className="relative z-10">Toggle Theme</span>
          <span className="absolute inset-0 bg-blueprint opacity-0 group-hover:opacity-10 transition-opacity"></span>
        </Button>
      </section>
    </div>
  );
};

// Helper component for displaying color swatches
const ColorSwatch = ({ name, color, textColor }: { name: string; color: string; textColor: string }) => {
  return (
    <div className={`h-20 ${color} rounded-md flex flex-col items-center justify-center ${textColor}`}>
      <span className="font-medium">{name}</span>
    </div>
  );
};

// Helper component for tab buttons
const TabButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-all relative
        ${active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blueprint"></div>
      )}
    </button>
  );
};

export default ThemeShowcase;