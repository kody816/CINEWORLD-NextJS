"use client";

import TopNav from "./TopNav";
import MobileNav from "./MobileNav";

export default function LayoutWrapper({ children }) {
  return (
    <>
      {/* App Title for Mobile + Tablet only */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-black text-yellow-400 text-xl font-extrabold px-4 py-3 z-50 flex items-center gap-2 drop-shadow-[0_0_6px_rgba(255,255,0,0.5)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-yellow-400" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Perez TV
      </div>

      {/* Desktop Top Navigation */}
      <div className="hidden lg:block">
        <TopNav />
      </div>

      {/* Page content area with header/footer offset */}
      <div className="pt-16 pb-20 lg:pt-0 lg:pb-0">
        {children}
      </div>

      {/* Bottom navigation for mobile + tablet */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  );
}
