import type { Metadata } from "next";
import { Montserrat_Subrayada, Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./Web3Provider";
import { Analytics } from "@vercel/analytics/next";

const monstrerat = Montserrat_Subrayada({
  weight: "400",
  preload: false,
});

const inter = Inter({
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  icons: "/herta_excited.jpg",
  title: "Hertanate - Blockchain-powered Creator Donation Platform",
  description:
    "Support your favorite creators with IDRX tokens. A transparent, decentralized donation platform with leaderboards and instant payouts powered by blockchain technology.",
  openGraph: {
    title: "Hertanate - Blockchain Creator Donations",
    description:
      "Empower creators through crypto donations with our decentralized platform. Simple, secure transactions with IDRX tokens.",
    images: [
      {
        url: "/hertanate-assets/hertanate-icon.svg",
        width: 800,
        height: 600,
        alt: "Hertanate Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hertanate - Donate to Creators with Crypto",
    description:
      "Support creators you love using IDRX tokens with our transparent blockchain donation platform",
    images: ["/hertanate-assets/hertanate-icon.svg"],
  },
  robots: {
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monstrerat.className} ${inter.className} antialiased`}
      >
        <Analytics />
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
