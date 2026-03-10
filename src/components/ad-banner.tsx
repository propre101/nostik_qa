"use client";

import { useEffect, useRef } from "react";

export function AdBanner({
  dataKey,
  format,
  height,
  width,
  className,
}: {
  dataKey: string;
  format: string;
  height: number;
  width: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.hasChildNodes()) return; // Already initialized

    const conf = document.createElement("script");
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = `https://www.highperformanceformat.com/${dataKey}/invoke.js`;

    conf.type = "text/javascript";
    conf.innerHTML = `atOptions = {
      'key' : '${dataKey}',
      'format' : '${format}',
      'height' : ${height},
      'width' : ${width},
      'params' : {}
    };`;

    containerRef.current.append(conf);
    // Append the invoke.js script right after configuring options
    containerRef.current.append(script);
  }, [dataKey, format, height, width]);

  return (
    <div className={`flex flex-col items-center justify-center my-4 w-full ${className || ""}`}>
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1">
        Ad
      </span>
      <div 
        ref={containerRef} 
        className="flex justify-center items-center w-full"
        style={{ minHeight: height }}
      ></div>
    </div>
  );
}
