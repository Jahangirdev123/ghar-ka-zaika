import "./globals.css";
import { CartProvider } from "./cart-context";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Ghar Ka Zaiqa",
  description: "Homemade Frozen Foods",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#15803d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
