import type { PlanStep } from "@/models/plan.models";

interface PlanStepHeaderProps {
  currentStep: PlanStep;
  currentStepIndex: number;
  totalSteps: number;
  progressPct: number;
}

export function PlanStepHeader({
  currentStep,
  currentStepIndex,
  totalSteps,
  progressPct,
}: PlanStepHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Step {Math.min(currentStepIndex + 1, totalSteps)} of {totalSteps}
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-50">
          {currentStep.title}
        </h2>
        <p className="mt-1 text-sm text-slate-300">{currentStep.subtitle}</p>
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
  );
}
