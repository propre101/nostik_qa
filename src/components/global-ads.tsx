"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
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

      {/* AdBlock Detector */}
      <AdblockDetector />
    </>
  );
}
