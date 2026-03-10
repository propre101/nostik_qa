"use client";

import { useEffect, useState } from "react";

// A reliable, Next.js-friendly AdBlock detection method
// We attempt to fetch a faux ad script URL. AdBlockers intercept the network request.
async function checkAdBlocker(): Promise<boolean> {
  try {
    // This is a dummy request to a URL pattern universally blocked by AdBlockers
    await fetch(
      new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
        method: "HEAD",
        mode: "no-cors",
      })
    );
    // If the fetch succeeds (even opaquely with no-cors), it wasn't blocked
    return false;
  } catch (error) {
    // If the fetch throws a network error, an extension like AdBlock intercepted and killed it
    return true;
  }
}

export function AdblockDetector() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if we should ignore based on localStorage (24h) or sessionStorage (this session)
    const acceptedAt = localStorage.getItem("adblock_accepted");
    if (acceptedAt) {
      const timePassed = Date.now() - parseInt(acceptedAt, 10);
      if (timePassed < 24 * 60 * 60 * 1000) {
        return; // less than 24h passed
      }
    }

    if (sessionStorage.getItem("adblock_ignored")) {
      return; // already ignored this session
    }

    // Wait 300ms as requested, then run the network detection check
    const timer = setTimeout(() => {
      checkAdBlocker().then((isAdblockUsed) => {
        if (isAdblockUsed) {
          setShowModal(true);
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!showModal) return null;

  const handleDone = () => {
    localStorage.setItem("adblock_accepted", Date.now().toString());
    setShowModal(false);
  };

  const handleLater = () => {
    sessionStorage.setItem("adblock_ignored", "true");
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-[400px] rounded-[14px] border border-[#2a2b2f] bg-[#1a1b1e] p-6 text-[#f0f0f0] shadow-xl">
        <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
          🛑 Keep Nostik Free & Anonymous
        </h2>
        
        <div className="mb-6 space-y-4 text-sm leading-relaxed text-[#f0f0f0]/90">
          <p>It looks like you're using an ad blocker.</p>
          <p>
            This website is completely free to use, and 
            the only way to keep it running is through ads.
          </p>
          <div>
            <p className="mb-1">To disable ads just for this site:</p>
            <ul className="space-y-1 ml-1 text-muted-foreground">
              <li>→ Click the AdBlock icon in your browser</li>
              <li>
                → Turn it OFF for <span className="font-semibold text-white">nostik.vercel.app</span> only
              </li>
            </ul>
          </div>
          <p className="pt-2 font-medium">It takes 10 seconds and helps a lot 🙏</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDone}
            className="w-full rounded-lg bg-[#22c55e] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#22c55e]/90"
          >
            ✅ Done! I turned it off
          </button>
          
          <button
            onClick={handleLater}
            className="w-full rounded-lg bg-[#374151] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#374151]/90"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
