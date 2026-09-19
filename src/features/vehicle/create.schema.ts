import { z } from "zod";

export const partSchema = z.object({
  id: z.string(),

  name: z
    .string()
    .trim()
    .min(1, "Part name is required."),

  quantity: z
    .number()
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1."),

  price: z
    .number()
    .min(0, "Price cannot be negative.")
    .optional(),
});

export const serviceSchema = z.object({
  id: z.string(),

  serviceDate: z
    .string()
    .min(1, "Service date is required."),

  technician: z
    .string()
    .trim()
    .optional(),

  servicePerformed: z
    .string()
    .trim()
    .min(1, "Service performed is required."),

  parts: z
    .array(partSchema)
    .min(1, "At least one part is required."),
});

export const vehicleSchema = z.object({
  plateNumber: z
    .string()
    .trim()
    .min(1, "Plate number is required.")
    .max(
      20,
      "Plate number must not exceed 20 characters.",
    ),

  year: z.string().optional(),

  make: z
    .string()
    .trim()
    .min(1, "Vehicle make is required.")
    .max(
      100,
      "Vehicle make must not exceed 100 characters.",
    ),

  model: z
    .string()
    .trim()
    .min(1, "Vehicle model is required.")
    .max(
      150,
      "Vehicle model must not exceed 150 characters.",
    ),

  ownerName: z
    .string()
    .trim()
    .min(1, "Owner name is required.")
    .max(
      150,
      "Owner name must not exceed 150 characters.",
    ),

  contactNumber: z
    .string()
    .trim()
    .regex(
      /^\d{11}$/,
      "Contact number must contain exactly 11 digits.",
    ),

  address: z
    .string()
    .trim()
    .min(1, "Address is required."),

  services: z
    .array(serviceSchema)
    .min(1, "At least one service record is required."),
});

export type PartFormZod = z.infer<typeof partSchema>;

export type ServiceFormZod = z.infer<
  typeof serviceSchema
>;

export type VehicleFormZod = z.infer<
  typeof vehicleSchema
>;