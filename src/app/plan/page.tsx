"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PlanHeader,
  PlanStepHeader,
  PlanTaskStep,
  PlanMainGoalStep,
  PlanMinorGoalsStep,
  PlanImportanceStep,
  PlanUrgencyStep,
  PlanReviewStep,
  PlanStepNav,
} from "@/components/features/plan";
import type { PlanValues, StepId } from "@/models/plan.models";
import { PLAN_STEPS, stepIndexFor } from "@/models/plan.models";
import { planSchema } from "@/utils/validation";

export default function PlanPage() {
  const [stepId, setStepId] = useState<StepId>("task");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
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
    const max = PLAN_STEPS.length - 1;
    const clamped = Math.min(max, Math.max(0, currentStepIndex));
    return Math.round((clamped / max) * 100);
  }, [currentStepIndex]);

  const values = watch();
  const currentStep = PLAN_STEPS[currentStepIndex];

  const goBack = () => {
    if (currentStepIndex <= 0) return;
    setStepId(PLAN_STEPS[currentStepIndex - 1]!.id);
  };

  const goNext = async () => {
    let ok = true;
    if (stepId === "task") ok = await trigger("task");
    if (stepId === "mainGoal") ok = await trigger("mainGoal");
    if (stepId === "minorGoals") ok = await trigger("minorGoals");
    if (stepId === "importance") ok = await trigger("importance");
    if (stepId === "urgency") ok = await trigger("urgency");

    if (!ok) return;
    if (currentStepIndex >= PLAN_STEPS.length - 1) return;
    setStepId(PLAN_STEPS[currentStepIndex + 1]!.id);
  };

  const onFinalSubmit = async (data: PlanValues) => {
    const body = {
      task: data.task,
      mainGoal: data.mainGoal,
      minorGoals: data.minorGoals.join("; "),
      importance: data.importance,
      urgency: data.urgency,
    };
    try {
      const res = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const detail = (err as { detail?: unknown }).detail;
        const message =
          typeof detail === "string"
            ? detail
            : detail
              ? JSON.stringify(detail)
              : `Failed to create task (${res.status})`;
        setError("root", { type: "server", message });
        return;
      }
    } catch (e) {
      setError("root", {
        type: "server",
        message: e instanceof Error ? e.message : "Failed to create task",
      });
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <PlanHeader />

      <section className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/60 backdrop-blur md:p-6">
        {currentStep && (
          <PlanStepHeader
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
            totalSteps={PLAN_STEPS.length}
            progressPct={progressPct}
          />
        )}

        <form
          className="mt-6 space-y-6"
          onSubmit={handleSubmit(onFinalSubmit)}
        >
          {stepId === "task" && (
            <PlanTaskStep register={register} errors={errors} />
          )}

          {stepId === "mainGoal" && (
            <PlanMainGoalStep
              register={register}
              errors={errors}
              task={values.task}
            />
          )}

          {stepId === "minorGoals" && (
            <PlanMinorGoalsStep register={register} errors={errors} />
          )}

          {stepId === "importance" && (
            <PlanImportanceStep
              setValue={setValue}
              errors={errors}
              selectedImportance={values.importance}
            />
          )}

          {stepId === "urgency" && (
            <PlanUrgencyStep
              setValue={setValue}
              errors={errors}
              selectedUrgency={values.urgency}
            />
          )}

          {stepId === "review" && (
            <PlanReviewStep
              values={values}
              isSubmitting={isSubmitting}
              submitError={(() => {
                const message = (errors as { root?: { message?: unknown } }).root
                  ?.message;
                if (!message) return undefined;
                return typeof message === "string" ? message : JSON.stringify(message);
              })()}
            />
          )}

          <PlanStepNav
            onBack={goBack}
            onNext={goNext}
            canGoBack={currentStepIndex > 0}
            canGoNext={stepId !== "review"}
          />
        </form>
      </section>
    </div>
  );
}
