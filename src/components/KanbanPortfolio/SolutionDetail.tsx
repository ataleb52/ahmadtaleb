import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Wrench, CheckCircle, X } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import type { Solution } from './types';

interface SolutionDetailProps {
  solution: Solution;
  relatedSolutions: Solution[];
  onClose: () => void;
  onSelectRelated: (solution: Solution) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editable?: boolean;
  PortfolioItemComponents: Record<string, React.ComponentType<{solution: Solution}>>;
}

const SolutionDetail: React.FC<SolutionDetailProps> = ({
  solution,
  relatedSolutions,
  onClose,
  onSelectRelated,
  onEdit,
  onDelete,
  editable,
  PortfolioItemComponents
}) => {
  const DetailComponent = solution.detailComponentId && PortfolioItemComponents[solution.detailComponentId]
    ? PortfolioItemComponents[solution.detailComponentId]
    : PortfolioItemComponents.GenericDetailView;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-gray-900 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-start">
          <div className="flex gap-2">
            {editable && onEdit && (
              <button
                onClick={onEdit}
                className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded-md text-white"
              >Edit</button>
            )}
            {editable && onDelete && (
              <button
                onClick={onDelete}
                className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-md text-white"
              >Delete</button>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-300 bg-gray-800/50 hover:bg-gray-800 rounded-full"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-5">
          <Suspense fallback={<LoadingSpinner />}>
            <DetailComponent solution={solution} />
          </Suspense>
        </div>
        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300"
          >Close</button>
          {solution.link && (
            <a href={solution.link} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-sm bg-blue-700 hover:bg-blue-800 rounded-md text-white ml-2">View Link</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SolutionDetail;
