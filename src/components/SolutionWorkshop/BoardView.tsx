import React from 'react';
import SolutionCard from './SolutionCard';
import type { Solution } from '@/types/solution';

interface BoardViewProps {
  blueprintSolutions: Solution[];
  workbenchSolutions: Solution[];
  showcaseSolutions: Solution[];
  onSelect: (sol: Solution) => void;
  onEdit: (sol: Solution) => void;
  onDelete: (id: string) => void;
}

export default function BoardView({ blueprintSolutions, workbenchSolutions, showcaseSolutions, onSelect, onEdit, onDelete }: BoardViewProps) {
  return (
    <div className="relative z-10 flex-grow flex flex-col gap-3 overflow-hidden p-2">
      <div className="grid grid-cols-2 gap-3 h-[45%]">
        <Column
          title="Blueprint"
          colorClass="text-amber-400"
          solutions={blueprintSolutions}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <Column
          title="Workbench"
          colorClass="text-blueprint"
          solutions={workbenchSolutions}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
      <div className="bg-gray-800/30 p-2 rounded-lg overflow-y-auto h-[55%] border border-gray-700/50 backdrop-blur-xs">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-emerald-400 font-semibold text-center">Showcase - Portfolio History ({showcaseSolutions.length})</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {showcaseSolutions.map(s => (
            <SolutionCard key={s.id} solution={s} onClick={() => onSelect(s)} onEdit={() => onEdit(s)} onDelete={() => onDelete(s.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Column({ title, colorClass, solutions, onSelect, onEdit, onDelete }: { title: string; colorClass: string; solutions: Solution[]; onSelect: (s: Solution) => void; onEdit: (s: Solution) => void; onDelete: (id: string) => void; }) {
  return (
    <div className="bg-gray-800/30 p-2 rounded-lg overflow-y-auto h-full border border-gray-700/50 backdrop-blur-xs">
      <h3 className={`${colorClass} font-semibold mb-2 text-center`}>{title} ({solutions.length})</h3>
      {solutions.map(s => <SolutionCard key={s.id} solution={s} onClick={() => onSelect(s)} onEdit={() => onEdit(s)} onDelete={() => onDelete(s.id)} />)}
    </div>
  );
}
