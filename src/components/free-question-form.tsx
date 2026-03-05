"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitFreeQuestion, getMaxLength, getFreeQuestionsOpen } from "@/lib/actions";
import { Turnstile } from "@/components/turnstile";

const TOPICS = [
  { value: "love", label: "❤️ Love" },
  { value: "career", label: "💼 Career" },
  { value: "depression", label: "🧠 Mental Health" },
  { value: "random", label: "🎲 Random" },
  { value: "other", label: "💭 Other" },
];

const GENDERS = [
  { value: "male", label: "♂️ Male" },
  { value: "female", label: "♀️ Female" },
  { value: "other", label: "👤 Other" },
];

export function FreeQuestionForm() {
  const [charCount, setCharCount] = useState(0);
  const [maxLength, setMaxLength] = useState(250);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [topic, setTopic] = useState("");
  const [gender, setGender] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [captchaToken, setCaptchaToken] = useState("");

  useEffect(() => {
    getMaxLength().then(setMaxLength);
    getFreeQuestionsOpen().then(setIsOpen);
  }, []);

  async function handleSubmit(formData: FormData) {
    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification.");
      return;
    }
    setPending(true);
    setError(null);
    formData.set("topic", topic);
    formData.set("gender", gender);
    formData.set("cf-turnstile-response", captchaToken);
    const result = await submitFreeQuestion(formData);
    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <Card className="relative overflow-hidden border-border/50">
      {!isOpen && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
          <span className="text-3xl">🔒</span>
          <p className="max-w-xs text-center text-sm font-medium text-muted-foreground">
            Questions are closed for now — Nostik will open them when the live starts!
          </p>
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          💬 Free Question (صحاب لعجاجة)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          ✏️ Ask anything — limited to {maxLength} characters.
        </p>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-5">
          <fieldset className="space-y-2.5">
            <legend className="text-sm font-medium text-foreground">Topic</legend>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTopic(t.value)}
                  className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
                    topic === t.value
                      ? "border-amber-500 bg-amber-500/15 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.15)]"
                      : "border-border/60 text-muted-foreground hover:border-amber-500/40 hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2.5">
            <legend className="text-sm font-medium text-foreground">I am</legend>
            <div className="inline-flex overflow-hidden rounded-lg border border-border/60">
              {GENDERS.map((g, i) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGender(g.value)}
                  className={`px-5 py-2 text-sm font-medium transition-all ${
                    i > 0 ? "border-l border-border/60" : ""
                  } ${
                    gender === g.value
                      ? "bg-amber-500/15 text-amber-400"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="relative">
            <Textarea
              name="content"
              placeholder="Type your anonymous question here... 🤔"
              maxLength={maxLength}
              rows={4}
              required
              onChange={(e) => setCharCount(e.target.value.length)}
              className="resize-none"
            />
            <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
              {charCount}/{maxLength}
            </span>
          </div>
          <div className="flex justify-center">
            <Turnstile
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken("")}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">⚠️ {error}</p>
          )}
          <Button type="submit" className="w-full" disabled={pending || !captchaToken}>
            {pending ? "⏳ Submitting..." : "🚀 Submit Question"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
