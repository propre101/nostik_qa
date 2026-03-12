import Link from "next/link";
import { FreeQuestionForm } from "@/components/free-question-form";
import { AdNative } from "@/components/ad-native";

export default function HomePage() {
  return (
    <div className="ngl-gradient min-h-screen">
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-10">
        <div className="w-full space-y-6">
          <FreeQuestionForm />

          <AdNative />
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="https://github.com/sponsors/propre101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
          >
            💖 Sponsor
          </a>
          <a
            href="https://github.com/propre101/nostik_qa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
          >
            ⭐ GitHub
          </a>
        </div>

        <footer className="mt-6 space-y-2 text-center text-xs text-white/80">
          <p>
            🔒 Your privacy is guaranteed. We collect no personal data whatsoever.
          </p>
          <p>
            Developed with ❤️ by{" "}
            <a
              href="https://discordapp.com/users/1385242074546311291"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              @propre
            </a>
          </p>
          <p className="flex items-center justify-center gap-3">
            <a
              href="https://discord.gg/ZrgQkxMUqW"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              💬 Discord
            </a>
            {" · "}
            <a
              href="https://github.com/propre101/nostik_qa"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              🐙 GitHub
            </a>
            {" · "}
            <a
              href="https://github.com/sponsors/propre101"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              💜 Sponsor
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
