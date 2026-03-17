import { useState, useRef, useCallback } from "react";
import { motion, type Easing, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const ease: Easing = [0.25, 0.1, 0.25, 1];

/* ── Qualifying questions ── */
const QUESTIONS = [
  {
    key: "product_interest" as const,
    label: "What interests you most about Outercamp 2.0?",
    multi: true,
    options: [
      "Private stays in nature",
      "Solo retreat",
      "A unique place to bring my people",
      "Sauna / cold plunge / wellness",
      "Just following the journey",
    ],
  },
  {
    key: "crowdfunding_interest" as const,
    label: "Would you like to be notified if we open crowdfunding opportunities?",
    multi: false,
    options: ["Yes", "Maybe", "No"],
  },
  {
    key: "investment_interest" as const,
    label: "Would you like to hear about private investment opportunities?",
    multi: false,
    options: ["Yes", "Possibly", "No"],
    // Reveals phone field if Yes or Possibly
  },
  {
    key: "referral_source" as const,
    label: "How did you first hear about Outercamp?",
    multi: true,
    options: [
      "Instagram",
      "TikTok",
      "YouTube",
      "Stayed at Outercamp",
      "Friend referral",
      "Other",
    ],
  },
];

type QuestionKey = "product_interest" | "crowdfunding_interest" | "investment_interest" | "referral_source";

// Answers stored as arrays (single-select questions will just have 1 entry)
type Answers = Record<QuestionKey, string[]>;

// Compute segments from answers
function deriveSegments(answers: Answers): string[] {
  const segments: string[] = [];
  const interest = answers.product_interest;
  if (interest.includes("Sauna / cold plunge / wellness")) segments.push("sauna_socials");
  if (interest.length > 0 && !(interest.length === 1 && interest[0] === "Just following the journey"))
    segments.push("stay_at_camp");
  if (["Yes", "Maybe"].some((v) => answers.crowdfunding_interest.includes(v)))
    segments.push("crowdfunding");
  if (["Yes", "Possibly"].some((v) => answers.investment_interest.includes(v)))
    segments.push("private_investment");
  return [...new Set(segments)];
}

export interface WaitlistFormProps {
  variant?: "light" | "dark";
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export const WaitlistForm = ({
  variant = "light",
  supabaseUrl,
  supabaseAnonKey,
}: WaitlistFormProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<"info" | "questions" | "success">("info");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [answers, setAnswers] = useState<Answers>({
    product_interest: [],
    crowdfunding_interest: [],
    investment_interest: [],
    referral_source: [],
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isDark = variant === "dark";

  const scrollToForm = useCallback(() => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }, []);

  // Resolve Supabase client: props (WP plugin) → env vars (Vite app)
  const envUrl = typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_URL : undefined;
  const envKey = typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_ANON_KEY : undefined;
  const resolvedUrl = supabaseUrl || envUrl || "";
  const resolvedKey = supabaseAnonKey || envKey || "";

  // Single client instance — stable across renders
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  const getSupabase = useCallback(() => {
    if (!resolvedUrl || !resolvedKey) return null;
    if (!supabaseRef.current) {
      supabaseRef.current = createClient(resolvedUrl, resolvedKey);
    }
    return supabaseRef.current;
  }, [resolvedUrl, resolvedKey]);

  // Step 1: Insert row with name + email (captures lead even if they drop off)
  const insertInitialRecord = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setError("Supabase is not configured.");
      return false;
    }
    setSubmitting(true);
    setError("");
    try {
      const { error: dbError } = await supabase
        .from("waitlist_signups")
        .upsert(
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            source: "website",
          },
          { onConflict: "email" }
        );

      if (dbError) {
        setError("Something went wrong. Please try again.");
        setSubmitting(false);
        return false;
      }
      setSubmitting(false);
      return true;
    } catch {
      setError("Connection error. Please try again.");
      setSubmitting(false);
      return false;
    }
  };

  // Save field(s) immediately — uses upsert so it works even without SELECT permission
  const saveField = async (updates: Record<string, unknown>) => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase
      .from("waitlist_signups")
      .upsert(
        {
          email: email.trim().toLowerCase(),
          name: name.trim(),
          ...updates,
        },
        { onConflict: "email" }
      );
  };

  // Final submit — save segments and show success
  const finalizeSubmission = async () => {
    const segments = deriveSegments(answers);
    // Save phone + segments if we have them
    const updates: Record<string, unknown> = { segments };
    if (phoneNumber.trim()) updates.phone_number = phoneNumber.trim();
    await saveField(updates);
    setStep("success");
    scrollToForm();
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      const ok = await insertInitialRecord();
      if (ok) {
        setStep("questions");
        setCurrentQ(0);
        scrollToForm();
      }
    }
  };

  const selectAnswer = (key: QuestionKey, value: string, multi: boolean) => {
    setAnswers((prev) => {
      let updated: string[];
      if (multi) {
        // Toggle: add if not present, remove if already selected
        updated = prev[key].includes(value)
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value];
      } else {
        // Single select: replace
        updated = [value];
      }
      // Save comma-joined to DB
      saveField({ [key]: updated.join(", ") });
      return { ...prev, [key]: updated };
    });
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      scrollToForm();
    } else {
      finalizeSubmission();
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      scrollToForm();
    } else {
      setStep("info");
      scrollToForm();
    }
  };

  const handleSkipAll = () => {
    finalizeSubmission();
  };

  // Q3: show phone field if Yes or Possibly
  const showPhoneField =
    currentQ === 2 &&
    (answers.investment_interest.includes("Yes") || answers.investment_interest.includes("Possibly"));

  /* ── Success state ── */
  if (step === "success") {
    return (
      <div ref={formRef} className="pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-8 rounded-2xl border backdrop-blur-md ${
            isDark
              ? "border-sand/20 bg-foreground/30"
              : "border-border bg-background/80"
          }`}
        >
          <p
            className={`font-serif text-2xl mb-2 ${
              isDark ? "text-sand-light" : "text-foreground"
            }`}
          >
            You're on the list
          </p>
          <p
            className={`text-sm ${
              isDark ? "text-sand/70" : "text-muted-foreground"
            }`}
          >
            Founding rates and early booking windows are coming your way.
          </p>
        </motion.div>
      </div>
    );
  }

  const inputClass = isDark
    ? "w-full px-5 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-sand-light font-sans text-sm placeholder:text-sand/40 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/40 transition-all duration-200"
    : "w-full px-5 py-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200";

  /* ── Step 1: Name & Email ── */
  if (step === "info") {
    return (
      <form ref={formRef as React.RefObject<HTMLFormElement>} onSubmit={handleInfoSubmit} className="space-y-3 max-w-md mx-auto">
        <input
          type="text"
          required
          maxLength={100}
          placeholder="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          required
          maxLength={255}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}
        <button
          type="submit"
          className="w-full px-8 py-4 rounded-lg bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase hover:bg-forest-light transition-colors duration-300 flex items-center justify-center gap-2"
        >
          🔓 UNLOCK FOUNDING ACCESS
        </button>
        <p
          className={`text-xs text-center ${
            isDark ? "text-sand/50" : "text-muted-foreground"
          }`}
        >
          Founding rates and early booking windows will be released to this list before public launch.
        </p>
      </form>
    );
  }

  /* ── Step 2: Qualifying Questions (one at a time) ── */
  const q = QUESTIONS[currentQ];

  return (
    <div ref={formRef} className="max-w-md mx-auto pb-16">
      {/* Intro headline — shown on first question */}
      {currentQ === 0 && (
        <div className="text-center mb-6">
          <p
            className={`font-serif text-lg md:text-xl mb-1 ${
              isDark ? "text-sand-light" : "text-foreground"
            }`}
          >
            Help us shape Outercamp 2.0.
          </p>
          <p
            className={`font-sans text-xs ${
              isDark ? "text-sand/50" : "text-muted-foreground"
            }`}
          >
            A few quick questions so we can prioritize updates for you.
          </p>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentQ
                ? "w-8 bg-primary"
                : i < currentQ
                ? `w-4 ${isDark ? "bg-sand/40" : "bg-primary/40"}`
                : `w-4 ${isDark ? "bg-sand/15" : "bg-border"}`
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease }}
        >
          <p
            className={`font-serif text-xl md:text-2xl mb-6 text-center leading-snug ${
              isDark ? "text-sand-light" : "text-foreground"
            }`}
          >
            {q.label}
          </p>

          {q.multi && (
            <p
              className={`text-xs mb-2 text-center ${
                isDark ? "text-sand/40" : "text-muted-foreground"
              }`}
            >
              Select all that apply
            </p>
          )}

          <div className="space-y-2.5">
            {q.options.map((option) => {
              const isSelected = answers[q.key].includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectAnswer(q.key, option, q.multi)}
                  className={`w-full text-left px-5 py-4 rounded-lg font-sans text-sm border backdrop-blur-sm transition-all duration-200 ${
                    isDark
                      ? isSelected
                        ? "border-primary/60 bg-primary/20 text-sand-light ring-1 ring-primary/30"
                        : "border-white/15 bg-white/10 text-sand/80 hover:border-white/25 hover:bg-white/15"
                      : isSelected
                      ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/30"
                      : "border-border bg-background/80 text-muted-foreground hover:border-primary/30 hover:bg-secondary"
                  }`}
                >
                  {q.multi && (
                    <span
                      className={`inline-block w-4 h-4 rounded border mr-3 align-middle transition-colors ${
                        isSelected
                          ? "bg-primary border-primary"
                          : isDark
                          ? "border-sand/30"
                          : "border-border"
                      }`}
                    >
                      {isSelected && (
                        <svg viewBox="0 0 16 16" className="w-4 h-4 text-primary-foreground">
                          <path
                            fill="currentColor"
                            d="M6.5 11.5L3 8l1-1 2.5 2.5L12 4l1 1z"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                  {option}
                </button>
              );
            })}
          </div>

          {/* Conditional phone field for Q3 */}
          {showPhoneField && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3, ease }}
              className="mt-4"
            >
              <input
                type="tel"
                maxLength={20}
                placeholder="Phone Number (optional)"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  // Save on every change — fire and forget
                  if (e.target.value.trim()) {
                    saveField({ phone_number: e.target.value.trim() });
                  }
                }}
                onBlur={() => {
                  if (phoneNumber.trim()) {
                    saveField({ phone_number: phoneNumber.trim() });
                  }
                }}
                className={inputClass}
              />
              <p
                className={`text-sm mt-2 italic ${
                  isDark ? "text-sand/70" : "text-muted-foreground"
                }`}
              >
                We may reach out if private opportunities open.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-start justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className={`flex items-center gap-1 px-4 py-3 font-sans text-xs tracking-widest uppercase transition-colors ${
            isDark
              ? "text-sand/50 hover:text-sand-light"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-sans text-xs tracking-widest uppercase hover:bg-forest-light transition-colors duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : currentQ === QUESTIONS.length - 1 ? (
              "Unlock Access"
            ) : (
              <>
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleSkipAll}
            disabled={submitting}
            className={`font-sans text-xs tracking-wide underline underline-offset-2 decoration-dotted transition-colors ${
              isDark
                ? "text-sand/45 hover:text-sand/70"
                : "text-muted-foreground/60 hover:text-muted-foreground"
            }`}
          >
            Skip & join waitlist
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 text-center mt-3">{error}</p>
      )}
    </div>
  );
};

export default WaitlistForm;
