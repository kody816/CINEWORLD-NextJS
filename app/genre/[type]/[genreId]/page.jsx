import MovieCards from "@/components/display/MovieCards";

async function getGenreResults(type, genreId) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results || [];
}

export default async function GenrePage({ params, searchParams }) {
  const { type, genreId } = params;
  const genreName = searchParams?.name || "Genre";

  const results = await getGenreResults(type, genreId);

  return (
    <main className="min-h-[calc(100vh-56px)] px-4 pb-16 pt-6 bg-gradient-to-t from-[#141414] to-[#080808] text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400 capitalize">
        {genreName} ({type === "movie" ? "Movies" : "TV Series"})
      </h1>

      {results?.length > 0 ? (
        <MovieCards results={results} />
      ) : (
        <p className="text-center text-gray-400 mt-20">No results found in this genre.</p>
      )}
    </main>
  );
}
