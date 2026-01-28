import { Calendar, Clock, ListChecks, Settings } from "lucide-react";

const links = [
  { label: "Overview", icon: Calendar },
  { label: "Sessions", icon: Clock },
  { label: "Subjects", icon: ListChecks },
  { label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col border-r border-slate-800 bg-slate-950/95 text-slate-100">
      <div className="px-4 pb-3 pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Navigation
      </div>
      <nav className="flex-1 space-y-1 px-2 pb-4 text-sm">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-slate-300 transition hover:bg-slate-800/80 hover:text-sky-200"
            >
              <Icon className="h-4 w-4 text-slate-400" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="border-t border-slate-800 px-4 py-3 text-[11px] text-slate-500">
        UserName
      </div>
    </aside>
  );
}

