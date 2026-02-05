"use client";

import { useState, useEffect, type FC } from "react";
import { FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Pencil, Trash2, Save } from "lucide-react";
import { planSchema, importanceLevels, urgencyLevels } from "@/utils/validation";
import type { PlanValues } from "@/models/plan.models";
import type { Task } from "./TaskCard";

interface TaskModalProps {
    task: Task;
    isOpen: boolean;
    onClose: () => void;
}

export const TaskModal: FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PlanValues>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            task: task.task,
            mainGoal: task.mainGoal,
            minorGoals: (task.minorGoals.split(";").map((g) => g.trim()) as [string, string, string]),
            importance: task.importance,
            urgency: task.urgency,
        },
    });

    // Reset form when task changes or modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsEditing(false);
            }, 0);
        }
        reset({
            task: task.task,
            mainGoal: task.mainGoal,
            minorGoals: (task.minorGoals.split(";").map((g) => g.trim()) as [string, string, string]),
            importance: task.importance,
            urgency: task.urgency,
        });
    }, [task, isOpen, reset]);


    const onSave = async (data: PlanValues) => {
        const body = {
            task: data.task,
            mainGoal: data.mainGoal,
            minorGoals: data.minorGoals.join("; "),
            importance: data.importance,
            urgency: data.urgency,
        };

        try {
            const res = await fetch(`http://localhost:8000/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            console.log(res);

            if (res.ok) {
                setIsEditing(false);
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <form
                onSubmit={handleSubmit(onSave)}
                className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            >
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 mr-4">
                        {isEditing ? (
                            <div className="space-y-1">
                                <input
                                    {...register("task")}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-50 focus:border-sky-500 outline-none transition"
                                    placeholder="Task Title"
                                />
                                {errors.task && <p className="text-rose-400 text-xs">{errors.task.message}</p>}
                            </div>
                        ) : (
                            <h2 className="text-xl font-bold text-slate-50">{task.task}</h2>
                        )}
                    </div>
                    <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-100 transition">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-5 text-sm">
                    {/* Main Goal Section */}
                    <div>
                        <h3 className="text-slate-400 font-medium mb-1.5 uppercase text-[10px] tracking-wider">Main Goal</h3>
                        {isEditing ? (
                            <div className="space-y-1">
                                <textarea
                                    {...register("mainGoal")}
                                    rows={2}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-sky-500 outline-none transition"
                                />
                                {errors.mainGoal && <p className="text-rose-400 text-xs">{errors.mainGoal.message}</p>}
                            </div>
                        ) : (
                            <p className="text-slate-200">{task.mainGoal}</p>
                        )}
                    </div>

                    {/* Minor Goals Section */}
                    <div>
                        <h3 className="text-slate-400 font-medium mb-1.5 uppercase text-[10px] tracking-wider">Minor Goals</h3>
                        <ul className="space-y-2">
                            {[0, 1, 2].map((idx) => (
                                <li key={idx}>
                                    {isEditing ? (
                                        <div className="space-y-1">
                                            <input
                                                {...register(`minorGoals.${idx}` as FieldPath<PlanValues>)}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:border-sky-500 outline-none transition"
                                            />
                                            {errors.minorGoals?.[idx] && <p className="text-rose-400 text-xs">{errors.minorGoals[idx]?.message}</p>}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-slate-200">
                                            <div className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                                            {task.minorGoals.split(";")[idx]?.trim()}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Importance & Urgency Section */}
                    <div className="flex gap-4 pt-2">
                        <div className="flex-1">
                            <h3 className="text-slate-400 font-medium mb-1.5 uppercase text-[10px] tracking-wider">Importance</h3>
                            {isEditing ? (
                                <select
                                    {...register("importance")}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none"
                                >
                                    {importanceLevels.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            ) : (
                                <span className="text-slate-200 font-semibold">{task.importance}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-slate-400 font-medium mb-1.5 uppercase text-[10px] tracking-wider">Urgency</h3>
                            {isEditing ? (
                                <select
                                    {...register("urgency")}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 outline-none"
                                >
                                    {urgencyLevels.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            ) : (
                                <span className="text-slate-200 font-semibold">{task.urgency}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Footer / Actions */}
                <div className="mt-8 flex items-center gap-3">
                    <button
                        type="submit"
                        hidden={!isEditing}
                        disabled={isSubmitting}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        hidden={isEditing}
                        onClick={() => setIsEditing(true)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 transition"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Task
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/50 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-200 hover:bg-rose-500/20 transition"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};