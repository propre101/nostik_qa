"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export function GlobalAds() {
  const pathname = usePathname();

  // Only show popunder on the success page
  if (pathname === "/success") {
    return (
      <Script 
        src="https://authoritieswoundjoint.com/46/71/de/4671deb8ab4d438cae52337aaa9ddb77.js" 
        strategy="afterInteractive" 
      />
    );
  }

  return null;
}
