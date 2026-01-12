import React from 'react';
import { SongRecommendation, Region } from '../types';

interface SongItemProps {
  song: SongRecommendation;
  index: number;
}

const SongItem: React.FC<SongItemProps> = ({ song, index }) => {
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title}`)}`;

  const getMoodEmoji = (mood: string) => {
    const m = mood.toLowerCase();
    if (m.includes('energetic')) return '🔥';
    if (m.includes('calm')) return '🌿';
    if (m.includes('dreamy')) return '✨';
    if (m.includes('nostalgic')) return '☁️';
    if (m.includes('bright')) return '☀️';
    return '🎵';
  };

  return (
    <div className="relative group">
      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <a 
        href={youtubeSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-1 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-5">
          {/* Index or Play Icon */}
          <div className="relative flex-shrink-0 w-14 h-14 overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group/play">
            <span className="text-white/40 font-bold text-lg group-hover:opacity-0 transition-opacity">{index + 1}</span>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10">
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-black tracking-wider ${song.region === Region.KOREA ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}`}>
                {song.region === Region.KOREA ? 'K-POP' : 'GLOBAL'}
              </span>
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest">{song.genre}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white leading-tight truncate group-hover:text-blue-200 transition-colors">
              {song.title}
            </h3>
            <p className="text-sm font-medium text-white/60 truncate">{song.artist}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-2xl" title={song.mood}>{getMoodEmoji(song.mood)}</span>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600/10 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Curated Reason */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-[13px] text-white/50 leading-relaxed font-light italic flex gap-2">
            <span className="text-white/20 font-serif text-2xl leading-none">“</span>
            {song.reason}
            <span className="text-white/20 font-serif text-2xl leading-none self-end">”</span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default SongItem;