"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const importanceLevels = ["Low", "Medium", "High"] as const;
const urgencyLevels = ["Not urgent", "Soon", "Urgent"] as const;

const planSchema = z.object({
  task: z.string().min(3, "Task should be at least 3 characters").max(80),
  mainGoal: z.string().min(5, "Goal should be at least 5 characters").max(160),
  minorGoals: z.tuple([
    z.string().min(3, "Add goal #1").max(120),
    z.string().min(3, "Add goal #2").max(120),
    z.string().min(3, "Add goal #3").max(120),
  ]),
  importance: z.enum(importanceLevels, {
    message: "Choose an importance level",
  }),
  urgency: z.enum(urgencyLevels, {
    message: "Choose an urgency level",
  }),
});

type PlanValues = z.infer<typeof planSchema>;

type StepId = "task" | "mainGoal" | "minorGoals" | "importance" | "urgency" | "review";

const steps: { id: StepId; title: string; subtitle: string }[] = [
  {
    id: "task",
    title: "What's the main task?",
    subtitle: "Name the thing you want to complete (keep it clear and specific).",
  },
  {
    id: "mainGoal",
    title: "What's the main goal under this task?",
    subtitle: "Define the outcome you're aiming for (what “done” looks like).",
  },
  {
    id: "minorGoals",
    title: "Add 3 minor goals",
    subtitle: "Break the task into 3 concrete, actionable chunks.",
  },
  {
    id: "importance",
    title: "How important is this?",
    subtitle: "Importance = impact on your long-term progress.",
  },
  {
    id: "urgency",
    title: "How urgent is this?",
    subtitle: "Urgency = time pressure / deadlines.",
  },
  {
    id: "review",
    title: "Review",
    subtitle: "Check your plan before you move on.",
  },
];

function stepIndexFor(id: StepId) {
  return steps.findIndex((s) => s.id === id);
}

export default function PlanPage() {
  const [stepId, setStepId] = useState<StepId>("task");
  const minorGoalIndexes = [0, 1, 2] as const;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<PlanValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      task: "",
      mainGoal: "",
      minorGoals: ["", "", ""],
      importance: "Medium",
      urgency: "Soon",
    },
    mode: "onTouched",
  });

  const currentStepIndex = stepIndexFor(stepId);
  const progressPct = useMemo(() => {
    const max = steps.length - 1;
    const clamped = Math.min(max, Math.max(0, currentStepIndex));
    return Math.round((clamped / max) * 100);
  }, [currentStepIndex]);

  const values = watch();

  const goBack = () => {
    if (currentStepIndex <= 0) return;
    setStepId(steps[currentStepIndex - 1]!.id);
  };

  const goNext = async () => {
    // Validate only fields relevant to this step.
    let ok = true;
    if (stepId === "task") ok = await trigger("task");
    if (stepId === "mainGoal") ok = await trigger("mainGoal");
    if (stepId === "minorGoals") ok = await trigger("minorGoals");
    if (stepId === "importance") ok = await trigger("importance");
    if (stepId === "urgency") ok = await trigger("urgency");

    if (!ok) return;
    if (currentStepIndex >= steps.length - 1) return;
    setStepId(steps[currentStepIndex + 1]!.id);
  };

  const onFinalSubmit = (data: PlanValues) => {
    // Placeholder save action (we’ll persist to DB/localStorage in a later step).
    window.alert(`Plan saved (placeholder):\n\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">
          <Sparkles className="h-4 w-4 text-sky-300" />
          Plan • Multi-stage form
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Plan your task
        </h1>
        <p className="text-sm text-slate-300">
          Answer one stage at a time. Keep it simple—clarity beats complexity.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/60 backdrop-blur md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-50">
              {steps[currentStepIndex]?.title}
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              {steps[currentStepIndex]?.subtitle}
            </p>
          </div>
          <div className="hidden w-40 sm:block">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-300 transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="mt-2 text-right text-xs text-slate-400">{progressPct}%</p>
          </div>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onFinalSubmit)}>
          {stepId === "task" && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200">Main task</label>
              <input
                type="text"
                placeholder="e.g. Finish React hooks module"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
                {...register("task")}
              />
              {errors.task && <p className="text-xs text-rose-300">{errors.task.message}</p>}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-300">
                Tip: Use a verb + outcome. Example: “Draft my resume” instead of “Resume”.
              </div>
            </div>
          )}

          {stepId === "mainGoal" && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200">Main goal</label>
              <textarea
                rows={4}
                placeholder="e.g. Be able to confidently use useEffect/useMemo/useCallback and explain when to avoid them."
                className="w-full resize-none rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
                {...register("mainGoal")}
              />
              {errors.mainGoal && (
                <p className="text-xs text-rose-300">{errors.mainGoal.message}</p>
              )}
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-300">
                  Keep the goal measurable (“solve 20 problems”, “ship 1 feature”, “finish 3 videos”).
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-300">
                  Your current task: <span className="font-semibold text-slate-100">{values.task || "—"}</span>
                </div>
              </div>
            </div>
          )}

          {stepId === "minorGoals" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-300">
                Break your task into 3 steps you can actually do. Each should start with an action verb.
              </div>
              <div className="grid gap-3">
                {minorGoalIndexes.map((idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="text-xs font-medium text-slate-200">Minor goal #{idx + 1}</label>
                    <input
                      type="text"
                      placeholder={
                        idx === 0
                          ? "e.g. Watch lessons 1–3 and take notes"
                          : idx === 1
                            ? "e.g. Build a small demo component"
                            : "e.g. Do 5 practice questions and review mistakes"
                      }
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
                      {...register(`minorGoals.${idx}`)}
                    />
                    {errors.minorGoals?.[idx] && (
                      <p className="text-xs text-rose-300">
                        {errors.minorGoals[idx]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {stepId === "importance" && (
            <div className="space-y-3">
              <p className="text-sm text-slate-300">
                Choose based on how much this moves your learning forward.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {importanceLevels.map((level) => {
                  const selected = values.importance === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setValue("importance", level, { shouldValidate: true })}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        selected
                          ? "border-sky-500/60 bg-sky-500/10 text-slate-50"
                          : "border-slate-800/80 bg-slate-900/40 text-slate-200 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <p className="text-sm font-semibold">{level}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {level === "Low" && "Nice-to-have; minimal impact this week."}
                        {level === "Medium" && "Useful; solid progress if completed."}
                        {level === "High" && "Key milestone; strong impact on outcomes."}
                      </p>
                    </button>
                  );
                })}
              </div>
              {errors.importance && (
                <p className="text-xs text-rose-300">{errors.importance.message}</p>
              )}
            </div>
          )}

          {stepId === "urgency" && (
            <div className="space-y-3">
              <p className="text-sm text-slate-300">
                Choose based on time constraints and deadlines.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {urgencyLevels.map((level) => {
                  const selected = values.urgency === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setValue("urgency", level, { shouldValidate: true })}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        selected
                          ? "border-emerald-500/60 bg-emerald-500/10 text-slate-50"
                          : "border-slate-800/80 bg-slate-900/40 text-slate-200 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <p className="text-sm font-semibold">{level}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {level === "Not urgent" && "No deadline soon; schedule when ready."}
                        {level === "Soon" && "Should be done in the near term."}
                        {level === "Urgent" && "Deadline is close; prioritize today."}
                      </p>
                    </button>
                  );
                })}
              </div>
              {errors.urgency && <p className="text-xs text-rose-300">{errors.urgency.message}</p>}
            </div>
          )}

          {stepId === "review" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Summary
                </p>
                <div className="mt-3 grid gap-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Task</p>
                    <p className="font-semibold text-slate-50">{values.task || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Main goal</p>
                    <p className="text-slate-100">{values.mainGoal || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Minor goals</p>
                    <ol className="mt-1 list-inside list-decimal space-y-1 text-slate-100">
                      <li>{values.minorGoals?.[0] || "—"}</li>
                      <li>{values.minorGoals?.[1] || "—"}</li>
                      <li>{values.minorGoals?.[2] || "—"}</li>
                    </ol>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/30 px-4 py-3">
                      <p className="text-xs text-slate-400">Importance</p>
                      <p className="mt-1 font-semibold text-slate-50">{values.importance}</p>
                    </div>
                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/30 px-4 py-3">
                      <p className="text-xs text-slate-400">Urgency</p>
                      <p className="mt-1 font-semibold text-slate-50">{values.urgency}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-900/50 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <CheckCircle2 className="h-4 w-4" />
                Save plan (placeholder)
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStepIndex === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={stepId === "review"}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-sky-900/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

