import cheerio from "cheerio";

export async function searchDownloadWella(title) {
  const query = encodeURIComponent(title);
  const searchUrl = `https://downloadwella.com/?s=${query}`;

  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) return null;

  const html = await searchRes.text();
  const $ = cheerio.load(html);
  const links = $("a")
    .map((i, el) => $(el).attr("href"))
    .get()
    .filter((link) => link && link.includes(".mkv.html"));

  return links.length > 0 ? links[0] : null;
}
