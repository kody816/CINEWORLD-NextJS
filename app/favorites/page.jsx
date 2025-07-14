"use client";
import { useEffect, useState } from "react";
import MovieCards from "@/components/display/MovieCards";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cineworld_favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <main className="text-white px-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Your Favorites 💛</h1>

      {favorites.length > 0 ? (
        <MovieCards results={favorites} />
      ) : (
        <p className="text-gray-400">You haven’t saved any favorites yet.</p>
      )}
    </main>
  );
}
