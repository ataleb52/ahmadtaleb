import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blueprint"></div>
    </div>
  );
}

export default LoadingSpinner;
