// filepath: /Users/ahmadtaleb/Documents/Github-VSCode/ahmadtaleb/src/components/portfolio-items/GenericDetailView.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Import Solution type
interface Solution {
  id: string;
  title: string;
  description: string;
  impact: string;
  status: 'blueprint' | 'workbench' | 'showcase';
  progress: number;
  date?: string;
  tags: string[];
  link?: string;
  relatedSolutions?: string[];
  detailComponentId?: string;
  thumbnailUrl?: string;
  previewDescription?: string;
}

interface DetailViewProps {
  solution: Solution;
}

export default function GenericDetailView({ solution }: DetailViewProps) {
  return (
    <div className="space-y-6">
      <p className="text-gray-300 leading-relaxed">{solution.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/40 p-4 rounded-md border border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Problem Context</h3>
          <p className="text-gray-400 text-sm">{solution.description}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/40 p-4 rounded-md border border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Expected Impact</h3>
          <p className="text-gray-400 text-sm">{solution.impact}</p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/30 p-4 rounded-md border border-gray-700 mt-6"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Solution Details</h3>
        <p className="text-gray-400">
          {solution.previewDescription || "Detailed information about this solution will be added soon."}
        </p>
        
        {solution.thumbnailUrl && (
          <div className="mt-4 rounded-md overflow-hidden bg-gray-900">
            <img 
              src={solution.thumbnailUrl} 
              alt={solution.title} 
              className="w-full object-cover" 
            />
          </div>
        )}
      </motion.div>
      
      {solution.tags && solution.tags.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2 text-gray-300">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {solution.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
