"use client";

import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import type { Movie } from "@/types/Movie";

export default function NowPlayingClientPage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      try {
        const res = await getNowPlayingMovies();
        setMovies(res?.results || []);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">📽️ Now Playing Movies</h1>

        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                href={`/details/${movie.id}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No movies are currently playing.</p>
        )}
      </div>
    </div>
  );
}
