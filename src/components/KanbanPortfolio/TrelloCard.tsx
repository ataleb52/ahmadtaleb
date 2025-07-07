import React from 'react';
import { motion } from 'framer-motion';
import type { Solution } from './types';

interface TrelloCardProps {
  solution: Solution;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
  cardType?: 'minimal' | 'medium' | 'portfolio';
}

function TrelloCard({ solution, onClick, onEdit, onDelete, editable, cardType = 'medium' }: TrelloCardProps) {
  if (cardType === 'minimal') {
    return (
      <motion.div
        whileHover={{ y: -1, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-white rounded-md shadow-sm group border border-gray-200 hover:border-amber-400 transition-all duration-150 cursor-pointer px-3 py-2 flex flex-col gap-1 min-h-[48px]"
        onClick={onClick}
      >
        {editable && (
          <div className="absolute top-1 right-1 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                className="p-0.5 rounded hover:bg-blue-100 text-xs text-blue-600 bg-white border border-blue-200"
                onClick={e => { e.stopPropagation(); onEdit(); }}
                title="Edit"
              >✎</button>
            )}
            {onDelete && (
              <button
                className="p-0.5 rounded hover:bg-red-100 text-xs text-red-600 bg-white border border-red-200"
                onClick={e => { e.stopPropagation(); onDelete(); }}
                title="Delete"
              >🗑</button>
            )}
          </div>
        )}
        <div className="flex items-center gap-1 mb-1">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <div className="font-semibold text-gray-800 text-sm truncate">{solution.title}</div>
        </div>
        <div className="text-[10px] text-gray-500 line-clamp-1 ml-3">
          {solution.previewDescription || solution.description.substring(0, 60) + (solution.description.length > 60 ? '...' : '')}
        </div>
        {solution.tags && solution.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {solution.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-amber-50 text-amber-700 border border-amber-200">{tag}</span>
            ))}
            {solution.tags.length > 2 && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-50 text-amber-700 border border-amber-200">+{solution.tags.length - 2}</span>
            )}
          </div>
        )}
      </motion.div>
    );
  }
  // ...other card types (medium, portfolio) can be implemented here...
  return null;
}

export default TrelloCard;
