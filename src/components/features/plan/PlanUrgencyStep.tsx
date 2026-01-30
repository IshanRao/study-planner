import type { UseFormSetValue, FieldErrors } from "react-hook-form";
import type { PlanValues } from "@/models/plan.models";
import { urgencyLevels } from "@/utils/validation";

interface PlanUrgencyStepProps {
  setValue: UseFormSetValue<PlanValues>;
  errors: FieldErrors<PlanValues>;
  selectedUrgency: PlanValues["urgency"];
}

const DESCRIPTIONS: Record<(typeof urgencyLevels)[number], string> = {
  "Not urgent": "No deadline soon; schedule when ready.",
  Soon: "Should be done in the near term.",
  Urgent: "Deadline is close; prioritize today.",
};

export function PlanUrgencyStep({
  setValue,
  errors,
  selectedUrgency,
}: PlanUrgencyStepProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">
        Choose based on time constraints and deadlines.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {urgencyLevels.map((level) => {
          const selected = selectedUrgency === level;
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
                {DESCRIPTIONS[level]}
              </p>
            </button>
          );
        })}
      </div>
      {errors.urgency && (
        <p className="text-xs text-rose-300">{errors.urgency.message}</p>
      )}
    </div>
  );
}
