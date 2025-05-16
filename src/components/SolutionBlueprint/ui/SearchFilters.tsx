import React from 'react';
import { cn } from '@/lib/utils';
import { X, Search } from 'lucide-react';

type SearchFiltersProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterTag: string | null;
  onFilterTagChange: (tag: string | null) => void;
  allTags: string[];
  activeView: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  onSubmitRequest: () => void;
};

export function SearchFilters({
  searchQuery,
  onSearchChange,
  filterTag,
  onFilterTagChange,
  allTags,
  activeView,
  onViewChange,
  onSubmitRequest
}: SearchFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-3 items-center md:flex-row flex-col sm:items-start">
      {/* Search input */}
      <div className="relative flex-grow max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-blueprint"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      {/* View toggle */}
      <ViewToggle activeView={activeView} setActiveView={onViewChange} />
      
      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 ml-auto">
        {allTags.slice(0, activeView === 'grid' ? 3 : 5).map(tag => (
          <button
            key={tag}
            onClick={() => onFilterTagChange(filterTag === tag ? null : tag)}
            className={cn(
              "px-2 py-1 rounded-full text-xs transition-all duration-200 flex items-center gap-1",
              filterTag === tag 
                ? "bg-blueprint text-white shadow-sm" 
                : "bg-muted hover:bg-muted/60"
            )}
          >
            {filterTag === tag && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-in fade-in zoom-in duration-200"></span>
            )}
            {tag}
          </button>
        ))}
        
        {allTags.length > (activeView === 'grid' ? 3 : 5) && (
          <button
            className="px-2 py-1 rounded-full text-xs bg-muted hover:bg-muted/60"
          >
            +{allTags.length - (activeView === 'grid' ? 3 : 5)} more
          </button>
        )}
      </div>
    </div>
  );
}

function ViewToggle({ 
  activeView, 
  setActiveView 
}: { 
  activeView: 'grid' | 'list';
  setActiveView: (view: 'grid' | 'list') => void;
}) {
  return (
    <div className="flex rounded-md overflow-hidden border">
      <button
        onClick={() => setActiveView('grid')}
        className={cn(
          "px-3 py-1.5 flex items-center gap-1.5 text-sm",
          activeView === 'grid' 
            ? "bg-blueprint text-white" 
            : "hover:bg-muted"
        )}
      >
        <GridIcon size={14} />
        <span className="hidden sm:inline">Blueprint</span>
      </button>
      <button
        onClick={() => setActiveView('list')}
        className={cn(
          "px-3 py-1.5 flex items-center gap-1.5 text-sm border-l",
          activeView === 'list' 
            ? "bg-blueprint text-white" 
            : "hover:bg-muted"
        )}
      >
        <ListIcon size={14} />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
}

function GridIcon(props: any) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function ListIcon(props: any) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
