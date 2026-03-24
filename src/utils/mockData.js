export const generateMockData = (url) => {
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