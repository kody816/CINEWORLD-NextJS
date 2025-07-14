"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

async function getData(id) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
  if (res.ok) return { ...(await res.json()), type: "movie" };

  const tvRes = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
  if (tvRes.ok) return { ...(await tvRes.json()), type: "tv" };

  throw new Error("Failed to fetch media");
}

async function getRelated(id, type) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${apiKey}&language=en-US&page=1`;

  const res = await fetch(url);
  const json = await res.json();
  return json.results || [];
}

export default function WatchPage({ params }) {
  const { id } = params;
  const [media, setMedia] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(true);
  const [showDownload, setShowDownload] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getData(id);
        setMedia(data);

        const similar = await getRelated(id, data.type);
        setRelated(similar);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading || !media) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
        </svg>
      </div>
    );
  }

  const title = media.title || media.name;
  const year = media.release_date?.slice(0, 4) || "N/A";
  const rating = media.vote_average?.toFixed(1) || "N/A";
  const genres = media.genres?.map(g => g.name).join(", ") || "Unknown";
  const overview = media.overview || "No description available";
  const poster = media.poster_path ? `https://image.tmdb.org/t/p/w300${media.poster_path}` : "";

  const streamLink = `https://multiembed.mov/?video_id=${id}&tmdb=1`;
  const downloadLink = `https://dl.vidsrc.vip/movie/${id}`;

  return (
    <div className="p-4 max-w-screen-lg mx-auto text-white">
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        {poster && (
          <Image
            src={poster}
            alt={title}
            width={300}
            height={450}
            className="rounded-md object-cover"
          />
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <div className="text-sm text-gray-400 mb-4">
            <span className="mr-3">📅 {year}</span>
            <span className="mr-3">⭐ {rating}</span>
            <span>🎭 {genres}</span>
          </div>

          <p className="text-light-white mb-4">{overview}</p>

          <div className="flex flex-wrap gap-4">
            {showPlayer && (
              <button
                onClick={() => setShowPlayer(true)}
                className="bg-primary text-black px-5 py-2 rounded font-semibold hover:bg-yellow-400 transition"
              >
                ▶️ Stream
              </button>
            )}

            {showDownload && (
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-200 transition"
              >
                ⬇️ Download
              </a>
            )}

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
        </div>
      </div>

      {/* Player */}
      {showPlayer && (
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <iframe
            src={streamLink}
            allowFullScreen
            className="w-full h-full rounded-md"
            onError={() => setShowPlayer(false)}
          />
        </div>
      )}

      {/* Related Movies */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {related.slice(0, 10).map((movie) => (
              <Link key={movie.id} href={`/watch/${movie.id}`}>
                <div className="bg-[#1c1c1c] rounded-md overflow-hidden hover:scale-105 transition">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "https://i.imgur.com/wjVuAGb.png"
                    }
                    alt={movie.title || movie.name}
                    width={200}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                  <p className="p-2 text-sm text-white truncate">{movie.title || movie.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
