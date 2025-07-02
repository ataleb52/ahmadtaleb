import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Solution } from '@/types/solution';

export function useSolutionWorkshop({
  solutions = [],
  onAddSolution,
  onUpdateSolution,
  onDeleteSolution
}: {
  solutions?: Solution[];
  onAddSolution?: () => void;
  onUpdateSolution?: (sol: Solution) => void;
  onDeleteSolution?: (id: string) => void;
}) {
  const [solutionsData, setSolutionsData] = useState<Solution[]>(solutions);
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [activeArea, setActiveArea] = useState<'blueprint' | 'workbench' | 'showcase' | null>(null);
  const [viewMode, setViewMode] = useState<'workshop' | 'list'>('workshop');

  useEffect(() => {
    setSolutionsData(solutions);
  }, [solutions]);

  const filteredSolutions = useMemo(() => {
    return solutionsData.filter(sol => {
      const matchesQuery = sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sol.description && sol.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = !filterTag || sol.tags.includes(filterTag);
      const matchesArea = !activeArea || sol.status === activeArea;
      return matchesQuery && matchesTag && matchesArea;
    });
  }, [solutionsData, searchQuery, filterTag, activeArea]);

  const blueprintSolutions = useMemo(() => filteredSolutions.filter(s => s.status === 'blueprint'), [filteredSolutions]);
  const workbenchSolutions = useMemo(() => filteredSolutions.filter(s => s.status === 'workbench'), [filteredSolutions]);
  const showcaseSolutions = useMemo(() => filteredSolutions.filter(s => s.status === 'showcase'), [filteredSolutions]);
  const allTags = useMemo(() => Array.from(new Set(solutionsData.flatMap(s => s.tags))), [solutionsData]);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'workshop' ? 'list' : 'workshop');
  }, []);

  const onSelectSolution = useCallback((sol: Solution) => {
    setActiveSolution(sol);
  }, []);

  const onEditSolution = useCallback((sol: Solution) => {
    setEditingSolution(sol);
    setActiveSolution(sol);
  }, []);

  const onDelete = useCallback((id: string) => {
    onDeleteSolution?.(id);
    setSolutionsData(prev => prev.filter(s => s.id !== id));
    if (activeSolution?.id === id) setActiveSolution(null);
    if (editingSolution?.id === id) setEditingSolution(null);
  }, [onDeleteSolution, activeSolution, editingSolution]);

  const onSaveEdit = useCallback((updated: Solution) => {
    onUpdateSolution?.(updated);
    setSolutionsData(prev => prev.map(s => s.id === updated.id ? updated : s));
    setEditingSolution(null);
    setActiveSolution(null);
  }, [onUpdateSolution]);

  // Get related solutions for modal
  const getRelatedSolutions = useCallback((solutionId: string) => {
    const current = solutionsData.find(s => s.id === solutionId);
    if (!current || !current.relatedSolutions) return [];
    return solutionsData.filter(s => current.relatedSolutions!.includes(s.id));
  }, [solutionsData]);

  return {
    solutions: solutionsData,
    filteredSolutions,
    blueprintSolutions,
    workbenchSolutions,
    showcaseSolutions,
    allTags,
    searchQuery,
    setSearchQuery,
    filterTag,
    setFilterTag,
    viewMode,
    toggleViewMode,
    activeArea,
    setActiveArea,
    activeSolution,
    setActiveSolution,
    editingSolution,
    setEditingSolution,
    onAddSolution,
    onSelectSolution,
    onEditSolution,
    onDeleteSolution: onDelete,
    onSaveEdit,
    getRelatedSolutions,
  };
}
