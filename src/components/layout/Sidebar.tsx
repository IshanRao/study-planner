import { Focus, History, Target, Trophy } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Plan", icon: Target, href: "/plan" },
  { label: "Focus", icon: Focus, href: "/focus" },
  { label: "Reflect", icon: History, href: "/reflect" },
  { label: "Reward", icon: Trophy, href: "/reward" },
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
            <Link
              key={item.label}
              href={item.href}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-slate-300 transition hover:bg-slate-800/80 hover:text-sky-200"
            >
              <Icon className="h-4 w-4 text-slate-400" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-800 px-4 py-3 text-[11px] text-slate-500">
        UserName
      </div>
    </aside>
  );
}

