export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: string;
}

export interface Asset {
  playbackId: string;
  title: string;
  description: string;
  userAddress: string;
  createdAt: Date;
  tags: string;
  thumbnail: string;
}
