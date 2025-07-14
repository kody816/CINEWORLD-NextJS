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

  if (favorites.length === 0) {
    return (
      <div className="text-center py-10 text-neutral-400">
        You haven’t favorited any movies yet.
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Your Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <Link
            key={movie.id}
            href={`/watch/${movie.id}`}
            className="block group relative overflow-hidden rounded-lg"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
              width={500}
              height={750}
              className="w-full h-auto object-cover group-hover:opacity-80 transition"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm p-2 truncate">
              {movie.title || movie.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
