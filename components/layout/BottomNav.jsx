"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  SearchIcon,
  SparklesIcon,
  HeartIcon,
  FilmIcon,
} from "@heroicons/react/solid";

const navItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Search", href: "/search", icon: SearchIcon },
  { name: "Discover", href: "/discover", icon: SparklesIcon },
  { name: "Favorites", href: "/favorites", icon: HeartIcon },
  { name: "Genres", href: "/genres", icon: FilmIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 flex justify-between px-3 py-2 z-50 hidden md:flex">
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={name}
            href={href}
            className="flex flex-col items-center flex-1 text-xs text-white"
          >
            <Icon className={`h-6 w-6 mb-1 ${isActive ? "text-yellow-400" : "text-zinc-400"}`} />
            <span className={isActive ? "text-yellow-400" : "text-zinc-400"}>{name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
