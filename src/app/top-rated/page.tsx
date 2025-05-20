"use client";

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import type { Movie } from "@/types/Movie";

const TopRatedClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const res = await getTopRatedMovies();
        setMovies(res?.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    // Aplica el degradado negro→gris oscuro y asegura altura mínima
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">⭐ Top Rated Movies</h1>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                href={`/details/${movie.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRatedClientPage;
