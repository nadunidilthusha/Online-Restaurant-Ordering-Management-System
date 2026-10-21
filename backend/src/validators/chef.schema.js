import { z } from 'zod';

export const chefSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  title: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters long."),
  specialty: z.string().optional(),
  image: z.string().optional(),
  active: z.boolean().optional(),
});