import dagre from 'dagre';
import type { Edge, Node } from '@xyflow/react';

/**
 * Get a layouted version of nodes and edges using dagre
 * 
 * @param nodes - Input nodes to be positioned
 * @param edges - Edges between nodes
 * @param direction - Layout direction ('TB' for top-to-bottom, 'LR' for left-to-right)
 * @param options - Additional options for layout
 * @returns Object containing layouted nodes and edges
 */
export const getLayoutedElements = (
  nodes: Node[], 
  edges: Edge[], 
  direction: 'TB' | 'LR' = 'TB',
  options?: {
    ranksep?: number; // Vertical spacing between ranks
    nodesep?: number; // Horizontal spacing between nodes
    headerX?: number; // Optional fixed X position for header
  }
) => {
  // Separate header from nodes that need to be laid out
  const headerNodes = nodes.filter(node => node.id === 'header');
  const nodesToLayout = nodes.filter(node => node.id !== 'header');
  
  // Create a new directed graph
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Set graph options with improved defaults for spacing
  dagreGraph.setGraph({ 
    rankdir: direction,
    ranksep: options?.ranksep ?? 100, // Vertical spacing between ranks
    nodesep: options?.nodesep ?? 50,  // Horizontal spacing between nodes
    align: 'UL'                       // Align upper left corners
  });

  // Add nodes to the graph with appropriate sizing
  nodesToLayout.forEach((node) => {
    // Define sizes based on node types for better layout
    let width = 180; 
    let height = 80;
    
    if (node.type === 'blueprintExpandedNode') {
      width = 250;
      height = 200;
    } else if (node.type === 'blueprintNode') {
      width = 180;
      height = 120;
    }
    
    dagreGraph.setNode(node.id, { width, height });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    // Only add edges between nodes that are being laid out
    if (dagreGraph.hasNode(edge.source) && dagreGraph.hasNode(edge.target)) {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  // Calculate layout positions
  dagre.layout(dagreGraph);

  // Process and position the nodes that were laid out
  const layoutedNodes = nodesToLayout.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    // If node wasn't positioned by dagre (shouldn't happen but just in case)
    if (!nodeWithPosition) {
      return node;
    }
    
    return {
      ...node,
      // Center node at calculated position
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  // Process header nodes separately - ensure they maintain proper positioning
  const processedHeaderNodes = headerNodes.map(node => ({
    ...node,
    // Ensure header has proper zIndex to stay above other elements
    zIndex: 1000,
    // Use provided headerX or keep existing position, ensure not off-screen
    position: {
      x: options?.headerX !== undefined ? options.headerX : node.position.x,
      y: 10, // Always keep header at the top
    },
    // Make sure the header is not draggable to maintain design integrity
    draggable: false,
  }));

  // Combine the layout nodes with header nodes
  const allNodes = [...layoutedNodes, ...processedHeaderNodes];

  return {
    nodes: allNodes,
    edges: edges,
  };
};
