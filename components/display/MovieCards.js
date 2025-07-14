import Link from "next/link";
import Image from "next/image";

export default function MovieCards({ results }) {
  if (!results || !Array.isArray(results)) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {results
        .filter((movie) => movie && movie.poster_path)
        .map((movie) => (
          <Link
            key={movie.id}
            href={`/watch/${movie.id}`}
            className="block group relative overflow-hidden rounded-lg"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
              width={500}
              height={750}
              className="w-full h-auto object-cover group-hover:opacity-80 transition"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm p-2 truncate">
              {movie.title || movie.name}
            </div>
          </Link>
        ))}
    </div>
  );
}
