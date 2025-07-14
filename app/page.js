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
    const fetchData = async () => {
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

        setTrendingMovies(trendMoviesData.results?.filter(i => i.poster_path) || []);
        setTrendingSeries(trendTVData.results?.filter(i => i.poster_path) || []);
        setNewReleases(newReleaseData.results?.filter(i => i.poster_path) || []);
      } catch (err) {
        console.error("Failed to load data:", err);
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
        link="/all/trending/page/1"
      />
      <MediaRow
        title="Trending Series"
        items={trendingSeries}
        type="tv"
        link="/all/series/page/1"
      />
      <MediaRow
        title="New Releases"
        items={newReleases}
        type="movie"
        link="/all/releases/page/1"
      />
    </main>
  );
}
