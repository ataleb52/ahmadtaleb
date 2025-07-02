import React from 'react';
import SolutionCard from './SolutionCard';
import type { Solution } from '@/types/solution';

interface ListViewProps {
  solutions: Solution[];
  onSelect: (sol: Solution) => void;
  onEdit: (sol: Solution) => void;
  onDelete: (id: string) => void;
}

export default function ListView({ solutions, onSelect, onEdit, onDelete }: ListViewProps) {
  return (
    <div className="relative z-10 flex-grow overflow-y-auto p-2 bg-gray-900/30 backdrop-blur-xs rounded-lg border border-gray-700/50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {solutions.map(s => (
          <SolutionCard key={s.id} solution={s} onClick={() => onSelect(s)} onEdit={() => onEdit(s)} onDelete={() => onDelete(s.id)} />
        ))}
      </div>
    </div>
  );
}
