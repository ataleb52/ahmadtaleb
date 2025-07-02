import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle, X, PenTool, Wrench } from 'lucide-react';
import MobileSolutionCard from './MobileSolutionCard';
import { cn } from '@/lib/utils';
import { statusConfig } from '@/constants/statusConfig';
import type { Solution } from '@/types/solution';

interface MobileViewProps {
  blueprintSolutions: Solution[];
  workbenchSolutions: Solution[];
  showcaseSolutions: Solution[];
  allTags: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterTag: string | null;
  setFilterTag: (t: string | null) => void;
  onSelectSolution: (sol: Solution) => void;
}

export default function MobileView({ blueprintSolutions, workbenchSolutions, showcaseSolutions, allTags, searchQuery, setSearchQuery, filterTag, setFilterTag, onSelectSolution }: MobileViewProps) {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'workbench'>('workbench');
  const [showSearch, setShowSearch] = useState(false);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);

  let currentSolutionsToDisplay: Solution[] = [];
  if (activeTab === 'blueprint') currentSolutionsToDisplay = blueprintSolutions;
  else if (activeTab === 'workbench') currentSolutionsToDisplay = workbenchSolutions;
  if (filterTag) currentSolutionsToDisplay = currentSolutionsToDisplay.filter(s => s.tags.includes(filterTag));
  if (searchQuery) currentSolutionsToDisplay = currentSolutionsToDisplay.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()));

  let filteredShowcaseSolutions = showcaseSolutions;
  if (filterTag) filteredShowcaseSolutions = filteredShowcaseSolutions.filter(s => s.tags.includes(filterTag));
  if (searchQuery) filteredShowcaseSolutions = filteredShowcaseSolutions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-2 bg-gray-900 text-gray-100 flex flex-col h-full font-mono text-sm">
      <div className="flex justify-between items-center p-2 mb-2">
        <h2 className="text-lg font-semibold">Solution Workshop</h2>
        <div className="flex gap-2">
          <button onClick={() => setShowSearch(!showSearch)} className="p-1.5 rounded-md hover:bg-gray-700">
            {showSearch ? <X size={18} /> : <Search size={18} />}
          </button>
          <button onClick={() => setShowTagFilter(!showTagFilter)} className="p-1.5 rounded-md hover:bg-gray-700">
            {showTagFilter ? <X size={18} /> : <Filter size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showSearch && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-2 px-1">
            <input type="text" placeholder="Search all solutions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full p-2 text-xs rounded-md bg-gray-800 border border-gray-700 focus:ring-1 focus:ring-blueprint focus:border-blueprint" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showTagFilter && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-3 p-2 bg-gray-800 rounded-md mx-1">
            <h3 className="text-xs font-semibold mb-1.5 text-gray-400">Filter by Tag:</h3>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setFilterTag(null)} className={cn('px-2 py-1 text-xs rounded-full', !filterTag ? 'bg-blueprint text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300')}>All Tags</button>
              {allTags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(tag)} className={cn('px-2 py-1 text-xs rounded-full', filterTag === tag ? 'bg-blueprint text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300')}>{tag}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex border-b border-gray-700 mb-1">
        {[{ id: 'blueprint', label: 'Blueprint', count: blueprintSolutions.length, color: 'amber', icon: <PenTool size={16}/> }, { id: 'workbench', label: 'Workbench', count: workbenchSolutions.length, color: 'blueprint', icon: <Wrench size={16}/> }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as 'blueprint' | 'workbench')} className={`flex-1 py-2.5 px-1 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${activeTab === tab.id ? `border-b-2 ${tab.id === 'blueprint' ? 'border-amber-500 text-amber-400' : 'border-blueprint text-blueprint'}` : 'text-gray-500 hover:text-gray-300 border-b-2 border-transparent'}`}>{tab.icon} {tab.label} ({tab.id === 'blueprint' ? blueprintSolutions.filter(s => !filterTag || s.tags.includes(filterTag)).filter(s => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())).length : workbenchSolutions.filter(s => !filterTag || s.tags.includes(filterTag)).filter(s => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())).length})</button>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto space-y-2 p-1 mb-3">
        <AnimatePresence>
          {currentSolutionsToDisplay.length > 0 ? (
            currentSolutionsToDisplay.map(solution => (
              <MobileSolutionCard key={solution.id} solution={solution} onClick={() => onSelectSolution(solution)} />
            ))
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 py-6 text-xs">No solutions match your criteria.</motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="border-t border-gray-700 pt-2">
        <button onClick={() => setShowShowcase(!showShowcase)} className="w-full flex items-center justify-between py-2 px-1 text-emerald-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle size={16}/>
            <span className="font-semibold text-sm">Showcase - Portfolio History ({filteredShowcaseSolutions.length})</span>
          </div>
          <span className="text-gray-400">{showShowcase ? '↑' : '↓'}</span>
        </button>
        <AnimatePresence>
          {showShowcase && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-2 p-1">
              {filteredShowcaseSolutions.length > 0 ? (
                filteredShowcaseSolutions.map(solution => (
                  <MobileSolutionCard key={solution.id} solution={solution} onClick={() => onSelectSolution(solution)} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-3 text-xs">No showcase solutions match your criteria.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
