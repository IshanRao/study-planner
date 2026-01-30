import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { PlanValues } from "@/models/plan.models";

const MINOR_GOAL_INDEXES = [0, 1, 2] as const;

const PLACEHOLDERS: Record<(typeof MINOR_GOAL_INDEXES)[number], string> = {
  0: "e.g. Watch lessons 1-3 and take notes",
  1: "e.g. Build a small demo component",
  2: "e.g. Do 5 practice questions and review mistakes",
};

interface PlanMinorGoalsStepProps {
  register: UseFormRegister<PlanValues>;
  errors: FieldErrors<PlanValues>;
}

export function PlanMinorGoalsStep({ register, errors }: PlanMinorGoalsStepProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-300">
        Break your task into 3 steps you can actually do. Each should start with
        an action verb.
      </div>
      <div className="grid gap-3">
        {MINOR_GOAL_INDEXES.map((idx) => (
          <div key={idx} className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              Minor goal #{idx + 1}
            </label>
            <input
              type="text"
              placeholder={PLACEHOLDERS[idx]}
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
  );
}
