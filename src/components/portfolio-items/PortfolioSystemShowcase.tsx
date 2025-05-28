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

export default function PortfolioSystemShowcase({ solution }: ShowcaseProps) {
  const [activeTab, setActiveTab] = useState('architecture');
  
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
  
  const technologies = [
    { name: 'React + TypeScript', color: 'cyan' },
    { name: 'Framer Motion', color: 'purple' },
    { name: 'Tailwind CSS', color: 'blue' },
    { name: 'Vite', color: 'amber' },
    { name: 'Lucide Icons', color: 'emerald' },
    { name: 'Custom Hooks', color: 'red' },
    { name: 'Responsive Design', color: 'indigo' },
    { name: 'Git Version Control', color: 'orange' }
  ];
  
  const designPrinciples = [
    { title: 'Interactive Over Static', description: 'Engaging with content provides a deeper understanding than simply reading it.' },
    { title: 'Show, Don\'t Tell', description: 'Demonstrating problem-solving through the system itself creates more impact.' },
    { title: 'Progressive Disclosure', description: 'Revealing information as needed reduces cognitive load and improves focus.' },
    { title: 'Responsive & Adaptive', description: 'Designed to work seamlessly across all device types and screen sizes.' }
  ];
  
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
        className="bg-cyan-500/10 p-4 rounded-md border border-cyan-500/30"
      >
        <h3 className="text-lg font-semibold mb-2 text-cyan-400">Meta-Project</h3>
        <p className="text-gray-300">
          This very portfolio system represents a meta-project: solving the challenge of effectively communicating 
          my problem-solving approach through an interactive system that demonstrates rather than just tells.
        </p>
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="mt-6"
      >
        <div className="flex space-x-2 mb-4">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'architecture' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }`}
          >
            Architecture
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('technologies')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'technologies' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }`}
          >
            Technologies
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('principles')}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'principles' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }`}
          >
            Principles
          </motion.button>
        </div>
        
        {activeTab === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">System Architecture</h3>
              <p className="text-gray-300 mb-4">
                The portfolio system uses a component-based architecture with dynamic loading and custom showcases for each project.
              </p>
            </div>
            <div className="h-64 relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
              {solution.thumbnailUrl ? (
                <img 
                  src={solution.thumbnailUrl} 
                  alt="Portfolio Architecture" 
                  className="w-full h-full object-cover opacity-60"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Architecture diagram visualization */}
                  <div className="relative w-4/5 h-4/5">
                    <motion.div 
                      className="absolute top-1/4 left-1/4 w-20 h-20 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center"
                      animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-xs text-cyan-300">Core</span>
                    </motion.div>
                    <motion.div 
                      className="absolute top-1/3 right-1/4 w-16 h-16 rounded-md bg-purple-500/20 border border-purple-500/40 flex items-center justify-center"
                      animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <span className="text-xs text-purple-300">UI</span>
                    </motion.div>
                    <motion.div 
                      className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center"
                      animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    >
                      <span className="text-xs text-blue-300">Data</span>
                    </motion.div>
                    
                    {/* Connecting lines */}
                    <div className="absolute top-1/3 left-1/3 w-1/5 h-0.5 bg-cyan-500/30 transform rotate-45"></div>
                    <div className="absolute top-1/3 left-1/2 w-1/6 h-0.5 bg-purple-500/30 transform -rotate-45"></div>
                    <div className="absolute top-1/2 left-1/3 w-1/8 h-0.5 bg-blue-500/30 transform rotate-90"></div>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-4">
                <p className="text-cyan-400 font-semibold">Portfolio Architecture</p>
                <p className="text-gray-400 text-sm">Component-based with dynamic loading</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'technologies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-md border border-gray-700 p-4"
          >
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`bg-gray-800/80 p-3 rounded-md border border-${tech.color}-500/30 flex items-center`}
                >
                  <span className={`w-2 h-2 bg-${tech.color}-500 rounded-full mr-2`}></span>
                  <span className="text-gray-300 text-sm">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'principles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-md border border-gray-700 p-4"
          >
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">Design Principles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {designPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(8, 145, 178, 0.1)" }}
                  className="bg-gray-800/40 p-4 rounded-md border border-gray-700"
                >
                  <h4 className="font-medium mb-2 text-cyan-400">{principle.title}</h4>
                  <p className="text-sm text-gray-400">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-6 bg-blue-500/10 p-4 rounded-md border border-blue-500/30"
      >
        <h3 className="text-lg font-semibold mb-2 text-blue-400">Implementation Status</h3>
        <p className="text-gray-300 mb-3">{solution.impact}</p>
        
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Core Structure</span>
              <span>100%</span>
            </div>
            <motion.div 
              className="h-1.5 bg-gray-700 rounded-full overflow-hidden"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="h-full bg-green-500 rounded-full"
              />
            </motion.div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Animation & Interactivity</span>
              <span>85%</span>
            </div>
            <motion.div 
              className="h-1.5 bg-gray-700 rounded-full overflow-hidden"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-full bg-blue-500 rounded-full"
              />
            </motion.div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Content & Showcases</span>
              <span>70%</span>
            </div>
            <motion.div 
              className="h-1.5 bg-gray-700 rounded-full overflow-hidden"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-full bg-cyan-500 rounded-full"
              />
            </motion.div>
          </div>
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
              {solution.previewDescription || "Portfolio system architecture visualization"}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
