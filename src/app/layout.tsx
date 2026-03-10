import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/session-provider";
import Script from "next/script";
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
    "Ask your questions anonymously for Hicham Nostik Live. Free or VIP — your identity stays hidden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Script 
          src="https://pl28887136.effectivegatecpm.com/46/71/de/4671deb8ab4d438cae52337aaa9ddb77.js" 
          strategy="afterInteractive" 
        />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
