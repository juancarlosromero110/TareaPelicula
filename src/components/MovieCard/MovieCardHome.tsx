"use client";

import { Card, CardContent } from "@/components/ui/card";
import Config from "@/config";
import Link from "next/link";
import Image from "next/image";

interface MovieCardHomeProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date?: string;
    vote_average?: number;
  };
  href?: string;
}

export const MovieCardHome = ({ movie, href }: MovieCardHomeProps) => {
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "Sin fecha";

  const content = (
    <Card
      className="
      bg-black
      overflow-hidden
      transition-transform hover:scale-105
      rounded-2xl
      shadow-xl
      hover:shadow-2xl
      text-sm w-full
    "
    >
      <CardContent className="p-2 text-center flex flex-col">
        {/* Poster */}
        <div className="w-full aspect-[2/3] overflow-hidden rounded-lg">
          <Image
            src={`${Config.IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            width={192}
            height={288}
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="mt-3 flex-1 flex flex-col justify-between">
          <p className="font-semibold text-sm line-clamp-2 text-white">
            {movie.title}
          </p>
          <p className="text-xs text-gray-400">{releaseDate}</p>
          {movie.vote_average !== undefined && (
            <p className="text-xs mt-1 text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};
