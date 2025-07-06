// BoardColumn with cardType and widthClass for custom layouts
function BoardColumn(props) {
  const { 
    title, 
    subtitle, 
    color, 
    count, 
    solutions, 
    onCardClick, 
    onEdit, 
    onDelete, 
    editable, 
    onAddSolution, 
    cardType = 'medium', 
    widthClass = '', 
    maxCards 
  } = props;
  
  // Color classes for column accent
  const colorMap = {
    amber: 'bg-amber-400',
    blueprint: 'bg-blue-500',
    emerald: 'bg-emerald-400',
  };
  
  const borderColorMap = {
    amber: 'border-amber-300',
    blueprint: 'border-blue-300',
    emerald: 'border-emerald-300',
  };
  
  // Limit cards if maxCards is set
  const visibleSolutions = typeof maxCards === 'number' ? solutions.slice(0, maxCards) : solutions;
  
  return (
    <div className={`flex flex-col ${widthClass || 'w-80 min-w-[320px] max-w-[340px]'} bg-white rounded-xl shadow-md border-t-4 ${colorMap[color]} ${borderColorMap[color]} border p-0`}>
      <div className="flex flex-col gap-0.5 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${colorMap[color]}`}></span>
          <span className="font-semibold text-gray-800 text-base">{title}</span>
          <span className="text-xs text-gray-400">({count})</span>
        </div>
        {subtitle && <span className="text-xs text-gray-400 ml-5 -mt-1">{subtitle}</span>}
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        {visibleSolutions.map(s => (
          <TrelloCard
            key={s.id}
            solution={s}
            onClick={() => onCardClick(s)}
            onEdit={onEdit ? () => onEdit(s) : undefined}
            onDelete={onDelete ? () => onDelete(s.id) : undefined}
            editable={editable}
            cardType={cardType}
          />
        ))}
        {/* If maxCards is set and there are more, show a subtle fade or warning */}
        {typeof maxCards === 'number' && solutions.length > maxCards && (
          <div className="text-xs text-gray-400 text-center mt-2">Only showing the first {maxCards} items</div>
        )}
      </div>
      {onAddSolution && (
        <button
          onClick={onAddSolution}
          className="mx-3 mb-3 mt-1 px-3 py-2 w-auto bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm border border-amber-200"
        >
          + Add new idea
        </button>
      )}
    </div>
  );
}
