"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <main className="min-h-screen px-4 pb-20 pt-6 bg-gradient-to-t from-[#141414] to-[#080808] text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">
          You haven’t favorited any movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {favorites.map((movie) => (
            <Link
              key={movie.id}
              href={`/watch/${movie.id}`}
              className="group relative block rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500 transition-shadow duration-300"
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
      )}
    </main>
  );
}
