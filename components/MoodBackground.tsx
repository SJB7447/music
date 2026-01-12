import React from 'react';

interface MoodBackgroundProps {
  mood: string;
}

const MoodBackground: React.FC<MoodBackgroundProps> = ({ mood }) => {
  const getColors = (moodStr: string) => {
    const lowerMood = moodStr.toLowerCase();
    if (lowerMood.includes('energetic') || lowerMood.includes('bright') || lowerMood.includes('활기')) {
      return {
        gradient: 'from-[#f97316] via-[#ef4444] to-[#fbbf24]',
        blobs: ['bg-orange-400/20', 'bg-yellow-300/20']
      };
    }
    if (lowerMood.includes('calm') || lowerMood.includes('chill') || lowerMood.includes('차분')) {
      return {
        gradient: 'from-[#14b8a6] via-[#059669] to-[#0369a1]',
        blobs: ['bg-teal-300/20', 'bg-emerald-400/20']
      };
    }
    if (lowerMood.includes('dreamy') || lowerMood.includes('mysterious') || lowerMood.includes('몽환')) {
      return {
        gradient: 'from-[#6366f1] via-[#a855f7] to-[#ec4899]',
        blobs: ['bg-indigo-400/20', 'bg-pink-400/20']
      };
    }
    if (lowerMood.includes('nostalgic') || lowerMood.includes('sad') || lowerMood.includes('감성')) {
      return {
        gradient: 'from-[#334155] via-[#1e1b4b] to-[#0f172a]',
        blobs: ['bg-blue-400/10', 'bg-slate-500/10']
      };
    }
    return {
      gradient: 'from-[#2563eb] via-[#4f46e5] to-[#7c3aed]',
      blobs: ['bg-blue-500/20', 'bg-purple-500/20']
    };
  };

  const { gradient, blobs } = getColors(mood);

  return (
    <div className={`fixed inset-0 -z-10 bg-gradient-to-br transition-all duration-1000 ease-in-out ${gradient}`}>
      {/* Mesh Gradients blobs */}
      <div className={`absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] animate-float ${blobs[0]}`}></div>
      <div className={`absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] animate-float animation-delay-2000 ${blobs[1]}`}></div>
      
      {/* Overlay Darkener */}
      <div className="absolute inset-0 bg-[#030712]/40 backdrop-blur-[4px]"></div>
    </div>
  );
};

export default MoodBackground;