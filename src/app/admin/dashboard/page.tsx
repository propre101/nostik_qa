import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { getQuestions, getStats, getMaxLength, getSessions } from "@/lib/actions";
import { StatsCards } from "@/components/admin/stats-cards";
import { QuickSettings } from "@/components/admin/quick-settings";
import { QuestionFeed } from "@/components/admin/question-feed";
import { LogoutButton } from "@/components/admin/logout-button";
import { SessionSidebar } from "@/components/admin/session-sidebar";
import { EndSessionButton } from "@/components/admin/end-session-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string; filter?: string; date?: string; topic?: string }>;
}) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const params = await searchParams;
  const filter = params.filter ?? "pending";
  const dateFilter = params.date ?? "all";
  const topicFilter = params.topic ?? "all";
  
  const sessions = await getSessions();
  const activeSessionId = sessions.find((s: any) => s.is_active)?.id;
  const selectedSessionId = params.session || activeSessionId || sessions[0]?.id || null;
  const selectedSession = sessions.find((s: any) => s.id === selectedSessionId) || null;

  const [stats, { data: questions }, maxLength] = await Promise.all([
    getStats(selectedSessionId),
    getQuestions(selectedSessionId, filter, dateFilter, topicFilter),
    getMaxLength(),
  ]);

  return (
    <div className="dark bg-background text-foreground min-h-screen flex">
      <SessionSidebar sessions={sessions} selectedSessionId={selectedSessionId} />
      <main className="flex-1 mx-auto max-w-4xl px-8 py-8 overflow-y-auto">
        <div className="mb-8 flex items-center justify-between border-b pb-4 border-border/30">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground/70">
              Hicham Nostik Live — Question Manager
            </p>
          </div>
          <LogoutButton />
        </div>

        {selectedSession ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-card/30 p-4 rounded-xl border border-border/30">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-primary">{selectedSession.title}</h2>
                  {selectedSession.is_active ? (
                    <span className="bg-emerald-500/20 text-emerald-500 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider border border-emerald-500/20">Active</span>
                  ) : (
                    <span className="bg-gray-500/20 text-gray-400 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider border border-gray-500/20">Closed</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Started: {new Date(selectedSession.created_at).toLocaleString()}
                </p>
              </div>
              {selectedSession.is_active && (
                <EndSessionButton sessionId={selectedSession.id} />
              )}
            </div>

            <StatsCards total={stats.total} pending={stats.pending} answered={stats.answered} />
            <QuickSettings maxLength={maxLength} />
            <QuestionFeed
              questions={questions}
              isActive={selectedSession.is_active}
              currentFilter={filter}
              currentTopicFilter={topicFilter}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No sessions available. Create one to get started.</p>
            <QuickSettings maxLength={maxLength} />
          </div>
        )}
      </main>
    </div>
  );
}
