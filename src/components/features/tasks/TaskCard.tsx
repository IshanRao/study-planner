import type { FC } from "react";

export interface Task {
  id?: number | string;
  task: string;
  main_goal: string;
  minor_goals: string;
  importance: string;
  urgency: string;
  created_at?: string;
}

interface TaskCardProps {
  task: Task;
}

function importanceBadgeClasses(level: string): string {
  switch (level) {
    case "High":
      return "bg-rose-500/15 text-rose-300 border-rose-500/60";
    case "Medium":
      return "bg-amber-500/15 text-amber-200 border-amber-500/60";
    case "Low":
      return "bg-emerald-500/15 text-emerald-200 border-emerald-500/60";
    default:
      return "bg-slate-700/40 text-slate-200 border-slate-600/70";
  }
}

function urgencyBadgeClasses(level: string): string {
  switch (level) {
    case "Urgent":
      return "bg-rose-600/20 text-rose-200 border-rose-500/70";
    case "Soon":
      return "bg-sky-500/15 text-sky-200 border-sky-500/60";
    case "Not urgent":
      return "bg-slate-700/40 text-slate-200 border-slate-600/70";
    default:
      return "bg-slate-700/40 text-slate-200 border-slate-600/70";
  }
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {

  return (
    <article className="group rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-md shadow-slate-950/60 transition hover:border-sky-500/70 hover:shadow-sky-900/60">
      <header className="flex flex-col items-start justify-between gap-3">
        <div>
          <h2 className="mt-1 text-sm font-semibold text-slate-50">
            {task.task}
          </h2>
        </div>
        <div className="flex items-end gap-1 text-[11px]">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium ${importanceBadgeClasses(
              task.importance
            )}`}
          >
            Importance: {task.importance}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium ${urgencyBadgeClasses(
              task.urgency
            )}`}
          >
            Urgency: {task.urgency}
          </span>
        </div>
      </header>
    </article>
  );
};

