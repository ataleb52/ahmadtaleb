import { Link, Outlet, useLocation } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { BlueprintAnnotation } from "@/components/ui/blueprint-annotation";

export function DesignSystemLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navigation = [
    { name: "Overview", path: "/dev" },
    { name: "Foundations", path: "/dev/foundations" },
    { name: "Components", path: "/dev/components" },
    { name: "Patterns", path: "/dev/patterns" },
    { name: "Showcase", path: "/dev/showcase" }
  ];
  
  return (
    <div className="design-system-layout relative">
      <div className="sticky top-0 z-10 border-b border-border backdrop-blur-sm bg-background/95">
        <Container>
          <div className="py-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h2 className="font-heading text-sm">Workshop Blueprint</h2>
              <BlueprintAnnotation variant="note" size="xs">
                Design System
              </BlueprintAnnotation>
            </div>
            
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
              ← Back to main site
            </Link>
          </div>
          
          <nav className="flex gap-2 overflow-x-auto scrollbar-thin">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "py-0.5 px-1 border-b-2 transition-colors whitespace-nowrap text-sm",
                  currentPath === item.path
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
      
      <Container className="py-8">
        <Outlet />
      </Container>
    </div>
  );
}