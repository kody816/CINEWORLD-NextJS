import cheerio from "cheerio";
import fetch from "node-fetch";

export async function searchDownloadWella(title) {
  try {
    const query = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "+");
    const searchUrl = `https://downloadwella.com/?s=${query}`;
    const res = await fetch(searchUrl);
    const html = await res.text();

    const $ = cheerio.load(html);
    const links = [];

    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (href && href.endsWith(".mkv.html") && href.includes("downloadwella.com")) {
        links.push(href);
      }
    });

    return links.length > 0 ? links[0] : null;
  } catch (err) {
    console.error("Wella scrape failed:", err);
    return null;
  }
}
