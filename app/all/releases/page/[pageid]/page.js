import MovieCards from "@/components/display/MovieCards";
import Pagination from "@/components/display/Pagination";

export async function generateMetadata() {
  return {
    title: "All New Releases - CineWorld",
    description: "Browse the latest movie releases on CineWorld",
  };
}

async function getNewReleases(page) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export default async function NewReleasesPage({ params }) {
  const page = params.pageid || 1;
  const data = await getNewReleases(page);
  const movies = data.results || [];

  return (
    <main className="text-white px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">New Releases</h1>
      <MovieCards results={movies} />
      <Pagination currentPage={parseInt(page)} totalPages={data.total_pages} basePath="/all/releases/page" />
    </main>
  );
}
