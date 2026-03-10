import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "@/components/session-provider";
import Script from "next/script";
import { AdBanner } from "@/components/ad-banner";
import { AdblockDetector } from "@/components/adblock-detector";
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased pb-20 md:pb-0 relative min-h-screen`}
      >
        <Script 
          src="https://pl28887136.effectivegatecpm.com/46/71/de/4671deb8ab4d438cae52337aaa9ddb77.js" 
          strategy="afterInteractive" 
        />
        <SessionProvider>{children}</SessionProvider>

        {/* Sticky Mobile Footer Ad */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-background/80 backdrop-blur-sm border-t md:hidden">
          <AdBanner 
            dataKey="5d938f1c1125bd5f6c45b81fb9c59330" 
            format="iframe" 
            height={50} 
            width={320} 
            className="my-1" 
          />
        </div>

        <AdblockDetector />
      </body>
    </html>
  );
}
