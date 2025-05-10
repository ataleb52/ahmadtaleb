import React from 'react';

// Define types for our detailed component data
export type ComponentLayer = {
  id: string;
  label: string;
  description: string;
  cssProperties: string[];
  zIndex: number;
  preview?: React.ReactNode;
};

export type VariantOption = {
  id: string;
  label: string;
  description?: string;
};

export type ComponentData = {
  id: string;
  type: string;
  data: {
    label: string;
    description: string;
    icon?: React.ReactNode;
    items?: string[];
    layers?: ComponentLayer[];
    docLink?: string;
    codeExample?: string;
    related?: string[];
    selected?: boolean;
    isExpanded?: boolean;
    variants?: VariantOption[];
  };
  position: { x: number; y: number };
};

// Component node with detailed layers information
export const buttonComponent: ComponentData = {
  id: 'button',
  type: 'blueprintExpandedNode',
  data: {
    label: 'Button',
    description: 'Interactive element for triggering actions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <path d="M6 12h12" />
      </svg>
    ),
    items: ['Primary', 'Secondary', 'Ghost', 'Link'],
    variants: [
      {
        id: 'primary',
        label: 'Primary',
        description: 'Main call-to-action button style'
      },
      {
        id: 'secondary',
        label: 'Secondary',
        description: 'Alternative button style for secondary actions'
      },
      {
        id: 'ghost',
        label: 'Ghost',
        description: 'Transparent button with border'
      },
      {
        id: 'link',
        label: 'Link',
        description: 'Button that looks like a text link'
      }
    ],
    layers: [
      {
        id: 'base',
        label: 'Base Container',
        description: 'Core button container with border radius and background',
        cssProperties: [
          'padding', 
          'border-radius', 
          'background', 
          'border'
        ],
        zIndex: 1,
        preview: (
          <div className="w-full h-8 rounded bg-blue-600"></div>
        )
      },
      {
        id: 'text',
        label: 'Text Content',
        description: 'Typography and content rendering',
        cssProperties: [
          'font-family', 
          'font-weight', 
          'color', 
          'line-height'
        ],
        zIndex: 2,
        preview: (
          <div className="w-full h-8 flex items-center justify-center text-white font-medium text-sm">Button Text</div>
        )
      },
      {
        id: 'icon',
        label: 'Icon Element',
        description: 'Optional leading/trailing SVG icons',
        cssProperties: [
          'width', 
          'height', 
          'margin', 
          'color'
        ],
        zIndex: 3,
        preview: (
          <div className="flex items-center justify-center gap-2">
            <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        )
      },
      {
        id: 'states',
        label: 'Interactive States',
        description: 'Hover, focus, active state styling',
        cssProperties: [
          'background', 
          'box-shadow', 
          'transform', 
          'opacity'
        ],
        zIndex: 4,
        preview: (
          <div className="flex gap-2">
            <div className="px-2 py-0.5 rounded text-[8px] bg-blue-700 text-white">Hover</div>
            <div className="px-2 py-0.5 rounded text-[8px] bg-blue-800 text-white">Active</div>
            <div className="px-2 py-0.5 rounded text-[8px] bg-blue-600 text-white ring-2 ring-blue-300">Focus</div>
          </div>
        )
      }
    ],
    docLink: '/dev/components#button',
    codeExample: `// Button component usage
<Button variant="primary">
  Click Me
  <ArrowRightIcon />
</Button>`,
    related: ['components']
  },
  position: { x: 50, y: 300 }
};

// Card component with detailed layers
export const cardComponent: ComponentData = {
  id: 'card',
  type: 'blueprintExpandedNode',
  data: {
    label: 'Card',
    description: 'Container for grouped content and actions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
    items: ['Default', 'Interactive', 'Blueprint'],
    layers: [
      {
        id: 'container',
        label: 'Card Container',
        description: 'Main wrapper with border and shadow',
        cssProperties: [
          'border-radius', 
          'border', 
          'background', 
          'box-shadow'
        ],
        zIndex: 1,
        preview: (
          <div className="w-full h-10 rounded-md bg-slate-800 border border-slate-700 shadow"></div>
        )
      },
      {
        id: 'header',
        label: 'Card Header',
        description: 'Title and optional description area',
        cssProperties: [
          'padding', 
          'border-bottom', 
          'display', 
          'flex'
        ],
        zIndex: 2,
        preview: (
          <div className="w-full flex items-center px-3 py-1">
            <div className="h-2 w-16 bg-slate-200 rounded"></div>
          </div>
        )
      },
      {
        id: 'content',
        label: 'Card Content',
        description: 'Main content area for text, images, etc',
        cssProperties: [
          'padding', 
          'overflow', 
          'typography',
        ],
        zIndex: 3,
        preview: (
          <div className="px-3 py-1">
            <div className="h-1 w-full bg-slate-600 rounded mb-1"></div>
            <div className="h-1 w-3/4 bg-slate-600 rounded"></div>
          </div>
        )
      },
      {
        id: 'footer',
        label: 'Card Footer',
        description: 'Optional area for actions and buttons',
        cssProperties: [
          'padding', 
          'border-top', 
          'display', 
          'justify-content'
        ],
        zIndex: 4,
        preview: (
          <div className="w-full flex justify-end px-3 py-1">
            <div className="h-2 w-8 bg-blue-500 rounded"></div>
          </div>
        )
      }
    ],
    docLink: '/dev/components#card',
    codeExample: `// Card component usage
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`,
    related: ['components']
  },
  position: { x: 250, y: 300 }
};

// Detailed layout pattern
export const layoutComponent: ComponentData = {
  id: 'layout',
  type: 'blueprintExpandedNode',
  data: {
    label: 'Page Layout',
    description: 'Structure for organizing page content',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    items: ['Standard', 'Sidebar', 'Dashboard'],
    layers: [
      {
        id: 'container',
        label: 'Main Container',
        description: 'Viewport container',
        cssProperties: [
          'max-width', 
          'margin', 
          'padding'
        ],
        zIndex: 1,
        preview: (
          <div className="w-full h-12 bg-slate-900 border border-slate-800 rounded"></div>
        )
      },
      {
        id: 'header',
        label: 'Header Section',
        description: 'Top navigation area',
        cssProperties: [
          'position', 
          'height', 
          'display', 
          'padding'
        ],
        zIndex: 2,
        preview: (
          <div className="w-full h-2 bg-slate-700 mb-1"></div>
        )
      },
      {
        id: 'content',
        label: 'Content Area',
        description: 'Main page content',
        cssProperties: [
          'padding', 
          'display', 
          'grid', 
          'gap'
        ],
        zIndex: 3,
        preview: (
          <div className="flex gap-1">
            <div className="w-1/4 h-6 bg-slate-800"></div>
            <div className="w-3/4 h-6 bg-slate-700"></div>
          </div>
        )
      },
      {
        id: 'footer',
        label: 'Footer Section',
        description: 'Bottom information area',
        cssProperties: [
          'padding', 
          'margin-top', 
          'border-top'
        ],
        zIndex: 4,
        preview: (
          <div className="w-full h-2 bg-slate-800 mt-1"></div>
        )
      }
    ],
    docLink: '/dev/patterns#layout',
    codeExample: `// Layout component usage
<PageLayout>
  <Header />
  <MainContent>
    <Sidebar />
    <ContentSection />
  </MainContent>
  <Footer />
</PageLayout>`,
    related: ['patterns']
  },
  position: { x: 450, y: 300 }
};

// Color system component data
export const colorComponent: ComponentData = {
  id: 'colors',
  type: 'blueprintExpandedNode',
  data: {
    label: 'Color System',
    description: 'Design tokens for consistent color usage',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v8" />
        <path d="M4.93 10.93 10 16" />
        <path d="M2 18h12" />
        <path d="M19.07 10.93 14 16" />
        <path d="M22 18h-6" />
        <path d="M12 2a5 5 0 0 1-5 5" />
        <path d="M12 2a5 5 0 0 0 5 5" />
      </svg>
    ),
    items: ['Primary', 'Neutral', 'Accent', 'Semantic'],
    layers: [
      {
        id: 'primary',
        label: 'Primary Colors',
        description: 'Main brand colors',
        cssProperties: [
          '--primary', 
          '--primary-foreground'
        ],
        zIndex: 1,
        preview: (
          <div className="flex gap-1">
            <div className="h-4 w-4 rounded bg-blue-600"></div>
            <div className="h-4 w-4 rounded bg-blue-500"></div>
            <div className="h-4 w-4 rounded bg-blue-400"></div>
          </div>
        )
      },
      {
        id: 'neutral',
        label: 'Neutral Colors',
        description: 'Grayscale for text and backgrounds',
        cssProperties: [
          '--background', 
          '--foreground', 
          '--muted', 
          '--muted-foreground'
        ],
        zIndex: 2,
        preview: (
          <div className="flex gap-1">
            <div className="h-4 w-4 rounded bg-slate-900"></div>
            <div className="h-4 w-4 rounded bg-slate-800"></div>
            <div className="h-4 w-4 rounded bg-slate-600"></div>
            <div className="h-4 w-4 rounded bg-slate-200"></div>
          </div>
        )
      },
      {
        id: 'accent',
        label: 'Accent Colors',
        description: 'Secondary and highlight colors',
        cssProperties: [
          '--accent', 
          '--accent-foreground'
        ],
        zIndex: 3,
        preview: (
          <div className="flex gap-1">
            <div className="h-4 w-4 rounded bg-amber-500"></div>
            <div className="h-4 w-4 rounded bg-indigo-500"></div>
          </div>
        )
      },
      {
        id: 'semantic',
        label: 'Semantic Colors',
        description: 'Status and feedback colors',
        cssProperties: [
          '--success', 
          '--warning', 
          '--error', 
          '--info'
        ],
        zIndex: 4,
        preview: (
          <div className="flex gap-1">
            <div className="h-4 w-4 rounded bg-green-500"></div>
            <div className="h-4 w-4 rounded bg-amber-500"></div>
            <div className="h-4 w-4 rounded bg-red-500"></div>
            <div className="h-4 w-4 rounded bg-blue-500"></div>
          </div>
        )
      }
    ],
    docLink: '/dev/foundations#colors',
    codeExample: `// Color usage example
import { cn } from "@/lib/utils";

<div className={cn("bg-primary text-primary-foreground")}>
  Primary colored element
</div>`,
    related: ['foundations']
  },
  position: { x: 550, y: 250 }
};

// Collection of components for detailed exploded view
export const detailedComponents = [
  buttonComponent,
  cardComponent,
  layoutComponent,
  colorComponent
];
