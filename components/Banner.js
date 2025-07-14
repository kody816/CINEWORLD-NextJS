"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Banner() {
  const [movie, setMovie] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    async function fetchTrendingMovie() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        const data = await res.json();
        const movies = data.results || [];
        const random = movies[Math.floor(Math.random() * movies.length)];
        setMovie(random);
      } catch (err) {
        console.error("Failed to fetch banner movie", err);
      }
    }

    fetchTrendingMovie();
  }, [apiKey]);

  if (!movie) return null;

  return (
    <div className="relative h-[60vh] mb-6 w-full">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title || "Movie"}
        fill
        className="object-cover rounded-lg"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">{movie.title}</h2>
        <p className="text-sm md:text-base max-w-xl line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
}
