"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, SearchIcon, FilmIcon, StarIcon, ViewGridIcon } from "@heroicons/react/outline";

const navItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Search", href: "/search", icon: SearchIcon },
  { label: "Discover", href: "/discover", icon: FilmIcon },
  { label: "Favorites", href: "/favorites", icon: StarIcon },
  { label: "Genres", href: "/genres", icon: ViewGridIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-black border-t border-zinc-800 text-white flex justify-between px-3 py-2 z-50 lg:hidden">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center text-xs ${
              isActive ? "text-yellow-400" : "text-zinc-400"
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
