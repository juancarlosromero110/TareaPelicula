export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average?: number;
  genre_ids?: number[];
  popularity?: number;
}
