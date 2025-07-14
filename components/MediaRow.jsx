"use client";
import React from "react";
import Link from "next/link";
import MovieCards from "./display/MovieCards";

export default function MediaRow({ title, items, type, link }) {
  if (!items?.length) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {link && (
          <Link href={link} className="text-primary text-sm hover:underline">
            View all →
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {items.map((item) => (
          <MovieCards key={item.id} movie={item} type={type} />
        ))}
      </div>
    </div>
  );
}
