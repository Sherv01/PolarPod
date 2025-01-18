import React, { useState } from 'react';
import { Layout, ArrowLeftRight, Play, Pause } from 'lucide-react';

const NewsInterface = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('similarities');

  // Sample data - in real app would come from API
  const viewpoints = {
    similarities: [
      "Both sides acknowledge climate change is occurring",
      "Both agree economic impact should be considered",
      "Both want energy security"
    ],
    perspective1: [
      "Emphasizes immediate action needed",
      "Supports stronger regulations",
      "Focuses on environmental impact"
    ],
    perspective2: [
      "Prefers market-based solutions",
      "Concerned about economic costs",
      "Emphasizes technological innovation"
    ]
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 h-[calc(100vh-2rem)]">
        {/* Left Side - Video Player */}
        <div className="bg-white rounded-lg shadow-lg h-full">
          <div className="p-4 h-full flex flex-col">
            <div className="relative w-full bg-black rounded-lg flex-grow">
              {/* Placeholder for video content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/api/placeholder/640/360" 
                  alt="Video placeholder" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-3"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Overlaid text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-lg">
                  Climate Change Policy Debate: Understanding Different Perspectives
                </p>
              </div>
            </div>
            
            {/* Video controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-500 h-2 w-1/3 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Perspectives */}
        <div className="bg-white rounded-lg shadow-lg h-full">
          <div className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Perspectives Analysis</h2>
              <Layout className="h-6 w-6 text-gray-500" />
            </div>

            {/* Custom tabs */}
            <div className="w-full">
              <div className="flex space-x-1 border-b">
                {Object.keys(viewpoints).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                      activeTab === tab
                        ? 'bg-blue-50 text-blue-600 border border-b-0'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="mt-4 h-[calc(100%-8rem)] overflow-y-auto">
                <div className="space-y-4">
                  {viewpoints[activeTab].map((point, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="text-gray-800">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsInterface;