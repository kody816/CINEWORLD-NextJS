"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const qualities = ["480p", "720p", "1080p"];

export default function DownloadPage() {
  const { id } = useParams();
  const router = useRouter();

  const [selectedQuality, setSelectedQuality] = useState("720p");
  const [countdown, setCountdown] = useState(3);
  const [stats, setStats] = useState({
    downloads: Math.floor(Math.random() * 9000 + 1000),
    rating: (Math.random() * 2 + 7).toFixed(1), // 7.0 - 9.0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          window.location.href = `https://dl.vidsrc.vip/movie/${id}`;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
        Preparing your download...
      </h1>

      <div className="text-center mb-6">
        <p className="mb-2">Estimated Rating: ⭐ {stats.rating}</p>
        <p className="mb-4">Downloads: {stats.downloads.toLocaleString()}</p>
        <div className="flex gap-3 justify-center mb-4">
          {qualities.map((q) => (
            <button
              key={q}
              onClick={() => setSelectedQuality(q)}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                selectedQuality === q
                  ? "bg-yellow-400 text-black"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
        <p className="text-sm text-neutral-400">Selected: {selectedQuality}</p>
      </div>

      <div className="flex items-center gap-2 text-lg text-white font-semibold">
        <span>Redirecting in</span>
        <span className="text-yellow-400 text-3xl">{countdown}</span>
        <span>seconds...</span>
      </div>

      <div className="mt-6 w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
