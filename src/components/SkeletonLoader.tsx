/**
 * Skeleton Loading Components
 * Various skeleton loaders for different content types
 */

import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export const SkeletonText = ({ lines = 3, className = "" }: { lines?: number; className?: string }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded animate-pulse ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
};

export const SkeletonButton = () => {
  return (
    <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-32"></div>
  );
};

export const SkeletonHero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title Skeleton */}
        <div className="space-y-4">
          <div className="h-16 bg-gray-200 rounded-lg animate-pulse w-3/4 mx-auto"></div>
          <div className="h-16 bg-gray-200 rounded-lg animate-pulse w-2/3 mx-auto"></div>
        </div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 max-w-4xl mx-auto">
          <SkeletonText lines={3} />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex gap-4 justify-center">
          <SkeletonButton />
          <SkeletonButton />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mx-auto mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkeletonPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SkeletonHero />
      
      {/* Section Skeletons */}
      <div className="container mx-auto py-20 px-6 space-y-20">
        {Array.from({ length: 3 }).map((_, sectionIdx) => (
          <div key={sectionIdx} className="space-y-8">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, cardIdx) => (
                <SkeletonCard key={cardIdx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonPage;


