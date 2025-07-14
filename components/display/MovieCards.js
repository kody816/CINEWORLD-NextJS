"use client";

import Link from "next/link";
import Image from "next/image";

export default function MovieCards({ results }) {
  if (!results || results.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">No results found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {results.map((movie) => (
        <Link
          key={movie.id}
          href={`/watch/${movie.id}`}
          className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-yellow-500 transition-shadow duration-300"
        >
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-poster.png"
            }
            alt={movie.title || movie.name}
            width={500}
            height={750}
            className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent px-2 py-1">
            <h2 className="truncate text-sm font-semibold text-yellow-400">
              {movie.title || movie.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
