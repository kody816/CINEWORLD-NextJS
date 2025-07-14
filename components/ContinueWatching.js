"use client";
import React, { useEffect, useState } from "react";
import MovieCards from "./display/MovieCards";

export default function ContinueWatching() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("cine-fav-")
    );
    const data = keys.map((key) => JSON.parse(localStorage.getItem(key)));
    setItems(data.reverse());
  }, []);

  if (!items.length) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Continue Watching</h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {items.map((item) => (
          <MovieCards key={item.id} movie={item} type={item.type} />
        ))}
      </div>
    </div>
  );
}
