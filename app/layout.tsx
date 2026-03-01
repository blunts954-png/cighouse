import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";

import "./globals.css";

const displayFont = Orbitron({
  subsets: ["latin"],
  variable: "--font-display"
});

const bodyFont = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Cigarette House | Olive Drive Bakersfield",
  description:
    "Cigarette House is a 21+ smoke and vape shop on Olive Drive in Bakersfield with late-night convenience and broad product selection."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-night text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
