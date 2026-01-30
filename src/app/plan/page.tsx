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

  const onFinalSubmit = (data: PlanValues) => {
    window.alert(
      `Plan saved (placeholder):\n\n${JSON.stringify(data, null, 2)}`
    );
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

          {stepId === "review" && <PlanReviewStep values={values} />}

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
