"use client";

import { useIsVIP } from "@/hooks/useIsVIP";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function LoadingSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}

function LoginPrompt() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4">
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in required</CardTitle>
          <CardDescription>
            You need to sign in with Patreon to access VIP content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => signIn("patreon")}
            className="w-full bg-[#FF424D] text-white hover:bg-[#e03b44]"
          >
            Sign in with Patreon
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

function PatronUpgrade() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4">
      <Card className="w-full border-amber-500/40 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
        <div className="flex justify-center pt-6">
          <Badge className="bg-amber-500 text-black hover:bg-amber-400">
            VIP Access Only
          </Badge>
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Become a Patron</CardTitle>
          <CardDescription>
            This content is exclusive to active Patreon supporters. Join now to
            unlock VIP perks and priority Q&amp;A access.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            asChild
            className="w-full bg-amber-500 text-black hover:bg-amber-400"
          >
            <a
              href="https://www.patreon.com/hichamnostik"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join on Patreon — Starting at $5/month
            </a>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Already a patron? Try signing out and back in to refresh your status.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

export function VIPGuard({ children }: { children: React.ReactNode }) {
  const { isVIP, isLoading, isAuthenticated } = useIsVIP();

  if (isLoading) return <LoadingSkeleton />;
  if (!isAuthenticated) return <LoginPrompt />;
  if (!isVIP) return <PatronUpgrade />;

  return <>{children}</>;
}
