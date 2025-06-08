// src/app/modules/teamMember/teamMember.validation.ts

import { z } from 'zod';

export const teamMemberZodSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(1, 'Bio is required'),
 
  socials: z.array(
    z.object({
      platform: z.string().min(1),
      url: z.string().url(),
    })
  ).min(1, 'At least one social is required'),
});
