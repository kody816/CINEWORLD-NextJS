import { searchDownloadWella } from "@/lib/searchDownloadWella";

export async function GET(request, { params }) {
  const { id } = params;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
    const tmdbData = await tmdbRes.json();

    const title = tmdbData?.title;
    if (!title) throw new Error("TMDb title not found");

    const wellaLink = await searchDownloadWella(title);
    if (wellaLink) {
      return Response.redirect(wellaLink, 302);
    }

    // Fallback to Vidsrc
    return Response.redirect(`https://dl.vidsrc.vip/movie/${id}`, 302);
  } catch (err) {
    console.error("Download route error:", err);
    return new Response("Download link not found", { status: 404 });
  }
}
