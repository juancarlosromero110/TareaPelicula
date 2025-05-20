import api from "../api";
import type { Movie } from "@/types/Movie";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getPopularMovies = async (): Promise<MovieResponse | undefined> => {
  let res: MovieResponse | undefined;
  const endpoint = 'popular?language=en-US';

  await api
    .get(endpoint)
    .then((d) => {
      res = d.data;
    })
    .catch((err) => {
      console.error("Error fetching popular movies:", err);
    });

  return res;
};
