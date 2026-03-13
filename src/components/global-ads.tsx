"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const ADS_STORAGE_KEY = "last_popunder_shown";
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export function GlobalAds() {
  const pathname = usePathname();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (pathname !== "/success") {
      setShouldShow(false);
      return;
    }

    const lastShown = localStorage.getItem(ADS_STORAGE_KEY);
    const lastShownTime = lastShown ? parseInt(lastShown) : 0;
    const now = Date.now();

    if (isNaN(lastShownTime) || now - lastShownTime > TWENTY_FOUR_HOURS) {
      setShouldShow(true);
      localStorage.setItem(ADS_STORAGE_KEY, now.toString());
    } else {
      setShouldShow(false);
    }
  }, [pathname]);

  if (!shouldShow) return null;

  return (
    <Script 
      src="https://authoritieswoundjoint.com/46/71/de/4671deb8ab4d438cae52337aaa9ddb77.js" 
      strategy="afterInteractive" 
    />
  );
}
