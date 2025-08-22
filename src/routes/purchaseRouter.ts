// src/routes/purchaseRouter.ts
import { Router } from 'express';
import * as purchaseController from '../controllers/purchaseController';
import { validate } from '../middlewares/validate';
import { createPurchaseSchema } from '../schemas/purchaseSchemas';
import { authenticateJWT } from '../middlewares/authHandler';
import { isClient } from '../middlewares/isClient';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Endpoints de compras para clientes
 */

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Crear una compra
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                 example:
 *                   - productId: 1
 *                     quantity: 2
 *                   - productId: 3
 *                     quantity: 1
 *     responses:
 *       201:
 *         description: Compra creada
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autenticado
 */
router.post(
    '/',
    authenticateJWT,
    isClient,
    validate(createPurchaseSchema),
    purchaseController.createPurchaseController
);

/**
 * @swagger
 * /purchases/history:
 *   get:
 *     summary: Obtener historial de compras del usuario
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de compras
 *       401:
 *         description: No autenticado
 */
router.get('/history', authenticateJWT, isClient, purchaseController.getPurchasesHistoryController);

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     summary: Obtener una compra específica
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compra
 *     responses:
 *       200:
 *         description: Compra encontrada
 *       404:
 *         description: Compra no encontrada
 *       401:
 *         description: No autenticado
 */
router.get('/:id', authenticateJWT, isClient, purchaseController.getPurchaseController);

export default router;
