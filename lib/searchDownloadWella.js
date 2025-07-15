import cheerio from "cheerio";
import { headers } from "next/headers";

export async function searchDownloadWella(title) {
  try {
    const searchQuery = title.toLowerCase().replace(/\s+/g, "+");
    const searchUrl = `https://downloadwella.com/?s=${encodeURIComponent(searchQuery)}`;

    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent": headers().get("user-agent") || "Mozilla/5.0",
        "Accept": "text/html",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Wella search failed:", res.status);
      return null;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Find links ending in .mkv.html
    const downloadLink = $("a")
      .map((_, el) => $(el).attr("href"))
      .get()
      .find(href => href && href.endsWith(".mkv.html"));

    if (downloadLink) {
      return downloadLink;
    }

    console.warn("No Wella .mkv link found for:", title);
    return null;
  } catch (err) {
    console.error("Wella scraper error:", err);
    return null;
  }
}
