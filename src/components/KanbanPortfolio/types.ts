// Solution type and related types for KanbanPortfolio components

export type Solution = {
  id: string;
  title: string;
  description: string;
  impact: string;
  status: 'blueprint' | 'workbench' | 'showcase';
  progress: number; // 0-100
  date?: string;
  tags: string[];
  link?: string;
  relatedSolutions?: string[]; // IDs of related solutions
  detailComponentId?: string; // Reference to the component for detailed content
  thumbnailUrl?: string; // Optional thumbnail image for the card
  previewDescription?: string; // Short teaser text that hints at the content
};
