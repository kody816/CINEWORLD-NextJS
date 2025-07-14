"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        const data = await res.json();
        const randomMovie = data.results.find(item => item.backdrop_path || item.poster_path);
        setMovie(randomMovie);
      } catch (err) {
        console.error("Failed to load banner movie:", err);
      }
    };

    fetchBanner();
  }, [apiKey]);

  if (!movie) return null;

  const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`;

  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden rounded-xl">
      <Image
        src={imageUrl}
        alt={movie.title}
        fill
        priority
        className="object-cover brightness-[.45]"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">{movie.title}</h2>
        <p className="text-sm md:text-base max-w-xl line-clamp-3 md:line-clamp-4">{movie.overview}</p>
        <button
          onClick={() => router.push(`/watch/${movie.id}`)}
          className="mt-4 w-fit px-5 py-2 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
}
