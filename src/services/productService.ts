import { Product } from "../database/models";

interface CreateProductInput {
    batchNumber: string;
    name: string;
    price: number;
    quantity: number;
    entryDate: Date;
}

export const createProduct = async (data: CreateProductInput) => {
    return Product.create(data);
};

export const getAllProducts = async () => {
    return Product.findAll();
};

export const getProductById = async (id: number) => {
    return Product.findByPk(id);
};

export const updateProduct = async (id: number, data: Partial<CreateProductInput>) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Producto no encontrado');
    return product.update(data);
};

export const deleteProduct = async (id: number) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Producto no encontrado');
    return product.destroy();
};
