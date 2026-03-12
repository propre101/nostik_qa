import Link from "next/link";
import { AdNative } from "@/components/ad-native";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ vip?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8 w-full max-w-md mx-auto">
      {/* White checkmark circle */}
      <div
        className="flex items-center justify-center rounded-full bg-white shadow-lg"
        style={{ width: '96px', height: '96px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-green-500"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Sent text */}
      <h1 className="mt-6 text-3xl font-bold text-white">Sent!</h1>

      {/* Swing animation */}
      <style>{`
        @keyframes swing-pause {
          /* Active Animation Phase (0% to 50% = 1 second) */
          0% { transform: rotate(0deg); }
          10% { transform: rotate(2deg); }
          20% { transform: rotate(-2deg); }
          30% { transform: rotate(1deg); }
          40% { transform: rotate(-1deg); }
          50% { transform: rotate(0deg); }
              
          /* Pause Phase (50% to 100% = 1 second) */
          100% { transform: rotate(0deg); }
        }
              
        .animate-swing {
          /* Set to 2s to account for the 1s move + 1s pause */
          animation: swing-pause 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      {/* Ask Another Question button */}
      <Link
        href="/"
        className="mt-8 block w-full rounded-full bg-black py-4 text-center text-base font-bold text-white transition-all hover:bg-gray-800 animate-swing"
      >
        🔁 Ask Another Question
      </Link>

      <div className="mt-6 w-full">
        <AdNative />
      </div>
    </main>
  );
}
