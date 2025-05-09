import { BlueprintAnnotation } from "@/components/ui/blueprint-annotation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PatternsPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="font-heading text-3xl">Patterns</h1>
        <p className="text-lg max-w-3xl">
          Common UI patterns that combine individual components into cohesive, reusable solutions.
          These patterns help maintain consistency and solve recurring design problems across the interface.
        </p>
      </section>
      
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Feature Cards</h2>
          <BlueprintAnnotation variant="note" size="sm">Used for highlighting key features or services</BlueprintAnnotation>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Technical Architecture",
              description: "Building systems that scale with your needs",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              ),
            },
            {
              title: "UX Strategy",
              description: "User-centered approach to problem solving",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
              ),
            },
            {
              title: "Integration Solutions",
              description: "Connecting disparate systems seamlessly",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 6V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3" />
                  <path d="M3 11V9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2" />
                  <path d="M12 19h8a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-3.5" />
                  <path d="M3 15v-2a1 1 0 0 1 1-1h2.5" />
                  <circle cx="9.5" cy="15.5" r="3.5" />
                </svg>
              ),
            }
          ].map((feature, index) => (
            <Card key={index} elevation="raised">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
                  nunc vel tincidunt lacinia, nisl nisl aliquam nisl.
                </p>
                <Button>Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Info Section with Blueprint</h2>
          <BlueprintAnnotation variant="note" size="sm">Technical information with visual interest</BlueprintAnnotation>
        </div>
        
        <Card variant="blueprint" className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6">
              <BlueprintAnnotation variant="comment" className="mb-2">
                // System approach overview
              </BlueprintAnnotation>
              <h3 className="font-heading text-xl mb-4">Methodical Problem Solving</h3>
              <p className="mb-4">
                A systematic approach to breaking down complex challenges into 
                manageable pieces. This methodology enables clearer understanding
                and more effective solutions.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary"></div>
                  <span>Define clear problem boundaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary"></div>
                  <span>Map system dependencies</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary"></div>
                  <span>Isolate critical variables</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary"></div>
                  <span>Test iteratively</span>
                </li>
              </ul>
              <Button>View Methodology</Button>
            </div>
            <div className="bg-background/50 p-6 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-blueprint-grid opacity-[0.03]"></div>
              <BlueprintAnnotation variant="note" className="mb-2">
                Key Benefits
              </BlueprintAnnotation>
              <div className="space-y-4 relative z-10">
                <div className="border border-border bg-background/50 rounded-lg p-4">
                  <h4 className="font-heading mb-2">Reduced Complexity</h4>
                  <p className="text-sm text-muted-foreground">
                    Break down overwhelming problems into manageable components
                  </p>
                </div>
                <div className="border border-border bg-background/50 rounded-lg p-4">
                  <h4 className="font-heading mb-2">Faster Resolution</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify root causes more quickly with systematic investigation
                  </p>
                </div>
                <div className="border border-border bg-background/50 rounded-lg p-4">
                  <h4 className="font-heading mb-2">Better Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Create clear records of problem-solving approaches for future reference
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
      
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Stats Showcase</h2>
          <BlueprintAnnotation variant="note" size="sm">For presenting key metrics and results</BlueprintAnnotation>
        </div>
        
        <Card variant="workshop" className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-xl">Project Results</h3>
            <div className="text-sm text-muted-foreground">Case Study: Enterprise System Integration</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "87%", label: "Efficiency Increase", color: "bg-primary" },
              { value: "12×", label: "Faster Processing", color: "bg-blue-500" },
              { value: "64%", label: "Cost Reduction", color: "bg-green-500" },
              { value: "99.9%", label: "System Uptime", color: "bg-amber-500" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`${stat.color} size-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3`}>
                  {stat.value.startsWith("9") ? (
                    <div className="text-base leading-none">
                      {stat.value.split(".")[0]}
                      <span className="text-xs">.{stat.value.split(".")[1]}</span>
                    </div>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-1">Year over year</div>
              </div>
            ))}
          </div>
        </Card>
      </section>
      
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Call to Action</h2>
          <BlueprintAnnotation variant="note" size="sm">Encouraging user engagement</BlueprintAnnotation>
        </div>
        
        <Card variant="wood" className="overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-heading text-2xl md:text-3xl mb-4">Ready to solve your complex problems?</h3>
              <p className="text-lg mb-8">
                Let's collaborate on turning your technical challenges into opportunities for innovation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg">Get in Touch</Button>
                <Button size="lg" variant="outline">View Case Studies</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
      
      <section className="space-y-4 mt-16">
        <h2 className="font-heading text-2xl mb-6">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Form Patterns", 
            "Navigation Patterns", 
            "Dashboard Layouts", 
            "Authentication Flows", 
            "Notification Systems", 
            "Data Visualization"
          ].map((pattern, index) => (
            <Card key={index} className="bg-muted/30 border-dashed">
              <div className="p-6 text-center">
                <h3 className="font-heading mb-2">{pattern}</h3>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}