import "./globals.css";
import LayoutWrapper from "../components/layout/LayoutWrapper";

export const metadata = {
  title: "Perez TV",
  description: "Stream movies, series and animations instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
