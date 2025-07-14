"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-[#141414] text-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-primary">
        CineWorld
      </Link>

      <div className="flex gap-6 text-sm font-medium">
        <NavLink href="/" label="Home" pathname={pathname} />
        <NavLink href="/search" label="Search" pathname={pathname} />
        <NavLink href="/discover" label="Discover" pathname={pathname} />
        <NavLink href="/favorites" label="Favorites" pathname={pathname} />
        <NavLink href="/genres" label="Genres" pathname={pathname} />
      </div>
    </nav>
  );
}

function NavLink({ href, label, pathname }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`transition hover:text-primary ${
        isActive ? "text-primary" : ""
      }`}
    >
      {label}
    </Link>
  );
}
