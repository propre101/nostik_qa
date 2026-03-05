"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateQuestionStatus, deleteQuestion } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  content: string;
  is_vip: boolean;
  status: string;
  created_at: string;
  topic?: string | null;
  gender?: string | null;
}

const TOPIC_LABELS: Record<string, string> = {
  love: "❤️ Love",
  career: "💼 Career",
  depression: "💊 Health",
  random: "🎲 Random",
  other: "💭 Other",
};

const GENDER_LABELS: Record<string, string> = {
  male: "♂️",
  female: "♀️",
  other: "👤",
};

export function QuestionCard({ question }: { question: Question }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isAnswered = question.status === "answered";

  async function handleMarkAnswered() {
    setLoading(true);
    await updateQuestionStatus(question.id, "answered");
    router.refresh();
    setLoading(false);
  }

  async function handleReopen() {
    setLoading(true);
    await updateQuestionStatus(question.id, "unread");
    router.refresh();
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    await deleteQuestion(question.id);
    router.refresh();
    setLoading(false);
  }

  const date = new Date(question.created_at);
  const timeLabel = formatDate(date);

  return (
    <div
      className={`group rounded-xl border border-border/20 bg-card/60 transition-all ${
        isAnswered
          ? "opacity-50"
          : "hover:border-border/40 hover:bg-card/80"
      }`}
    >
      <div className="flex items-start justify-between gap-4 px-4 pt-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {question.topic && (
            <span className="rounded-md bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {TOPIC_LABELS[question.topic] ?? question.topic}
            </span>
          )}
          {question.gender && (
            <span className="rounded-md bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {GENDER_LABELS[question.gender] ?? question.gender}
            </span>
          )}
          {isAnswered && (
            <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              Answered
            </span>
          )}
        </div>
        <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/50">
          {timeLabel}
        </span>
      </div>

      <div className="px-4 py-3">
        <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
          {question.content}
        </p>
      </div>

      <div className="flex items-center gap-2 border-t border-border/10 px-4 py-2.5">
        {!isAnswered ? (
          <Button
            size="sm"
            onClick={handleMarkAnswered}
            disabled={loading}
            className="h-7 rounded-lg bg-emerald-600 px-3 text-[11px] font-medium text-white hover:bg-emerald-500"
          >
            {loading ? "..." : "Mark answered"}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handleReopen}
            disabled={loading}
            className="h-7 rounded-lg border-border/40 px-3 text-[11px]"
          >
            Reopen
          </Button>
        )}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="ml-auto rounded-lg p-1.5 text-muted-foreground/40 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (date >= startOfToday) {
    return `Today, ${time}`;
  } else if (date >= startOfYesterday) {
    return `Yesterday, ${time}`;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }) + `, ${time}`;
}
