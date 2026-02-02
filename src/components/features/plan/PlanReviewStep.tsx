import { CheckCircle2, Loader2 } from "lucide-react";
import type { PlanValues } from "@/models/plan.models";

interface PlanReviewStepProps {
  values: PlanValues;
  isSubmitting?: boolean;
  submitError?: string;
}

export function PlanReviewStep({
  values,
  isSubmitting = false,
  submitError,
}: PlanReviewStepProps) {
  return (
    <div className="space-y-4">
      {submitError && (
        <p className="rounded-xl border border-rose-800/80 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">
          {String(submitError)}
        </p>
      )}
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
              <p className="mt-1 font-semibold text-slate-50">
                {values.importance}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/30 px-4 py-3">
              <p className="text-xs text-slate-400">Urgency</p>
              <p className="mt-1 font-semibold text-slate-50">
                {values.urgency}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-900/50 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-70 disabled:pointer-events-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving…
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Save plan
          </>
        )}
      </button>
    </div>
  );
}
