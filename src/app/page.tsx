"use client";

import { useEffect, useState } from "react";
import { TaskCard, type Task } from "@/components/features/tasks/TaskCard";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:8000/tasks");
        if (!res.ok) {
          throw new Error(`Failed to fetch tasks (${res.status})`);
        }
        
        const data = (await res.json()) as Task[] | Task;
        if (cancelled) return;

        const list = Array.isArray(data) ? data : [data];
        setTasks(list);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to fetch tasks");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTasks();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex items-baseline justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">Tasks</h1>
        </div>
      </header>

      {loading && (
        <p className="text-sm text-slate-400">Loading tasks…</p>
      )}

      {error && !loading && (
        <p className="rounded-xl border border-rose-800/70 bg-rose-950/40 px-4 py-2 text-sm text-rose-200">
          {error}
        </p>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p className="text-sm text-slate-400">
          No tasks found yet. Create a plan to see it here.
        </p>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id ?? `${task.task}-${task.mainGoal}`}
              task={task}
            />
          ))}
        </div>
      )}
    </div>
  );
}