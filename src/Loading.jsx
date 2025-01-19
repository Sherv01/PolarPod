import React from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = ({ progress = 0, onCancel }) => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 to-blue-950 flex justify-center items-center">
      {/* Background grid animation */}
      <div className="fixed inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(#ff4444 1px, transparent 1px), linear-gradient(90deg, #4466ff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      {/* Loading card */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
          
          {/* Title */}
          <h2 className="mt-4 text-xl font-semibold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Loading BIAS BUSTER...
          </h2>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress text */}
          <p className="mt-2 text-sm text-gray-400">
            {progress}% complete
          </p>
          
          {/* Cancel button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white/80 hover:text-white flex items-center gap-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;