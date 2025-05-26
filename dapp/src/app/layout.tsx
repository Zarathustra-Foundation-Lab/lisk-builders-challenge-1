import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "./Web3Provider";
import { monstrerat, inter } from "../utils/fonts";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Hertanate",
  description: "A platform for creators to receive donations in cryptocurrency",
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
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
