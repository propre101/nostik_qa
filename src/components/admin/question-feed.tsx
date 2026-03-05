"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { QuestionCard } from "./question-card";

interface Question {
  id: string;
  content: string;
  is_vip: boolean;
  status: string;
  created_at: string;
  topic?: string | null;
  gender?: string | null;
}

const STATUS_FILTERS = [
  { value: "pending", label: "Pending" },
  { value: "answered", label: "Answered" },
];

const DATE_FILTERS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "all", label: "All time" },
];

const TOPIC_FILTERS = [
  { value: "all", label: "All" },
  { value: "love", label: "❤️" },
  { value: "career", label: "💼" },
  { value: "depression", label: "💊" },
  { value: "random", label: "🎲" },
  { value: "other", label: "💭" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function QuestionFeed({
  questions,
  currentFilter,
  currentDateFilter,
  currentTopicFilter,
}: {
  questions: Question[];
  currentFilter: string;
  currentDateFilter: string;
  currentTopicFilter: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigate(overrides: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(overrides)) {
      const isDefault =
        (key === "filter" && value === "pending") ||
        (key === "date" && value === "today") ||
        (key === "topic" && value === "all");
      if (isDefault) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const qs = params.toString();
    router.push(`/admin/dashboard${qs ? `?${qs}` : ""}`);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/30 bg-card/40 p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1">
            <span className="mr-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
              Status
            </span>
            {STATUS_FILTERS.map((f) => (
              <Chip
                key={f.value}
                active={currentFilter === f.value}
                onClick={() => navigate({ filter: f.value })}
              >
                {f.label}
              </Chip>
            ))}
            <span className="mx-2 h-4 w-px bg-border/40" />
            <span className="mr-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
              Date
            </span>
            {DATE_FILTERS.map((f) => (
              <Chip
                key={f.value}
                active={currentDateFilter === f.value}
                onClick={() => navigate({ date: f.value })}
              >
                {f.label}
              </Chip>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
              Topic
            </span>
            {TOPIC_FILTERS.map((f) => (
              <Chip
                key={f.value}
                active={currentTopicFilter === f.value}
                onClick={() => navigate({ topic: f.value })}
              >
                {f.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/40 py-16 text-center">
          <p className="text-sm text-muted-foreground/70">
            {currentFilter === "answered"
              ? "No answered questions yet."
              : "No pending questions — check back later."}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}
