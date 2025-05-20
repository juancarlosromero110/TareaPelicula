"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { MovieCardHome } from "@/components/MovieCard/MovieCardHome";
import Link from "next/link";
import type { Movie } from "@/types/Movie";

export default function HomePage() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      const pop = await getPopularMovies();
      const top = await getTopRatedMovies();
      const now = await getNowPlayingMovies();

      setPopular(pop?.results?.slice(0, 6) || []);
      setTopRated(top?.results?.slice(0, 6) || []);
      setNowPlaying(now?.results?.slice(0, 6) || []);
    };
    loadAll();
  }, []);

  return (
    <div className="pt-16 bg-gray-900 min-h-screen text-white">
      {/* Banner Animado */}
      <Banner />

      {/* Contenido */}
      <div className="px-6 space-y-12">
        <Section title="🎬 Popular" href="/popular" movies={popular} />
        <Section title="⭐ Top Rated" href="/top-rated" movies={topRated} />
        <Section
          title="📽️ Now Playing"
          href="/now-playing"
          movies={nowPlaying}
        />
      </div>
    </div>
  );
}

function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative py-20 bg-gradient-to-br from-black to-gray-800 text-center"
    >
      <motion.h1
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold tracking-tight text-white"
      >
        Movie Catalog
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300"
      >
        Discover the latest blockbusters, timeless classics, and hidden gems—all
        in one place.
      </motion.p>
    </motion.div>
  );
}

function Section({
  title,
  href,
  movies,
}: {
  title: string;
  href: string;
  movies: Movie[];
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link href={href} className="text-sm text-blue-400 hover:underline">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCardHome
            key={movie.id}
            movie={movie}
            href={`/details/${movie.id}`}
          />
        ))}
      </div>
    </section>
  );
}
