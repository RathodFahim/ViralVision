import React from 'react';

export default function AnalyzingState() {
  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      {/* Ambient Bloom Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-container/5 blur-[100px] rounded-full -z-10"></div>
      
      {/* Loading Overlay Status */}
      <div className="mb-12 flex flex-col items-center justify-center text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary-container/20 blur-2xl rounded-full"></div>
          <div className="relative w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-primary-container text-3xl animate-spin">data_exploration</span>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold text-on-surface tracking-tight">Analyzing Reel Data...</h1>
          <p className="text-on-surface-variant font-medium">Fetching engagement metrics and audience sentiment</p>
        </div>
        
        {/* Professional Progress Bar */}
        <div className="w-full max-w-md bg-surface-container-lowest h-1.5 rounded-full overflow-hidden border border-white/5 shadow-inner">
          <div className="bg-gradient-to-r from-primary-container to-secondary-container h-full rounded-full animate-progress shadow-[0_0_15px_rgba(0,240,255,0.4)]"></div>
        </div>
      </div>
      
      {/* Skeleton Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Creator Profile Skeleton */}
        <div className="md:col-span-4 bg-surface-container-low/50 backdrop-blur-xl rounded-xl p-6 border border-white/5 flex items-center gap-6 animate-pulse-subtle">
          <div className="w-24 h-24 rounded-full bg-surface-container-highest/40 flex-shrink-0 border border-white/10"></div>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-surface-container-highest/40 rounded-lg w-1/4"></div>
            <div className="h-4 bg-surface-container-highest/40 rounded-lg w-1/3"></div>
            <div className="flex gap-4">
              <div className="h-10 bg-surface-container-highest/40 rounded-lg w-24"></div>
              <div className="h-10 bg-surface-container-highest/40 rounded-lg w-24"></div>
            </div>
          </div>
        </div>
        
        {/* Metric Skeletons */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-container-low/50 backdrop-blur-xl rounded-xl p-6 border border-white/5 space-y-4 animate-pulse-subtle" style={{ animationDelay: `${0.1 * (i+1)}s` }}>
            <div className="h-4 bg-surface-container-highest/30 rounded w-1/2"></div>
            <div className="h-10 bg-surface-container-highest/60 rounded w-3/4"></div>
            <div className="h-16 bg-surface-container-highest/20 rounded w-full"></div>
          </div>
        ))}
        
        {/* Large Data Visualization Skeleton */}
        <div className="md:col-span-3 h-[400px] bg-surface-container-low/50 backdrop-blur-xl rounded-xl p-8 border border-white/5 animate-pulse-subtle" style={{ animationDelay: '0.5s' }}>
          <div className="flex justify-between items-center mb-12">
            <div className="h-6 bg-surface-container-highest/40 rounded w-1/4"></div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-surface-container-highest/30 rounded"></div>
              <div className="h-8 w-16 bg-surface-container-highest/30 rounded"></div>
            </div>
          </div>
          <div className="relative h-full w-full">
            <div className="absolute bottom-12 left-0 right-0 h-px bg-white/5"></div>
            <div className="absolute bottom-24 left-0 right-0 h-px bg-white/5"></div>
            <div className="absolute bottom-36 left-0 right-0 h-px bg-white/5"></div>
            <div className="flex items-end justify-between h-48 mt-12 gap-4">
              <div className="bg-surface-container-highest/20 w-full h-1/2 rounded-t-sm"></div>
              <div className="bg-surface-container-highest/20 w-full h-3/4 rounded-t-sm"></div>
              <div className="bg-surface-container-highest/20 w-full h-1/3 rounded-t-sm"></div>
              <div className="bg-surface-container-highest/20 w-full h-2/3 rounded-t-sm"></div>
              <div className="bg-surface-container-highest/20 w-full h-full rounded-t-sm"></div>
              <div className="bg-surface-container-highest/20 w-full h-1/2 rounded-t-sm"></div>
              <div className="bg-surface-container-highest/20 w-full h-3/4 rounded-t-sm"></div>
              <div className="bg-surface-container-highest/20 w-full h-2/3 rounded-t-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Side Card Skeleton */}
        <div className="md:col-span-1 h-[400px] bg-surface-container-low/50 backdrop-blur-xl rounded-xl p-6 border border-white/5 flex flex-col animate-pulse-subtle" style={{ animationDelay: '0.6s' }}>
          <div className="h-6 bg-surface-container-highest/40 rounded w-1/2 mb-6"></div>
          <div className="space-y-6 flex-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest/30"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 bg-surface-container-highest/40 rounded w-3/4"></div>
                  <div className="h-2 bg-surface-container-highest/20 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-10 bg-surface-container-highest/30 rounded-lg w-full mt-auto"></div>
        </div>
      </div>
    </main>
  );
}