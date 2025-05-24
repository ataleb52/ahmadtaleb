import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Brain, Terminal, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StartupAboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverEffect, setHoverEffect] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('about-startup');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const text = "> Initializing system hacker protocol...";
      let index = 0;
      const timer = setInterval(() => {
        setTypedText(text.slice(0, index));
        index++;
        if (index > text.length) {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const approaches = [
    {
      id: 'hacker',
      title: 'System Hacker Mode',
      icon: <Terminal className="text-cyan-400" size={20} />,
      description: "I don't just work within systems - I understand their loopholes and leverage them. Legally, of course. Usually.",
      detail: "Think of me as your ethical system hacker. I find the gaps in processes that others miss and turn them into opportunities. No actual hacking required (usually)."
    },
    {
      id: 'speed',
      title: 'Rapid Deployment Protocol',
      icon: <Rocket className="text-cyan-400" size={20} />,
      description: "While your competitors are still writing PRDs, we'll be pushing to production. Speed is a feature.",
      detail: "I believe in the 'move fast and fix things' philosophy. We'll make mistakes, learn from them quickly, and keep iterating until we get it right."
    },
    {
      id: 'thinking',
      title: 'Neural Network Mode',
      icon: <Brain className="text-cyan-400" size={20} />,
      description: "My ADHD brain connects dots that others don't even see exist. It's like having a neural network trained on chaos.",
      detail: "Pattern recognition isn't just for ML models. I spot connections across your business that others miss, turning apparent chaos into strategic advantage."
    },
    {
      id: 'catalyst',
      title: 'Catalyst Protocol',
      icon: <Sparkles className="text-cyan-400" size={20} />,
      description: "I accelerate transformation from the edges, creating change without the corporate antibodies noticing.",
      detail: "By working from the outside, I can ignite change that spreads organically through your organization. No PowerPoint required."
    }
  ];

  return (
    <div id="about-startup" className="relative min-h-[600px] p-6 overflow-hidden bg-gray-900/95">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[url('/images/blueprint-grid.svg')] opacity-5" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Terminal header */}
        <div className="bg-gray-800 rounded-t-lg p-3 flex items-center gap-2 border-b border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-sm text-gray-400 font-mono">
            system_hacker_terminal.sh
          </div>
        </div>

        {/* Terminal content */}
        <div className="bg-gray-900 rounded-b-lg border border-gray-800 p-6 shadow-xl">
          {/* Typed text effect */}
          <div className="font-mono text-cyan-400 mb-6">
            {typedText}
            <span className="animate-pulse">_</span>
          </div>

          {/* Manifesto */}
          <div className="mb-8 border-l-2 border-cyan-500/30 pl-4">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-cyan-400 font-mono text-sm"
            >
              {"// I'm that person who gets called when"}
              <br />
              {"// conventional solutions have failed and"}
              <br />
              {"// you need someone who thinks differently."}
            </motion.p>
          </div>

          {/* Approach cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approaches.map((approach, index) => (
              <motion.div
                key={approach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.4 }}
                className={cn(
                  "group relative bg-gray-800/50 rounded-lg p-4 cursor-pointer border border-gray-700",
                  "hover:border-cyan-500/50 transition-all duration-300",
                  selectedId === approach.id && "border-cyan-500/50 bg-gray-800/80"
                )}
                onClick={() => setSelectedId(selectedId === approach.id ? null : approach.id)}
                onMouseEnter={() => setHoverEffect(approach.id)}
                onMouseLeave={() => setHoverEffect(null)}
              >
                {/* Card content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    {approach.icon}
                    <h3 className="text-gray-200 font-mono text-sm">
                      {approach.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">
                    {approach.description}
                  </p>

                  <AnimatePresence>
                    {selectedId === approach.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-gray-700">
                          <p className="text-cyan-400 text-sm font-mono">
                            {approach.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hover effects */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-cyan-500/5 opacity-0 transition-opacity duration-300",
                    hoverEffect === approach.id && "opacity-100"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
