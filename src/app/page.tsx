import Link from "next/link";
import { FreeQuestionForm } from "@/components/free-question-form";
import { SupportSection } from "@/components/support-section";


export default function HomePage() {
  return (
    <div className="ngl-gradient flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-4 pt-10 pb-6">
        <div className="w-full">
          <FreeQuestionForm />
        </div>

        <div className="mt-auto w-full pt-8">
          <SupportSection />

          <footer className="mt-6 space-y-2 text-center text-xs text-white/80">
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
                ⭐ Star on GitHub
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
