import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  TrendingUp, 
  User, 
  Music, 
  Calendar, 
  Search, 
  BarChart3, 
  Eye, 
  ArrowUpRight, 
  Zap, 
  AlertCircle,
  Hash,
  Instagram,
  Info,
  Settings,
  Key
} from 'lucide-react';

// --- Mock Data Generator ---
const generateMockData = (url) => {
  const seed = url.length; 
  return {
    id: `reel_${Date.now()}`,
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    creator: {
      username: "@creative_visionary",
      followers: "1.2M",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60",
      profileUrl: "https://instagram.com/creative_visionary"
    },
    metrics: {
      plays: (seed * 15432).toLocaleString(),
      likes: (seed * 1234).toLocaleString(),
      comments: (seed * 12).toLocaleString(),
      shares: (seed * 45).toLocaleString(),
      saves: (seed * 89).toLocaleString(),
      engagementRate: "8.4%",
      reach: (seed * 20000).toLocaleString()
    },
    details: {
      caption: "Can't believe we captured this moment! 🌅 The lighting was absolutely perfect. Tag someone who needs to see this view! 👇 #sunset #vibes #travelgram #goldenhour",
      music: "Original Audio - @creative_visionary",
      postedDate: "2 days ago",
      duration: "15s",
      sentiment: "Positive (92%)"
    },
    performance: {
      retention: [100, 95, 88, 82, 75, 65, 50, 45, 40, 35], 
      peakTime: "6:00 PM - 9:00 PM"
    }
  };
};

// --- Real Apify Data Fetcher ---
const fetchApifyData = async (url, token) => {
  // SWITCHED TO 'apify/instagram-scraper' (Official) for better reliability
  // This actor is more robust for direct URL fetching
  const API_ENDPOINT = `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${token}`;
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        directUrls: [url],
        resultsType: "details",
        searchLimit: 1, // Limit to 1 to save CU (Compute Units)
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API Token. Please check your token in Settings.");
      }
      
      const errorText = await response.text();
      let errorMessage = `Apify Error: ${response.status} ${response.statusText}`;
      try {
        const jsonError = JSON.parse(errorText);
        if (jsonError.message) errorMessage = jsonError.message;
      } catch (e) {
        // Fallback to text if JSON parse fails
        console.error("Non-JSON error response:", errorText);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('No data found for this Reel. The profile might be private or the link invalid.');
    }

    const item = data[0];

    // Normalize data fields (handle variations between scraper versions)
    const playCount = item.playCount || item.videoViewCount || 0;
    const likesCount = item.likesCount || 0;
    const commentsCount = item.commentsCount || 0;

    return {
      id: item.id || item.shortCode,
      thumbnail: item.displayUrl || item.thumbnailUrl,
      creator: {
        username: item.ownerUsername || "Unknown",
        followers: item.ownerFollowersCount ? item.ownerFollowersCount.toLocaleString() : "Hidden",
        avatar: item.ownerProfilePicUrl || "",
        profileUrl: item.ownerUsername ? `https://instagram.com/${item.ownerUsername.replace('@', '')}` : ""
      },
      metrics: {
        plays: playCount ? playCount.toLocaleString() : "Hidden",
        likes: likesCount.toLocaleString(),
        comments: commentsCount.toLocaleString(),
        shares: "Private", // Not available via public scraping
        saves: "Private",  // Not available via public scraping
        engagementRate: playCount > 0 ? ((likesCount + commentsCount) / playCount * 100).toFixed(2) + "%" : "N/A",
        reach: "Private"   // Not available via public scraping
      },
      details: {
        caption: item.caption || "No caption",
        music: item.musicInfo?.songName || "Original Audio",
        postedDate: item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "Unknown",
        duration: item.videoDuration ? `${item.videoDuration}s` : "Unknown",
        sentiment: "Analysis N/A" 
      },
      performance: {
        retention: [100, 95, 88, 82, 75, 65, 50, 45, 40, 35], 
        peakTime: "Estimating..."
      }
    };
  } catch (error) {
    console.error("Apify Fetch Error:", error);
    throw error;
  }
};

const MetricCard = ({ icon: Icon, label, value, subtext, delay }) => (
  <div 
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group animate-fadeIn hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-start justify-between mb-3 sm:mb-4">
      <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg sm:rounded-xl group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400 group-hover:text-pink-300 transition-colors duration-300" />
      </div>
      {subtext && (
        <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full group-hover:bg-emerald-400/20 group-hover:scale-110 transition-all duration-300 animate-pulse">
          <ArrowUpRight className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
          {subtext}
        </span>
      )}
    </div>
    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight group-hover:text-purple-200 transition-colors duration-300">{value}</h3>
    <p className="text-slate-400 text-xs sm:text-sm font-medium group-hover:text-slate-300 transition-colors duration-300">{label}</p>
  </div>
);

const ProgressBar = ({ value, color = "bg-pink-500", delay }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out rounded-full`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default function InstagramAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [useRealData, setUseRealData] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    setData(null);

    if (!url.includes('instagram.com/reel')) {
      setError('Please enter a valid Instagram Reel link (e.g., instagram.com/reel/...)');
      return;
    }

    if (useRealData && !apiKey) {
      setError('Please enter your Apify API Token in settings to use Real Data mode.');
      setShowSettings(true);
      return;
    }

    setLoading(true);

    if (useRealData) {
      try {
        const realData = await fetchApifyData(url, apiKey);
        setData(realData);
      } catch (err) {
        // More user-friendly error message display
        let userMsg = err.message;
        if (userMsg.includes("Failed to fetch")) {
          userMsg = "Network error. Please check your connection or try again.";
        }
        setError(userMsg);
      } finally {
        setLoading(false);
      }
    } else {
      // Mock Mode
      setTimeout(() => {
        setLoading(false);
        setData(generateMockData(url));
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30 selection:text-pink-200 overflow-x-hidden">
      
      {/* Enhanced Background Gradients with Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px] animate-float" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-float" style={{animationDelay: '0s'}} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-float" style={{animationDelay: '4s'}} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Navigation Bar */}
        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8 animate-slideInDown">
          <div className="flex items-center gap-3 group">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-xl shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">Reel Insight Pro</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mode Badge */}
            <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105 ${useRealData ? 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/20'}`}>
              <Zap className="w-3 h-3 mr-1 sm:mr-1.5 animate-pulse" />
              <span className="hidden sm:inline">{useRealData ? 'Real Data Mode' : 'Demo Mode'}</span>
              <span className="sm:hidden">{useRealData ? 'Real' : 'Demo'}</span>
            </span>
            
            {/* API Integration Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm transform hover:scale-105 hover:shadow-lg ${showSettings || useRealData ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 hover:bg-purple-500' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'}`}
            >
              <Key className="w-4 h-4 animate-bounce" style={{animationDelay: showSettings ? '0s' : '2s'}} />
              <span className="hidden sm:inline">API Integration</span>
              <span className="sm:hidden">API</span>
            </button>
          </div>
        </nav>
        
        {/* API Settings Panel */}
        {showSettings && (
          <div className="mb-6 sm:mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 animate-slideInDown shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={useRealData}
                    onChange={() => setUseRealData(!useRealData)}
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 group-hover:scale-105 transition-transform"></div>
                  <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Enable Real Data (Apify)</span>
                </label>
              </div>
              
              {useRealData && (
                <div className="flex-1 w-full lg:w-auto lg:ml-4 animate-slideInRight">
                  <div className="relative group">
                    <div className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-purple-400 transition-colors">
                      <Key className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      placeholder="Paste your Apify API Token"
                      className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-slate-500 hover:bg-black/30"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            {useRealData && (
               <p className="text-xs text-slate-500 mt-4 animate-fadeIn">
                 Note: Real data scraping is limited to public metrics (Likes, Comments, Plays). Private metrics (Reach, Shares) will be hidden.
               </p>
            )}
          </div>
        )}
        
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 animate-slideInUp">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-4 sm:mb-6 tracking-tight leading-tight pb-2 hover:scale-105 transition-transform duration-500 cursor-default">
            Instagram Reel Analytics
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 animate-fadeIn" style={{animationDelay: '0.3s'}}>
            Unlock deep analytics for any public Instagram Reel. Analyze engagement, retention, and creator performance in seconds.
          </p>
        </header>

        {/* Search Section */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300 hover:shadow-purple-500/10 hover:border-purple-500/20 animate-scaleIn group">
            <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition-colors duration-300">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Paste Instagram Reel Link here..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 pl-10 sm:pl-12 pr-4 py-3 sm:py-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base sm:text-lg outline-none transition-all duration-300 hover:bg-white/10 focus:bg-white/10"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !url}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 flex items-center justify-center whitespace-nowrap text-sm sm:text-base transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="animate-pulse">Analyzing</span>
                  </span>
                ) : (
                  <>
                    Analyze <Zap className="w-4 h-4 ml-2 group-hover:animate-bounce" />
                  </>
                )}
              </button>
            </form>
          </div>

          
          {error && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start text-red-400 animate-shakeIn shadow-lg">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 animate-pulse" />
              <span className="text-sm sm:text-base">{error}</span>
            </div>
          )}
        </div>

        {/* Results Section */}
        {data && (
          <div className="animate-slideInUp space-y-6 sm:space-y-8">
            
            {/* Top Row: Video + Creator + Key Stat */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Creator Profile Card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-slideInLeft group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {data.creator.avatar ? (
                    <img 
                      src={data.creator.avatar} 
                      alt="Creator" 
                      className="w-full h-full rounded-full object-cover border-4 border-slate-900 transition-all duration-300 group-hover:border-purple-500"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-900 group-hover:border-purple-500 transition-all duration-300">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-slate-500 group-hover:text-purple-400 transition-colors" />
                    </div>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">{data.creator.username}</h2>
                <p className="text-slate-400 text-sm mb-3 sm:mb-4 group-hover:text-slate-300 transition-colors">{data.creator.followers} Followers</p>
                <button 
                  onClick={() => window.open(data.creator.profileUrl, '_blank')}
                  className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  View Profile
                </button>
              </div>

              {/* Main Insight Hero */}
              <div className="lg:col-span-2 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500 animate-slideInRight">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shimmer" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6 sm:mb-8 relative z-10">
                  <div>
                    <h3 className="text-slate-300 font-medium mb-1 flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
                      <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" /> Total Plays
                    </h3>
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">{data.metrics.plays}</p>
                  </div>
                  {data.metrics.engagementRate !== "N/A" && (
                    <div className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-bold flex items-center hover:bg-emerald-500/30 transition-all duration-300 animate-bounce" style={{animationDelay: '1s'}}>
                      <ArrowUpRight className="w-4 h-4 mr-1" /> Trending
                    </div>
                  )}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                    <span>Engagement Rate</span>
                    <span className="text-white font-bold animate-pulse">{data.metrics.engagementRate}</span>
                  </div>
                  <ProgressBar value={84} delay={500} />
                  <p className="text-xs text-slate-500 mt-2 group-hover:text-slate-400 transition-colors">
                    {useRealData 
                      ? "Engagement calculated based on public likes/comments vs plays." 
                      : "Performing better than 84% of similar reels"}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <MetricCard 
                icon={Heart} 
                label="Total Likes" 
                value={data.metrics.likes} 
                subtext={useRealData ? "" : "12%"}
                delay={100}
              />
              <MetricCard 
                icon={MessageCircle} 
                label="Comments" 
                value={data.metrics.comments} 
                delay={200}
              />
              <MetricCard 
                icon={Share2} 
                label="Shares" 
                value={data.metrics.shares} 
                subtext={useRealData ? "Private" : "Viral"}
                delay={300}
              />
              <MetricCard 
                icon={Eye} 
                label="Reach" 
                value={data.metrics.reach} 
                delay={400}
              />
            </div>

            {/* Detailed Analysis Tabs */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="flex border-b border-white/10">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <BarChart3 className="w-4 h-4" /> <span className="hidden sm:inline">Content Details</span><span className="sm:hidden">Details</span>
                </button>
                <button 
                  onClick={() => setActiveTab('sentiment')}
                  className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 transition-colors ${activeTab === 'sentiment' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Hash className="w-4 h-4" /> <span className="hidden sm:inline">Tags & Music</span><span className="sm:hidden">Tags</span>
                </button>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
                          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" /> Caption
                        </h4>
                        <p className="text-slate-300 leading-relaxed bg-black/20 p-3 sm:p-4 rounded-xl border border-white/5 whitespace-pre-wrap max-h-48 sm:max-h-60 overflow-y-auto text-sm sm:text-base">
                          {data.details.caption}
                        </p>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-black/20 p-3 sm:p-4 rounded-xl border border-white/5 flex items-center gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg text-blue-400">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Posted Date</p>
                            <p className="text-white font-medium text-sm sm:text-base">{data.details.postedDate}</p>
                          </div>
                        </div>
                        <div className="bg-black/20 p-3 sm:p-4 rounded-xl border border-white/5 flex items-center gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg text-green-400">
                            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Audience Sentiment</p>
                            <p className="text-white font-medium text-sm sm:text-base">{data.details.sentiment}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'sentiment' && (
                  <div className="animate-fadeIn">
                     <div className="bg-black/20 p-3 sm:p-4 rounded-xl border border-white/5 flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-pink-500/20 rounded-lg text-pink-400">
                          <Music className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Audio Track</p>
                          <p className="text-white font-medium text-sm sm:text-base">{data.details.music}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                         <span className="text-slate-400 text-sm w-full mb-2">
                           {useRealData ? "Tags are included in the caption view." : "Tags extracted from mock data:"}
                         </span>
                         {!useRealData && ['#sunset', '#vibes', '#travelgram', '#goldenhour', '#reelsinstagram', '#explore'].map((tag, i) => (
                          <span key={i} className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs sm:text-sm hover:bg-white/10 cursor-default transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shakeIn {
          0% { opacity: 0; transform: translateX(-10px); }
          25% { transform: translateX(10px); }
          50% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          100% { transform: translateX(150%) skewX(12deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out forwards; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out forwards; }
        .animate-shakeIn { animation: shakeIn 0.6s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  );
}