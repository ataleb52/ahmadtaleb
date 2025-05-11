import React, { useState, useEffect } from 'react';

type CanvasControlsProps = {
  onCategoryFilter: (category: string | null) => void;
  selectedCategory: string | null;
  onToggleExpand: () => void;
  isExpanded: boolean;
  onMeasure: () => void;
  onZoomPreset: (preset: string) => void;
  activeTool: string | null;
};

export function CanvasControls({
  onCategoryFilter,
  selectedCategory,
  onToggleExpand,
  isExpanded,
  onMeasure,
  onZoomPreset,
  activeTool
}: CanvasControlsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'filter' | 'view'>('filter');
  
  // Detect screen size to adjust the UI
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Auto-collapse controls on mobile devices on initial load
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);
  
  const handleTabSwitch = (tab: 'filter' | 'view') => {
    setActiveTab(tab);
  };
  
  return (
    <div className={`canvas-controls-floating ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
      {!isCollapsed ? (
        <>
          <div className="controls-header">
            <h3>System Map Controls</h3>
            <button 
              className="collapse-btn"
              onClick={() => setIsCollapsed(true)}
              title="Collapse controls"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            </button>
          </div>
          
          {isMobile && (
            <div className="tabs-container">
              <button 
                className={`tab-btn ${activeTab === 'filter' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('filter')}
              >
                Filter
              </button>
              <button 
                className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('view')}
              >
                View
              </button>
            </div>
          )}
          
          <div className={`controls-section ${isMobile && activeTab !== 'filter' ? 'hidden' : ''}`}>
            <h4>Filter By</h4>
            <div className="filter-buttons">
              <button 
                onClick={() => onCategoryFilter(null)}
                className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
              >
                All
              </button>
              {['foundations', 'components', 'patterns', 'tech-stack'].map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryFilter(category)}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className={`controls-section ${isMobile && activeTab !== 'view' ? 'hidden' : ''}`}>
            <h4>View Controls</h4>
            <div className="tool-buttons">
              <button 
                className={`tool-btn ${isExpanded ? 'active' : ''}`}
                onClick={onToggleExpand}
                title={isExpanded ? "Collapse components" : "Explode components"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isExpanded ? (
                    <>
                      <path d="M4 14h6v6M4 10h16M14 4h6v6" />
                    </>
                  ) : (
                    <>
                      <path d="m12 3-4 4h3v14h2V7h3Z" />
                      <path d="m2 17 4 4v-3h11v-2H6v-3Z" />
                    </>
                  )}
                </svg>
                <span>{isExpanded ? 'Collapse' : 'Explode'}</span>
              </button>
              
              <button 
                className={`tool-btn ${activeTool === 'measure' ? 'active' : ''}`}
                onClick={onMeasure}
                title="Measure distances"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12H2" />
                  <path d="M4 12v2" />
                  <path d="M8 12v2" />
                  <path d="M12 12v2" />
                  <path d="M16 12v2" />
                  <path d="M20 12v2" />
                  <path d="M2 16h8v2c0 1.1.9 2 2 2s2-.9 2-2v-2h8" />
                </svg>
                <span>Measure</span>
              </button>
              
              <button 
                className={`tool-btn ${activeTool === 'fit' ? 'active' : ''}`}
                onClick={() => onZoomPreset('fit')}
                title="Fit view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z" />
                  <path d="m21 15-5-5" />
                  <path d="M16 15h5v-5" />
                  <path d="m3 9 5 5" />
                  <path d="M8 9H3v5" />
                </svg>
                <span>Fit View</span>
              </button>
              
              <button 
                className={`tool-btn ${activeTool === 'detail' ? 'active' : ''}`}
                onClick={() => onZoomPreset('detail')}
                title="Detail view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  <path d="M11 8v6" />
                  <path d="M8 11h6" />
                </svg>
                <span>Detail</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <button 
          className="expand-btn"
          onClick={() => setIsCollapsed(false)}
          title="Expand controls"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m18 9-6 6-6-6"/>
          </svg>
          <span className="sr-only">Expand Controls</span>
        </button>
      )}
    </div>
  );
}
