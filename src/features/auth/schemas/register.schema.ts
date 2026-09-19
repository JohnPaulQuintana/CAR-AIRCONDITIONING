import { z } from "zod";

export const registerSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full Name is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),

  project_slug: z
    .string()
    .min(1, "Project configuration is missing"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;