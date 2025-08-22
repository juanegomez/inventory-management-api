import { z } from 'zod';

export const createProductSchema = z.object({
    batchNumber: z.string().min(1, "Número de lote obligatorio"),
    name: z.string().min(1, "Nombre obligatorio"),
    price: z.number().positive("Precio debe ser mayor a 0"),
    quantity: z.number().int().nonnegative("Cantidad debe ser 0 o mayor"),
    entryDate: z.string().refine(val => !isNaN(Date.parse(val)), "Fecha inválida")
});

export const updateProductSchema = createProductSchema.partial();
