"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSession, deleteSession } from "@/lib/actions";
import { Button } from "@/components/ui/button";

type Session = {
  id: string;
  title: string;
  is_active: boolean;
  created_at: string;
};

export function SessionSidebar({
  sessions,
  selectedSessionId,
}: {
  sessions: Session[];
  selectedSessionId: string | null;
}) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  async function handleCreate() {
    if (!title.trim()) return;
    setIsCreating(true);
    const result = await createSession(title);
    setTitle("");
    setIsCreating(false);
    
    if (result.session) {
      router.push(`/admin/dashboard?session=${result.session.id}`);
    } else {
      router.push("/admin/dashboard");
    }
  }

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Delete this session and all its questions? This cannot be undone.")) {
      setIsDeleting(id);
      await deleteSession(id);
      setIsDeleting(null);
      if (selectedSessionId === id) {
        router.push("/admin/dashboard");
      }
      router.refresh();
    }
  }

  return (
    <div className="w-72 border-r border-border/30 bg-card/20 min-h-screen p-5 space-y-6 shadow-sm shrink-0 relative z-10 hidden md:flex md:flex-col">
      <h2 className="font-bold text-lg mb-2 text-primary px-1">Live Sessions</h2>
      
      <div className="flex flex-col gap-3">
        <input
          className="w-full bg-background border border-border/50 rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary/50 transition-colors shadow-sm"
          placeholder="Session title e.g. Live Q&A #13"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreate()}
        />
        <Button 
          className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 font-bold tracking-wide shadow-md transition-all text-white" 
          onClick={handleCreate} 
          disabled={isCreating}
        >
          🎙️ {isCreating ? "Starting..." : "Start New Live"}
        </Button>
      </div>

      <div className="space-y-2.5 overflow-y-auto flex-1 pr-1" style={{ maxHeight: "calc(100vh - 250px)", scrollbarWidth: "thin" }}>
        {sessions.map(s => (
          <Link
            key={s.id}
            href={`/admin/dashboard?session=${s.id}`}
            className={`group block relative px-4 py-3 rounded-2xl text-sm transition-all border ${
              s.id === selectedSessionId 
                ? "bg-primary/5 text-primary font-semibold border-primary/20 shadow-sm" 
                : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-border/30"
            } ${s.is_active && s.id === selectedSessionId ? "ring-1 ring-emerald-500/30" : ""}`}
          >
            {s.is_active && (
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-emerald-500 rounded-r-md opacity-80" />
            )}
            
            <div className="flex justify-between items-center gap-2">
              <span className="truncate flex-1">{s.title}</span>
              <div className="flex items-center gap-2 shrink-0">
                {!s.is_active && (
                  <button
                    onClick={(e) => handleDelete(e, s.id)}
                    disabled={isDeleting === s.id}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 p-1.5 rounded-md text-red-500/70 hover:text-red-500"
                    title="Delete session"
                  >
                    {isDeleting === s.id ? "..." : "🗑️"}
                  </button>
                )}
                {s.is_active && <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
              </div>
            </div>
            <div className="text-[11px] mt-1.5 opacity-60 font-medium tracking-wider font-mono">
              {s.created_at.substring(0, 10)}
            </div>
          </Link>
        ))}
        {sessions.length === 0 && (
          <p className="text-sm text-muted-foreground p-4 text-center border border-dashed border-border/30 rounded-xl">No sessions yet.</p>
        )}
      </div>
    </div>
  );
}
