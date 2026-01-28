import { BookOpen, User } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 backdrop-blur md:px-6">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/40">
          <BookOpen className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-tight">
            Study Planner
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-3 text-xs text-slate-300 sm:flex">
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-200 shadow-sm shadow-slate-950/40 hover:border-sky-500/60 hover:bg-slate-800/80 hover:text-sky-200"
          aria-label="User menu"
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

