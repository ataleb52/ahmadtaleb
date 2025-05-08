import { Button } from './ui/button';

export const ThemeShowcase = () => {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-3xl font-heading mb-4">Workshop/Blueprint Theme</h2>
        <p className="text-lg mb-6">
          This theme implements Ahmad Taleb's brand identity with a workshop/blueprint aesthetic.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Color Palette Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading">Color Palette</h3>
            
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
              
              <h4 className="text-xl">Component Colors</h4>
              <div className="grid grid-cols-2 gap-2">
                <ColorSwatch name="Card" color="bg-card" textColor="text-card-foreground" />
                <ColorSwatch name="Border" color="border border-4 border-border bg-background" textColor="text-foreground" />
                <ColorSwatch name="Destructive" color="bg-destructive" textColor="text-white" />
                <ColorSwatch name="Blueprint Grid" color="bg-blueprint-grid" textColor="text-foreground" />
              </div>
            </div>
          </div>
          
          {/* Typography Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading">Typography</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-xl">Heading Font (Space Grotesk)</h4>
                <div className="space-y-2 font-heading">
                  <p className="text-4xl">The Workshop Blueprint (h1)</p>
                  <p className="text-3xl">Systems Thinking (h2)</p>
                  <p className="text-2xl">Problem Solving (h3)</p>
                  <p className="text-xl">Direct Approach (h4)</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-xl">Body Font (Inter)</h4>
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
              
              <div className="space-y-2">
                <h4 className="text-xl">Blueprint Annotations</h4>
                <div className="space-y-2">
                  <p className="font-mono text-blueprint-annotation text-sm">
                    // ANNOTATION: Blueprint-style text for technical notes
                  </p>
                  <p className="blueprint-annotation">
                    SYSTEM INTEGRATION POINT: This connects to the main framework
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Component Examples Section */}
      <section className="space-y-4">
        <h3 className="text-2xl font-heading">Component Examples</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Component Examples */}
          <div className="space-y-4">
            <h4 className="text-xl">Button Variants</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          
          {/* Workshop Panel */}
          <div className="space-y-4">
            <h4 className="text-xl">Workshop Panel</h4>
            <div className="workshop-panel p-4">
              <h5 className="font-heading text-lg">Blueprint Section</h5>
              <p className="text-sm mb-2">This panel demonstrates the blueprint grid background.</p>
              <div className="blueprint-annotation text-sm">// NOTES: Integrate with system</div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Patterns */}
      <section className="space-y-4">
        <h3 className="text-2xl font-heading">Background Patterns</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-36 bg-blueprint-grid rounded-md flex items-center justify-center">
            <span className="font-medium bg-background px-2 py-1 rounded">Blueprint Grid</span>
          </div>
          
          <div className="h-36 rounded-md flex items-center justify-center" 
               style={{ backgroundImage: 'var(--bg-wood-texture)', backgroundSize: '20px 20px' }}>
            <span className="font-medium bg-background px-2 py-1 rounded">Wood Texture</span>
          </div>
          
          <div className="h-36 rounded-md flex items-center justify-center" 
               style={{ backgroundImage: 'var(--bg-graph-paper)', backgroundSize: '10px 10px' }}>
            <span className="font-medium bg-background px-2 py-1 rounded">Graph Paper</span>
          </div>
        </div>
      </section>
      
      {/* Theme Toggle Section */}
      <section className="space-y-4">
        <h3 className="text-2xl font-heading">Theme Toggle</h3>
        <p>Toggle between light and dark modes using the button below:</p>
        <Button 
          onClick={() => document.documentElement.classList.toggle('dark')}
          variant="outline"
        >
          Toggle Theme
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

export default ThemeShowcase;