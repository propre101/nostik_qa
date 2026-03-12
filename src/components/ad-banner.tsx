"use client";

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
  // Using srcDoc allows the iframe to render its own document context immediately.
  // This bypasses Next.js blocking `document.write` that Adsterra's invoke.js relies on,
  // and avoids React Strict Mode double-rendering issues.
  const srcDoc = `
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
        <script type="text/javascript">
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
  `;

  return (
    <div className={`flex flex-col items-center justify-center my-4 w-full ${className || ""}`}>
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1">
        Ad
      </span>
      <iframe
        srcDoc={srcDoc}
        width={width}
        height={height}
        scrolling="no"
        frameBorder="0"
        title={`Adsterra ${width}x${height}`}
        style={{ border: "none", display: "block", width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}
