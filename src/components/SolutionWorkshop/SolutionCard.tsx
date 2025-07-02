import React from 'react';
import { motion } from 'framer-motion';
import { X, PenTool, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { statusConfig } from '@/constants/statusConfig';
import type { Solution } from '@/types/solution';

interface SolutionCardProps {
  solution: Solution;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SolutionCard({ solution, onClick, onEdit, onDelete }: SolutionCardProps) {
  const config = statusConfig[solution.status] || statusConfig.draft;
  const Icon = config.icon;
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'p-3 mb-3 bg-gray-800/50 hover:bg-gray-800/80 rounded-md border border-gray-700 shadow-sm cursor-pointer relative overflow-hidden',
        config.borderColor
      )}
    >
      <div onClick={onClick} className="cursor-pointer">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-semibold text-white truncate">{solution.title}</h4>
          <div className={cn('w-2 h-2 rounded-full mt-1.5', config.progressColor)}><Icon size={16} /></div>
        </div>
        <p className="text-xs text-gray-400 mb-2 line-clamp-2">
          {solution.previewDescription || solution.description?.slice(0, 100) + '...'}
        </p>
        {solution.thumbnailUrl && (
          <div className="mb-2 h-24 overflow-hidden rounded bg-gray-900">
            <img src={solution.thumbnailUrl} alt={solution.title} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
        <button onClick={e => { e.stopPropagation(); onEdit(); }} className="p-1 bg-gray-700 rounded text-gray-300 hover:text-white">
          <PenTool size={12} />
        </button>
        <button onClick={e => { e.stopPropagation(); onDelete(); }} className="p-1 bg-gray-700 rounded text-gray-300 hover:text-white">
          <X size={12} />
        </button>
      </div>
      {solution.progress != null && (
        <div className="mb-2">
          <div className="flex justify-between text-[11px] text-gray-500 mb-0.5">
            <span>Progress</span><span>{solution.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
            <div className={cn(config.progressColor, 'h-full')} style={{ width: `${solution.progress}%` }} />
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-1 mb-2">
        {solution.tags.slice(0, 2).map(tag => (
          <span key={tag} className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700 text-gray-300">{tag}</span>
        ))}
        {solution.tags.length > 2 && <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700 text-gray-300">+{solution.tags.length - 2}</span>}
      </div>
      {solution.link && (
        <a href={solution.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
           className="text-xs text-blue-400 hover:underline flex items-center gap-1">
          View Details <ExternalLink size={10} />
        </a>
      )}
    </motion.div>
  );
}
