"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Search", href: "/search" },
  { label: "Favorites", href: "/favorites" },
  { label: "Genres", href: "/genres" },
];

export default function NavbarDesktop() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex justify-between items-center px-6 py-4 bg-black bg-opacity-70 text-white fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <h1 className="text-xl font-bold text-primary tracking-wide">CineWorld</h1>
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:text-primary transition ${
              pathname === item.href ? "text-primary" : "text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
