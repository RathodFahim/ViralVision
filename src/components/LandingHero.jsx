import React, { useState } from 'react';

export default function LandingHero({ onAnalyze }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) onAnalyze(url);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden bg-mesh">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary-container/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Live Performance Engine v2.4</span>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-tight mb-6">
          Instagram Reel Analytics, <span className="bg-gradient-to-r from-primary-container via-secondary to-tertiary-container bg-clip-text text-transparent">Reimagined</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
          The most powerful way to understand your video performance. Depth-first insights for creators who care about impact, not just views.
        </p>
        
        {/* Prominent Input Container */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="glow-input group relative flex items-center p-2 rounded-2xl bg-surface-container-low/50 backdrop-blur-xl border border-white/10 transition-all duration-500">
            <div className="flex-shrink-0 pl-4 text-on-surface-variant group-focus-within:text-primary-container transition-colors">
              <span className="material-symbols-outlined">link</span>
            </div>
            <input 
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 py-4 px-4 font-body text-lg outline-none" 
              placeholder="Paste Instagram Reel URL..." 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit" className="flex-shrink-0 group relative overflow-hidden bg-gradient-to-r from-primary-container to-secondary-container hover:scale-[1.02] active:scale-95 transition-all duration-300 px-8 py-4 rounded-xl font-headline font-bold text-on-primary-container shadow-lg shadow-primary-container/20">
              <span className="relative z-10 flex items-center gap-2">
                Analyze
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </button>
          </form>
          
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-on-surface-variant/60 font-label text-xs tracking-widest uppercase font-bold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified</span>
              Real-time Data
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">auto_graph</span>
              AI Sentiment
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">group</span>
              Audience Retention
            </div>
          </div>
        </div>
      </section>
      
      {/* Bento Grid Preview (Faded Empty State) */}
      <section className="w-full max-w-6xl px-6 mt-24 relative">
        <div className="grid grid-cols-12 gap-6 opacity-20 pointer-events-none scale-95 blur-[2px]">
          {/* Stats Bento Item */}
          <div className="col-span-12 md:col-span-4 p-8 rounded-3xl bg-surface-container border border-white/5">
            <div className="h-4 w-24 bg-white/10 rounded mb-4"></div>
            <div className="h-12 w-full bg-white/10 rounded mb-2"></div>
            <div className="h-4 w-16 bg-white/10 rounded"></div>
          </div>
          {/* Graph Bento Item */}
          <div className="col-span-12 md:col-span-8 p-8 rounded-3xl bg-surface-container border border-white/5">
            <div className="flex justify-between mb-8">
              <div className="h-6 w-32 bg-white/10 rounded"></div>
              <div className="h-6 w-16 bg-white/10 rounded"></div>
            </div>
            <div className="h-40 w-full bg-white/5 rounded-xl border border-dashed border-white/10"></div>
          </div>
          {/* Retention Bento Item */}
          <div className="col-span-12 md:col-span-6 p-8 rounded-3xl bg-surface-container border border-white/5">
            <div className="h-40 w-full bg-white/10 rounded"></div>
          </div>
          {/* Geographic Bento Item */}
          <div className="col-span-12 md:col-span-6 p-8 rounded-3xl bg-surface-container border border-white/5">
            <div className="h-40 w-full bg-white/10 rounded"></div>
          </div>
        </div>
        
        {/* Empty State Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="p-4 rounded-full bg-surface-container-high/50 backdrop-blur-md border border-white/10 mb-4 shadow-2xl">
            <span className="material-symbols-outlined text-primary-container text-4xl">query_stats</span>
          </div>
          <h3 className="font-headline text-xl font-bold text-on-surface mb-2">Ready to explore?</h3>
          <p className="font-body text-sm text-on-surface-variant">Enter a link above to populate your dashboard.</p>
        </div>
      </section>
    </main>
  );
}