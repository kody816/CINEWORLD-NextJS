export async function getMovieTitle(id) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch movie data");
    
    const data = await res.json();
    return data.title || null;
  } catch (err) {
    console.error("getMovieTitle error:", err);
    return null;
  }
}
