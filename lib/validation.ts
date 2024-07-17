import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name cannot be empty",
  }),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;
