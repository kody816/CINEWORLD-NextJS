"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
        const random = movies[Math.floor(Math.random() * movies.length)];
        console.log("🎬 Banner Movie Loaded:", random?.title || "None");
        setMovie(random);
      } catch (err) {
        console.error("❌ Failed to fetch banner movie", err);
      }
    }

    fetchTrendingMovie();
  }, [apiKey]);

  if (!movie) {
    console.log("🔍 Banner: No movie data available");
    return <div className="text-white p-4">Banner loading...</div>;
  }

  return (
    <div className="relative h-[60vh] mb-6 w-full rounded-lg overflow-hidden">
      {movie.backdrop_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || "Movie"}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex items-center justify-center text-white">
          No Image Available
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex flex-col justify-end p-6">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
          {movie.title}
        </h2>
        <p className="text-sm md:text-base max-w-xl text-neutral-300 mb-4 line-clamp-3">
          {movie.overview}
        </p>
        <Link
          href={`/watch/${movie.id}`}
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-md text-sm md:text-base w-fit transition"
        >
          ▶️ Watch Now
        </Link>
      </div>
    </div>
  );
}
