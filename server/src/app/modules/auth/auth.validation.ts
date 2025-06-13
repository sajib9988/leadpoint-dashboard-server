// src/modules/auth/auth.validation.ts

import { z } from 'zod';

export const registerUserZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  passwordConfirm: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});