import { motion } from "framer-motion";

export function BioDisplay() {
  const bioContent = [
    {
      command: "whoami",
      output: "Ahmad Taleb - Product Manager & Developer"
    },
    {
      command: "cat experience.txt",
      output: "10+ years in product strategy and development\nSpecialized in building scalable solutions and developer tools"
    },
    {
      command: "ls ./skills",
      output: "product-strategy.md\nuser-experience.yml\ntech-architecture.ts\nstartup-scaling.sh"
    },
    {
      command: "cat approach.md",
      output: "I combine technical expertise with strategic thinking to build products that solve real problems. My approach is systematic, data-driven, and always focused on delivering value."
    }
  ];

  return (
    <div className="p-4 font-mono text-sm overflow-y-auto max-h-[60vh]">
      {bioContent.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center text-green-400 mb-2">
            <span className="mr-2">$</span>
            <span>{item.command}</span>
          </div>
          <div className="text-gray-300 ml-4 whitespace-pre-line">
            {item.output}
          </div>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: bioContent.length * 0.2 }}
        className="flex items-center text-green-400"
      >
        <span className="mr-2">$</span>
        <span className="animate-pulse">_</span>
      </motion.div>
    </div>
  );
}
