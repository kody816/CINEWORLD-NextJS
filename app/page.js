"use client";
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import ContinueWatching from "../components/ContinueWatching";
import MediaRow from "../components/MediaRow";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    console.log("✅ API KEY:", apiKey); // Debugging output

    const fetchData = async () => {
      if (!apiKey) {
        console.error("❌ Missing TMDb API key!");
        return;
      }

      try {
        const [trendMoviesRes, trendTVRes, newRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`),
        ]);

        const [trendMoviesData, trendTVData, newReleaseData] = await Promise.all([
          trendMoviesRes.json(),
          trendTVRes.json(),
          newRes.json(),
        ]);

        console.log("🎬 Trending Movies:", trendMoviesData);
        console.log("📺 Trending Series:", trendTVData);
        console.log("🆕 New Releases:", newReleaseData);

        setTrendingMovies(trendMoviesData.results || []);
        setTrendingSeries(trendTVData.results || []);
        setNewReleases(newReleaseData.results || []);
      } catch (err) {
        console.error("🔥 Failed to load TMDb data:", err);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <main className="text-white px-4">
      <Banner />
      <ContinueWatching />

      <MediaRow
        title="Trending Movies"
        items={trendingMovies}
        type="movie"
        link="/trending/movies"
      />
      <MediaRow
        title="Trending Series"
        items={trendingSeries}
        type="tv"
        link="/trending/series"
      />
      <MediaRow
        title="New Releases"
        items={newReleases}
        type="movie"
        link="/new-releases"
      /><pre className="text-xs text-green-400">
  API: {apiKey ? "✅ KEY LOADED" : "❌ NO KEY"}
  {"\n"}
  Movies: {trendingMovies.length}
  {"\n"}
  Series: {trendingSeries.length}
  {"\n"}
  New: {newReleases.length}
</pre>
    </main>
  );
}
