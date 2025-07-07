import React from 'react';
import { motion } from 'framer-motion';
import type { Solution } from './types';

interface SolutionCardProps {
  solution: Solution;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onClick, onEdit, onDelete, editable }) => {
  const statusColorMap = {
    blueprint: 'amber',
    workbench: 'blueprint',
    showcase: 'emerald',
  };
  const statusColor = statusColorMap[solution.status];

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-3 mb-3 bg-gray-800/50 hover:bg-gray-800/80 rounded-md border border-gray-700 hover:border-${statusColor}-500/50 cursor-pointer shadow-sm hover:shadow transition-all duration-200 overflow-hidden group relative`}
      onClick={onClick}
    >
      {editable && (
        <div className="absolute top-2 right-2 flex gap-1 z-20">
          {onEdit && (
            <button
              className="p-1 rounded hover:bg-blue-100 text-xs text-blue-600 bg-white border border-blue-200"
              onClick={e => { e.stopPropagation(); onEdit && onEdit(); }}
              title="Edit"
            >✎</button>
          )}
          {onDelete && (
            <button
              className="p-1 rounded hover:bg-red-100 text-xs text-red-600 bg-white border border-red-200"
              onClick={e => { e.stopPropagation(); onDelete && onDelete(); }}
              title="Delete"
            >🗑</button>
          )}
        </div>
      )}
      <div className="flex items-start justify-between mb-1">
        <div className="font-semibold text-gray-100 text-base truncate">{solution.title}</div>
      </div>
      <p className="text-xs text-gray-400 mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors duration-200">
        {solution.previewDescription || solution.description.substring(0, 100) + (solution.description.length > 100 ? '...' : '')}
      </p>
      {solution.thumbnailUrl && (
        <div className="mb-2 h-24 overflow-hidden rounded bg-gray-900 relative">
          <img src={solution.thumbnailUrl} alt={solution.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      )}
      {solution.status === 'workbench' && (
        <div className="mb-2">
          <div className="flex justify-between text-[11px] text-gray-400 mb-0.5">
            <span>Progress</span>
            <span>{solution.progress}%</span>
          </div>
          <div className="w-full bg-blue-100 h-1 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full transition-all duration-500" style={{ width: `${solution.progress}%` }}></div>
          </div>
        </div>
      )}
      {solution.tags && solution.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {solution.tags.slice(0, 2).map(tag => (
            <span key={tag} className={`px-2 py-0.5 text-[11px] rounded-full bg-${statusColor}-50 text-${statusColor}-700 border border-${statusColor}-200`}>{tag}</span>
          ))}
          {solution.tags.length > 2 && (
            <span className={`px-2 py-0.5 text-[11px] rounded-full bg-${statusColor}-50 text-${statusColor}-700 border border-${statusColor}-200`}>+{solution.tags.length - 2}</span>
          )}
        </div>
      )}
      <div className={`mt-2 text-xs text-${statusColor}-400 font-medium flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
        View details
      </div>
    </motion.div>
  );
};

export default SolutionCard;
