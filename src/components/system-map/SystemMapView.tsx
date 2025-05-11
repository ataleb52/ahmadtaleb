// filepath: /Users/ahmadtaleb/Documents/Github-VSCode/ahmadtaleb/src/components/system-map/SystemMapView.tsx
import { ReactFlow, Background, Controls, MiniMap, ReactFlowProvider } from '@xyflow/react';
import type { Edge, Node, NodeMouseHandler, NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './system-map.css';
import { BlueprintNode } from './BlueprintNode';
import { BlueprintExpandedNode } from './BlueprintExpandedNode';
import { CanvasControls } from './CanvasControls';
import { SystemMapMeasurementMode } from './SystemMapMeasurementMode';
import { detailedComponents } from './DetailedComponents';
import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import {
  AnnotationNode,
  AnnotationNodeContent,
  AnnotationNodeNumber,
  AnnotationNodeIcon,
} from '@/components/annotation-node';

// Import the auto-layout utility
import { getLayoutedElements } from './auto-layout';

// Define the node data interface
interface NodeData extends Record<string, unknown> {
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  items?: string[];
  docLink?: string;
  codeExample?: string;
  related?: string[];
  layers?: unknown;
  isExpanded?: boolean;
  selected?: boolean;
  number?: string;
  title?: string;
  primaryDescription?: string;
  secondaryDescription?: string;
}

// Define the HeaderAnnotation component
const HeaderAnnotation: React.FC<{ data: NodeData }> = (props) => {
  const { data } = props;
  
  return (
    <AnnotationNode className="max-w-[700px] bg-slate-800/90 backdrop-blur border-2 border-blue-500/50 shadow-xl rounded-md z-50" style={{ zIndex: 1000 }}>
      <AnnotationNodeNumber>{data.number as string}</AnnotationNodeNumber>
      <AnnotationNodeContent>
        <h2 className="text-2xl font-bold mb-3 text-blue-300">{data.title as string}</h2>
        <p className="text-sm mb-3 text-slate-200">{data.primaryDescription as string}</p>
        <p className="text-xs text-slate-400">{data.secondaryDescription as string}</p>
      </AnnotationNodeContent>
      <AnnotationNodeIcon>
        <ArrowDown className="text-blue-400 animate-bounce" />
      </AnnotationNodeIcon>
    </AnnotationNode>
  );
};

// Define node types
const nodeTypes: NodeTypes = {
  blueprintNode: BlueprintNode as unknown as React.ComponentType<any>,
  blueprintExpandedNode: BlueprintExpandedNode as unknown as React.ComponentType<any>,
  annotationHeader: HeaderAnnotation
};

// Enhanced node data with more detail
const initialNodes: Node<NodeData>[] = [
  {
    id: 'header',
    type: 'annotationHeader',
    position: { x: 250, y: 10 }, // Initial position, will be centered by auto-layout
    draggable: false,
    zIndex: 1000, // Ensure header stays above other nodes
    data: {
      number: '',
      title: 'Workshop Blueprint Design System',
      primaryDescription:
        'A technical design system that embodies the methodical problem-solving approach of a workshop engineer — practical, purposeful, and built to last.',
      secondaryDescription:
        'This system showcases my personal aesthetic and programming approach, combining the precision of technical blueprints with the practicality of workshop tools.',
    },
  },
  {
    id: 'foundations',
    type: 'blueprintNode',
    data: { 
      label: 'Foundations',
      description: 'Core design tokens and principles',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7.5-7.5L8 8H2v12Z" />
          <path d="M8 10v12" />
        </svg>
      ),
      items: ['Colors', 'Typography', 'Spacing', 'Grid'],
      docLink: '/dev/foundations',
      codeExample: `// Theme usage example
import { colors, typography } from '@/theme';

const primaryColor = colors.primary[500];
const headingFont = typography.fontFamily.heading;`,
      related: ['components', 'patterns']
    },
    position: { x: 250, y: 220 },
  },
  {
    id: 'components',
    type: 'blueprintNode',
    data: { 
      label: 'Components',
      description: 'Reusable UI building blocks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
      items: ['Buttons', 'Cards', 'Forms', 'Navigation']
    },
    position: { x: 100, y: 370 },
  },
  {
    id: 'patterns',
    type: 'blueprintNode',
    data: { 
      label: 'Patterns',
      description: 'Common UI combinations & layouts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      items: ['Page Layouts', 'Navigation Patterns', 'Data Display', 'Interactions']
    },
    position: { x: 400, y: 370 },
  },
  {
    id: 'tech-stack',
    type: 'blueprintNode',
    data: { 
      label: 'Tech Stack',
      description: 'Implementation technologies',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m16 18 2-2-2-2" />
          <path d="m8 18-2-2 2-2" />
          <path d="m12 14 2 4" />
          <rect width="20" height="14" x="2" y="3" rx="2" />
        </svg>
      ),
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js']
    },
    position: { x: 250, y: 520 },
  },
];

// Enhanced edge styling
const initialEdges: Edge[] = [
  { 
    id: 'f-to-c', 
    source: 'foundations', 
    target: 'components',
    animated: true,
    style: { stroke: '#0284c7', strokeWidth: 2 }
  },
  { 
    id: 'f-to-p', 
    source: 'foundations', 
    target: 'patterns',
    animated: true,
    style: { stroke: '#0284c7', strokeWidth: 2 }
  },
  { 
    id: 'c-to-t', 
    source: 'components', 
    target: 'tech-stack',
    animated: true,
    style: { stroke: '#0284c7', strokeWidth: 2 }
  },
  { 
    id: 'p-to-t', 
    source: 'patterns', 
    target: 'tech-stack',
    animated: true,
    style: { stroke: '#0284c7', strokeWidth: 2 }
  },
];

export function SystemMapView() {
  // Define state for nodes and edges with proper typing
  const [nodes, setNodes] = useState<Node<NodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const flowContainerRef = useRef<HTMLDivElement>(null);

  // Get viewport dimensions on mount and window resize
  useEffect(() => {
    const updateViewportDimensions = () => {
      if (flowContainerRef.current) {
        setViewportWidth(flowContainerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateViewportDimensions();

    // Update on resize
    window.addEventListener('resize', updateViewportDimensions);
    return () => window.removeEventListener('resize', updateViewportDimensions);
  }, []);

  // We've moved header centering to the auto-layout function

  // Initialize nodes with auto-layout
  useEffect(() => {
    const combinedNodes = [...initialNodes, ...detailedComponents] as Node<NodeData>[];
    
    // Calculate header X position for centering
    let headerX = 250; // Default fallback
    if (viewportWidth > 0) {
      const headerWidth = 700; // Based on className max-width
      headerX = Math.max(10, (viewportWidth / 2) - (headerWidth / 2));
    }
    
    // Apply auto layout with header properly centered and positioned higher
    const layoutedElements = getLayoutedElements(
      combinedNodes, 
      initialEdges, 
      'TB', 
      { 
        ranksep: 100,
        nodesep: 50,
        headerX,
        headerY: -250, // Add negative value to move header higher up
        headerPadding: 50 // Increase spacing between header and first row of nodes
      }
    );
    
    setNodes(layoutedElements.nodes as Node<NodeData>[]);
    setEdges(layoutedElements.edges);
  }, [viewportWidth]);

  // Apply auto-layout when filtered nodes change
  useEffect(() => {
    if (filterCategory !== null) {
      // Filter nodes but always include header
      const filtered = nodes.filter(
        (node) =>
          node.id === 'header' || // Always include header
          node.id === filterCategory ||
          (node.data && 
           typeof node.data === 'object' && 
           'related' in node.data && 
           Array.isArray(node.data.related) && 
           node.data.related.includes(filterCategory))
      );
      
      // Get only edges that connect filtered nodes
      const filteredEdges = edges.filter(
        (edge) => 
          filtered.some(node => node.id === edge.source) && 
          filtered.some(node => node.id === edge.target)
      );

      // Calculate header X position for centering
      let headerX = 250; // Default fallback
      if (viewportWidth > 0) {
        const headerWidth = 700;
        headerX = Math.max(10, (viewportWidth / 2) - (headerWidth / 2));
      }
      
      // Re-apply auto-layout to filtered nodes with centered header
      const layoutedElements = getLayoutedElements(
        filtered, 
        filteredEdges,
        'TB',
        {
          ranksep: 100,
          nodesep: 50,
          headerX,
          headerY: -20, // Add negative value to move header higher up
          headerPadding: 60 // Increase spacing between header and first row of nodes
        }
      );
      
      setNodes(layoutedElements.nodes as Node<NodeData>[]);
    }
  }, [filterCategory, viewportWidth, edges, nodes]);

  // Filter nodes based on selected category with type safety
  const filteredNodes = filterCategory
    ? nodes.filter(
        (node) =>
          node.id === 'header' || // Always include header
          node.id === filterCategory ||
          (node.data && 
           typeof node.data === 'object' && 
           'related' in node.data && 
           Array.isArray(node.data.related) && 
           node.data.related.includes(filterCategory))
      )
    : nodes;

  // Handle node click
  const onNodeClick: NodeMouseHandler = useCallback((_evt, node) => {
    console.log('Node clicked:', node);

    // Set the selected node for the detail panel with proper typing
    setSelectedNode(node as Node<NodeData>);

    // Reset expanded state when clicking a different node
    setIsExpanded(false);

    // Highlight the clicked node
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          selected: n.id === node.id,
          isExpanded: false,
        },
      }))
    );

    // Highlight connected edges
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: edge.source === node.id || edge.target === node.id,
        style: {
          ...edge.style,
          stroke:
            edge.source === node.id || edge.target === node.id
              ? '#3b82f6' // bright blue
              : '#0284c7', // default blue
          strokeWidth: edge.source === node.id || edge.target === node.id ? 3 : 2,
          opacity: edge.source === node.id || edge.target === node.id ? 1 : 0.5,
        },
      }))
    );
  }, []);

  // Toggle exploded view
  const handleToggleExpand = useCallback(() => {
    if (!selectedNode) return;

    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);

    // Update node to show expanded view
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNode.id) {
          return {
            ...n,
            type: newIsExpanded ? 'blueprintExpandedNode' : 'blueprintNode',
            data: {
              ...n.data,
              isExpanded: newIsExpanded,
            },
          };
        }
        return n;
      })
    );
  }, [selectedNode, isExpanded]);

  // Handle zoom preset selection
  const handleZoomPreset = useCallback((preset: string) => {
    setActiveTool(preset);
    // Implement zoom logic here
  }, []);

  // Handle measurement tool toggle
  const handleMeasureTool = useCallback(() => {
    setActiveTool(activeTool === 'measure' ? null : 'measure');
  }, [activeTool]);

  // We're using the getLayoutedElements function from auto-layout.ts

  return (
    <div ref={flowContainerRef} className="h-[800px] w-full bg-slate-900 rounded-md border border-slate-700">
      {/* Integrated canvas controls */}
      <CanvasControls
        onCategoryFilter={setFilterCategory}
        selectedCategory={filterCategory}
        onToggleExpand={handleToggleExpand} 
        isExpanded={isExpanded} 
        onMeasure={handleMeasureTool}
        onZoomPreset={handleZoomPreset}
        activeTool={activeTool}
      />
      
      {/* Component detail panel */}
      {selectedNode && selectedNode.data && (
        <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur p-4 rounded z-10 w-80 border border-blue-500/50 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-heading text-sm text-slate-100">
              {selectedNode.data.icon && <span className="mr-2 inline-block text-blue-400">{selectedNode.data.icon}</span>}
              {selectedNode.data.label as string}
            </h4>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          
          <div className="text-xs text-slate-300 mb-3">
            {selectedNode.data.description as string}
          </div>
          
          {/* Toggle exploded view button */}
          {typeof selectedNode.data.layers !== 'undefined' && (
            <div className="mb-4">
              <button
                onClick={handleToggleExpand}
                className={`flex items-center justify-center w-full gap-2 py-2 text-xs rounded transition-all ${
                  isExpanded 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isExpanded ? (
                    <>
                      <path d="M4 14h6v6M4 10h16M14 4h6v6" />
                    </>
                  ) : (
                    <>
                      <path d="m3 16 4 4 4-4" />
                      <path d="M7 20V4" />
                      <path d="m21 8-4-4-4 4" />
                      <path d="M17 4v16" />
                    </>
                  )}
                </svg>
                {isExpanded ? 'Collapse Component View' : 'Show Exploded View'}
              </button>
            </div>
          )}
          
          {/* Code example section */}
          <div className="border-t border-slate-700 my-3 pt-3">
            <h5 className="text-xs font-medium text-slate-200 mb-2 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m16 18 2-2-2-2" />
                <path d="m8 18-2-2 2-2" />
                <path d="m12 14 2 4" />
                <rect width="20" height="14" x="2" y="3" rx="2" />
              </svg>
              Usage Example
            </h5>
            <div className="bg-slate-950 border border-slate-800 p-2 rounded font-mono text-xs text-blue-300 overflow-x-auto">
              <pre className="whitespace-pre-wrap">{(selectedNode.data.codeExample as string) || '// No code example available'}</pre>
            </div>
          </div>

          {/* Related components section */}
          {selectedNode.data.related && Array.isArray(selectedNode.data.related) && selectedNode.data.related.length > 0 && (
            <div className="border-t border-slate-700 my-3 pt-3">
              <h5 className="text-xs font-medium text-slate-200 mb-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Related Components
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedNode.data.related.map((relatedId: string) => {
                  const relatedNode = nodes.find(n => n.id === relatedId);
                  return (
                    <button
                      key={relatedId}
                      className="bg-slate-700 hover:bg-slate-600 text-xs py-1 px-2 rounded text-slate-200 transition-colors"
                      onClick={() => {
                        const node = nodes.find(n => n.id === relatedId);
                        if (node) {
                          onNodeClick({} as React.MouseEvent, node as Node<NodeData>);
                        }
                      }}
                    >
                      {(relatedNode?.data?.label as string) || relatedId}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Documentation link */}
          <div className="mt-4">
            <button 
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs py-1.5 px-3 rounded w-full transition-colors"
              onClick={() => {
                if (selectedNode.data.docLink && typeof selectedNode.data.docLink === 'string') {
                  window.location.href = selectedNode.data.docLink;
                }
              }}
            >
              View Detailed Documentation
            </button>
          </div>
        </div>
      )}
      
      {/* Blueprint navigation help */}
      <div className="absolute bottom-4 right-8 bg-slate-800/70 backdrop-blur p-3 rounded z-10 max-w-sm border border-slate-700">
        <h4 className="font-heading text-sm text-slate-200 mb-1">Blueprint Navigation</h4>
        <ul className="text-xs text-slate-300 space-y-1">
          <li className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-blue-400"></span>
            Pan by dragging the canvas
          </li>
          <li className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-blue-400"></span>
            Zoom with mouse wheel or controls
          </li>
          <li className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-blue-400"></span>
            Click on nodes to select
          </li>
          <li className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-blue-400"></span>
            Use workshop tools to explore components
          </li>
        </ul>
      </div>
      
      {/* Main ReactFlow instance */}
      <ReactFlowProvider>
        <ReactFlow 
          nodes={filteredNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ 
            padding: 0.1,  // Reduce this value from 0.2
            minZoom: 0.5,
            maxZoom: 1.2
          }}
          minZoom={0.4}
          maxZoom={1.5}
          attributionPosition="bottom-right"
          onNodeClick={onNodeClick}
        >
          <Background color="#4a5568" gap={20} size={1} />
          <Controls className="bg-background/80" />
          <MiniMap 
            nodeColor="#1e293b"
            maskColor="rgba(0, 0, 0, 0.1)"
            className="bg-slate-950/30 !border-slate-700"
          />
          
          {/* Measurement overlay */}
          <SystemMapMeasurementMode 
            active={activeTool === 'measure'}
            onReset={() => setActiveTool(null)}
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
