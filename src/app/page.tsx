import Link from "next/link";
import { FreeQuestionForm } from "@/components/free-question-form";
import { VipQuestionForm } from "@/components/vip-question-form";
import { Separator } from "@/components/ui/separator";
import { AdBanner } from "@/components/ad-banner";
import { AdNative } from "@/components/ad-native";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-4 py-12">
      <div className="mb-10 text-center">
        <p className="mb-2 text-4xl">🎙️</p>
        <h1 className="text-4xl font-bold tracking-tight">
          Hicham Nostik <span className="text-primary/80">Live <span className="text-xl">(beta)</span></span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          🕵️ Ask your question anonymously. No login. No tracking.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="https://github.com/sponsors/propre101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm font-medium text-pink-400 transition-colors hover:bg-pink-500/20 hover:text-pink-300"
          >
            💖 Sponsor
          </a>
          <a
            href="https://github.com/propre101/nostik_qa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-4 py-2 text-xs text-muted-foreground/70 transition-colors hover:border-border hover:text-muted-foreground"
          >
            ⭐ Star on GitHub
          </a>
        </div>
      </div>

      <div className="w-full space-y-6">
        <AdBanner 
          dataKey="f723923002e3ba1c56ccc6657991682d" 
          format="iframe" 
          height={90} 
          width={728} 
          className="hidden md:flex" 
        />
        <AdBanner 
          dataKey="5d938f1c1125bd5f6c45b81fb9c59330" 
          format="iframe" 
          height={50} 
          width={320} 
          className="flex md:hidden" 
        />

        <FreeQuestionForm />

        <AdNative />

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm font-medium text-muted-foreground">
            ✨ or go VIP ✨
          </span>
          <Separator className="flex-1" />
        </div>

        <VipQuestionForm />
      </div>

      <footer className="mt-16 space-y-2 text-center text-xs text-muted-foreground">
        <p>
          🔒 Your privacy is guaranteed. We collect no personal data whatsoever.
        </p>
        {/* <p>
          <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
            📜 Terms of Service
          </Link>
        </p> */}
        <p>
          Developed with ❤️ by{" "}
          <a
            href="https://discordapp.com/users/1385242074546311291"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            @propre
          </a>
        </p>
        <p className="flex items-center justify-center gap-3">
          <a
            href="https://discord.gg/ZrgQkxMUqW"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            💬 Discord
          </a>
          {" · "}
          <a
            href="https://github.com/propre101/nostik_qa"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            🐙 GitHub
          </a>
          {" · "}
          <a
            href="https://github.com/sponsors/propre101"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            💜 Sponsor
          </a>
        </p>
      </footer>
    </main>
  );
}
