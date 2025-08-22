import { z } from 'zod';

export const createUserSchema = z.object({
    firstName: z.string().min(1, "El nombre es obligatorio"),
    lastName: z.string().min(1, "El apellido es obligatorio"),
    document: z.string().min(1, "El documento es obligatorio"),
    documentType: z.string().min(1, "El tipo de documento es obligatorio"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    roleId: z.number().int("El roleId debe ser un número entero")
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
