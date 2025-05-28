import { useState } from 'react';
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

export default function CustomerInsightsShowcase({ solution }: ShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const insightSteps = [
    { title: 'Data Collection', description: 'Gather customer data from multiple touchpoints' },
    { title: 'Segmentation', description: 'Group customers by behavior and preferences' },
    { title: 'Analysis', description: 'Identify patterns and opportunities in customer journeys' },
    { title: 'Action', description: 'Implement personalized strategies based on insights' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p 
        variants={itemVariants}
        className="text-gray-300 leading-relaxed"
      >
        {solution.description}
      </motion.p>
      
      <motion.div 
        variants={itemVariants}
        className="bg-purple-500/10 p-4 rounded-md border border-purple-500/30"
      >
        <h3 className="text-lg font-semibold mb-2 text-purple-400">The Challenge</h3>
        <p className="text-gray-300">
          Many companies collect vast amounts of customer data but struggle to translate it into actionable insights.
          This creates missed opportunities and an inability to effectively respond to changing customer behaviors.
        </p>
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="mt-6"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Insight Generation Process</h3>
        <div className="bg-gray-800 p-6 rounded-md border border-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-32 h-32 rounded-full bg-purple-500/20 absolute"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            ></motion.div>
            <motion.div 
              className="w-48 h-48 rounded-full bg-blue-500/10 absolute"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
            ></motion.div>
            <motion.div 
              className="w-64 h-64 rounded-full bg-cyan-500/5 absolute"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            ></motion.div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between mb-6 relative z-10">
              {insightSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveIndex(idx)}
                  className={`cursor-pointer text-center px-3 py-2 rounded-md transition-colors duration-200 ${
                    activeIndex === idx 
                      ? 'bg-purple-500/30 border border-purple-500/50' 
                      : 'hover:bg-gray-700/50'
                  }`}
                >
                  <p className={`font-medium ${activeIndex === idx ? 'text-purple-300' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700/30 p-4 rounded-md border border-gray-600/50 text-center h-32 flex items-center justify-center"
            >
              <div>
                <h4 className="text-xl font-semibold text-purple-300 mb-2">{insightSteps[activeIndex].title}</h4>
                <p className="text-gray-300">{insightSteps[activeIndex].description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
      >
        <motion.div 
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
          className="bg-gray-800/40 p-4 rounded-md border border-gray-700"
        >
          <h4 className="font-medium mb-2 text-purple-300">Data Collection Strategy</h4>
          <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4">
            <li className="transition-colors duration-200 hover:text-purple-300">Unified customer data platform</li>
            <li className="transition-colors duration-200 hover:text-purple-300">Behavioral analytics integration</li>
            <li className="transition-colors duration-200 hover:text-purple-300">Privacy-centric data governance</li>
            <li className="transition-colors duration-200 hover:text-purple-300">Cross-channel tracking implementation</li>
          </ul>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
          className="bg-gray-800/40 p-4 rounded-md border border-gray-700"
        >
          <h4 className="font-medium mb-2 text-purple-300">Insight Generation</h4>
          <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4">
            <li className="transition-colors duration-200 hover:text-purple-300">Advanced segmentation models</li>
            <li className="transition-colors duration-200 hover:text-purple-300">Decision journey mapping</li>
            <li className="transition-colors duration-200 hover:text-purple-300">Predictive behavior analysis</li>
            <li className="transition-colors duration-200 hover:text-purple-300">Real-time personalization engines</li>
          </ul>
        </motion.div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="bg-blue-500/10 p-4 rounded-md border border-blue-500/30"
      >
        <h3 className="text-lg font-semibold mb-2 text-blue-400">Expected Impact</h3>
        <p className="text-gray-300">{solution.impact}</p>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="h-1 bg-blue-500/50 mt-3 rounded-full"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 1, delay: 1.2 }}
            className="h-full bg-blue-400 rounded-full"
          />
        </motion.div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Current Progress</span>
          <span>75% Complete</span>
        </div>
      </motion.div>
      
      {solution.thumbnailUrl && (
        <motion.div
          variants={itemVariants}
          className="mt-4 rounded-md overflow-hidden relative"
        >
          <img 
            src={solution.thumbnailUrl} 
            alt={solution.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 left-3">
            <p className="text-sm text-gray-300">
              {solution.previewDescription || "Customer insights platform visualization"}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
