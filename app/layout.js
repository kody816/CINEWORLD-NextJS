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
        {/* CineWorld Banner visible on ALL screens */}
        <div className="fixed top-0 left-0 w-full bg-black text-yellow-400 text-xl font-bold px-4 py-3 z-50 shadow-md text-center">
          CineWorld
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:block mt-14"> {/* Push nav down so it doesn't clash */}
          <TopNav />
        </div>

        {/* Main Page Content with top padding to prevent banner overlap */}
        <div className="pt-20 pb-20 lg:pb-0">
          {children}
        </div>

        {/* Mobile/Tablet Bottom Nav */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
