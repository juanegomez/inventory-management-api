import { Request, Response } from 'express';
import * as purchaseService from '../services/purchaseService';
import { JwtPayload } from '../middlewares/authHandler';

export const createPurchaseController = async (req: Request, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "No autenticado" });
        const userId = (req.user as JwtPayload)?.id;

        const { items } = req.body;

        const purchase = await purchaseService.createPurchase(userId, { items });
        res.status(201).json({ message: 'Compra creada', purchase });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getPurchaseController = async (req: Request, res: Response) => {
    try {
        const purchase = await purchaseService.getPurchaseById(Number(req.params.id));
        if (!purchase) return res.status(404).json({ message: 'Compra no encontrada' });
        res.json(purchase);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getPurchasesHistoryController = async (req: Request, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "No autenticado" });
        const userId = (req.user as JwtPayload)?.id;

        const purchases = await purchaseService.getPurchaseHistory(userId);
        res.json(purchases);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
