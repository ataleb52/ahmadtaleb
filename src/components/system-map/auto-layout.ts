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
export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction = 'TB',
  options: {
    ranksep?: number,
    nodesep?: number,
    headerX?: number,
    headerY?: number,
    headerPadding?: number
  } = {}
) {
  // Create a copy of the nodes to avoid modifying the original
  const nodesCopy = [...nodes];
  
  // Find and handle the header node separately
  const headerIndex = nodesCopy.findIndex(n => n.id === 'header');
  let headerNode = null;
  
  if (headerIndex >= 0) {
    headerNode = nodesCopy.splice(headerIndex, 1)[0];
    
    // Position header based on parameters or defaults
    if (headerNode) {
      headerNode.position = {
        x: options.headerX ?? headerNode.position.x,
        y: options.headerY ?? headerNode.position.y
      };
    }
  }
  
  // Apply standard dagre layout to the remaining nodes
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, ranksep: options.ranksep || 100, nodesep: options.nodesep || 50 });

  // Add nodes to the graph
  nodesCopy.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 180, height: 120 });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    // Skip edges connected to the header
    if (edge.source !== 'header' && edge.target !== 'header') {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  dagre.layout(dagreGraph);

  // Apply the layout positions
  const layoutedNodes = nodesCopy.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    // If this is the first row of nodes after the header, add extra padding
    if (headerNode && node.data?.label && 
        ['Foundations', 'Components', 'Patterns'].includes(node.data.label as string)) {
      nodeWithPosition.y += (options.headerPadding || 40);
    }
    
    return {
      ...node,
      position: {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y,
      },
    };
  });

  // Add the header back to the nodes array if it exists
  if (headerNode) {
    layoutedNodes.unshift(headerNode);
  }

  return { nodes: layoutedNodes, edges };
}
