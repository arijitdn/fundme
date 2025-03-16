import { z } from "zod";

export const authFormSchema = z.object({
  username: z.string().optional(),
  email: z.string().email({
    message: "Please provide a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must contain atleast 8 characters",
    })
    .max(20, {
      message: "Password must contain atmost 20 characters",
    }),
});

export const campaignSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  goal: z.string(),
  duration: z.string().min(1),
  category: z.string(),
});
