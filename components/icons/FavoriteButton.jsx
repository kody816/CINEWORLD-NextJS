"use client";
import { useEffect, useState } from "react";

export default function FavoriteButton({ movie }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorited(stored.some((m) => m.id === movie.id));
  }, [movie]);

  const toggleFavorite = () => {
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
      className={`px-4 py-2 rounded ${
        isFavorited ? "bg-yellow-500 text-black" : "bg-neutral-700 text-white"
      }`}
    >
      {isFavorited ? "Favorited" : "Add to Favorites"}
    </button>
  );
}
