import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { PlanValues } from "@/models/plan.models";

interface PlanMainGoalStepProps {
  register: UseFormRegister<PlanValues>;
  errors: FieldErrors<PlanValues>;
  task: string;
}

export function PlanMainGoalStep({
  register,
  errors,
  task,
}: PlanMainGoalStepProps) {
  return (
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
          Keep the goal measurable (&quot;solve 20 problems&quot;, &quot;ship 1
          feature&quot;, &quot;finish 3 videos&quot;).
        </div>
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-300">
          Your current task:{" "}
          <span className="font-semibold text-slate-100">{task || "—"}</span>
        </div>
      </div>
    </div>
  );
}
