import "./globals.css";
import TopNav from "../components/layout/TopNav";
import MobileNav from "../components/layout/MobileNav";

export const metadata = {
  title: "CineWorld",
  description: "Stream movies, series and animations instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Desktop Nav */}
        <div className="hidden lg:block">
          <TopNav />
        </div>

        {/* Main Page Content */}
        <div className="pb-20 lg:pb-0">{children}</div>

        {/* Mobile/Tablet Bottom Nav */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
