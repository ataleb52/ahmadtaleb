import React, { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { PenTool, Wrench, CheckCircle } from 'lucide-react';
import { BottomSheet } from './ui/bottom-sheet';

type Solution = {
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
}

interface WorkshopBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkshopBottomSheet({ isOpen, onClose }: WorkshopBottomSheetProps) {
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [activeCategory, setActiveCategory] = useState<'blueprint' | 'workbench' | 'showcase' | null>(null);
  
  // Solutions data
  const solutions: Solution[] = [
    // Blueprint solutions (Will Tackle)
    {
      id: 'blueprint-1',
      title: 'Legacy System Dependencies',
      description: 'Organizations stuck with 15+ year old infrastructure that slows innovation',
      impact: 'Will enable faster deployments and reduce maintenance costs by 60%',
      status: 'blueprint',
      progress: 0,
      tags: ['Legacy Systems', 'Architecture'],
      relatedSolutions: ['workbench-2', 'showcase-1']
    },
    {
      id: 'blueprint-2',
      title: 'Customer Behavior Blind Spots',
      description: 'Companies missing key insights into customer decision-making patterns',
      impact: 'Will surface hidden opportunities and reduce customer acquisition costs',
      status: 'blueprint',
      progress: 0,
      tags: ['Analytics', 'Customer Experience']
    },
    
    // Workbench solutions (Working On)
    {
      id: 'workbench-1',
      title: 'Portfolio Communication Clarity',
      description: 'Showcasing problem-solving approach in a memorable, effective way',
      impact: 'This very site—creating a system to demonstrate how I think',
      status: 'workbench',
      progress: 75,
      tags: ['Personal Brand', 'UX Design'],
      link: '#',
      relatedSolutions: ['showcase-2']
    },
    {
      id: 'workbench-2',
      title: 'Cross-Department Data Silos',
      description: 'Isolated systems preventing consolidated business intelligence',
      impact: 'Reducing manual entry by 70% across 5 departments',
      status: 'workbench',
      progress: 40,
      tags: ['Data Integration', 'Business Intelligence'],
      relatedSolutions: ['blueprint-1', 'showcase-1']
    },
    
    // Showcase solutions (Solved)
    {
      id: 'showcase-1',
      title: 'E-commerce System Fragmentation',
      description: 'Multiple disconnected tools causing order delays and inventory errors',
      impact: 'Reduced operational overhead by 40% and eliminated order delays',
      status: 'showcase',
      progress: 100,
      date: 'Q4 2023',
      tags: ['E-commerce', 'Systems Integration'],
      link: '/case-studies/ecommerce',
      relatedSolutions: ['workbench-2', 'blueprint-1']
    },
    {
      id: 'showcase-2',
      title: 'Manual Fulfillment Bottlenecks',
      description: 'Order processing delays impacting customer satisfaction',
      impact: 'Cut processing time from 3 days to 4 hours',
      status: 'showcase',
      progress: 100,
      date: 'Q2 2023',
      tags: ['Operations', 'Workflow Automation'],
      link: '/case-studies/fulfillment',
      relatedSolutions: ['workbench-1']
    }
  ];

  // Group solutions by status
  const blueprintSolutions = solutions.filter(s => s.status === 'blueprint');
  const workbenchSolutions = solutions.filter(s => s.status === 'workbench');
  const showcaseSolutions = solutions.filter(s => s.status === 'showcase');

  // Category configuration
  const categories = [
    {
      id: 'blueprint',
      title: 'Blueprint',
      subtitle: 'Problems I will tackle',
      icon: <PenTool size={16} className="text-amber-500" />,
      solutions: blueprintSolutions,
      color: 'amber'
    },
    {
      id: 'workbench',
      title: 'Workbench',
      subtitle: 'Currently working on',
      icon: <Wrench size={16} className="text-blueprint" />,
      solutions: workbenchSolutions,
      color: 'blueprint'
    },
    {
      id: 'showcase',
      title: 'Showcase',
      subtitle: 'Problems solved',
      icon: <CheckCircle size={16} className="text-emerald-500" />,
      solutions: showcaseSolutions,
      color: 'emerald'
    }
  ];

  return (
    <BottomSheet 
      isOpen={isOpen}
      onClose={onClose}
      className="bg-gray-800" 
      showCloseButton={false}
    >
      <div className="flex flex-col overflow-hidden">
        {/* Category Navigation */}
        <nav className="flex space-x-4 p-4 border-b border-gray-700">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                activeCategory === category.id
                  ? `bg-${category.color}-500/20 text-${category.color}-400`
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {category.icon}
              <span>{category.title}</span>
              <span className="text-xs opacity-60">({category.solutions.length})</span>
            </button>
          ))}
        </nav>

        {/* Solutions Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`space-y-4 ${activeCategory && activeCategory !== category.id ? 'hidden' : ''}`}
            >
              <div className="flex items-center space-x-2">
                {category.icon}
                <h3 className="text-sm font-medium text-gray-300">{category.subtitle}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                {category.solutions.map((solution) => (
                  <SolutionCard
                    key={solution.id}
                    solution={solution}
                    onClick={() => setActiveSolution(solution)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Solution Detail Modal */}
        {activeSolution && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveSolution(null)}
          >
            <div 
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <SolutionDetail
                solution={activeSolution}
                onClose={() => setActiveSolution(null)}
              />
            </div>
          </motion.div>
        )}
      </div>
    </BottomSheet>
  );
}

// Solution Card Component
function SolutionCard({ solution, onClick }: { solution: Solution; onClick: () => void }) {
  const progressValue = useMotionValue(0);
  const progressWidth = useMotionTemplate`${progressValue}%`;

  return (
    <motion.div
      onClick={onClick}
      className={`
        rounded-lg border p-4 cursor-pointer group relative overflow-hidden
        ${solution.status === 'blueprint' ? 'border-amber-500/30 bg-amber-500/5' : 
          solution.status === 'workbench' ? 'border-blueprint/30 bg-blueprint/5' :
          'border-emerald-500/30 bg-emerald-500/5'}
      `}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-200">{solution.title}</h3>
        {solution.status === 'showcase' && (
          <span className="text-xs text-gray-400">{solution.date}</span>
        )}
      </div>
      
      <p className="text-xs text-gray-400 mb-3">{solution.description}</p>
      
      {solution.progress > 0 && (
        <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blueprint rounded-full"
            style={{ width: progressWidth }}
            initial={{ width: 0 }}
            animate={{ width: `${solution.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mt-3">
        {solution.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// Solution Detail Component
function SolutionDetail({ 
  solution,
  onClose
}: { 
  solution: Solution;
  onClose: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-medium text-gray-200">{solution.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">The Problem</h3>
          <p className="text-gray-300">{solution.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">The Impact</h3>
          <p className="text-gray-300">{solution.impact}</p>
        </div>

        {solution.progress > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Progress</h3>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blueprint rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${solution.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {solution.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {solution.link && (
          <div className="pt-4">
            <a
              href={solution.link}
              className="inline-flex items-center space-x-2 text-sm text-blueprint hover:text-blueprint/80"
            >
              <span>View Details</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
