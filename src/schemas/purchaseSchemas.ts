import { z } from "zod";

export const createPurchaseSchema = z.object({
    items: z.array(
        z.object({
            productId: z.number({ message: "productId es requerido" }),
            quantity: z.number({ message: "quantity es requerida" }).min(1, "La cantidad debe ser al menos 1")
        })
    ).min(1, "Debe incluir al menos un producto")
});