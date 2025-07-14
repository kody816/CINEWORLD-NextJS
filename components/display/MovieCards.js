"use client";
import React from "react";
import { useRouter } from "next/navigation";

const MovieCards = ({ movie }) => {
  const router = useRouter();
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  return (
    <div
      className="min-w-[130px] md:min-w-[160px] lg:min-w-[180px] cursor-pointer"
      onClick={() => router.push(`/watch/${movie.id}`)}
    >
      <img
        src={image}
        alt={movie.title || movie.name}
        className="rounded-md hover:scale-105 transition"
      />
      <h3 className="text-white text-sm mt-1 line-clamp-1">
        {movie.title || movie.name}
      </h3>
    </div>
  );
};

export default MovieCards;
