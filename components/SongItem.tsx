
import React from 'react';
import { SongRecommendation, Region } from '../types';

interface SongItemProps {
  song: SongRecommendation;
  index: number;
}

const SongItem: React.FC<SongItemProps> = ({ song, index }) => {
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title}`)}`;

  return (
    <a 
      href={youtubeSearchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] active:scale-95 shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-600/50 rounded-full font-bold text-xl text-white group-hover:bg-indigo-500 transition-colors">
          {index + 1}
        </div>
        <div className="flex-grow overflow-hidden">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${song.region === Region.KOREA ? 'bg-blue-500/30 text-blue-200' : 'bg-purple-500/30 text-purple-200'}`}>
              {song.region === Region.KOREA ? 'K-POP' : 'GLOBAL'}
            </span>
            <span className="text-xs text-white/50">{song.genre}</span>
          </div>
          <h3 className="text-lg font-bold leading-tight truncate">{song.title}</h3>
          <p className="text-sm text-white/70 truncate">{song.artist}</p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600/20 group-hover:bg-red-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.5 5.5l7 2.5-7 2.5v-5z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/60 leading-relaxed italic">
        "{song.reason}"
      </div>
    </a>
  );
};

export default SongItem;
