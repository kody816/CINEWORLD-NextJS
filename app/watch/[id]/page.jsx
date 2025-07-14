"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import FavoriteButton from "../../../components/icons/FavoriteButton";

export default function WatchPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
        const data = await res.json();
        setMovie(data);

        const similar = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`);
        const simData = await similar.json();
        setRelated(simData.results || []);
      } catch (err) {
        console.error("Error loading movie:", err);
      }
    }

    fetchMovie();
  }, [id, apiKey]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="text-white pt-0">
      {/* Hero Banner */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-screen">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 flex flex-col justify-end">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
          <div className="text-sm md:text-base text-neutral-300 mb-3 flex flex-wrap gap-4">
            <span>{movie.release_date?.split("-")[0]}</span>
            <span>{Math.round(movie.vote_average * 10) / 10}/10</span>
            <span>{movie.genres?.map(g => g.name).join(", ")}</span>
          </div>
          <p className="max-w-2xl text-sm md:text-base text-neutral-200 mb-4 line-clamp-4">{movie.overview}</p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://vidsrc.to/embed/movie/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-md font-semibold transition"
            >
              Stream
            </a>
            <a
              href={`https://dl.vidsrc.vip/movie/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-md font-semibold transition"
            >
              Download
            </a>
            <FavoriteButton movie={movie} />
          </div>
        </div>
      </div>

      {/* Embed Player */}
      <div className="aspect-video mt-6 px-4">
        {id ? (
          <iframe
            src={`https://vidsrc.to/embed/movie/${id}`}
            allowFullScreen
            className="w-full h-full rounded-md border border-neutral-800"
          />
        ) : (
          <div className="text-center text-neutral-400">Video not available</div>
        )}
      </div>

      {/* Related Movies */}
      {related.length > 0 && (
        <div className="mt-10 px-4">
          <h2 className="text-2xl font-bold mb-4">Related Movies</h2>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {related.map((movie) => (
              <a
                key={movie.id}
                href={`/watch/${movie.id}`}
                className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[20%] lg:w-[16%] hover:opacity-80 transition"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-md"
                />
                <p className="text-sm mt-1">{movie.title}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
