import { z } from 'zod';

export const teamMemberZodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(1, 'Bio is required'),
 socials: z
  .array(
    z.object({
      platform: z.string().min(1, 'Platform is required'),
      url: z.string().url('Invalid URL'),
    })
  )
  .min(1, 'At least one social link is required'),
});

export const updateTeamMemberZodSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  role: z.string().min(1, 'Role is required').optional(),
  bio: z.string().min(1, 'Bio is required').optional(),
 socials: z
  .array(
    z.object({
      platform: z.string().min(1, 'Platform is required').optional(),
      url: z.string().url('Invalid URL').optional(),
    })
  )
  .optional(),
});