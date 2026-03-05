"use server";

import { createServerSupabase, createAnonSupabase, createServiceRoleSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const DEFAULT_MAX_LENGTH = 250;

export async function getFreeQuestionsOpen(): Promise<boolean> {
  const supabase = createAnonSupabase();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "free_questions_open")
    .single();

  return data?.value !== "false";
}

export async function toggleFreeQuestions(open: boolean) {
  const supabase = await createServerSupabase();
  const { data: existing } = await supabase
    .from("settings")
    .select("key")
    .eq("key", "free_questions_open")
    .single();

  if (existing) {
    const { error } = await supabase
      .from("settings")
      .update({ value: String(open) })
      .eq("key", "free_questions_open");
    if (error) return { error: "Failed to update setting." };
  } else {
    const { error } = await supabase
      .from("settings")
      .insert({ key: "free_questions_open", value: String(open) });
    if (error) return { error: "Failed to create setting." };
  }

  return { error: null };
}

export async function getMaxLength(): Promise<number> {
  const supabase = createAnonSupabase();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "max_length")
    .single();

  return data?.value ? parseInt(data.value, 10) : DEFAULT_MAX_LENGTH;
}

export async function updateMaxLength(newLength: number) {
  if (newLength < 50 || newLength > 5000) {
    return { error: "Limit must be between 50 and 5000." };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("settings")
    .update({ value: String(newLength) })
    .eq("key", "max_length");

  if (error) {
    return { error: "Failed to update limit." };
  }

  return { error: null };
}

const VALID_TOPICS = ["love", "career", "depression", "random", "other"];
const VALID_GENDERS = ["male", "female", "other"];

async function verifyTurnstile(token: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token,
    }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function submitFreeQuestion(formData: FormData) {
  const isOpen = await getFreeQuestionsOpen();
  if (!isOpen) {
    return { error: "Free questions are currently closed." };
  }

  const turnstileToken = formData.get("cf-turnstile-response") as string | null;
  if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
    return { error: "CAPTCHA verification failed. Please try again." };
  }

  const content = formData.get("content") as string | null;
  const topic = formData.get("topic") as string | null;
  const gender = formData.get("gender") as string | null;

  if (!content || content.trim().length === 0) {
    return { error: "Question cannot be empty." };
  }

  if (!topic || !VALID_TOPICS.includes(topic)) {
    return { error: "Please select a topic." };
  }

  if (!gender || !VALID_GENDERS.includes(gender)) {
    return { error: "Please select a gender." };
  }

  const maxLength = await getMaxLength();

  if (content.length > maxLength) {
    return { error: `Questions are limited to ${maxLength} characters.` };
  }

  const supabase = createAnonSupabase();
  const { error } = await supabase.from("questions").insert({
    content: content.trim(),
    topic,
    gender,
    is_vip: false,
  });

  if (error) {
    console.error("Free question insert error:", error);
    return { error: `Failed: ${error.message}` };
  }

  redirect("/success");
}

export async function submitVipQuestion(content: string) {
  if (!content || content.trim().length === 0) {
    return { error: "Question cannot be empty." };
  }

  const supabase = await createServiceRoleSupabase();
  const { error } = await supabase.from("questions").insert({
    content: content.trim(),
    is_vip: true,
  });

  if (error) {
    return { error: "Failed to submit question. Please try again." };
  }

  redirect("/success");
}

export async function getQuestions(
  filter?: string,
  dateFilter?: string,
  topicFilter?: string,
  searchQuery?: string
) {
  const supabase = await createServerSupabase();

  let query = supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: true });

  if (filter === "answered") {
    query = query.eq("status", "answered");
  } else if (filter !== "all" || !filter) {
    query = query.neq("status", "answered");
  }

  if (dateFilter && dateFilter !== "all") {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (dateFilter === "today") {
      query = query.gte("created_at", startOfToday.toISOString());
    } else if (dateFilter === "yesterday") {
      const startOfYesterday = new Date(startOfToday);
      startOfYesterday.setDate(startOfYesterday.getDate() - 1);
      query = query
        .gte("created_at", startOfYesterday.toISOString())
        .lt("created_at", startOfToday.toISOString());
    } else if (dateFilter === "older") {
      const startOfYesterday = new Date(startOfToday);
      startOfYesterday.setDate(startOfYesterday.getDate() - 1);
      query = query.lt("created_at", startOfYesterday.toISOString());
    }
  }

  if (topicFilter && topicFilter !== "all") {
    query = query.eq("topic", topicFilter);
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    query = query.ilike("content", `%${searchQuery.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: data ?? [], error: null };
}

export async function getStats() {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("questions")
    .select("is_vip, status");

  if (error) {
    return { total: 0, free: 0, vip: 0, pending: 0, answered: 0, revenue: 0 };
  }

  const total = data.length;
  const vip = data.filter((q) => q.is_vip).length;
  const free = total - vip;
  const pending = data.filter((q) => q.status !== "answered").length;
  const answered = data.filter((q) => q.status === "answered").length;
  const revenue = vip * 5;

  return { total, free, vip, pending, answered, revenue };
}

export async function updateQuestionStatus(id: string, status: string) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("questions")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { error: "Failed to update question." };
  }

  return { error: null };
}

export async function deleteQuestion(id: string) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: "Failed to delete question." };
  }

  return { error: null };
}
