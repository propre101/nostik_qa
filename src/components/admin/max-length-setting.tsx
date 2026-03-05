"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateMaxLength } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function MaxLengthSetting({ currentValue }: { currentValue: number }) {
  const [value, setValue] = useState(String(currentValue));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const hasChanged = Number(value) !== currentValue;

  async function handleSave() {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 50 || num > 5000) {
      setMessage("⚠️ Must be between 50 and 5000");
      return;
    }

    setLoading(true);
    setMessage(null);
    const result = await updateMaxLength(num);
    if (result.error) {
      setMessage(`⚠️ ${result.error}`);
    } else {
      setMessage("✅ Saved!");
      router.refresh();
    }
    setLoading(false);
    setTimeout(() => setMessage(null), 2000);
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/30 bg-card/50 px-4 py-3">
      <span className="text-sm text-muted-foreground">✏️ Max characters:</span>
      <Input
        type="number"
        min={50}
        max={5000}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-8 w-24 text-center text-sm"
      />
      {hasChanged && (
        <Button
          size="sm"
          onClick={handleSave}
          disabled={loading}
          className="h-8 rounded-lg px-3 text-xs"
        >
          {loading ? "⏳" : "💾 Save"}
        </Button>
      )}
      {message && (
        <span className="text-xs">{message}</span>
      )}
    </div>
  );
}
