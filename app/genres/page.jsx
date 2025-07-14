"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function GenresPage() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`),
        ]);
        const [movieData, tvData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ]);
        setMovieGenres(movieData.genres || []);
        setTvGenres(tvData.genres || []);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    }

    fetchGenres();
  }, []);

  return (
    <main className="text-white px-4 pb-16">
      <h1 className="text-2xl font-bold my-4">Genres</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movieGenres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/movie/${genre.id}?name=${encodeURIComponent(genre.name)}`}
              className="bg-zinc-800 hover:bg-yellow-500 hover:text-black transition p-4 rounded text-center"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">TV Series</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tvGenres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/tv/${genre.id}?name=${encodeURIComponent(genre.name)}`}
              className="bg-zinc-800 hover:bg-yellow-500 hover:text-black transition p-4 rounded text-center"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
