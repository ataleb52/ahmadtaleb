import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import your component showcases
import { CardShowcase } from "@/components/CardShowcase";
import { BlueprintAnnotationShowcase } from "@/components/BlueprintAnnotationShowcase";
import { GridShowcase } from "@/components/GridShowcase";
import { LayoutShowcase } from "@/components/LayoutShowcase";
import { ThemeShowcase } from "@/components/ThemeShowcase";

export function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Define your component categories - add more as your system grows
  const categories = [
    { id: "all", name: "All Components" },
    { id: "base", name: "Base Elements" },
    { id: "layout", name: "Layout" },
    { id: "input", name: "Input" },
    { id: "feedback", name: "Feedback" },
    { id: "navigation", name: "Navigation" },
    { id: "data", name: "Data Display" },
  ];
  
  // Define your components with metadata
  const components = [
    { 
      id: "blueprint-annotation", 
      name: "Blueprint Annotation", 
      categories: ["base", "feedback"],
      component: <BlueprintAnnotationShowcase />
    },
    { 
      id: "card", 
      name: "Card", 
      categories: ["layout", "data"],
      component: <CardShowcase />
    },
    { 
      id: "grid", 
      name: "Grid", 
      categories: ["layout"],
      component: <GridShowcase />
    },
    { 
      id: "layout", 
      name: "Layout", 
      categories: ["layout"],
      component: <LayoutShowcase />
    },
    { 
      id: "theme", 
      name: "Theme", 
      categories: ["base"],
      component: <ThemeShowcase />
    },
    // Add more components here as you create them
  ];
  
  // Filter components based on active category
  const filteredComponents = activeCategory === "all" 
    ? components 
    : components.filter(c => c.categories.includes(activeCategory));
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl mb-4">Components</h1>
        <p className="text-lg max-w-3xl">
          Reusable UI building blocks designed for composability, consistency, and flexibility.
          Each component follows the Workshop Blueprint aesthetic while maintaining best practices
          for accessibility and performance.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="space-y-16">
        {filteredComponents.map(component => (
          <section key={component.id} id={component.id} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h2 className="font-heading text-2xl">{component.name}</h2>
              <div className="flex gap-2">
                {component.categories.map(cat => (
                  <span key={cat} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {categories.find(c => c.id === cat)?.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-4">
              {component.component}
            </div>
          </section>
        ))}

        {filteredComponents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No components found in this category. More coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}