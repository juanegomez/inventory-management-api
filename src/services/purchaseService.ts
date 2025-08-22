// src/services/purchaseService.ts
import { Purchase, PurchaseItem, Product } from "../database/models";
import { CreatePurchaseInput } from "../interfaces/purchase";

export const createPurchase = async (userId: number, data: CreatePurchaseInput) => {
    // Calcular total
    let total = 0;
    for (const item of data.items) {
        const product = await Product.findByPk(item.productId);
        if (!product) throw new Error(`Producto con id ${item.productId} no encontrado`);
        total += product.price * item.quantity;
    }

    // Crear la compra
    const purchase = await Purchase.create({ userId, total });

    // Crear items de la compra
    const purchaseItemsData = await Promise.all(
        data.items.map(async (item) => {
            const product = await Product.findByPk(item.productId);
            if (!product) throw new Error(`Producto con id ${item.productId} no encontrado`);
            return {
                purchaseId: purchase.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            };
        })
    );

    // Insertar todos los items
    await PurchaseItem.bulkCreate(purchaseItemsData);

    // Devolver la compra con sus items y productos asociados
    const purchaseWithItems = await Purchase.findByPk(purchase.id, {
        include: [
            {
                model: PurchaseItem,
                as: "items",
                include: [
                    { model: Product, as: "product" }
                ]
            }
        ]
    });

    return purchaseWithItems;
};

export const getPurchaseById = async (id: number) => {
    const purchase = await Purchase.findByPk(id, {
        include: [
            { model: PurchaseItem, as: "items", include: [{ model: Product, as: "product" }] }
        ]
    });
    if (!purchase) throw new Error("Compra no encontrada");
    return purchase;
};

export const getPurchaseHistory = async (userId: number) => {
    const purchases = await Purchase.findAll({
        where: { userId },
        include: [
            { model: PurchaseItem, as: "items", include: [{ model: Product, as: "product" }] }
        ],
        order: [["purchaseDate", "DESC"]]
    });
    return purchases;
};
