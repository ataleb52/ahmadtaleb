import { useState } from 'react';
import { BlueprintAnnotation } from "@/components/ui/blueprint-annotation";
import { Container } from "./ui/container";
import { Section } from "./ui/section";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function BlueprintAnnotationShowcase() {
  const [playing, setPlaying] = useState(false);
  
  const resetAnimations = () => {
    setPlaying(false);
    setTimeout(() => setPlaying(true), 100);
  };

  return (
    <Section variant="default" padding="lg">
      <Container size="md">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-heading mb-4">Blueprint Annotation System</h1>
            <p className="text-lg mb-6">
              Witty blueprint-style annotations with a sardonic edge. Professional-looking 
              without taking themselves too seriously.
            </p>
            <Button onClick={resetAnimations} className="mb-8">
              Reset Animations
            </Button>
          </div>

          {/* Basic Variants */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Annotation Variants</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Default & Comment */}
              <Card elevation="raised" className="p-4">
                <h3 className="text-lg font-heading mb-3">Standard & Code Comments</h3>
                <div className="flex flex-col gap-3">
                  <BlueprintAnnotation>
                    Straightforward technical note
                  </BlueprintAnnotation>
                  <BlueprintAnnotation variant="comment">
                    Code-style comment
                  </BlueprintAnnotation>
                  <BlueprintAnnotation variant="comment" uppercase>
                    Optional uppercase for emphasis
                  </BlueprintAnnotation>
                </div>
              </Card>

              {/* Witty & Notes */}
              <Card elevation="raised" className="p-4">
                <h3 className="text-lg font-heading mb-3">Witty & Note Variants</h3>
                <div className="flex flex-col gap-3">
                  <BlueprintAnnotation variant="witty">
                    The code works, but nobody knows why
                  </BlueprintAnnotation>
                  <BlueprintAnnotation variant="note">
                    Useful information that nobody will read
                  </BlueprintAnnotation>
                  <BlueprintAnnotation variant="witty">
                    Overcomplicated solution to a simple problem
                  </BlueprintAnnotation>
                </div>
              </Card>
            </div>
          </div>

          {/* With Line Draws */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">With Line Draws</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bottom Line */}
              <Card elevation="raised" className="p-4">
                <h3 className="text-lg font-heading mb-3">Measurement Callouts</h3>
                <div className="flex flex-col gap-8">
                  <div className="pt-3 flex justify-between">
                    <BlueprintAnnotation 
                      variant="measurement" 
                      withLineDraw 
                      linePosition="bottom" 
                      lineLength="sm"
                    >
                      12.5 cm
                    </BlueprintAnnotation>
                    <BlueprintAnnotation 
                      variant="witty" 
                      withLineDraw 
                      linePosition="bottom" 
                      lineLength="md"
                    >
                      Approximately right
                    </BlueprintAnnotation>
                  </div>
                </div>
              </Card>
              
              {/* Mixed Variants */}
              <Card elevation="raised" className="p-4">
                <h3 className="text-lg font-heading mb-3">Mixed Styles</h3>
                <div className="flex flex-col gap-6 py-4">
                  <BlueprintAnnotation 
                    variant="comment" 
                    withLineDraw 
                    linePosition="right" 
                    lineLength="sm"
                  >
                    Add your clever ideas here
                  </BlueprintAnnotation>
                  
                  <BlueprintAnnotation 
                    withLineDraw 
                    linePosition="bottom" 
                    lineLength="md"
                    uppercase
                  >
                    Important section
                  </BlueprintAnnotation>
                </div>
              </Card>
            </div>
          </div>

          {/* Animations */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Animations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Typing effect */}
              <Card elevation="raised" className="p-4">
                <h3 className="text-lg font-heading mb-3">Typing Effect</h3>
                <div className="min-h-[120px] flex items-center">
                  {playing && (
                    <BlueprintAnnotation 
                      animation="typing" 
                      variant="comment"
                    >
                      Loading clever response...
                    </BlueprintAnnotation>
                  )}
                </div>
              </Card>
              
              {/* Bounce effect */}
              <Card elevation="raised" className="p-4">
                <h3 className="text-lg font-heading mb-3">Bounce Effect</h3>
                <div className="min-h-[120px] flex items-center">
                  {playing && (
                    <BlueprintAnnotation 
                      animation="bounce" 
                      variant="witty"
                    >
                      Attention! Something witty happened
                    </BlueprintAnnotation>
                  )}
                </div>
              </Card>
              
              {/* With line draw animation */}
              <Card elevation="raised" className="p-4">
                <h3 className="text-lg font-heading mb-3">Line Draw Animation</h3>
                <div className="min-h-[120px] flex items-center pt-12">
                  {playing && (
                    <BlueprintAnnotation 
                      animation="drawing"
                      withLineDraw 
                      linePosition="top"
                      lineLength="lg"
                      variant="note"
                    >
                      This seemed like a good idea at the time
                    </BlueprintAnnotation>
                  )}
                </div>
              </Card>
              
              {/* Complex combination */}
              <Card elevation="raised" className="p-4">
                <h3 className="text-lg font-heading mb-3">Complex Animation</h3>
                <div className="min-h-[120px] flex flex-col gap-6 items-start justify-center">
                  {playing && (
                    <>
                      <BlueprintAnnotation 
                        variant="comment"
                        animation="typing"
                      >
                        // System calibrating sarcasm levels...
                      </BlueprintAnnotation>
                      
                      <BlueprintAnnotation 
                        variant="witty"
                        animation="bounce"
                        className="self-end"
                      >
                        Maximum sarcasm achieved
                      </BlueprintAnnotation>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
          
          {/* Practical Examples */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Practical Examples</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Project Header Example */}
              <Card variant="blueprint" elevation="flat" radius="full" className="p-6">
                <div className="flex justify-between mb-6">
                  <div>
                    <BlueprintAnnotation variant="note">
                      Project Spec
                    </BlueprintAnnotation>
                    <h2 className="text-2xl font-heading mb-2 mt-1">Unintuitive Solution™</h2>
                    <p className="text-sm opacity-80">Making simple problems complicated since 2025</p>
                  </div>
                  
                  <BlueprintAnnotation variant="measurement">
                    v1.3.7
                  </BlueprintAnnotation>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div>
                    <BlueprintAnnotation 
                      variant="comment"
                      withLineDraw
                      linePosition="bottom"
                      lineLength="sm"
                      className="mb-2"
                    >
                      // System requirements
                    </BlueprintAnnotation>
                    
                    <p className="mb-4">
                      Must handle complex workflows while looking deceptively simple.
                      Performance optimization is critical, but users won't notice anyway.
                    </p>
                  </div>
                  
                  <div>
                    <BlueprintAnnotation 
                      variant="witty"
                      withLineDraw
                      linePosition="right"
                      lineLength="md"
                      className="mb-2"
                    >
                      Connection points that might work
                    </BlueprintAnnotation>
                    
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-blueprint animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-blueprint animate-pulse delay-300"></div>
                      <div className="w-3 h-3 rounded-full bg-blueprint animate-pulse delay-700"></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}