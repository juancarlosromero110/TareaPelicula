"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Config from "@/config";
import { motion, Variants } from "framer-motion";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average?: number;
    release_date?: string;
  };
  href?: string;
  action?: React.ReactNode;
}

// Variantes de animación
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const MovieCard = ({ movie, href, action }: MovieCardProps) => {
  const formattedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "Sin fecha";

  const card = (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-xs mx-auto"
    >
      <Card className="bg-black bg-opacity-80 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Forzamos altura fija para alargar la card */}
        <CardContent className="p-0 flex flex-col h-[28rem]">
          {/* Imagen ocupa el 75% de la altura */}
          <div className="relative w-full flex-shrink-0 h-3/4">
            <Image
              src={`${Config.IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 300px"
            />
          </div>

          {/* Datos: ocupan el resto */}
          <div className="p-4 flex flex-col justify-between flex-1 bg-gradient-to-t from-black/90 to-transparent">
            <div>
              <h3 className="font-bold text-lg leading-snug line-clamp-2 text-white">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
            </div>
            {movie.vote_average !== undefined && (
              <p className="text-yellow-400 font-medium mt-2">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            )}
            {action && <div className="mt-3">{action}</div>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return href ? <Link href={href}>{card}</Link> : card;
};
