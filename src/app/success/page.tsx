import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ vip?: string }>;
}) {
  const params = await searchParams;
  const isVip = params.vip === "true";

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-md text-center">
        <CardContent className="space-y-4 pt-8 pb-8">
          <p className="text-5xl">{isVip ? "👑" : "🎉"}</p>

          <h1 className="text-2xl font-bold">
            {isVip ? "VIP Question Submitted! ⭐" : "Question Submitted! ✅"}
          </h1>

          <p className="text-muted-foreground">
            {isVip
              ? "Thank you for your VIP support! 💎 Your question has been submitted with priority."
              : "Your anonymous question has been received. Thank you! 🙏"}
          </p>

          <Button asChild variant="outline" className="mt-4">
            <Link href="/">🔁 Ask Another Question</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
