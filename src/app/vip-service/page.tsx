"use client";

import { VIPGuard } from "@/components/VIPGuard";
import { VipQuestionForm } from "@/components/vip-question-form";
import Link from "next/link";

function VIPContent() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-4 py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-4xl">👑</p>
        <h1 className="text-4xl font-bold tracking-tight">
          VIP Lounge
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Your questions get priority. Thank you for your support!
        </p>
      </div>

      <div className="w-full">
        <VipQuestionForm />
      </div>

      <footer className="mt-16 text-center text-xs text-muted-foreground">
        <Link
          href="/"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Back to home
        </Link>
      </footer>
    </main>
  );
}

export default function VipServicePage() {
  return (
    <VIPGuard>
      <VIPContent />
    </VIPGuard>
  );
}
