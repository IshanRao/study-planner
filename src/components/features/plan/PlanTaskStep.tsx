import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { PlanValues } from "@/models/plan.models";

interface PlanTaskStepProps {
  register: UseFormRegister<PlanValues>;
  errors: FieldErrors<PlanValues>;
}

export function PlanTaskStep({ register, errors }: PlanTaskStepProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-slate-200">Main task</label>
      <input
        type="text"
        placeholder="e.g. Finish React hooks module"
        className="w-full rounded-xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
        {...register("task")}
      />
      {errors.task && (
        <p className="text-xs text-rose-300">{errors.task.message}</p>
      )}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 px-4 py-3 text-xs text-slate-300">
        Tip: Use a verb + outcome. Example: &quot;Draft my resume&quot; instead
        of &quot;Resume&quot;.
      </div>
    </div>
  );
}
