import { BlueprintAnnotation } from "@/components/ui/blueprint-annotation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { HeroSection } from "@/components/HeroSection";

export function ShowcasePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="font-heading text-3xl">Showcase</h1>
        <p className="text-lg max-w-3xl">
          Real-world applications of the Workshop Blueprint Design System, 
          demonstrating how components and patterns come together to create 
          cohesive, functional interfaces.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Landing Page Hero</h2>
          <BlueprintAnnotation variant="note" size="sm">Initial user impression</BlueprintAnnotation>
        </div>
        
        <Card className="overflow-hidden border-2 border-dashed border-muted">
          <CardContent className="p-0">
            <HeroSection />
          </CardContent>
        </Card>
        
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-heading text-lg mb-2">Key Design Elements</h3>
          <ul className="space-y-2 text-sm">
            <li>• Blueprint grid textures for technical feel</li>
            <li>• Animation to create visual interest and draw attention</li>
            <li>• Progressive loading states for engagement</li>
            <li>• Clear, concise messaging aligned with brand voice</li>
            <li>• Balanced whitespace for readability and focus</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Project Case Study</h2>
          <BlueprintAnnotation variant="note" size="sm">Detailed presentation of work and results</BlueprintAnnotation>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="p-8 bg-blueprint-grid/10 border-b border-border">
            <div className="max-w-4xl mx-auto">
              <BlueprintAnnotation variant="comment" className="mb-4">
                // Case Study: Enterprise System Integration
              </BlueprintAnnotation>
              
              <h2 className="text-3xl font-heading mb-4">Transforming Legacy Infrastructure</h2>
              <p className="text-lg mb-8">
                How a Fortune 500 company modernized their operations by connecting 
                disparate systems and eliminating data silos.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background/40 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                  <div className="font-medium">6 months</div>
                </div>
                <div className="bg-background/40 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Role</div>
                  <div className="font-medium">Technical Architect</div>
                </div>
                <div className="bg-background/40 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Company</div>
                  <div className="font-medium">Global Manufacturing Inc.</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h3 className="font-heading text-xl mb-4">The Challenge</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <p>
                    The client was operating with 12+ disconnected legacy systems, 
                    resulting in data duplication, workflow bottlenecks, and monthly 
                    reporting delays of up to 3 weeks.
                  </p>
                  <p>
                    Manual processes were causing errors and employee frustration, 
                    while decision-makers lacked access to timely information needed 
                    for strategic planning.
                  </p>
                </div>
              </div>
              
              <div className="mb-12">
                <h3 className="font-heading text-xl mb-4">The Approach</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card variant="blueprint" className="h-full">
                    <CardContent className="p-4">
                      <h4 className="font-heading mb-2">1. System Mapping</h4>
                      <p className="text-sm">
                        Comprehensive inventory of all systems, data flows, and 
                        critical integration points.
                      </p>
                    </CardContent>
                  </Card>
                  <Card variant="blueprint" className="h-full">
                    <CardContent className="p-4">
                      <h4 className="font-heading mb-2">2. API Architecture</h4>
                      <p className="text-sm">
                        Custom middleware solution with standardized protocols 
                        for inter-system communication.
                      </p>
                    </CardContent>
                  </Card>
                  <Card variant="blueprint" className="h-full">
                    <CardContent className="p-4">
                      <h4 className="font-heading mb-2">3. Data Transformation</h4>
                      <p className="text-sm">
                        Automated ETL processes to normalize data structures 
                        and eliminate redundancy.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="mb-12">
                <h3 className="font-heading text-xl mb-4">The Solution</h3>
                <Card variant="workshop" className="overflow-hidden">
                  <div className="p-6">
                    <div className="mb-6">
                      <p>
                        A centralized integration platform that connected all legacy systems 
                        while preserving existing workflows, minimizing disruption during 
                        the transition period. Key components included:
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Real-time data synchronization engine</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Unified authentication system</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Custom API gateway for secure data access</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Automated reporting dashboard</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Error handling and recovery protocols</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Comprehensive audit logging system</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="p-4 bg-blueprint-grid/5 rounded-lg">
                        <BlueprintAnnotation variant="note" className="mb-2">
                          Technical Implementation
                        </BlueprintAnnotation>
                        <p className="text-sm">
                          The solution leveraged microservices architecture with containerization
                          for scalability, coupled with a message queue system to handle asynchronous
                          processing and ensure system reliability even during peak loads.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="mb-12">
                <h3 className="font-heading text-xl mb-4">The Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <Card className="text-center p-6">
                    <div className="text-3xl font-bold text-primary mb-2">87%</div>
                    <div className="text-sm">Reduction in process time</div>
                  </Card>
                  <Card className="text-center p-6">
                    <div className="text-3xl font-bold text-primary mb-2">$1.2M</div>
                    <div className="text-sm">Annual cost savings</div>
                  </Card>
                  <Card className="text-center p-6">
                    <div className="text-3xl font-bold text-primary mb-2">12×</div>
                    <div className="text-sm">Faster reporting</div>
                  </Card>
                  <Card className="text-center p-6">
                    <div className="text-3xl font-bold text-primary mb-2">97%</div>
                    <div className="text-sm">User satisfaction</div>
                  </Card>
                </div>
                
                <div className="bg-muted p-6 rounded-lg italic">
                  <blockquote>
                    "Ahmad's systematic approach completely transformed our operations.
                    What used to take weeks now happens in near real-time, and the
                    solution was implemented with minimal disruption to our teams."
                  </blockquote>
                  <div className="text-sm text-muted-foreground mt-2">
                    — VP of Technology, Global Manufacturing Inc.
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button size="lg">View More Case Studies</Button>
                <Button size="lg" variant="outline">Contact About Your Project</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Services Overview</h2>
          <BlueprintAnnotation variant="note" size="sm">Presentation of key services</BlueprintAnnotation>
        </div>
        
        <Card variant="wood" className="overflow-hidden">
          <Section className="py-16" variant="muted">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-heading mb-4">My Services</h2>
              <p className="text-lg max-w-2xl mx-auto">
                I solve complex technical problems through a systematic approach,
                turning challenges into opportunities for improvement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "System Architecture",
                  description: "Designing robust, scalable systems that solve complex technical challenges",
                  items: ["Legacy system integration", "Microservice architecture", "Cloud migration"]
                },
                {
                  title: "Process Optimization",
                  description: "Streamlining workflows to eliminate bottlenecks and improve efficiency",
                  items: ["Workflow analysis", "Automation solutions", "Performance tuning"]
                },
                {
                  title: "Technical Consulting",
                  description: "Expert guidance on technology decisions and implementation",
                  items: ["Technology evaluation", "Technical strategy", "Implementation roadmap"]
                },
              ].map((service, index) => (
                <Card key={index} variant="blueprint" elevation="floating">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl mb-3">{service.title}</h3>
                    <p className="mb-4 text-muted-foreground">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-primary"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </Card>
      </section>

      <section className="space-y-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Coming Soon</h2>
          <BlueprintAnnotation variant="note" size="sm">Future showcase additions</BlueprintAnnotation>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h3 className="font-heading text-xl mb-2">Blog Layout</h3>
              <p className="text-muted-foreground mb-4">
                Technical blog design with code highlighting and system diagrams
              </p>
              <div className="text-sm bg-background/50 px-3 py-1 rounded">Coming Soon</div>
            </CardContent>
          </Card>
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h3 className="font-heading text-xl mb-2">Dashboard Interface</h3>
              <p className="text-muted-foreground mb-4">
                Data visualization and system monitoring interface
              </p>
              <div className="text-sm bg-background/50 px-3 py-1 rounded">Coming Soon</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}