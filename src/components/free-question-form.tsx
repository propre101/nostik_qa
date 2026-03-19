"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { submitFreeQuestion, getMaxLength, getFreeQuestionsOpen } from "@/lib/actions";
import { Turnstile } from "@/components/turnstile";

const TOPICS = [
  { value: "love", label: "❤️ Love" },
  { value: "career", label: "💼 Career" },
  { value: "depression", label: "💊 Health" },
  { value: "random", label: "🎲 Random" },
  { value: "other", label: "💭 Other" },
];

const GENDERS = [
  { value: "male", label: "♂️ Male" },
  { value: "female", label: "♀️ Female" },
  { value: "other", label: "👤 Other" },
];

type Step = "gender" | "topic";

export function FreeQuestionForm() {
  const [charCount, setCharCount] = useState(0);
  const [maxLength, setMaxLength] = useState(250);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [topic, setTopic] = useState("");
  const [gender, setGender] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [captchaToken, setCaptchaToken] = useState("");
  const [step, setStep] = useState<Step>("gender");
  const [animating, setAnimating] = useState(false);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const chipRowRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    getMaxLength().then(setMaxLength);
    getFreeQuestionsOpen().then(setIsOpen);
  }, []);

  function handleGenderSelect(value: string) {
    setGender(value);
    setAnimDir("forward");
    setAnimating(true);
    setTimeout(() => {
      setStep("topic");
      setAnimating(false);
    }, 300);
  }

  function handleBackToGender() {
    setAnimDir("back");
    setAnimating(true);
    setTimeout(() => {
      setStep("gender");
      setAnimating(false);
    }, 300);
  }

  async function handleSubmit(formData: FormData) {
    if (!gender) {
      setError("Please select who you are.");
      return;
    }
    if (!topic) {
      setError("Please select a topic.");
      return;
    }
    if (!captchaToken) {
      setShowCaptcha(true);
      return;
    }
    setPending(true);
    setError(null);
    formData.set("topic", topic);
    formData.set("gender", gender);
    formData.set("content", content);
    formData.set("cf-turnstile-response", captchaToken);
    const result = await submitFreeQuestion(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  // Animation classes
  const getSlideClass = () => {
    if (!animating) return "ngl-chip-visible";
    return animDir === "forward" ? "ngl-chip-exit-left" : "ngl-chip-exit-right";
  };

  const getEnterClass = () => {
    if (animating) return "ngl-chip-hidden";
    return step === "topic" && animDir === "forward"
      ? "ngl-chip-enter-right"
      : step === "gender" && animDir === "back"
        ? "ngl-chip-enter-left"
        : "ngl-chip-visible";
  };

  return (
    <>
      {/* Inline animation styles */}
      <style>{`
        .ngl-chip-row {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ngl-chip-visible {
          transform: translateX(0);
          opacity: 1;
        }
        .ngl-chip-exit-left {
          transform: translateX(-100%);
          opacity: 0;
        }
        .ngl-chip-exit-right {
          transform: translateX(100%);
          opacity: 0;
        }
        .ngl-chip-enter-right {
          animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .ngl-chip-enter-left {
          animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes slideInRight {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .ngl-chip-hidden {
          opacity: 0;
          pointer-events: none;
          position: absolute;
        }
        .ngl-domino-chip {
          box-shadow: 0 3px 0 #c0c0c0;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.15s ease;
        }
        .ngl-domino-chip:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #c0c0c0;
        }
        .ngl-domino-chip-selected {
          box-shadow: 0 3px 0 #000;
        }
        .ngl-domino-chip-selected:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #000;
        }
      `}</style>

      <form ref={formRef} action={handleSubmit} className="w-full">
        {/* NGL-style Card */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl" style={{ borderRadius: '24px' }}>
          {!isOpen && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm" style={{ borderRadius: '24px' }}>
              <span className="text-3xl">🔒</span>
              <p className="max-w-xs text-center text-sm font-medium text-gray-500">
                Questions are closed for now — Nostik will open them when the live starts!
              </p>
            </div>
          )}

          {/* White header section */}
          <div className="flex items-center gap-3 bg-white px-5 py-4">
            <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-100">
              <Image
                src="/favicon.ico"
                alt="Hicham Nostik"
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-gray-900 leading-tight">@hicham_nostik</p>
              <p className="text-[13px] text-gray-500 leading-tight">send me anonymous questions!</p>
            </div>
          </div>

          {/* Pinkish textarea section */}
          <div className="relative" style={{ backgroundColor: 'rgba(255, 240, 238, 0.65)' }}>
            <textarea
              name="content"
              placeholder="Type your anonymous question here... 🤫"
              value={content}
              maxLength={maxLength}
              rows={4}
              required
              onChange={(e) => {
                const v = e.target.value;
                setContent(v);
                setCharCount(v.length);
              }}
              className="w-full resize-none border-none bg-transparent px-5 py-4 text-[15px] font-semibold outline-none" style={{ color: '#2d2d2d', '--tw-placeholder-opacity': '1' } as React.CSSProperties}
            />
            {/* Placeholder color override */}
            <style>{`
              form textarea::placeholder { color: rgba(0,0,0,0.4); }
            `}</style>
            <span className="absolute bottom-2 right-4 text-[11px]" style={{ color: 'rgba(0,0,0,0.35)' }}>
              {charCount}/{maxLength}
            </span>
          </div>

          {/* Two-step chip selector */}
          <div
            ref={chipRowRef}
            className="relative overflow-hidden px-4 py-3"
            style={{ backgroundColor: 'rgba(255, 235, 232, 0.65)', minHeight: '58px' }}
          >
            {/* Step 1: Gender */}
            {step === "gender" && (
              <div className={`ngl-chip-row ${animating ? getSlideClass() : "ngl-chip-visible"}`}>
                <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider" style={{ color: 'rgba(0,0,0,0.5)' }}>I am...</p>
                <div className="flex gap-2">
                  {GENDERS.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => handleGenderSelect(g.value)}
                      className={`ngl-domino-chip rounded-full px-4 py-1.5 text-xs font-medium ${gender === g.value
                          ? "ngl-domino-chip-selected bg-black text-white"
                          : "bg-white/70 hover:bg-white" + " " + "text-[#2d2d2d]"
                        }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Topic */}
            {step === "topic" && (
              <div className={`ngl-chip-row ${animating ? "ngl-chip-hidden" : getEnterClass()}`}>
                <div className="mb-1.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBackToGender}
                    className="text-[11px] font-semibold transition-colors" style={{ color: 'rgba(0,0,0,0.5)' }}
                  >
                    ← change
                  </button>
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(0,0,0,0.5)' }}>Topic...</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                  {TOPICS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTopic(t.value)}
                      className={`ngl-domino-chip flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-medium ${topic === t.value
                          ? "ngl-domino-chip-selected bg-black text-white"
                          : "bg-white/70 hover:bg-white" + " " + "text-[#2d2d2d]"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>



        {error && (
          <p className="mt-3 text-center text-sm font-medium text-white/90">⚠️ {error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-full bg-black py-4 text-base font-bold text-white transition-all hover:bg-gray-800 disabled:opacity-40"
          style={{ borderRadius: '9999px' }}
        >
          {pending ? "⏳ Sending..." : "Send!"}
        </button>
      </form>
      {/* Captcha Modal */}
      {showCaptcha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[32px] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-gray-900">Security Check</h3>
              <p className="mt-2 text-sm text-gray-500">
                Please verify you're human to send your question.
              </p>
            </div>
            
            <div className="flex justify-center min-h-[65px]">
              <Turnstile
                onVerify={(token) => {
                  setCaptchaToken(token);
                  setShowCaptcha(false);
                  // Use a small timeout to ensure state updates before re-submitting
                  setTimeout(() => {
                    formRef.current?.requestSubmit();
                  }, 100);
                }}
                onExpire={() => setCaptchaToken("")}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowCaptcha(false)}
              className="mt-6 w-full text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
