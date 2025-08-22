import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.createProduct({
            ...req.body,
            entryDate: new Date(req.body.entryDate)
        });
        res.status(201).json({ message: 'Producto creado', product });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getProducts = async (_req: Request, res: Response) => {
    const products = await productService.getAllProducts();
    res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.getProductById(Number(req.params.id));
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.updateProduct(Number(req.params.id), {
            ...req.body,
            entryDate: req.body.entryDate ? new Date(req.body.entryDate) : undefined
        });
        res.json({ message: 'Producto actualizado', product });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await productService.deleteProduct(Number(req.params.id));
        res.json({ message: 'Producto eliminado' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
