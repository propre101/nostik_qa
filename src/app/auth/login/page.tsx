"use client";

import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4">
      <Card className="w-full text-center">
        <CardHeader>
          <div className="mb-2 text-4xl">🎙️</div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in with your Patreon account to access VIP features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => signIn("patreon", { callbackUrl: "/vip-service" })}
            className="w-full bg-[#FF424D] text-white hover:bg-[#e03b44]"
          >
            Sign in with Patreon
          </Button>
          <p className="text-xs text-muted-foreground">
            <Link href="/" className="underline underline-offset-2 hover:text-foreground">
              Back to home
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
