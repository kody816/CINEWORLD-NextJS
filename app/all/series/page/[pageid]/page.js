import MovieCards from "@/components/display/MovieCards";
import Pagination from "@/components/display/Pagination";

export async function generateMetadata() {
  return {
    title: "All Trending Series - CineWorld",
    description: "Browse all trending TV series on CineWorld",
  };
}

async function getTrendingSeries(page) {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export default async function TrendingSeriesPage({ params }) {
  const page = params.pageid || 1;
  const data = await getTrendingSeries(page);
  const series = data.results || [];

  return (
    <main className="text-white px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Trending TV Series</h1>
      <MovieCards results={series} />
      <Pagination currentPage={parseInt(page)} totalPages={data.total_pages} basePath="/all/series/page" />
    </main>
  );
}
