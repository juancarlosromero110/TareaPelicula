// src/app/my-favourites/page.tsx
"use client";

import { useEffect, useState } from "react";
import Config from "@/config";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import type { Movie } from "@/types/Movie";

const FAVORITES_KEY = "favorite_movies";

export default function MyFavouritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = localStorage.getItem(FAVORITES_KEY);
      const favoriteIds: number[] = stored ? JSON.parse(stored) : [];

      const fetchedMovies = await Promise.all(
        favoriteIds.map(async (id) => {
          const res = await fetch(`${Config.API_URL}${id}`, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`,
            },
          });
          return (await res.json()) as Movie;
        })
      );

      setMovies(fetchedMovies);
    };

    loadFavorites();
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
        {movies.length > 0 ? (
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
          <p className="text-gray-400">You got no favorite movies.</p>
        )}
      </div>
    </div>
  );
}
