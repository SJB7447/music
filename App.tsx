
import React, { useState, useEffect, useCallback } from 'react';
import { getMusicRecommendations } from './services/geminiService';
import { SongRecommendation } from './types';
import SongItem from './components/SongItem';
import MoodBackground from './components/MoodBackground';

const PRESET_THEMES = [
  "활기찬 아침 출근길",
  "비 오는 날의 창밖 풍경",
  "편안한 퇴근 시간",
  "한강을 지나며 듣는 노래",
  "잠이 덜 깬 몽롱한 오전",
  "힙한 스트릿 감성",
  "여유로운 주말 예습"
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 relative">
      <MoodBackground mood={dominantMood} />

      {/* Header */}
      <header className="w-full max-w-2xl text-center mb-8 pt-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 drop-shadow-md">
          COMMUTE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">BEATS</span>
        </h1>
        <p className="text-white/80 font-medium">당신의 출퇴근길을 채워줄 7곡의 데일리 믹스</p>
      </header>

      {/* Theme Input */}
      <section className="w-full max-w-2xl mb-8">
        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="text"
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            placeholder="예: 지친 퇴근길에 위로가 되는 인디 음악"
            className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-lg placeholder:text-white/40 shadow-2xl transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-6 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 active:scale-95 transition-all shadow-lg"
          >
            검색
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {PRESET_THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => {
                setThemeInput(theme);
                setCurrentTheme(theme);
                fetchMusic(theme);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-colors"
            >
              #{theme}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full max-w-2xl flex-grow">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <p className="text-xl font-medium animate-pulse">오늘의 추천 곡을 고르는 중...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 p-6 rounded-2xl text-center">
            <p className="text-lg mb-4">{error}</p>
            <button 
              onClick={handleRefresh}
              className="px-6 py-2 bg-white text-red-600 font-bold rounded-lg"
            >
              다시 시도하기
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end mb-4 px-2">
              <h2 className="text-xl font-bold">
                <span className="text-yellow-400">"{currentTheme}"</span> 에 어울리는 선곡
              </h2>
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 group-active:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                새로운 추천 받기
              </button>
            </div>
            {recommendations.map((song, idx) => (
              <SongItem key={`${song.title}-${idx}`} song={song} index={idx} />
            ))}
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="w-full text-center py-8 text-white/40 text-xs">
        <p>© 2024 Commute Beats. Powered by Gemini API.</p>
        <p className="mt-1">곡 제목을 클릭하면 유튜브 검색으로 연결됩니다.</p>
      </footer>
      
      {/* Persistent Refresh Button for Mobile UX */}
      {!isLoading && recommendations.length > 0 && (
        <button 
          onClick={handleRefresh}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-indigo-900 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20 md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      )}
    </div>
  );
};

export default App;
