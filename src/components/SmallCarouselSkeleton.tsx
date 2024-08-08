import React from 'react';

const SmallCarouselSkeleton = () => {
  return (
    <div className="w-full h-[50px] bg-gray-200 rounded-md flex items-center justify-between p-4">
      <div className="w-1/5 h-full bg-gray-300 rounded-md animate-pulse mr-2"></div>
      <div className="w-1/5 h-full bg-gray-300 rounded-md animate-pulse mx-2"></div>
      <div className="w-1/5 h-full bg-gray-300 rounded-md animate-pulse mx-2"></div>
      <div className="w-1/5 h-full bg-gray-300 rounded-md animate-pulse mx-2"></div>
      <div className="w-1/5 h-full bg-gray-300 rounded-md animate-pulse ml-2"></div>
    </div>
  );
};

export default SmallCarouselSkeleton;