import type { Metadata } from "next";
import { Montserrat_Subrayada, Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./Web3Provider";

const monstrerat = Montserrat_Subrayada({
  weight: "400",
});

const inter = Inter({
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hertanate",
  description: "",
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
