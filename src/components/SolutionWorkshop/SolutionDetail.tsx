import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';
import { statusConfig } from '@/constants/statusConfig';
import { Suspense } from 'react';
import type { Solution } from '@/types/solution';
import type { Dispatch, SetStateAction } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SolutionDetailProps {
  solution: Solution;
  isEditing?: boolean;
  relatedSolutions: Solution[];
  onClose: () => void;
  onSave?: (sol: Solution) => void;
  onSelectRelated: (sol: Solution) => void;
  onDelete?: (id: string) => void;
}

export default function SolutionDetail({ solution, isEditing = false, relatedSolutions, onClose, onSave, onSelectRelated, onDelete }: SolutionDetailProps) {
  const config = statusConfig[solution.status] || statusConfig.draft;

  return (
    <AnimatePresence>
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
            <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-300">
              <X size={18} />
            </button>
          </div>
          {/* Content */}
          <div className="flex-grow overflow-y-auto p-5">
            <Suspense fallback={<LoadingSpinner />}>
              {solution.detailComponentId && (
                <DynamicDetail solution={solution} />
              )}
            </Suspense>
            {/* Related Solutions */}
            {relatedSolutions.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <h4 className="text-md font-semibold mb-3 text-gray-300">Related Solutions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedSolutions.map(rs => (
                    <div key={rs.id} onClick={() => onSelectRelated(rs)} className="p-3 rounded-md border border-gray-700 bg-gray-800/30 hover:bg-gray-800/80 cursor-pointer">
                      <h5 className="font-medium text-sm text-gray-200 truncate">{rs.title}</h5>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{rs.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
            {isEditing && onSave && <button onClick={() => onSave(solution)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Save</button>}
            {onDelete && <button onClick={() => onDelete(solution.id)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md">Delete</button>}
            <button onClick={onClose} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md">Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DynamicDetail({ solution }: { solution: Solution }) {
  const Component = React.lazy(() => import(`@/components/portfolio-items/${solution.detailComponentId}.tsx`));
  return <Component solution={solution} />;
}
