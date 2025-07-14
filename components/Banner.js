"use client";
import React, { useEffect, useState } from "react";

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    async function fetchTrendingMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        const data = await res.json();
        const movies = data.results || [];
        const validMovies = movies.filter(
          (m) => m.backdrop_path && m.overview
        );
        const random = validMovies[Math.floor(Math.random() * validMovies.length)];
        setMovie(random);
        console.log("🎬 Banner Movie Loaded:", random?.title || "No title");
      } catch (err) {
        console.error("Failed to fetch banner movie", err);
      }
    }

    fetchTrendingMovie();
  }, [apiKey]);

  if (!movie) {
    return (
      <div className="bg-yellow-700 text-white text-center p-6 rounded-md mt-4">
        🔄 Fetching banner movie...
      </div>
    );
  }

  return (
    <div className="bg-red-500 text-white text-center p-6 rounded-md mt-4 space-y-2">
      🧪 Debug: Banner rendered successfully!
      <div>🎬 Movie: <strong>{movie.title || "No title"}</strong></div>
      <div>🖼 Image: <strong>{movie.backdrop_path ? "✅ Yes" : "❌ No"}</strong></div>
      <div>📝 Overview: {movie.overview?.slice(0, 80)}...</div>
    </div>
  );
}
