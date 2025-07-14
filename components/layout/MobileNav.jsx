"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  FireIcon,
  HeartIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/search", label: "Search", icon: MagnifyingGlassIcon },
  { href: "/discover", label: "Discover", icon: FireIcon },
  { href: "/favorites", label: "Favorites", icon: HeartIcon },
  { href: "/genres", label: "Genres", icon: Squares2X2Icon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#111] text-white border-t border-neutral-800 z-50 flex justify-around py-2 backdrop-blur-md">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`group flex flex-col items-center justify-center gap-1 text-xs transition-all duration-150 ease-in-out ${
              isActive ? "text-yellow-400" : "text-neutral-400"
            } hover:text-yellow-300 active:scale-90`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[11px]">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
