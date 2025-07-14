"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  SearchIcon,
  FireIcon,
  HeartIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/discover", label: "Discover", icon: FireIcon },
  { href: "/favorites", label: "Favorites", icon: HeartIcon },
  { href: "/genres", label: "Genres", icon: ViewGridIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#141414] text-white border-t border-neutral-800 z-50 md:hidden">
      <div className="flex justify-between items-center px-4 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center flex-1 text-xs group"
            >
              <Icon
                className={`w-6 h-6 mb-1 transition-all ${
                  isActive
                    ? "text-yellow-400 scale-110"
                    : "text-neutral-400 group-hover:text-yellow-300"
                }`}
              />
              <span
                className={`${
                  isActive ? "text-yellow-400 font-medium" : "text-neutral-400"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
