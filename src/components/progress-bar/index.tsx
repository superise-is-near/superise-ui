import React from 'react';

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return <div className="bg-black bg-opacity-20">
    <div className="bg-indigo-600" style={{ width: `${percentage}%`, height: '2px' }} />
    </div>
}

export default ProgressBar;
