import { ReactFlow, Background, Controls, MiniMap, ReactFlowProvider } from '@xyflow/react';
import type { Edge, Node, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { BlueprintNode } from './BlueprintNode';
import { useState, useCallback } from 'react';

// Define node types
const nodeTypes = {
  blueprintNode: BlueprintNode
};

// Enhanced node data with more detail
const initialNodes = [
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
    position: { x: 250, y: 50 },
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
    position: { x: 100, y: 200 },
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
    position: { x: 400, y: 200 },
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
    position: { x: 250, y: 350 },
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
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredNodes = filterCategory 
    ? nodes.filter(node => node.id === filterCategory || 
        (node.data.related && node.data.related.includes(filterCategory)))
    : nodes;

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    console.log('Node clicked:', node);
    
    // Set the selected node for the detail panel
    setSelectedNode(node);
    
    // Highlight the clicked node
    setNodes((nds) => 
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          selected: n.id === node.id
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
          stroke: edge.source === node.id || edge.target === node.id 
            ? '#3b82f6' // bright blue
            : '#0284c7', // default blue
          strokeWidth: edge.source === node.id || edge.target === node.id ? 3 : 2,
          opacity: edge.source === node.id || edge.target === node.id ? 1 : 0.5,
        }
      }))
    );
  }, []);

  return (
    <div className="h-[600px] w-full bg-slate-900 rounded-md border border-slate-700">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button 
          onClick={() => setFilterCategory(null)}
          className={`py-1.5 px-3 text-xs rounded transition-all ${
            filterCategory === null 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All
        </button>
        {['foundations', 'components', 'patterns', 'tech-stack'].map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`py-1.5 px-3 text-xs rounded transition-all ${
              filterCategory === category
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur p-4 rounded z-10 w-80 border border-blue-500/50 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-heading text-sm text-slate-100">
              {selectedNode.data.icon && <span className="mr-2 inline-block text-blue-400">{selectedNode.data.icon}</span>}
              {selectedNode.data.label}
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
            {selectedNode.data.description}
          </div>
          
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
              <pre className="whitespace-pre-wrap">{selectedNode.data.codeExample || '// No code example available'}</pre>
            </div>
          </div>

          {selectedNode.data.related && (
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
                          onNodeClick({} as React.MouseEvent, node);
                        }
                      }}
                    >
                      {relatedNode?.data.label || relatedId}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="mt-4">
            <button 
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs py-1.5 px-3 rounded w-full transition-colors"
              onClick={() => {
                if (selectedNode.data.docLink) {
                  window.location.href = selectedNode.data.docLink;
                }
              }}
            >
              View Detailed Documentation
            </button>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 right-4 bg-slate-800/70 backdrop-blur p-3 rounded z-10 max-w-sm border border-slate-700">
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
        </ul>
      </div>
      <ReactFlowProvider>
        <ReactFlow 
          nodes={filteredNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.5}
          maxZoom={1.5}
          attributionPosition="bottom-right"
          onNodeClick={onNodeClick}
        >
          <Background color="#4a5568" gap={20} size={1} variant="dots" />
          <Controls className="bg-background/80" />
          <MiniMap 
            nodeColor="#1e293b"
            maskColor="rgba(0, 0, 0, 0.1)"
            className="bg-slate-950/30 !border-slate-700"
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}