import { motion } from "framer-motion";

export function BioDisplay() {
  const bioContent = [
    {
      command: "cat /etc/origin_story",
      output: `I’m a Tucson native, product of the ’90s — a Blink-182-listening, Gameboy-wielding kid who spent his childhood climbing trees, running around playgrounds, and staying out until the streetlights came on.`
    },
    {
      command: "cat /etc/early_lessons",
      output: `I grew up in a small business family. Washed vans. Peeled potatoes. Helped customers. Loaded trucks. You get it.`
    },
    {
      command: "cat /etc/core_function",
      output: `These days, I solve problems for a living.
Sometimes with software. Sometimes with strategy.
Always with initiative, craftsmanship — and above all, integrity.`
    },
    {
      command: "cat /etc/applied_knowledge",
      output: `I’ve spent years in tech learning how systems grow, break, and compound — and how to apply those lessons in places they’re usually ignored. Whether it’s a scrappy business or a complex team, I help build the kind of solutions that hold up over time.`
    },
    {
      command: "echo $MOTTO",
      output: `My personal motto? “I’ll figure it out.”
I’ve got a knack for jumping into the deep end and learning how to swim — fast.`
    },
    {
      command: "ls /strengths",
      output: `The three things I do best:
	1.	Listen.
	2.	Understand the problem — and the people experiencing it.
	3.	Build solutions that give people and businesses control of their experience.`
    },
    {
      command: "cat /etc/guiding_principle",
      output: `I believe the best solutions leave people better off — not just with something that works, but with something they own.`
    }
  ];

  return (
    <div className="font-mono text-sm overflow-y-auto max-h-[60vh] px-6 pb-8">
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
