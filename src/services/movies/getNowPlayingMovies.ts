import api from "../api";
import type { Movie } from "@/types/Movie";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getNowPlayingMovies = async (): Promise<MovieResponse | undefined> => {
  let res: MovieResponse | undefined;
  const endpoint = 'now_playing?language=en-US';

  await api
    .get(endpoint)
    .then((d) => {
      res = d.data;
    })
    .catch((err) => {
      console.error("Error fetching now playing movies:", err);
    });

  return res;
};
