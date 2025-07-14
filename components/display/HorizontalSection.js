"use client";
import React from "react";
import MovieCards from "./MovieCards";
import Link from "next/link";

const HorizontalSection = ({ title, movies = [], link }) => {
  return (
    <section className="mb-6 px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {link && (
          <Link
            href={link}
            className="text-sm text-yellow-400 hover:underline"
          >
            View all →
          </Link>
        )}
      </div>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default HorizontalSection;
