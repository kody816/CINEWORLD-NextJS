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
    <FavoriteButton movie={movie} />
  );
}
