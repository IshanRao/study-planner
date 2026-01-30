import type { z } from "zod";
import { planSchema } from "@/utils/validation";

export type PlanValues = z.infer<typeof planSchema>;

export type StepId =
  | "task"
  | "mainGoal"
  | "minorGoals"
  | "importance"
  | "urgency"
  | "review";

export interface PlanStep {
  id: StepId;
  title: string;
  subtitle: string;
}

export const PLAN_STEPS: PlanStep[] = [
  {
    id: "task",
    title: "What's the main task?",
    subtitle:
      "Name the thing you want to complete (keep it clear and specific).",
  },
  {
    id: "mainGoal",
    title: "What's the main goal under this task?",
    subtitle:
      "Define the outcome you're aiming for (what \"done\" looks like).",
  },
  {
    id: "minorGoals",
    title: "Add 3 minor goals",
    subtitle: "Break the task into 3 concrete, actionable chunks.",
  },
  {
    id: "importance",
    title: "How important is this?",
    subtitle: "Importance = impact on your long-term progress.",
  },
  {
    id: "urgency",
    title: "How urgent is this?",
    subtitle: "Urgency = time pressure / deadlines.",
  },
  {
    id: "review",
    title: "Review",
    subtitle: "Check your plan before you move on.",
  },
];

export function stepIndexFor(id: StepId): number {
  return PLAN_STEPS.findIndex((s) => s.id === id);
}
