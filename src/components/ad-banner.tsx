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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    
    const doc = iframeRef.current.contentWindow?.document;
    if (!doc) return;
    
    // Check if we already initialized to avoid React Strict Mode double-runs
    if (doc.getElementById("adsterra-script")) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              background: transparent; 
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          <script id="adsterra-script" type="text/javascript">
            atOptions = {
              'key' : '${dataKey}',
              'format' : '${format}',
              'height' : ${height},
              'width' : ${width},
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/${dataKey}/invoke.js"></script>
        </body>
      </html>
    `);
    doc.close();
  }, [dataKey, format, height, width]);

  return (
    <div className={`flex flex-col items-center justify-center my-4 w-full ${className || ""}`}>
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1">
        Ad
      </span>
      <iframe
        ref={iframeRef}
        width={width}
        height={height}
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
        scrolling="no"
        frameBorder="0"
        style={{ border: "none", display: "block", width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}
