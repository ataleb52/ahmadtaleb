import React from 'react';
import { useSolutionWorkshop } from './hooks/useSolutionWorkshop';
import { useMouseGradient } from './hooks/useMouseGradient';
import FilterBar from './FilterBar';
import BoardView from './BoardView';
import ListView from './ListView';
import MobileView from './MobileView';
import SolutionDetail from './SolutionDetail';
import type { Solution } from '@/types/solution';

export interface SolutionWorkshopProps {
  solutions?: Solution[];
  onAddSolution?: () => void;
  onUpdateSolution?: (solution: Solution) => void;
  onDeleteSolution?: (id: string) => void;
}

export function SolutionWorkshop(props: SolutionWorkshopProps) {
  const {
    solutions,
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
    onEditSolution,
    onDeleteSolution,
    onSaveEdit,
    getRelatedSolutions,
  } = useSolutionWorkshop(props);
  const { workshopRef, gradientStyle, isMobile } = useMouseGradient();

  // Debug logging
  console.log('[SolutionWorkshop] solutions prop:', props.solutions);
  console.log('[SolutionWorkshop] filteredSolutions:', filteredSolutions);
  console.log('[SolutionWorkshop] blueprintSolutions:', blueprintSolutions);
  console.log('[SolutionWorkshop] workbenchSolutions:', workbenchSolutions);
  console.log('[SolutionWorkshop] showcaseSolutions:', showcaseSolutions);

  if (isMobile) {
    return (
      <MobileView
        blueprintSolutions={blueprintSolutions}
        workbenchSolutions={workbenchSolutions}
        showcaseSolutions={showcaseSolutions}
        allTags={allTags}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        onSelectSolution={setActiveSolution}
      />
    );
  }

  return (
    <div ref={workshopRef} style={{ background: String(gradientStyle) }}>
      <FilterBar
        totalCount={solutions.length}
        blueprintCount={blueprintSolutions.length}
        workbenchCount={workbenchSolutions.length}
        showcaseCount={showcaseSolutions.length}
        activeArea={activeArea}
        setActiveArea={setActiveArea}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
        onAddSolution={onAddSolution}
      />
      {viewMode === 'workshop' ? (
        <BoardView
          blueprintSolutions={blueprintSolutions}
          workbenchSolutions={workbenchSolutions}
          showcaseSolutions={showcaseSolutions}
          onSelect={setActiveSolution}
          onEdit={onEditSolution}
          onDelete={onDeleteSolution}
        />
      ) : (
        <ListView
          solutions={filteredSolutions}
          onSelect={setActiveSolution}
          onEdit={onEditSolution}
          onDelete={onDeleteSolution}
        />
      )}
      {(editingSolution || activeSolution) && (editingSolution || activeSolution)?.id && (
        <SolutionDetail
          solution={editingSolution || activeSolution as any}
          isEditing={!!editingSolution}
          relatedSolutions={getRelatedSolutions((editingSolution || activeSolution)!.id)}
          onClose={() => { setActiveSolution(null); setEditingSolution(null); }}
          onSave={onSaveEdit}
          onSelectRelated={setActiveSolution}
          onDelete={onDeleteSolution}
        />
      )}
    </div>
  );
}

export const SolutionBlueprint = SolutionWorkshop;
