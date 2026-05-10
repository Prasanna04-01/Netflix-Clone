import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Netflix | Stream Your Favorite Movies & Shows",
    template: "%s | Netflix",
  },
  description: "Netflix is a professional streaming platform for movies and TV shows.",
  keywords: ["streaming", "movies", "tv shows", "netflix", "entertainment"],
  authors: [{ name: "Netflix Team" }],
  openGraph: {
    title: "Netflix",
    description: "Stream Your Favorite Movies & Shows",
    url: "https://netflix.example.com",
    siteName: "Netflix",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netflix",
    description: "Stream Your Favorite Movies & Shows",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-netflix-black text-white antialiased selection:bg-netflix-red/30 selection:text-white"
        )}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
