import Link from "next/link";
import Image from "next/image";

export default function MovieCards({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="flex overflow-x-auto scrollbar-hide space-x-4 py-2">
      {items
        .filter((item) => item && item.poster_path)
        .map((item) => (
          <Link
            key={item.id}
            href={`/watch/${item.id}`}
            className="flex-shrink-0 w-36 md:w-44"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              width={300}
              height={450}
              className="rounded-lg hover:scale-105 transition-transform duration-200"
            />
            <p className="mt-1 text-sm text-white truncate">
              {item.title || item.name}
            </p>
          </Link>
        ))}
    </div>
  );
}
