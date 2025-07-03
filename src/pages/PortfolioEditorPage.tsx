import { useState, useEffect } from 'react'; // Removed React import
import { SolutionWorkshop } from '@/components/KanbanPortfolio';
import initialPortfolioItems from '../data/portfolio-items.json'; // Renamed import for clarity
import type { Solution } from '@/types/solution';

export default function PortfolioEditorPage() {
  console.log('[PortfolioEditorPage] initialPortfolioItems:', initialPortfolioItems);
  const [solutions, setSolutions] = useState<Solution[]>(() => {
    // Initialize state with a deep copy to prevent accidental mutations of the import
    return JSON.parse(JSON.stringify(initialPortfolioItems)) as Solution[];
  });
  console.log('[PortfolioEditorPage] solutions state:', solutions);
  const [updatedJson, setUpdatedJson] = useState('');

  // Effect to update JSON string whenever solutions change
  useEffect(() => {
    setUpdatedJson(JSON.stringify(solutions, null, 2));
  }, [solutions]);

  const handleAddSolution = () => {
    const newSolution: Solution = {
      id: `solution-${Date.now()}`,
      title: 'New Untitled Solution',
      description: 'Enter a compelling description here. What problem does this solve? What is the core idea?',
      impact: 'Describe the potential or actual impact of this solution. Quantify if possible.',
      status: 'blueprint',
      progress: 0,
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      tags: ['newly-added'],
      thumbnailUrl: 'https://via.placeholder.com/300x200.png?text=New+Solution', // Placeholder image
      previewDescription: 'A brief preview of this new solution.',
      // detailComponentId: 'GenericDetailView', // Optional: default to generic or leave undefined
      // relatedSolutions: [], // Optional
      // link: '' // Optional
    };
    setSolutions(prevSolutions => [newSolution, ...prevSolutions]); // Add to the beginning of the list
  };

  // Placeholder for update and delete handlers
  const handleUpdateSolution = (updatedSolution: Solution) => {
    setSolutions(prevSolutions => 
      prevSolutions.map(s => s.id === updatedSolution.id ? updatedSolution : s)
    );
  };

  const handleDeleteSolution = (solutionId: string) => {
    setSolutions(prevSolutions => prevSolutions.filter(s => s.id !== solutionId));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(updatedJson)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-2 flex flex-col">
      <header className="text-center mb-4 px-4 pt-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Portfolio Content Editor
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your Kanban portfolio items. Changes are reflected locally.
        </p>
      </header>
      
      <div className="px-2 sm:px-4 lg:px-6 flex-grow">
        <SolutionWorkshop 
          solutions={solutions} 
          onAddSolution={handleAddSolution} 
          onUpdateSolution={handleUpdateSolution} // Pass handlers
          onDeleteSolution={handleDeleteSolution} // Pass handlers
        />
      </div>

      <footer className="p-4 mt-auto bg-gray-900/50 border-t border-gray-800">
        <h3 className="text-lg font-semibold mb-2 text-gray-300">Save Changes</h3>
        <p className="text-xs text-gray-500 mb-2">
          To persist your changes, copy the JSON data below and manually replace the content of 
          <code>src/data/portfolio-items.json</code>.
        </p>
        <textarea 
          value={updatedJson} 
          readOnly 
          rows={8} 
          className="w-full p-2 text-xs bg-gray-800 border border-gray-700 rounded-md text-gray-300 font-mono"
        />
        <button 
          onClick={copyToClipboard}
          className="mt-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white"
        >
          Copy JSON to Clipboard
        </button>
      </footer>
    </div>
  );
}
