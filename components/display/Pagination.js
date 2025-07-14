"use client";
import Link from "next/link";

export default function Pagination({ currentPage, totalPages, basePath }) {
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <div className="flex justify-between items-center mt-6">
      <Link
        href={`${basePath}/${prevPage}`}
        className={`px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition ${
          currentPage === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        ◀ Previous
      </Link>

      <span className="text-sm text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`${basePath}/${nextPage}`}
        className={`px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition ${
          currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        Next ▶
      </Link>
    </div>
  );
}
