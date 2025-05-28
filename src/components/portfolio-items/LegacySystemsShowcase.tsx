import { motion } from 'framer-motion';

// Use Solution type directly to avoid import issues
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

interface ShowcaseProps {
  solution: Solution;
}

export default function LegacySystemsShowcase({ solution }: ShowcaseProps) {
  return (
    <div className="space-y-6">
      <p className="text-gray-300 leading-relaxed">{solution.description}</p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-amber-500/10 p-4 rounded-md border border-amber-500/30"
      >
        <h3 className="text-lg font-semibold mb-2 text-amber-400">The Challenge</h3>
        <p className="text-gray-300">
          Legacy systems often become deeply embedded in organizations, making them difficult to replace or modernize. 
          These systems typically use outdated technologies, lack documentation, and create significant technical debt.
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
          <h4 className="font-medium mb-2 text-white">Analysis</h4>
          <p className="text-sm text-gray-400">Comprehensive system mapping and dependency analysis to understand the full scope.</p>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
          <h4 className="font-medium mb-2 text-white">Strategy</h4>
          <p className="text-sm text-gray-400">Phased modernization approach with minimal disruption to business operations.</p>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-md border border-gray-700">
          <h4 className="font-medium mb-2 text-white">Implementation</h4>
          <p className="text-sm text-gray-400">Building bridges between legacy and modern systems while gradually replacing components.</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/30 p-4 rounded-md border border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Expected Impact</h3>
        <p className="text-gray-300">{solution.impact}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Visual Blueprint</h3>
        <div className="bg-gray-800 h-64 rounded-md flex items-center justify-center border border-gray-700 relative overflow-hidden">
          {solution.thumbnailUrl ? (
            <img 
              src={solution.thumbnailUrl} 
              alt="Legacy System Modernization" 
              className="w-full h-full object-cover opacity-70"
            />
          ) : (
            <p className="text-gray-500">Legacy System Modernization Diagram</p>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <p className="text-amber-400 font-semibold">Modernization Strategy</p>
            <p className="text-gray-300 text-sm">Phased approach with minimal business disruption</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">This diagram illustrates the planned migration path from legacy infrastructure to a modern, maintainable system.</p>
      </motion.div>
    </div>
  );
}
