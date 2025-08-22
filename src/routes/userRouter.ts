import { Router } from 'express';
import { registerUser } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - document
 *               - documentType
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Juan
 *               lastName:
 *                 type: string
 *                 example: Gómez
 *               document:
 *                 type: string
 *                 example: 1010242747
 *               documentType:
 *                 type: string
 *                 example: CC
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               roleId:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/', registerUser);

export default router;
