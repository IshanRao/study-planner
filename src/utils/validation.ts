import { z } from "zod";

export const importanceLevels = ["Low", "Medium", "High"] as const;
export const urgencyLevels = ["Not urgent", "Soon", "Urgent"] as const;

export const planSchema = z.object({
  task: z.string().min(3, "Task should be at least 3 characters").max(80),
  mainGoal: z.string().min(5, "Goal should be at least 5 characters").max(160),
  minorGoals: z.tuple([
    z.string().min(3, "Add goal #1").max(120),
    z.string().min(3, "Add goal #2").max(120),
    z.string().min(3, "Add goal #3").max(120),
  ]),
  importance: z.enum(importanceLevels, {
    message: "Choose an importance level",
  }),
  urgency: z.enum(urgencyLevels, {
    message: "Choose an urgency level",
  }),
});
