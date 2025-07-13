"use client";
import React, { useEffect, useState } from "react";

async function getData(id) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // Try fetching movie
  let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
  if (res.ok) {
    const data = await res.json();
    return { ...data, type: "movie" };
  }

  // Try fetching TV
  res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
  if (res.ok) {
    const data = await res.json();
    return { ...data, type: "tv" };
  }

  throw new Error("Failed to fetch media");
}

async function getIMDbID(id, type) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.imdb_id;
}

export default function WatchPage({ params }) {
  const { id } = params;
  const [media, setMedia] = useState(null);
  const [source, setSource] = useState("vidsrc");
  const [imdbID, setImdbID] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getData(id);
        setMedia(data);
        const imdb = await getIMDbID(id, data.type);
        setImdbID(imdb);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!media || !imdbID) return <div className="p-4 text-white">Loading...</div>;

  const title = media.title || media.name;
  const overview = media.overview;

  const sources = {
    vidsrc: `https://vidsrc.to/embed/${media.type}/${imdbID}`,
    twoembed: `https://www.2embed.to/embed/imdb/${imdbID}`,
    multiembed: `https://multiembed.mov/?video_id=${imdbID}&tmdb=${id}&type=${media.type}`,
  };

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
          className={`px-4 py-2 rounded font-semibold ${
            source === "vidsrc" ? "bg-primary text-black" : "bg-white text-black"
          }`}
        >
          Stream with VidSrc
        </button>
        <button
          onClick={() => setSource("twoembed")}
          className={`px-4 py-2 rounded font-semibold ${
            source === "twoembed" ? "bg-primary text-black" : "bg-white text-black"
          }`}
        >
          Stream with 2Embed
        </button>
        <button
          onClick={() => setSource("multiembed")}
          className={`px-4 py-2 rounded font-semibold ${
            source === "multiembed" ? "bg-primary text-black" : "bg-white text-black"
          }`}
        >
          Stream with MultiEmbed
        </button>
      </div>

      <p className="text-light-white mb-6">{overview}</p>

      <button
        onClick={() => {
          const key = `cine-fav-${media.id}`;
          const data = {
            id: media.id,
            title,
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
  );
}
