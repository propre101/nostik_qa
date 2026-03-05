"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleFreeQuestions } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function FreeQuestionsToggle({ isOpen }: { isOpen: boolean }) {
  const [open, setOpen] = useState(isOpen);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    const result = await toggleFreeQuestions(!open);
    if (!result.error) {
      setOpen(!open);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-border/30 bg-card/50 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          💬 Free Questions:
        </span>
        <span
          className={`text-sm font-semibold ${
            open ? "text-green-400" : "text-red-400"
          }`}
        >
          {open ? "Open" : "Closed"}
        </span>
      </div>
      <Button
        size="sm"
        variant={open ? "destructive" : "default"}
        onClick={handleToggle}
        disabled={loading}
        className="h-8 rounded-lg px-4 text-xs"
      >
        {loading ? "⏳" : open ? "🔒 Close" : "🔓 Open"}
      </Button>
    </div>
  );
}
