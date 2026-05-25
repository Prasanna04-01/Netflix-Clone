import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Nexora — Cinematic Streaming Platform",
    template: "%s | Nexora",
  },
  description: "Modern streaming platform experience built with Next.js, TypeScript, Tailwind CSS, and TMDB API.",
  keywords: ["streaming", "movies", "tv shows", "Nexora", "entertainment", "cinematic"],
  authors: [{ name: "Nexora Team" }],
  openGraph: {
    title: "Nexora — Cinematic Streaming Platform",
    description: "Modern streaming platform experience built with Next.js, TypeScript, Tailwind CSS, and TMDB API.",
    url: "https://nexora-streaming.vercel.app",
    siteName: "Nexora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora — Cinematic Streaming Platform",
    description: "Modern streaming platform experience built with Next.js, TypeScript, Tailwind CSS, and TMDB API.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
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
          "min-h-screen bg-nexora-black text-white antialiased selection:bg-nexora-red/30 selection:text-white"
        )}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
