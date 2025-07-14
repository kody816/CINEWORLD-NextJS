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

        {/* Top Heading */}
        <header className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-yellow-400">Perez TV</h1>
        </header>

        {/* Main content */}
        <main className="flex-grow">
          <LayoutWrapper>{children}</LayoutWrapper>
        </main>

        {/* Bottom navigation (only on small screens) */}
        <BottomNav />
        
      </body>
    </html>
  );
}
