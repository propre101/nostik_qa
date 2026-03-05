"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Paddle: {
      Initialize: (config: {
        token: string;
        environment?: string;
      }) => void;
      Checkout: {
        open: (config: {
          items: { priceId: string; quantity: number }[];
          customData?: Record<string, string>;
          settings?: {
            successUrl?: string;
            displayMode?: string;
            theme?: string;
          };
        }) => void;
      };
    };
  }
}

export function PaddleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (document.getElementById("paddle-js")) return;

    const script = document.createElement("script");
    script.id = "paddle-js";
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      window.Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV || "sandbox",
      });
    };
    document.head.appendChild(script);
  }, []);

  return <>{children}</>;
}
