import React, { useState } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';

const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample news data - would come from API in real app
  const newsArticles = [
    {
      id: 1,
      title: "Global Climate Summit Reaches Historic Agreement",
      category: "Politics",
      readTime: "5 min",
      trending: true,
      image: "/api/placeholder/800/400",
      isLarge: true,
    },
    {
      id: 2,
      title: "Tech Giants Announce New AI Collaboration",
      category: "Technology",
      readTime: "3 min",
      trending: true,
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      title: "Space Tourism: First Commercial Flight Launches",
      category: "Science",
      readTime: "4 min",
      trending: false,
      image: "/api/placeholder/400/300",
    },
    {
      id: 4,
      title: "Revolutionary Cancer Treatment Shows Promise",
      category: "Health",
      readTime: "6 min",
      trending: true,
      image: "/api/placeholder/400/300",
    },
    {
      id: 5,
      title: "Global Markets React to Economic Policy Shifts",
      category: "Finance",
      readTime: "4 min",
      trending: false,
      image: "/api/placeholder/400/300",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for topics, articles, or perspectives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Article (Large Tile) */}
          {newsArticles.filter(article => article.isLarge).map(article => (
            <div key={article.id} className="md:col-span-2 lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                        {article.category}
                      </span>
                      <div className="flex items-center text-white text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{article.title}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Regular Articles (Smaller Tiles) */}
          {newsArticles.filter(article => !article.isLarge).map(article => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-500 text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  {article.trending && (
                    <div className="flex items-center text-orange-500 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Trending
                    </div>
                  )}
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