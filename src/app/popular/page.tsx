"use client";

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import type { Movie } from "@/types/Movie";

export default function PopularClientPage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const data = await getPopularMovies();
        setMovies(data?.results || []);
      } catch (err) {
        console.error("Error loading movies: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">🎬 Popular Movies</h1>
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
}
