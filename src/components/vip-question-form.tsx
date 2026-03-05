import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function VipQuestionForm() {
  return (
    <Card className="relative border-amber-500/40 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
      <div className="absolute -top-3 right-4">
        <Badge className="bg-amber-500 text-black hover:bg-amber-400">
          👑 VIP
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          ⭐ VIP Question (صحاب صينية)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Join Patreon to unlock VIP perks:
        </p>
        <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
          <li>📖 <strong className="text-foreground/80">No character limit</strong> — write as much as you want</li>
          <li>🥇 <strong className="text-foreground/80">First priority</strong> — your question gets read first</li>
          <li>🎯 <strong className="text-foreground/80">Guaranteed answer</strong> — every VIP question gets addressed</li>
        </ul>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button asChild className="w-full bg-amber-500 text-black hover:bg-amber-400">
            <a
              href="https://www.patreon.com/hichamnostik"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join on Patreon — Starting at $5/month
            </a>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            💛 Already a patron? Ask your VIP question directly on the Patreon page.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
