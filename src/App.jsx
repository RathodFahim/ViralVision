import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingHero from './components/LandingHero';
import AnalyzingState from './components/AnalyzingState';
import ResultsDashboard from './components/ResultsDashboard';
import { generateMockData } from './utils/mockData';

export default function App() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'analyzing' | 'complete' | 'error'
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url) => {
    setStatus('analyzing');
    setError(null);

    try {
      // Check if we should use real API or mock
      const useRealApi = true; // Set based on env or logic if needed

      if (useRealApi) {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to analyze reel');
        }

        const result = await response.json();
        setData(result);
      } else {
        // Mock fallback
        await new Promise(resolve => setTimeout(resolve, 2000));
        setData(generateMockData(url));
      }
      
      setStatus('complete');
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err.message);
      setStatus('error'); // Or revert to idle with error message
      // Fallback to mock data on error for demo purposes if desired, or show error
      // setData(generateMockData(url)); // Uncomment to fallback
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container flex flex-col">
      <Header status={status} user={data?.creator} />
      
      {status === 'idle' && <LandingHero onAnalyze={handleAnalyze} />}
      {status === 'analyzing' && <AnalyzingState />}
      {status === 'complete' && <ResultsDashboard data={data} />}
      {status === 'error' && (
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <div className="text-error text-xl font-bold">Error: {error}</div>
          <button 
            onClick={() => setStatus('idle')}
            className="px-6 py-2 bg-surface-container-highest rounded-lg hover:bg-surface-container-high transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}