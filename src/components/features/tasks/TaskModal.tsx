import type { FC } from "react";
import { X, Pencil, Trash2, Calendar } from "lucide-react";
import type { Task } from "./TaskCard";

interface TaskModalProps {
    task: Task;
    isOpen: boolean;
    onClose: () => void;
}

export const TaskModal: FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-50">{task.task}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-100 transition rounded-lg hover:bg-slate-800"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-5 text-sm">
                    {task.created_at && (
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span className="text-[11px] font-medium">Created on {new Date(task.created_at).toLocaleDateString()}</span>
                        </div>
                    )}

                    <div>
                        <h3 className="text-slate-400 font-medium mb-1.5 uppercase text-[10px] tracking-wider">Main Goal</h3>
                        <p className="text-slate-200 leading-relaxed">{task.mainGoal}</p>
                    </div>

                    <div>
                        <h3 className="text-slate-400 font-medium mb-1.5 uppercase text-[10px] tracking-wider">Minor Goals</h3>
                        <ul className="grid gap-2">
                            {task.minorGoals.split(';').map((goal, idx) => (
                                goal.trim() && (
                                    <li key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800/50 bg-slate-950/30 p-3 text-slate-200">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-400">
                                            {idx + 1}
                                        </span>
                                        {goal.trim()}
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <div className="flex-1 p-3 rounded-xl bg-slate-950/30 border border-slate-800/50">
                            <h3 className="text-slate-400 font-medium mb-1 uppercase text-[10px] tracking-wider">Importance</h3>
                            <span className="text-slate-50 font-semibold">{task.importance}</span>
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-slate-950/30 border border-slate-800/50">
                            <h3 className="text-slate-400 font-medium mb-1 uppercase text-[10px] tracking-wider">Urgency</h3>
                            <span className="text-slate-50 font-semibold">{task.urgency}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition shadow-lg shadow-sky-900/20">
                        <Pencil className="h-4 w-4" />
                        Edit Task
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/50 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-200 hover:bg-rose-500/20 transition">
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};