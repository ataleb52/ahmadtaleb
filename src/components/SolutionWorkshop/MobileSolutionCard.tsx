import { motion } from 'framer-motion';
import { statusConfig } from '@/constants/statusConfig';
import type { Solution } from '@/types/solution';

export default function MobileSolutionCard({ solution, onClick }: { solution: Solution; onClick: () => void }) {
  const config = statusConfig[solution.status] || statusConfig.draft;
  const Icon = config.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      onClick={onClick}
      className={`w-full p-2.5 rounded-lg border ${config.borderColor} ${config.bgColor} cursor-pointer`}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex-shrink-0 pt-0.5">
          <Icon size={16} />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className={`font-semibold text-xs mb-0.5 truncate ${config.color}`}>{solution.title}</h3>
          <p className="text-xs text-gray-400 line-clamp-2 mb-1.5">
            {solution.previewDescription || solution.description}
          </p>
          {solution.thumbnailUrl && (
            <div className="mb-1.5 h-16 overflow-hidden rounded bg-gray-900 relative">
              <img src={solution.thumbnailUrl} alt={solution.title} className="w-full h-full object-cover" />
            </div>
          )}
          {solution.status === 'workbench' && solution.progress > 0 && (
            <div className="mb-1.5">
              <div className="flex justify-between text-[11px] text-gray-500 mb-0.5">
                <span>Progress</span>
                <span>{solution.progress}%</span>
              </div>
              <div className="w-full bg-gray-700/70 h-1 rounded-full overflow-hidden">
                <div className={`${config.progressColor} h-full`} style={{ width: `${solution.progress}%` }}></div>
              </div>
            </div>
          )}
          {solution.status === 'showcase' && solution.date && (
            <p className="text-[11px] text-gray-500 mb-1.5 flex items-center">{solution.date}</p>
          )}
          {solution.tags && solution.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {solution.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700/80 text-gray-400">{tag}</span>
              ))}
              {solution.tags.length > 2 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-gray-700/80 text-gray-400">+{solution.tags.length - 2} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
