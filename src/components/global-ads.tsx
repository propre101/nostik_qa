"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { AdBanner } from "@/components/ad-banner";
import { AdblockDetector } from "@/components/adblock-detector";

export function GlobalAds() {
  const pathname = usePathname();

  // Only show ads and detectors on the main page and success page
  if (pathname !== "/" && pathname !== "/success") {
    return null;
  }

  return (
    <>
      {/* Popunder script ONLY on success page */}
      {pathname === "/success" && (
        <Script 
          src="https://pl28887136.effectivegatecpm.com/46/71/de/4671deb8ab4d438cae52337aaa9ddb77.js" 
          strategy="afterInteractive" 
        />
      )}
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

      {/* AdBlock Detector */}
      <AdblockDetector />
    </>
  );
}
