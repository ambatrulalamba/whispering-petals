import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whispering Petals",
  description: "Botanical watercolor gallery",
icons: {
    icon: 'icon.png', //  иконка
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}