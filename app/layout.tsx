import "./globals.css";
import Navbar from "./components/Navbar";
import BackgroundWrapper from "./components/BackgroundWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        <BackgroundWrapper>
          <Navbar />
          <main className="pt-4 px-4">{children}</main>
        </BackgroundWrapper>
      </body>
    </html>
  );
}