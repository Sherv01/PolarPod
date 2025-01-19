import React, { useState, useEffect } from 'react';
import { Search, BarChart2, Shield, Globe2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
const navigate = useNavigate();
  const handleKeyPress = (e)=>{
    if(e.key == "Enter"){
      navigate(`/analysis/${searchQuery}`);
    }

  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-blue-950 text-white overflow-hidden">
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
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500"onClick = 'window.location.href = "/home"'>
          BIAS BUSTER
        </div>
        <div className="flex gap-8">
          {['Home', 'Discovery', 'Team'].map((item) => (
            <button onClick = {() => window.location.href = '/'+item} key={item} className="relative group">
              <span className="text-gray-300 hover:text-white transition-colors">{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300" />
            </button  >
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 md:px-8">
        <div className="max-w-6xl mx-auto pt-20 pb-32">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-red-500 animate-gradient bg-600%">
            Uncover Media Bias with AI
          </h1>
          
          {/* Floating search bar */}
          <div className={`relative max-w-3xl mx-auto mt-12 transition-all duration-300 ${isSearchFocused ? 'transform -translate-y-2' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-blue-500/50 opacity-20 blur-xl rounded-full" />
            <div className="relative flex items-center bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
              <Search className="ml-4 text-gray-400" />
              <input     onKeyPress={handleKeyPress}

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

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-32">
            {[
              { icon: BarChart2, title: 'Bias Detection', color: 'from-red-500 to-red-600' },
              { icon: Shield, title: 'Fact Checking', color: 'from-blue-500 to-blue-600' },
              { icon: Globe2, title: 'Global Coverage', color: 'from-red-500 to-blue-500' }
            ].map(({ icon: Icon, title, color }) => (
              <div key={title} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} p-4 mb-6`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{title}</h3>
                  <p className="text-gray-400">Advanced AI analysis helps you understand different perspectives and make informed decisions.</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-32">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-full font-semibold text-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="relative" onClick = {()=>{ window.location.href='/discovery'}}>Get Started Free</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;