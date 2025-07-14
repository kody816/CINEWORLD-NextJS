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

  return (
    <div className="bg-yellow-900/90 text-white p-6 rounded-md mt-4 text-center space-y-2">
      <div className="text-lg font-semibold">🧪 Banner Debug Box</div>
      {movie ? (
        <>
          <div>🎬 Movie: <strong>{movie.title}</strong></div>
          <div>🖼 Image: {movie.backdrop_path ? "✅ Yes" : "❌ No"}</div>
          <div>📝 Overview: {movie.overview?.slice(0, 60)}...</div>
        </>
      ) : (
        <div>❌ No movie loaded</div>
      )}
    </div>
  );
}
