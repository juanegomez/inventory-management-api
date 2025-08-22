export interface PurchaseItemInput {
    productId: number;
    quantity: number;
}

export interface CreatePurchaseInput {
    items: PurchaseItemInput[];
}
