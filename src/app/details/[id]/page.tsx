"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getMovieDetails } from "@/services/movies/getMovieDetails";
import { getMovieRecommendations } from "@/services/movies/getMovieRecommendations";
import Config from "@/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/types/Movie";
import Image from "next/image";
import Link from "next/link";

const FAVORITES_KEY = "favorite_movies";

export default function MovieDetailPage() {
  const { id } = useParams();
  const movieId = Number(id);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const detail = await getMovieDetails(movieId);
        const recResponse = await getMovieRecommendations(movieId);
        setMovie(detail);
        // Aseguramos que recResponse.results sea array
        setRecommendations(
          Array.isArray(recResponse.results) ? recResponse.results : []
        );

        const favs: number[] = JSON.parse(
          localStorage.getItem(FAVORITES_KEY) || "[]"
        );
        setIsFavorite(favs.includes(movieId));
      } catch (err) {
        console.error("Error loading movie:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  const toggleFavorite = () => {
    const favs: number[] = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "[]"
    );
    const updated = isFavorite
      ? favs.filter((f) => f !== movieId)
      : [...favs, movieId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const recVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-black to-gray-800 text-white flex items-center justify-center">
        <p>Loading movie details…</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-black to-gray-800 text-white flex items-center justify-center">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-black to-gray-800 text-white">
      <motion.div
        className="p-6 space-y-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Detalle principal */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 rounded overflow-hidden shadow-xl">
            <Image
              src={
                movie.poster_path
                  ? `${Config.IMAGE_BASE_URL}${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.title}
              width={500}
              height={750}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-gray-300">
              Release Date:{" "}
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>
            <p className="leading-relaxed">{movie.overview}</p>
            <Button
              onClick={toggleFavorite}
              className={`w-64 mt-4 ${
                isFavorite
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </div>

        {/* Recomendaciones */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recommended Movies</h2>
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <AnimatePresence>
                {recommendations.map((rec, idx) => (
                  <motion.div
                    key={rec.id}
                    custom={idx}
                    variants={recVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link href={`/movie/${rec.id}`}>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="relative w-full aspect-[2/3] bg-gray-700">
                            <Image
                              src={
                                rec.poster_path
                                  ? `${Config.IMAGE_BASE_URL}${rec.poster_path}`
                                  : "/placeholder.png"
                              }
                              alt={rec.title}
                              fill
                              className="object-cover rounded-t"
                              unoptimized
                            />
                          </div>
                          <p className="text-center text-white p-2 truncate">
                            {rec.title}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-gray-400">No recommendations available.</p>
          )}
        </section>
      </motion.div>
    </div>
  );
}
