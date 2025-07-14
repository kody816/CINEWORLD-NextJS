import "./globals.css";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import BottomNav from "../components/layout/BottomNav";

export const metadata = {
  title: "Perez TV",
  description: "Stream movies, series and animations instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">

        {/* Fixed header at top */}
        <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-700 p-4 z-50">
          <h1 className="text-2xl font-bold text-yellow-400 m-0">Perez TV</h1>
        </header>

        {/* Main content with padding top to prevent overlap with fixed header */}
        <main className="pt-16 flex-grow">
          <LayoutWrapper>{children}</LayoutWrapper>
        </main>

        {/* Bottom navigation bar - visible on mobile/small tablets only */}
        <footer>
          <BottomNav />
        </footer>

      </body>
    </html>
  );
}
