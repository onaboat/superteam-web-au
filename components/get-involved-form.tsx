"use client";

import { useCallback, useState, useTransition } from "react";

import { submitMemberApplication } from "@/app/actions/member-application";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { PrimaryButton } from "@/components/ui/primary-button";
import {
  EXPERIENCE_LEVELS,
  MEMBER_ROLES,
  SKILL_FILTER_OPTIONS,
} from "@/lib/members/constants";
import type {
  ExperienceLevelValue,
  MemberRoleValue,
} from "@/lib/members/constants";
import { getInvolvedSchema } from "@/lib/validators/get-involved";

const STEPS = ["About you", "Role & focus", "Skills & links", "Goals & send"] as const;

type FormState = {
  full_name: string;
  location: string;
  role: MemberRoleValue | "";
  skills: string[];
  experience_level: ExperienceLevelValue | "";
  twitter_url: string;
  github_url: string;
  portfolio_url: string;
  looking_for: string;
};

const initial: FormState = {
  full_name: "",
  location: "",
  role: "",
  skills: [],
  experience_level: "",
  twitter_url: "",
  github_url: "",
  portfolio_url: "",
  looking_for: "",
};

function validateStep(step: number, f: FormState): string | null {
  if (step === 1) {
    if (f.full_name.trim().length < 2) return "Please enter your name.";
    if (f.location.trim().length < 2) return "Please enter your location.";
  }
  if (step === 2) {
    if (!f.role) return "Choose a role / area.";
    if (!f.experience_level) return "Choose an experience level.";
  }
  if (step === 3) {
    if (f.skills.length < 1) return "Select at least one skill area.";
  }
  if (step === 4) {
    if (f.looking_for.trim().length < 10) {
      return "Tell us a bit more about what you’re looking for (10+ characters).";
    }
  }
  return null;
}

export function GetInvolvedForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }, []);

  const toggleSkill = useCallback((skill: string) => {
    setForm((prev) => {
      const has = prev.skills.includes(skill);
      const skills = has
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
    setError(null);
  }, []);

  const goNext = () => {
    const err = validateStep(step, form);
    if (err) {
      setError(err);
      return;
    }
    setStep((s) => Math.min(4, s + 1));
    setError(null);
  };

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
    setError(null);
  };

  const onSubmit = () => {
    const err = validateStep(4, form);
    if (err) {
      setError(err);
      return;
    }
    const payload = {
      full_name: form.full_name.trim(),
      location: form.location.trim(),
      role: form.role,
      skills: form.skills,
      experience_level: form.experience_level,
      twitter_url: form.twitter_url || undefined,
      github_url: form.github_url || undefined,
      portfolio_url: form.portfolio_url || undefined,
      looking_for: form.looking_for.trim(),
    };
    const parsed = getInvolvedSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your answers.");
      return;
    }
    startTransition(async () => {
      const res = await submitMemberApplication(parsed.data);
      if (res.ok) {
        setDone(true);
        setError(null);
      } else {
        setError(res.error);
      }
    });
  };

  if (done) {
    return (
      <div
        className="animate-in fade-in slide-in-from-bottom-2 border-2 border-chart-1 bg-primary/80 p-6 duration-300 sm:p-8"
        role="status"
      >
        <h2 className="text-2xl font-black text-chart-1 sm:text-3xl">
          You&apos;re on the list
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground sm:text-base">
          Thanks for reaching out. The team reviews every submission — you&apos;ll hear from us
          when there&apos;s a fit. Profiles in the public directory are added manually after
          approval.
        </p>
        <p className="mt-4 text-sm font-bold text-chart-1">
          Next: jump into events and builder sessions while you wait.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <nav aria-label="Form progress" className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const complete = step > n;
          return (
            <span
              key={label}
              className={`border-2 px-2 py-1 text-xs font-bold sm:text-sm ${
                active
                  ? "border-chart-1 bg-chart-1 text-black"
                  : complete
                    ? "border-chart-1 bg-primary text-chart-1"
                    : "border-chart-1/40 bg-background text-muted-foreground"
              }`}
            >
              {n}. {label}
            </span>
          );
        })}
      </nav>

      {error ? (
        <p className="text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="space-y-6">
        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 sm:col-span-2">
              <span className="text-sm font-bold text-chart-1">Name</span>
              <Input
                name="full_name"
                autoComplete="name"
                value={form.full_name}
                onChange={(e) => update("full_name", e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label className="block space-y-2 sm:col-span-2">
              <span className="text-sm font-bold text-chart-1">Location</span>
              <Input
                name="location"
                autoComplete="address-level1"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="City, state / region"
              />
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold text-chart-1">Role / area</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {MEMBER_ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => update("role", r.value)}
                    className={`border-2 px-3 py-2 text-left text-sm font-bold transition-colors ${
                      form.role === r.value
                        ? "border-chart-1 bg-chart-1 text-black"
                        : "border-chart-1 bg-background text-chart-1 hover:bg-primary/50"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-chart-1">Experience level</p>
              <ul className="mt-3 space-y-2">
                {EXPERIENCE_LEVELS.map((e) => (
                  <li key={e.value}>
                    <label
                      className={`flex cursor-pointer items-center gap-3 border-2 border-chart-1 px-3 py-2 text-sm font-medium ${
                        form.experience_level === e.value
                          ? "bg-primary"
                          : "bg-background hover:bg-primary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="experience_level"
                        value={e.value}
                        checked={form.experience_level === e.value}
                        onChange={() => update("experience_level", e.value)}
                        className="size-4 accent-chart-1"
                      />
                      {e.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold text-chart-1">Skill areas</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Select all that apply — used for discovery and matching.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SKILL_FILTER_OPTIONS.map((s) => {
                  const on = form.skills.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      className={`border-2 px-2.5 py-1 text-xs font-bold sm:text-sm ${
                        on
                          ? "border-chart-1 bg-chart-1 text-black"
                          : "border-chart-1/60 bg-background text-chart-1 hover:border-chart-1"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2 sm:col-span-2">
                <span className="text-sm font-bold text-chart-1">X / Twitter (optional)</span>
                <Input
                  value={form.twitter_url}
                  onChange={(e) => update("twitter_url", e.target.value)}
                  placeholder="x.com/yourhandle"
                  inputMode="url"
                />
              </label>
              <label className="block space-y-2 sm:col-span-2">
                <span className="text-sm font-bold text-chart-1">GitHub (optional)</span>
                <Input
                  value={form.github_url}
                  onChange={(e) => update("github_url", e.target.value)}
                  placeholder="github.com/username"
                  inputMode="url"
                />
              </label>
              <label className="block space-y-2 sm:col-span-2">
                <span className="text-sm font-bold text-chart-1">Portfolio (optional)</span>
                <Input
                  value={form.portfolio_url}
                  onChange={(e) => update("portfolio_url", e.target.value)}
                  placeholder="https://"
                  inputMode="url"
                />
              </label>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-6">
            <div className="border-2 border-chart-1/50 bg-background/50 p-4 text-xs leading-relaxed sm:text-sm">
              <p className="font-bold text-chart-1">Review</p>
              <ul className="mt-2 space-y-1 text-foreground">
                <li>
                  <span className="text-muted-foreground">Name:</span> {form.full_name}
                </li>
                <li>
                  <span className="text-muted-foreground">Location:</span> {form.location}
                </li>
                <li>
                  <span className="text-muted-foreground">Role:</span>{" "}
                  {MEMBER_ROLES.find((r) => r.value === form.role)?.label ?? "—"}
                </li>
                <li>
                  <span className="text-muted-foreground">Skills:</span>{" "}
                  {form.skills.join(", ")}
                </li>
              </ul>
            </div>
            <label className="block space-y-2">
              <span className="text-sm font-bold text-chart-1">
                What are you looking for?
              </span>
              <Textarea
                value={form.looking_for}
                onChange={(e) => update("looking_for", e.target.value)}
                placeholder="Collaboration, grants, a co-founder, learning Solana, hosting events…"
                rows={5}
              />
            </label>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t-2 border-chart-1/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full rounded-none border-2 border-chart-1 sm:w-auto"
              onClick={goBack}
              disabled={isPending}
            >
              Back
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">Step 1 of 4</span>
          )}
        </div>
        <div className="flex flex-1 justify-end gap-2 sm:justify-end">
          {step < 4 ? (
            <PrimaryButton
              type="button"
              className="w-full sm:w-auto"
              onClick={goNext}
              disabled={isPending}
            >
              Continue
            </PrimaryButton>
          ) : (
            <PrimaryButton
              type="button"
              className="w-full sm:w-auto"
              onClick={onSubmit}
              disabled={isPending}
            >
              {isPending ? "Sending…" : "Submit"}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
