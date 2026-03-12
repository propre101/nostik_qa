import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/session-provider";
import { GlobalAds } from "@/components/global-ads";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hicham Nostik Live — Q&A",
  description:
    "Ask your questions anonymously for Hicham Nostik Live. Your identity stays hidden.",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased pb-20 md:pb-0 relative min-h-screen`}
      >
        <SessionProvider>{children}</SessionProvider>
        <GlobalAds />
      </body>
    </html>
  );
}
