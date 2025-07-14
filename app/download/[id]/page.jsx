"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DownloadPage({ params }) {
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const downloadUrl = `https://dl.vidsrc.vip/movie/${id}`;
    const timer = setTimeout(() => {
      // Start download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = ""; // Let browser handle filename
      link.click();

      // Optionally return user to homepage or stay on page
      // router.push("/");
    }, 1000); // Delay slightly before triggering

    return () => clearTimeout(timer);
  }, [id, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-6">
      <h1 className="text-2xl font-bold mb-4">Preparing Your Download...</h1>
      <p className="text-neutral-400">Your download will start shortly. If it doesn’t, <a href={`https://dl.vidsrc.vip/movie/${id}`} className="text-yellow-400 underline">click here</a>.</p>
    </div>
  );
}
