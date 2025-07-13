"use client";
import React, { useEffect, useState } from "react";

async function getData(id) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
  if (movieRes.ok) return { ...(await movieRes.json()), type: "movie" };

  const tvRes = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
  if (tvRes.ok) return { ...(await tvRes.json()), type: "tv" };

  throw new Error("Failed to fetch media");
}

export default function WatchPage({ params }) {
  const { id } = params;
  const [media, setMedia] = useState(null);
  const [source, setSource] = useState("vidsrc");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getData(id);
        setMedia(result);
      } catch (err) {
        setError("Failed to load movie or series.");
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (error) return <div className="text-white p-4">{error}</div>;
  if (!media) return <div className="text-white p-4">Loading...</div>;

  const title = media.title || media.name;
  const overview = media.overview || "No description available.";
  const poster = media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : "";

  const sources = {
    vidsrc: media.type === "movie"
      ? `https://vidsrc.to/embed/movie/${id}`
      : `https://vidsrc.to/embed/tv/${id}`,
    twoembed: media.type === "movie"
      ? `https://www.2embed.to/embed/tmdb/movie?id=${id}`
      : `https://www.2embed.to/embed/tmdb/tv?id=${id}`
  };

  const downloadLink =
    media.type === "movie"
      ? `https://vidsrc.to/download/movie/${id}`
      : `https://vidsrc.to/download/tv/${id}`;

  return (
    <div className="p-4 max-w-screen-lg mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe
          src={sources[source]}
          allowFullScreen
          className="w-full h-full rounded-md"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => setSource("vidsrc")}
          className={`px-4 py-2 rounded font-semibold ${source === "vidsrc" ? "bg-primary text-black" : "bg-white text-black"}`}
        >
          Stream with VidSrc
        </button>
        <button
          onClick={() => setSource("twoembed")}
          className={`px-4 py-2 rounded font-semibold ${source === "twoembed" ? "bg-primary text-black" : "bg-white text-black"}`}
        >
          Stream with 2Embed
        </button>
      </div>

      <p className="text-light-white mb-6">{overview}</p>

      <div className="flex flex-wrap gap-4">
        <a
          href={downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-black px-5 py-2 rounded font-semibold hover:bg-yellow-400 transition"
        >
          ⬇ Download
        </a>
        <button
          onClick={() => {
            const key = `cine-fav-${media.id}`;
            const data = {
              id: media.id,
              title: title,
              poster: media.poster_path,
              type: media.type,
            };
            localStorage.setItem(key, JSON.stringify(data));
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
