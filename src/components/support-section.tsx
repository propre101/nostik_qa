"use client";

import { Heart } from "lucide-react";

export function SupportSection({ className }: { className?: string }) {
  return (
    <div className={`mt-12 flex flex-col items-center justify-center space-y-6 text-center w-full ${className || ""}`}>
      <p className="max-w-xs text-sm font-medium text-white">
        ✨ Enjoying this? Help keep it running!
      </p>
      
      <div className="flex flex-col items-center w-full gap-2">
        <a
          href="https://github.com/sponsors/propre101"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl active:scale-[0.98] active:shadow-md"
        >
          <Heart className="h-4 w-4 fill-current text-white" />
          <span className="text-white">Sponsor on GitHub</span>
        </a>
        {/* <span className="text-xs text-white/60">
          No pressure — every bit helps 🙏
        </span> */}
      </div>
    </div>
  );
}
