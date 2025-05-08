import { Section } from './ui/section';
import { Container } from './ui/container';
import { BlueprintAnnotation } from './ui/blueprint-annotation';
import { Button } from './ui/button';

export const LayoutShowcase = () => {
  return (
    <div className="space-y-12">
      {/* Header Section with Introduction */}
      <Section className="bg-blueprint-grid bg-opacity-10">
        <Container size="lg" className="py-8">
          <div className="mb-6">
            <BlueprintAnnotation variant="technical" className="mb-2">
              workspace/structure
            </BlueprintAnnotation>
            <h2 className="text-3xl font-heading mb-3">Layout System</h2>
            <p className="text-lg max-w-2xl">
              Carefully structured layout components that work together to create consistent, 
              responsive interfaces. <span className="text-muted-foreground italic">Yes, we've measured twice.</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="default">Explore Layouts</Button>
            <Button variant="outline">View Documentation</Button>
          </div>
        </Container>
      </Section>

      {/* Container Showcase */}
      <Section>
        <Container>
          <div className="mb-8">
            <BlueprintAnnotation variant="comment" className="mb-2">
              // container components
            </BlueprintAnnotation>
            <h3 className="text-2xl font-heading mb-2">Container Components</h3>
            <p className="text-muted-foreground mb-6">
              Containers provide consistent horizontal padding and optional max-width constraints
            </p>

            <div className="space-y-6">
              {/* Default Container */}
              <div className="border border-dashed border-border rounded-md p-4">
                <p className="text-sm font-medium mb-2">Default Container</p>
                <div className="bg-muted p-8 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">max-width: 1100px, responsive padding</span>
                </div>
              </div>
              
              {/* Small Container */}
              <div className="border border-dashed border-border rounded-md p-4">
                <p className="text-sm font-medium mb-2">Small Container</p>
                <Container size="sm" className="bg-muted p-8 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">max-width: 640px</span>
                </Container>
              </div>
              
              {/* Large Container */}
              <div className="border border-dashed border-border rounded-md p-4">
                <p className="text-sm font-medium mb-2">Large Container</p>
                <Container size="lg" className="bg-muted p-8 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">max-width: 1280px</span>
                </Container>
              </div>
              
              {/* Fluid Container */}
              <div className="border border-dashed border-border rounded-md p-4">
                <p className="text-sm font-medium mb-2">Fluid Container (Full Width)</p>
                <Container size="fluid" className="bg-muted p-8 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">No max-width constraint</span>
                </Container>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section Showcase */}
      <div className="space-y-6">
        <Container>
          <BlueprintAnnotation variant="technical" className="mb-2">
            layout/sections
          </BlueprintAnnotation>
          <h3 className="text-2xl font-heading mb-2">Section Components</h3>
          <p className="text-muted-foreground mb-6">
            Sections provide vertical spacing and can contain optional background styling
          </p>
        </Container>
        
        {/* Default Section */}
        <Section>
          <Container>
            <div className="border border-dashed border-border rounded-md p-8 text-center">
              <p className="font-medium">Default Section</p>
              <p className="text-sm text-muted-foreground">Standard vertical padding</p>
            </div>
          </Container>
        </Section>

        {/* Blueprint Section */}
        <Section variant="blueprint">
          <Container>
            <div className="border border-blueprint rounded-md p-8 text-center">
              <p className="font-medium">Blueprint Section</p>
              <p className="text-sm text-muted-foreground">With blueprint grid background</p>
            </div>
          </Container>
        </Section>

        {/* Workshop Section */}
        <Section variant="workshop">
          <Container>
            <div className="border border-workshop-wood rounded-md p-8 text-center bg-background/90">
              <p className="font-medium">Workshop Section</p>
              <p className="text-sm text-muted-foreground">With wood texture background</p>
            </div>
          </Container>
        </Section>

        {/* Muted Section */}
        <Section variant="muted">
          <Container>
            <div className="border border-dashed border-border rounded-md p-8 text-center">
              <p className="font-medium">Muted Section</p>
              <p className="text-sm text-muted-foreground">With subtle background color</p>
            </div>
          </Container>
        </Section>
      </div>

      {/* Blueprint Layout Showcase */}
      <Section variant="blueprint">
        <Container>
          <div className="mb-6">
            <BlueprintAnnotation variant="handwritten" className="mb-2">
              check out the blueprint layout
            </BlueprintAnnotation>
            <h3 className="text-2xl font-heading mb-2">Blueprint Layout</h3>
            <p className="mb-6">
              A specialized layout for technical documentation and workshop views
            </p>

            <div className="border border-border bg-background/80 rounded-md p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-1 border border-dashed border-border p-4 rounded-md">
                  <BlueprintAnnotation variant="technical" className="mb-2">
                    sidebar/nav
                  </BlueprintAnnotation>
                  <ul className="space-y-2">
                    <li className="text-sm font-medium">Navigation Item</li>
                    <li className="text-sm font-medium text-muted-foreground">Navigation Item</li>
                    <li className="text-sm font-medium text-muted-foreground">Navigation Item</li>
                    <li className="text-sm font-medium text-muted-foreground">Navigation Item</li>
                  </ul>
                </div>
                <div className="lg:col-span-3 border border-dashed border-border p-4 rounded-md">
                  <BlueprintAnnotation variant="technical" className="mb-2">
                    main/content
                  </BlueprintAnnotation>
                  <div className="prose prose-sm max-w-none">
                    <h4>Blueprint Content Area</h4>
                    <p>This area contains the main content for documentation, technical specs, or workshop instructions.</p>
                    <p className="text-muted-foreground text-sm italic">
                      The sidebar provides contextual navigation while the main area focuses on content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <BlueprintAnnotation variant="witty">
              all the layouts a workshop could need
            </BlueprintAnnotation>
          </div>
        </Container>
      </Section>

      {/* Responsive Layout Notes */}
      <Section>
        <Container size="sm">
          <div className="text-center space-y-4">
            <BlueprintAnnotation variant="comment" className="inline-block mb-2">
              // responsive design notes
            </BlueprintAnnotation>
            <h3 className="text-2xl font-heading">Responsive By Design</h3>
            <p>
              All layout components are fully responsive and adapt to different screen sizes.
              From workbench to blueprint table, from desktop to mobile.
            </p>
            <div className="flex justify-center space-x-2 mt-4">
              <div className="h-8 w-8 bg-muted rounded-md"></div>
              <div className="h-8 w-6 bg-muted rounded-md"></div>
              <div className="h-8 w-4 bg-muted rounded-md"></div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default LayoutShowcase;