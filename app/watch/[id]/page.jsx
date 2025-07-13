"use client";
import React, { useEffect, useState } from "react";

const getData = async (id) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
  if (res.ok) return { ...(await res.json()), type: "movie" };

  const tvRes = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
  if (tvRes.ok) return { ...(await tvRes.json()), type: "tv" };

  throw new Error("Media not found");
};

export default function WatchPage({ params }) {
  const { id } = params;
  const [media, setMedia] = useState(null);
  const [source, setSource] = useState("archive");
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getData(id);
        setMedia(data);
      } catch (err) {
        setError("Could not fetch movie details.");
      }
    };
    load();
  }, [id]);

  if (error) return <div className="p-4 text-white">{error}</div>;
  if (!media) return <div className="p-4 text-white">Loading...</div>;

  const title = media.title || media.name;
  const overview = media.overview;
  const poster = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "https://i.imgur.com/wjVuAGb.png";

  // Archive.org streaming fallback logic
  const archiveId = media.imdb_id || title?.toLowerCase()?.replace(/\s+/g, "-");
  const archiveEmbed = `https://archive.org/embed/${archiveId}`;
  const archiveDownload = `https://archive.org/download/${archiveId}/${archiveId}.mp4`;

  const publicDomainTorrent = `https://publicdomaintorrents.info/movie/${archiveId}`;
  const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}+full+movie`;
  const tubiLink = `https://tubitv.com/search/${encodeURIComponent(title)}`;
  const crackleLink = `https://www.crackle.com/search/${encodeURIComponent(title)}`;
  const plutoLink = `https://pluto.tv/search/${encodeURIComponent(title)}`;

  return (
    <div className="p-4 max-w-screen-lg mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img src={poster} alt={title} className="rounded-lg w-full md:w-1/3" />

        <div className="md:w-2/3">
          <p className="mb-4 text-light-white">{overview || "No description available."}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            {source === "archive" && (
              <iframe
                src={archiveEmbed}
                className="w-full h-[360px] rounded-lg border"
                allowFullScreen
              />
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Switch sources */}
            <button
              onClick={() => setSource("archive")}
              className="bg-primary text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
            >
              📺 Watch via Archive.org
            </button>

            <a
              href={archiveDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              ⬇ Download (Archive)
            </a>

            <a
              href={publicDomainTorrent}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              🎞 PublicDomainTorrents
            </a>

            <a
              href={youtubeSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              ▶ Watch on YouTube
            </a>

            {/* Optional streaming links */}
            <a href={tubiLink} target="_blank" rel="noopener noreferrer" className="underline text-sm">
              🔎 Check Tubi
            </a>
            <a href={crackleLink} target="_blank" rel="noopener noreferrer" className="underline text-sm">
              🔎 Check Crackle
            </a>
            <a href={plutoLink} target="_blank" rel="noopener noreferrer" className="underline text-sm">
              🔎 Check Pluto TV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
