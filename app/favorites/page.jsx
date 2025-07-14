"use client";
import { useEffect, useState } from "react";
import MovieCards from "@/components/display/MovieCards";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-neutral-400">No favorites yet.</p>
      ) : (
        <MovieCards results={favorites} />
      )}
    </div>
  );
}
