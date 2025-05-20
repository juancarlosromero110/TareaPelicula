import api from "../api";
import type { Movie } from "@/types/Movie";

export const getFavouriteMovies = async (): Promise<Movie[] | undefined> => {
  let res: Movie[] | undefined;
  const endpoint = 'favourite/movies?language=en-US'; // Ajusta si usas otro

  await api
    .get(endpoint)
    .then((d) => {
      res = d.data.results;
    })
    .catch((err) => {
      console.error("Error fetching favourite movies:", err);
    });

  return res;
};
