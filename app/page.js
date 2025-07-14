import HeroBanner from "@/components/display/HeroBanner";
import HorizontalSection from "@/components/display/HorizontalSection";
import ContinueWatching from "@/components/display/ContinueWatching";
import Title from "@/components/title/Title";

async function getSection(url) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3${url}?api_key=${apiKey}&language=en-US`
  );
  const data = await res.json();
  return data.results?.slice(0, 10) || []; // limit each section to 10 items
}

export default async function Home() {
  const [trendingMovies, trendingSeries, newReleases] = await Promise.all([
    getSection("/trending/movie/week"),
    getSection("/trending/tv/week"),
    getSection("/movie/now_playing"),
  ]);

  const featured = trendingMovies[0];

  return (
    <div className="h-auto w-full">
      {/* Hero Banner */}
      <HeroBanner movie={featured} />

      {/* Continue Watching */}
      <div className="px-4 sm:px-6 lg:px-10 mt-6">
        <ContinueWatching />
      </div>

      {/* Homepage Title */}
      <div className="px-4 sm:px-6 lg:px-10">
        <Title />
      </div>

      {/* Trending Movies */}
      <div className="px-4 sm:px-6 lg:px-10">
        <HorizontalSection
          title="Trending Movies"
          movies={trendingMovies}
          link="/trending/movie"
        />
      </div>

      {/* Trending Series */}
      <div className="px-4 sm:px-6 lg:px-10">
        <HorizontalSection
          title="Trending Series"
          movies={trendingSeries}
          link="/trending/tv"
        />
      </div>

      {/* New Releases */}
      <div className="px-4 sm:px-6 lg:px-10 pb-8">
        <HorizontalSection
          title="New Releases"
          movies={newReleases}
          link="/new-releases"
        />
      </div>
    </div>
  );
}
