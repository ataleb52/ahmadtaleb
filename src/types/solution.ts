export type Solution = {
  id: string;
  title: string;
  description: string; // Added: General description
  impact: string; // Added: Impact statement
  status: 'blueprint' | 'workbench' | 'showcase' | 'draft' | 'published' | 'archived'; // Unified status
  progress: number; // Added: Progress percentage (0-100)
  date?: string; // Added: Optional date from Kanban's type
  tags: string[];
  link?: string; // Added: Optional link from Kanban's type
  relatedSolutions?: string[]; // Unified from relatedProjectIds and Kanban's relatedSolutions
  detailComponentId?: string; // Kept: React component for the detailed view (Kanban uses this)
  thumbnailUrl?: string;
  previewDescription?: string; // Kept: Short teaser text (Kanban uses this)

  // Fields from original solution.ts, kept for broader use if necessary
  subtitle?: string;
  heroImage?: string;
  categories?: string[];
  publishedDate?: string; // Can coexist with 'date' or be mapped
  lastUpdatedDate?: string;
  complexity?: 1 | 2 | 3 | 4 | 5;
  client?: string;
  roles?: string[];
  techStack?: string[];
  liveUrl?: string; // 'link' can be used for this too
  repoUrl?: string;
  problemStatement?: string;
  solutionOverview?: string; // 'description' or 'previewDescription' might cover this
  keyFeatures?: Array<{ title: string; description: string; icon?: string }>;
  learnings?: string;
  testimonial?: { quote: string; author: string; company?: string };

  // Allow any other custom fields that might be specific to a showcase component
  [key: string]: any;
};
