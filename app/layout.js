import "./globals.css";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import BottomNav from "../components/layout/BottomNav";

export const metadata = {
  title: "CineWorld",
  description: "Stream movies, series and animations instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">

        {/* Heading at top */}
        <header className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-yellow-400">Mololuwa Adenaya</h1>
        </header>

        {/* Main content fills available space */}
        <main className="flex-grow">
          <LayoutWrapper>{children}</LayoutWrapper>
        </main>

        {/* Bottom navigation bar */}
        <footer>
          <BottomNav />
        </footer>

      </body>
    </html>
  );
}
