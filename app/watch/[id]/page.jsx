"use client";
import React, { useEffect, useState } from "react";

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchMedia(id) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );

  if (movieRes.ok) {
    const movie = await movieRes.json();
    return { ...movie, type: "movie" };
  }

  const tvRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
  );

  if (tvRes.ok) {
    const tv = await tvRes.json();
    return { ...tv, type: "tv" };
  }

  throw new Error("Media not found");
}

export default function WatchPage({ params }) {
  const { id } = params;
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMedia(id);
        setMedia(data);
      } catch (err) {
        console.error("Error loading media:", err);
        setError(true);
      }
    };
    load();
  }, [id]);

  if (error)
    return (
      <div className="text-white text-center py-10 px-4">
        <h2 className="text-2xl font-bold mb-4">Something went wrong while loading the video.</h2>
        <p className="text-light-white">Please try again later or pick another title.</p>
      </div>
    );

  if (!media) return <div className="text-white p-6">Loading...</div>;

  const title = media.title || media.name;
  const slug = slugify(title);
  const year = media.release_date?.split("-")[0] || media.first_air_date?.split("-")[0] || "N/A";
  const rating = media.vote_average?.toFixed(1) || "N/A";
  const genres = media.genres?.map((g) => g.name).join(", ") || "N/A";

  const streamUrl = media.type === "movie"
    ? `https://www.lulacloud.co/movie/${slug}`
    : null;

  const downloadUrl =
    media.type === "movie"
      ? `https://dl.vidsrc.vip/movie/${id}`
      : null;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="text-sm text-light-white mb-4">
        <span>{year}</span> • <span>{genres}</span> • <span>⭐ {rating}</span>
      </div>

      {/* LulaCloud iframe */}
      {streamUrl ? (
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <iframe
            src={streamUrl}
            allowFullScreen
            className="w-full h-full rounded-md border-2 border-white"
          />
        </div>
      ) : (
        <p className="text-red-400 mb-4">Streaming unavailable for this title.</p>
      )}

      <p className="mb-6 text-light-white leading-relaxed">{media.overview}</p>

      <div className="flex flex-wrap gap-4">
        {downloadUrl ? (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black px-5 py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            ⬇ Download
          </a>
        ) : null}

        <button
          onClick={() => {
            const key = `cine-fav-${media.id}`;
            const fav = {
              id: media.id,
              title: title,
              poster: media.poster_path,
              type: media.type,
            };
            localStorage.setItem(key, JSON.stringify(fav));
            alert("Added to favorites!");
          }}
          className="bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          ❤️ Favorite
        </button>
      </div>
    </div>
  );
}
