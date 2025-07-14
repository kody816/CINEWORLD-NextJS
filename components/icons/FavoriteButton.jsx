"use client";
import { useEffect, useState } from "react";

export default function FavoriteButton({ movie }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!movie?.id) return;
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = stored.some((m) => m.id === movie.id);
    setIsFavorited(exists);
  }, [movie?.id]);

  const toggleFavorite = () => {
    if (!movie?.id) return;
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = stored.some((m) => m.id === movie.id);
    const updated = exists
      ? stored.filter((m) => m.id !== movie.id)
      : [...stored, movie];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorited(!exists);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-6 py-2 rounded-md font-semibold transition border ${
        isFavorited
          ? "bg-yellow-500 text-black border-yellow-500"
          : "bg-transparent text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
      }`}
    >
      {isFavorited ? "Favorited" : "Add to Favorites"}
    </button>
  );
}
