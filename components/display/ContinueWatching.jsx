"use client";
import React, { useEffect, useState } from "react";
import MovieCards from "./MovieCards";

const ContinueWatching = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const items = Object.keys(localStorage)
      .filter((key) => key.startsWith("cine-fav-"))
      .map((key) => JSON.parse(localStorage.getItem(key)));
    setWatchlist(items.reverse());
  }, []);

  if (!watchlist.length) return null;

  return (
    <section className="mb-6 px-4">
      <h2 className="text-xl font-semibold text-white mb-3">
        Continue Watching
      </h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {watchlist.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default ContinueWatching;
