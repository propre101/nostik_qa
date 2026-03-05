interface StatsCardsProps {
  total: number;
  pending: number;
  answered: number;
}

const stats = [
  { key: "total", label: "Total", emoji: "📊", accent: "border-t-blue-500/60", valueClass: "text-foreground" },
  { key: "pending", label: "Pending", emoji: "⏳", accent: "border-t-amber-500/60", valueClass: "text-amber-400" },
  { key: "answered", label: "Answered", emoji: "✅", accent: "border-t-emerald-500/60", valueClass: "text-emerald-400" },
] as const;

export function StatsCards({ total, pending, answered }: StatsCardsProps) {
  const values: Record<string, number> = { total, pending, answered };

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div
          key={s.key}
          className={`rounded-xl border border-border/30 border-t-2 ${s.accent} bg-card/40 px-4 pb-4 pt-3`}
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            {s.emoji} {s.label}
          </p>
          <p className={`mt-1 text-3xl font-bold tabular-nums ${s.valueClass}`}>
            {values[s.key]}
          </p>
        </div>
      ))}
    </div>
  );
}
