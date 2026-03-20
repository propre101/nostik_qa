import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { getMaxLength, getSessions } from "@/lib/actions";
import { LiveDashboard } from "@/components/admin/live-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const sessions = await getSessions();
  const activeSessionId = sessions.find((s: any) => s.is_active)?.id || null;
  const maxLength = await getMaxLength();

  return (
    <LiveDashboard maxLength={maxLength} activeSessionId={activeSessionId} />
  );
}
