import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Movies App description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
