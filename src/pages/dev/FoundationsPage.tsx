import { BlueprintAnnotation } from "@/components/ui/blueprint-annotation";

export function FoundationsPage() {
  // You can extract these from your theme and make them dynamic
  const colors = [
    { name: "background", value: "rgb(15, 23, 42)", cssVar: "--background" },
    { name: "foreground", value: "rgb(241, 245, 249)", cssVar: "--foreground" },
    { name: "primary", value: "rgb(37, 99, 235)", cssVar: "--primary" },
    { name: "blueprint", value: "rgb(56, 189, 248)", cssVar: "--blueprint" },
    { name: "border", value: "rgb(71, 85, 105)", cssVar: "--border" },
    { name: "muted", value: "rgb(30, 41, 59)", cssVar: "--muted" },
    { name: "muted-foreground", value: "rgb(148, 163, 184)", cssVar: "--muted-foreground" },
    { name: "accent", value: "rgb(51, 65, 85)", cssVar: "--accent" },
  ];

  const spacings = [
    { name: "0", value: "0px" },
    { name: "0.5", value: "0.125rem" },
    { name: "1", value: "0.25rem" },
    { name: "2", value: "0.5rem" },
    { name: "4", value: "1rem" },
    { name: "6", value: "1.5rem" },
    { name: "8", value: "2rem" },
    { name: "12", value: "3rem" },
    { name: "16", value: "4rem" },
    { name: "24", value: "6rem" },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="font-heading text-3xl">Foundations</h1>
        <p className="text-lg max-w-3xl">
          The core building blocks of the Workshop Blueprint Design System.
          These foundations ensure consistency and coherence across all components and patterns.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-2xl">Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colors.map(color => (
            <div key={color.name} className="border border-border rounded-lg overflow-hidden">
              <div 
                className="h-24" 
                style={{ backgroundColor: `var(${color.cssVar})` }}
              />
              <div className="p-4 space-y-1">
                <h3 className="font-medium">{color.name}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Value: {color.value}</p>
                  <p>CSS: {color.cssVar}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <BlueprintAnnotation variant="note" className="mt-2">
          Colors follow the workshop & blueprint aesthetic while ensuring accessibility
        </BlueprintAnnotation>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-2xl">Typography</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-heading text-xl mb-2">Headings - Space Grotesk</h3>
            <div className="space-y-4 border border-border rounded-lg p-6">
              <div>
                <h1 className="font-heading text-4xl">Heading 1</h1>
                <p className="text-sm text-muted-foreground">4xl / Space Grotesk / 36px</p>
              </div>
              <div>
                <h2 className="font-heading text-3xl">Heading 2</h2>
                <p className="text-sm text-muted-foreground">3xl / Space Grotesk / 30px</p>
              </div>
              <div>
                <h3 className="font-heading text-2xl">Heading 3</h3>
                <p className="text-sm text-muted-foreground">2xl / Space Grotesk / 24px</p>
              </div>
              <div>
                <h4 className="font-heading text-xl">Heading 4</h4>
                <p className="text-sm text-muted-foreground">xl / Space Grotesk / 20px</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-2">Body - Inter</h3>
            <div className="space-y-4 border border-border rounded-lg p-6">
              <div>
                <p className="text-lg">Large Body Text</p>
                <p className="text-sm text-muted-foreground">lg / Inter / 18px</p>
              </div>
              <div>
                <p className="text-base">Body Text</p>
                <p className="text-sm text-muted-foreground">base / Inter / 16px</p>
              </div>
              <div>
                <p className="text-sm">Small Text</p>
                <p className="text-sm text-muted-foreground">sm / Inter / 14px</p>
              </div>
              <div>
                <p className="text-xs">Extra Small Text</p>
                <p className="text-sm text-muted-foreground">xs / Inter / 12px</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-2xl">Spacing</h2>
        <div className="border border-border rounded-lg p-6 space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Consistent spacing helps create visual rhythm and hierarchy.
            All spacing follows a scale based on 0.25rem (4px) increments.
          </p>
          <div className="space-y-3">
            {spacings.map((spacing) => (
              <div key={spacing.name} className="flex items-center gap-4">
                <div className="text-sm font-medium w-12">{spacing.name}</div>
                <div 
                  className="bg-blueprint/30 h-6 rounded"
                  style={{ width: spacing.value }}
                ></div>
                <div className="text-sm text-muted-foreground">{spacing.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-2xl">Grid & Layout</h2>
        <div className="border border-border rounded-lg p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="bg-blueprint/20 h-16 rounded flex items-center justify-center text-sm"
              >
                Column {i}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            The design system uses a 12-column grid system for layouts, with responsive
            breakpoints at 640px (sm), 768px (md), 1024px (lg), and 1280px (xl).
          </p>
        </div>
        <div className="border border-border rounded-lg p-6 mt-4">
          <h3 className="font-heading text-xl mb-4">Container Sizes</h3>
          <div className="space-y-6">
            <div className="relative h-6 rounded bg-muted w-full">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-blueprint/30 h-full rounded" style={{ width: "100%" }}>
                <div className="absolute inset-0 flex items-center justify-center text-xs">
                  Container: 100%
                </div>
              </div>
            </div>
            <div className="relative h-6 rounded bg-muted w-full">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-blueprint/30 h-full rounded" style={{ width: "85%" }}>
                <div className="absolute inset-0 flex items-center justify-center text-xs">
                  Container xl: 1280px
                </div>
              </div>
            </div>
            <div className="relative h-6 rounded bg-muted w-full">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-blueprint/30 h-full rounded" style={{ width: "70%" }}>
                <div className="absolute inset-0 flex items-center justify-center text-xs">
                  Container lg: 1024px
                </div>
              </div>
            </div>
            <div className="relative h-6 rounded bg-muted w-full">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-blueprint/30 h-full rounded" style={{ width: "55%" }}>
                <div className="absolute inset-0 flex items-center justify-center text-xs">
                  Container md: 768px
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-2xl">Brand Textures</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="h-32 bg-blueprint-grid"></div>
            <div className="p-4">
              <h3 className="font-medium">Blueprint Grid</h3>
              <p className="text-sm text-muted-foreground">
                The core texture that represents technical precision and system thinking
              </p>
            </div>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="h-32 relative overflow-hidden">
              <div
                className="absolute inset-0" 
                style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v50H0z\' fill=\'%23d9b38c\' fill-opacity=\'0.1\'/%3E%3Cpath d=\'M0 50h100v50H0z\' fill=\'%23d9b38c\' fill-opacity=\'0.15\'/%3E%3Cpath d=\'M25 0h2v100h-2zM50 0h2v100h-2zM75 0h2v100h-2z\' fill=\'%23d9b38c\' fill-opacity=\'0.1\'/%3E%3Cpath d=\'M0 25h100v2H0zM0 50h100v2H0zM0 75h100v2H0z\' fill=\'%23d9b38c\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
                  backgroundSize: '100px 100px' 
                }}
              ></div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">Wood Texture</h3>
              <p className="text-sm text-muted-foreground">
                Adds warmth and craftsmanship feeling to contrast the technical aspects
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}