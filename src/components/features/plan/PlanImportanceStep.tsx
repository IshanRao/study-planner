import type { UseFormSetValue, FieldErrors } from "react-hook-form";
import type { PlanValues } from "@/models/plan.models";
import { importanceLevels } from "@/utils/validation";

interface PlanImportanceStepProps {
  setValue: UseFormSetValue<PlanValues>;
  errors: FieldErrors<PlanValues>;
  selectedImportance: PlanValues["importance"];
}

const DESCRIPTIONS: Record<(typeof importanceLevels)[number], string> = {
  Low: "Nice-to-have; minimal impact this week.",
  Medium: "Useful; solid progress if completed.",
  High: "Key milestone; strong impact on outcomes.",
};

export function PlanImportanceStep({
  setValue,
  errors,
  selectedImportance,
}: PlanImportanceStepProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">
        Choose based on how much this moves your learning forward.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {importanceLevels.map((level) => {
          const selected = selectedImportance === level;
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
                {DESCRIPTIONS[level]}
              </p>
            </button>
          );
        })}
      </div>
      {errors.importance && (
        <p className="text-xs text-rose-300">{errors.importance.message}</p>
      )}
    </div>
  );
}
