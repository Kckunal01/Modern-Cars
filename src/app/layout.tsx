import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import "../index.css";
import ClientWrapper from "../components/ClientWrapper";
import { PostHogProvider } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "Modern Cars | Automotive Interiors",
  description: "Premium Seat Covers and Interior Upgrades for your vehicle. Assured fitment and doorstep installation.",
  openGraph: {
    title: "Modern Cars | Automotive Interiors",
    description: "Premium Seat Covers and Interior Upgrades for your vehicle.",
    images: ["/Assets/home.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable} antialiased`}>
        <PostHogProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
