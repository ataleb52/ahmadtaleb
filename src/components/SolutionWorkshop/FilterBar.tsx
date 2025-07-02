import React from 'react';
import { Search, LayoutGrid, ListTodo, PenTool, Wrench, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Dispatch, SetStateAction } from 'react';

interface FilterBarProps {
  totalCount: number;
  blueprintCount: number;
  workbenchCount: number;
  showcaseCount: number;
  activeArea: 'blueprint' | 'workbench' | 'showcase' | null;
  setActiveArea: (area: 'blueprint' | 'workbench' | 'showcase' | null) => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  viewMode: 'workshop' | 'list';
  toggleViewMode: () => void;
  onAddSolution?: () => void;
}

export default function FilterBar({ totalCount, blueprintCount, workbenchCount, showcaseCount, activeArea, setActiveArea, searchQuery, setSearchQuery, viewMode, toggleViewMode, onAddSolution }: FilterBarProps) {
  return (
    <div className="relative z-10 flex items-center justify-between p-3 border-b border-gray-700/50 mb-2 bg-gray-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search solutions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8 pr-2 py-1.5 text-xs bg-gray-800/70 border border-gray-700 rounded-md focus:ring-1 focus:ring-blueprint focus:border-blueprint w-48"
          />
        </div>
        <FilterButton label="All" count={totalCount} selected={!activeArea} onClick={() => setActiveArea(null)} />
        <FilterButton label="Blueprint" count={blueprintCount} selected={activeArea==='blueprint'} onClick={() => setActiveArea('blueprint')} color="amber" icon={<PenTool size={12}/>} />
        <FilterButton label="Workbench" count={workbenchCount} selected={activeArea==='workbench'} onClick={() => setActiveArea('workbench')} color="blueprint" icon={<Wrench size={12}/>} />
        <FilterButton label="Showcase" count={showcaseCount} selected={activeArea==='showcase'} onClick={() => setActiveArea('showcase')} color="emerald" icon={<CheckCircle size={12}/>} />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onAddSolution}
          className="px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-1.5"
        >
          <LayoutGrid size={14} /> Add Solution
        </button>
        <button
          onClick={toggleViewMode}
          className="px-3 py-1.5 text-xs bg-gray-700/50 hover:bg-gray-700/80 rounded-md flex items-center gap-1.5"
        >
          {viewMode === 'workshop' ? <ListTodo size={14} /> : <LayoutGrid size={14} />} {viewMode === 'workshop' ? 'List View' : 'Workshop View'}
        </button>
      </div>
    </div>
  );
}

function FilterButton({
  label,
  count,
  selected,
  onClick,
  color = 'default',
  icon
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
  color?: 'default'|'amber'|'blueprint'|'emerald';
  icon?: React.ReactNode;
}) {
  const base = "px-2.5 py-1.5 text-xs rounded-md flex items-center gap-1.5";
  let sel = 'bg-gray-700/50 hover:bg-gray-700/80 text-gray-300';
  if (selected) {
    if (color==='amber') sel = 'bg-amber-500 text-white';
    else if(color==='blueprint') sel='bg-blueprint text-white';
    else if(color==='emerald') sel='bg-emerald-500 text-white';
    else sel='bg-gray-600 text-white';
  }
  return (
    <button onClick={onClick} className={cn(base, sel)}>
      {icon}{label} ({count})
    </button>
  );
}
