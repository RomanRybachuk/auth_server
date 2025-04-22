import { z } from "zod";

// Схема валідації при реєстрації (register)
export const createUserSchema = z.object({
  username: z.string().min(1, { message: "Must contain at least 1 character" }),
  email: z.string().email({ message: "Must be a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Must contain at least 8 characters" }),
  refreshToken: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();
export const RegisterUserSchema = createUserSchema.omit({ refreshToken: true });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
