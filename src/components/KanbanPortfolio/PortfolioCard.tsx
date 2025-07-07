import React from 'react';
import { motion } from 'framer-motion';
import type { Solution } from './types';

interface PortfolioCardProps {
  solution: Solution;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
  index?: number;
  condensed?: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ solution, onClick, onEdit, onDelete, editable, index = 0, condensed = false }) => {
  const staggerDelay = index * 0.05;
  if (condensed) {
    // Condensed Domino's tracker style: just title, status, and a short description
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: staggerDelay, ease: [0.25, 0.1, 0.25, 1.0] }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-blue-50 rounded-lg shadow group border border-blue-200 hover:border-blue-400 transition-all duration-200 cursor-pointer overflow-hidden h-full flex flex-col px-4 py-3"
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
        <h3 className="font-semibold text-blue-800 text-base mb-1 group-hover:text-blue-700 transition-colors duration-200">{solution.title}</h3>
        <div className="text-xs text-blue-600 mb-2 font-medium uppercase tracking-wide">{solution.status}</div>
        <div className="text-sm text-blue-700 mb-1 line-clamp-2 flex-grow">
          {solution.previewDescription || solution.description.substring(0, 80) + (solution.description.length > 80 ? '...' : '')}
        </div>
      </motion.div>
    );
  }
  // ...existing code for full card...
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: staggerDelay, ease: [0.25, 0.1, 0.25, 1.0] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-xl shadow-md group border border-emerald-100 hover:border-emerald-300 transition-all duration-200 cursor-pointer overflow-hidden h-full flex flex-col"
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
      <div className="relative h-48 overflow-hidden">
        {!solution.thumbnailUrl && (
          <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <div className="text-white text-opacity-90 text-3xl font-bold">{solution.title.substring(0, 2).toUpperCase()}</div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>
        )}
        {solution.thumbnailUrl && (
          <img src={solution.thumbnailUrl} alt={solution.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors duration-200">{solution.title}</h3>
        <div className="text-sm text-slate-600 mb-3 line-clamp-3 flex-grow">
          {solution.previewDescription || solution.description.substring(0, 160) + (solution.description.length > 160 ? '...' : '')}
        </div>
        {solution.date && (
          <div className="flex items-center text-xs text-slate-500 mb-2">
            {solution.date}
          </div>
        )}
        {solution.tags && solution.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {solution.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{tag}</span>
            ))}
            {solution.tags.length > 3 && (
              <span className="px-2 py-0.5 text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">+{solution.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
