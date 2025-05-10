import type { Metadata } from "next";
import { Montserrat_Subrayada, Inter } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
