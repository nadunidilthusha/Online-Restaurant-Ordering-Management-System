import { z } from 'zod';

export const menuSchema = z.object({
  name: z.string().min(2, "Menu name must be at least 2 characters long."),
  description: z.string().min(5, "Description must be at least 5 characters long."),
  // z.coerce ensures that even if the frontend sends a string (like "2800"), it validates as a number
  price: z.coerce.number().positive("Price must be greater than 0."),
  category: z.string().min(2, "Category is required."),
  tag: z.string().optional(),
  tagType: z.string().optional(),
  note: z.string().optional(),
  image: z.string().optional(),
  available: z.boolean().optional(),
});