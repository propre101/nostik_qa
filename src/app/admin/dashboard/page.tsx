import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { getQuestions, getStats, getMaxLength, getFreeQuestionsOpen } from "@/lib/actions";
import { StatsCards } from "@/components/admin/stats-cards";
import { QuickSettings } from "@/components/admin/quick-settings";
import { QuestionFeed } from "@/components/admin/question-feed";
import { LogoutButton } from "@/components/admin/logout-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; date?: string; topic?: string }>;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const filter = params.filter ?? "pending";
  const dateFilter = params.date ?? "today";
  const topicFilter = params.topic ?? "all";

  const [stats, { data: questions }, maxLength, freeQuestionsOpen] = await Promise.all([
    getStats(),
    getQuestions(filter, dateFilter, topicFilter),
    getMaxLength(),
    getFreeQuestionsOpen(),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground/70">
            Hicham Nostik Live — Question Manager
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="space-y-5">
        <StatsCards
          total={stats.total}
          pending={stats.pending}
          answered={stats.answered}
        />
        <QuickSettings maxLength={maxLength} freeQuestionsOpen={freeQuestionsOpen} />
        <QuestionFeed
          questions={questions}
          currentFilter={filter}
          currentDateFilter={dateFilter}
          currentTopicFilter={topicFilter}
        />
      </div>
    </main>
  );
}
