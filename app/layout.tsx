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
      <body>
        <BackgroundWrapper>
          <Navbar />
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  );
}