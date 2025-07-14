"use client";

import TopNav from "./TopNav";

export default function LayoutWrapper({ children }) {
  return (
    <>
      {/* Desktop Top Navigation only */}
      <div className="hidden lg:block">
        <TopNav />
      </div>

      {/* Main content wrapper with vertical padding */}
      <div className="pt-0 pb-20 lg:pt-0 lg:pb-0">
        {children}
      </div>

      {/* NOTE: BottomNav removed from here to avoid duplicates */}
    </>
  );
}
