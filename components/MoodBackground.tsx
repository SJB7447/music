
import React from 'react';

interface MoodBackgroundProps {
  mood: string;
}

const MoodBackground: React.FC<MoodBackgroundProps> = ({ mood }) => {
  const getGradient = (moodStr: string) => {
    const lowerMood = moodStr.toLowerCase();
    if (lowerMood.includes('energetic') || lowerMood.includes('bright') || lowerMood.includes('활기')) {
      return 'from-orange-500 via-rose-500 to-amber-500';
    }
    if (lowerMood.includes('calm') || lowerMood.includes('chill') || lowerMood.includes('차분')) {
      return 'from-teal-500 via-emerald-600 to-sky-700';
    }
    if (lowerMood.includes('dreamy') || lowerMood.includes('mysterious') || lowerMood.includes('몽환')) {
      return 'from-indigo-600 via-purple-700 to-pink-500';
    }
    if (lowerMood.includes('nostalgic') || lowerMood.includes('sad') || lowerMood.includes('감성')) {
      return 'from-slate-700 via-blue-900 to-slate-800';
    }
    // Default
    return 'from-blue-600 via-indigo-700 to-purple-800';
  };

  return (
    <div className={`fixed inset-0 -z-10 bg-gradient-to-br transition-all duration-1000 ease-in-out ${getGradient(mood)}`}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
    </div>
  );
};

export default MoodBackground;
