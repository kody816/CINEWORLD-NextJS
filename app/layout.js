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
        <LayoutWrapper>{children}</LayoutWrapper>
        <footer>
          <BottomNav />
        </footer>
      </body>
    </html>
  );
}
