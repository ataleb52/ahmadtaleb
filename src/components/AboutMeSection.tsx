import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cog, Rocket, Zap, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AboutMeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    return () => { if (section) observer.unobserve(section); };
  }, []);

  const approaches = [
    {
      title: "The Outside Perspective",
      icon: <Share2 size={24} className="text-yellow-300" />,
      description: "I work at the edges of organizations, where I can see the whole picture without getting tangled in internal politics. This unique position lets me solve problems others can't see.",
      detail: "Traditional consultants plug directly into your org chart. I orbit around it, pulling strings and connecting dots from the outside. This means faster results without the bureaucratic overhead."
    },
    {
      title: "The System Hacker",
      icon: <Cog size={24} className="text-yellow-300" />,
      description: "I don't break rules - I find the gaps in them. By understanding system boundaries, I create solutions that work within constraints while thinking beyond them.",
      detail: "Whether it's streamlining a process or reimagining a product, I find legitimate ways to bypass the 'that's how we've always done it' mentality."
    },
    {
      title: "The Fast Mover",
      icon: <Rocket size={24} className="text-yellow-300" />,
      description: "I believe in making mistakes quickly and cleaning them up even quicker. While others are planning their first move, I'm learning from my third attempt.",
      detail: "My approach isn't reckless - it's deliberately rapid. I create quick prototypes, gather real feedback, and iterate fast. This means you get working solutions, not just presentations."
    },
    {
      title: "The Connection Maker",
      icon: <Zap size={24} className="text-yellow-300" />,
      description: "I see patterns others miss and connect people who should be talking. My ADHD isn't a bug - it's a feature that lets me spot unlikely solutions.",
      detail: "By staying on the outside, I can freely connect different parts of your organization without getting caught in hierarchical constraints."
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[url('/images/blueprint-grid.svg')] opacity-5" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="bg-gray-900/80 border border-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-yellow-300 text-sm font-mono">MANIFESTO.txt</span>
            <span className="text-gray-500 text-xs">[LIVE]</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            I'm not your typical consultant or agency. I'm the person they call when the usual solutions aren't working.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Instead of getting bogged down in organizational charts, I work at the edges - finding creative ways to empower your people and fix your problems without getting tangled in red tape.
          </p>
          <div className="border-l-2 border-yellow-300/30 pl-4 mt-6">
            <p className="text-yellow-300 text-sm italic">
              "I don't need 6 weeks to 'scope' a strategy deck. I work fast, ask the hard questions, and build solutions that make the noise go away."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              className={cn(
                "group bg-gray-900/80 border border-gray-800 rounded-lg p-5 shadow-lg cursor-pointer transition-all",
                activeCard === index ? "border-yellow-300/30" : "hover:border-gray-700"
              )}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                {approach.icon}
                <h3 className="text-gray-200 font-medium">{approach.title}</h3>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                {approach.description}
              </p>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeCard === index ? "auto" : 0,
                  opacity: activeCard === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-gray-800">
                  <p className="text-gray-300 text-sm">
                    {approach.detail}
                  </p>
                </div>
              </motion.div>

              <div className="mt-4 flex justify-end">
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  {activeCard === index ? "Click to collapse" : "Click to learn more"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}