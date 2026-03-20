"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateMaxLength, createSession, deleteSession, getNextPendingQuestion, getPendingCount, deleteQuestion, getSessionEndTime, updateSessionEndTime } from "@/lib/actions";
import { LogoutButton } from "@/components/admin/logout-button";
import { Heart, Briefcase, Activity, Dices, MessageCircle, User } from "lucide-react";



export function LiveDashboard({
  maxLength,
  activeSessionId,
}: {
  maxLength: number;
  activeSessionId: string | null;
}) {
  const router = useRouter();
  
  const [charLimit, setCharLimit] = useState(String(maxLength));
  const [isStarting, setIsStarting] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);



  useEffect(() => {
    if (!activeSessionId) return;

    let isFetching = false;
    const fetchLoop = async () => {
      if (isFetching || isAnswering) return;
      isFetching = true;
      try {
        const count = await getPendingCount(activeSessionId);
        setPendingCount(count);

        if (!currentQuestion) {
          const nextQ = await getNextPendingQuestion(activeSessionId);
          setCurrentQuestion(nextQ);
        }
      } finally {
        isFetching = false;
      }
    };

    fetchLoop();
    const interval = setInterval(fetchLoop, 5000); // Fast polling 5s
    return () => clearInterval(interval);
  }, [activeSessionId, currentQuestion, isAnswering]);

  async function handleStart() {
    setIsStarting(true);
    let num = parseInt(charLimit, 10);
    if (!isNaN(num) && num >= 50 && num <= 5000) {
      await updateMaxLength(num);
    }
    
    const { session, error } = await createSession("Live Session");
    if (!error && session) {
      await updateSessionEndTime(null);
      router.refresh();
    }
    setIsStarting(false);
  }

  async function handleStop() {
    if (activeSessionId) {
      await deleteSession(activeSessionId);
      await updateSessionEndTime(null);
      setCurrentQuestion(null);
      setPendingCount(0);
      router.refresh();
    }
  }

  async function handleMarkAnswered() {
    if (!currentQuestion) return;
    setIsAnswering(true);
    
    // Create local copy to delete, immediately clear it for animation
    const deletingId = currentQuestion.id;
    setCurrentQuestion(null);
    setPendingCount(prev => Math.max(0, prev - 1));

    await deleteQuestion(deletingId);
    
    const count = await getPendingCount(activeSessionId!);
    setPendingCount(count);
    const nextQ = await getNextPendingQuestion(activeSessionId!);
    setCurrentQuestion(nextQ);
    
    setIsAnswering(false);
  }

  const TOPIC_CONFIG: Record<string, { label: string; icon: any; bg: string; text: string }> = {
    love: { label: "Love", icon: Heart, bg: "#ff4d6d", text: "#ffffff" },
    career: { label: "Career", icon: Briefcase, bg: "#1d3557", text: "#ffffff" },
    depression: { label: "Health", icon: Activity, bg: "#2d6a4f", text: "#ffffff" },
    random: { label: "Random", icon: Dices, bg: "#f4a261", text: "#ffffff" },
    other: { label: "Other", icon: MessageCircle, bg: "#9ca3af", text: "#ffffff" },
  };

  const GENDER_CONFIG: Record<string, { label: string; icon: any; bg: string; text: string }> = {
    male: { label: "Male", icon: User, bg: "#60a5fa", text: "#ffffff" },
    female: { label: "Female", icon: User, bg: "#f472b6", text: "#ffffff" },
    other: { label: "Other", icon: User, bg: "#9ca3af", text: "#ffffff" },
  };

  if (!activeSessionId) {
    return (
      <div className="ngl-gradient flex min-h-screen flex-col items-center justify-center p-6 text-black relative">
        {/* We keep the logout button available but subtle in the corner so auth is retained */}
        <div className="absolute top-6 right-6">
          <LogoutButton />
        </div>

        <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-[32px] p-8 w-full max-w-sm flex flex-col items-center shadow-2xl">
          <div className="w-full mb-6">
            <label className="text-[13px] font-bold uppercase tracking-wider text-black/60 mb-2 block text-center">
              Max Characters
            </label>
            <input 
              type="number" 
              className="w-full bg-white/60 border-none rounded-2xl px-4 py-3 text-center text-lg font-bold text-black outline-none focus:ring-2 focus:ring-black/20 shadow-inner"
              value={charLimit}
              onChange={(e) => setCharLimit(e.target.value)}
            />
          </div>

          <button 
            onClick={handleStart}
            disabled={isStarting}
            className="w-full rounded-full bg-black hover:bg-gray-800 text-white font-bold text-[17px] py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all disabled:opacity-50"
          >
            {isStarting ? "Starting..." : "🎙️ Start Receiving Messages"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ngl-gradient flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
      <div className="absolute top-6 inset-x-0 flex justify-center z-20">
        <button 
          onClick={() => { if (confirm("Stop session and permanently delete all messages?")) handleStop() }}
          className="bg-white/30 hover:bg-white/50 backdrop-blur-md text-black font-bold text-sm rounded-full px-5 py-2 transition-all shadow-sm"
        >
          ⏹ Stop
        </button>
      </div>

      {currentQuestion ? (
        <div key={currentQuestion.id} className="flex flex-col items-center w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-500 z-10">
          <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-[2.5rem] w-full p-10 mb-8 relative overflow-hidden text-center min-h-[40vh] flex flex-col justify-center">
            
            <div className="absolute top-6 left-6 flex gap-2">
              {currentQuestion.topic && (
                (() => {
                  const conf = TOPIC_CONFIG[currentQuestion.topic] || TOPIC_CONFIG.other;
                  const Icon = conf.icon;
                  return (
                    <div 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold tracking-wide border border-black/5"
                      style={{ backgroundColor: conf.bg, color: conf.text }}
                    >
                      <Icon size={14} strokeWidth={2.5} />
                      <span>{conf.label}</span>
                    </div>
                  );
                })()
              )}
              {currentQuestion.gender && (
                (() => {
                  const conf = GENDER_CONFIG[currentQuestion.gender] || GENDER_CONFIG.other;
                  const Icon = conf.icon;
                  return (
                    <div 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm text-xs font-semibold tracking-wide border border-black/5"
                      style={{ backgroundColor: conf.bg, color: conf.text }}
                    >
                      <Icon size={14} strokeWidth={2.5} />
                      <span>{conf.label}</span>
                    </div>
                  );
                })()
              )}
            </div>

            <p className="text-3xl sm:text-4xl md:text-5xl leading-snug whitespace-pre-wrap font-bold mt-10 text-gray-900">
              {currentQuestion.content}
            </p>
          </div>

          <button 
            onClick={handleMarkAnswered}
            disabled={isAnswering}
            className="rounded-full bg-black hover:bg-gray-800 text-white font-bold text-xl px-16 py-5 shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            ✅ Mark Answered
          </button>

          <p className="mt-8 text-sm font-bold tracking-widest uppercase text-white/80 mb-8">
            {pendingCount > 0 ? `${pendingCount - 1} messages waiting` : "0 messages waiting"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center animate-in fade-in duration-500 z-10">
          <p className="text-4xl font-bold mb-4 text-white drop-shadow-md">🎉 All caught up!</p>
          <p className="text-xl text-white/90 font-medium tracking-wide">Waiting for new messages...</p>
        </div>
      )}
    </div>
  );
}
