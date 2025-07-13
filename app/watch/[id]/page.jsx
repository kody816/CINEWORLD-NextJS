// app/watch/[id]/page.jsx
import Image from "next/image";
import React from "react";

async function getData(id) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );

  if (movieRes.ok) {
    const data = await movieRes.json();
    return { ...data, type: "movie" };
  }

  const tvRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
  );
  if (tvRes.ok) {
    const data = await tvRes.json();
    return { ...data, type: "tv" };
  }

  throw new Error("Failed to fetch media");
}

export default async function WatchPage({ params }) {
  const { id } = params;
  const media = await getData(id);

  const title = media.title || media.name;
  const poster = media.poster_path
    ? `https://image.tmdb.org/t/p/w342${media.poster_path}`
    : "https://i.imgur.com/wjVuAGb.png";

  const genres = media.genres?.map((g) => g.name).join(", ");
  const release = media.release_date || media.first_air_date;
  const rating = media.vote_average?.toFixed(1);
  const runtime = media.runtime || `${media.number_of_seasons} Season(s)`;
  const overview = media.overview || "No description available.";

  const streamURL =
    media.type === "movie"
      ? `https://vidsrc.me/embed/movie/${id}`
      : `https://vidsrc.me/embed/tv/${id}`;

  const downloadURL =
    media.type === "movie"
      ? `https://vidsrc.me/download/movie/${id}`
      : `https://vidsrc.me/download/tv/${id}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="hidden md:block">
          <Image
            src={poster}
            alt={title}
            width={400}
            height={600}
            className="rounded-md"
            unoptimized
          />
        </div>

        {/* Info and Stream */}
        <div className="md:col-span-2">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src={streamURL}
              allowFullScreen
              className="w-full h-full rounded-md"
            />
          </div>

          <div className="mb-4 space-y-2">
            <p><span className="font-semibold text-primary">Genres:</span> {genres}</p>
            <p><span className="font-semibold text-primary">Release Date:</span> {release}</p>
            <p><span className="font-semibold text-primary">Rating:</span> ⭐ {rating}</p>
            <p><span className="font-semibold text-primary">Runtime:</span> {runtime}</p>
          </div>

          <p className="mb-6 text-light-white leading-relaxed">{overview}</p>

          <div className="flex flex-wrap gap-4">
            <a
              href={downloadURL}
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
                  title: media.title || media.name,
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
    </div>
  );
}
