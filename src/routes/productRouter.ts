// src/routes/productRouter.ts
import { Router } from 'express';
import * as productController from '../controllers/productController';
import { validate } from '../middlewares/validate';
import { createProductSchema, updateProductSchema } from '../schemas/productSchema';
import { isAdmin } from '../middlewares/isAdmin';
import { authenticateJWT } from '../middlewares/authHandler';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: CRUD de productos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batchNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               entryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.post('/', authenticateJWT, isAdmin, validate(createProductSchema), productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', authenticateJWT, productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', authenticateJWT, productController.getProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batchNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               entryDate:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - batchNumber
 *               - name
 *               - price
 *               - quantity
 *               - entryDate
 *           example:
 *             batchNumber: "Lote123"
 *             name: "Leche Entera"
 *             price: 4500
 *             quantity: 100
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Error de validación de datos
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', authenticateJWT, isAdmin, validate(updateProductSchema), productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', authenticateJWT, isAdmin, productController.deleteProduct);

export default router;
