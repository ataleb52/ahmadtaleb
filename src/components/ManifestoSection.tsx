import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Wrench, Rocket, Brain, Target, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlueprintAnnotation } from './ui/blueprint-annotation';
import { Container } from './ui/container';

interface ManifestoChapter {
  id: string;
  title: string;
  icon: JSX.Element;
  content: string[];
  detail: string;
}

export function ManifestoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const [loadingPhase, setLoadingPhase] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('manifesto-section');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const text = "> Initializing identity protocol...";
      let index = 0;
      const timer = setInterval(() => {
        setTypedText(text.slice(0, index));
        index++;
        if (index > text.length) {
          clearInterval(timer);
          // Start loading phases after typing
          setTimeout(() => setLoadingPhase(1), 500);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const manifestoChapters: ManifestoChapter[] = [
    {
      id: 'problem-solver',
      title: 'The Problem Solver',
      icon: <Wrench className="w-5 h-5 text-cyan-400" />,
      content: [
        "Not the kind you diagram on a whiteboard and forget.",
        "The kind that make people quietly mutter,",
        "'Why is this still broken?'"
      ],
      detail: "I'm the one they call when your dev team is stuck in sprint hell, your execs are still 'aligning on vision,' and your data team is buried under a mountain of backlog. I cut through that mess."
    },
    {
      id: 'fast-mover',
      title: 'The Fast Mover',
      icon: <Rocket className="w-5 h-5 text-cyan-400" />,
      content: [
        "I don't do corporate theater.",
        "I don't need 6 weeks to 'scope' a strategy deck.",
        "I work fast, ask the hard questions, and build solutions",
        "that make the noise go away."
      ],
      detail: "Whether it's a scrappy prototype or an org-wide strategy, I bring order to chaos—without pretending it's easy."
    },
    {
      id: 'system-thinker',
      title: 'The System Thinker',
      icon: <Brain className="w-5 h-5 text-cyan-400" />,
      content: [
        "ADHD is my unofficial co-pilot.",
        "It means I see everything—",
        "especially the parts no one else connects."
      ],
      detail: "I skip the surface-level fixes and dive straight into the system underneath. Because surface-level is what got you stuck in the first place."
    },
    {
      id: 'pragmatist',
      title: 'The Pragmatist',
      icon: <Target className="w-5 h-5 text-cyan-400" />,
      content: [
        "Not flashy. Just sharp, fast, and",
        "relentless about outcomes.",
        "No polished decks. No 12-person teams.",
        "Just smart, grounded work that moves the needle."
      ],
      detail: "I'm not the guy for everyone. I'm the guy you call when you finally want to get something real done."
    }
  ];

  return (
    <div id="manifesto-section" className="relative min-h-[600px] overflow-hidden bg-gray-900/95">
      {/* Blueprint grid background with parallax effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/blueprint-grid.svg')] opacity-5 transform scale-110 animate-blueprint-shift"></div>
        <div className="absolute inset-0 bg-[url('/images/blueprint-grid.svg')] opacity-3 scale-150 transform rotate-45 animate-blueprint-shift-reverse"></div>
      </div>

      <Container className="relative z-10 py-16">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gray-800 rounded-t-lg p-3 flex items-center gap-2 border-b border-gray-700 max-w-3xl mx-auto">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-sm text-gray-400 font-mono">
              manifesto.sh
            </div>
          </div>

          <div className="bg-gray-900 rounded-b-lg border border-gray-800 p-6 max-w-3xl mx-auto">
            {/* Typed text effect */}
            <div className="font-mono text-cyan-400 mb-6">
              {typedText}
              <span className="animate-pulse">_</span>
            </div>

            {/* Loading phases */}
            <div className="space-y-3 mb-8">
              {['Analyzing identity patterns...', 'Compiling core values...', 'Initializing manifesto...'].map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: loadingPhase > index ? 1 : 0,
                    x: loadingPhase > index ? 0 : -20 
                  }}
                  transition={{ delay: index * 0.5 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center",
                    loadingPhase > index ? "bg-green-500/20 text-green-400" : "bg-gray-800"
                  )}>
                    {loadingPhase > index && (
                      <motion.svg 
                        className="w-3 h-3" 
                        viewBox="0 0 24 24"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <motion.path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                          fill="none"
                        />
                      </motion.svg>
                    )}
                  </div>
                  <span className={cn(
                    "font-mono transition-colors duration-300",
                    loadingPhase > index ? "text-gray-300" : "text-gray-600"
                  )}>
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Core identity statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loadingPhase >= 3 ? 1 : 0 }}
              transition={{ delay: 2 }}
              className="border-l-2 border-cyan-500/30 pl-4 mb-8"
            >
              <p className="text-cyan-400 font-mono text-sm leading-relaxed">
                {"// My name is Ahmad."}
                <br />
                {"// I solve problems."}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Manifesto chapters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {manifestoChapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: loadingPhase >= 3 ? 1 : 0,
                y: loadingPhase >= 3 ? 0 : 20
              }}
              transition={{ delay: 2 + (index * 0.2) }}
              onClick={() => setActiveChapterId(
                activeChapterId === chapter.id ? null : chapter.id
              )}
              className={cn(
                "group relative bg-gray-800/50 rounded-lg p-6 border cursor-pointer transition-all",
                activeChapterId === chapter.id 
                  ? "border-cyan-500/50 bg-cyan-500/5" 
                  : "border-gray-700 hover:border-gray-600"
              )}
            >
              {/* Blueprint measurement lines */}
              <div className="absolute top-0 left-6 right-6 h-px bg-cyan-500/10"></div>
              <div className="absolute bottom-0 left-6 right-6 h-px bg-cyan-500/10"></div>
              <div className="absolute top-6 bottom-6 left-0 w-px bg-cyan-500/10"></div>
              <div className="absolute top-6 bottom-6 right-0 w-px bg-cyan-500/10"></div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-700/50">
                  {chapter.icon}
                </div>
                <h3 className="font-medium text-gray-200">{chapter.title}</h3>
              </div>

              {/* Content */}
              <div className="space-y-2 mb-4">
                {chapter.content.map((line, i) => (
                  <p key={i} className="text-gray-400 text-sm">{line}</p>
                ))}
              </div>

              {/* Expandable detail */}
              <AnimatePresence>
                {activeChapterId === chapter.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-700">
                      <p className="text-cyan-400 text-sm">
                        {chapter.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interaction hint */}
              <div className="absolute bottom-4 right-4">
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  activeChapterId === chapter.id ? "rotate-90" : "rotate-0",
                  "text-gray-500 group-hover:text-gray-400"
                )} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blueprint annotations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loadingPhase >= 3 ? 1 : 0 }}
          transition={{ delay: 3 }}
          className="mt-12 text-center"
        >
          <BlueprintAnnotation variant="technical" className="inline-block">
            system status: operational
          </BlueprintAnnotation>
        </motion.div>
      </Container>
    </div>
  );
}
