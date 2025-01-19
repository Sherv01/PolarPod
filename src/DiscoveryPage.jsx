import React, { useState, useEffect } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);

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
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/items');
        const data = await response.json();
        const formattedArticles = data.map((article, index) => ({
          id: index + 1,
          title: article.title || "Untitled Article",
          category: "General",
          readTime: `${Math.ceil(Math.random() * 6)} min`,
          trending: Math.random() > 0.5,
          image: article.image_url || "/api/placeholder/600/400",
          isLarge: index === 0,
        }));
        setNewsArticles(formattedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        // Fallback data for demonstration
        setNewsArticles([
          { id: 1, title: "Featured News Story", category: "Politics", readTime: "5 min", trending: true, image: "/api/placeholder/600/400", isLarge: true },
          { id: 2, title: "Secondary Story", category: "Technology", readTime: "3 min", trending: false, image: "/api/placeholder/400/300", isLarge: false },
          { id: 3, title: "Another Important Update", category: "World", readTime: "4 min", trending: true, image: "/api/placeholder/400/300", isLarge: false }
        ]);
      }
    };

    fetchArticles();
  }, []);
  const navigate = useNavigate();
  const handleKeyPress = (e)=>{
    if (e.key === "Enter") {
      navigate(`/analysis/${searchQuery}`);
    }
  }
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
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500" onClick = {() => window.location.href = '/home'}>
        BIAS BUSTER
        </div>
        <div className="flex gap-8">
          {['Home', 'Discovery', 'Team'].map((item) => (
            <button onClick = {() => window.location.href = '/'+item}key={item} className="relative group">
              <span className="text-gray-300 hover:text-white transition-colors">{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
      </nav>

      {/* Search Section */}
      <div className="relative z-10 px-6 md:px-8 mt-8">
        <div className={`relative max-w-3xl mx-auto transition-all duration-300 ${isSearchFocused ? 'transform -translate-y-2' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-blue-500/50 opacity-20 blur-xl rounded-full" />
          <div className="relative flex items-center bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
            <Search className="ml-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for topics, articles, or perspectives..."
              className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <div key={article.id} className={`relative group ${article.isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-red-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10">
                      {article.category}
                    </span>
                    {article.isLarge && (
                      <span className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-500/20 to-red-500/20 backdrop-blur-sm border border-white/10">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className={`${article.isLarge ? 'text-2xl' : 'text-lg'} font-semibold mb-3`}>{article.title}</h3>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{article.readTime}</span>
                    </div>
                    {article.trending && (
                      <div className="flex items-center gap-1 text-blue-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">Trending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPage;