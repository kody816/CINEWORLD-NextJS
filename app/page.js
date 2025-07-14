import MediaRow from "@/components/MediaRow";
import Banner from "@/components/Banner";
import ContinueWatching from "@/components/ContinueWatching";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function fetchMovies(endpoint) {
  const res = await fetch(endpoint, { cache: "no-store" });
  const data = await res.json();
  return data.results?.filter(item => item.poster_path) || [];
}

export default async function HomePage() {
  const [trendingMovies, trendingSeries, newReleases] = await Promise.all([
    fetchMovies(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`),
    fetchMovies(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`),
    fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`),
  ]);

  return (
    <main className="text-white">
      <Banner />
      <ContinueWatching />

      <MediaRow title="Trending Movies" media={trendingMovies.slice(0, 20)} type="movie" link="/trending-movies" />
      <MediaRow title="Trending Series" media={trendingSeries.slice(0, 20)} type="tv" link="/trending-series" />
      <MediaRow title="New Releases" media={newReleases.slice(0, 20)} type="movie" link="/new-releases" />
    </main>
  );
}
