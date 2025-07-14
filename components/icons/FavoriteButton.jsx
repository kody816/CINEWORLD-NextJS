"use client";
import { useEffect, useState } from "react";

export default function FavoriteButton({ movie }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!movie?.id) return;
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(stored.some((m) => m.id === movie.id));
  }, [movie?.id]);

  const toggleFavorite = () => {
    if (!movie?.id) return;
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = stored.find((m) => m.id === movie.id);
    let updated;

    if (exists) {
      updated = stored.filter((m) => m.id !== movie.id);
      setIsFavorited(false);
    } else {
      updated = [...stored, movie];
      setIsFavorited(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`px-6 py-2 rounded-md font-semibold transition border ${
        isFavorited
          ? "bg-yellow-400 text-black border-yellow-400"
          : "bg-transparent text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
      }`}
    >
      {isFavorited ? "Favorited" : "Add to Favorites"}
    </button>
  );
}
