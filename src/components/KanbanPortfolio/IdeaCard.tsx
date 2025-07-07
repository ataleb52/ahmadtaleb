import React from 'react';
import { motion } from 'framer-motion';
import type { Solution } from './types';

interface IdeaCardProps {
  solution: Solution;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ solution, onClick, onEdit, onDelete, editable }) => {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-lg shadow-sm group border border-amber-100 hover:border-amber-300 transition-all duration-150 cursor-pointer overflow-hidden"
      style={{ padding: '15px' }}
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
      <div className="font-semibold text-gray-800 text-base mb-0.5 truncate">{solution.title}</div>
      <div className="text-xs text-gray-500 mb-1 line-clamp-2">{solution.previewDescription || solution.description.substring(0, 100) + (solution.description.length > 100 ? '...' : '')}</div>
      {solution.tags && solution.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {solution.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[11px] rounded-full bg-amber-50 text-amber-700 border border-amber-200">{tag}</span>
          ))}
          {solution.tags.length > 2 && (
            <span className="px-2 py-0.5 text-[11px] rounded-full bg-amber-50 text-amber-700 border border-amber-200">+{solution.tags.length - 2}</span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default IdeaCard;
