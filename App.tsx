import React, { useState, useEffect, useCallback } from 'react';
import { getMusicRecommendations } from './services/geminiService';
import { SongRecommendation } from './types';
import SongItem from './components/SongItem';
import MoodBackground from './components/MoodBackground';

const PRESET_THEMES = [
  { label: "활기찬 아침", icon: "☀️", value: "활기찬 아침 출근길" },
  { label: "비 오는 날", icon: "☔", value: "비 오는 날의 창밖 풍경" },
  { label: "퇴근길 위로", icon: "🌙", value: "편안한 퇴근 시간" },
  { label: "한강 드라이브", icon: "🚗", value: "한강을 지나며 듣는 노래" },
  { label: "몽환적인 밤", icon: "🌌", value: "잠이 덜 깬 몽롱한 오전" },
  { label: "힙한 감성", icon: "🎧", value: "힙한 스트릿 감성" },
];

const App: React.FC = () => {
  const [themeInput, setThemeInput] = useState('');
  const [currentTheme, setCurrentTheme] = useState('활기찬 출퇴근길');
  const [recommendations, setRecommendations] = useState<SongRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMusic = useCallback(async (theme: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMusicRecommendations(theme);
      setRecommendations(data);
    } catch (err) {
      setError('추천 목록을 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMusic(currentTheme);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (themeInput.trim()) {
      setCurrentTheme(themeInput);
      fetchMusic(themeInput);
    }
  };

  const handleRefresh = () => {
    fetchMusic(currentTheme);
  };

  const dominantMood = recommendations.length > 0 ? recommendations[0].mood : 'default';

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-12 relative">
      <MoodBackground mood={dominantMood} />

      {/* Header Container */}
      <header className="w-full max-w-2xl flex flex-col items-center mb-12">
        <div className="bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-6 backdrop-blur-md">
          <span className="text-[10px] font-black tracking-[0.3em] text-white/80 uppercase">Daily Curation</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center">
          COMMUTE<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 drop-shadow-sm">BEATS</span>
        </h1>
        <p className="text-white/50 font-medium text-lg text-center max-w-md leading-snug">
          오늘 당신의 여정을 채워줄 완벽한 사운드트랙 7곡을 제안합니다.
        </p>
      </header>

      {/* Floating Search Bar */}
      <section className="w-full max-w-2xl mb-12 z-10">
        <form onSubmit={handleSubmit} className="relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200"></div>
          <div className="relative">
            <input
              type="text"
              value={themeInput}
              onChange={(e) => setThemeInput(e.target.value)}
              placeholder="분위기나 상황을 입력하세요..."
              className="w-full px-8 py-6 rounded-[2rem] bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 focus:outline-none focus:border-white/30 text-xl font-medium placeholder:text-white/20 shadow-2xl transition-all"
            />
            <button 
              type="submit"
              className="absolute right-3 top-3 bottom-3 px-8 bg-white text-black font-black rounded-3xl hover:bg-blue-50 active:scale-95 transition-all shadow-xl"
            >
              GO
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-2.5 mt-8 justify-center">
          {PRESET_THEMES.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setThemeInput(item.value);
                setCurrentTheme(item.value);
                fetchMusic(item.value);
              }}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              <span className="text-sm group-hover:scale-125 transition-transform">{item.icon}</span>
              <span className="text-xs font-bold text-white/60 group-hover:text-white">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Music Grid */}
      <main className="w-full max-w-2xl flex-grow mb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-8">
            <div className="flex gap-1.5 h-12 items-end">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="w-2 bg-white rounded-full animate-bounce" style={{animationDelay: `${i * 0.1}s`, height: `${30 + (i % 2) * 40}%`}}></div>
              ))}
            </div>
            <p className="text-xl font-bold tracking-tight text-white/60 animate-pulse uppercase">Curating your playlist...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 backdrop-blur-2xl border border-red-500/30 p-10 rounded-[2.5rem] text-center shadow-2xl">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-lg font-bold text-red-200 mb-6">{error}</p>
            <button 
              onClick={handleRefresh}
              className="px-8 py-3 bg-white text-black font-black rounded-2xl hover:bg-red-50 transition-colors"
            >
              RETRY
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex justify-between items-center mb-6 px-4">
              <h2 className="text-2xl font-black">
                <span className="text-white/40 font-light">Now: </span>
                <span>{currentTheme}</span>
              </h2>
              <button 
                onClick={handleRefresh}
                className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:rotate-180 transition-all duration-500 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </button>
            </div>
            {recommendations.map((song, idx) => (
              <SongItem key={`${song.title}-${idx}`} song={song} index={idx} />
            ))}
          </div>
        )}
      </main>

      <footer className="w-full text-center py-12 border-t border-white/5 mt-auto">
        <p className="text-white/20 font-black tracking-widest text-[10px] uppercase mb-2">Developed with Gemini AI</p>
        <p className="text-white/40 text-xs font-medium">© 2024 COMMUTE BEATS. CLICK TRACKS TO PLAY ON YOUTUBE.</p>
      </footer>
      
      {/* Scroll to Top / Refresh FAB */}
      {!isLoading && recommendations.length > 0 && (
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(handleRefresh, 500);
          }}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-[2rem] bg-white text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      )}
    </div>
  );
};

export default App;