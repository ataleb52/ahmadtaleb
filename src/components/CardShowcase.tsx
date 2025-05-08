import { Container } from "./ui/container";
import { Section } from "./ui/section";
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  BlueprintCardHeader,
  BlueprintCardFooter
} from "./ui/card";
import { BlueprintAnnotation } from "./ui/blueprint-annotation";
import { Button } from "./ui/button";

export function CardShowcase() {
  return (
    <Section variant="default" padding="lg">
      <Container size="lg">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-heading mb-4">Workshop Card Components</h1>
            <p className="text-lg mb-6">
              Professionally designed cards with a touch of humor and character.
              Various styling options support Ahmad's problem-solving approach.
            </p>
          </div>
          
          {/* Basic Card Variants */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Card Variants & Elevations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Default Card */}
              <Card elevation="raised">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Standard yet sophisticated</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card uses the standard styling with our new rounded corners and lighter appearance.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Take Action</Button>
                </CardFooter>
              </Card>
              
              {/* Blueprint Card */}
              <Card variant="blueprint" elevation="floating">
                <BlueprintCardHeader>
                  <CardTitle>Blueprint Card</CardTitle>
                  <CardDescription>Technical with personality</CardDescription>
                </BlueprintCardHeader>
                <CardContent>
                  <p>A technical card with subtle grid background that won't overwhelm your content.</p>
                </CardContent>
                <BlueprintCardFooter>
                  <Button variant="outline" size="sm">View Details</Button>
                </BlueprintCardFooter>
              </Card>
              
              {/* Workshop Card */}
              <Card variant="workshop" radius="full">
                <CardHeader>
                  <CardTitle>Workshop Card</CardTitle>
                  <CardDescription>Practical and approachable</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>A workshop-inspired panel with a clean, professional look that remains approachable.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Explore</Button>
                </CardFooter>
              </Card>
              
              {/* Wood Card */}
              <Card variant="wood" elevation="flat">
                <CardHeader>
                  <CardTitle>Wood Card</CardTitle>
                  <CardDescription>Subtle wood grain texture</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card features a refined wood texture that adds character without being childish.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Build</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Card Radius Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Corner Radius Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card radius="default" className="aspect-video flex items-center justify-center">
                <CardTitle className="text-center">Default Rounded</CardTitle>
              </Card>
              <Card radius="full" className="aspect-video flex items-center justify-center">
                <CardTitle className="text-center">Fully Rounded</CardTitle>
              </Card>
              <Card radius="none" className="aspect-video flex items-center justify-center">
                <CardTitle className="text-center">No Rounding</CardTitle>
              </Card>
            </div>
          </div>
          
          {/* Practical Use Cases */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Professional with a Touch of Humor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Project Blueprint */}
              <Card variant="blueprint" elevation="raised" radius="full" className="flex flex-col">
                <BlueprintCardHeader className="relative">
                  <BlueprintAnnotation 
                    variant="note" 
                    className="absolute right-6 top-6"
                  >
                    Project Outline
                  </BlueprintAnnotation>
                  <CardTitle>System Architecture</CardTitle>
                  <CardDescription>Less intimidating, more accessible</CardDescription>
                </BlueprintCardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <BlueprintAnnotation variant="comment" className="mb-2">
                      // Key components that might actually work
                    </BlueprintAnnotation>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>User-friendly interface (allegedly)</li>
                      <li>Data processing pipeline (when it feels like it)</li>
                      <li>Analytics backend (60% of the time, works every time)</li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 relative">
                    <div className="absolute -left-3 top-1/2 h-16 border-l-2 border-dashed border-blueprint-grid/40"></div>
                    <div className="pl-6">
                      <BlueprintAnnotation variant="witty" withLineDraw linePosition="left" lineLength="sm">
                        Connection points
                      </BlueprintAnnotation>
                      <p className="mt-2">Where systems meet and occasionally communicate</p>
                    </div>
                  </div>
                </CardContent>
                <BlueprintCardFooter className="justify-between">
                  <BlueprintAnnotation variant="measurement">v2.0.1</BlueprintAnnotation>
                  <Button>View Blueprint</Button>
                </BlueprintCardFooter>
              </Card>
              
              {/* Workshop Tool */}
              <Card variant="workshop" elevation="floating" radius="default" className="flex flex-col">
                <CardHeader>
                  <CardTitle>Ahmad's Methodology</CardTitle>
                  <CardDescription>Solving problems with wit and wisdom</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p>
                    A systematic approach to breaking down complex challenges into 
                    solvable pieces. Because sometimes the best solution is the one
                    that actually works.
                  </p>
                  
                  <div className="bg-card/60 border border-border p-4 rounded-xl">
                    <h4 className="font-heading mb-2">Guiding Principles</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Define the problem before solving it (revolutionary, right?)</li>
                      <li>Build quickly, fix later (sleep is overrated)</li>
                      <li>Iterate until perfect (or deadline, whichever comes first)</li>
                      <li>Systems thinking (because everything's connected... probably)</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="text-sm text-muted-foreground">
                    Practical solutions with personality
                  </div>
                  <Button variant="default">Learn More</Button>
                </CardFooter>
              </Card>
              
              {/* Wood Project Case Study */}
              <Card variant="wood" elevation="raised" radius="full" className="md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Case Study: Enterprise Workflow Redesign</CardTitle>
                      <CardDescription>Making corporate processes slightly less painful</CardDescription>
                    </div>
                    <div className="bg-background/90 px-3 py-1 rounded-full text-sm font-medium">
                      Success Story
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h4 className="font-heading text-xl mb-3">The Challenge</h4>
                      <p className="mb-4">
                        A Fortune 500 company with processes so convoluted, 
                        they needed a map to find the coffee machine. Data silos
                        were causing month-long delays in mission-critical work.
                      </p>
                      
                      <h4 className="font-heading text-xl mb-3">The Approach</h4>
                      <p>
                        Ahmad applied his systems thinking to map the entire workflow,
                        identify bottlenecks, and design integrations that bypassed
                        traditional bureaucracy. Some executives are still recovering
                        from the shock of efficiency.
                      </p>
                    </div>
                    
                    <div className="bg-card/70 border border-border p-4 rounded-xl">
                      <h4 className="font-heading mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 bg-secondary rounded-full mr-2"></span>
                        Results
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="text-xl font-medium text-accent">87%</span>
                          <span>Reduction in processing time (and employee eye-rolling)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-xl font-medium text-accent">$1.2M</span>
                          <span>Annual savings (more than enough for good coffee)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-xl font-medium text-accent">12×</span>
                          <span>Faster time to market (leaving time for actual lunch breaks)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end border-t border-border/20 pt-4">
                  <Button className="mr-2">Read Full Case Study</Button>
                  <Button variant="outline">Contact</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Blueprint Document */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Interactive Blueprint Document</h2>
            <Card variant="blueprint" elevation="raised" radius="default" className="relative overflow-hidden">
              <BlueprintCardHeader className="border-b border-blueprint-grid/20">
                <div className="flex justify-between items-start">
                  <div>
                    <BlueprintAnnotation variant="note">
                      Framework Overview
                    </BlueprintAnnotation>
                    <CardTitle className="mt-2">Digital Transformation Framework</CardTitle>
                  </div>
                  <BlueprintAnnotation variant="measurement">
                    Scale: Ambitious
                  </BlueprintAnnotation>
                </div>
              </BlueprintCardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <BlueprintAnnotation variant="comment" className="mb-2">
                        // Modular components that play nicely together
                      </BlueprintAnnotation>
                      
                      <div className="bg-card/40 border border-dashed border-blueprint-grid/40 p-4 rounded-xl">
                        <h4 className="font-heading mb-2 text-lg">Core Systems</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="font-medium">Data Pipeline</div>
                            <div className="text-sm text-muted-foreground">Where information goes to transform</div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium">Interface Layer</div>
                            <div className="text-sm text-muted-foreground">Making complexity look simple</div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium">Integration Hub</div>
                            <div className="text-sm text-muted-foreground">The grand central station of data</div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium">Analytics Engine</div>
                            <div className="text-sm text-muted-foreground">Turning numbers into insights</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <BlueprintAnnotation variant="witty" className="mb-2">
                        Implementation philosophy
                      </BlueprintAnnotation>
                      <p className="text-sm text-muted-foreground">
                        Build for flexibility, not rigidity. Each component should be independently 
                        testable and maintainable. If one piece breaks, the others should 
                        continue working—unlike your phone after dropping it.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-3 top-1/2 h-24 border-l-2 border-dashed border-blueprint-grid/40"></div>
                    <div className="pl-6">
                      <BlueprintAnnotation withLineDraw linePosition="left" lineLength="sm">
                        Performance Goals
                      </BlueprintAnnotation>
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Response Time</span>
                          <span className="font-mono">&lt; 200ms</span>
                        </div>
                        <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
                          <div className="bg-blueprint h-full rounded-full animate-pulse" style={{ width: '85%' }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Throughput</span>
                          <span className="font-mono">1000 req/s</span>
                        </div>
                        <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
                          <div className="bg-blueprint h-full rounded-full animate-pulse" style={{ width: '75%', animationDelay: '0.5s' }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Reliability</span>
                          <span className="font-mono">99.99%</span>
                        </div>
                        <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
                          <div className="bg-blueprint h-full rounded-full animate-pulse" style={{ width: '95%', animationDelay: '1s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <BlueprintCardFooter className="justify-between">
                <BlueprintAnnotation>Last revised: Recently enough</BlueprintAnnotation>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Download Specs</Button>
                  <Button size="sm">Implement (Good Luck)</Button>
                </div>
              </BlueprintCardFooter>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}