import React, { useState, useEffect } from 'react';
import { Play, Pause, Layout, ChevronLeft } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const NewsInterface = () => {
  const { searchQuery } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('similarities');
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewpoints, setViewpoints] = useState({
    similarities: [],
    perspective1: [],
    perspective2: [],
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProgress(10);
        const response = await fetch('http://localhost:5000/analyze', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ search: searchQuery }),
        });
        setProgress(30);
        
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        setProgress(60);
        
        const result = await response.json();
        setViewpoints({
          similarities: result.similarities || [],
          perspective1: result.perspective1 || [],
          perspective2: result.perspective2 || [],
        });
        setProgress(90);
        setLoading(false);
        setProgress(100);
      } catch (error) {
        console.error('Fetch Error:', error);
        setProgress(100);
      }
    };
    
    fetchData();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-blue-950 text-white">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(#ff4444 1px, transparent 1px), linear-gradient(90deg, #4466ff 1px, transparent 1px)',
               backgroundSize: '50px 50px',
               transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
               transition: 'transform 0.1s ease-out'
             }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 md:p-8">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
          NewsScraper
        </div>
        <div className="flex gap-8">
          {['Home', 'Discovery', 'Team'].map((item) => (
            <button     onClick = {() => window.location.href = '/'+item} key={item} className="relative group">
              <span className="text-gray-300 hover:text-white transition-colors">{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}

        </div>
      </nav>

      {/* Back Button */}
      <div className="relative z-10 px-6 md:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all group"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Video Player Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-[400px] rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden">
              {/* Video Player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </button>
              </div>
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-xl font-semibold">{searchQuery}</h2>
              </div>
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Analysis Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Perspectives Analysis</h2>
                <Layout className="w-6 h-6 text-gray-400" />
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6">
                {Object.keys(viewpoints).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="space-y-4">
                {viewpoints[activeTab].map((point, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsInterface;