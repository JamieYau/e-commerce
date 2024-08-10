import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/contexts/Providers";
import Footer from "@/components/Footer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TechWave",
  description: "An open-source e-commerce store",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/ico",
        url: "/favicons/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicons/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicons/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicons/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/favicons/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <NavBar />
          <main className="flex min-h-screen w-full flex-1 flex-col items-center justify-between p-4">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
