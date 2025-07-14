"use client";
import Link from "next/link";
import MovieCards from "./display/MovieCards";

export default function MediaRow({ title, items, type, link }) {
  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href={link} className="text-primary text-sm hover:underline">
          View all →
        </Link>
      </div>
      <MovieCards items={items} type={type} />
    </section>
  );
}
