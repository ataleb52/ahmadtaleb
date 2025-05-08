import React from "react";
import { Section } from "./ui/section";
import { Grid, AutoGrid } from "./ui/grid";
import { Card } from "./ui/card";
import { BlueprintAnnotation } from "./ui/blueprint-annotation";
import { Container } from "./ui/container";

export function GridShowcase() {
  // Placeholder item generator for demo purposes
  const GridItem = ({ title, height = "h-32" }: { title: string; height?: string }) => (
    <div className={`${height} bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center border border-gray-200 dark:border-gray-700`}>
      {title}
    </div>
  );

  return (
    <Section id="grid-showcase" title="Grid System">
      <Container>
        <div className="space-y-12">
          {/* Standard Grid Examples */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2">Standard Grid</h3>
            
            <div className="space-y-8">
              {/* 2-Column Grid */}
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-4">2-Column Grid</h4>
                <BlueprintAnnotation 
                  text="Standard 2-col grid with medium gaps" 
                  position="top-left"
                >
                  <Grid cols={2} gapX="md" gapY="md">
                    <GridItem title="Item 1" />
                    <GridItem title="Item 2" />
                    <GridItem title="Item 3" />
                    <GridItem title="Item 4" />
                  </Grid>
                </BlueprintAnnotation>
              </Card>

              {/* 3-Column Grid */}
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-4">3-Column Grid with Blueprint Background</h4>
                <BlueprintAnnotation 
                  text="3-col grid with blueprint styling" 
                  position="top-right"
                >
                  <Grid cols={3} gapX="sm" gapY="sm" blueprint={true}>
                    <GridItem title="Item 1" />
                    <GridItem title="Item 2" />
                    <GridItem title="Item 3" />
                    <GridItem title="Item 4" />
                    <GridItem title="Item 5" />
                    <GridItem title="Item 6" />
                  </Grid>
                </BlueprintAnnotation>
              </Card>

              {/* 4-Column Grid */}
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-4">4-Column Grid with Different X/Y Gaps</h4>
                <BlueprintAnnotation 
                  text="4-col grid with large X gaps, small Y gaps" 
                  position="bottom-left"
                >
                  <Grid cols={4} gapX="lg" gapY="sm">
                    <GridItem title="Item 1" />
                    <GridItem title="Item 2" />
                    <GridItem title="Item 3" />
                    <GridItem title="Item 4" />
                    <GridItem title="Item 5" />
                    <GridItem title="Item 6" />
                    <GridItem title="Item 7" />
                    <GridItem title="Item 8" />
                  </Grid>
                </BlueprintAnnotation>
              </Card>
            </div>
          </div>

          {/* Auto Grid Examples */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2">Auto Grid</h3>
            
            <div className="space-y-8">
              {/* Basic Auto Grid */}
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-4">Auto Grid (200px min width)</h4>
                <BlueprintAnnotation 
                  text="Auto grid with 200px minimum item width" 
                  position="top-left"
                >
                  <AutoGrid minItemWidth="200px" gapX="md" gapY="md">
                    <GridItem title="Item 1" />
                    <GridItem title="Item 2" />
                    <GridItem title="Item 3" />
                    <GridItem title="Item 4" />
                    <GridItem title="Item 5" />
                    <GridItem title="Item 6" />
                  </AutoGrid>
                </BlueprintAnnotation>
              </Card>

              {/* Blueprint Auto Grid */}
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-4">Blueprint Auto Grid (150px min width)</h4>
                <BlueprintAnnotation 
                  text="Auto grid with blueprint styling" 
                  position="top-right"
                >
                  <AutoGrid minItemWidth="150px" gapX="sm" gapY="sm" blueprint={true}>
                    <GridItem title="Item 1" height="h-24" />
                    <GridItem title="Item 2" height="h-24" />
                    <GridItem title="Item 3" height="h-24" />
                    <GridItem title="Item 4" height="h-24" />
                    <GridItem title="Item 5" height="h-24" />
                    <GridItem title="Item 6" height="h-24" />
                    <GridItem title="Item 7" height="h-24" />
                    <GridItem title="Item 8" height="h-24" />
                  </AutoGrid>
                </BlueprintAnnotation>
              </Card>

              {/* Practical Example */}
              <Card className="p-6">
                <h4 className="text-lg font-medium mb-4">Practical Application Example</h4>
                <BlueprintAnnotation 
                  text="Product showcase grid" 
                  position="bottom-left"
                >
                  <AutoGrid minItemWidth="250px" gapX="md" gapY="lg">
                    {Array.from({length: 6}).map((_, i) => (
                      <div key={i} className="flex flex-col space-y-2">
                        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                        <h5 className="font-medium">Workshop Item {i + 1}</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          This is a description of workshop item {i + 1}. It demonstrates using grids for product layouts.
                        </p>
                        <div className="mt-auto pt-2">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </AutoGrid>
                </BlueprintAnnotation>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}