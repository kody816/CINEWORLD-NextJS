"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function MediaRow({ title, items = [], link, type }) {
  const rowRef = useRef();

  if (!items || items.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {link && (
          <Link
            href={link}
            className="text-sm text-yellow-400 flex items-center hover:underline"
          >
            View all <IoIosArrowForward className="ml-1" />
          </Link>
        )}
      </div>

      <div
        ref={rowRef}
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
      >
        {items
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Link
              key={movie.id}
              href={`/watch/${movie.id}`}
              className="min-w-[120px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] rounded-lg overflow-hidden relative group"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                width={200}
                height={300}
                className="object-cover w-full h-auto group-hover:opacity-80 transition"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 truncate">
                {movie.title || movie.name}
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
