import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name cannot be empty",
  }),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

export const addressSchema = z.object({
  type: z.enum(["shipping", "billing"]),
  address_line_1: z.string().min(1, "Address is required"),
  address_line_2: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  isDefault: z.boolean().default(false),
});

export type AddressValues = z.infer<typeof addressSchema>;
