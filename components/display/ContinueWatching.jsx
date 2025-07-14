"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ContinueWatching() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("cine-fav-")
    );
    const favorites = keys
      .map((key) => {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .slice(0, 10); // limit to 10
    setItems(favorites);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">Continue Watching</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {items.map((item) => (
          <Link key={item.id} href={`/watch/${item.id}`}>
            <div className="w-[120px] sm:w-[150px] flex-shrink-0">
              <Image
                src={
                  item.poster
                    ? `https://image.tmdb.org/t/p/w342${item.poster}`
                    : "https://i.imgur.com/wjVuAGb.png"
                }
                alt={item.title}
                width={150}
                height={225}
                className="rounded-md w-full h-auto object-cover"
                unoptimized
              />
              <p className="text-sm mt-1 text-white line-clamp-1">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
