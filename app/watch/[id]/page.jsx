// app/watch/[id]/page.jsx
"use client";
import React, { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const fetchMediaDetails = async (id) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
  if (res.ok) return { ...(await res.json()), type: "movie" };

  const tvRes = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
  if (tvRes.ok) return { ...(await tvRes.json()), type: "tv" };

  throw new Error("Failed to fetch media details.");
};

export default function WatchPage({ params }) {
  const { id } = params;
  const [media, setMedia] = useState(null);
  const [streamUrl, setStreamUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const data = await fetchMediaDetails(id);
        setMedia(data);

        // LulaCloud/GokuCloud/SoraStream-style sources
        const embedId = data.imdb_id || id;
        const stream = `https://multiembed.mov/?video_id=${embedId}&tmdb=1`;
        const download = `https://pahe.lulacloud.one/d/${embedId}`; // Adjust if different

        setStreamUrl(stream);
        setDownloadUrl(download);
      } catch (err) {
        console.error(err);
      }
    };

    loadMedia();
  }, [id]);

  if (!media) return <div className="p-4 text-white">Loading...</div>;

  const { title, name, overview, release_date, genres, vote_average } = media;

  return (
    <div className="p-4 max-w-screen-lg mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2">{title || name}</h1>
      <div className="text-sm text-gray-400 mb-4">
        {release_date?.slice(0, 4)} • {vote_average?.toFixed(1)}⭐ •{" "}
        {genres?.map((g) => g.name).join(", ")}
      </div>

      {streamUrl ? (
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <iframe
            src={streamUrl}
            allowFullScreen
            className="w-full h-full rounded-md"
          />
        </div>
      ) : (
        <div className="text-red-400 mb-6">Streaming not available</div>
      )}

      <p className="text-light-white mb-6">{overview}</p>

      <div className="flex flex-wrap gap-4">
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-black px-5 py-2 rounded font-semibold hover:bg-yellow-400 transition"
          >
            ⬇ Download
          </a>
        )}

        <button
          onClick={() => {
            const favKey = `cine-fav-${media.id}`;
            const data = {
              id: media.id,
              title: title || name,
              poster: media.poster_path,
              type: media.type,
            };
            localStorage.setItem(favKey, JSON.stringify(data));
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
