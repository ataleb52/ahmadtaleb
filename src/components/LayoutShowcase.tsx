import { Container } from "./ui/container";
import { Grid, AutoGrid } from "./ui/grid";
import { Section } from "./ui/section";
import { BlueprintLayout } from "./layout/BlueprintLayout";
import { Button } from "./ui/button";

export function LayoutShowcase() {
  return (
    <div>
      <Section variant="blueprint" className="mb-8">
        <Container>
          <h2 className="text-3xl font-heading mb-6">Layout System</h2>
          <p className="text-lg mb-8">
            This layout system implements Ahmad Taleb's workshop/blueprint aesthetic 
            with responsive containers, grid systems, and blueprint styling.
          </p>
          
          {/* Container Sizes Section */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-heading mb-4">Container Sizes</h3>
              <p className="mb-6">
                Containers provide consistent max-width constraints and horizontal padding.
              </p>
              
              <div className="space-y-8">
                <Container size="sm" className="bg-card/30 p-4 border border-dashed border-border">
                  <div className="text-center">
                    <code className="font-mono text-sm">Container (size="sm")</code>
                  </div>
                </Container>
                
                <Container size="md" className="bg-card/30 p-4 border border-dashed border-border">
                  <div className="text-center">
                    <code className="font-mono text-sm">Container (size="md")</code>
                  </div>
                </Container>
                
                <Container size="default" className="bg-card/30 p-4 border border-dashed border-border">
                  <div className="text-center">
                    <code className="font-mono text-sm">Container (size="default")</code>
                  </div>
                </Container>
                
                <Container size="full" className="bg-card/30 p-4 border border-dashed border-border">
                  <div className="text-center">
                    <code className="font-mono text-sm">Container (size="full")</code>
                  </div>
                </Container>
              </div>
            </div>
            
            {/* Grid System Section */}
            <div>
              <h3 className="text-2xl font-heading mb-4">Grid System</h3>
              <p className="mb-6">
                Grid layouts that adapt to different screen sizes and maintain the blueprint aesthetic.
              </p>
              
              <div className="space-y-8">
                <div>
                  <p className="text-sm mb-2 font-mono text-blueprint-annotation">// 2-column grid (default)</p>
                  <Grid className="mb-8">
                    {Array(4).fill(0).map((_, i) => (
                      <div key={i} className="bg-card p-4 border border-border rounded-md flex items-center justify-center h-20">
                        Grid Item {i + 1}
                      </div>
                    ))}
                  </Grid>
                </div>
                
                <div>
                  <p className="text-sm mb-2 font-mono text-blueprint-annotation">// 3-column grid with blueprint style</p>
                  <Grid cols={3} blueprint className="mb-8">
                    {Array(6).fill(0).map((_, i) => (
                      <div key={i} className="bg-card p-4 border border-border rounded-md flex items-center justify-center h-20">
                        Grid Item {i + 1}
                      </div>
                    ))}
                  </Grid>
                </div>
                
                <div>
                  <p className="text-sm mb-2 font-mono text-blueprint-annotation">// Auto-grid with minimum width</p>
                  <AutoGrid minItemWidth="150px" gapX="md" className="mb-8">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="bg-card p-4 border border-border rounded-md flex items-center justify-center h-20">
                        Auto Item {i + 1}
                      </div>
                    ))}
                  </AutoGrid>
                </div>
              </div>
            </div>
            
            {/* Section Variants */}
            <div>
              <h3 className="text-2xl font-heading mb-4">Section Variants</h3>
              <p className="mb-6">
                Different section styles to create visual hierarchy and reinforce the workshop aesthetic.
              </p>
              
              <div className="space-y-8">
                <Section variant="default" className="border border-dashed border-border">
                  <div className="p-4">
                    <h4 className="font-heading text-xl mb-2">Default Section</h4>
                    <p>Standard section with minimal styling</p>
                  </div>
                </Section>
                
                <Section variant="blueprint" padding="sm">
                  <div className="p-4">
                    <h4 className="font-heading text-xl mb-2">Blueprint Section</h4>
                    <p>Section with blueprint styling and borders</p>
                  </div>
                </Section>
                
                <Section variant="workshop" padding="sm">
                  <div className="p-4">
                    <h4 className="font-heading text-xl mb-2">Workshop Section</h4>
                    <p>Section styled with workshop aesthetic</p>
                  </div>
                </Section>
                
                <Section variant="wood" padding="sm">
                  <div className="p-4">
                    <h4 className="font-heading text-xl mb-2">Wood Section</h4>
                    <p>Section with wood texture background</p>
                  </div>
                </Section>
              </div>
            </div>
            
            {/* Blueprint Layout */}
            <div>
              <h3 className="text-2xl font-heading mb-4">Blueprint Layout</h3>
              <p className="mb-6">
                Special layout for detailed workshop/blueprint components.
              </p>
              
              <BlueprintLayout className="mb-8">
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                  <h4 className="font-heading text-xl mb-2">Blueprint Content</h4>
                  <p className="mb-4 text-center max-w-md">
                    This layout includes graph paper background, measurement markers,
                    and optional axis lines for technical elements.
                  </p>
                  <Button variant="default">Workshop Action</Button>
                </div>
              </BlueprintLayout>
              
              <BlueprintLayout gridSize="sm" showAxis={false} className="mb-8">
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                  <h4 className="font-heading text-xl mb-2">Small Grid Blueprint</h4>
                  <p className="mb-4 text-center max-w-md">
                    Blueprint with smaller grid and no axis lines.
                  </p>
                </div>
              </BlueprintLayout>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* Responsive Layout Examples */}
      <Section variant="default">
        <Container>
          <h3 className="text-2xl font-heading mb-4">Responsive Layout Examples</h3>
          <p className="mb-6">
            Examples of responsive layouts using the container and grid components.
            Resize your browser to see how these adapt to different screen sizes.
          </p>
          
          <Grid cols={3} className="mb-8">
            <div className="bg-card p-4 lg:col-span-2 border border-border rounded-md">
              <h4 className="font-heading text-lg mb-2">Main Content</h4>
              <p>This area spans 2 columns on large screens but stacks on mobile.</p>
            </div>
            <div className="bg-card p-4 border border-border rounded-md">
              <h4 className="font-heading text-lg mb-2">Sidebar</h4>
              <p>This sidebar is a single column.</p>
            </div>
          </Grid>
          
          <Grid cols={4} className="mb-8">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-card p-4 border border-border rounded-md">
                <h4 className="font-heading text-lg mb-2">Feature {i + 1}</h4>
                <p>Responsive feature card that adapts to screen width.</p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>
    </div>
  );
}