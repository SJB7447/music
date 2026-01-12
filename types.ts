
export enum Region {
  KOREA = 'KOREA',
  INTERNATIONAL = 'INTERNATIONAL'
}

export interface SongRecommendation {
  title: string;
  artist: string;
  genre: string;
  mood: string;
  region: Region;
  reason: string;
}

export interface AppState {
  theme: string;
  recommendations: SongRecommendation[];
  isLoading: boolean;
  error: string | null;
}
