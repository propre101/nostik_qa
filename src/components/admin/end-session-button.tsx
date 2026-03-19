"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { endSession } from "@/lib/actions";
import { useState } from "react";

export function EndSessionButton({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Button 
      variant="outline" 
      size="sm"
      className="text-[11px] font-semibold text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-500 h-7 px-3"
      disabled={loading}
      onClick={async () => {
         setLoading(true);
         await endSession(sessionId);
         router.refresh();
      }}
    >
      {loading ? "Ending..." : "End Live Session"}
    </Button>
  );
}
