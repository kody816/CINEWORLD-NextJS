"use client";

import TopNav from "./TopNav";
import MobileNav from "./MobileNav";
import BottomNav from "./BottomNav";

export default function LayoutWrapper({ children }) {
  return (
    <>
      {/* 📺 Perez TV only on mobile & tablet */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-black text-yellow-400 text-xl font-extrabold px-4 py-3 z-50 flex items-center gap-2 drop-shadow-[0_0_6px_rgba(255,255,0,0.5)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-yellow-400" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Perez TV
      </div>

      {/* Top Nav on desktop only */}
      <div className="hidden lg:block">
        <TopNav />
      </div>

      {/* Main content (offset for header/footer) */}
      <div className="pt-16 pb-20 lg:pt-0 lg:pb-0">
        {children}
      </div>

      {/* Mobile nav (phones only) */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Tablet nav (iPad etc) */}
      <div className="hidden md:flex lg:hidden">
        <BottomNav />
      </div>
    </>
  );
}
