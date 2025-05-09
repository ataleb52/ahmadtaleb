import { Link } from "react-router-dom";
import { BlueprintAnnotation } from "@/components/ui/blueprint-annotation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function OverviewPage() {
  return (
    <div>
      {/* Introduction */}
      <section className="mb-16">
        <BlueprintAnnotation variant="comment" className="mb-4">
          // design system documentation
        </BlueprintAnnotation>
        
        <h1 className="font-heading text-4xl md:text-5xl mb-6">
          Workshop Blueprint Design System
        </h1>
        
        <p className="text-xl max-w-3xl mb-4">
          A technical design system that embodies the methodical problem-solving 
          approach of a workshop engineer — practical, purposeful, and built to last.
        </p>
        
        <p className="text-muted-foreground max-w-3xl">
          This system showcases my personal aesthetic and programming approach,
          combining the precision of technical blueprints with the practicality of workshop tools.
        </p>
      </section>

      {/* Quick Navigation */}
      <section className="mb-16">
        <h2 className="font-heading text-2xl mb-6">Explore the System</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Foundations",
              description: "Color, typography, spacing, and grids",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7.5-7.5L8 8H2v12Z" />
                  <path d="M8 10v12" />
                </svg>
              ),
              path: "/dev/foundations"
            },
            {
              title: "Components",
              description: "Buttons, cards, forms, and more",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
              ),
              path: "/dev/components"
            },
            {
              title: "Patterns",
              description: "Common UI combinations and layouts",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              ),
              path: "/dev/patterns"
            },
            {
              title: "Showcase",
              description: "The system in real-world applications",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                </svg>
              ),
              path: "/dev/showcase"
            }
          ].map((item, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-6">
                <Button asChild className="w-full">
                  <Link to={item.path}>View {item.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="my-16 border-t border-border" />

      {/* About the System */}
      <section className="mb-16">
        <h2 className="font-heading text-2xl mb-6">About the System</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="mb-4">
              This design system reflects my approach to development: technically sound, 
              aesthetically considered, and focused on delivering value. Every component 
              is crafted with the same attention to detail that I bring to solving complex problems.
            </p>
            <p className="mb-4">
              Built with React, TypeScript, and TailwindCSS, the Workshop Blueprint Design System 
              is both a showcase of my technical abilities and a practical toolset for building 
              interfaces. The system focuses on accessibility, performance, and maintainability.
            </p>
            <p>
              Components are responsive, well-documented, and follow best practices for modern web development. 
              The design language balances technical precision with approachable aesthetics, creating 
              interfaces that feel refined without being overly precious.
            </p>
          </div>
          <div>
            <Card variant="blueprint">
              <CardHeader>
                <CardTitle>Technical Foundations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span>React</span>
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">v18.0.0+</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>TypeScript</span>
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">v5.0.0+</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>TailwindCSS</span>
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">v3.0.0+</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Accessibility</span>
                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">WCAG 2.1</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Design Principles - Simple list format */}
      <section className="mb-16">
        <h2 className="font-heading text-2xl mb-6">Design Principles</h2>
        
        <p className="mb-6">
          The Workshop Blueprint Design System is guided by these core principles:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <div>
            <h3 className="font-heading text-xl mb-2">Technically Sound</h3>
            <p className="text-muted-foreground">
              Components are built with performance, accessibility, and maintainability in mind.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-2">Purposeful Design</h3>
            <p className="text-muted-foreground">
              Every design decision serves a purpose—no decoration for decoration's sake.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-2">System Thinking</h3>
            <p className="text-muted-foreground">
              Components are part of a larger ecosystem, designed to work together coherently.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-2">Accessible First</h3>
            <p className="text-muted-foreground">
              Designed to be usable by everyone, regardless of abilities or situation.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-2">Progressive Enhancement</h3>
            <p className="text-muted-foreground">
              Core functionality works everywhere, enhanced experiences where supported.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-2">Balanced Refinement</h3>
            <p className="text-muted-foreground">
              Polished but not precious. Technical but approachable.
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started - Simplified */}
      <section className="mb-16">
        <h2 className="font-heading text-2xl mb-6">Getting Started</h2>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <ol className="space-y-6">
              <li>
                <h3 className="font-heading text-lg mb-2">1. Install dependencies</h3>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  npm install @ahmadtaleb/workshop-blueprint
                </div>
              </li>
              
              <li>
                <h3 className="font-heading text-lg mb-2">2. Import styles</h3>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  import '@ahmadtaleb/workshop-blueprint/dist/styles.css';
                </div>
              </li>
              
              <li>
                <h3 className="font-heading text-lg mb-2">3. Use components</h3>
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  import &#123; Button &#125; from '@ahmadtaleb/workshop-blueprint';<br />
                  <br />
                  function App() &#123;<br />
                  &nbsp;&nbsp;return &lt;Button&gt;Click me&lt;/Button&gt;;<br />
                  &#125;
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1" asChild>
            <Link to="/dev/foundations">
              Start with Foundations
            </Link>
          </Button>
          <Button className="flex-1" variant="outline" asChild>
            <Link to="/dev/components">
              Browse Components
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}