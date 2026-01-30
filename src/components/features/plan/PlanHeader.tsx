import { Sparkles } from "lucide-react";

export function PlanHeader() {
  return (
    <header className="space-y-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">
        <Sparkles className="h-4 w-4 text-sky-300" />
        Plan • Multi-stage form
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
        Plan your task
      </h1>
      <p className="text-sm text-slate-300">
        Answer one stage at a time. Keep it simple—clarity beats complexity.
      </p>
    </header>
  );
}
