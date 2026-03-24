import React from 'react';

export default function ResultsDashboard({ data }) {
  if (!data) return null;

  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">
      {/* Top Section: Creator & Main Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Creator Card (Left) */}
        <div className="lg:col-span-4 bg-surface-container-low p-8 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-container to-secondary-container rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative h-24 w-24 rounded-full p-1 bg-surface-container-low">
              <img alt="Creator Profile" className="h-full w-full object-cover rounded-full" src={data.creator.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuCDLLs_PEy0IUk76bAhxAFtPHo4uOF3jSMkG67FomizCJ3C8eFENVSkDfT54lXZI6Oy-IxdSHmTRlrl3LN_ZtqynA7O-cDk3MCrhCLNj5AysBPdJRPZKsnjqwFS_r8xHdwbJc9T9Z_2DGWyyPPToESNl9ais9HPxXh2JzoRKsqnkRI6AS46CUhH4E2t-LZc8K7n1ts7DVW_q95l_9losBCYtBNYObpWYQRWXlYIwfcaMh4c85VELhiH_2op8gbpLvU0Ax8dznEsBo00"} />
            </div>
          </div>
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface">{data.creator.username}</h2>
            <p className="font-label text-xs uppercase tracking-[0.15em] text-on-surface-variant mt-1">{data.creator.followers} Followers</p>
          </div>
          <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-primary-container font-semibold rounded-lg border border-primary-container/20 transition-all flex items-center justify-center gap-2" onClick={() => window.open(data.creator.profileUrl, '_blank')}>
            <span>View Profile</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
        </div>
        
        {/* Main Metrics Card (Right) */}
        <div className="lg:col-span-8 bg-surface-container p-8 rounded-xl border border-white/5 relative overflow-hidden glow-cyan group">
          <div className="absolute top-0 right-0 p-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary-container/10 border border-primary-container/20 rounded-full">
              <span className="pulse-dot h-2 w-2 rounded-full bg-primary-container"></span>
              <span className="text-xs font-bold text-primary-container tracking-wider uppercase">Trending</span>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">Total Plays</span>
              <h1 className="font-headline text-6xl md:text-7xl font-bold text-on-surface tracking-tighter mt-2">{data.metrics.plays}</h1>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="font-label text-xs uppercase tracking-[0.1em] text-on-surface-variant">Engagement Rate</span>
                <span className="font-headline text-2xl font-bold text-secondary">{data.metrics.engagementRate}</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-container to-secondary-container w-[72%] rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)]"></div>
              </div>
              <p className="text-xs text-on-surface-variant text-right italic">+1.2% from last 7 days</p>
            </div>
          </div>
          {/* Abstract Decorative Element */}
          <div className="absolute -bottom-12 -right-12 h-64 w-64 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-all duration-700"></div>
        </div>
      </div>
      
      {/* Stats Grid (Below) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatsCard icon="favorite" value={data.metrics.likes} label="Total Likes" color="text-red-400" change="+4.2%" />
        <StatsCard icon="chat_bubble" value={data.metrics.comments} label="Comments" color="text-blue-400" change="+12.8%" />
        <StatsCard icon="repeat" value={data.metrics.shares} label="Shares" color="text-purple-400" change="Stable" />
        <StatsCard icon="visibility" value={data.metrics.reach} label="Total Reach" color="text-primary-container" change="+25.1%" />
      </div>
      
      {/* Detailed Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Caption */}
        <div className="bg-glass rounded-xl border border-white/5 flex flex-col h-full max-h-[400px]">
          <div className="p-5 border-b border-white/10 bg-surface-container-highest/30">
            <h4 className="font-label text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">notes</span>
              Original Caption
            </h4>
          </div>
          <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar">
            <p className="text-on-surface leading-relaxed text-sm whitespace-pre-line">
              {data.details.caption}
            </p>
          </div>
        </div>
        
        {/* Right Column: Meta & Analysis */}
        <div className="space-y-6">
          {/* Metrics Box */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Post Date</span>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container">calendar_today</span>
                  <span className="text-sm font-semibold">{data.details.postedDate}</span>
                </div>
              </div>
              <div>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Sentiment</span>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container">sentiment_very_satisfied</span>
                  <span className="text-sm font-semibold text-secondary">{data.details.sentiment}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tags & Music */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 space-y-4">
            <div>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-3">Trending Music</span>
              <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="h-10 w-10 bg-surface-container-highest rounded flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">music_note</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold truncate">{data.details.music}</p>
                  <p className="text-[10px] text-on-surface-variant">Original Audio</p>
                </div>
                <span className="material-symbols-outlined text-primary-container text-xl">bar_chart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatsCard({ icon, value, label, color, change }) {
  return (
    <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 hover:bg-surface-container transition-all hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-4">
        <span className={`material-symbols-outlined ${color} group-hover:scale-110 transition-transform`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        <span className={`text-[10px] font-bold ${change === 'Stable' ? 'text-on-surface-variant' : 'text-green-400'}`}>{change}</span>
      </div>
      <h3 className="font-headline text-3xl font-bold text-on-surface">{value}</h3>
      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">{label}</p>
    </div>
  );
}