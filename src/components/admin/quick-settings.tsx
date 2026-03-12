"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateMaxLength, toggleFreeQuestions } from "@/lib/actions";

export function QuickSettings({
  maxLength,
  freeQuestionsOpen,
}: {
  maxLength: number;
  freeQuestionsOpen: boolean;
}) {
  const router = useRouter();

  const [charValue, setCharValue] = useState(String(maxLength));
  const [charLoading, setCharLoading] = useState(false);
  const [charMsg, setCharMsg] = useState<string | null>(null);
  const charChanged = Number(charValue) !== maxLength;

  const [open, setOpen] = useState(freeQuestionsOpen);
  const [toggleLoading, setToggleLoading] = useState(false);

  async function handleSaveChars() {
    const num = parseInt(charValue, 10);
    if (isNaN(num) || num < 50 || num > 5000) {
      setCharMsg("Must be 50–5000");
      return;
    }
    setCharLoading(true);
    setCharMsg(null);
    const result = await updateMaxLength(num);
    setCharMsg(result.error ? result.error : "Saved!");
    setCharLoading(false);
    router.refresh();
    setTimeout(() => setCharMsg(null), 2000);
  }

  async function handleToggle() {
    setToggleLoading(true);
    const result = await toggleFreeQuestions(!open);
    if (!result.error) setOpen(!open);
    setToggleLoading(false);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-border/30 bg-card/40 p-4">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
        ⚙️ Quick Settings
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-sm text-muted-foreground">Max chars</span>
          <Input
            type="number"
            min={50}
            max={5000}
            value={charValue}
            onChange={(e) => setCharValue(e.target.value)}
            className="h-8 w-20 text-center text-sm"
          />
          {charChanged && (
            <Button
              size="sm"
              onClick={handleSaveChars}
              disabled={charLoading}
              className="h-8 rounded-lg px-3 text-xs"
            >
              {charLoading ? "..." : "Save"}
            </Button>
          )}
          {charMsg && (
            <span className="text-xs text-muted-foreground">{charMsg}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Questions 💨</span>
          <button
            onClick={handleToggle}
            disabled={toggleLoading}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
              open ? "bg-emerald-500" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                open ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-xs font-semibold ${
              open ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {open ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </div>
  );
}
