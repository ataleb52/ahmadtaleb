import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, HelpCircle, ListChecks, CheckSquare, Users, BarChart3, Target, Lightbulb, Zap, CheckCircle, MessageSquare, Briefcase } from 'lucide-react';
import { WorkshopBottomSheet } from './WorkshopBottomSheet';

// Define a type for challenges
interface ChallengeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  relatedInsight?: string; // Optional: A brief insight/solution statement for this challenge
}

// Define a type for the services menu
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function WhatIDoDisplay() {
  const [viewMode, setViewMode] = useState('initialOptions'); // 'initialOptions', 'challengeSelection', 'solutionDisplay', 'servicesMenu', 'workshop'
  const [selectedChallenges, setSelectedChallenges] = useState<ChallengeOption[]>([]); // Store full challenge objects

  const handleChallengePathClick = () => {
    setViewMode('challengeSelection');
  };

  const handleMenuClick = () => {
    setViewMode('servicesMenu');
  };

  const handleWorkshopClick = () => {
    setViewMode('workshop');
  };

  const toggleChallengeSelection = (challenge: ChallengeOption) => {
    setSelectedChallenges(prev =>
      prev.find(c => c.id === challenge.id)
        ? prev.filter(c => c.id !== challenge.id)
        : [...prev, challenge]
    );
  };

  const handleSubmitChallenges = () => {
    if (selectedChallenges.length > 0) {
      setViewMode('solutionDisplay');
    }
  };

  const handleStartOver = () => {
    setSelectedChallenges([]);
    setViewMode('initialOptions');
  };

  const predefinedChallenges: ChallengeOption[] = [
    {
      id: 'stuck-team',
      title: 'My team is stuck in the mud',
      description: 'Projects are slow, morale is low, and nothing seems to move forward.',
      icon: <Users size={20} className="text-red-400" />,
      relatedInsight: "I can help diagnose team bottlenecks and implement agile practices to boost momentum."
    },
    {
      id: 'strategy-needed',
      title: 'Need a new product/feature strategy',
      description: 'Unsure what to build next or how to approach a new market opportunity.',
      icon: <Lightbulb size={20} className="text-yellow-400" />,
      relatedInsight: "Together, we can define a clear, actionable strategy based on user research and market analysis."
    },
    {
      id: 'scaling-pains',
      title: 'Scaling our operations is painful',
      description: "Growth is happening, but our processes and systems can't keep up.",
      icon: <Zap size={20} className="text-blue-400" />,
      relatedInsight: "I specialize in streamlining operations and building scalable systems for growth."
    },
    {
      id: 'no-clear-path',
      title: 'I\'m not sure where to start',
      description: 'Facing a complex problem and need help defining the path forward.',
      icon: <HelpCircle size={20} className="text-purple-400" />,
      relatedInsight: "I provide clarity by breaking down complex problems into manageable steps and clear actions."
    },
    {
      id: 'data-overwhelm',
      title: 'Drowning in data, starving for insights',
      description: 'We have analytics, but they don\'t lead to clear actions or decisions.',
      icon: <BarChart3 size={20} className="text-orange-400" />,
      relatedInsight: "I can help you transform raw data into actionable insights that drive decision-making."
    },
    {
      id: 'missed-targets',
      title: 'Consistently missing targets/OKRs',
      description: 'Despite efforts, key objectives and results are not being met.',
      icon: <Target size={20} className="text-red-500" />,
      relatedInsight: "Let's identify the root causes and develop a focused plan to get you back on track."
    }
  ];

  const servicesList: ServiceItem[] = [
    { id: 's1', title: "Product Strategy & Discovery", description: "Defining what to build and why.", icon: <Lightbulb size={20} className="text-teal-400" /> },
    { id: 's2', title: "Agile Coaching & Team Enablement", description: "Helping teams ship faster and better.", icon: <Users size={20} className="text-green-400" /> },
    { id: 's3', title: "Operational Excellence & Scaling", description: "Building robust systems for growth.", icon: <Zap size={20} className="text-indigo-400" /> },
    { id: 's4', title: "Data Analysis & Insight Generation", description: "Turning data into actionable intelligence.", icon: <BarChart3 size={20} className="text-amber-400" /> },
    { id: 's5', title: "Problem Solving & Root Cause Analysis", description: "Getting to the heart of complex issues.", icon: <HelpCircle size={20} className="text-rose-400" /> },
  ];

  return (
    <div className="p-6 pt-12 sm:p-8 sm:pt-16 font-mono text-sm text-gray-300 overflow-y-auto max-h-[calc(80vh-100px)] flex flex-col items-center justify-start w-full">
      {viewMode === 'initialOptions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg flex flex-col items-center space-y-4"
        >
          {/* <button
            className="w-full text-left p-4 bg-gray-700/60 hover:bg-gray-700/90 border border-gray-600 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 group"
            onClick={handleWorkshopClick}
          >
            <div className="flex items-center">
              <Briefcase size={24} className="text-amber-400 mr-3 transition-transform group-hover:scale-110" />
              <span className="text-gray-100 group-hover:text-white text-base font-medium">View My Solution Workshop</span>
            </div>
            <p className="text-xs text-gray-400 ml-9 mt-1 group-hover:text-gray-300">
              See what I\'m currently working on and past solutions.
            </p>
          </button> */}

          <button
            className="w-full text-left p-4 bg-gray-700/60 hover:bg-gray-700/90 border border-gray-600 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 group"
            onClick={handleChallengePathClick}
          >
            <div className="flex items-center">
              <ChevronRight size={24} className="text-cyan-400 mr-3 transition-transform group-hover:translate-x-1" />
              <span className="text-gray-100 group-hover:text-white text-base font-medium">Tell me about your challenge</span>
            </div>
            <p className="text-xs text-gray-400 ml-9 mt-1 group-hover:text-gray-300">
              Let&apos;s diagnose the core issues together.
            </p>
          </button>

          <button
            className="w-full text-left p-4 bg-gray-700/60 hover:bg-gray-700/90 border border-gray-600 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 group"
            onClick={handleMenuClick}
          >
            <div className="flex items-center">
              <ListChecks size={24} className="text-cyan-400 mr-3 transition-transform group-hover:scale-110" />
              <span className="text-gray-100 group-hover:text-white text-base font-medium">Just tell me what you do</span>
            </div>
            <p className="text-xs text-gray-400 ml-9 mt-1 group-hover:text-gray-300">
              Get a straightforward list of my services.
            </p>
          </button>
        </motion.div>
      )}

      {viewMode === 'workshop' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-cyan-300">Solution Workshop</h3>
            <button
              onClick={handleStartOver}
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              Back to Main Options
            </button>
          </div>
          <WorkshopBottomSheet />
        </motion.div>
      )}

      {viewMode === 'challengeSelection' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl flex flex-col items-center space-y-6"
        >
          <h3 className="text-xl font-semibold text-center text-cyan-300 mb-2">What challenges are you facing?</h3>
          <p className="text-center text-gray-400 mb-6 text-xs sm:text-sm">
            Select all that apply. This will help me understand how I can best assist you.
          </p>
          <div className="w-full space-y-3">
            {predefinedChallenges.map(challenge => (
              <motion.button
                key={challenge.id}
                onClick={() => toggleChallengeSelection(challenge)}
                className={`w-full text-left p-3 sm:p-4 border rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2  ${
                  selectedChallenges.find(c => c.id === challenge.id)
                    ? 'bg-cyan-600/30 border-cyan-500 ring-cyan-500'
                    : 'bg-gray-700/50 hover:bg-gray-700/80 border-gray-600 hover:border-gray-500 ring-transparent'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start sm:items-center">
                  <div className="mr-3 sm:mr-4 pt-0.5 sm:pt-0">
                    {selectedChallenges.find(c => c.id === challenge.id)
                      ? <CheckSquare size={20} className="text-cyan-400" />
                      : challenge.icon
                    }
                  </div>
                  <div>
                    <span className={`font-medium ${selectedChallenges.find(c => c.id === challenge.id) ? 'text-cyan-200' : 'text-gray-200'}`}>
                      {challenge.title}
                    </span>
                    <p className={`text-xs mt-0.5 ${selectedChallenges.find(c => c.id === challenge.id) ? 'text-cyan-300/80' : 'text-gray-400'}`}>
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          {selectedChallenges.length > 0 && (
            <motion.button
              onClick={handleSubmitChallenges}
              className="w-full max-w-xs mt-6 p-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Continue with {selectedChallenges.length} challenge{selectedChallenges.length > 1 ? 's' : ''}
              <ChevronRight size={20} />
            </motion.button>
          )}
        </motion.div>
      )}

      {viewMode === 'solutionDisplay' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl flex flex-col items-center space-y-6 text-center"
        >
          <CheckCircle size={48} className="text-green-400 mb-2" />
          <h3 className="text-xl font-semibold text-cyan-300">Here's how I can help:</h3>
          {selectedChallenges.length > 0 ? (
            <div className="space-y-4 text-left bg-gray-700/30 p-4 rounded-lg border border-gray-600 w-full">
              <p className="text-gray-300 text-sm mb-3">Based on your selection of:</p>
              <ul className="list-none space-y-3 mb-4">
                {selectedChallenges.map(challenge => (
                  <li key={challenge.id} className="flex items-start p-2 bg-gray-600/30 rounded-md">
                    <div className="mr-3 pt-1">{challenge.icon}</div>
                    <div>
                      <span className="font-medium text-cyan-300">{challenge.title}</span>
                      {challenge.relatedInsight && <p className="text-xs text-gray-400 mt-0.5">{challenge.relatedInsight}</p>}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-center text-gray-300 text-sm mt-4">
                These are common issues I have experience resolving.
                I can work with you to develop tailored strategies and solutions.
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No challenges selected. Please go back and select some challenges.</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-4">
            <button
              onClick={() => console.log("Contact Me / Next Step Placeholder")}
              className="w-full p-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18}/> Let's Discuss Further
            </button>
            <button
              onClick={handleStartOver}
              className="w-full p-3 bg-gray-600 hover:bg-gray-500 text-gray-200 font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Start Over
            </button>
          </div>
        </motion.div>
      )}

      {viewMode === 'servicesMenu' && (
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg flex flex-col items-center space-y-4"
        >
          <h3 className="text-xl font-semibold text-center text-cyan-300 mb-2">What I Do Exactly</h3>
          <p className="text-center text-gray-400 mb-4 text-xs sm:text-sm">
            Here's a list of services I offer. Select any to learn more or discuss further.
          </p>
           <div className="w-full space-y-3">
            {servicesList.map(service => (
              <motion.button
                key={service.id}
                // onClick={() => handleServiceSelection(service.id)} // Future: handle selection for more detail
                className="w-full text-left p-3 sm:p-4 border rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 bg-gray-700/50 hover:bg-gray-700/80 border-gray-600 hover:border-gray-500 ring-transparent group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start sm:items-center">
                  <div className="mr-3 sm:mr-4 pt-0.5 sm:pt-0 group-hover:text-cyan-300 transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <span className="font-medium text-gray-200 group-hover:text-white transition-colors">{service.title}</span>
                    <p className="text-xs mt-0.5 text-gray-400 group-hover:text-gray-300 transition-colors">{service.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
           <button
              onClick={handleStartOver}
              className="mt-6 p-3 bg-gray-600 hover:bg-gray-500 text-gray-200 font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full max-w-xs"
            >
              Back to Main Options
            </button>
        </motion.div>
      )}

      {/* Common footer element - terminal cursor */}
      <div className="flex items-center text-green-400 mt-auto pt-6">
        <span className="mr-2">$</span>
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
