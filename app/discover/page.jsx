"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function DiscoverPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchDiscover() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Failed to fetch discover movies:", err);
      }
    }

    fetchDiscover();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">Discover</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Link
              key={movie.id}
              href={`/watch/${movie.id}`}
              className="group relative overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto object-cover group-hover:opacity-80 transition"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-2 truncate">
                {movie.title}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
