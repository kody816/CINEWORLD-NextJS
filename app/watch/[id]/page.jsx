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

  const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
  if (movieRes.ok) return { ...(await movieRes.json()), type: "movie" };

  const tvRes = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
  if (tvRes.ok) return { ...(await tvRes.json()), type: "tv" };

  throw new Error("Media not found");
}

export default function WatchPage({ params }) {
  const { id } = params;
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(false);
  const [streamOpen, setStreamOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMedia(id);
        setMedia(data);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    load();
  }, [id]);

  if (error) {
    return (
      <div className="text-white text-center p-6">
        <h2 className="text-2xl font-bold">Something went wrong while loading.</h2>
        <p className="text-light-white">Try a different title or check your network.</p>
      </div>
    );
  }
  if (!media) {
    return <div className="text-white p-6">Loading...</div>;
  }

  const title = media.title || media.name;
  const slug = slugify(title);
  const year = (media.release_date || media.first_air_date)?.split("-")[0] || "N/A";
  const rating = media.vote_average?.toFixed(1) || "N/A";
  const genres = media.genres?.map((g) => g.name).join(", ") || "N/A";
  const overview = media.overview || "No description available.";
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "/default-poster.png";

  const streamUrl = `https://www.lulacloud.co/movie/${slug}`;
  const downloadUrl = `https://dl.vidsrc.vip/movie/${id}`;

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-[#1c1c1e] rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={posterUrl} alt={title} className="w-full md:w-1/3 rounded-lg" />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <div className="text-light-white text-sm mb-4">
            {year} • {genres} • ⭐ {rating}
          </div>
          <p className="text-light-white leading-relaxed mb-6">{overview}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            {streamUrl && (
              <button
                onClick={() => setStreamOpen(!streamOpen)}
                className={`px-5 py-3 rounded font-semibold ${
                  streamOpen ? "bg-yellow-400 text-black" : "bg-primary text-black"
                }`}
              >
                {streamOpen ? "Hide Player" : "▶ Play Stream"}
              </button>
            )}
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-300 transition"
              >
                ⬇ Download
              </a>
            )}
            <button
              onClick={() => {
                const key = `cine-fav-${media.id}`;
                const fav = {
                  id: media.id,
                  title,
                  poster: media.poster_path,
                  type: media.type,
                };
                localStorage.setItem(key, JSON.stringify(fav));
                alert("Added to favorites!");
              }}
              className="px-5 py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition"
            >
              ❤️ Favorite
            </button>
          </div>

          {streamOpen && (
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                src={streamUrl}
                allowFullScreen
                className="w-full h-full rounded-md border-2 border-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
