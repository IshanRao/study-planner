import { ArrowLeft, ArrowRight } from "lucide-react";

interface PlanStepNavProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

export function PlanStepNav({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: PlanStepNavProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-sky-900/40 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
