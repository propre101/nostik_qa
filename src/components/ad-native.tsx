"use client";

import { useEffect, useRef } from "react";

export function AdNative({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://pl28887049.effectivegatecpm.com/598c595e20f8ed933f8421faca502f91/invoke.js";

    containerRef.current.append(script);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center my-4 w-full ${className || ""}`}>
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1">
        Ad
      </span>
      <div ref={containerRef} className="w-full flex justify-center">
        <div id="container-598c595e20f8ed933f8421faca502f91"></div>
      </div>
    </div>
  );
}
