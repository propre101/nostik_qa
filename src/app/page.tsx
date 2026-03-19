import Link from "next/link";
import { FreeQuestionForm } from "@/components/free-question-form";
import { SupportSection } from "@/components/support-section";


export default function HomePage() {
  return (
    <div className="ngl-gradient min-h-screen">
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 pt-10 pb-24">
        <div className="w-full space-y-6">
          <FreeQuestionForm />
          <SupportSection />
        </div>


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
            {/* {" · "}
            <a
              href="https://github.com/sponsors/propre101"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              💜 Sponsor
            </a> */}
          </p>
        </footer>
      </main>
    </div>
  );
}
