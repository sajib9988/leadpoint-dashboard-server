// src/app/modules/service/service.validation.ts

import { z } from "zod";

export const serviceZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  slug: z.string().min(1, "Slug is required"),
  dataAiHint: z.string().min(1, "Data AI Hint is required"),
  icon: z.string().optional(),
  image: z.string().optional(),
});
